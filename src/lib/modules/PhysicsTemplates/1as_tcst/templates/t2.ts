import type { Difficulty, PhysicsGeneratedExerciseInstance, PhysicsParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { chemSpecies } from '../../chem-helpers';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot, wrapPhysicsSvg } from '../../svg-physics';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom SVG Builders for 1AS TCST T2
// ═══════════════════════════════════════════════════════════════════════════════

function buildPropulsionWheelSvg(isBraking: boolean, forceN: number): string {
	let body = `<defs>
		<marker id="pwBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
		<marker id="pwRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
		<marker id="pwGreen" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker>
	</defs>`;
	body += `<rect x="10" y="12" width="360" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="190" y="34" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">${isBraking ? 'حالة الكبح (التباطؤ)' : 'حالة الدفع (الانطلاق)'} — F = ${forceN} N</text>`;
	body += `<line x1="65" y1="54" x2="155" y2="54" stroke="#059669" stroke-width="2" marker-end="url(#pwGreen)"/>`;
	body += `<text x="110" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">جهة الحركة</text>`;
	body += `<line x1="35" y1="130" x2="345" y2="130" stroke="#334155" stroke-width="2.2"/>`;
	body += `<circle cx="190" cy="100" r="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2"/>`;
	body += `<circle cx="190" cy="100" r="6" fill="#0f172a"/>`;
	if (!isBraking) {
		body += `<line x1="190" y1="130" x2="112" y2="130" stroke="#dc2626" stroke-width="2.4" marker-end="url(#pwRed)"/>`;
		body += `<text x="135" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">F(عجلة/طريق)</text>`;
		body += `<line x1="190" y1="130" x2="268" y2="130" stroke="#2563eb" stroke-width="2.4" marker-end="url(#pwBlue)"/>`;
		body += `<text x="250" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">F(طريق/عجلة) محركة</text>`;
	} else {
		body += `<line x1="190" y1="130" x2="112" y2="130" stroke="#dc2626" stroke-width="2.4" marker-end="url(#pwRed)"/>`;
		body += `<text x="135" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">f (احتكاك مقاوم)</text>`;
		body += `<line x1="190" y1="130" x2="268" y2="130" stroke="#2563eb" stroke-width="2.4" marker-end="url(#pwBlue)"/>`;
		body += `<text x="250" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">F(عجلة/طريق)</text>`;
	}
	return wrapPhysicsSvg(380, 194, body);
}

function buildGravityAltitudeSvg(hKm: number, g0: number, gh: number): string {
	const cx = 92;
	const cy = 104;
	const rt = 48;
	let body = `<defs><marker id="grRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	body += `<circle cx="${cx}" cy="${cy}" r="${rt}" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>`;
	body += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">الأرض (R_T)</text>`;
	const sx = cx + rt + 56;
	body += `<line x1="${cx}" y1="${cy}" x2="${sx}" y2="${cy}" stroke="#64748b" stroke-width="1.3" stroke-dasharray="4,3"/>`;
	body += `<circle cx="${sx}" cy="${cy}" r="6" fill="#0f172a"/>`;
	body += `<text x="${sx}" y="${cy - 12}" text-anchor="middle" font-size="11" font-weight="bold">S (m)</text>`;
	body += `<line x1="${sx}" y1="${cy}" x2="${sx - 38}" y2="${cy}" stroke="#dc2626" stroke-width="2.3" marker-end="url(#grRed)"/>`;
	body += `<text x="${sx - 22}" y="${cy + 16}" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">F(T/S)</text>`;
	body += `<text x="${cx + rt + 28}" y="${cy - 8}" text-anchor="middle" font-size="10.5" fill="#475569">h = ${hKm} km</text>`;
	body += `<rect x="234" y="32" width="144" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="306" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">تغير الجاذبية بالارتفاع</text>`;
	body += `<text x="306" y="88" text-anchor="middle" font-size="11.5" fill="#1d4ed8">g₀ = ${g0} N/kg</text>`;
	body += `<text x="306" y="114" text-anchor="middle" font-size="11.5" fill="#dc2626">g_h = ${gh} N/kg</text>`;
	body += `<text x="306" y="144" text-anchor="middle" font-size="10.5" fill="#334155">d = R_T + h</text>`;
	return wrapPhysicsSvg(390, 200, body);
}

function buildDilutionFlasksSvg(c0: number, v0Ml: number, c1: number, v1Ml: number): string {
	let body = `<defs><marker id="dfArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	body += `<rect x="10" y="12" width="360" height="168" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="190" y="34" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">بروتوكول تحضير محلول ممدد (C₀ V₀ = C₁ V₁)</text>`;
	// Flask S0
	body += `<circle cx="72" cy="108" r="28" fill="#2563eb" fill-opacity="0.7" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<rect x="66" y="56" width="12" height="28" fill="#eff6ff" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<text x="72" y="152" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">S₀ : C₀ = ${c0} mol/L</text>`;
	// Arrow pipette
	body += `<line x1="108" y1="92" x2="184" y2="92" stroke="#dc2626" stroke-width="2" marker-end="url(#dfArr)"/>`;
	body += `<text x="146" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">V₀ = ${v0Ml} mL</text>`;
	// Flask S1
	body += `<circle cx="232" cy="108" r="32" fill="#93c5fd" fill-opacity="0.55" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<rect x="225" y="52" width="14" height="30" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<text x="232" y="155" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">S₁ : V₁ = ${v1Ml} mL</text>`;
	body += `<text x="322" y="96" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">C₁ = ${c1} mol/L</text>`;
	body += `<text x="322" y="120" text-anchor="middle" font-size="11" fill="#475569">F = ${roundTo(c0 / c1, 1)}</text>`;
	return wrapPhysicsSvg(380, 192, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Propulsion, Braking & Principle of Mutual Interaction
// ═══════════════════════════════════════════════════════════════════════════════

const tplPropulsionBraking: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t2_propulsion_braking',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'دفع وكبح متحرك (مبدأ الفعلين المتبادلين وقوة الاحتكاك)',
	curriculumLessonId: 'phy_lesson_1as_tcst_t2_propulsion_braking_friction',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isBraking = difficulty === 'easy' ? false : rng.pick([false, true]);
		const forceN = rng.pick([450, 600, 750, 900, 1200]);
		const massKg = rng.pick([900, 1000, 1200, 1500]);
		const g = 10;
		const weightN = massKg * g;

		const svg = buildPropulsionWheelSvg(isBraking, forceN);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t2_prop_${difficulty}_s${seed}`, svg);

		const correctOpt = isBraking
			? `قوة احتكاك مقاومة عكس جهة الحركة شدتها $${forceN}\\,\\text{N}$`
			: `قوة احتكاك محركة في نفس جهة الحركة شدتها $${forceN}\\,\\text{N}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: isBraking
						? `قوة احتكاك محركة في نفس جهة الحركة شدتها $${forceN}\\,\\text{N}$`
						: `قوة احتكاك مقاومة عكس جهة الحركة شدتها $${forceN}\\,\\text{N}$`,
					diagnosticFeedback: `خطأ: في حالة ${isBraking ? 'الكبح' : 'الدفع'}، قوة الطريق على العجلة تكون ${isBraking ? 'عكس جهة الحركة' : 'في نفس جهة الحركة'}.`
				},
				{
					text: `قوة معدومة لأن العجلة تدور دون انزلاق`,
					diagnosticFeedback: 'خطأ: دون احتكاك أفقي مع الطريق لن تتسارع السيارة ولن تتوقف عند الفرملة!'
				},
				{
					text: `قوة موجهة في نفس اتجاه $\\vec{F}_{\\text{عجلة/طريق}}$ وبشدة $${forceN * 2}\\,\\text{N}$`,
					diagnosticFeedback: 'خطأ: مبدأ الفعلين المتبادلين يقتضي تساوي الشدتين وتعاكس الجهتين.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `${isBraking ? 'أثناء كبح سيارة تسير نحو اليمين، تضغط عجلاتها على الطريق نحو اليمين بقوة أفقية شدتها' : 'أثناء انطلاق سيارة ذات دفع أمامي نحو اليمين، تدفع عجلاتها المحركة الطريق نحو اليسار بقوة أفقية شدتها'} $${forceN}\\,\\text{N}$. ما هي خصائص القوة الأفقية التي يطبقها الطريق على العجلات؟`,
				questionTextAr: `حدد خصائص القوة التي يطبقها الطريق على العجلة:`,
				imageUrl: svgPath,
				imageCaption: isBraking ? 'القوى المتبادلة عند الكبح' : 'القوى المتبادلة عند الدفع',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `حسب مبدأ الفعلين المتبادلين $\\vec{F}_{\\text{طريق/عجلة}} = -\\vec{F}_{\\text{عجلة/طريق}}$، إذن شدتها $${forceN}\\,\\text{N}$ وهي ${isBraking ? 'عكس جهة الحركة (احتكاك مقاوم)' : 'في جهة الحركة (احتكاك محرك)'}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `سيارة كتلتها $m = ${massKg} "kg"$ تسير على طريق أفقي خشن نحو اليمين ($g = ${g} "N/kg"$).\n${isBraking ? `في مرحلة الكبح، تؤثر العجلات على الطريق بقوة أفقية نحو اليمين شدتها $F_("عجلة/طريق") = ${forceN} "N"$.` : `في مرحلة الانطلاق، تدفع العجلات المحركة الطريق نحو اليسار بقوة أفقية شدتها $F_("عجلة/طريق") = ${forceN} "N"$.`}`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `تمثيل الفعلين المتبادلين بين العجلة والطريق`,
						width: 340
					},
					{
						type: 'text',
						content: `1) اذكر نص مبدأ الفعلين المتبادلين (القانون الثالث لنيوتن) واكتب علاقته الشعاعية بين العجلة والطريق.`,
						answer: `1) *مبدأ الفعلين المتبادلين*: إذا أثرت جملة $A$ على جملة $B$ بقوة $arrow(F)_(A/B)$، فإن الجملة $B$ تؤثر آنياً على الجملة $A$ بقوة $arrow(F)_(B/A)$ تساويها في الشدة، ولها نفس الحامل، وتعاكسها في الجهة:\n$arrow(F)_("طريق/عجلة") = -arrow(F)_("عجلة/طريق")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) استنتج خصائص القوة الأفقية $arrow(F)_("طريق/عجلة")$ (المبدأ، الحامل، الجهة، الشدة)، وبيّن نوع الاحتكاك هنا (محرك أم مقاوم).`,
						answer: `2) خصائص $arrow(F)_("طريق/عجلة")$:\n- المبدأ: سطح التماس بين العجلة والطريق.\n- الحامل: أفقي.\n- الجهة: ${isBraking ? 'نحو اليسار (عكس جهة الحركة)' : 'نحو اليمين (في جهة الحركة)'}.\n- الشدة: $F = ${forceN} "N"$.\nنوع الاحتكاك: *${isBraking ? 'احتكاك مقاوم' : 'احتكاك محرك'}*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب شدة ثقل السيارة $P$ واستنتج شدة رد فعل الطريق الشاقولي $R_N$ على السيارة.`,
						answer: `3) شدة الثقل: $P = m times g = ${massKg} times ${g} = ${weightN} "N"$.\nبما أن الحركة أفقية (توازن على المحور الشاقولي): $R_N = P = ${weightN} "N"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) فسر لماذا لا تستطيع السيارة ${isBraking ? 'التوقف بسرعة' : 'الانطلاق'} إذا كانت الطريق مغطاة بالجليد الأملس؟`,
						answer: `4) لأن الجليد الأملس يقلص معامل الاحتكاك بشكل كبير فتكاد تنعدم القوة الأفقية المتبادلة $arrow(F)_("طريق/عجلة")$ المسؤولة عن ${isBraking ? 'كبح' : 'دفع'} السيارة، فتنزلق العجلات في مكانها.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`مبدأ الفعلين المتبادلين: $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$ (نفس الشدة والحامل وجهتان متعاكستان).`,
				`الاحتكاك يكون محركاً عندما تكون جهته في جهة الحركة، ومقاوماً عندما يعاكس جهة الحركة.`,
				`على طريق أفقي، الثقل $P = mg$ يتوازن شاقولياً مع رد الفعل العمودي $R_N$.`
			],
			solutionStepsAr: [
				`العلاقة الشعاعية: $\\vec{F}_{\\text{طريق/عجلة}} = -\\vec{F}_{\\text{عجلة/طريق}}$.`,
				`الشدة $${forceN}\\,\\text{N}$، والاحتكاك ${isBraking ? 'مقاوم (عكس الحركة)' : 'محرك (في جهة الحركة)'}.`,
				`الثقل ورد الفعل العمودي: $P = R_N = ${weightN}\\,\\text{N}$.`
			],
			finalAnswer: `${forceN} N`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Universal Gravitation & Coulomb's Law
// ═══════════════════════════════════════════════════════════════════════════════

const tplGravitationCoulomb: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t2_gravitation_coulomb',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'قانون الجذب العام وقانون كولوم (التماسك في الكون والمادة)',
	curriculumLessonId: 'phy_lesson_1as_tcst_t2_universal_gravitation_cohesion',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const rtKm = 6400;
		const kFactor = difficulty === 'easy' ? rng.pick([1, 2, 3]) : rng.pick([1, 2, 3, 4]);
		const hKm = kFactor * rtKm;
		const g0 = 9.8;
		const denom = Math.pow(1 + kFactor, 2);
		const gh = roundTo(g0 / denom, 2);
		const satMass = rng.pick([200, 400, 500, 800, 1000]);
		const p0 = roundTo(satMass * g0, 1);
		const ph = roundTo(satMass * gh, 1);

		const svg = buildGravityAltitudeSvg(hKm, g0, gh);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t2_grav_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$g_h = ${gh}\\,\\text{N/kg}$`,
			[
				{
					text: `$g_h = ${roundTo(g0 / kFactor, 2)}\\,\\text{N/kg}$`,
					diagnosticFeedback: 'خطأ: البعد عن مركز الأرض هو $(R_T + h)$ وليس $h$، والعلاقة تربيعية!'
				},
				{
					text: `$g_h = ${roundTo(g0 / (kFactor * kFactor), 2)}\\,\\text{N/kg}$`,
					diagnosticFeedback: 'خطأ: استعملت $h$ بدل $(R_T + h)$ في المقام.'
				},
				{
					text: `$g_h = ${roundTo(g0 / (1 + kFactor), 2)}\\,\\text{N/kg}$`,
					diagnosticFeedback: 'خطأ: نسيت تربيع المقام $(R_T + h)^2$ في قانون الجذب العام!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تبلغ شدة الجاذبية على سطح الأرض $g_0 = 9.8\\,\\text{N/kg}$ (نصف قطر الأرض $R_T = ${rtKm}\\,\\text{km}$). ما هي شدة الجاذبية $g_h$ على ارتفاع $h = ${hKm}\\,\\text{km}$ (أي $h = ${kFactor === 1 ? '' : kFactor}R_T$)؟`,
				questionTextAr: `احسب شدة الجاذبية $g_h$ على ارتفاع $h = ${hKm}\\,\\text{km}$:`,
				imageUrl: svgPath,
				imageCaption: `قمر اصطناعي على ارتفاع h = ${hKm} km`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$g_h = g_0 \\left(\\frac{R_T}{R_T + h}\\right)^2 = 9.8 \\times \\left(\\frac{1}{1 + ${kFactor}}\\right)^2 = \\frac{9.8}{${denom}} \\approx ${gh}\\,\\text{N/kg}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يدرس التمرين القوتين الأساسيتين للتجاذب الكوني والتفاعل الكهربائي.\nنعطي: $R_T = ${rtKm} "km"$، $g_0 = ${g0} "N/kg"$، $G = 6.67 times 10^(-11) "SI"$، $k = 9 times 10^9 "SI"$، $e = 1.6 times 10^(-19) "C"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `قوة جذب الأرض لقمر اصطناعي كتلته m`,
						width: 340
					},
					{
						type: 'text',
						content: `1) عبّر عن شدة قوة جذب الأرض $F_G$ لقمر اصطناعي كتلته $m = ${satMass} "kg"$ موجود على سطح الأرض، ثم استنتج عبارة $g_0$ بدلالة $G$ و$M_T$ و$R_T$.`,
						answer: `1) على سطح الأرض ($d = R_T$): $F_G = G frac(M_T m, R_T^2)$.\nبمطابقة $F_G$ مع الثقل $P_0 = m g_0$ نجد: $g_0 = frac(G M_T, R_T^2)$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) نرفع القمر الاصطناعي إلى ارتفاع $h = ${hKm} "km" = ${kFactor} R_T$ عن سطح الأرض. أثبت أن $g_h = g_0 (frac(R_T, R_T + h))^2$، ثم احسب قيمة $g_h$ وشدة قوة جذب الأرض $F_h$ له عند هذا الارتفاع.`,
						answer: `2) عند الارتفاع $h$: $g_h = frac(G M_T, (R_T + h)^2) = frac(G M_T, R_T^2) (frac(R_T, R_T + h))^2 = g_0 (frac(R_T, R_T + h))^2$.\nتطبيق عددي: $g_h = ${g0} times (frac(1, ${1 + kFactor}))^2 = frac(${g0}, ${denom}) approx ${gh} "N/kg"$.\nالشدة على سطح الأرض $P_0 = ${p0} "N"$، وعلى الارتفاع $h$: $F_h = m g_h = ${satMass} times ${gh} = ${ph} "N"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) في ذرة الهيدروجين، يفصل بين البروتون ($+e$) والإلكترون ($-e$) مسافة $d = 5.3 times 10^(-11) "m"$. احسب شدة القوة الكهربائية $F_e$ بينهما وفق قانون كولوم.`,
						answer: `3) $F_e = k frac(|q_p q_e|, d^2) = 9 times 10^9 times frac((1.6 times 10^(-19))^2, (5.3 times 10^(-11))^2) approx 8.2 times 10^(-8) "N"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) علماً أن شدة قوة التجاذب الكوني بين البروتون والإلكترون هي $F_G approx 3.6 times 10^(-47) "N"$، احسب رتبة مقدار النسبة $F_e / F_G$ وماذا تستنتج حول تماسك المادة وتماسك الكون؟`,
						answer: `4) $frac(F_e, F_G) approx frac(8.2 times 10^(-8), 3.6 times 10^(-47)) approx 2.3 times 10^39$ (رتبة المقدار $10^39$).\nالاستنتاج: القوة الكهرومغناطيسية (كولوم) هي المسؤولة عن تماسك المادة والذرات، أما الجذب العام فيسود على المستوى الفلكي لتعادل الأجرام كهربائياً وضخامة كتلها.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`ثقل الجسم على سطح الأرض يساوي قوة التجاذب الكوني معه: $m g_0 = G \\frac{M_T m}{R_T^2}$.`,
				`المسافة من مركز الأرض على ارتفاع $h$ هي $(R_T + h)$ وليس $h$ فقط.`,
				`قانون كولوم: $F_e = k \\frac{|q_1 q_2|}{d^2}$ حيث $k = 9 \\times 10^9\\,\\text{SI}$.`
			],
			solutionStepsAr: [
				`عبارة الجاذبية السطحية: $g_0 = \\frac{G M_T}{R_T^2}$.`,
				`على ارتفاع $h = ${kFactor} R_T$: $g_h = ${gh}\\,\\text{N/kg}$، ومنه $F_h = ${ph}\\,\\text{N}$.`,
				`في ذرة الهيدروجين: $F_e \\approx 8.2 \\times 10^{-8}\\,\\text{N}$ والنسبة $F_e / F_G \\sim 10^{39}$.`
			],
			finalAnswer: `${gh} N/kg`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Mole, Molar Mass, Molar Volume & Ideal Gas Law
// ═══════════════════════════════════════════════════════════════════════════════

const tplMoleIdealGas: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t2_mole_ideal_gas',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'كمية المادة (المول، أفوغادرو) وقانون الغاز المثالي PV = nRT',
	curriculumLessonId: 'phy_lesson_1as_tcst_t2_mole_molar_mass_gas_law',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const gases = [
			{ formula: 'CO2', nameAr: 'ثنائي أكسيد الكربون', M: 44 },
			{ formula: 'CH4', nameAr: 'الميثان', M: 16 },
			{ formula: 'O2', nameAr: 'ثنائي الأكسجين', M: 32 },
			{ formula: 'N2', nameAr: 'ثنائي الآزوت', M: 28 },
			{ formula: 'NH3', nameAr: 'النشادر', M: 17 }
		];
		const gas = rng.pick(gases);
		const vLitre = difficulty === 'easy' ? rng.pick([4.157, 8.314]) : rng.pick([4.157, 8.314, 16.628]);
		const pBar = rng.pick([1.5, 2, 3]);
		const thetaC = rng.pick([27, 77, 127]);
		const tempK = thetaC + 273; // 300, 350, 400 K
		const R = 8.314;
		// n = (pBar * 1e5 * vLitre * 1e-3) / (8.314 * tempK) = (pBar * 100 * (vLitre/8.314)) / tempK
		const nMol = roundTo((pBar * 1e5 * vLitre * 1e-3) / (R * tempK), 3);
		const massG = roundTo(nMol * gas.M, 2);
		const densityAir = roundTo(gas.M / 29, 2);
		const vStdL = roundTo(nMol * 22.4, 2);

		const sp = chemSpecies(gas.formula);

		// Pressure-Volume hyperbola SVG at constant T
		const pvSvg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 18,
			yMin: 0,
			yMax: 5,
			xStep: 3,
			yStep: 1,
			xLabel: 'V (L)',
			yLabel: 'P (bar)',
			title: `منحنى بويل-ماريوط عند T = ${tempK} K`,
			curves: [{ fn: (v) => (v >= 1.5 ? (pBar * vLitre) / v : NaN), color: '#2563eb', label: 'PV = nRT' }],
			dashedGuides: [
				{ x1: vLitre, y1: 0, x2: vLitre, y2: pBar, color: '#dc2626' },
				{ x1: 0, y1: pBar, x2: vLitre, y2: pBar, color: '#dc2626' }
			],
			points: [{ x: vLitre, y: pBar, label: `(${roundTo(vLitre, 2)}, ${pBar})`, color: '#dc2626' }]
		});
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t2_gas_${difficulty}_s${seed}`, pvSvg);

		const mcq = buildUniqueMcqOptions(
			`$n = ${nMol}\\,\\text{mol}$`,
			[
				{
					text: `$n = ${roundTo(nMol * 1000, 2)}\\,\\text{mol}$`,
					diagnosticFeedback: 'خطأ: نسيت تحويل الحجم من اللتر ($\\text{L}$) إلى المتر المكعب ($\\text{m}^3 = 10^{-3}\\,\\text{L}$).'
				},
				{
					text: `$n = ${roundTo((pBar * 1e5 * vLitre * 1e-3) / (R * thetaC), 3)}\\,\\text{mol}$`,
					diagnosticFeedback: 'خطأ: عوضت درجة الحرارة بالدرجة المئوية ($^\\circ\\text{C}$) بدل الكلفن ($T = \\theta + 273$)!'
				},
				{
					text: `$n = ${roundTo(nMol / 10, 4)}\\,\\text{mol}$`,
					diagnosticFeedback: 'خطأ: راجع التحويل $1\\,\\text{bar} = 10^5\\,\\text{Pa}$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تحتوي قارورة حجمها $V = ${vLitre}\\,\\text{L}$ على غاز ${gas.nameAr} ${sp.katex} تحت ضغط $P = ${pBar}\\,\\text{bar}$ ودرجة حرارة $\\theta = ${thetaC}^\\circ\\text{C}$. احسب كمية المادة $n$ ($R = 8.314\\,\\text{SI}$):`,
				questionTextAr: `احسب كمية المادة $n$ لغاز ${sp.katex}:`,
				imageUrl: svgPath,
				imageCaption: `منحنى $P = f(V)$ عند درجة حرارة ثابتة $T = ${tempK}\\,\\text{K}$`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتحويل الوحدات الدولية: $P = ${pBar} \\times 10^5\\,\\text{Pa}$، $V = ${vLitre} \\times 10^{-3}\\,\\text{m}^3$، $T = ${thetaC} + 273 = ${tempK}\\,\\text{K}$. ومنه $n = \\frac{PV}{RT} = ${nMol}\\,\\text{mol}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `قارورة زجاجية محكمة الغلق سعتها $V = ${vLitre} "L"$ تحتوي على غاز ${gas.nameAr} ${sp.typst} ($M = ${gas.M} "g/mol"$) تحت ضغط $P = ${pBar} "bar"$ ودرجة حرارة $theta = ${thetaC} degree "C"$.\nنعطي: $R = 8.314 "J" dot "mol"^(-1) dot "K"^(-1)$، $N_A = 6.02 times 10^23 "mol"^(-1)$، $V_M = 22.4 "L/mol"$ في الشرطين النظاميين.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `منحنى تغير الضغط بدلالة الحجم عند درجة حرارة ثابتة`,
						width: 340
					},
					{
						type: 'text',
						content: `1) حوّل المقادير $P$ و$V$ و$T$ إلى الوحدات الدولية ($"Pa"$، $"m"^3$، $"K"$).`,
						answer: `1) $P = ${pBar} times 10^5 "Pa"$، $V = ${vLitre} times 10^(-3) "m"^3$، $T = ${thetaC} + 273 = ${tempK} "K"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) باستعمال قانون الغاز المثالي، احسب كمية المادة $n$ الموجودة في القارورة.`,
						answer: `2) من العلاقة $P V = n R T$:\n$n = frac(P V, R T) = frac(${pBar} times 10^5 times ${vLitre} times 10^(-3), 8.314 times ${tempK}) = ${nMol} "mol"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج كتلة الغاز $m$ بالغرام، والحجم $V_0$ الذي تشغله هذه الكمية في الشرطين النظاميين.`,
						answer: `3) الكتلة: $m = n times M = ${nMol} times ${gas.M} = ${massG} "g"$.\nالحجم في الشرطين النظاميين: $V_0 = n times V_M = ${nMol} times 22.4 = ${vStdL} "L"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) احسب كثافة هذا الغاز بالنسبة للهواء $d$، وهل هو أخف أم أثقل من الهواء؟`,
						answer: `4) $d = frac(M, 29) = frac(${gas.M}, 29) approx ${densityAir}$.\nبما أن $d ${densityAir > 1 ? '> 1$ فهو *أثقل* من الهواء' : '< 1$ فهو *أخف* من الهواء'}.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`في قانون الغاز المثالي $PV = nRT$: $1\\,\\text{bar} = 10^5\\,\\text{Pa}$، $1\\,\\text{L} = 10^{-3}\\,\\text{m}^3$، $T(\\text{K}) = \\theta(^\\circ\\text{C}) + 273$.`,
				`تربط الكتلة بكمية المادة عبر $m = n \\cdot M$ والحجم الغازي في الشرطين النظاميين عبر $V_0 = n \\cdot V_M$.`,
				`كثافة الغاز بالنسبة للهواء هي $d = M / 29$.`
			],
			solutionStepsAr: [
				`التحويلات: $P = ${pBar} \\times 10^5\\,\\text{Pa}$، $V = ${vLitre} \\times 10^{-3}\\,\\text{m}^3$، $T = ${tempK}\\,\\text{K}$.`,
				`كمية المادة: $n = ${nMol}\\,\\text{mol}$.`,
				`الكتلة $m = ${massG}\\,\\text{g}$، $V_0 = ${vStdL}\\,\\text{L}$، والكثافة $d = ${densityAir}$.`
			],
			finalAnswer: `${nMol} mol`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Aqueous Solutions, Concentrations & Dilution Protocol (Experimental)
// ═══════════════════════════════════════════════════════════════════════════════

const tplSolutionsDilution: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t2_solutions_dilution',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'matter',
	isExperimental: true,
	titleAr: 'تحضير المحاليل المائية والتركيز المولي وبروتوكول التمديد',
	curriculumLessonId: 'phy_lesson_1as_tcst_t2_solutions_molar_concentration',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const solutes = [
			{ formula: 'CuSO4', nameAr: 'كبريتات النحاس', M: 160 },
			{ formula: 'NaOH', nameAr: 'هيدروكسيد الصوديوم', M: 40 },
			{ formula: 'NaCl', nameAr: 'كلور الصوديوم', M: 58.5 },
			{ formula: 'KMnO4', nameAr: 'برمنغنات البوتاسيوم', M: 158 }
		];
		const sol = rng.pick(solutes);
		const c0 = rng.pick([0.4, 0.5, 0.8, 1.0]);
		const v0TotalL = 0.5;
		const m0G = roundTo(c0 * v0TotalL * sol.M, 2);
		const cm0 = roundTo(c0 * sol.M, 2);
		const fFactor = difficulty === 'easy' ? rng.pick([4, 5, 10]) : rng.pick([5, 8, 10, 20]);
		const c1 = roundTo(c0 / fFactor, 3);
		const v1Ml = rng.pick([100, 200, 250]);
		const v0TakenMl = roundTo((c1 * v1Ml) / c0, 1);
		const vWaterMl = roundTo(v1Ml - v0TakenMl, 1);

		const sp = chemSpecies(sol.formula);
		const svg = buildDilutionFlasksSvg(c0, v0TakenMl, c1, v1Ml);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t2_dil_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$V_0 = ${v0TakenMl}\\,\\text{mL}$`,
			[
				{
					text: `$V_0 = ${roundTo(v0TakenMl * 2, 1)}\\,\\text{mL}$`,
					diagnosticFeedback: 'خطأ: راجع علاقة التمديد $C_0 V_0 = C_1 V_1$.'
				},
				{
					text: `$V_0 = ${vWaterMl}\\,\\text{mL}$`,
					diagnosticFeedback: 'خطأ: هذا حجم الماء المقطر المضاف ($V_1 - V_0$) وليس الحجم المأخوذ $V_0$ من المحلول الأم!'
				},
				{
					text: `$V_0 = ${roundTo(v1Ml * fFactor, 1)}\\,\\text{mL}$`,
					diagnosticFeedback: 'خطأ: الحجم المأخوذ $V_0$ يجب أن يكون أصغر من $V_1$ وليس أكبر منه.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نريد تحضير $V_1 = ${v1Ml}\\,\\text{mL}$ من محلول ${sol.nameAr} ${sp.katex} تركيزه $C_1 = ${c1}\\,\\text{mol/L}$ بالتمديد انطلاقاً من محلول أم تركيزه $C_0 = ${c0}\\,\\text{mol/L}$. ما هو الحجم $V_0$ الواجب أخذه من المحلول الأم؟`,
				questionTextAr: `احسب الحجم $V_0$ الواجب أخذه للتمديد:`,
				imageUrl: svgPath,
				imageCaption: `مخطط عملية التمديد من $S_0$ إلى $S_1$`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتطبيق قانون التمديد $C_0 V_0 = C_1 V_1 \\implies V_0 = \\frac{${c1} \\times ${v1Ml}}{${c0}} = ${v0TakenMl}\\,\\text{mL}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يهدف هذا التمرين التجريبي إلى تحضير محلول أم $(S_0)$ لـ ${sol.nameAr} ${sp.typst} ($M = ${sol.M} "g/mol"$) ثم تمديده.\n1. نذيب كتلة $m_0 = ${m0G} "g"$ من ${sol.nameAr} الصلب النقي في الماء المقطر لتحضير $V = 500 "mL"$ من المحلول $(S_0)$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `مخطط تحضير المحلول الممدد (S₁)`,
						width: 340
					},
					{
						type: 'text',
						content: `1) احسب التركيز الكتلي $C_("m0")$ والتركيز المولي $C_0$ للمحلول الأم $(S_0)$، وتحقق من العلاقة $C_("m0") = C_0 times M$.`,
						answer: `1) $V = 0.5 "L"$:\n- التركيز الكتلي: $C_("m0") = frac(m_0, V) = frac(${m0G}, 0.5) = ${cm0} "g/L"$.\n- كمية المادة: $n_0 = frac(${m0G}, ${sol.M}) = ${roundTo(c0 * v0TotalL, 3)} "mol"$.\n- التركيز المولي: $C_0 = frac(n_0, V) = ${c0} "mol/L"$.\nتحقق: $C_0 times M = ${c0} times ${sol.M} = ${cm0} "g/L" = C_("m0")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) نريد الآن تحضير حجم $V_1 = ${v1Ml} "mL"$ من محلول ممدد $(S_1)$ تركيزه $C_1 = ${c1} "mol/L"$ انطلاقاً من $(S_0)$. ما هي الخاصية المحفوظة أثناء التمديد؟ احسب الحجم $V_0$ الواجب أخذه من $(S_0)$، وحجم الماء المقطر المضاف $V_("eau")$.`,
						answer: `2) أثناء التمديد تنحفظ كمية مادة المذاب ($n_0 = n_1$).\nقانون التمديد: $C_0 V_0 = C_1 V_1 arrow.r.double V_0 = frac(${c1} times ${v1Ml}, ${c0}) = ${v0TakenMl} "mL"$.\nحجم الماء المقطر المضاف: $V_("eau") = V_1 - V_0 = ${v1Ml} - ${v0TakenMl} = ${vWaterMl} "mL"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب معامل التمديد $F$ بطريقتين مختلفتين.`,
						answer: `3) الطريقة الأولى: $F = frac(C_0, C_1) = frac(${c0}, ${c1}) = ${fFactor}$.\nالطريقة الثانية: $F = frac(V_1, V_0) = frac(${v1Ml}, ${v0TakenMl}) = ${fFactor}$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) صف بإيجاز البروتوكول التجريبي (الزجاجيات الدقيقة وخطوات العمل) لتحضير المحلول $(S_1)$ في المخبر.`,
						answer: `4) *الزجاجيات والأدوات*: ماصة عيارية سعتها $${v0TakenMl} "mL"$ مزودة بإجاصة مص، حوجلة عيارية سعتها $${v1Ml} "mL"$، قارورة ماء مقطر، وبيشر.\n*الخطوات*: نسكب قليلاً من $(S_0)$ في بيشر، نأخذ بالماصة العيارية حجماً $V_0 = ${v0TakenMl} "mL"$ ونفرغه في الحوجلة العيارية ($${v1Ml} "mL"$) التي تحوي قليلاً من الماء المقطر، ثم نكمل بالماء المقطر حتى خط العيار، نسد الحوجلة ونرجها جيداً ليتجانس المحلول.`,
						mark: '2'
					}
				]
			},
			hints: [
				`التركيز الكتلي $C_m = \\frac{m}{V}$ والتركيز المولي $C = \\frac{n}{V} = \\frac{C_m}{M}$.`,
				`قانون التمديد: $C_0 V_0 = C_1 V_1$، ومعامل التمديد $F = \\frac{C_0}{C_1} = \\frac{V_1}{V_0}$.`,
				`لتحضير محلول ممدد بدقة نستعمل ماصة عيارية وحوجلة عيارية.`
			],
			solutionStepsAr: [
				`$C_{m0} = ${cm0}\\,\\text{g/L}$ و$C_0 = ${c0}\\,\\text{mol/L}$.`,
				`$V_0 = ${v0TakenMl}\\,\\text{mL}$، حجم الماء المضاف $V_{\\text{eau}} = ${vWaterMl}\\,\\text{mL}$، ومعامل التمديد $F = ${fFactor}$.`,
				`البروتوكول: أخذ $V_0$ بماصة عيارية في حوجلة عيارية سعتها $${v1Ml}\\,\\text{mL}$ وإكمال الماء المقطر حتى خط العيار.`
			],
			finalAnswer: `V₀ = ${v0TakenMl} mL`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 (Integration): Mechanics Synthesis (Propulsion + Gravitation)
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationMechanicsT2: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t2_integration_mechanics',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة إدماجية (ميكانيك): الدفع الصاروخي وقانون الجذب العام',
	curriculumLessonId: 'phy_lesson_1as_tcst_t2_universal_gravitation_cohesion',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const rocketMassKg = rng.pick([2000, 2500, 3000]);
		const thrustN = rng.pick([36000, 42000, 48000]);
		const rtKm = 6400;
		const hKm = rng.pick([6400, 12800]);
		const kFactor = Math.round(hKm / rtKm);
		const g0 = 9.8;
		const gh = roundTo(g0 / Math.pow(1 + kFactor, 2), 2);
		const fOrbital = roundTo(rocketMassKg * gh, 1);
		const netLaunch = thrustN - rocketMassKg * g0;

		const svg = buildGravityAltitudeSvg(hKm, g0, gh);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t2_int_mech_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`دفع الغازات نحو الأسفل يولد رد فعل مساوياً نحو الأعلى شدته $${thrustN}\\,\\text{N}$`,
			[
				{
					text: `دفع الصاروخ للهواء المحيط فقط، لذا لا يعمل في الفضاء`,
					diagnosticFeedback: 'خطأ: يعمل المحرك الصاروخي بمبدأ الفعلين المتبادلين مع الغازات المقذوفة حتى في الفراغ!'
				},
				{
					text: `انعدام قوة الجاذبية بمجرد الإقلاع`,
					diagnosticFeedback: 'خطأ: الجاذبية لا تنعدم بل تتناقص مع الارتفاع وفق $1/(R_T+h)^2$.'
				},
				{
					text: `قوة جذب الأرض للصاروخ أكبر من قوة الدفع`,
					diagnosticFeedback: 'خطأ: لكي ينطلق الصاروخ للأعلى يجب أن تكون قوة الدفع أكبر من ثقله.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يطرد محرك صاروخ مسبارٍ كتلته $m = ${rocketMassKg}\\,\\text{kg}$ غازات محترقة نحو الأسفل بقوة $${thrustN}\\,\\text{N}$. كيف يفسّر مبدأ الفعلين المتبادلين اندفاع الصاروخ في الفضاء؟`,
				questionTextAr: `تفسير الدفع الصاروخي بمبدأ الفعلين المتبادلين:`,
				imageUrl: svgPath,
				imageCaption: `وصول المسبار إلى مدار على ارتفاع h = ${hKm} km`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `يدفع الصاروخ الغازات للأسفل بقوة $${thrustN}\\,\\text{N}$ فترد الغازات بدفع الصاروخ للأعلى بقوة مساوية شدتها $${thrustN}\\,\\text{N}$ حسب مبدأ الفعلين المتبادلين، حتى في الفراغ دون حاجة للهواء.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الإدماجي الأول — الميكانيك',
				instruction: `تُطلق مركبة فضائية كتلتهـا $m = ${rocketMassKg} "kg"$ عمودياً من سطح الأرض لوضعها في مدار دائري على ارتفاع $h = ${hKm} "km"$.\nنعطي: $R_T = ${rtKm} "km"$، $g_0 = ${g0} "N/kg"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `المسبار على ارتفاع h = ${hKm} km حول الأرض`,
						width: 340
					},
					{
						type: 'text',
						content: `*الجزء الأول: مرحلة الإقلاع (مبدأ الفعلين المتبادلين)* (2.5 نقطة)\nأثناء الإقلاع، يقذف المحرك الغازات نحو الأسفل بقوة شدتها $F_("صاروخ/غاز") = ${thrustN} "N"$.\n1) اذكر مبدأ الفعلين المتبادلين واستنتج خصائص قوة الدفع $arrow(F)_("غاز/صاروخ")$.\n2) احسب ثقل المركبة عند سطح الأرض $P_0$، ثم استنتج محصلة القوتين المؤثرتين عليها لحظة الإقلاع (بإهمال مقاومة الهواء) وبيّن طبيعة حركتها.`,
						answer: `1) حسب مبدأ الفعلين المتبادلين: $arrow(F)_("غاز/صاروخ") = -arrow(F)_("صاروخ/غاز")$، إذن هي موجهة شاقولياً *نحو الأعلى* وشدتها $F = ${thrustN} "N"$ (وتعمل حتى في الفراغ).\n2) الثقل عند السطح: $P_0 = m g_0 = ${rocketMassKg} times ${g0} = ${roundTo(rocketMassKg * g0, 1)} "N"$.\nمحصلة القوتين نحو الأعلى: $F_("net") = ${thrustN} - ${roundTo(rocketMassKg * g0, 1)} = ${netLaunch} "N" > 0$ ← الحركة مستقيمة شاقولية متسارعة نحو الأعلى.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: في المدار (قانون الجذب العام)* (3 نقاط)\nتبلغ المركبة ارتفاع $h = ${hKm} "km" = ${kFactor} R_T$ فتُطفَأ المحركات وتدور بحركة دائرية منتظمة.\n1) احسب شدة الجاذبية $g_h$ على هذا الارتفاع.\n2) استنتج شدة قوة جذب الأرض للمركبة $F_(T/S)$ في مدارها، واذكر خصائص شعاع تغير السرعة $Delta arrow(v)$ أثناء الدوران.`,
						answer: `1) $g_h = g_0 (frac(R_T, R_T + h))^2 = ${g0} times (frac(1, ${1 + kFactor}))^2 = ${gh} "N/kg"$.\n2) شدة قوة الجذب: $F_(T/S) = m g_h = ${rocketMassKg} times ${gh} = ${fOrbital} "N"$.\nأثناء الحركة الدائرية المنتظمة: $Delta arrow(v) != arrow(0)$، حامله نصف قطري ومتجه نحو مركز الأرض وعمودي على شعاع السرعة المماسي.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: التماسك الكوني والمرجع* (2.5 نقطة)\n1) ما هو المرجع الغاليلي المناسب لدراسة حركة المركبة في مدارها؟\n2) لماذا تسيطر قوة الجذب العام على حركة المركبات والكواكب في الفضاء بدلاً من القوة الكهربائية (كولوم) رغم أن الأخيرة أقوى بـ $10^39$ مرة في الذرة؟`,
						answer: `1) المرجع المناسب هو *المرجع المركزي الأرضي (الجيومركزي)*.\n2) لأن الكواكب والأجرام السماوية والمركبات متعادلة كهربائياً تقريباً (محصلة شحنتها معدومة)، بينما تمتلك كتلاً كبيرة جداً تجعل قوة التجاذب الكوني هي السائدة في الكون.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`الدفع الصاروخي يعتمد على رد فعل الغازات المقذوفة لا على دفع الهواء المحيط.`,
				`محصلة القوى عند الإقلاع الشاقولي: $F_{\\text{دفع}} - P_0$.`,
				`في المدار الدائري المنتظم، $g_h = g_0 (R_T / (R_T + h))^2$.`
			],
			solutionStepsAr: [
				`قوة الدفع نحو الأعلى $${thrustN}\\,\\text{N}$، والمحصلة عند الإقلاع $${netLaunch}\\,\\text{N}$.`,
				`عند الارتفاع $h = ${hKm}\\,\\text{km}$: $g_h = ${gh}\\,\\text{N/kg}$ و$F_{T/S} = ${fOrbital}\\,\\text{N}$.`,
				`المرجع الجيومركزي مناسب، والجاذبية تسود كونياً لتعادل الأجرام كهربائياً.`
			],
			finalAnswer: `${fOrbital} N`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 6 (Integration): Matter Synthesis (Commercial Bottle + Dilution + Gas)
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationMatterT2: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t2_integration_matter',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	isExperimental: true,
	titleAr: 'مسألة إدماجية (كيمياء): محلول تجاري، تمديد، وقانون الغاز المثالي',
	curriculumLessonId: 'phy_lesson_1as_tcst_t2_solutions_molar_concentration',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const P = rng.pick([36.5, 32, 34]);
		const d = rng.pick([1.16, 1.18, 1.19]);
		const Mhcl = 36.5;
		const c0 = roundTo((10 * P * d) / Mhcl, 2);
		const v1Ml = rng.pick([200, 250, 500]);
		const c1 = rng.pick([0.5, 0.8, 1.0]);
		const v0Ml = roundTo((c1 * v1Ml) / c0, 1);
		// Using part of S1 (say 100 mL) to produce n_H2 = 0.5 * c1 * 0.1 mol of H2 gas
		const nGas = roundTo(0.5 * c1 * 0.1, 3);
		const tempK = 300; // 27 °C
		const pPa = 1.0e5;
		const vGasL = roundTo(((nGas * 8.314 * tempK) / pPa) * 1000, 2);

		const hcl = chemSpecies('HCl');
		const h2 = chemSpecies('H2');
		const svg = buildDilutionFlasksSvg(c0, v0Ml, c1, v1Ml);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t2_int_matter_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$C_0 = ${c0}\\,\\text{mol/L}$`,
			[
				{
					text: `$C_0 = ${roundTo(c0 / 10, 2)}\\,\\text{mol/L}$`,
					diagnosticFeedback: 'خطأ: نسيت العامل $10$ في علاقة المحلول التجاري $C_0 = \\frac{10 P d}{M}$ (كتلة $1\\,\\text{L}$ هي $1000 d\\,\\text{g}$).'
				},
				{
					text: `$C_0 = ${roundTo(c0 / d, 2)}\\,\\text{mol/L}$`,
					diagnosticFeedback: 'خطأ: لم تضرب في الكثافة $d$ لحساب كتلة $1\\,\\text{L}$ من المحلول.'
				},
				{
					text: `$C_0 = ${roundTo((10 * P) / Mhcl, 2)}\\,\\text{mol/L}$`,
					diagnosticFeedback: 'خطأ: تجاهلت كثافة المحلول التجاري $d$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تحمل قارورة حمض كلور الماء التجاري ${hcl.katex} البيانات: $P = ${P}\\%$، $d = ${d}$، $M = ${Mhcl}\\,\\text{g/mol}$. ما هو التركيز المولي $C_0$ للمحلول التجاري؟`,
				questionTextAr: `احسب التركيز المولي التجاري $C_0$:`,
				imageUrl: svgPath,
				imageCaption: `تحضير المحلول الممدد انطلاقاً من المحلول التجاري`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$C_0 = \\frac{10 \\cdot P \\cdot d}{M} = \\frac{10 \\times ${P} \\times ${d}}{${Mhcl}} \\approx ${c0}\\,\\text{mol/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الإدماجي الثاني — الكيمياء',
				instruction: `توجد في المخبر قارورة تجارية لحمض كلور الماء (${chemSpecies('H3O+').typst} + ${chemSpecies('Cl-').typst}) تحمل الملصقة التالية:\nالنقاوة الكتلية $P = ${P}%$، الكثافة $d = ${d}$، الكتلة المولية $M("HCl") = ${Mhcl} "g/mol"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `بروتوكول تمديد المحلول التجاري (S₀)`,
						width: 340
					},
					{
						type: 'text',
						content: `*الجزء الأول: دراسة المحلول التجاري* (2 نقطة)\n1) احسب كتلة $1 "L"$ من المحلول التجاري $(S_0)$، ثم استنتج كتلة حمض كلور الماء النقي الموجودة فيه.\n2) بيّن أن التركيز المولي للمحلول التجاري يُعطى بالعلاقة $C_0 = frac(10 P d, M)$ واحسب قيمته.`,
						answer: `1) كتلة $1 "L"$ من المحلول: $m_("sol") = rho times V = (1000 d) times 1 = ${roundTo(1000 * d, 0)} "g"$.\nكتلة الحمض النقي: $m_("HCl") = frac(P, 100) times m_("sol") = 10 P d = ${roundTo(10 * P * d, 1)} "g"$.\n2) $C_0 = frac(n, V) = frac(m_("HCl"), M times 1) = frac(10 P d, M) = frac(10 times ${P} times ${d}, ${Mhcl}) approx ${c0} "mol/L"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: تحضير المحلول الممدد* (2.5 نقطة)\nنريد تحضير محلول ممدد $(S_1)$ حجمه $V_1 = ${v1Ml} "mL"$ وتركيزه $C_1 = ${c1} "mol/L"$.\n1) احسب الحجم $V_0$ الواجب أخذه من $(S_0)$ ومعامل التمديد $F$.\n2) ما هي الاحتياطات الأمنية والزجاجيات المستعملة عند تمديد حمض مركز؟`,
						answer: `1) $V_0 = frac(C_1 V_1, C_0) = frac(${c1} times ${v1Ml}, ${c0}) approx ${v0Ml} "mL"$، ومعامل التمديد $F = frac(C_0, C_1) = ${roundTo(c0 / c1, 2)}$.\n2) ارتداء المئزر والنظارات والقفازات؛ أخذ $V_0$ بالماصة العيارية وإفراغها بحذر فوق كمية من الماء المقطر داخل حوجلة عيارية سعتها $${v1Ml} "mL"$ (نضيف الحمض إلى الماء وليس العكس) ثم نكمل بالماء المقطر حتى خط العيار.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: حساب حجم الغاز الناتج* (2.5 نقطة)\nنأخذ $100 "mL"$ من المحلول $(S_1)$ فيتفاعل كلياً مع فائض من الزنك فينتج $n_("H"_2) = ${nGas} "mol"$ من غاز ثنائي الهيدروجين ${h2.typst} عند درجة حرارة $27 degree "C"$ وضغط $P = 1.0 times 10^5 "Pa"$.\nاحسب الحجم $V_("H"_2)$ المنطلق باللتر ($R = 8.314 "SI"$).`,
						answer: `باستعمال قانون الغاز المثالي: $T = 27 + 273 = ${tempK} "K"$.\n$V_("H"_2) = frac(n R T, P) = frac(${nGas} times 8.314 times ${tempK}, 1.0 times 10^5) = ${roundTo(vGasL / 1000, 5)} "m"^3 = ${vGasL} "L"$.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`علاقة تركيز المحلول التجاري: $C_0 = \\frac{10 P d}{M}$.`,
				`في التمديد: $C_0 V_0 = C_1 V_1$، ونضيف الحمض إلى الماء وليس العكس.`,
				`في قانون الغاز المثالي: $V(\\text{m}^3) = \\frac{nRT}{P}$ ثم نضرب في $1000$ للتحويل إلى اللتر.`
			],
			solutionStepsAr: [
				`$C_0 = ${c0}\\,\\text{mol/L}$.`,
				`$V_0 = ${v0Ml}\\,\\text{mL}$ ومعامل التمديد $F = ${roundTo(c0 / c1, 2)}$.`,
				`حجم غاز ${h2.katex} الناتج: $V = ${vGasL}\\,\\text{L}$.`
			],
			finalAnswer: `${c0} mol/L`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates for 1AS TCST Physics
// ═══════════════════════════════════════════════════════════════════════════════

export const PHYSICS_TEMPLATES_1AS_TCST_T2: PhysicsParameterizedTemplate[] = [
	tplPropulsionBraking,
	tplGravitationCoulomb,
	tplMoleIdealGas,
	tplSolutionsDilution,
	tplIntegrationMechanicsT2,
	tplIntegrationMatterT2
];
