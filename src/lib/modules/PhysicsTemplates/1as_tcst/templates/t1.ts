import type { Difficulty, PhysicsGeneratedExerciseInstance, PhysicsParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { chemSpecies, nuclide } from '../../chem-helpers';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom Physics/Chemistry SVG Builders for 1AS TCST T1
// ═══════════════════════════════════════════════════════════════════════════════

function buildAtomCardSvg(symbol: string, A: number, Z: number, nameAr: string): string {
	const N = A - Z;
	const cx = 105;
	const cy = 96;
	let body = '';
	body += `<circle cx="${cx}" cy="${cy}" r="22" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>`;
	body += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">${Z}p⁺</text>`;
	body += `<text x="${cx}" y="${cy + 13}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#475569">${N}n⁰</text>`;
	const k = Math.min(2, Z);
	const l = Math.max(0, Math.min(8, Z - 2));
	const m = Math.max(0, Z - 10);
	const rings = [
		{ r: 42, cnt: k, col: '#2563eb' },
		{ r: 62, cnt: l, col: '#059669' },
		{ r: 82, cnt: m, col: '#d97706' }
	];
	for (const rg of rings) {
		if (rg.cnt <= 0) continue;
		body += `<circle cx="${cx}" cy="${cy}" r="${rg.r}" fill="none" stroke="${rg.col}" stroke-width="1.3" stroke-dasharray="4,3"/>`;
		for (let i = 0; i < rg.cnt; i++) {
			const ang = (2 * Math.PI * i) / rg.cnt - Math.PI / 2;
			body += `<circle cx="${(cx + rg.r * Math.cos(ang)).toFixed(1)}" cy="${(cy + rg.r * Math.sin(ang)).toFixed(1)}" r="3.6" fill="${rg.col}" stroke="#ffffff" stroke-width="0.9"/>`;
		}
	}
	body += `<rect x="208" y="22" width="160" height="148" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="288" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">ذرة ${nameAr} (${symbol})</text>`;
	body += `<text x="288" y="74" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#dc2626">العدد الكتلي A = ${A}</text>`;
	body += `<text x="288" y="100" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#2563eb">العدد الذري Z = ${Z}</text>`;
	body += `<text x="288" y="128" text-anchor="middle" font-size="11.5" fill="#334155">الإلكترونات: ${Z} e⁻</text>`;
	body += `<text x="288" y="152" text-anchor="middle" font-size="11.5" fill="#059669">النوترونات: N = A - Z</text>`;
	return wrapPhysicsSvg(380, 192, body);
}

function buildLewisMoleculeSvg(formula: string, central: string, ligands: string[], lonePairs: number, geomAr: string, vsepr: string): string {
	let body = '';
	body += `<rect x="12" y="14" width="356" height="168" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="190" y="36" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">نموذج لويس وهندسة ${formula} (${vsepr})</text>`;
	const cx = 125;
	const cy = 104;
	body += `<circle cx="${cx}" cy="${cy}" r="16" fill="#2563eb"/><text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">${central}</text>`;
	// Draw ligands radially
	const n = ligands.length;
	const startAng = lonePairs > 0 ? Math.PI * 0.2 : -Math.PI / 2;
	const stepAng = lonePairs > 0 ? (Math.PI * 0.6) / Math.max(1, n - 1) : (2 * Math.PI) / n;
	for (let i = 0; i < n; i++) {
		const ang = n === 1 ? 0 : startAng + i * stepAng;
		const lx = cx + 52 * Math.cos(ang);
		const ly = cy + 52 * Math.sin(ang);
		body += `<line x1="${(cx + 16 * Math.cos(ang)).toFixed(1)}" y1="${(cy + 16 * Math.sin(ang)).toFixed(1)}" x2="${(lx - 11 * Math.cos(ang)).toFixed(1)}" y2="${(ly - 11 * Math.sin(ang)).toFixed(1)}" stroke="#0f172a" stroke-width="2.2"/>`;
		body += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="11" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
		body += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${ligands[i]}</text>`;
	}
	if (lonePairs >= 1) {
		body += `<line x1="${cx - 10}" y1="${cy - 23}" x2="${cx + 10}" y2="${cy - 23}" stroke="#dc2626" stroke-width="2.6"/>`;
	}
	if (lonePairs >= 2) {
		body += `<line x1="${cx - 10}" y1="${cy - 30}" x2="${cx + 10}" y2="${cy - 30}" stroke="#dc2626" stroke-width="2.6"/>`;
	}
	body += `<rect x="208" y="54" width="146" height="106" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2"/>`;
	body += `<text x="281" y="78" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">أزواج رابطة: ${n}</text>`;
	body += `<text x="281" y="102" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">أزواج حرة (E): ${lonePairs}</text>`;
	body += `<text x="281" y="128" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">الشكل: ${geomAr}</text>`;
	body += `<text x="281" y="148" text-anchor="middle" font-size="11" fill="#475569">الصيغة: ${vsepr}</text>`;
	return wrapPhysicsSvg(380, 196, body);
}

function buildStroboscopicTrackSvg(positionsCm: number[], tauMs: number, mode: 'accel' | 'decel' | 'uniform'): string {
	let body = `<defs>
		<marker id="tbBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
		<marker id="tbRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
	</defs>`;
	body += `<text x="195" y="22" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">التسجيل المتعاقب للمواضع (τ = ${tauMs} ms)</text>`;
	body += `<line x1="25" y1="96" x2="365" y2="96" stroke="#64748b" stroke-width="1.6"/>`;
	const maxPos = positionsCm[positionsCm.length - 1] || 1;
	const scaleX = (cm: number) => 38 + (cm / maxPos) * 310;
	for (let i = 0; i < positionsCm.length; i++) {
		const px = scaleX(positionsCm[i]);
		body += `<circle cx="${px.toFixed(1)}" cy="96" r="4.5" fill="#0f172a"/>`;
		body += `<text x="${px.toFixed(1)}" y="116" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">M${i}</text>`;
		body += `<text x="${px.toFixed(1)}" y="132" text-anchor="middle" font-size="9.5" fill="#475569">${positionsCm[i]}</text>`;
	}
	body += `<text x="24" y="132" font-size="9.5" fill="#475569">cm</text>`;
	const midIdx = Math.floor(positionsCm.length / 2);
	const mx = scaleX(positionsCm[midIdx]);
	body += `<line x1="${mx.toFixed(1)}" y1="74" x2="${(mx + 44).toFixed(1)}" y2="74" stroke="#2563eb" stroke-width="2" marker-end="url(#tbBlue)"/>`;
	body += `<text x="${(mx + 22).toFixed(1)}" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">v</text>`;
	if (mode !== 'uniform') {
		const dir = mode === 'accel' ? 32 : -32;
		body += `<line x1="${mx.toFixed(1)}" y1="50" x2="${(mx + dir).toFixed(1)}" y2="50" stroke="#dc2626" stroke-width="2.2" marker-end="url(#tbRed)"/>`;
		body += `<text x="${(mx + dir / 2).toFixed(1)}" y="43" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Δv</text>`;
	}
	return wrapPhysicsSvg(390, 152, body);
}

function buildCurvilinearOrbitSvg(vKms: number, rKm: number, label: string): string {
	const cx = 130;
	const cy = 104;
	const rad = 68;
	let body = `<defs>
		<marker id="coBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
		<marker id="coRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
	</defs>`;
	body += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="5,3"/>`;
	body += `<circle cx="${cx}" cy="${cy}" r="18" fill="#1d4ed8"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">الأرض</text>`;
	const mx = cx;
	const my = cy - rad;
	body += `<circle cx="${mx}" cy="${my}" r="5.5" fill="#0f172a"/>`;
	body += `<text x="${mx - 12}" y="${my - 10}" font-size="11" font-weight="bold">S</text>`;
	body += `<line x1="${mx}" y1="${my}" x2="${mx + 56}" y2="${my}" stroke="#2563eb" stroke-width="2.1" marker-end="url(#coBlue)"/>`;
	body += `<text x="${mx + 56}" y="${my - 8}" font-size="11" font-weight="bold" fill="#2563eb">v</text>`;
	body += `<line x1="${mx}" y1="${my}" x2="${mx}" y2="${my + 42}" stroke="#dc2626" stroke-width="2.2" marker-end="url(#coRed)"/>`;
	body += `<text x="${mx + 14}" y="${my + 30}" font-size="11" font-weight="bold" fill="#dc2626">F_G , Δv</text>`;
	body += `<rect x="218" y="34" width="152" height="132" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="294" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${label}</text>`;
	body += `<text x="294" y="86" text-anchor="middle" font-size="11.5" fill="#2563eb">نصف القطر r = ${rKm} km</text>`;
	body += `<text x="294" y="112" text-anchor="middle" font-size="11.5" fill="#059669">السرعة v = ${vKms} km/s</text>`;
	body += `<text x="294" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">حركة دائرية منتظمة</text>`;
	return wrapPhysicsSvg(384, 198, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Atom Structure, Nucleus & Isotopes (Lesson 1)
// ═══════════════════════════════════════════════════════════════════════════════

const tplAtomIsotopes: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t1_atom_isotopes',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'بنية الذرة، مكونات النواة، والنظائر',
	curriculumLessonId: 'phy_lesson_1as_tcst_t1_matter_atom_isotopes',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const elements = [
			{ sym: 'Cl', nameAr: 'الكلور', Z: 17, A1: 35, p1: 75, A2: 37, p2: 25 },
			{ sym: 'Cu', nameAr: 'النحاس', Z: 29, A1: 63, p1: 70, A2: 65, p2: 30 },
			{ sym: 'B', nameAr: 'البور', Z: 5, A1: 10, p1: 20, A2: 11, p2: 80 },
			{ sym: 'Li', nameAr: 'الليثيوم', Z: 3, A1: 6, p1: 8, A2: 7, p2: 92 },
			{ sym: 'Br', nameAr: 'البروم', Z: 35, A1: 79, p1: 50, A2: 81, p2: 50 },
			{ sym: 'Mg', nameAr: 'المغنيسيوم', Z: 12, A1: 24, p1: 80, A2: 26, p2: 20 }
		];
		const pool =
			difficulty === 'easy'
				? elements.slice(0, 3)
				: difficulty === 'medium'
					? elements.slice(1, 5)
					: elements;
		const el = rng.pick(pool);
		const N1 = el.A1 - el.Z;
		const N2 = el.A2 - el.Z;
		const avgMass = roundTo((el.p1 * el.A1 + el.p2 * el.A2) / 100, 2);
		const mp = 1.67e-27;
		const eCharge = 1.6e-19;
		const atomMassExp = roundTo(el.A1 * 1.67, 2); // * 10^-27 kg
		const nucChargeExp = roundTo(el.Z * 1.6, 2); // * 10^-19 C

		const nuc1 = nuclide(el.A1, el.Z, el.sym);
		const nuc2 = nuclide(el.A2, el.Z, el.sym);

		const svg = buildAtomCardSvg(el.sym, el.A1, el.Z, el.nameAr);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t1_atom_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${avgMass}\\,\\text{g/mol}$`,
			[
				{
					text: `$${roundTo((el.A1 + el.A2) / 2, 2)}\\,\\text{g/mol}$`,
					diagnosticFeedback: 'خطأ: حسبت المتوسط الحسابي البسيط للعددين الكتليين دون مراعاة نسبتي الوفرة الطبيعيتين!'
				},
				{
					text: `$${roundTo((el.p2 * el.A1 + el.p1 * el.A2) / 100, 2)}\\,\\text{g/mol}$`,
					diagnosticFeedback: 'خطأ: عكست نسبتي الوفرة بين النظير الأول والنظير الثاني.'
				},
				{
					text: `$${el.A1}\\,\\text{g/mol}$`,
					diagnosticFeedback: 'خطأ: هذا العدد الكتلي للنظير الأول فقط ولا يأخذ النظير الثاني بعين الاعتبار.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يتكون عنصر ${el.nameAr} الطبيعي من نظيرين هما ${nuc1.katex} بنسبة $${el.p1}\\%$ و${nuc2.katex} بنسبة $${el.p2}\\%$. ما هي الكتلة الذرية المتوسطة لعنصر ${el.nameAr}؟`,
				questionTextAr: `احسب الكتلة الذرية المتوسطة لعنصر ${el.nameAr}:`,
				imageUrl: svgPath,
				imageCaption: `نموذج ذرة ${el.nameAr} (${el.sym})`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `الكتلة الذرية المتوسطة هي: $M = \\frac{${el.p1} \\times ${el.A1} + ${el.p2} \\times ${el.A2}}{100} = ${avgMass}\\,\\text{g/mol}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُوجد عنصر ${el.nameAr} (${el.sym}) في الطبيعة على شكل نظيرين هما ${nuc1.typst} بنسبة $${el.p1}%$ و${nuc2.typst} بنسبة $${el.p2}%$.\nنعطي: كتلة البروتون $m_p approx m_n = 1.67 times 10^(-27) "kg"$، الشحنة العنصرية $e = 1.6 times 10^(-19) "C"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `تمثيل مبسط لذرة ${el.nameAr}`,
						width: 340
					},
					{
						type: 'text',
						content: `1) عرّف النظائر، ثم أعط تركيب نواة كل من النظيرين ${nuc1.typst} و${nuc2.typst} (عدد البروتونات، النوترونات، والإلكترونات).`,
						answer: `1) *النظائر*: هي ذرات تنتمي لنفس العنصر الكيميائي (نفس العدد الذري $Z = ${el.Z}$) وتختلف في العدد الكتلي $A$ (أي في عدد النوترونات $N$).\n- النظير ${nuc1.typst}: $${el.Z}$ بروتون، $N_1 = ${el.A1} - ${el.Z} = ${N1}$ نوترون، و$${el.Z}$ إلكترون.\n- النظير ${nuc2.typst}: $${el.Z}$ بروتون، $N_2 = ${el.A2} - ${el.Z} = ${N2}$ نوترون، و$${el.Z}$ إلكترون.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) احسب الشحنة الكهربائية لنواة النظير ${nuc1.typst}، وما هي شحنة الذرة الإجمالية؟ علل.`,
						answer: `2) شحنة النواة موجبة: $q_("noyau") = +Z times e = +${el.Z} times 1.6 times 10^(-19) = +${nucChargeExp} times 10^(-19) "C"$.\nشحنة الذرة الإجمالية معدومة ($q_("atome") = 0 "C"$) لأن الذرة متعادلة كهربائياً (عدد البروتونات يساوي عدد الإلكترونات).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب الكتلة التقريبية لذرة النظير ${nuc1.typst} بالكيلوغرام، مبيناً أين تتمركز كتلة الذرة.`,
						answer: `3) بإهمال كتلة الإلكترونات أمام النواة ($m_e << m_p$): تتمركز كتلة الذرة في نواتها.\n$m_("atome") approx A_1 times m_p = ${el.A1} times 1.67 times 10^(-27) = ${atomMassExp} times 10^(-27) "kg"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) احسب الكتلة الذرية المولية المتوسطة $M("${el.sym}")$ لعنصر ${el.nameAr} الطبيعي.`,
						answer: `4) $M("${el.sym}") = frac(${el.p1} times ${el.A1} + ${el.p2} times ${el.A2}, 100) = ${avgMass} "g/mol"$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`العدد السفلي $Z = ${el.Z}$ يمثل عدد البروتونات (والإلكترونات في الذرة المتعادلة)، وعدد النوترونات $N = A - Z$.`,
				`شحنة النواة $q_{\\text{noyau}} = +Z \\cdot e$، والكتلة التقريبية للذرة $m \\approx A \\cdot m_p$.`,
				`لحساب الكتلة الذرية المتوسطة: $M = \\frac{p_1 A_1 + p_2 A_2}{100}$.`
			],
			solutionStepsAr: [
				`تركيب ${nuc1.katex}: $Z=${el.Z}$ بروتون وإلكترون، و$N_1=${N1}$ نوترون؛ وفي ${nuc2.katex}: $N_2=${N2}$ نوترون.`,
				`شحنة النواة $+${nucChargeExp} \\times 10^{-19}\\,\\text{C}$ والذرة متعادلة كهربائياً. وكتلة الذرة $\\approx ${atomMassExp} \\times 10^{-27}\\,\\text{kg}$ (${mp}$).`,
				`الكتلة الذرية المتوسطة: $M = ${avgMass}\\,\\text{g/mol}$ (${eCharge}$).`
			],
			finalAnswer: `${avgMass} g/mol`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Electron Configuration, Octet/Duet & Periodic Table (Lesson 2)
// ═══════════════════════════════════════════════════════════════════════════════

const tplElectronPeriodic: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t1_electron_periodic',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'التوزيع الإلكتروني، قاعدة الثنائية والثمانية، والجدول الدوري',
	curriculumLessonId: 'phy_lesson_1as_tcst_t1_electron_config_periodic_table',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const atoms = [
			{ sym: 'Li', nameAr: 'الليثيوم', Z: 3, k: 2, l: 1, m: 0, period: 2, col: 1, ion: 'Li+', family: 'المعادن القلوية', action: 'يفقد 1 إلكترون (قاعدة الثنائية)' },
			{ sym: 'F', nameAr: 'الفلور', Z: 9, k: 2, l: 7, m: 0, period: 2, col: 7, ion: 'F-', family: 'الهالوجينات', action: 'يكتسب 1 إلكترون (قاعدة الثمانية)' },
			{ sym: 'Na', nameAr: 'الصوديوم', Z: 11, k: 2, l: 8, m: 1, period: 3, col: 1, ion: 'Na+', family: 'المعادن القلوية', action: 'يفقد 1 إلكترون (قاعدة الثمانية)' },
			{ sym: 'Mg', nameAr: 'المغنيسيوم', Z: 12, k: 2, l: 8, m: 2, period: 3, col: 2, ion: 'Mg^2+', family: 'القلويات الترابية', action: 'يفقد 2 إلكترونين (قاعدة الثمانية)' },
			{ sym: 'Al', nameAr: 'الألمنيوم', Z: 13, k: 2, l: 8, m: 3, period: 3, col: 3, ion: 'Al^3+', family: 'عناصر العمود الثالث (عائلة البور)', action: 'يفقد 3 إلكترونات (قاعدة الثمانية)' },
			{ sym: 'S', nameAr: 'الكبريت', Z: 16, k: 2, l: 8, m: 6, period: 3, col: 6, ion: 'S^2-', family: 'عناصر العمود السادس (عائلة الأكسجين)', action: 'يكتسب 2 إلكترونين (قاعدة الثمانية)' },
			{ sym: 'Cl', nameAr: 'الكلور', Z: 17, k: 2, l: 8, m: 7, period: 3, col: 7, ion: 'Cl-', family: 'الهالوجينات', action: 'يكتسب 1 إلكترون (قاعدة الثمانية)' }
		];
		const pool = difficulty === 'easy' ? atoms.slice(0, 4) : atoms;
		const at = rng.pick(pool);
		const configKatex = `(K)^${at.k} (L)^${at.l}${at.m > 0 ? ` (M)^${at.m}` : ''}`;
		const configTypst = `(K)^${at.k} (L)^${at.l}${at.m > 0 ? ` (M)^${at.m}` : ''}`;
		const ionDual = chemSpecies(at.ion);
		const ionCfgTypst =
			at.Z <= 4
				? '(K)^2'
				: at.period === 2 || at.col <= 3
					? '(K)^2 (L)^8'
					: '(K)^2 (L)^8 (M)^8';

		const svg = buildElectronShellsSvg(at.sym, at.Z, at.k, at.l, at.m);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t1_elec_${difficulty}_s${seed}`, svg);

		const wrongIon1 = at.col <= 3 ? `${at.sym}^${at.col}-` : `${at.sym}^${8 - at.col}+`;
		const wrongIon2 = at.col <= 3 ? `${at.sym}^${at.col + 1}+` : `${at.sym}^${at.col}-`;
		const wrongIon3 = `${at.sym}`;
		const mcq = buildUniqueMcqOptions(
			`${ionDual.katex} (السطر ${at.period}، العمود ${at.col})`,
			[
				{
					text: `${chemSpecies(wrongIon1).katex} (السطر ${at.period}، العمود ${at.col})`,
					diagnosticFeedback: 'خطأ: انتبه لإشارة الشاردة! فقد الإلكترونات يعطي شحنة موجبة، واكتسابها يعطي شحنة سالبة.'
				},
				{
					text: `${chemSpecies(wrongIon2).katex} (السطر ${at.period}، العمود ${at.col})`,
					diagnosticFeedback: 'خطأ: عدد الإلكترونات المفقودة أو المكتسبة لا يحقق قاعدة الثنائية/الثمانية بشكل صحيح.'
				},
				{
					text: `${chemSpecies(wrongIon3).katex} (السطر ${at.col}، العمود ${at.period})`,
					diagnosticFeedback: 'خطأ: رقم السطر هو عدد الطبقات، ورقم العمود هو عدد إلكترونات الطبقة السطحية وليس العكس!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `عنصر كيميائي ${at.nameAr} (${at.sym}) عدده الذري $Z = ${at.Z}$. ما هي شارده المستقرة وموقعه في الجدول الدوري المبسط؟`,
				questionTextAr: `حدد الشاردة المستقرة وموقع العنصر $Z = ${at.Z}$:`,
				imageUrl: svgPath,
				imageCaption: `التوزيع الإلكتروني لذرة ${at.sym}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `التوزيع الإلكتروني: $${configKatex}$ ← $Z=${at.Z}$ يقع في السطر $${at.period}$ والعمود $${at.col}$، و${at.action} لتصبح شارده ${ionDual.katex}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `عنصر كيميائي رمزه $${at.sym}$، عدده الذري $Z = ${at.Z}$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `التمثيل الطبقي لذرة ${at.nameAr}`,
						width: 340
					},
					{
						type: 'text',
						content: `1) اكتب التوزيع الإلكتروني لذرة $${at.sym}$ على الطبقات $(K, L, M)$.`,
						answer: `1) التوزيع الإلكتروني لذرة $${at.sym}$ ($Z = ${at.Z}$): $${configTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) حدد موقع هذا العنصر في الجدول الدوري المبسط (رقم السطر ورقم العمود) واذكر اسم عائلته الكيميائية.`,
						answer: `2) يمتلك $${at.period}$ طبقات إلكترونية ← *السطر ${at.period}*.\nويمتلك $${at.col}$ إلكترونات في طبقته السطحية ← *العمود ${at.col}*.\nالعائلة الكيميائية: ${at.family}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بتطبيق قاعدة الثنائية أو الثمانية الإلكترونية، استنتج صيغة الشاردة المستقرة المتوقعة لهذا العنصر واكتب توزيعها الإلكتروني.`,
						answer: `3) لكي يحقق استقرار الغاز الخامل الأقرب إليه، ${at.action}، فتتشكل الشاردة ${ionDual.typst} التي توزيعها الإلكتروني $${ionCfgTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر رمز الغاز الخامل الذي يملك نفس التوزيع الإلكتروني لهذه الشاردة (علماً أن ${chemSpecies('He').typst} ($Z=2$)، ${chemSpecies('Ne').typst} ($Z=10$)، ${chemSpecies('Ar').typst} ($Z=18$)).`,
						answer: `4) الغاز الخامل الموافق هو $${at.Z <= 4 ? '"He" (Z=2)' : at.period === 2 || at.col <= 3 ? '"Ne" (Z=10)' : '"Ar" (Z=18)'}$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`تتشبع الطبقة $K$ بـ $2$ إلكترون، والطبقة $L$ بـ $8$ إلكترونات، والباقي في $M$.`,
				`رقم السطر = عدد الطبقات المشغولة، رقم العمود = عدد إلكترونات الطبقة الخارجية.`,
				`إذا كان في الطبقة السطحية $1, 2, 3$ إلكترونات يفقدها العنصر؛ وإذا كان $5, 6, 7$ يكتسب ما يكمله إلى $8$.`
			],
			solutionStepsAr: [
				`التوزيع الإلكتروني: $${configKatex}$.`,
				`الموقع: السطر $${at.period}$، العمود $${at.col}$ (${at.family}).`,
				`الشاردة المستقرة: ${ionDual.katex}.`
			],
			finalAnswer: at.ion
		};
	}
};

function buildElectronShellsSvg(symbol: string, Z: number, k: number, l: number, m: number): string {
	const cx = 110;
	const cy = 96;
	let body = `<circle cx="${cx}" cy="${cy}" r="16" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>`;
	body += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">${symbol}</text>`;
	const rings = [
		{ r: 34, count: k, color: '#2563eb' },
		{ r: 54, count: l, color: '#059669' },
		{ r: 74, count: m, color: '#d97706' }
	];
	for (const rg of rings) {
		if (rg.count <= 0) continue;
		body += `<circle cx="${cx}" cy="${cy}" r="${rg.r}" fill="none" stroke="${rg.color}" stroke-width="1.5"/>`;
		for (let i = 0; i < rg.count; i++) {
			const ang = (2 * Math.PI * i) / rg.count - Math.PI / 2;
			body += `<circle cx="${(cx + rg.r * Math.cos(ang)).toFixed(1)}" cy="${(cy + rg.r * Math.sin(ang)).toFixed(1)}" r="3.8" fill="${rg.color}" stroke="#ffffff" stroke-width="0.9"/>`;
		}
	}
	body += `<rect x="205" y="30" width="160" height="130" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="285" y="56" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">عنصر ${symbol} (Z = ${Z})</text>`;
	body += `<text x="285" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">K = ${k} | L = ${l}${m > 0 ? ` | M = ${m}` : ''}</text>`;
	body += `<text x="285" y="114" text-anchor="middle" font-size="11.5" fill="#334155">السطر: ؟  —  العمود: ؟</text>`;
	body += `<text x="285" y="140" text-anchor="middle" font-size="11" fill="#dc2626">أكمل التوزيع وحدد الشاردة</text>`;
	return wrapPhysicsSvg(380, 190, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Lewis Structure, VSEPR Geometry & Polarity (Lesson 3)
// ═══════════════════════════════════════════════════════════════════════════════

const tplLewisVsepr: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t1_lewis_vsepr',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'تمثيل لويس وهندسة الجزيئات (VSEPR) واستقطاب الروابط',
	curriculumLessonId: 'phy_lesson_1as_tcst_t1_lewis_vsepr_geometry',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const molecules = [
			{
				formula: 'H2O',
				nameAr: 'الماء',
				central: 'O',
				ligands: ['H', 'H'],
				valencePairs: 4,
				bonding: 2,
				lone: 2,
				vsepr: 'AX₂E₂',
				vseprKatex: '\\mathrm{AX_2E_2}',
				vseprTypst: 'upright("AX")_2 upright("E")_2',
				geomAr: 'مرفقي (زاوي)',
				polarAr: 'مستقطب (Δχ = 3.44 - 2.20 ≠ 0 وشكل غير متناظر)',
				cZ: 8,
				lZ: 1
			},
			{
				formula: 'NH3',
				nameAr: 'النشادر',
				central: 'N',
				ligands: ['H', 'H', 'H'],
				valencePairs: 4,
				bonding: 3,
				lone: 1,
				vsepr: 'AX₃E₁',
				vseprKatex: '\\mathrm{AX_3E_1}',
				vseprTypst: 'upright("AX")_3 upright("E")_1',
				geomAr: 'هرم ثلاثي القاعدة',
				polarAr: 'مستقطب (Δχ = 3.04 - 2.20 ≠ 0 وشكل هرمي)',
				cZ: 7,
				lZ: 1
			},
			{
				formula: 'CH4',
				nameAr: 'الميثان',
				central: 'C',
				ligands: ['H', 'H', 'H', 'H'],
				valencePairs: 4,
				bonding: 4,
				lone: 0,
				vsepr: 'AX₄',
				vseprKatex: '\\mathrm{AX_4}',
				vseprTypst: 'upright("AX")_4',
				geomAr: 'رباعي الوجوه منتظم',
				polarAr: 'غير مستقطب (التناظر الهندسي التام يلغي محصلة الاستقطاب)',
				cZ: 6,
				lZ: 1
			},
			{
				formula: 'PH3',
				nameAr: 'الفوسفين',
				central: 'P',
				ligands: ['H', 'H', 'H'],
				valencePairs: 4,
				bonding: 3,
				lone: 1,
				vsepr: 'AX₃E₁',
				vseprKatex: '\\mathrm{AX_3E_1}',
				vseprTypst: 'upright("AX")_3 upright("E")_1',
				geomAr: 'هرم ثلاثي القاعدة',
				polarAr: 'قليل الاستقطاب جداً (كهروسلبية P و H متقاربة)',
				cZ: 15,
				lZ: 1
			},
			{
				formula: 'H2S',
				nameAr: 'كبريتيد الهيدروجين',
				central: 'S',
				ligands: ['H', 'H'],
				valencePairs: 4,
				bonding: 2,
				lone: 2,
				vsepr: 'AX₂E₂',
				vseprKatex: '\\mathrm{AX_2E_2}',
				vseprTypst: 'upright("AX")_2 upright("E")_2',
				geomAr: 'مرفقي (زاوي)',
				polarAr: 'مستقطب (الروابط مستقطبة والشكل مرفقي)',
				cZ: 16,
				lZ: 1
			},
			{
				formula: 'CCl4',
				nameAr: 'رباعي كلور الميثان',
				central: 'C',
				ligands: ['Cl', 'Cl', 'Cl', 'Cl'],
				valencePairs: 16,
				bonding: 4,
				lone: 0,
				vsepr: 'AX₄',
				vseprKatex: '\\mathrm{AX_4}',
				vseprTypst: 'upright("AX")_4',
				geomAr: 'رباعي الوجوه منتظم',
				polarAr: 'غير مستقطب رغم استقطاب روابط C-Cl وذلك بسبب التناظر الرباعي المنتظم',
				cZ: 6,
				lZ: 17
			}
		];
		const pool = difficulty === 'easy' ? molecules.slice(0, 3) : molecules;
		const mol = rng.pick(pool);
		const sp = chemSpecies(mol.formula);

		const svg = buildLewisMoleculeSvg(mol.formula, mol.central, mol.ligands, mol.lone, mol.geomAr, mol.vsepr);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t1_lewis_${difficulty}_s${seed}`, svg);

		const distractorShapes: Array<{ vsepr: string; geom: string; fb: string }> = [
			{ vsepr: '\\mathrm{AX_2}', geom: 'خطي', fb: 'خطأ: تجاهلت وجود الأزواج غير الرابطة على الذرة المركزية.' },
			{ vsepr: '\\mathrm{AX_3}', geom: 'مثلث مستو', fb: 'خطأ: هذا الشكل يوافق ذرة مركزية دون أزواج حرة.' },
			{ vsepr: '\\mathrm{AX_4}', geom: 'رباعي الوجوه منتظم', fb: 'خطأ: لا يتطابق مع عدد الروابط والأزواج الحرة حول الذرة المركزية.' },
			{ vsepr: '\\mathrm{AX_2E_2}', geom: 'مرفقي (زاوي)', fb: 'خطأ: تحقق من عدد الذرات المرتبطة بالذرة المركزية والأزواج غير الرابطة.' },
			{ vsepr: '\\mathrm{AX_3E_1}', geom: 'هرم ثلاثي القاعدة', fb: 'خطأ: راجع صيغة جيلسبي (عدد الروابط وعدد الأزواج الحرة).' }
		].filter((d) => d.geom !== mol.geomAr);

		const mcq = buildUniqueMcqOptions(
			`$${mol.vseprKatex}$ — ${mol.geomAr}`,
			distractorShapes.slice(0, 3).map((d) => ({
				text: `$${d.vsepr}$ — ${d.geom}`,
				diagnosticFeedback: d.fb
			})),
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي صيغة جيلسبي (VSEPR) والشكل الهندسي الفضائي لجزيء ${mol.nameAr} ${sp.katex} (علماً أن ${mol.central}: Z=${mol.cZ} و ${mol.ligands[0]}: Z=${mol.lZ})؟`,
				questionTextAr: `حدد صيغة VSEPR والشكل الهندسي لجزيء ${sp.katex}:`,
				imageUrl: svgPath,
				imageCaption: `بنية جزيء ${mol.formula}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `تحيط بالذرة المركزية $${mol.central}$ عدد $n=${mol.bonding}$ أزواج رابطة و$m=${mol.lone}$ أزواج غير رابطة، فصيغته $${mol.vseprKatex}$ وشكله الهندسي: ${mol.geomAr}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ندرس جزيء ${mol.nameAr} ذي الصيغة المجملة ${sp.typst}.\nنعطي الأعداد الذرية: $"${mol.central}" (Z=${mol.cZ})$، $"${mol.ligands[0]}" (Z=${mol.lZ})$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `تمثيل لويس لجزيء ${mol.nameAr}`,
						width: 340
					},
					{
						type: 'text',
						content: `1) اكتب التوزيع الإلكتروني للذرتين $"${mol.central}"$ و$"${mol.ligands[0]}"$، ثم استنتج تكافؤ كل منهما.`,
						answer: `1) الذرة المركزية $"${mol.central}"$ ($Z=${mol.cZ}$): تكافؤها $${mol.bonding}$ (تشكل $${mol.bonding}$ روابط وتملك $${mol.lone}$ زوج غير رابط).\nالذرة المحيطية $"${mol.ligands[0]}"$ ($Z=${mol.lZ}$): تكافؤها $1$ (تشكل رابطة واحدة).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) احسب العدد الكلي للأزواج الإلكترونية التكافؤية في الجزيء ${sp.typst} وأعط تمثيل لويس له.`,
						answer: `2) العدد الكلي للأزواج الإلكترونية التكافؤية هو $${mol.valencePairs}$ أزواج (موزعة بين $${mol.bonding}$ أزواج رابطة حول $"${mol.central}"$ و$${mol.lone}$ زوج حر على $"${mol.central}"$${mol.ligands[0] === 'Cl' ? ' مع $3$ أزواج حرة على كل ذرة كلور' : ''}).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج صيغة جيلسبي ($"AX"_n "E"_m$) والشكل الهندسي الفضائي للجزيء مع تمثيله وفق نموذج كرام.`,
						answer: `3) تحيط بالذرة المركزية $${mol.bonding}$ أزواج رابطة و$${mol.lone}$ أزواج حرة ← صيغة جيلسبي: $${mol.vseprTypst}$.\nالشكل الهندسي: *${mol.geomAr}* (في تمثيل كرام: روابط في المستوي وأمامه وخلفه وفق التنافر الأصغري).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) فسّر حالة استقطاب الجزيء ${sp.typst} اعتماداً على كهروسلبية الذرات وشكله الهندسي.`,
						answer: `4) حالة الاستقطاب: ${mol.polarAr}.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`التكافؤ = عدد الإلكترونات التي تنقص الذرة لتحقيق قاعدة الثمانية (أو الثنائية للهيدروجين).`,
				`صيغة جيلسبي: $n$ عدد الذرات المرتبطة بالذرة المركزية، و$m$ عدد الأزواج غير الرابطة على الذرة المركزية فقط.`,
				`يكون الجزيء غير مستقطب إذا انعدمت محصلة استقطاب روابطه بالتناظر الهندسي التام (مثل $\\mathrm{AX_4}$ المتماثل أو $\\mathrm{AX_2}$).`
			],
			solutionStepsAr: [
				`تكافؤ $${mol.central}$ هو $${mol.bonding}$ وتكافؤ $${mol.ligands[0]}$ هو $1$.`,
				`صيغة جيلسبي: $${mol.vseprKatex}$ والشكل الهندسي: ${mol.geomAr}.`,
				`الاستقطاب: ${mol.polarAr}.`
			],
			finalAnswer: `${mol.vsepr} - ${mol.geomAr}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Rectilinear Motion, Delta v & Principle of Inertia (Lesson 4)
// ═══════════════════════════════════════════════════════════════════════════════

const tplRectilinearInertia: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t1_rectilinear_inertia',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'mechanics',
	titleAr: 'دراسة حركة مستقيمة (السرعة اللحظية، Δv، ومبدأ العطالة)',
	curriculumLessonId: 'phy_lesson_1as_tcst_t1_rectilinear_motion_forces',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const tauS = rng.pick([0.05, 0.1, 0.2]);
		const tauMs = Math.round(tauS * 1000);
		const mode = difficulty === 'easy' ? rng.pick(['accel', 'uniform'] as const) : rng.pick(['accel', 'decel'] as const);
		// Real positions in cm (scale 1:10 -> 1 cm on paper = 10 cm real? No, let's give direct real distances or clean 1:10 scale!)
		// Let's use scale 1 cm on figure = 0.1 m (10 cm) or direct positions in cm with real scale 1:1 in cm -> convert to m.
		// Using clean quadratic sequence x_k in cm: x_k = a * k^2 + b * k
		let xCm: number[];
		if (mode === 'accel') {
			const step0 = rng.pick([2, 3, 4]);
			const inc = rng.pick([2, 3]);
			xCm = [0];
			for (let i = 0; i < 5; i++) {
				xCm.push(xCm[i] + step0 + i * inc);
			}
		} else if (mode === 'decel') {
			const step0 = rng.pick([12, 14, 16]);
			const dec = rng.pick([2, 3]);
			xCm = [0];
			for (let i = 0; i < 5; i++) {
				xCm.push(xCm[i] + step0 - i * dec);
			}
		} else {
			const step0 = rng.pick([4, 5, 6]);
			xCm = [0, step0, 2 * step0, 3 * step0, 4 * step0, 5 * step0];
		}

		// Real distance factor: 1 cm on paper = 10 cm = 0.1 m (or 1 cm = 0.05 m? Let's say real positions directly in cm -> 1:1? No, 5 cm in 0.1s is 0.5 m/s, realistic lab air-track!).
		// Let's keep real positions directly in cm (scale 1:1): M0..M5 in cm!
		const d13M = (xCm[3] - xCm[1]) / 100;
		const d35M = (xCm[5] - xCm[3]) / 100;
		const v2 = roundTo(d13M / (2 * tauS), 2);
		const v4 = roundTo(d35M / (2 * tauS), 2);
		const dv3 = roundTo(Math.abs(v4 - v2), 2);
		const natureAr =
			mode === 'accel'
				? 'حركة مستقيمة متسارعة'
				: mode === 'decel'
					? 'حركة مستقيمة متباطئة'
					: 'حركة مستقيمة منتظمة';
		const dirAr =
			mode === 'accel'
				? 'في نفس جهة الحركة'
				: mode === 'decel'
					? 'في عكس جهة الحركة'
					: 'معدوم ($\\Delta \\vec{v} = \\vec{0}$)';

		const svg = buildStroboscopicTrackSvg(xCm, tauMs, mode);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t1_rect_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$v_2 = ${v2}\\,\\text{m/s}$ — ${natureAr}`,
			[
				{
					text: `$v_2 = ${roundTo(v2 * 2, 2)}\\,\\text{m/s}$ — ${natureAr}`,
					diagnosticFeedback: 'خطأ: نسيت القسمة على $2\\tau$ واكتفيت بالقسمة على $\\tau$!'
				},
				{
					text: `$v_2 = ${roundTo(v2 * 100, 2)}\\,\\text{m/s}$ — ${natureAr}`,
					diagnosticFeedback: 'خطأ: نسيت تحويل المسافة $M_1 M_3$ من السنتمتر ($\text{cm}$) إلى المتر ($\text{m}$).'
				},
				{
					text: `$v_2 = ${v4}\\,\\text{m/s}$ — ${mode === 'accel' ? 'حركة مستقيمة متباطئة' : 'حركة مستقيمة متسارعة'}`,
					diagnosticFeedback: 'خطأ: هذا مقدار السرعة $v_4$ وليس $v_2$، كما أن طبيعة الحركة غير صحيحة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في تسجيل متعاقب لحركة متحرك بفاصل زمني $\\tau = ${tauS}\\,\\text{s}$، كانت فواصل المواضع (بالحجم الحقيقي بـ $\\text{cm}$): $x_0=${xCm[0]}, x_1=${xCm[1]}, x_2=${xCm[2]}, x_3=${xCm[3]}, x_4=${xCm[4]}, x_5=${xCm[5]}$. احسب السرعة اللحظية $v_2$ وحدد طبيعة الحركة:`,
				questionTextAr: `احسب $v_2$ وحدد طبيعة الحركة:`,
				imageUrl: svgPath,
				imageCaption: `التسجيل المتعاقب للمواضع ($\\tau = ${tauMs}\\,\\text{ms}$)`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `المسافة $M_1 M_3 = ${xCm[3]} - ${xCm[1]} = ${xCm[3] - xCm[1]}\\,\\text{cm} = ${roundTo(d13M, 2)}\\,\\text{m}$. ومنه $v_2 = \\frac{${roundTo(d13M, 2)}}{2 \\times ${tauS}} = ${v2}\\,\\text{m/s}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يدرس مخبر الميكانيك حركة جسم صلب $(S)$ على منضدة أفقية، ويُسجل مواضع مركز عطالته $M_0, M_1, M_2, M_3, M_4, M_5$ خلال فترات زمنية متساوية $\\tau = ${tauS} "s"$ (الوثيقة بسلم $1:1$).\nالفواصل المقاسة بـ $"cm"$ هي: $x_0 = ${xCm[0]}$, $x_1 = ${xCm[1]}$, $x_2 = ${xCm[2]}$, $x_3 = ${xCm[3]}$, $x_4 = ${xCm[4]}$, $x_5 = ${xCm[5]}$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `التسجيل المتعاقب للمواضع M₀..M₅`,
						width: 350
					},
					{
						type: 'text',
						content: `1) حدد طبيعة حركة الجسم $(S)$ مع التعليل انطلاقاً من المسافات المتتالية المقطوعة خلال $\\tau$.`,
						answer: `1) المسافات المتتالية هي: $M_0 M_1 = ${xCm[1] - xCm[0]} "cm"$، $M_1 M_2 = ${xCm[2] - xCm[1]} "cm"$، $M_2 M_3 = ${xCm[3] - xCm[2]} "cm"$...\nبما أن المسار مستقيم والمسافات ${mode === 'accel' ? 'تتزايد' : mode === 'decel' ? 'تتناقص' : 'متساوية'}، فالحركة *${natureAr}*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) احسب قيمة السرعتين اللحظيتين $v_2$ و$v_4$ بوحدة $"m/s"$.`,
						answer: `2) $v_2 = frac(M_1 M_3, 2 tau) = frac(${roundTo(d13M, 2)}, ${roundTo(2 * tauS, 2)}) = ${v2} "m/s"$.\n$v_4 = frac(M_3 M_5, 2 tau) = frac(${roundTo(d35M, 2)}, ${roundTo(2 * tauS, 2)}) = ${v4} "m/s"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) احسب طويلة شعاع تغير السرعة $Delta arrow(v)_3 = arrow(v)_4 - arrow(v)_2$ وحدد خصائصه (المبدأ، الحامل، الجهة، الطويلة).`,
						answer: `3) خصائص $Delta arrow(v)_3$:\n- المبدأ: الموضع $M_3$.\n- الحامل: منطبق على المسار الأفقي.\n- الجهة: ${mode === 'accel' ? 'نفس جهة الحركة' : mode === 'decel' ? 'عكس جهة الحركة' : 'شعاع معدوم'}.\n- الطويلة: $||Delta arrow(v)_3|| = |v_4 - v_2| = ${dv3} "m/s"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) بالاستعانة بمبدأ العطالة، هل تخضع الجملة $(S)$ لقوة أفقية محصلة غير معدومة؟ حدد جهتها إن وُجدت.`,
						answer: `4) ${mode === 'uniform' ? 'بما أن $Delta arrow(v) = arrow(0)$، حسب مبدأ العطالة فإن محصلة القوى الخارجية معدومة ($sum arrow(F) = arrow(0)$).' : `بما أن $Delta arrow(v)_3 != arrow(0)$، حسب مبدأ العطالة فإن الجملة تخضع لقوة أفقية $arrow(F)$ لها نفس حامل ونفس جهة $Delta arrow(v)_3$ (أي ${mode === 'accel' ? 'في جهة الحركة: قوة محركة' : 'عكس جهة الحركة: قوة كبح/احتكاك'}).`}`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`السرعة اللحظية عند $M_i$ هي $v_i = \\frac{M_{i-1} M_{i+1}}{2\\tau}$ بعد تحويل المسافة من $\\text{cm}$ إلى $\\text{m}$.`,
				`إذا تزايدت السرعة يكون $\\Delta \\vec{v}$ في جهة الحركة؛ وإذا تناقصت يكون عكس جهة الحركة.`,
				`حسب مبدأ العطالة، وجود تغير في شعاع السرعة ($\Delta \\vec{v} \\neq \\vec{0}$) يدل على وجود قوة محصلة غير معدومة في نفس جهة $\\Delta \\vec{v}$.`
			],
			solutionStepsAr: [
				`طبيعة الحركة: ${natureAr} لأن المسافات خلال $\\tau$ ${mode === 'accel' ? 'تتزايد' : mode === 'decel' ? 'تتناقص' : 'ثابتة'}.`,
				`$v_2 = ${v2}\\,\\text{m/s}$ و$v_4 = ${v4}\\,\\text{m/s}$.`,
				`$\\|\\Delta \\vec{v}_3\\| = ${dv3}\\,\\text{m/s}$ ويكون ${dirAr}.`
			],
			finalAnswer: `${v2} m/s`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 (Integration): Matter & Chemical Bonding Synthesis
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationMatter: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t1_integration_matter',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة إدماجية (كيمياء): من الذرة والنظائر إلى هندسة الجزيئات',
	curriculumLessonId: 'phy_lesson_1as_tcst_t1_lewis_vsepr_geometry',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				xSym: 'Cl', xName: 'الكلور', xZ: 17, xA1: 35, p1: 75, xA2: 37, p2: 25,
				xCfg: '(K)^2 (L)^8 (M)^7', xPeriod: 3, xCol: 7, xIon: 'Cl-',
				partner: 'C', partnerZ: 6, partnerVal: 4, molFormula: 'CCl4', molName: 'رباعي كلور الكربون',
				vseprKatex: '\\mathrm{AX_4}', vseprTypst: 'upright("AX")_4', geomAr: 'رباعي الوجوه منتظم',
				loneCentral: 0, polarAr: 'الرابطة C-Cl مستقطبة (Cl أكثر كهروسلبية من C)، لكن الجزيء غير مستقطب لتناظره الرباعي التام'
			},
			{
				xSym: 'N', xName: 'الآزوت', xZ: 7, xA1: 14, p1: 99.6, xA2: 15, p2: 0.4,
				xCfg: '(K)^2 (L)^5', xPeriod: 2, xCol: 5, xIon: 'N^3-',
				partner: 'H', partnerZ: 1, partnerVal: 1, molFormula: 'NH3', molName: 'النشادر',
				vseprKatex: '\\mathrm{AX_3E_1}', vseprTypst: 'upright("AX")_3 upright("E")_1', geomAr: 'هرم ثلاثي القاعدة',
				loneCentral: 1, polarAr: 'الرابطة N-H مستقطبة (N أكثر كهروسلبية)، والجزيء مستقطب لأن شكله غير متناظر (هرمي)'
			},
			{
				xSym: 'O', xName: 'الأكسجين', xZ: 8, xA1: 16, p1: 99.8, xA2: 18, p2: 0.2,
				xCfg: '(K)^2 (L)^6', xPeriod: 2, xCol: 6, xIon: 'O^2-',
				partner: 'H', partnerZ: 1, partnerVal: 1, molFormula: 'H2O', molName: 'الماء',
				vseprKatex: '\\mathrm{AX_2E_2}', vseprTypst: 'upright("AX")_2 upright("E")_2', geomAr: 'مرفقي (زاوي)',
				loneCentral: 2, polarAr: 'الرابطة O-H مستقطبة والجزيء مستقطب لأن شكله المرفقي لا يلغي ثنائيات القطب'
			}
		];
		const c = rng.pick(cases);
		const avgM = roundTo((c.p1 * c.xA1 + c.p2 * c.xA2) / 100, 2);
		const nuc1 = nuclide(c.xA1, c.xZ, c.xSym);
		const nuc2 = nuclide(c.xA2, c.xZ, c.xSym);
		const ionDual = chemSpecies(c.xIon);
		const molDual = chemSpecies(c.molFormula);

		const centralSym = c.xSym === 'Cl' ? 'C' : c.xSym;
		const ligandsArr = c.xSym === 'Cl' ? ['Cl', 'Cl', 'Cl', 'Cl'] : c.xSym === 'N' ? ['H', 'H', 'H'] : ['H', 'H'];
		const svg = buildLewisMoleculeSvg(c.molFormula, centralSym, ligandsArr, c.loneCentral, c.geomAr, c.vseprKatex.replace(/\\mathrm\{|\}/g, ''));
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t1_int_matter_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`السطر ${c.xPeriod}، العمود ${c.xCol} — جزيء ${c.geomAr}`,
			[
				{
					text: `السطر ${c.xCol}، العمود ${c.xPeriod} — جزيء ${c.geomAr}`,
					diagnosticFeedback: 'خطأ: عكست بين رقم السطر (عدد الطبقات) ورقم العمود (إلكترونات التكافؤ).'
				},
				{
					text: `السطر ${c.xPeriod}، العمود ${c.xCol} — جزيء مثلث مستو`,
					diagnosticFeedback: 'خطأ: الشكل الهندسي لا يأخذ بعين الاعتبار صيغة VSEPR الصحيحة.'
				},
				{
					text: `السطر ${c.xPeriod}، العمود ${8 - c.xCol} — جزيء خطي`,
					diagnosticFeedback: 'خطأ: رقم العمود يساوي عدد إلكترونات التكافؤ وليس $8$ ناقص عددها.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `عنصر ${c.xName} (${c.xSym}) عدده الذري $Z=${c.xZ}$ يتحد مع ${c.partner} ($Z=${c.partnerZ}$) لتكوين جزيء ${c.molName} ${molDual.katex}. حدد موقعه في الجدول الدوري وشكل الجزيء:`,
				questionTextAr: `موقع ${c.xSym} وهندسة ${molDual.katex}:`,
				imageUrl: svgPath,
				imageCaption: `بنية جزيء ${c.molName}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `توزيع ${c.xSym} هو $${c.xCfg}$ (السطر ${c.xPeriod}، العمود ${c.xCol})، وشكل ${molDual.katex} حسب VSEPR ($${c.vseprKatex}$) هو ${c.geomAr}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الإدماجي الأول — الكيمياء',
				instruction: `نعتبر عنصر ${c.xName} ($"${c.xSym}"$) الذي يوجد في الطبيعة على شكل نظيرين ${nuc1.typst} بنسبة $${c.p1}%$ و${nuc2.typst} بنسبة $${c.p2}%$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `المعطيات البنيوية والهندسية للجزيء ${c.molFormula}`,
						width: 340
					},
					{
						type: 'text',
						content: `*الجزء الأول: النواة والنظائر والجدول الدوري*\n1) أوجد عدد النوترونات في كل نظير، ثم احسب الكتلة الذرية المتوسطة لعنصر ${c.xName}.\n2) اكتب التوزيع الإلكتروني لذرة $"${c.xSym}"$، وحدد موقعها في الجدول الدوري، ثم استنتج صيغة الشاردة البسيطة المستقرة لها.`,
						answer: `1) للنظير الأول $N_1 = ${c.xA1} - ${c.xZ} = ${c.xA1 - c.xZ}$ نوترون، وللثاني $N_2 = ${c.xA2} - ${c.xZ} = ${c.xA2 - c.xZ}$ نوترون.\nالكتلة المتوسطة: $M = frac(${c.p1} times ${c.xA1} + ${c.p2} times ${c.xA2}, 100) = ${avgM} "g/mol"$.\n2) التوزيع الإلكتروني: $${c.xCfg}$ ← السطر $${c.xPeriod}$، العمود $${c.xCol}$.\nالشاردة المستقرة (قاعدة الثمانية): ${ionDual.typst}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: تمثيل لويس ونموذج جيلسبي*\nيتحد عنصر $"${c.xSym}"$ مع العنصر $"${c.partner}"$ ($Z = ${c.partnerZ}$) لتكوين جزيء ${c.molName} ${molDual.typst}.\n1) حدد تكافؤ كل من $"${c.xSym}"$ و$"${c.partner}"$ وأعط تمثيل لويس للجزيء ${molDual.typst}.\n2) استنتج صيغته الرمزية حسب نموذج جيلسبي ($"VSEPR"$) وسمّ شكله الهندسي الفضائي.`,
						answer: `1) تكافؤ $"${c.xSym}"$ هو $${8 - c.xCol}$ وتكافؤ $"${c.partner}"$ هو $${c.partnerVal}$. تمثيل لويس يحقق قاعدة الثنائية لـ $"H"$ والثمانية لبقية الذرات (انظر الشكل).\n2) صيغة جيلسبي: $${c.vseprTypst}$ ← الشكل الهندسي: *${c.geomAr}*.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: الكهروسلبية واستقطاب الروابط*\nوضح مع التعليل هل الروابط التكافؤية في الجزيء ${molDual.typst} مستقطبة، وهل الجزيء ككل مستقطب؟`,
						answer: `${c.polarAr}.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`الكتلة الذرية المتوسطة = مجموع جداءات كل عدد كتلي في نسبته المئوية مقسوماً على $100$.`,
				`العمود $5$ أو $6$ أو $7$ يكتسب $3, 2, 1$ إلكترونات على الترتيب ليشبع طبقته السطحية بـ $8$.`,
				`قد تكون الروابط داخل الجزيء مستقطبة ومع ذلك يكون الجزيء غير مستقطب إذا كان ذا تناظر هندسي تام كـ $\\mathrm{AX_4}$.`
			],
			solutionStepsAr: [
				`الكتلة المتوسطة لـ ${c.xSym}: $${avgM}\\,\\text{g/mol}$، التوزيع: $${c.xCfg}$، الشاردة: ${ionDual.katex}.`,
				`في ${molDual.katex}: صيغة VSEPR هي $${c.vseprKatex}$ والشكل ${c.geomAr}.`,
				`${c.polarAr}.`
			],
			finalAnswer: `${c.geomAr}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 6 (Integration): Curvilinear/Circular Motion, Satellites & Reference
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationMechanics: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t1_integration_mechanics',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة إدماجية (ميكانيك): الحركة الدائرية والأقمار والمرجع الغاليلي',
	curriculumLessonId: 'phy_lesson_1as_tcst_t1_curvilinear_motion_satellites',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const satellites = [
			{ nameAr: 'ألكومسات-1 (Alcomsat-1)', hKm: 35786, rKm: 42157, vKms: 3.07, periodAr: '24 ساعة (مستقر أرضياً)' },
			{ nameAr: 'ألسات-2أ (Alsat-2A)', hKm: 670, rKm: 7041, vKms: 7.52, periodAr: '98 دقيقة' },
			{ nameAr: 'محطة الفضاء الدولية (ISS)', hKm: 400, rKm: 6771, vKms: 7.67, periodAr: '92.5 دقيقة' }
		];
		const sat = rng.pick(satellites);
		const circumferenceKm = Math.round(2 * Math.PI * sat.rKm);
		const periodS = Math.round(circumferenceKm / sat.vKms);
		const periodMin = roundTo(periodS / 60, 1);

		const svg = buildCurvilinearOrbitSvg(sat.vKms, sat.rKm, sat.nameAr);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t1_int_mech_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'مركزية متجهة نحو مركز الأرض وعمودية على $\\vec{v}$',
			[
				{
					text: 'معدومة ($\\Delta \\vec{v} = \\vec{0}$) لأن قيمة السرعة ثابتة',
					diagnosticFeedback: 'خطأ: رغم ثبات القيمة $v$، فإن اتجاه الشعاع $\\vec{v}$ يتغير باستمرار فـ $\\Delta \\vec{v} \\neq \\vec{0}$!'
				},
				{
					text: 'مماسية للمسار في نفس جهة السرعة $\\vec{v}$',
					diagnosticFeedback: 'خطأ: لو كانت القوة مماسية وفي جهة السرعة لتزايدت قيمة السرعة.'
				},
				{
					text: 'نحو الخارج (قوة طرد مركزي تبعد القمر عن الأرض)',
					diagnosticFeedback: 'خطأ: في المرجع الجيومركزي الغاليلي، القوة المؤثرة هي قوة جذب الأرض للقمر أي نحو المركز.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يدور القمر الاصطناعي الجزائري ${sat.nameAr} في مدار دائري حول مركز الأرض بسرعة ثابتة القيمة $v = ${sat.vKms}\\,\\text{km/s}$. ما هي خصائص شعاع تغير السرعة $\\Delta \\vec{v}$ والقوة المطبقة على القمر؟`,
				questionTextAr: `اتجاه $\\Delta \\vec{v}$ والقوة المطبقة على القمر الاصطناعي:`,
				imageUrl: svgPath,
				imageCaption: `مدار القمر الاصطناعي ${sat.nameAr}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `في الحركة الدائرية المنتظمة، شعاع تغير السرعة $\\Delta \\vec{v}$ والقوة الجاذبة المركزية يتجهان دوماً نحو مركز المدار (مركز الأرض) وعموديان على شعاع السرعة المماسي $\\vec{v}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الإدماجي الثاني — الميكانيك',
				instruction: `يدور القمر الاصطناعي ${sat.nameAr} حول الأرض في مدار دائري نصف قطره $r = ${sat.rKm} "km"$ (على ارتفاع $h = ${sat.hKm} "km"$) بسرعة ثابتة القيمة $v = ${sat.vKms} "km/s"$.\n(نعتبر $pi approx 3.1416$).`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `تمثيل مدار القمر الاصطناعي وشعاعي السرعة والقوة`,
						width: 350
					},
					{
						type: 'text',
						content: `*الجزء الأول: المرجع وطبيعة الحركة (2.5 نقطة)*\n1) ما هو المرجع الغاليلي الأنسب لدراسة حركة القمر الاصطناعي ${sat.nameAr}؟ عرّفه باختصار.\n2) حدد طبيعة حركة القمر الاصطناعي، وهل يتحقق مبدأ العطالة عليه؟ علل إجابتك.`,
						answer: `1) المرجع الأنسب هو *المرجع المركزي الأرضي (الجيومركزي)*: مبدؤه مركز الأرض ومحاوره الثلاثة متجهة نحو ثلاثة نجوم بعيدة ثابتة.\n2) الحركة *دائرية منتظمة*. لا يتحقق مبدأ العطالة ($sum arrow(F) != arrow(0)$) لأن المسار منحني (دائري) وليس مستقيماً، مما يثبت وجود قوة مؤثرة تغير اتجاه شعاع السرعة.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: التحليل الشعاعي والحسابي (3 نقاط)*\n1) صف خصائص شعاع السرعة $arrow(v)$ وشعاع تغير السرعة $Delta arrow(v)$ وشعاع القوة $arrow(F)$ عند موضع $S$ على المدار.\n2) احسب محيط المدار $L$ بالكيلومتر، ثم استنتج دور الحركة $T$ (زمن دورة كاملة) بالثواني ثم بالدقائق.`,
						answer: `1) شعاع السرعة $arrow(v)$ مماس للمدار وفي جهة الحركة وطويلته ثابتة؛ أما $Delta arrow(v)$ والقوة $arrow(F)$ فحاملهما نصف قطري و *متجهان نحو مركز الأرض* (قوة جاذبة مركزية) وعموديان على $arrow(v)$.\n2) محيط المدار: $L = 2 pi r = 2 times 3.1416 times ${sat.rKm} approx ${circumferenceKm} "km"$.\nالدور: $T = frac(L, v) = frac(${circumferenceKm}, ${sat.vKms}) approx ${periodS} "s" approx ${periodMin} "min"$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: مقاربة نسبية الحركة والشروط الابتدائية (2.5 نقطة)*\n1) لو انعدمت فجأة قوة جذب الأرض للقمر عند النقطة $S$، كيف تصبح حركته بعد تلك اللحظة؟ اذكر المبدأ الفيزيائي المعتمد.\n2) لو سُقطت أداة صيانة من القمر وهو يمر بالنقطة $S$ بسرعة القمر نفسه نحو الأرض (بفرض وجود سرعة ابتدائية مماسية)، ما شكل مسارها بالنسبة للمرجع الجيومركزي؟`,
						answer: `1) حسب *مبدأ العطالة*، عند انعدام القوى المؤثرة يواصل القمر حركته وفق المماس للمدار عند $S$ بـ *حركة مستقيمة منتظمة* بسرعة ثابتة $v = ${sat.vKms} "km/s"$.\n2) تملك الأداة سرعة ابتدائية غير موازية لقوة الجذب (مماسية)، لذا تتحرك في مسار *منحني* (قطع مكافئ أو مدار حول الأرض).`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`نختار المرجع المركزي الأرضي (الجيومركزي) لدراسة حركة الأقمار الاصطناعية حول الأرض.`,
				`الدور المداري هو المدة الزمنية اللازمة لقطع محيط الدائرة كاملاً: $T = \\frac{2\\pi r}{v}$.`,
				`انعدام القوة في لحظة ما يجعل الجسم يتحرك بحركة مستقيمة منتظمة وفق المماس (مبدأ العطالة).`
			],
			solutionStepsAr: [
				`المرجع: الجيومركزي، والحركة دائرية منتظمة، إذن القوة جاذبة مركزية ($\\Delta \\vec{v} \\neq \\vec{0}$).`,
				`محيط المدار $L \\approx ${circumferenceKm}\\,\\text{km}$ والدور $T \\approx ${periodS}\\,\\text{s} \\approx ${periodMin}\\,\\text{min}$.`,
				`عند انعدام القوة يواصل الجسم حركته وفق المماس بحركة مستقيمة منتظمة.`
			],
			finalAnswer: `T ≈ ${periodMin} min`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 1AS TCST Physics
// ═══════════════════════════════════════════════════════════════════════════════

export const PHYSICS_TEMPLATES_1AS_TCST_T1: PhysicsParameterizedTemplate[] = [
	tplAtomIsotopes,
	tplElectronPeriodic,
	tplLewisVsepr,
	tplRectilinearInertia,
	tplIntegrationMatter,
	tplIntegrationMechanics
];
