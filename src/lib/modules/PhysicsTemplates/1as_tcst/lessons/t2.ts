import type { PhysicsInteractiveLessonData } from '../../types';
import { wrapPhysicsSvg } from '../../svg-physics';

// ===========================================================================
// SVG Helpers for 1AS TCST Physics T2
// ===========================================================================

function svgPropulsionBrakingDiagram(): string {
	let body = `<defs>
		<marker id="pbBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
		<marker id="pbRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
		<marker id="pbGreen" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker>
	</defs>`;
	// Left: Propulsion (car wheel pushes road backward -> road pushes wheel forward)
	body += `<rect x="10" y="14" width="184" height="178" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.3"/>`;
	body += `<text x="102" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="#065f46">1. حالة الدفع (انطلاق)</text>`;
	body += `<line x1="22" y1="126" x2="182" y2="126" stroke="#334155" stroke-width="2"/>`;
	// Motion arrow
	body += `<line x1="65" y1="54" x2="135" y2="54" stroke="#059669" stroke-width="1.8" marker-end="url(#pbGreen)"/>`;
	body += `<text x="100" y="48" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#059669">جهة الحركة</text>`;
	// Wheel
	body += `<circle cx="102" cy="96" r="28" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.2"/>`;
	body += `<circle cx="102" cy="96" r="6" fill="#0f172a"/>`;
	// F wheel/road (backward)
	body += `<line x1="102" y1="126" x2="48" y2="126" stroke="#dc2626" stroke-width="2.4" marker-end="url(#pbRed)"/>`;
	body += `<text x="64" y="144" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">F(عجلة/طريق)</text>`;
	// F road/wheel (forward - driving friction)
	body += `<line x1="102" y1="126" x2="156" y2="126" stroke="#2563eb" stroke-width="2.4" marker-end="url(#pbBlue)"/>`;
	body += `<text x="144" y="144" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#2563eb">F(طريق/عجلة)</text>`;
	body += `<text x="102" y="172" text-anchor="middle" font-size="10.5" fill="#065f46">احتكاك محرك في جهة الحركة</text>`;

	// Right: Braking (skid/brake -> friction resists motion)
	body += `<rect x="206" y="14" width="184" height="178" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.3"/>`;
	body += `<text x="298" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">2. حالة الكبح (تباطؤ)</text>`;
	body += `<line x1="218" y1="126" x2="378" y2="126" stroke="#334155" stroke-width="2"/>`;
	body += `<line x1="260" y1="54" x2="330" y2="54" stroke="#059669" stroke-width="1.8" marker-end="url(#pbGreen)"/>`;
	body += `<text x="295" y="48" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#059669">جهة الحركة</text>`;
	body += `<circle cx="298" cy="96" r="28" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.2"/>`;
	body += `<circle cx="298" cy="96" r="6" fill="#0f172a"/>`;
	// F road/wheel (backward - resistive friction)
	body += `<line x1="298" y1="126" x2="244" y2="126" stroke="#dc2626" stroke-width="2.4" marker-end="url(#pbRed)"/>`;
	body += `<text x="260" y="144" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">f (مقاومة)</text>`;
	// F wheel/road (forward)
	body += `<line x1="298" y1="126" x2="352" y2="126" stroke="#2563eb" stroke-width="2.4" marker-end="url(#pbBlue)"/>`;
	body += `<text x="342" y="144" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#2563eb">F(عجلة/طريق)</text>`;
	body += `<text x="298" y="172" text-anchor="middle" font-size="10.5" fill="#991b1b">احتكاك مقاوم عكس جهة الحركة</text>`;

	return wrapPhysicsSvg(400, 206, body);
}

function svgGravitationVsCoulombDiagram(): string {
	let body = `<defs>
		<marker id="gcRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
		<marker id="gcBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
	</defs>`;
	// Top: Universal Gravitation
	body += `<rect x="12" y="12" width="376" height="86" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.3"/>`;
	body += `<text x="200" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">التجاذب الكوني (تماسك الكون): قوة جذابة دوماً</text>`;
	body += `<circle cx="95" cy="60" r="14" fill="#1d4ed8"/><text x="95" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">mA</text>`;
	body += `<circle cx="305" cy="60" r="11" fill="#059669"/><text x="305" y="64" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">mB</text>`;
	body += `<line x1="109" y1="60" x2="162" y2="60" stroke="#dc2626" stroke-width="2.2" marker-end="url(#gcRed)"/>`;
	body += `<line x1="294" y1="60" x2="241" y2="60" stroke="#dc2626" stroke-width="2.2" marker-end="url(#gcRed)"/>`;
	body += `<text x="150" y="52" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">F(B/A)</text>`;
	body += `<text x="252" y="52" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">F(A/B)</text>`;
	body += `<line x1="95" y1="84" x2="305" y2="84" stroke="#64748b" stroke-width="1.2" stroke-dasharray="4,3"/>`;
	body += `<text x="200" y="80" text-anchor="middle" font-size="10.5" fill="#334155">المسافة d بين المركزين</text>`;

	// Bottom: Coulomb Force
	body += `<rect x="12" y="108" width="376" height="88" rx="8" fill="#fefce8" stroke="#fcd34d" stroke-width="1.3"/>`;
	body += `<text x="200" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">التأثير الكهربائي (كولوم — تماسك الذرة): تجاذب أو تنافر</text>`;
	body += `<circle cx="95" cy="158" r="13" fill="#dc2626"/><text x="95" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">+q₁</text>`;
	body += `<circle cx="305" cy="158" r="13" fill="#2563eb"/><text x="305" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">-q₂</text>`;
	body += `<line x1="108" y1="158" x2="162" y2="158" stroke="#2563eb" stroke-width="2.2" marker-end="url(#gcBlue)"/>`;
	body += `<line x1="292" y1="158" x2="238" y2="158" stroke="#2563eb" stroke-width="2.2" marker-end="url(#gcBlue)"/>`;
	body += `<text x="200" y="152" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">Fe = k |q₁·q₂| / d²</text>`;
	body += `<text x="200" y="182" text-anchor="middle" font-size="10.5" fill="#92400e">في الذرة: Fe ≫ FG (أكبر بـ 10³⁹ مرة!)</text>`;
	return wrapPhysicsSvg(400, 208, body);
}

function svgMoleBridgeDiagram(): string {
	let body = `<defs><marker id="mbArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1e293b"/></marker></defs>`;
	// Center hub: n (mol)
	body += `<circle cx="200" cy="105" r="34" fill="#2563eb" stroke="#1e3a8a" stroke-width="2.2"/>`;
	body += `<text x="200" y="102" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">n (mol)</text>`;
	body += `<text x="200" y="120" text-anchor="middle" font-size="10.5" fill="#dbeafe">كمية المادة</text>`;

	const nodes = [
		{ x: 64, y: 42, title: 'عدد الأفراد N', formula: 'n = N / N_A', color: '#059669', bg: '#ecfdf5' },
		{ x: 336, y: 42, title: 'الكتلة m', formula: 'n = m / M', color: '#dc2626', bg: '#fef2f2' },
		{ x: 64, y: 168, title: 'الحجم الغازي Vg', formula: 'n = Vg / V_M', color: '#d97706', bg: '#fefce8' },
		{ x: 336, y: 168, title: 'الغاز المثالي', formula: 'n = P·V / (R·T)', color: '#7c3aed', bg: '#f5f3ff' }
	];
	for (const nd of nodes) {
		body += `<rect x="${nd.x - 54}" y="${nd.y - 26}" width="108" height="52" rx="8" fill="${nd.bg}" stroke="${nd.color}" stroke-width="1.6"/>`;
		body += `<text x="${nd.x}" y="${nd.y - 6}" text-anchor="middle" font-size="11" font-weight="bold" fill="${nd.color}">${nd.title}</text>`;
		body += `<text x="${nd.x}" y="${nd.y + 14}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${nd.formula}</text>`;
	}
	// Connecting lines
	body += `<line x1="118" y1="54" x2="170" y2="85" stroke="#1e293b" stroke-width="1.6" marker-end="url(#mbArr)"/>`;
	body += `<line x1="282" y1="54" x2="230" y2="85" stroke="#1e293b" stroke-width="1.6" marker-end="url(#mbArr)"/>`;
	body += `<line x1="118" y1="156" x2="170" y2="125" stroke="#1e293b" stroke-width="1.6" marker-end="url(#mbArr)"/>`;
	body += `<line x1="282" y1="156" x2="230" y2="125" stroke="#1e293b" stroke-width="1.6" marker-end="url(#mbArr)"/>`;
	return wrapPhysicsSvg(400, 210, body);
}

function svgDilutionProtocolDiagram(): string {
	let body = `<defs><marker id="dlArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	// Left: Mother flask C0
	body += `<rect x="34" y="34" width="12" height="54" fill="#eff6ff" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<circle cx="40" cy="116" r="28" fill="#3b82f6" fill-opacity="0.7" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<text x="40" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">المحلول الأم (S₀)</text>`;
	body += `<text x="40" y="176" text-anchor="middle" font-size="10.5" fill="#334155">تركيزه C₀</text>`;

	// Pipette taking V0
	body += `<line x1="80" y1="82" x2="152" y2="82" stroke="#dc2626" stroke-width="2" marker-end="url(#dlArr)"/>`;
	body += `<text x="116" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">أخذ V₀ بمصة</text>`;

	// Middle: Daughter flask (dark to light)
	body += `<rect x="190" y="30" width="14" height="58" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<line x1="188" y1="50" x2="206" y2="50" stroke="#dc2626" stroke-width="1.5"/>`;
	body += `<text x="214" y="54" font-size="9.5" font-weight="bold" fill="#dc2626">خط العيار</text>`;
	body += `<circle cx="197" cy="116" r="30" fill="#93c5fd" fill-opacity="0.55" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<text x="197" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">حوجلة عيارية V₁</text>`;
	body += `<text x="197" y="176" text-anchor="middle" font-size="10.5" fill="#334155">إضافة الماء المقطر</text>`;

	// Right: Conservation of mole card
	body += `<rect x="255" y="28" width="134" height="148" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.4"/>`;
	body += `<text x="322" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#065f46">قانون التمديد</text>`;
	body += `<text x="322" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">n₀ = n₁</text>`;
	body += `<text x="322" y="102" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#2563eb">C₀ · V₀ = C₁ · V₁</text>`;
	body += `<line x1="270" y1="118" x2="374" y2="118" stroke="#a7f3d0" stroke-width="1"/>`;
	body += `<text x="322" y="140" text-anchor="middle" font-size="11" fill="#065f46">معامل التمديد:</text>`;
	body += `<text x="322" y="160" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">F = C₀/C₁ = V₁/V₀</text>`;
	return wrapPhysicsSvg(400, 194, body);
}

// ===========================================================================
// Exported Trimester 2 Interactive Lessons for 1AS TCST Physics
// ===========================================================================

export const PHYSICS_LESSONS_1AS_TCST_T2: PhysicsInteractiveLessonData[] = [
	// -------------------------------------------------------------------------
	// Lesson 1: Propulsion, Braking & Friction (Newton's 3rd Law)
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t2_propulsion_braking_friction',
		slug: 'phy-1as-tcst-t2-propulsion-braking-friction',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدتان 5 و 7: دفع وكبح متحرك والتماسك في المادة وفي الكون',
		order: 1,
		titleAr: 'دفع وكبح متحرك (مبدأ الفعلين المتبادلين وقوة الاحتكاك)',
		objectives: [
			'تطبيق مبدأ الفعلين المتبادلين (F_{A/B} = -F_{B/A}) لتفسير انطلاق وكبح المركبات والمشي',
			'تمييز قوة الاحتكاك المحركة وقوة الاحتكاك المقاومة وتمثيلها كيفياً'
		],
		keywordsAr: ['مبدأ الفعلين المتبادلين', 'دفع متحرك', 'كبح متحرك', 'قوة الاحتكاك'],
		discover: {
			scenarioAr:
				'أثناء حصة التربية البدنية، ينطلق عدّاء نحو الأمام بدفع أرضية الملعب بقدمه، بينما تحاول سيارة التوقف على طريق مبلل بالماء فتزلق عجلاتها دون أن تتوقف بسرعة.',
			svg: svgPropulsionBrakingDiagram(),
			steps: [
				{
					promptAr: 'عندما يدفع العدّاء الأرضية بقدمه نحو الخلف بقوة $\\vec{F}_{\\text{قدم/أرض}}$، ما هو رد فعل الأرضية على قدمه؟',
					hintAr: 'تذكّر مبدأ الفعلين المتبادلين: إذا أثرت $A$ على $B$ بقوة، فإن $B$ تؤثر على $A$ بقوة مساوية ومعاكسة.',
					expectedInput: 'نحو الأمام',
					revealAr: 'تؤثر الأرضية على قدم العدّاء بقوة معاكسة $\\vec{F}_{\\text{أرض/قدم}} = -\\vec{F}_{\\text{قدم/أرض}}$ متجهة **نحو الأمام**، وهي التي تدفع العدّاء للانطلاق!'
				},
				{
					promptAr: 'ماذا يحدث لو حاول العدّاء أو السيارة الانطلاق على أرضية جليدية ملساء تماماً (انعدام الاحتكاك)؟',
					hintAr: 'القوة الأفقية المتبادلة بين العجلة (أو القدم) والأرضية هي قوة احتكاك.',
					expectedInput: 'ينزلق',
					revealAr: '**ينزلق** في مكانه ولا يستطيع التقدم! لأن القوة الأفقية المسؤولة عن الدفع هي **قوة الاحتكاك المحركة** بين القدم (أو العجلة المحركة) والأرضية.'
				},
				{
					promptAr: 'عندما يضغط السائق على المكابح فتتباطأ السيارة، ما هي جهة قوة الاحتكاك التي تطبقها الطريق على العجلات مقارنة بجهة الحركة؟',
					hintAr: 'قوة الكبح تعيق الحركة وتجعل $\\Delta \\vec{v}$ معاكساً لجهة الحركة.',
					expectedInput: 'عكس جهة الحركة',
					revealAr: 'أثناء الكبح تكون قوة الاحتكاك موجهة **عكس جهة الحركة** فتُسمى **قوة احتكاك مقاومة** تعمل على إنقاص السرعة حتى التوقف.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبدأ الفعلين المتبادلين (القانون الثالث لنيوتن)**: «إذا أثّرت جملة ميكانيكية $A$ على جملة ميكانيكية $B$ بقوة $\\vec{F}_{A/B}$، فإن الجملة $B$ تؤثر في نفس اللحظة على الجملة $A$ بقوة $\\vec{F}_{B/A}$ تساويها في الشدة، ولها نفس الحامل، وتعاكسها في الجهة»: $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$.',
				'**خواص الفعلين المتبادلين**: لهما نفس الطبيعة، ويُطبقان على **جملتين مختلفتين** (لذلك لا يلغي أحدهما الآخر عند دراسة حركة إحدى الجملتين).',
				'**انطلاق متحرك (الدفع)**: أثناء انطلاق سيارة ذات دفع خلفي أو أمامي، تدفع العجلة المحركة الطريق نحو الخلف $\\vec{F}_{\\text{عجلة/طريق}}$، فيرد الطريق بقوة احتكاك محركة $\\vec{F}_{\\text{طريق/عجلة}}$ نحو **الأمام (نفس جهة الحركة)** تدفع السيارة.',
				'**كبح متحرك (الفرملة)**: عند الضغط على المكابح، تحاول العجلة دفع الطريق نحو الأمام، فيؤثر الطريق بقوة احتكاك مقاومة $\\vec{f}$ موجهة **عكس جهة الحركة** تؤدي إلى تناقص السرعة.',
				'**دور الاحتكاك**: الاحتكاك قد يكون **مفيداً (محركاً)** كالمشي وانطلاق السيارات وكبحها، أو **ضاراً (مقاوماً)** في آلات المصانع حيث يُخفَّض بالتزييت أو المدحرجات.'
			],
			visualSvg: svgPropulsionBrakingDiagram(),
			visualCaptionAr: 'مقارنة الفعلين المتبادلين بين العجلة والطريق في حالتي الدفع (احتكاك محرك) والكبح (احتكاك مقاوم)',
			examples: [
				{
					problemAr: 'يسبح سباح في مسبح فيدفع الماء بيديه ورجليه نحو الخلف بقوة شدتها $80\\,\\text{N}$. حدد خصائص القوة التي يدفع بها الماء السباح.',
					solutionAr:
						'حسب مبدأ الفعلين المتبادلين: $\\vec{F}_{\\text{ماء/سباح}} = -\\vec{F}_{\\text{سباح/ماء}}$.\nخصائصها:\n- نقطة التأثير: يدا ورجلا السباح.\n- الحامل: أفقي.\n- الجهة: نحو الأمام (جهة حركة السباح).\n- الشدة: $80\\,\\text{N}$.'
				},
				{
					problemAr: 'لماذا تصعب فرملة السيارة على طريق مغطى بالزيت أو الجليد؟',
					solutionAr:
						'لأن الزيت أو الجليد يقلل كثيراً من قوة الاحتكاك المقاومة التي يطبقها الطريق على العجلات، فتبقى محصلة القوى الأفقية صغيرة جداً ولا تكفي لإحداث تباطؤ سريع.'
				}
			],
			watchOutAr:
				'تذكّر أن $\\vec{F}_{A/B}$ و$\\vec{F}_{B/A}$ لا تُجمعان في حصيلة قوى واحدة عند دراسة حركة جسم $B$ وحده! عند دراسة الجملة $B$ نُمثّل فقط القوى المطبقة **على $B$** (مثل $\\vec{F}_{A/B}$)، وليس القوى التي يطبقها $B$ على غيره.'
		},
		practice: [
			{
				questionAr: 'سيارة تسير نحو اليمين وتتسارع (حالة دفع). ما هو اتجاه قوة الاحتكاك التي يطبقها الطريق على العجلات المحركة؟',
				options: [
					'نحو اليسار (عكس جهة الحركة)',
					'نحو اليمين (في جهة الحركة)',
					'شاقولياً نحو الأعلى',
					'معدومة لأن العجلة تدور'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نحو اليسار هي القوة التي تطبقها العجلة على الطريق، أو قوة الكبح.',
					'صحيح! تدفع العجلة الطريق نحو اليسار فيدفع الطريق العجلة نحو اليمين (احتكاك محرك في جهة الحركة).',
					'خطأ: القوة الشاقولية نحو الأعلى هي رد الفعل العمودي $\\vec{R}_N$، وليس الاحتكاك.',
					'خطأ: دون احتكاك أفقي لا تستطيع السيارة التسارع على الطريق.'
				],
				explanationAr: 'تدفع العجلة المحركة الأرض نحو الخلف (اليسار)، وحسب مبدأ الفعلين المتبادلين يرد الطريق بقوة احتكاك محركة نحو الأمام (اليمين).'
			},
			{
				questionAr: 'يدفع تلميذ كتلته $50\\,\\text{kg}$ حائطاً ساكناً بقوة $120\\,\\text{N}$ وهو يرتدي حذاء تزلج أملس. ما شدة القوة التي يؤثر بها الحائط على التلميذ؟',
				options: ['$0\\,\\text{N}$ لأن الحائط لم يتحرك', '$60\\,\\text{N}$', '$120\\,\\text{N}$', '$240\\,\\text{N}$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الحائط يرد دائماً بنفس الشدة، وهو ما يجعل التلميذ يندفع نحو الخلف!',
					'خطأ: لا تنقسم الشدة على اثنين.',
					'صحيح! حسب مبدأ الفعلين المتبادلين $\\|\\vec{F}_{\\text{حائط/تلميذ}}\\| = \\|\\vec{F}_{\\text{تلميذ/حائط}}\\| = 120\\,\\text{N}$.',
					'خطأ: القوتان متساويتان في الشدة لا مضاعفتان.'
				],
				explanationAr: 'ينص مبدأ الفعلين المتبادلين على تساوي الشدتين دوماً: $F_{\\text{حائط/تلميذ}} = F_{\\text{تلميذ/حائط}} = 120\\,\\text{N}$، وتسبب اندفاع التلميذ للخلف.'
			},
			{
				questionAr: 'تتميز قوتا الفعل ورد الفعل ($\\vec{F}_{A/B}$ و$\\vec{F}_{B/A}$) بأنّهما:',
				options: [
					'مطبقتان على نفس الجملة الميكانيكية وتلغيان بعضهما',
					'تؤثران في لحظتين زمنيتين مختلفتين',
					'مطبقتان على جملتين مختلفتين ومتساويتان شدة ومتعاكستان جهة',
					'متعامدتان دوماً'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لو كانتا على نفس الجملة لما تحرك أي جسم عند الدفع.',
					'خطأ: التأثير المتبادل آني (في نفس اللحظة).',
					'صحيح! تؤثر كل قوة على جملة مختلفة عن الأخرى، بنفس الحامل ونفس الشدة وبجهتين متعاكستين.',
					'خطأ: لهما نفس الحامل (ليستا متعامدتين).'
				],
				explanationAr: 'الفعلان المتبادلان آنيّان، يطبقان على جملتين مختلفتين ($A$ و$B$)، ولهما نفس الحامل ونفس الشدة وجهتان متعاكستان.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 2: Universal Gravitation & Coulomb's Law (Cohesion)
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t2_universal_gravitation_cohesion',
		slug: 'phy-1as-tcst-t2-universal-gravitation-cohesion',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدتان 5 و 7: دفع وكبح متحرك والتماسك في المادة وفي الكون',
		order: 2,
		titleAr: 'التماسك في المادة وفي الكون (قانون الجذب العام وقانون كولوم)',
		objectives: [
			'تطبيق قانون الجذب العام لنيوتن لحساب شدة قوة التجاذب الكوني وربطها بالثقل',
			'تطبيق قانون كولوم لحساب شدة القوة الكهربائية بين شحنتين نقطيتين',
			'مقارنة الرتب المقدارية للقوة الجاذبية والقوة الكهرومغناطيسية في الذرة وفي الكون'
		],
		keywordsAr: ['الجذب العام', 'قانون كولوم', 'التماسك في الكون', 'التماسك في المادة', 'ثابت التجاذب G'],
		discover: {
			scenarioAr:
				'في ذرة الهيدروجين، يدور الإلكترون حول البروتون على مسافة $d = 5.3 \\times 10^{-11}\\,\\text{m}$، بينما يدور القمر حول الأرض على مسافة $D = 3.84 \\times 10^{8}\\,\\text{m}$. ما القوة التي تضمن تماسك كل نظام منهما؟',
			svg: svgGravitationVsCoulombDiagram(),
			steps: [
				{
					promptAr: 'احسب شدة قوة التجاذب الكوني $F_G = G \\frac{m_p \\cdot m_e}{d^2}$ بين البروتون ($m_p = 1.67 \\times 10^{-27}\\,\\text{kg}$) والإلكترون ($m_e = 9.1 \\times 10^{-31}\\,\\text{kg}$) عند $d = 5.3 \\times 10^{-11}\\,\\text{m}$ ($G = 6.67 \\times 10^{-11}\\,\\text{SI}$).',
					hintAr: 'عوّض القيم بدقة في القانون $F_G = 6.67 \\times 10^{-11} \\times \\frac{1.67 \\times 10^{-27} \\times 9.1 \\times 10^{-31}}{(5.3 \\times 10^{-11})^2}$.',
					expectedInput: '3.6e-47',
					revealAr: '$F_G \\approx 3.6 \\times 10^{-47}\\,\\text{N}$! هذه القوة ضعيفة جداً ولا يمكنها أبداً الحفاظ على تماسك الذرة.'
				},
				{
					promptAr: 'احسب شدة القوة الكهربائية (كولوم) $F_e = k \\frac{|q_p \\cdot q_e|}{d^2}$ علماً أن $|q_p| = |q_e| = 1.6 \\times 10^{-19}\\,\\text{C}$ و$k = 9 \\times 10^{9}\\,\\text{SI}$.',
					hintAr: '$F_e = 9 \\times 10^9 \\times \\frac{(1.6 \\times 10^{-19})^2}{(5.3 \\times 10^{-11})^2}$.',
					expectedInput: '8.2e-8',
					revealAr: '$F_e \\approx 8.2 \\times 10^{-8}\\,\\text{N}$.'
				},
				{
					promptAr: 'قارن رتبة مقدار النسبة $\\frac{F_e}{F_G}$ في ذرة الهيدروجين، واستنتج القوة المسؤولة عن تماسك الذرة مقابل تماسك الكون.',
					hintAr: 'اقسم $8.2 \\times 10^{-8}$ على $3.6 \\times 10^{-47}$.',
					expectedInput: '10^39',
					revealAr: '$\\frac{F_e}{F_G} \\approx 2.3 \\times 10^{39} \\sim 10^{39}$! إذن القوة **الكهرومغناطيسية (كولوم)** هي المسؤولة عن تماسك المادة والذرة، أما قوة **الجذب العام** فتسود على المستوى الفلكي (تماسك الكون) لأن الأجرام السماوية متعادلة كهربائياً تقريباً وكتلها هائلة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قانون الجذب العام لنيوتن**: يتجاذب كل جسمين ماديين نقطيين كتلتهما $m_A$ و$m_B$ تفصل بين مركزيهما مسافة $d$ بقوتين متعاكستين $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$ شدتهما المشتركة: $F_G = G \\frac{m_A \\cdot m_B}{d^2}$، حيث $G = 6.67 \\times 10^{-11}\\,\\text{N}\\cdot\\text{m}^2\\cdot\\text{kg}^{-2}$.',
				'**الربط بين الثقل وقوة جذب الأرض**: ثقل جسم كتلته $m$ على سطح الأرض (نصف قطرها $R_T$ وكتلتها $M_T$) هو قوة جذب الأرض له: $P = m g_0 = G \\frac{M_T \\cdot m}{R_T^2} \\implies g_0 = \\frac{G M_T}{R_T^2} \\approx 9.8\\,\\text{N/kg}$. وعلى ارتفاع $h$: $g_h = \\frac{G M_T}{(R_T + h)^2} = g_0 \\left(\\frac{R_T}{R_T + h}\\right)^2$.',
				'**قانون كولوم**: تتفاعل شحنتان كهربائيتان نقطيتان $q_A$ و$q_B$ تفصل بينهما مسافة $d$ بقوتين كهربائيتين متبادلتين (تجاذب إذا اختلفت إشارتاهما، تنافر إذا تماثلتا) شدتهما: $F_e = k \\frac{|q_A| \\cdot |q_B|}{d^2}$، حيث $k = 9 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2\\cdot\\text{C}^{-2}$.',
				'**التماسك في الكون والمادة**:\n- على **المستوى المجهري (الذرة، الجزيء، البلورة)**: القوة الكهربائية السائدة ($F_e \\gg F_G$ بنحو $10^{39}$ مرة) تضمن تماسك المادة (والقوة النووية القوية تضمن تماسك النواة).\n- على **المستوى العياني والفلكي (الكواكب، المجرات)**: الأجرام متعادلة كهربائياً ($q \\approx 0$) وكتلها ضخمة، لذا تسود **قوة التجاذب الكوني**.'
			],
			visualSvg: svgGravitationVsCoulombDiagram(),
			visualCaptionAr: 'مقارنة قانون الجذب العام (المسؤول عن تماسك الكون) وقانون كولوم (المسؤول عن تماسك الذرات والجزيئات)',
			examples: [
				{
					problemAr: 'احسب قيمة الجاذبية الأرضية $g_h$ على ارتفاع $h = R_T$ فوق سطح الأرض علماً أن $g_0 = 9.8\\,\\text{N/kg}$.',
					solutionAr:
						'لدينا $g_h = g_0 \\left(\\frac{R_T}{R_T + h}\\right)^2$. بتعويض $h = R_T$:\n$g_h = 9.8 \\times \\left(\\frac{R_T}{2R_T}\\right)^2 = \\frac{9.8}{4} = 2.45\\,\\text{N/kg}$.'
				},
				{
					problemAr: 'تحمل كرتان نقطيتان شحنتين $q_1 = +2\\,\\mu\\text{C}$ و$q_2 = -4\\,\\mu\\text{C}$ على مسافة $d = 30\\,\\text{cm}$ في الخلاء. حدد طبيعة التفاعل واحسب شدة القوة الكهربائية.',
					solutionAr:
						'الشحنتان من إشارتين مختلفتين ← قوة **تجاذب**.\nبالتحويل إلى الوحدات الدولية: $q_1 = 2 \\times 10^{-6}\\,\\text{C}$، $q_2 = -4 \\times 10^{-6}\\,\\text{C}$، $d = 0.3\\,\\text{m}$.\n$F_e = 9 \\times 10^9 \\times \\frac{2 \\times 10^{-6} \\times 4 \\times 10^{-6}}{(0.3)^2} = \\frac{72 \\times 10^{-3}}{0.09} = 0.8\\,\\text{N}$.'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين في الحسابات: 1) نسيان تربيع المسافة $d^2$ أو عدم تحويل $d$ من $\\text{km}$ أو $\\text{cm}$ إلى المتر $\\text{m}$ والشحنة من $\\mu\\text{C}$ إلى $\\text{C}$ ($1\\,\\mu\\text{C} = 10^{-6}\\,\\text{C}$). 2) في حساب الجاذبية على ارتفاع $h$، المسافة من مركز الأرض هي $(R_T + h)$ وليس $h$ وحدها!'
		},
		practice: [
			{
				questionAr: "إذا تضاعفت المسافة بين مركزي كوكبين مرتين ($d' = 2d$) مع بقاء كتلتيهما ثابتتين، فإن شدة قوة التجاذب الكوني بينهما:",
				options: [
					'تتضاعف مرتين',
					'تنقسم على $2$',
					'تنقسم على $4$',
					'تزداد $4$ مرات'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: القوة تتناسب عكسياً مع مربع المسافة، أي تقل عند زيادة المسافة.',
					'خطأ: المسافة مربعة في المقام ($d^2$).',
					"صحيح! $F'_G = G \\frac{m_A m_B}{(2d)^2} = \\frac{1}{4} F_G$.",
					'خطأ: تزداد $4$ مرات لو نقصت المسافة إلى النصف.'
				],
				explanationAr: 'بما أن $F_G \\propto \\frac{1}{d^2}$، فإن مضاعفة المسافة $(2d)^2 = 4d^2$ تُنقِص الشدة إلى الربع ($F_G / 4$).'
			},
			{
				questionAr: 'ما هي القوة الأساسية التي تضمن تماسك الإلكترون مع النواة داخل الذرة؟',
				options: [
					'قوة الجذب العام لنيوتن',
					'القوة الكهرومغناطيسية (كولوم)',
					'قوة الاحتكاك السكوني',
					'دافعة أرخميدس'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: قوة الجذب العام في الذرة أضعف من الكهربائية بنحو $10^{39}$ مرة.',
					'صحيح! التجاذب الكهربائي بين شحنة النواة الموجبة والإلكترونات السالبة هو المسؤول عن تماسك الذرة.',
					'خطأ: لا يوجد احتكاك بالمعنى الكلاسيكي داخل الذرة.',
					'خطأ: دافعة أرخميدس ظاهرة عيانية في الموائع.'
				],
				explanationAr: 'على المستوى الذري، تفوق شدة القوة الكهربائية $F_e$ قوة التجاذب الكوني $F_G$ بنحو $39$ رتبة مقدار، لذا فهي المسؤولة عن تماسك الذرات والجزيئات.'
			},
			{
				questionAr: 'شدة الجاذبية على سطح الأرض هي $g_0 = 9.8\\,\\text{N/kg}$. على ارتفاع $h = 2 R_T$ عن سطح الأرض تكون شدة الجاذبية $g_h$ مساوية تقريباً لـ:',
				options: ['$4.9\\,\\text{N/kg}$', '$2.45\\,\\text{N/kg}$', '$1.09\\,\\text{N/kg}$', '$9.8\\,\\text{N/kg}$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: قسمت على $2$ دون مراعاة أن البعد من المركز هو $R_T + 2R_T = 3R_T$ وأن العلاقة تربيعية.',
					'خطأ: $2.45$ توافق $h = R_T$ حيث البعد عن المركز $2R_T$.',
					'صحيح! البعد عن المركز $R_T + 2R_T = 3R_T$، ومنه $g_h = 9.8 / 3^2 = 9.8 / 9 \\approx 1.09\\,\\text{N/kg}$.',
					'خطأ: تتناقص الجاذبية كلما ابتعدنا عن مركز الأرض.'
				],
				explanationAr: '$g_h = g_0 \\left(\\frac{R_T}{R_T + 2R_T}\\right)^2 = \\frac{9.8}{9} \\approx 1.09\\,\\text{N/kg}$.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 3: Mole, Molar Mass, Molar Volume & Ideal Gas Law
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t2_mole_molar_mass_gas_law',
		slug: 'phy-1as-tcst-t2-mole-molar-mass-gas-law',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 6: من المجهري إلى العياني (كمية المادة والتركيز المولي)',
		order: 3,
		titleAr: 'كمية المادة (المول، عدد أفوغادرو)، الحجم المولي وقانون الغاز المثالي',
		objectives: [
			'تعريف المول وعدد أفوغادرو N_A والربط بين عدد الأفراد N وكمية المادة n = N/N_A',
			'حساب الكتلة المولية الجزيئية والذرية واستعمال العلاقة n = m/M والكثافة والكتلة الحجمية',
			'تطبيق قانون الغاز المثالي PV = nRT وحساب الحجم المولي للغازات في الشرطين النظاميين'
		],
		keywordsAr: ['كمية المادة', 'المول', 'عدد أفوغادرو', 'الكتلة المولية', 'الحجم المولي', 'قانون الغاز المثالي'],
		discover: {
			scenarioAr:
				'يحتاج مخبر الكيمياء إلى تحضير كمية محددة من غاز ثنائي أكسيد الكربون $\\ce{CO2}$ في قارورة حجمها $V = 2.4\\,\\text{L}$ عند درجة حرارة $27^\\circ\\text{C}$ وضغط جوي $P = 1.013 \\times 10^5\\,\\text{Pa}$. كيف نربط بين الكتلة وعدد الجزيئات وحجم الغاز؟',
			svg: svgMoleBridgeDiagram(),
			steps: [
				{
					promptAr: 'احسب الكتلة المولية الجزيئية $M(\\ce{CO2})$ علماً أن $M(\\mathrm{C}) = 12\\,\\text{g/mol}$ و$M(\\mathrm{O}) = 16\\,\\text{g/mol}$.',
					hintAr: '$M(\\ce{CO2}) = M(\\mathrm{C}) + 2 M(\\mathrm{O})$.',
					expectedInput: '44',
					revealAr: '$M(\\ce{CO2}) = 12 + 2 \\times 16 = 44\\,\\text{g/mol}$.'
				},
				{
					promptAr: 'ما هي كمية المادة $n$ الموجودة في عينة كتلتها $m = 8.8\\,\\text{g}$ من $\\ce{CO2}$؟',
					hintAr: 'استعمل العلاقة $n = \\frac{m}{M}$.',
					expectedInput: '0.2',
					revealAr: '$n = \\frac{8.8}{44} = 0.2\\,\\text{mol}$.'
				},
				{
					promptAr: 'كم عدد جزيئات $\\ce{CO2}$ ($N$) في هذه العينة، علماً أن عدد أفوغادرو $N_A = 6.02 \\times 10^{23}\\,\\text{mol}^{-1}$؟',
					hintAr: '$N = n \\times N_A$.',
					expectedInput: '1.204e23',
					revealAr: '$N = 0.2 \\times 6.02 \\times 10^{23} = 1.204 \\times 10^{23}$ جزيء.'
				},
				{
					promptAr: 'إذا شغل $0.1\\,\\text{mol}$ من $\\ce{CO2}$ حجماً في الشرطين النظاميين ($V_M = 22.4\\,\\text{L/mol}$)، فما حجمه باللتر؟ وما هي درجة الحرارة بالكلفن لـ $27^\\circ\\text{C}$ في قانون الغاز المثالي؟',
					hintAr: '$V_g = n \\times V_M$ و$T(\\text{K}) = \\theta(^\\circ\\text{C}) + 273$.',
					expectedInput: '2.24',
					revealAr: 'الحجم في الشرطين النظاميين: $V_g = 0.1 \\times 22.4 = 2.24\\,\\text{L}$. ودرجة الحرارة المطلقة: $T = 27 + 273 = 300\\,\\text{K}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المول وعدد أفوغادرو**: **المول ($\text{mol}$)** هو كمية المادة التي تحتوي على $N_A = 6.02 \\times 10^{23}$ فرداً كيميائياً متماثلاً. ومنه: $n = \\frac{N}{N_A}$.',
				'**الكتلة المولية وكمية المادة**: $n = \\frac{m}{M}$، حيث $m$ الكتلة بالغرام ($\text{g}$) و$M$ الكتلة المولية ($\text{g/mol}$). وللسوائل والأجسام النقية ذات الكتلة الحجمية $\\rho$: $m = \\rho \\cdot V \\implies n = \\frac{\\rho \\cdot V}{M}$.',
				'**الحجم المولي للغازات**: حجم $1\\,\\text{mol}$ من أي غاز تحت نفس شروط الضغط والحرارة ثابت، ومنه: $n = \\frac{V_g}{V_M}$. في **الشرطين النظاميين** ($0^\\circ\\text{C}, 1\\,\\text{atm}$): $V_M = 22.4\\,\\text{L/mol}$. وعند $20^\\circ\\text{C}$ أو $25^\\circ\\text{C}$: $V_M \\approx 24\\,\\text{L/mol}$.',
				'**كثافة غاز بالنسبة للهواء**: $d = \\frac{M_{\\text{غاز}}}{29}$ (نسبة الكتلة الحجمية للغاز إلى الهواء).',
				'**قانون الغاز المثالي**: $P \\cdot V = n \\cdot R \\cdot T$، حيث يجب احترام الوحدات الدولية بدقة:\n- $P$: الضغط بالباسكال ($\text{Pa}$)، $1\\,\\text{atm} = 1.013 \\times 10^5\\,\\text{Pa}$، $1\\,\\text{bar} = 10^5\\,\\text{Pa}$.\n- $V$: الحجم بالمتر المكعب ($\text{m}^3$)، $1\\,\\text{L} = 10^{-3}\\,\\text{m}^3$.\n- $T$: درجة الحرارة المطلقة بالكلفن ($\text{K}$)، $T(\\text{K}) = \\theta(^\\circ\\text{C}) + 273.15$ (أو $+273$).\n- $R = 8.314\\,\\text{J}\\cdot\\text{mol}^{-1}\\cdot\\text{K}^{-1}$: ثابت الغازات المثالية.'
			],
			visualSvg: svgMoleBridgeDiagram(),
			visualCaptionAr: 'خريطة المول المركزية: ربط كمية المادة $n$ بعدد الأفراد $N$، الكتلة $m$، الحجم الغازي $V_g$، وقانون الغاز المثالي',
			examples: [
				{
					problemAr: 'أثبت أن الحجم المولي لغاز مثالي في الشرطين النظاميين ($P = 1.013 \\times 10^5\\,\\text{Pa}$ و$\\theta = 0^\\circ\\text{C}$) يساوي $22.4\\,\\text{L/mol}$ ($R = 8.314\\,\\text{SI}$).',
					solutionAr:
						'من قانون الغاز المثالي $PV = nRT$ نأخذ $n = 1\\,\\text{mol}$ و$T = 273.15\\,\\text{K}$:\n$V_M = \\frac{R T}{P} = \\frac{8.314 \\times 273.15}{1.013 \\times 10^5} \\approx 0.02242\\,\\text{m}^3/\\text{mol} = 22.4\\,\\text{L/mol}$.'
				},
				{
					problemAr: 'حوجلة سعتها $V = 5\\,\\text{L}$ مملوءة بغاز الميثان $\\ce{CH4}$ تحت ضغط $P = 2\\,\\text{bar}$ ودرجة حرارة $\\theta = 27^\\circ\\text{C}$. احسب كمية المادة $n$ ثم كتلة الغاز ($M(\\mathrm{C})=12, M(\\mathrm{H})=1$).',
					solutionAr:
						'التحويلات: $P = 2 \\times 10^5\\,\\text{Pa}$، $V = 5 \\times 10^{-3}\\,\\text{m}^3$، $T = 27 + 273 = 300\\,\\text{K}$.\n$n = \\frac{P V}{R T} = \\frac{2 \\times 10^5 \\times 5 \\times 10^{-3}}{8.314 \\times 300} = \\frac{1000}{2494.2} \\approx 0.40\\,\\text{mol}$.\nالكتلة المولية: $M(\\ce{CH4}) = 12 + 4(1) = 16\\,\\text{g/mol}$ ← $m = n \\cdot M = 0.40 \\times 16 = 6.4\\,\\text{g}$.'
				}
			],
			watchOutAr:
				'في قانون الغاز المثالي $PV = nRT$، أكبر فخ يقع فيه التلاميذ هو إدخال الحجم باللتر $\\text{L}$ أو الضغط بـ $\\text{hPa/bar}$ أو الحرارة بـ $^\\circ\\text{C}$! حوّل دوماً إلى $(\\text{Pa},\\,\\text{m}^3,\\,\\text{K})$ قبل التعويض.'
		},
		practice: [
			{
				questionAr: 'ما هي كمية المادة الموجودة في $m = 9\\,\\text{g}$ من الماء المقطر $\\ce{H2O}$ علماً أن $M(\\ce{H2O}) = 18\\,\\text{g/mol}$؟',
				options: ['$0.2\\,\\text{mol}$', '$0.5\\,\\text{mol}$', '$2\\,\\text{mol}$', '$162\\,\\text{mol}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تحقق من القسمة $9 / 18$.',
					'صحيح! $n = \\frac{m}{M} = \\frac{9}{18} = 0.5\\,\\text{mol}$.',
					'خطأ: عكست البسط والمقام ($M/m$ بدل $m/M$).',
					'خطأ: ضربت الكتلة في الكتلة المولية بدل قسمتها.'
				],
				explanationAr: '$n = \\frac{m}{M} = \\frac{9}{18} = 0.5\\,\\text{mol}$.'
			},
			{
				questionAr: 'كم تبلغ كثافة غاز البوتان $\\ce{C4H10}$ ($M = 58\\,\\text{g/mol}$) بالنسبة للهواء؟ وهل يطفو أم يتجمع قرب الأرضية عند تسربه؟',
				options: [
					'$d = 0.5$ — يطفو نحو الأعلى',
					'$d = 2.0$ — يتجمع قرب الأرضية',
					'$d = 29$ — يطفو نحو الأعلى',
					'$d = 1.0$ — يمتزج بانتظام دون فرق'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عكست القسمة ($29 / 58$ بدل $58 / 29$).',
					'صحيح! $d = M / 29 = 58 / 29 = 2 > 1$، فهو أثقل من الهواء ويتجمع في الأسفل.',
					'خطأ: $29$ هي الكتلة المولية المتوسطة للهواء وليست كثافة البوتان.',
					'خطأ: $d = 2 \\neq 1$.'
				],
				explanationAr: 'كثافة الغاز بالنسبة للهواء $d = \\frac{M}{29} = \\frac{58}{29} = 2.0 > 1$؛ ولأنه أثقل من الهواء يتجمع قرب الأرضية.'
			},
			{
				questionAr: 'في قانون الغاز المثالي $PV = nRT$، إذا كان $P = 1\\,\\text{bar}$ و$V = 8.314\\,\\text{L}$ و$T = 300\\,\\text{K}$، ما هي كمية المادة $n$ ($R = 8.314\\,\\text{SI}$)?',
				options: ['$0.033\\,\\text{mol}$', '$0.33\\,\\text{mol}$', '$3.33\\,\\text{mol}$', '$333\\,\\text{mol}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تحقق من قوى العشرة عند تحويل $V = 8.314\\,\\text{L} = 8.314 \\times 10^{-3}\\,\\text{m}^3$.',
					'صحيح! $n = \\frac{10^5 \\times 8.314 \\times 10^{-3}}{8.314 \\times 300} = \\frac{100}{300} \\approx 0.33\\,\\text{mol}$.',
					'خطأ: أخطأت في أس الحجم عند التحويل من $\\text{L}$ إلى $\\text{m}^3$.',
					'خطأ: نسيت تحويل الحجم من اللتر إلى المتر المكعب ($\\times 10^{-3}$).'
				],
				explanationAr: 'بالتحويل إلى SI: $P = 10^5\\,\\text{Pa}$ و$V = 8.314 \\times 10^{-3}\\,\\text{m}^3$. إذن $n = \\frac{10^5 \\times 8.314 \\times 10^{-3}}{8.314 \\times 300} = \\frac{1}{3} \\approx 0.33\\,\\text{mol}$.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 4: Aqueous Solutions, Molar Concentration & Dilution
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t2_solutions_molar_concentration',
		slug: 'phy-1as-tcst-t2-solutions-molar-concentration',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 6: من المجهري إلى العياني (كمية المادة والتركيز المولي)',
		order: 4,
		titleAr: 'المحاليل المائية: التركيز المولي والتركيز الكتلي وتمديد المحاليل',
		objectives: [
			'حساب التركيز المولي C = n/V والتركيز الكتلي C_m = m/V والعلاقة بينهما (C_m = C × M) وعلاقة التركيز بدرجة النقاوة والكثافة',
			'كتابة وتنفيذ بروتوكول تحضير محلول مائي انطلاقاً من مادة صلبة أو بتمديد محلول أم باستعمال قانون التمديد (C_0 V_0 = C_1 V_1)'
		],
		keywordsAr: ['التركيز المولي', 'التركيز الكتلي', 'المحلول المائي', 'بروتوكول التحضير', 'قانون التمديد', 'معامل التمديد'],
		discover: {
			scenarioAr:
				'يريد أستاذ العلوم الفيزيائية تحضير $V_1 = 250\\,\\text{mL}$ من محلول كبريتات النحاس ($\\ce{CuSO4}$) تركيزه المولي $C_1 = 0.04\\,\\text{mol/L}$ انطلاقاً من محلول أم أزرق قاتم تركيزه $C_0 = 0.2\\,\\text{mol/L}$.',
			svg: svgDilutionProtocolDiagram(),
			steps: [
				{
					promptAr: 'ما هي كمية مادة $\\ce{CuSO4}$ اللازمة في المحلول الممدد $(S_1)$؟',
					hintAr: '$n_1 = C_1 \\cdot V_1$ مع تحويل $V_1$ إلى اللتر ($0.25\\,\\text{L}$).',
					expectedInput: '0.01',
					revealAr: '$n_1 = 0.04 \\times 0.25 = 0.01\\,\\text{mol}$.'
				},
				{
					promptAr: 'انطلاقاً من انحفاظ كمية المادة أثناء التمديد ($n_0 = n_1$)، احسب الحجم $V_0$ الواجب أخذه من المحلول الأم $(S_0)$ بالمليلتر.',
					hintAr: '$C_0 V_0 = C_1 V_1 \\implies V_0 = \\frac{C_1 V_1}{C_0}$.',
					expectedInput: '50',
					revealAr: '$V_0 = \\frac{0.04 \\times 250}{0.2} = 50\\,\\text{mL}$.'
				},
				{
					promptAr: 'احسب معامل التمديد $F$ ثم حدد الزجاجيات الدقيقة المستعملة لأخذ $V_0$ وتحضير $V_1$.',
					hintAr: '$F = \\frac{C_0}{C_1} = \\frac{V_1}{V_0}$.',
					expectedInput: '5',
					revealAr: 'معامل التمديد $F = \\frac{0.2}{0.04} = 5$ (تم تمديد المحلول $5$ مرات). نأخذ $50\\,\\text{mL}$ باستعمال **ماصة عيارية** (أو سحاحة) ونضعها في **حوجلة عيارية سعتها $250\\,\\text{mL}$** ثم نكمل بالماء المقطر حتى خط العيار ونرج.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التركيز المولي والكتلي**:\n- **التركيز المولي**: $C = \\frac{n}{V}$ بوحدة $\\text{mol/L}$ ($V$ حجم المحلول بـ $\\text{L}$).\n- **التركيز الكتلي**: $C_m = \\frac{m}{V}$ بوحدة $\\text{g/L}$.\n- **العلاقة بينهما**: $C_m = C \\cdot M$.',
				'**تركيز محلول تجاري سائل**: إذا كُتب على قارورة تجارية الكثافة $d$ ودرجة النقاوة الكتلية $P\\%$ والكتلة المولية $M$، فإن تركيزها المولي يُعطى بالعلاقة: $C_0 = \\frac{10 \\cdot P \\cdot d}{M}$ (لأن كتلة $1\\,\\text{L}$ هي $1000 d\\,\\text{g}$ والكتلة النقية هي $\\frac{P}{100} \\times 1000 d = 10 P d$).',
				'**قانون التمديد (التخفيف)**: عند إضافة الماء المقطر إلى محلول أم حجمه $V_0$ وتركيزه $C_0$، **تنحفظ كمية مادة المذاب** ($n_0 = n_1$): $C_0 \\cdot V_0 = C_1 \\cdot V_1$.',
				'**معامل التمديد $F$**: $F = \\frac{C_0}{C_1} = \\frac{V_1}{V_0} > 1$. وحجم الماء المقطر المضاف: $V_{\\text{eau}} = V_1 - V_0$.',
				'**البروتوكول التجريبي للتحضير**:\n- **من مادة صلبة**: ميزان إلكتروني + جفنة (لوزن الكتلة $m = C \\cdot V \\cdot M$) + قمع + حوجلة عيارية سعتها $V$ + ماء مقطر (إذابة جزئية ثم إكمال حتى خط العيار والرج).\n- **بالتمديد**: ماصة عيارية مزودة بإجاصة مص لأخذ $V_0$ + حوجلة عيارية سعتها $V_1$ + ماء مقطر حتى خط العيار والرج.'
			],
			visualSvg: svgDilutionProtocolDiagram(),
			visualCaptionAr: 'البروتوكول التجريبي لعملية التمديد باستخدام الماصة والحوجلة العيارية مع تطبيق علاقة $C_0 V_0 = C_1 V_1$',
			examples: [
				{
					problemAr: 'نُذيب كتلة $m = 5.85\\,\\text{g}$ من كلور الصوديوم $\\ce{NaCl}$ ($M = 58.5\\,\\text{g/mol}$) في الماء المقطر للحصول على محلول حجمه $V = 500\\,\\text{mL}$. احسب التركيز الكتلي $C_m$ والتركيز المولي $C$.',
					solutionAr:
						'الحجم باللتر: $V = 0.5\\,\\text{L}$.\nالتركيز الكتلي: $C_m = \\frac{m}{V} = \\frac{5.85}{0.5} = 11.7\\,\\text{g/L}$.\nالتركيز المولي: $n = \\frac{5.85}{58.5} = 0.1\\,\\text{mol} \\implies C = \\frac{0.1}{0.5} = 0.2\\,\\text{mol/L}$. (تحقق: $C_m = 0.2 \\times 58.5 = 11.7\\,\\text{g/L}$).'
				},
				{
					problemAr: 'تحمل قارورة حمض كلور الماء التجاري المعلومات: $P = 36.5\\%$، $d = 1.18$، $M(\\ce{HCl}) = 36.5\\,\\text{g/mol}$. احسب التركيز المولي $C_0$ لهذا المحلول التجاري.',
					solutionAr:
						'$C_0 = \\frac{10 \\cdot P \\cdot d}{M} = \\frac{10 \\times 36.5 \\times 1.18}{36.5} = 11.8\\,\\text{mol/L}$.'
				}
			],
			watchOutAr:
				'في البروتوكول التجريبي، نستخدم دائماً **حوجلة عيارية** ومصاصة عيارية للدقة، ولا نستخدم أبداً المخبار المدرج أو البيشر لقياس حجوم التحضير العياري! وعند تمديد الأحماض المركزة، نسكب الحمض بحذر على الماء وليس العكس.'
		},
		practice: [
			{
				questionAr: 'ما هي الكتلة $m$ من الغلوكوز $\\ce{C6H12O6}$ ($M = 180\\,\\text{g/mol}$) اللازمة لتحضير $V = 200\\,\\text{mL}$ من محلول تركيزه $C = 0.1\\,\\text{mol/L}$؟',
				options: ['$1.8\\,\\text{g}$', '$3.6\\,\\text{g}$', '$18\\,\\text{g}$', '$3600\\,\\text{g}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه الكتلة تناسب حجماً قدره $100\\,\\text{mL}$ وليس $200\\,\\text{mL}$.',
					'صحيح! $m = C \\cdot V \\cdot M = 0.1 \\times 0.2 \\times 180 = 3.6\\,\\text{g}$.',
					'خطأ: هذه الكتلة توافق $1\\,\\text{L}$ وليس $200\\,\\text{mL}$.',
					'خطأ: نسيت تحويل $V = 200\\,\\text{mL}$ إلى $0.2\\,\\text{L}$.'
				],
				explanationAr: '$m = n \\cdot M = C \\cdot V \\cdot M = 0.1 \\times 0.2 \\times 180 = 3.6\\,\\text{g}$.'
			},
			{
				questionAr: 'نأخذ $V_0 = 20\\,\\text{mL}$ من محلول تركيزه $C_0 = 0.5\\,\\text{mol/L}$ ونضيف إليه $80\\,\\text{mL}$ من الماء المقطر. ما هو التركيز الجديد $C_1$؟',
				options: ['$0.125\\,\\text{mol/L}$', '$0.10\\,\\text{mol/L}$', '$0.25\\,\\text{mol/L}$', '$2.5\\,\\text{mol/L}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الحجم الكلي الجديد هو $V_1 = V_0 + V_{\\text{eau}} = 20 + 80 = 100\\,\\text{mL}$ وليس $80\\,\\text{mL}$.',
					'صحيح! $V_1 = 20 + 80 = 100\\,\\text{mL}$ ومنه $C_1 = \\frac{0.5 \\times 20}{100} = 0.10\\,\\text{mol/L}$.',
					'خطأ: تحقق من حساب $V_1$.',
					'خطأ: التركيز يقل عند التمديد ولا يزداد!'
				],
				explanationAr: 'الحجم النهائي للمحلول الممدد هو $V_1 = V_0 + V_{\\text{eau}} = 20 + 80 = 100\\,\\text{mL}$. ومن قانون التمديد: $C_1 = \\frac{0.5 \\times 20}{100} = 0.10\\,\\text{mol/L}$.'
			},
			{
				questionAr: 'ما هما الزجاجيتان الأساسيتان المستعملتان في المخبر لتنفيذ عملية تمديد دقيقة؟',
				options: [
					'بيشر وموقد بنزن',
					'ماصة عيارية وحوجلة عيارية',
					'أنبوب اختبار ومخبر مدرج',
					'سحاحة وإرلين ماير فقط'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: البيشر غير دقيق والموقد لا يُستعمل في التمديد.',
					'صحيح! تُستعمل الماصة العيارية لأخذ الحجم $V_0$ والحوجلة العيارية لتحضير الحجم النهائي $V_1$.',
					'خطأ: المخبار المدرج أقل دقة من الحوجلة والماصة العياريتين.',
					'خطأ: الإرلين ماير والأسحاحة تُستعمل في المعايرة.'
				],
				explanationAr: 'لتحقيق دقة الحجوم في التمديد، نستخدم الماصة العيارية لأخذ $V_0$ والحوجلة العيارية ذات السعة $V_1$ لإكمال الحجم بالماء المقطر حتى خط العيار.'
			}
		]
	}
];
