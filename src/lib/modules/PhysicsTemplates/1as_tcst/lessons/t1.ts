import type { PhysicsInteractiveLessonData } from '../../types';
import { svgProjectileTrajectory, wrapPhysicsSvg } from '../../svg-physics';

// ===========================================================================
// SVG Helpers for 1AS TCST Physics T1
// ===========================================================================

function svgAtomIsotopesDiagram(): string {
	const cx = 120;
	const cy = 110;
	let body = '';
	// Nucleus with protons (red) & neutrons (slate)
	body += `<circle cx="${cx}" cy="${cy}" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6"/>`;
	const nucleons = [
		[-6, -5, '#dc2626'],
		[6, -6, '#64748b'],
		[-5, 6, '#64748b'],
		[6, 5, '#dc2626'],
		[0, 0, '#dc2626'],
		[0, -9, '#64748b']
	] as const;
	for (const [dx, dy, col] of nucleons) {
		body += `<circle cx="${cx + dx}" cy="${cy + dy}" r="4.2" fill="${col}"/>`;
	}
	// Shells K and L
	body += `<circle cx="${cx}" cy="${cy}" r="44" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-dasharray="4,3"/>`;
	body += `<circle cx="${cx}" cy="${cy}" r="74" fill="none" stroke="#059669" stroke-width="1.4" stroke-dasharray="5,3"/>`;
	// Electrons
	const eCoords = [
		[cx - 44, cy],
		[cx + 44, cy],
		[cx, cy - 74],
		[cx, cy + 74],
		[cx + 52, cy - 52],
		[cx - 52, cy + 52]
	];
	for (const [ex, ey] of eCoords) {
		body += `<circle cx="${ex}" cy="${ey}" r="4.2" fill="#1d4ed8" stroke="#ffffff" stroke-width="1"/>`;
	}
	// Labels on right side
	body += `<rect x="215" y="24" width="165" height="172" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="297" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">نموذج الكربون 12 و 14</text>`;
	body += `<text x="297" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">¹²₆C : Z = 6 , N = 6</text>`;
	body += `<text x="297" y="96" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">¹⁴₆C : Z = 6 , N = 8</text>`;
	body += `<line x1="230" y1="112" x2="365" y2="112" stroke="#e2e8f0" stroke-width="1"/>`;
	body += `<text x="297" y="134" text-anchor="middle" font-size="11.5" fill="#334155">نفس العدد الذري Z = 6</text>`;
	body += `<text x="297" y="156" text-anchor="middle" font-size="11.5" fill="#334155">اختلاف في عدد النوترونات N</text>`;
	body += `<text x="297" y="180" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">← نظيران لعنصر الكربون</text>`;
	return wrapPhysicsSvg(395, 220, body);
}

function svgElectronShellsKLM(symbol: string, Z: number, k: number, l: number, m: number): string {
	const cx = 125;
	const cy = 112;
	let body = '';
	body += `<circle cx="${cx}" cy="${cy}" r="18" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>`;
	body += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">${symbol}</text>`;
	const rings = [
		{ r: 38, count: k, name: 'K', color: '#2563eb' },
		{ r: 62, count: l, name: 'L', color: '#059669' },
		{ r: 86, count: m, name: 'M', color: '#d97706' }
	];
	for (const ring of rings) {
		if (ring.count <= 0) continue;
		body += `<circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="${ring.color}" stroke-width="1.5"/>`;
		body += `<text x="${cx + ring.r - 4}" y="${cy - ring.r * 0.55}" font-size="10.5" font-weight="bold" fill="${ring.color}">${ring.name}</text>`;
		for (let i = 0; i < ring.count; i++) {
			const ang = (2 * Math.PI * i) / ring.count - Math.PI / 2;
			const ex = cx + ring.r * Math.cos(ang);
			const ey = cy + ring.r * Math.sin(ang);
			body += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="4" fill="${ring.color}" stroke="#ffffff" stroke-width="1"/>`;
		}
	}
	body += `<rect x="232" y="34" width="155" height="154" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="309" y="58" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">التوزيع الإلكتروني (Z = ${Z})</text>`;
	body += `<text x="309" y="84" text-anchor="middle" font-size="13" font-weight="bold" fill="#2563eb">(K)${k} (L)${l}${m > 0 ? ` (M)${m}` : ''}</text>`;
	const valence = m > 0 ? m : l > 0 ? l : k;
	const period = m > 0 ? 3 : l > 0 ? 2 : 1;
	body += `<text x="309" y="116" text-anchor="middle" font-size="11.5" fill="#334155">عدد الطبقات = ${period} (السطر ${period})</text>`;
	body += `<text x="309" y="140" text-anchor="middle" font-size="11.5" fill="#334155">إلكترونات التكافؤ = ${valence} (العمود ${valence})</text>`;
	body += `<text x="309" y="166" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">${valence === 7 ? 'يميل لاكتساب 1e⁻ ← شاردة X⁻' : valence === 1 ? 'يميل لفقد 1e⁻ ← شاردة X⁺' : 'تطبيق قاعدة الثمانية'}</text>`;
	return wrapPhysicsSvg(400, 224, body);
}

function svgLewisVseprGallery(): string {
	let body = '';
	// Card 1: H2O (AX2E2 - bent)
	body += `<rect x="10" y="16" width="120" height="175" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.4"/>`;
	body += `<text x="70" y="38" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">جزيء الماء H₂O</text>`;
	body += `<circle cx="70" cy="88" r="14" fill="#dc2626"/><text x="70" y="93" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">O</text>`;
	// 2 lone pairs on O
	body += `<line x1="60" y1="68" x2="80" y2="68" stroke="#1e293b" stroke-width="2.2"/>`;
	body += `<line x1="60" y1="62" x2="80" y2="62" stroke="#1e293b" stroke-width="2.2"/>`;
	// Bonds to H
	body += `<line x1="59" y1="98" x2="38" y2="124" stroke="#0f172a" stroke-width="2.2"/>`;
	body += `<line x1="81" y1="98" x2="102" y2="124" stroke="#0f172a" stroke-width="2.2"/>`;
	body += `<circle cx="33" cy="130" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><text x="33" y="134" text-anchor="middle" font-size="10.5" font-weight="bold">H</text>`;
	body += `<circle cx="107" cy="130" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><text x="107" y="134" text-anchor="middle" font-size="10.5" font-weight="bold">H</text>`;
	body += `<text x="70" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">AX₂E₂</text>`;
	body += `<text x="70" y="180" text-anchor="middle" font-size="11" fill="#334155">مرفقي (زاوي 104.5°)</text>`;

	// Card 2: NH3 (AX3E1 - trigonal pyramid)
	body += `<rect x="140" y="16" width="120" height="175" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.4"/>`;
	body += `<text x="200" y="38" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#065f46">النشادر NH₃</text>`;
	body += `<circle cx="200" cy="84" r="14" fill="#2563eb"/><text x="200" y="89" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">N</text>`;
	body += `<line x1="190" y1="64" x2="210" y2="64" stroke="#1e293b" stroke-width="2.4"/>`;
	body += `<line x1="188" y1="94" x2="164" y2="124" stroke="#0f172a" stroke-width="2"/>`;
	body += `<polygon points="200,98 194,126 206,126" fill="#0f172a"/>`;
	body += `<line x1="212" y1="94" x2="236" y2="124" stroke="#0f172a" stroke-width="2" stroke-dasharray="3,2"/>`;
	for (const [hx, hy] of [
		[160, 130],
		[200, 134],
		[240, 130]
	]) {
		body += `<circle cx="${hx}" cy="${hy}" r="8.5" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><text x="${hx}" y="${hy + 3.5}" text-anchor="middle" font-size="10" font-weight="bold">H</text>`;
	}
	body += `<text x="200" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">AX₃E₁</text>`;
	body += `<text x="200" y="180" text-anchor="middle" font-size="11" fill="#334155">هرمي ثلاثي</text>`;

	// Card 3: CH4 (AX4 - tetrahedral)
	body += `<rect x="270" y="16" width="120" height="175" rx="8" fill="#fefce8" stroke="#fcd34d" stroke-width="1.4"/>`;
	body += `<text x="330" y="38" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#92400e">الميثان CH₄</text>`;
	body += `<circle cx="330" cy="90" r="14" fill="#334155"/><text x="330" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">C</text>`;
	body += `<line x1="330" y1="76" x2="330" y2="55" stroke="#0f172a" stroke-width="2"/>`;
	body += `<line x1="318" y1="98" x2="294" y2="122" stroke="#0f172a" stroke-width="2"/>`;
	body += `<polygon points="333,103 330,130 342,126" fill="#0f172a"/>`;
	body += `<line x1="342" y1="96" x2="365" y2="118" stroke="#0f172a" stroke-width="2" stroke-dasharray="3,2"/>`;
	for (const [hx, hy] of [
		[330, 50],
		[290, 126],
		[337, 134],
		[369, 122]
	]) {
		body += `<circle cx="${hx}" cy="${hy}" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><text x="${hx}" y="${hy + 3.5}" text-anchor="middle" font-size="9.5" font-weight="bold">H</text>`;
	}
	body += `<text x="330" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">AX₄</text>`;
	body += `<text x="330" y="180" text-anchor="middle" font-size="11" fill="#334155">رباعي الوجوه منتظم</text>`;

	return wrapPhysicsSvg(400, 206, body);
}

function svgStroboscopicRectilinear(): string {
	let body = `<defs><marker id="stArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker><marker id="stRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	body += `<text x="200" y="22" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">تسجيل متعاقب لحركة مستقيمة متسارعة (τ = 0.1 s)</text>`;
	// Track line
	body += `<line x1="25" y1="100" x2="375" y2="100" stroke="#94a3b8" stroke-width="1.6"/>`;
	const xs = [40, 68, 108, 160, 224, 300];
	for (let i = 0; i < xs.length; i++) {
		body += `<circle cx="${xs[i]}" cy="100" r="4.5" fill="#0f172a"/>`;
		body += `<text x="${xs[i]}" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">M${i}</text>`;
	}
	// v2 and v4 vectors
	body += `<line x1="${xs[2]}" y1="84" x2="${xs[2] + 46}" y2="84" stroke="#2563eb" stroke-width="2.2" marker-end="url(#stArr)"/>`;
	body += `<text x="${xs[2] + 22}" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#2563eb">v₂</text>`;
	body += `<line x1="${xs[4]}" y1="84" x2="${xs[4] + 70}" y2="84" stroke="#2563eb" stroke-width="2.2" marker-end="url(#stArr)"/>`;
	body += `<text x="${xs[4] + 34}" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#2563eb">v₄</text>`;
	// Delta v3 and F
	body += `<line x1="${xs[3]}" y1="54" x2="${xs[3] + 34}" y2="54" stroke="#dc2626" stroke-width="2.3" marker-end="url(#stRed)"/>`;
	body += `<text x="${xs[3] + 18}" y="46" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">Δv₃ و F</text>`;
	body += `<text x="200" y="152" text-anchor="middle" font-size="11.5" fill="#334155">المسافات المتتالية تتزايد ← Δv⃗ في جهة الحركة ← توجد قوة F⃗ في جهة الحركة</text>`;
	return wrapPhysicsSvg(400, 172, body);
}

function svgCircularMotionDeltaV(): string {
	const cx = 135;
	const cy = 112;
	const r = 74;
	let body = `<defs>
		<marker id="cmBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
		<marker id="cmRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
	</defs>`;
	body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="5,3"/>`;
	body += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#0f172a"/><text x="${cx - 12}" y="${cy + 15}" font-size="11.5" font-weight="bold">O</text>`;
	// M1 (-45 deg), M2 (0 deg from top -> -90 deg), M3 (-135 deg)
	const pts = [
		{ ang: -Math.PI * 0.72, lbl: 'M₁' },
		{ ang: -Math.PI * 0.5, lbl: 'M₂' },
		{ ang: -Math.PI * 0.28, lbl: 'M₃' }
	];
	for (const p of pts) {
		const px = cx + r * Math.cos(p.ang);
		const py = cy + r * Math.sin(p.ang);
		body += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="#0f172a"/>`;
		body += `<text x="${(px + (p.lbl === 'M₁' ? -14 : p.lbl === 'M₃' ? 10 : 0)).toFixed(1)}" y="${(py - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold">${p.lbl}</text>`;
	}
	// Tangential velocities at M1 and M3 (clockwise)
	const m1x = cx + r * Math.cos(pts[0].ang);
	const m1y = cy + r * Math.sin(pts[0].ang);
	const m3x = cx + r * Math.cos(pts[2].ang);
	const m3y = cy + r * Math.sin(pts[2].ang);
	const m2x = cx;
	const m2y = cy - r;
	body += `<line x1="${m1x.toFixed(1)}" y1="${m1y.toFixed(1)}" x2="${(m1x + 34).toFixed(1)}" y2="${(m1y - 28).toFixed(1)}" stroke="#2563eb" stroke-width="2" marker-end="url(#cmBlue)"/>`;
	body += `<text x="${(m1x + 12).toFixed(1)}" y="${(m1y - 28).toFixed(1)}" font-size="11" font-weight="bold" fill="#2563eb">v₁</text>`;
	body += `<line x1="${m3x.toFixed(1)}" y1="${m3y.toFixed(1)}" x2="${(m3x + 34).toFixed(1)}" y2="${(m3y + 28).toFixed(1)}" stroke="#2563eb" stroke-width="2" marker-end="url(#cmBlue)"/>`;
	body += `<text x="${(m3x + 38).toFixed(1)}" y="${(m3y + 24).toFixed(1)}" font-size="11" font-weight="bold" fill="#2563eb">v₃</text>`;
	// Centripetal Delta v2 and F at M2
	body += `<line x1="${m2x}" y1="${m2y}" x2="${m2x}" y2="${m2y + 48}" stroke="#dc2626" stroke-width="2.3" marker-end="url(#cmRed)"/>`;
	body += `<text x="${m2x + 14}" y="${m2y + 34}" font-size="11.5" font-weight="bold" fill="#dc2626">Δv₂ و F</text>`;
	// Info box
	body += `<rect x="235" y="34" width="155" height="150" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.3"/>`;
	body += `<text x="312" y="58" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#991b1b">الحركة الدائرية المنتظمة</text>`;
	body += `<text x="312" y="84" text-anchor="middle" font-size="11.5" fill="#334155">• قيمة السرعة ثابتة: v = cte</text>`;
	body += `<text x="312" y="108" text-anchor="middle" font-size="11.5" fill="#334155">• حاملها متغير (مماسي)</text>`;
	body += `<text x="312" y="132" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">• Δv⃗ ≠ 0⃗ نحو المركز O</text>`;
	body += `<text x="312" y="156" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">• القوة F⃗ جاذبة مركزية</text>`;
	return wrapPhysicsSvg(400, 212, body);
}

function svgReferenceFrameDiagram(): string {
	let body = `<defs><marker id="rfArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker></defs>`;
	// Left panel: Train reference
	body += `<rect x="14" y="18" width="175" height="170" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.4"/>`;
	body += `<text x="101" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">المرجع: القطار (متحرك)</text>`;
	body += `<line x1="101" y1="62" x2="101" y2="146" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#rfArr)"/>`;
	body += `<circle cx="101" cy="62" r="5" fill="#dc2626"/>`;
	body += `<text x="101" y="170" text-anchor="middle" font-size="11.5" fill="#0f172a">المسار مستقيم شاقولي</text>`;
	// Right panel: Earth reference
	body += `<rect x="206" y="18" width="180" height="170" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.4"/>`;
	body += `<text x="296" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#065f46">المرجع: الأرض (ساكن)</text>`;
	body += `<path d="M 232 64 Q 295 66 352 146" fill="none" stroke="#059669" stroke-width="2.2"/>`;
	body += `<circle cx="232" cy="64" r="5" fill="#dc2626"/>`;
	body += `<text x="296" y="170" text-anchor="middle" font-size="11.5" fill="#0f172a">المسار منحني (قطع مكافئ)</text>`;
	return wrapPhysicsSvg(400, 204, body);
}

// ===========================================================================
// Exported Trimester 1 Interactive Lessons for 1AS TCST Physics
// ===========================================================================

export const PHYSICS_LESSONS_1AS_TCST_T1: PhysicsInteractiveLessonData[] = [
	// -------------------------------------------------------------------------
	// Lesson 1: Matter, Atom & Isotopes
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t1_matter_atom_isotopes',
		slug: 'phy-1as-tcst-t1-matter-atom-isotopes',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: بنية وهندسة أفراد بعض الأنواع الكيميائية',
		order: 1,
		titleAr: 'النوع والفرد الكيميائي، بنية الذرة ومكونات النواة والنظائر',
		objectives: [
			'التمييز بين الفرد الكيميائي (ذرة، جزيء، شاردة) والنوع الكيميائي والكشف التجريبي عن بعض الأنواع الكيميائية',
			'وصف بنية الذرة (النواة والإلكترونات) ومقارنة كتلة الذرة وشحنتها مع النواة، وتحديد العدد الكتلي A والعدد الذري Z',
			'تعريف العنصر الكيميائي والنظائر وحساب الكتلة الذرية المتوسطة لعنصر طبيعي'
		],
		keywordsAr: ['الفرد الكيميائي', 'النوع الكيميائي', 'بنية الذرة', 'النواة', 'العدد الكتلي A', 'العدد الذري Z', 'النظائر'],
		discover: {
			scenarioAr:
				'في مخبر الثانوية، يُجري تلاميذ السنة الأولى ثانوي تجربة الكشف عن محتوى علبة عصير برتقال طبيعي باستعمال كبريتات النحاس اللامائية ومحلول فهلينج وماء الجير، ثم يدرسون بنية ذرة الكلور المرموز لها بـ ${}^{35}_{17}\\mathrm{Cl}$ ونظيرها ${}^{37}_{17}\\mathrm{Cl}$.',
			svg: svgAtomIsotopesDiagram(),
			steps: [
				{
					promptAr: 'عند إضافة كبريتات النحاس اللامائية البيضاء إلى قطرة عصير برتقال تتحول إلى اللون الأزرق. ما هو النوع الكيميائي المكشوف عنه، وهل نقول إن قطرة العصير تحتوي على فرد واحد من $\\ce{H2O}$؟',
					hintAr: 'الكبريتات اللامائية تكشف عن الماء؛ أما الفرد الكيميائي فهو دقيقة مجهرية واحدة، بينما النوع الكيميائي هو مجموعة أفراد متماثلة.',
					expectedInput: 'الماء',
					revealAr: 'النوع الكيميائي هو **الماء**. قطرة العصير تحتوي على مليارات الأفراد الكيميائية (جزيئات $\\ce{H2O}$)، لذلك على المستوى العياني نتحدث عن "نوع كيميائي" وعلى المستوى المجهري نتحدث عن "فرد كيميائي".'
				},
				{
					promptAr: 'في نواة ذرة الكلور ${}^{35}_{17}\\mathrm{Cl}$، ما هو عدد البروتونات $Z$ وعدد النوترونات $N$؟',
					hintAr: 'العدد السفلي هو $Z$ (البروتونات) والعدد العلوي هو $A = Z + N$ (النيوكليونات).',
					expectedInput: '18',
					revealAr: 'عدد البروتونات هو $Z = 17$، وعدد النوترونات هو $N = A - Z = 35 - 17 = 18$ نوتروناً. ولأن الذرة متعادلة كهربائياً فهي تحتوي أيضاً على $17$ إلكتروناً.'
				},
				{
					promptAr: 'احسب شحنة نواة ذرة الكلور بالكولوم علماً أن $e = 1.6 \\times 10^{-19}\\,\\text{C}$، ثم استنتج شحنة الذرة الإجمالية.',
					hintAr: '$q_{\\text{noyau}} = +Z \\cdot e$، وشحنة الإلكترونات تساوي $-Z \\cdot e$.',
					expectedInput: '0',
					revealAr: 'شحنة النواة $q_{\\text{noyau}} = +17 \\times 1.6 \\times 10^{-19} = +2.72 \\times 10^{-18}\\,\\text{C}$. أما شحنة الذرة الإجمالية فهي $q_{\\text{atome}} = (+Z - Z)e = 0\\,\\text{C}$ (متعادلة كهربائياً).'
				},
				{
					promptAr: 'الكلور الطبيعي يتكون من $75\\%$ من النظير ${}^{35}_{17}\\mathrm{Cl}$ و$25\\%$ من النظير ${}^{37}_{17}\\mathrm{Cl}$. احسب الكتلة الذرية المتوسطة لعنصر الكلور.',
					hintAr: '$M = \\frac{75 \\times 35 + 25 \\times 37}{100}$.',
					expectedInput: '35.5',
					revealAr: '$M(\\mathrm{Cl}) = \\frac{75 \\times 35 + 25 \\times 37}{100} = \\frac{2625 + 925}{100} = 35.5\\,\\text{g/mol}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الفرد الكيميائي** هو كل دقيقة مجهرية مكونة للمادة (ذرة، جزيء، شاردة) مثل جزيء $\\ce{H2O}$ أو شاردة $\\ce{Na+}$. أما **النوع الكيميائي** فهو مجموعة من الأفراد الكيميائية المتماثلة على المستوى العياني (مثل الماء، ملح الطعام، غاز $\\ce{CO2}$).',
				'**بنية الذرة**: تتكون الذرة من **نواة مركزية** موجبة الشحنة تتركز فيها معظم الكتلة، تدور حولها **إلكترونات** سالبة الشحنة تفصلها عن النواة فراغ كبير (بنية فراغية: قطر الذرة $\\approx 10^{5}$ مرة قطر النواة).',
				'**رمز النواة** ${}^{A}_{Z}\\mathrm{X}$: حيث $Z$ هو **العدد الذري** (الشحني) ويمثل عدد البروتونات (ويساوي عدد الإلكترونات في الذرة المتعادلة)، و$A$ هو **العدد الكتلي** (عدد النيوكليونات) ويمثل مجموع البروتونات والنوترونات: $A = Z + N$.',
				'**كتلة الذرة وشحنتها**: كتلة الإلكترون مهملة أمام كتلة النيوكليون ($m_p \\approx m_n \\approx 1.67 \\times 10^{-27}\\,\\text{kg} \\approx 1836\\,m_e$)، لذا تتمركز كتلة الذرة في نواتها: $m_{\\text{atome}} \\approx m_{\\text{noyau}} \\approx A \\cdot m_p$. وشحنة النواة $q_{\\text{noyau}} = +Z \\cdot e$.',
				'**العنصر الكيميائي والنظائر**: **العنصر الكيميائي** يتميز بعدده الذري $Z$. **النظائر** هي ذرات تنتمي لنفس العنصر الكيميائي (نفس $Z$) وتختلف في العدد الكتلي $A$ أي في عدد النوترونات $N$. الكتلة الذرية المتوسطة لعنصر: $M = \\sum \\frac{p_i \\cdot A_i}{100}$.'
			],
			visualSvg: svgAtomIsotopesDiagram(),
			visualCaptionAr: 'تمثيل تخطيطي لنظيري الكربون ${}^{12}_{6}\\mathrm{C}$ و${}^{14}_{6}\\mathrm{C}$ (نفس $Z=6$ واختلاف في $N$)',
			examples: [
				{
					problemAr: 'ذرة الصوديوم رمز نواتها ${}^{23}_{11}\\mathrm{Na}$. أوجد تركيب هذه الذرة ثم احسب كتلتها التقريبية وشحنة نواتها علماً أن $m_p = 1.67 \\times 10^{-27}\\,\\text{kg}$ و$e = 1.6 \\times 10^{-19}\\,\\text{C}$.',
					solutionAr:
						'من الرمز ${}^{23}_{11}\\mathrm{Na}$ لدينا: $Z = 11$ و$A = 23$. إذن تحتوي الذرة على $11$ بروتوناً، و$N = 23 - 11 = 12$ نوتروناً، و$11$ إلكتروناً.\nكتلة الذرة: $m \\approx A \\cdot m_p = 23 \\times 1.67 \\times 10^{-27} \\approx 3.84 \\times 10^{-26}\\,\\text{kg}$.\nشحنة النواة: $q_{\\text{noyau}} = +11 \\times 1.6 \\times 10^{-19} = +1.76 \\times 10^{-18}\\,\\text{C}$.'
				},
				{
					problemAr: 'يتكون النحاس الطبيعي من نظيرين: ${}^{63}_{29}\\mathrm{Cu}$ بنسبة $69.2\\%$ و${}^{65}_{29}\\mathrm{Cu}$ بنسبة $30.8\\%$. احسب الكتلة الذرية المتوسطة لعنصر النحاس.',
					solutionAr:
						'$M(\\mathrm{Cu}) = \\frac{69.2 \\times 63 + 30.8 \\times 65}{100} = \\frac{4359.6 + 2002}{100} = 63.616\\,\\text{g/mol} \\approx 63.6\\,\\text{g/mol}$.'
				}
			],
			watchOutAr:
				'لا تخلط بين شحنة النواة ($+Ze$، موجبة دوماً) وشحنة الذرة ($0$ لأن الذرة متعادلة كهربائياً)، ولا بين شحنة الشاردة التي تنتج عن تغير عدد الإلكترونات فقط مع بقاء النواة ($Z$ و$A$) ثابتة دون تغيير!'
		},
		practice: [
			{
				questionAr: 'ما هو تركيب نواة ذرة الحديد ${}^{56}_{26}\\mathrm{Fe}$ وعدد إلكتروناتها؟',
				options: [
					'$26$ بروتوناً، $30$ نوتروناً، $26$ إلكتروناً',
					'$30$ بروتوناً، $26$ نوتروناً، $26$ إلكتروناً',
					'$26$ بروتوناً، $56$ نوتروناً، $26$ إلكتروناً',
					'$56$ بروتوناً، $26$ نوتروناً، $30$ إلكتروناً'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! $Z = 26$ يعطي عدد البروتونات والإلكترونات، و$N = A - Z = 56 - 26 = 30$ نوتروناً.',
					'خطأ: العدد السفلي $Z = 26$ هو عدد البروتونات وليس النوترونات.',
					'خطأ: $56$ هو العدد الكتلي $A$ (مجموع البروتونات والنوترونات)، وليس عدد النوترونات.',
					'خطأ: عكست بين $A$ و$Z$ ولم تحسب $N = A - Z$.'
				],
				explanationAr: 'في النواة ${}^{56}_{26}\\mathrm{Fe}$: $Z = 26$ بروتوناً (ومثلها إلكتروناً في الذرة المتعادلة) و$N = A - Z = 56 - 26 = 30$ نوتروناً.'
			},
			{
				questionAr: 'تُعرَّف النظائر بأنها ذرات لعنصر كيميائي لها:',
				options: [
					'نفس العدد الكتلي $A$ وتختلف في العدد الذري $Z$',
					'نفس العدد الذري $Z$ وتختلف في عدد النوترونات $N$',
					'نفس عدد النوترونات $N$ وتختلف في عدد البروتونات $Z$',
					'نفس الكتلة الذرية وتختلف في الشحنة الكهربائية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: إذا اختلف $Z$ تغيّر العنصر الكيميائي تماماً.',
					'صحيح! النظائر تنتمي لنفس العنصر (نفس $Z$) وتختلف في $N$ وبالتالي في $A$.',
					'خطأ: تساوي $N$ مع اختلاف $Z$ لا يمثل نظائر لنفس العنصر.',
					'خطأ: النظائر لها نفس الخواص الكيميائية والشحنة المتعادلة، وتختلف في الكتلة لاحتوائها على أعداد مختلفة من النوترونات.'
				],
				explanationAr: 'النظائر هي أنوية لعنصر واحد تشترك في نفس العدد الذري $Z$ (عدد البروتونات) وتختلف في عدد النوترونات $N$ (وبالتالي في العدد الكتلي $A$).'
			},
			{
				questionAr: 'كتلة ذرة ما تساوي تقريباً $m = 4.509 \\times 10^{-26}\\,\\text{kg}$. علماً أن $m_p = 1.67 \\times 10^{-27}\\,\\text{kg}$، فإن عددها الكتلي $A$ يساوي:',
				options: ['$13$', '$14$', '$27$', '$54$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: $13$ هو العدد الذري $Z$ للألمنيوم وليس العدد الكتلي $A$.',
					'خطأ: تحقق من القسمة $4.509 \\times 10^{-26} / (1.67 \\times 10^{-27})$.',
					'صحيح! $A \\approx m / m_p = 45.09 / 1.67 = 27$ (نظير الألمنيوم ${}^{27}_{13}\\mathrm{Al}$).',
					'خطأ: ضاعفت النتيجة الصحيحة بدون مبرر.'
				],
				explanationAr: 'بإهمال كتلة الإلكترونات: $m_{\\text{atome}} \\approx A \\cdot m_p \\implies A = \\frac{4.509 \\times 10^{-26}}{1.67 \\times 10^{-27}} = 27$.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 2: Electron Configuration, Octet/Duet & Periodic Table
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t1_electron_config_periodic_table',
		slug: 'phy-1as-tcst-t1-electron-config-periodic-table',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: بنية وهندسة أفراد بعض الأنواع الكيميائية',
		order: 2,
		titleAr: 'التوزيع الإلكتروني، قاعدة الثنائية والثمانية، والجدول الدوري البسيط',
		objectives: [
			'كتابة التوزيع الإلكتروني على الطبقات (K, L, M) للذرات ذات Z ≤ 18 والشوارد البسيطة',
			'تطبيق قاعدتي الثنائية والثمانية الإلكترونية لتوقع صيغة الشاردة المستقرة لكل عنصر',
			'ربط التوزيع الإلكتروني بموقع العنصر (السطر والعمود) في الجدول الدوري المبسط وتمييز عائلات الغازات الخاملة والمعادن القلوية والهالوجينات'
		],
		keywordsAr: ['التوزيع الإلكتروني', 'قاعدة الثمانية', 'قاعدة الثنائية', 'الجدول الدوري', 'الغازات الخاملة', 'الشاردة البسيطة'],
		discover: {
			scenarioAr:
				'تُحفظ شرائح الصوديوم ($Z=11$) في البترول لأنها تتفاعل بعنف مع الماء، بينما غاز الأرغون ($Z=18$) خامل كيميائياً ولا يتفاعل. لفهم سر هذا التباين، نقوم بتوزيع الإلكترونات على الطبقات $(K, L, M)$.',
			svg: svgElectronShellsKLM('Cl', 17, 2, 8, 7),
			steps: [
				{
					promptAr: 'ما هو أكبر عدد من الإلكترونات تستوعبه كل من الطبقة $K$ والطبقة $L$؟',
					hintAr: 'القاعدة هي $2n^2$ حيث $n=1$ للطبقة $K$ و$n=2$ للطبقة $L$.',
					expectedInput: '2,8',
					revealAr: 'تستوعب الطبقة $K$ ($n=1$) على الأكثر $2$ إلكترونين، والطبقة $L$ ($n=2$) على الأكثر $8$ إلكترونات، والطبقة $M$ ($n=3$) تستوعب $8$ إلكترونات في الجدول الدوري المبسط ($Z \\le 18$).'
				},
				{
					promptAr: 'اكتب التوزيع الإلكتروني لذرة الصوديوم $\\ce{Na}$ ($Z = 11$) وذرة الأرغون $\\ce{Ar}$ ($Z = 18$).',
					hintAr: 'نملأ $K$ أولاً ثم $L$ ثم $M$.',
					expectedInput: '(K)2(L)8(M)1',
					revealAr: 'الصوديوم $\\ce{Na}$ ($Z=11$): $(K)^2 (L)^8 (M)^1$. الأرغون $\\ce{Ar}$ ($Z=18$): $(K)^2 (L)^8 (M)^8$.'
				},
				{
					promptAr: 'كم إلكتروناً في الطبقة السطحية لذرة الصوديوم؟ وماذا تفعل لتحقق قاعدة الثمانية وتصبح مستقرة؟',
					hintAr: 'من الأسهل لها فقد $1$ إلكترون أم اكتساب $7$ إلكترونات؟',
					expectedInput: 'Na+',
					revealAr: 'تمتلك إلكتروناً واحداً في طبقتها السطحية $(M)^1$. لذلك تميل إلى **فقدانه** ليصبح توزيعها $(K)^2 (L)^8$ مشابهة لغاز النيون الخامل، وتتحول إلى شاردة موجبة أحادية $\\ce{Na+}$.'
				},
				{
					promptAr: 'حدد موقع عنصر الكلور $\\ce{Cl}$ ($Z=17$) في الجدول الدوري المبسط (رقم السطر ورقم العمود) وعائلته.',
					hintAr: 'عدد الطبقات = رقم السطر، عدد إلكترونات الطبقة السطحية = رقم العمود.',
					expectedInput: '3,7',
					revealAr: 'التوزيع الإلكتروني للكلور $(K)^2 (L)^8 (M)^7$: يمتلك $3$ طبقات إذن يقع في **السطر 3**، ولديه $7$ إلكترونات تكافؤ إذن يقع في **العمود 7 (VII)** وينتمي لعائلة **الهالوجينات**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبدأ التوزيع الإلكتروني** ($Z \\le 18$): تتوزع الإلكترونات على الطبقات $K, L, M$ حسب القاعدة $2n^2$، حيث تتشبع $K$ بـ $2$ إلكترون، و$L$ بـ $8$ إلكترونات، ولا ننتقل إلى طبقة أعلى حتى تتشبع الطبقة التي تسبقها.',
				'**قاعدة الثنائية وقاعدة الثمانية**: تسعى الذرات أثناء التحولات الكيميائية إلى إشباع طبقتها السطحية بـ $2$ إلكترون إذا كانت قريبة من الهيليوم ($Z \\le 4$: **قاعدة الثنائية**)، أو بـ $8$ إلكترونات إذا كانت لها طبقتان أو ثلاث (**قاعدة الثمانية**)، لتكتسب استقرار الغاز الخامل الأقرب إليها.',
				'**توقع الشاردة البسيطة**: الذرات التي لها $1, 2, 3$ إلكترونات في الطبقة السطحية تميل إلى **فقدها** لتشكل شوارد موجبة ($\\ce{Na+}, \\ce{Mg^{2+}}, \\ce{Al^{3+}}$). والذرات التي لها $5, 6, 7$ إلكترونات تميل إلى **اكتساب** $3, 2, 1$ إلكترونات لتشكل شوارد سالبة ($\\ce{N^{3-}}, \\ce{O^{2-}}, \\ce{Cl-}$).',
				'**الجدول الدوري المبسط** (3 أسطر × 8 أعمدة): **رقم السطر** = عدد الطبقات الإلكترونية المشغولة ($1, 2, 3$). **رقم العمود** = عدد إلكترونات الطبقة السطحية (من I إلى VIII).',
				'**العائلات الكيميائية الرئيسية**: العمود 1 (I): **المعادن القلوية** (باستثناء الهيدروجين)، العمود 2 (II): **القلويات الترابية**، العمود 7 (VII): **الهالوجينات** ($\\ce{F, Cl}$)، العمود 8 (VIII): **الغازات الخاملة** ($\\ce{He, Ne, Ar}$) وهي مستقرة كيميائياً.'
			],
			visualSvg: svgElectronShellsKLM('Cl', 17, 2, 8, 7),
			visualCaptionAr: 'التوزيع الإلكتروني لذرة الكلور ${}_{17}\\mathrm{Cl}$ على الطبقات $(K)^2 (L)^8 (M)^7$ وموقعها في الجدول الدوري',
			examples: [
				{
					problemAr: 'عنصر كيميائي $X$ عدده الذري $Z = 13$ (الألمنيوم $\\mathrm{Al}$). اكتب توزيعه الإلكتروني، حدد موقعه في الجدول الدوري، واستنتج صيغة شارده المستقرة.',
					solutionAr:
						'التوزيع الإلكتروني: $(K)^2 (L)^8 (M)^3$.\nالموقع: يمتلك $3$ طبقات ← **السطر 3**، و$3$ إلكترونات في الطبقة السطحية ← **العمود 3 (III)**.\nالشاردة: يفقد $3$ إلكترونات ليشبع طبقته السطحية بـ $8$ (قاعدة الثمانية)، فتصبح شارده $\\ce{Al^{3+}}$ وتوزيعها $(K)^2 (L)^8$.'
				},
				{
					problemAr: 'شاردة بسيطة صيغتها $\\ce{O^{2-}}$ وتوزيعها الإلكتروني $(K)^2 (L)^8$. أوجد العدد الذري $Z$ لذرة الأكسجين وحدد موقعها في الجدول الدوري.',
					solutionAr:
						'الشاردة $\\ce{O^{2-}}$ اكتسبت إلكترونين ولها $2 + 8 = 10$ إلكترونات. إذن الذرة المتعادلة تملك $Z = 10 - 2 = 8$ إلكترونات (و$8$ بروتونات).\nتوزيع الذرة: $(K)^2 (L)^6$ ← السطر $2$ والعمود $6$ (VI).'
				}
			],
			watchOutAr:
				'انتبه لعدم تحديد موقع العنصر انطلاقاً من التوزيع الإلكتروني لشاردته! يجب دوماً العودة إلى التوزيع الإلكتروني **للذرة المتعادلة** لتحديد السطر والعمود. كما أن الهيليوم $\\ce{He}$ ($Z=2$) توزيعه $(K)^2$ ويُصنف في العمود 8 (VIII) مع الغازات الخاملة رغم امتلاكه إلكترونين فقط لأن طبقته الوحيدة $K$ مشبعة.'
		},
		practice: [
			{
				questionAr: 'يقع عنصر كيميائي $X$ في السطر $3$ والعمود $2$ (II) من الجدول الدوري المبسط. ما هو عدده الذري $Z$؟',
				options: ['$Z = 4$', '$Z = 10$', '$Z = 12$', '$Z = 13$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: $Z = 4$ يوافق السطر $2$ والعمود $2$ (البريليوم).',
					'خطأ: $Z = 10$ يوافق السطر $2$ والعمود $8$ (غاز النيون الخامل).',
					'إجابة صحيحة! السطر $3$ يعني $3$ طبقات، والعمود $2$ يعني إلكترونين في $M$: $(K)^2 (L)^8 (M)^2$ أي $Z = 12$ (المغنيسيوم).',
					'خطأ: $Z = 13$ يقع في السطر $3$ والعمود $3$.'
				],
				explanationAr: 'السطر $3$ يعني وجود $3$ طبقات ($K, L, M$) حيث $K$ و$L$ مشبعتان ($2+8=10$). العمود $2$ يعني أن $M$ تحتوي على $2$ إلكترونين. إذن $Z = 2 + 8 + 2 = 12$.'
			},
			{
				questionAr: 'ما هي الشاردة المتوقعة لذرة الفلور ${}_{9}\\mathrm{F}$ حسب قاعدة الثمانية؟',
				options: ['$\\ce{F+}$', '$\\ce{F-}$', '$\\ce{F^{2-}}$', '$\\ce{F^{7+}}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفلور لا يميل لفقد إلكترون بل لاكتساب إلكترون.',
					'صحيح! توزيع الفلور $(K)^2 (L)^7$، فيكتسب إلكتروناً واحداً ليصبح $(K)^2 (L)^8$ ويشكل الشاردة $\\ce{F-}$.',
					'خطأ: باكتساب إلكترونين سيصبح لديه $9$ إلكترونات في $L$ وهذا مستحيل.',
					'خطأ: فقد $7$ إلكترونات يتطلب طاقة هائلة ولا يحدث كيميائياً.'
				],
				explanationAr: 'توزيع الفلور $(K)^2 (L)^7$ يحتوي على $7$ إلكترونات تكافؤ، لذا يكتسب إلكتروناً واحداً ليحقق قاعدة الثمانية وتتشكل الشاردة $\\ce{F-}$.'
			},
			{
				questionAr: 'تتشابه عناصر العمود الواحد في الجدول الدوري في:',
				options: [
					'العدد الكتلي $A$',
					'عدد الطبقات الإلكترونية',
					'عدد إلكترونات الطبقة السطحية والخواص الكيميائية',
					'عدد النوترونات في النواة'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: العدد الكتلي يزداد نزولاً في العمود.',
					'خطأ: عدد الطبقات الإلكترونية يميز عناصر السطر الواحد، لا العمود.',
					'صحيح! عناصر العمود الواحد لها نفس عدد إلكترونات التكافؤ، مما يمنحها خواص كيميائية متشابهة.',
					'خطأ: عدد النوترونات يزداد من عنصر لآخر في العمود.'
				],
				explanationAr: 'عناصر العمود الواحد تشكل عائلة كيميائية لأنها تملك نفس عدد إلكترونات الطبقة السطحية (إلكترونات التكافؤ)، وهو ما يحدد سلوكها الكيميائي.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 3: Lewis, VSEPR Geometry & Polarity
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t1_lewis_vsepr_geometry',
		slug: 'phy-1as-tcst-t1-lewis-vsepr-geometry',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: بنية وهندسة أفراد بعض الأنواع الكيميائية',
		order: 3,
		titleAr: 'نموذج لويس، هندسة الجزيئات (VSEPR)، واستقطاب الروابط',
		objectives: [
			'تحديد التكافؤ وتمثيل الجزيئات وفق نموذج لويس (الأزواج الرابطة وغير الرابطة)',
			'تطبيق نموذج التنافر الأصغري للأزواج الإلكترونية (جيلسبي VSEPR) للتنبؤ بالشكل الهندسي للجزيئات البسيطة ونموذج كرام',
			'الربط بين الكهروسلبية واستقطاب الرابطة التكافؤية'
		],
		keywordsAr: ['تمثيل لويس', 'نموذج جيلسبي VSEPR', 'نموذج كرام', 'الرابطة التكافؤية', 'الكهروسلبية'],
		discover: {
			scenarioAr:
				'على الرغم من أن جزيئي الماء $\\ce{H2O}$ وثنائي أكسيد الكربون $\\ce{CO2}$ يتكونان من ثلاث ذرات، إلا أن الأول جزيء مستقطب وزاوي الشكل، بينما الثاني غير مستقطب وخطي. لنكتشف السبب عبر نموذجي لويس وجيلسبي.',
			svg: svgLewisVseprGallery(),
			steps: [
				{
					promptAr: 'احسب عدد إلكترونات التكافؤ لذرة الأكسجين ($Z=8$) وذرة الكربون ($Z=6$)، ثم حدد تكافؤ كل منهما (عدد الروابط التي يشكلها).',
					hintAr: 'التكافؤ هو عدد الإلكترونات التي تنقص الذرة لتحقق قاعدة الثمانية.',
					expectedInput: '2,4',
					revealAr: 'الأكسجين $(K)^2 (L)^6$ له $6$ إلكترونات تكافؤ ← ينقصه $2$ إلكترونان ← تكافؤه $2$ (يشكل رابطتين وله زوجان غير رابطين). الكربون $(K)^2 (L)^4$ له $4$ إلكترونات تكافؤ ← تكافؤه $4$ (يشكل $4$ روابط).'
				},
				{
					promptAr: 'في تمثيل لويس لجزيء الماء $\\ce{H2O}$، كم زوجاً رابطاً وكم زوجاً غير رابط تحيط بالذرة المركزية $\\mathrm{O}$؟',
					hintAr: 'الذرة المركزية $\\mathrm{O}$ ترتبط بذرتي $\\mathrm{H}$ وتحتفظ ببقية إلكترونات تكافؤها كأزواج حرة.',
					expectedInput: 'AX2E2',
					revealAr: 'تحيط بذرة الأكسجين $2$ أزواج رابطة ($n=2$) و$2$ أزواج غير رابطة ($m=2$)، فصيغة جيلسبي هي $\\mathrm{AX_2E_2}$ (مجموع الأزواج $= 4$).'
				},
				{
					promptAr: 'بسبب التنافر الكهربائي بين الأزواج الإلكترونية الأربعة حول $\\mathrm{O}$، ما هو الشكل الهندسي لجزيء الماء $\\ce{H2O}$؟',
					hintAr: 'الأزواج الأربعة تتوزع نحو رؤوس رباعي وجوه، لكننا نرى فقط موضع النوى $\\mathrm{H-O-H}$.',
					expectedInput: 'مرفقي',
					revealAr: 'الشكل الهندسي لجزيء الماء هو **مرفقي (أو زاوي)** بزاوية تقارب $104.5^\\circ$، لأن الزوجين غير الرابطين يدفعان الرابطتين $\\mathrm{O-H}$ نحو الأسفل.'
				},
				{
					promptAr: 'علماً أن كهروسلبية الأكسجين ($3.44$) أكبر من كهروسلبية الهيدروجين ($2.20$)، كيف يكون استقطاب الرابطة $\\mathrm{O-H}$؟',
					hintAr: 'الذرة الأكثر كهروسلبية تجذب الزوج الرابط نحوها فتأخذ شحنة جزئية سالبة $\\delta^-$.',
					expectedInput: 'مستقطبة',
					revealAr: 'الرابطة $\\mathrm{O-H}$ **مستقطبة** بحيث يحمل الأكسجين شحنة جزئية سالبة ($\\delta^-$) ويحمل الهيدروجين شحنة جزئية موجبة ($\\delta^+$). وبما أن الشكل مرفقي، فإن الجزيء $\\ce{H2O}$ مستقطب أيضاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**نموذج لويس**: تُجمع إلكترونات الطبقة السطحية لكل الذرات. تُمثل **الأزواج الرابطة** بخط بين ذرتين (رابطة تكافؤية بسيطة أو ثنائية أو ثلاثية)، وتُمثل **الأزواج غير الرابطة (الحرة)** بخط بجانب رمز الذرة، بحيث تحقق كل ذرة قاعدة الثنائية ($\\mathrm{H}$) أو الثمانية ($\\mathrm{C, N, O, Cl}$).',
				'**حساب عدد الأزواج في جزيء**: $\\text{عدد الأزواج الكلي} = \\frac{1}{2} \\sum n_i$ حيث $n_i$ عدد إلكترونات التكافؤ لكل ذرة.',
				'**نموذج جيلسبي (VSEPR)**: يُرمز للجزيء بالصيغة $\\mathrm{AX}_n\\mathrm{E}_m$، حيث $\\mathrm{A}$ الذرة المركزية، $n$ عدد الذرات المرتبطة بها (أو عدد اتجاهات الروابط)، و$m$ عدد الأزواج غير الرابطة على $\\mathrm{A}$. تتوزع هذه الأزواج في الفضاء بحيث يكون **التنافر بينها أصغرياً**:',
				'- $\\mathrm{AX_2}$ (مثل $\\ce{CO2}$): شكل **خطي** ($180^\\circ$). | $\\mathrm{AX_3}$: **مثلث مستو** ($120^\\circ$). | $\\mathrm{AX_4}$ (مثل $\\ce{CH4}$): **رباعي الوجوه منتظم** ($109.5^\\circ$). | $\\mathrm{AX_3E_1}$ (مثل $\\ce{NH3}$): **هرم ثلاثي القاعدة** ($107^\\circ$). | $\\mathrm{AX_2E_2}$ (مثل $\\ce{H2O}$): **مرفقي / زاوي** ($104.5^\\circ$).',
				'**الكهروسلبية واستقطاب الرابطة**: الكهروسلبية هي قدرة الذرة على جذب إلكترونات الرابطة التكافؤية نحوها (تزداد من اليسار إلى اليمين في السطر ومن الأسفل إلى الأعلى في العمود: $\\mathrm{F > O > N \\approx Cl > C \\approx H}$). تكون الرابطة مستقطبة إذا اختلف نوعا الذرتين ($\\Delta \\chi \\neq 0$): الأكثر كهروسلبية تحمل $\\delta^-$ والأقل تحمل $\\delta^+$.'
			],
			visualSvg: svgLewisVseprGallery(),
			visualCaptionAr: 'الأشكال الهندسية لجزيئات الماء $\\ce{H2O}$ ($\mathrm{AX_2E_2}$)، النشادر $\\ce{NH3}$ ($\mathrm{AX_3E_1}$)، والميثان $\\ce{CH4}$ ($\mathrm{AX_4}$) وفق VSEPR وكرام',
			examples: [
				{
					problemAr: 'أعط تمثيل لويس لجزيء النشادر $\\ce{NH3}$ ثم استنتج صيغته حسب جيلسبي وشكله الهندسي وفق تمثيل كرام (علماً أن ${}_7\\mathrm{N}$ و${}_1\\mathrm{H}$).',
					solutionAr:
						'توزيع الآزوت ${}_7\\mathrm{N}$: $(K)^2 (L)^5$ ← $5$ إلكترونات تكافؤ، تكافؤه $3$، ويملك زوجاً غير رابط.\nفي تمثيل لويس: ترتبط ذرة $\\mathrm{N}$ بثلاث ذرات $\\mathrm{H}$ عبر $3$ روابط بسيطة ويوجد فوق $\\mathrm{N}$ زوج غير رابط واحد.\nصيغة جيلسبي: $\\mathrm{AX_3E_1}$ ← الشكل الهندسي: **هرمي ثلاثي** (في تمثيل كرام: رابطة في المستوي، رابطة أمام المستوي بمثلث مملوء، ورابطة خلف المستوي بخطوط متقطعة).'
				},
				{
					problemAr: 'حدد صيغة جيلسبي لجزيء ثنائي أكسيد الكربون $\\ce{CO2}$ (${}_6\\mathrm{C}, {}_8\\mathrm{O}$) وهل الجزيء مستقطب؟',
					solutionAr:
						'الكربون ${}_6\\mathrm{C}$ له $4$ إلكترونات تكافؤ (يكوّن $4$ روابط)، والأكسجين له $6$ (يكوّن رابطتين وله زوجان غير رابطين). إذن يرتبط الكربون بذرتي $\\mathrm{O}$ برابطتين ثنائيتين: $\\mathrm{O=C=O}$ دون أزواج حرة على $\\mathrm{C}$.\nصيغة جيلسبي: $\\mathrm{AX_2}$ ← **خطي** ($180^\\circ$). رغم أن كل رابطة $\\mathrm{C=O}$ مستقطبة، فإن التناظر الخطي يجعل محصلة الاستقطاب معدومة، فالجزيء $\\ce{CO2}$ **غير مستقطب**.'
				}
			],
			watchOutAr:
				'في صيغة جيلسبي $\\mathrm{AX}_n\\mathrm{E}_m$، تعدّ الرابطة الثنائية أو الثلاثية كاتجاه واحد ($n$ هو عدد الذرات المرتبطة بالذرة المركزية)، ولا تُحسب الأزواج غير الرابطة الموجودة على الذرات الطرفية ضمن $m$ (نحصي فقط أزواج الذرة المركزية $\\mathrm{A}$).'
		},
		practice: [
			{
				questionAr: 'ما هي صيغة جيلسبي VSEPR والشكل الهندسي لجزيء الميثان $\\ce{CH4}$؟',
				options: [
					'$\\mathrm{AX_4}$ — مربع مستو',
					'$\\mathrm{AX_4}$ — رباعي الوجوه منتظم',
					'$\\mathrm{AX_3E_1}$ — هرم ثلاثي',
					'$\\mathrm{AX_2E_2}$ — مرفقي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التنافر في الفضاء ثلاثي الأبعاد يعطي زوايا $109.5^\\circ$ وليس مربعاً مستوياً ($90^\\circ$).',
					'صحيح! ذرة الكربون مرتبطة بـ $4$ ذرات هيدروجين دون أزواج غير رابطة ($\\mathrm{AX_4}$)، والشكل رباعي وجوه منتظم.',
					'خطأ: لا يوجد زوج غير رابط على ذرة الكربون في $\\ce{CH4}$.',
					'خطأ: $\\mathrm{AX_2E_2}$ تخص جزيء الماء $\\ce{H2O}$ وليس الميثان.'
				],
				explanationAr: 'لذرة الكربون $4$ إلكترونات تكافؤ تشكل كلها روابط بسيطة مع $4$ ذرات هيدروجين ($n=4, m=0$). الصيغة $\\mathrm{AX_4}$ تعطي شكلاً رباعي الوجوه منتظم بزاوية $109.5^\\circ$.'
			},
			{
				questionAr: 'كم عدد الأزواج غير الرابطة حول ذرة الكلور في جزيء $\\ce{HCl}$ (علماً أن ${}_{17}\\mathrm{Cl}$ و${}_1\\mathrm{H}$)?',
				options: ['زوج واحد', 'زوجان', '$3$ أزواج غير رابطة', 'لا توجد أزواج غير رابطة'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لدى الكلور $7$ إلكترونات تكافؤ، يستخدم واحداً فقط للربط.',
					'خطأ: يبقى $6$ إلكترونات غير مرتبطة، أي $6/2 = 3$ أزواج.',
					'أحسنت! الكلور $(K)^2(L)^8(M)^7$ يستخدم إلكتروناً للرابطة $\\mathrm{H-Cl}$ وتبقى $6$ إلكترونات تشكل $3$ أزواج غير رابطة.',
					'خطأ: كل هالوجين في جزيء بسيط يحتفظ بـ $3$ أزواج غير رابطة.'
				],
				explanationAr: 'للكلور $7$ إلكترونات في طبقته السطحية $M$: إلكترون يشكل زوجاً رابطاً مع $\\mathrm{H}$ و$6$ إلكترونات تشكل $3$ أزواج غير رابطة.'
			},
			{
				questionAr: 'في تمثيل كرام لجزيء فضائي، يُستعمل الخط المثلث المملوء (السميك) للدلالة على رابطة:',
				options: [
					'تقع في مستوي الورقة',
					'تتجه نحو الخلف (خلف مستوي الورقة)',
					'تتجه نحو الأمام (نحو القارئ)',
					'رابطة ثنائية بين ذرتين'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الرابطة في مستوي الورقة تُرسم بخط مستمر رفيع.',
					'خطأ: الرابطة نحو الخلف تُرسم بخطوط متقطعة (مهشرة).',
					'صحيح! المثلث المملوء يشير إلى رابطة بارزة نحو الأمام.',
					'خطأ: المثلث المملوء خاص بالاتجاه الفضائي وليس برتبة الرابطة.'
				],
				explanationAr: 'في تمثيل كرام: الخط المستمر = في المستوي، المثلث المملوء = نحو الأمام، المثلث المتقطع = نحو الخلف.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 4: Rectilinear Motion, Forces & Principle of Inertia
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t1_rectilinear_motion_forces',
		slug: 'phy-1as-tcst-t1-rectilinear-motion-forces',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدات 2 و 3 و 4: القوة والحركات المستقيمة والمنحنية والمرجع',
		order: 4,
		titleAr: 'القوة والحركات المستقيمة (مبدأ العطالة وشعاع تغير السرعة)',
		objectives: [
			'حساب السرعة اللحظية وتمثيل أشعة السرعة وشعاع تغير السرعة Δv انطلاقاً من تسجيل متعاقب لمواضع متحرك',
			'تحديد خصائص شعاع القوة وعلاقتها بخصائص شعاع تغير السرعة Δv في الحركات المستقيمة (المنتظمة، المتسارعة، والمتباطئة)',
			'صياغة مبدأ العطالة وتطبيقه في الكشف عن وجود قوة مطبقة على جملة'
		],
		keywordsAr: ['الحركة المستقيمة', 'شعاع السرعة', 'شعاع تغير السرعة', 'مبدأ العطالة', 'شعاع القوة'],
		discover: {
			scenarioAr:
				'ينزلق جسم صلب على نضد هوائي أملس أفقياً، ثم يجرّه خيط مشدود بثابت نحو اليمين. نسجل مواضع مركزه $M_0, M_1, M_2, M_3, M_4, M_5$ خلال فترات زمنية متساوية $\\tau = 0.1\\,\\text{s}$، فكانت المسافات على التوالي: $2\\,\\text{cm}, 3\\,\\text{cm}, 4\\,\\text{cm}, 5\\,\\text{cm}, 6\\,\\text{cm}$ (السلم الحقيقي $1:1$).',
			svg: svgStroboscopicRectilinear(),
			steps: [
				{
					promptAr: 'احسب قيمة السرعة اللحظية $v_2$ عند الموضع $M_2$ بوحدة $\\text{m/s}$.',
					hintAr: '$v_2 = \\frac{M_1 M_3}{2\\tau}$، حيث $M_1 M_3 = M_1 M_2 + M_2 M_3$ بالمتر.',
					expectedInput: '0.35',
					revealAr: '$M_1 M_3 = 3\\,\\text{cm} + 4\\,\\text{cm} = 7\\,\\text{cm} = 0.07\\,\\text{m}$. ومنه $v_2 = \\frac{0.07}{2 \\times 0.1} = 0.35\\,\\text{m/s}$.'
				},
				{
					promptAr: 'احسب كذلك قيمة السرعة اللحظية $v_4$ عند الموضع $M_4$ بوحدة $\\text{m/s}$.',
					hintAr: '$M_3 M_5 = 5\\,\\text{cm} + 6\\,\\text{cm} = 11\\,\\text{cm} = 0.11\\,\\text{m}$.',
					expectedInput: '0.55',
					revealAr: '$v_4 = \\frac{M_3 M_5}{2\\tau} = \\frac{0.11}{0.2} = 0.55\\,\\text{m/s}$. نلاحظ أن السرعة تتزايد بمرور الزمن.'
				},
				{
					promptAr: 'احسب طويلة شعاع تغير السرعة $\\Delta \\vec{v}_3 = \\vec{v}_4 - \\vec{v}_2$ وحدد جهته بالنسبة للحركة.',
					hintAr: 'في حركة مستقيمة متسارعة، $\\Delta v_3 = v_4 - v_2$ وفي نفس جهة الحركة.',
					expectedInput: '0.2',
					revealAr: '$\\Delta v_3 = v_4 - v_2 = 0.55 - 0.35 = 0.2\\,\\text{m/s}$ (في بعض الحسابات $0.20\\,\\text{m/s}$)، وجهته **نفس جهة الحركة**.'
				},
				{
					promptAr: 'ماذا تستنتج عن القوة المطبقة $\\vec{F}$ على الجسم؟ وماذا لو كانت المسافات متساوية ($\\Delta \\vec{v} = \\vec{0}$)?',
					hintAr: 'شعاع القوة $\\vec{F}$ له نفس خصائص شعاع تغير السرعة $\\Delta \\vec{v}$.',
					expectedInput: 'مبدأ العطالة',
					revealAr: 'تخضع الجملة لقوة ثابتة $\\vec{F}$ لها نفس جهة $\\Delta \\vec{v}$ (نفس جهة الحركة). أما إذا كانت المسافات متساوية فإن $\\Delta \\vec{v} = \\vec{0}$ وتكون الحركة مستقيمة منتظمة: **مبدأ العطالة**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**السرعة اللحظية** عند موضع $M_i$: تُقاس بحساب السرعة المتوسطة بين الموضعين المجاورين له $M_{i-1}$ و$M_{i+1}$: $v_i = \\frac{M_{i-1} M_{i+1}}{2\\tau}$، ويكون **شعاع السرعة** $\\vec{v}_i$ مماساً للمسار وفي جهة الحركة.',
				'**شعاع تغير السرعة** عند الموضع $M_i$: $\\Delta \\vec{v}_i = \\vec{v}_{i+1} - \\vec{v}_{i-1}$.',
				'**تصنيف الحركات المستقيمة**:\n- **مستقيمة منتظمة**: المسافات المتتالية متساوية، $\\vec{v} = \\overrightarrow{\\text{cte}}$ و$\\Delta \\vec{v} = \\vec{0}$.\n- **مستقيمة متسارعة**: المسافات تتزايد، $v$ تتزايد و$\\Delta \\vec{v}$ في **جهة الحركة**.\n- **مستقيمة متباطئة**: المسافات تتناقص، $v$ تتناقص و$\\Delta \\vec{v}$ **عكس جهة الحركة**.',
				'**العلاقة بين القوة وتغير السرعة**: في معلم غاليلي، إذا تغيرت سرعة متحرك فإن ذلك ناتج عن تأثير قوة $\\vec{F}$ لها **نفس الحامل ونفس الجهة** لشعاع تغير السرعة $\\Delta \\vec{v}$ (وشدتها تتناسب طرداً مع $\\|\\Delta \\vec{v}\\|$).',
				'**مبدأ العطالة (القانون الأول لنيوتن)**: «يحافظ كل جسم على سكونه أو حركته المستقيمة المنتظمة إذا لم تتدخل قوة لتغيير حالته الحركية». أي $\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{v} = \\overrightarrow{\\text{cte}}$ (سكون أو حركة مستقيمة منتظمة).'
			],
			visualSvg: svgStroboscopicRectilinear(),
			visualCaptionAr: 'تمثيل أشعة السرعة $\\vec{v}_2, \\vec{v}_4$ وشعاع تغير السرعة $\\Delta \\vec{v}_3$ والقوة $\\vec{F}$ في حركة مستقيمة متسارعة',
			examples: [
				{
					problemAr: 'سيارة تتحرك على طريق مستقيم أفقي، سُجِّلت مواضعها كل $\\tau = 0.5\\,\\text{s}$ فكانت: $M_0 M_1 = 5\\,\\text{m}$، $M_1 M_2 = 5\\,\\text{m}$، $M_2 M_3 = 5\\,\\text{m}$. ما طبيعة الحركة؟ وهل تخضع السيارة لقوة محصلة غير معدومة؟',
					solutionAr:
						'المسافات المتتالية خلال أزمنة متساوية $\\tau$ متساوية ($5\\,\\text{m}$)، إذن السرعة ثابتة $v = \\frac{5}{0.5} = 10\\,\\text{m/s}$ والحركة **مستقيمة منتظمة**.\nحسب مبدأ العطالة، بما أن $\\Delta \\vec{v} = \\vec{0}$ فإن محصلة القوى الخارجية المؤثرة على السيارة معدومة ($\\sum \\vec{F} = \\vec{0}$).'
				},
				{
					problemAr: 'أثناء كبح دراجة في مسار مستقيم، كانت سرعتها عند $M_1$ هي $v_1 = 8\\,\\text{m/s}$ وعند $M_3$ هي $v_3 = 4\\,\\text{m/s}$. مثل خصائص $\\Delta \\vec{v}_2$ واستنتج جهة قوة الكبح.',
					solutionAr:
						'بما أن $v_3 < v_1$ فالحركة مستقيمة متباطئة. طويلة $\\Delta \\vec{v}_2$ هي $|v_3 - v_1| = |4 - 8| = 4\\,\\text{m/s}$، وحامله منطبق على المسار وجهته **عكس جهة الحركة**.\nوبالتالي تخضع الدراجة لقوة احتكاك كابحة $\\vec{f}$ موجهة عكس جهة الحركة.'
				}
			],
			watchOutAr:
				'احذر عند استخدام سلم المسافات وسلّم السرعات في التصوير المتعاقب: يجب دوماً تحويل المسافة المقاسة على الوثيقة إلى المسافة الحقيقية (بالمتر $\\text{m}$) قبل قسمتها على $2\\tau$ (بالثانية $\\text{s}$)، ثم استخدام سلم رسم السرعات لتمثيل طول الشعاع $\\vec{v}_i$ بالسنتمتر.'
		},
		practice: [
			{
				questionAr: 'في تسجيل متعاقب لحركة جسم بفاصل زمني $\\tau = 0.04\\,\\text{s}$، المسافة الحقيقية بين $M_2$ و$M_4$ هي $16\\,\\text{cm}$. ما قيمة السرعة اللحظية $v_3$؟',
				options: ['$0.5\\,\\text{m/s}$', '$2\\,\\text{m/s}$', '$4\\,\\text{m/s}$', '$200\\,\\text{m/s}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تحقّق من القسمة على $2\\tau$ وليس $8\\tau$.',
					'صحيح! $v_3 = \\frac{M_2 M_4}{2\\tau} = \\frac{0.16\\,\\text{m}}{2 \\times 0.04\\,\\text{s}} = \\frac{0.16}{0.08} = 2\\,\\text{m/s}$.',
					'خطأ: نسيت ضرب $\\tau$ في $2$ في المقام ($v_3 = M_2 M_4 / (2\\tau)$).',
					'خطأ: نسيت تحويل المسافة من $\\text{cm}$ إلى $\\text{m}$ ($16\\,\\text{cm} = 0.16\\,\\text{m}$).'
				],
				explanationAr: '$v_3 = \\frac{M_2 M_4}{2\\tau} = \\frac{0.16}{2 \\times 0.04} = 2\\,\\text{m/s}$.'
			},
			{
				questionAr: 'إذا تحرك جسم في خط مستقيم بحيث تتناقص مسافاته المقطوعة خلال فترات زمنية متساوية، فإن:',
				options: [
					'$\\Delta \\vec{v} = \\vec{0}$ ولا توجد قوة',
					'$\\Delta \\vec{v}$ في نفس جهة الحركة والقوة مساعدة',
					'$\\Delta \\vec{v}$ عكس جهة الحركة والقوة مقاومة',
					'شعاع السرعة $\\vec{v}$ عكس جهة الحركة'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: تناقص المسافات يعني تغيراً في السرعة إذن $\\Delta \\vec{v} \\neq \\vec{0}$.',
					'خطأ: هذا يوافق الحركة المستقيمة المتسارعة وليس المتباطئة.',
					'صحيح! السرعة تتناقص، لذا $\\Delta \\vec{v}$ والقوة $\\vec{F}$ في عكس جهة الحركة.',
					'خطأ: شعاع السرعة $\\vec{v}$ يكون دوماً في جهة الحركة، أما $\\Delta \\vec{v}$ فهو الذي يعكس جهته عند التباطؤ.'
				],
				explanationAr: 'في الحركة المستقيمة المتباطئة تتناقص السرعة، لذا يكون شعاع تغير السرعة $\\Delta \\vec{v}$ وشعاع القوة $\\vec{F}$ عكس جهة الحركة.'
			},
			{
				questionAr: 'ينص مبدأ العطالة على أنه إذا كانت محصلة القوى المؤثرة على جسم معدومة ($\\sum \\vec{F} = \\vec{0}$)، فإن الجسم:',
				options: [
					'يتوقف حتماً عن الحركة بعد مدة',
					'يتحرك حركة دائرية منتظمة',
					'يبقى ساكناً أو يتحرك حركة مستقيمة منتظمة',
					'تتزايد سرعته بانتظام'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الجسم لا يتوقف إلا إذا أثرت فيه قوة احتكاك تعاكس حركته.',
					'خطأ: الحركة الدائرية المنتظمة تتطلب قوة جاذبة مركزية مستمرة.',
					'صحيح! هذا هو نص مبدأ العطالة في مرجع غاليلي.',
					'خطأ: تزايد السرعة يستدعي وجود قوة في جهة الحركة.'
				],
				explanationAr: 'حسب مبدأ العطالة: $\\sum \\vec{F} = \\vec{0} \\iff$ الجملة ساكنة أو في حركة مستقيمة منتظمة.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 5: Curvilinear Motion, Uniform Circular, Projectile & Satellites
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t1_curvilinear_motion_satellites',
		slug: 'phy-1as-tcst-t1-curvilinear-motion-satellites',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدات 2 و 3 و 4: القوة والحركات المستقيمة والمنحنية والمرجع',
		order: 5,
		titleAr: 'القوة والحركات المنحنية (الحركة الدائرية المنتظمة والقذيفة والأقمار)',
		objectives: [
			'تمثيل أشعة السرعة وشعاع تغير السرعة Δv في حركة منحنية وحركة دائرية منتظمة',
			'استنتاج اتجاه القوة الجاذبة المركزية في الحركة الدائرية المنتظمة وتفسير حركة القذيفة والأقمار الاصطناعية',
			'تحليل حركة قذيفة أفقية أو مائلة وتحديد خصائص القوة الثابتة المؤثرة عليها (الثقل)'
		],
		keywordsAr: ['الحركة المنحنية', 'الحركة الدائرية المنتظمة', 'حركة قذيفة', 'الأقمار الاصطناعية', 'القوة المركزية'],
		discover: {
			scenarioAr:
				'يُدوّر تلميذ كرة مربوطة بخيط في مستوٍ أفقي بحركة دائرية منتظمة، وفي نفس الوقت يقذف صديقه كرة أخرى أفقياً بسرعة ابتدائية $\\vec{v}_0$ من حافة طاولة.',
			svg: svgCircularMotionDeltaV(),
			steps: [
				{
					promptAr: 'في الحركة الدائرية المنتظمة، قيمة السرعة ثابتة ($v_1 = v_3$). هل يكون شعاع تغير السرعة $\\Delta \\vec{v}_2 = \\vec{v}_3 - \\vec{v}_1$ معدوماً؟',
					hintAr: 'تذكّر أن السرعة مقدار شعاعي؛ تغيّر الحامل (الاتجاه) كافٍ ليكون $\\Delta \\vec{v} \\neq \\vec{0}$.',
					expectedInput: 'لا',
					revealAr: '**لا**! رغم ثبات القيمة ($v_1 = v_3$)، فإن حامل شعاع السرعة يتغير باستمرار (مماسي للدائرة)، لذلك $\\Delta \\vec{v}_2 \\neq \\vec{0}$.'
				},
				{
					promptAr: 'بالإنشاء الهندسي للشعاع $\\Delta \\vec{v}_2 = \\vec{v}_3 + (-\\vec{v}_1)$، إلى أين يتجه شعاع تغير السرعة والقوة المطبقة؟',
					hintAr: 'ارسم متوازي الأضلاع في الموضع $M_2$: يتجه دوماً نحو داخل التقوس، أي نحو...',
					expectedInput: 'المركز',
					revealAr: 'يتجه شعاع تغير السرعة $\\Delta \\vec{v}$ والقوة المطبقة $\\vec{F}$ دوماً **نحو مركز الدائرة O** (قوة جاذبة مركزية).'
				},
				{
					promptAr: 'إذا انقطع الخيط فجأة عند مرور الكرة بالموضع $M_2$ (انعدام القوة المركزية)، كيف تكون حركتها بعد ذلك أفقياً؟',
					hintAr: 'طبّق مبدأ العطالة عند لحظة انعدام القوة الأفقية.',
					expectedInput: 'مستقيمة',
					revealAr: 'تنطلق الكرة وفق المماس للدائرة عند $M_2$ بحركة **مستقيمة منتظمة** أفقياً (في غياب قوى أفقية) تطبيقاً لمبدأ العطالة.'
				},
				{
					promptAr: 'في حركة القذيفة بإهمال مقاومة الهواء، ما هي القوة الوحيدة المؤثرة عليها، وما هي خصائص شعاع تغير السرعة $\\Delta \\vec{v}$ طوال المسار المنحني؟',
					hintAr: 'القوة المؤثرة هي ثقل القذيفة $\\vec{P}$ وهو شاقولي نحو الأسفل وثابت.',
					expectedInput: 'شاقولي نحو الأسفل',
					revealAr: 'القوة الوحيدة هي **الثقل $\\vec{P}$**، ويكون $\\Delta \\vec{v}$ ثابتاً في الشدة والمنحى، و**شاقولياً متجهاً نحو الأسفل** طوال المسار المكافئ (في حين تبقى المركبة الأفقية للسرعة $v_x$ ثابتة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الحركة الدائرية المنتظمة**: مسار دائري وقيمة السرعة ثابتة ($v = \\text{cte}$)، لكن **شعاع السرعة** $\\vec{v}$ متغير الحامل (مماس للمسار في كل لحظة).',
				'**القوة الجاذبة المركزية**: في الحركة الدائرية المنتظمة، شعاع تغير السرعة $\\Delta \\vec{v}$ غير معدوم ومتجه دوماً **نحو مركز المسار** وعمودي على $\\vec{v}$. ومنه تخضع الجملة لقوة ثابتة القيمة ومركزية الاتجاه $\\vec{F}$ تُسمى **القوة الجاذبة المركزية** (مثل توتر الخيط، أو قوة جذب الأرض للقمر الاصطناعي).',
				'**حركة القذيفة** (بإهمال احتكاك الهواء): تخضع القذيفة لقوة وحيدة ثابتة هي **ثقلها $\\vec{P}$** الموجه شاقولياً نحو الأسفل:\n- **على المحور الأفقي $(Ox)$**: لا توجد قوة ($F_x = 0$) ← $v_x = v_0 \\cos \\alpha = \\text{cte}$ ← حركة أفقية **مستقيمة منتظمة**.\n- **على المحور الشاقولي $(Oy)$**: قوة ثابتة $\\vec{P}$ نحو الأسفل ← $v_y$ تتناقص صعوداً وتنعدم عند **الذروة S** ثم تتزايد نزولاً ← $\\Delta \\vec{v}$ شاقولي نحو الأسفل وثابت.',
				'**تفسير حركة الأقمار الاصطناعية**: يدور القمر الاصطناعي حول الأرض بفضل قوة التجاذب الكوني الجاذبة المركزية، وكأنّه في "سقوط حر دائم" حول انحناء الأرض فلا يسقط عليها لأن سرعته المماسية الكافية تحافظ على مداره الدائري.'
			],
			visualSvg: svgProjectileTrajectory({ angleLabel: 'α', v0Label: 'v₀', showApex: true }),
			visualCaptionAr: 'المسار المكافئ لقذيفة مائلة مع توضيح الذروة $S$ (حيث $v_y = 0$ و$\\vec{v} = \\vec{v}_x$) والمدى $P$',
			examples: [
				{
					problemAr: 'تُقذف كرة أفقياً من ارتفاع معين بسرعة ابتدائية $v_0 = 6\\,\\text{m/s}$. ما هي قيمة سرعتها الأفقية $v_x$ وسرعتها الشاقولية $v_y$ لحظة القذف؟ وكيف تتطور $v_x$ أثناء السقوط؟',
					solutionAr:
						'لحظة القذف الأفقي ($\\alpha = 0^\\circ$): $v_{0x} = 6\\,\\text{m/s}$ و$v_{0y} = 0\\,\\text{m/s}$.\nأثناء السقوط، وبإهمال مقاومة الهواء، لا توجد أي قوة أفقية ($\\sum F_x = 0$). حسب مبدأ العطالة، تبقى المركبة الأفقية للسرعة **ثابتة**: $v_x = 6\\,\\text{m/s}$ طوال الحركة، بينما تتزايد $v_y$ نحو الأسفل تحت تأثير الثقل $\\vec{P}$.'
				},
				{
					problemAr: 'في حركة قذيفة مائلة، بلغت الذروة $S$ حيث كانت سرعتها $v_S = 8\\,\\text{m/s}$. ما اتجاه $\\vec{v}_S$ وما اتجاه $\\Delta \\vec{v}$ عند الذروة؟',
					solutionAr:
						'عند الذروة $S$ تنعدم المركبة الشاقولية للسرعة ($v_y = 0$)، لذا يكون شعاع السرعة $\\vec{v}_S$ **أفقياً تماماً** ومماساً للذروة وقيمته $v_S = v_x = 8\\,\\text{m/s}$.\nأما شعاع تغير السرعة $\\Delta \\vec{v}$ عند الذروة فلا ينعدم بل يكون **شاقولياً نحو الأسفل** في نفس جهة الثقل $\\vec{P}$.'
				}
			],
			watchOutAr:
				'خطأ شائع جداً: الاعتقاد بأن السرعة تنعدم كلياً عند الذروة $S$ في قذيفة مائلة! الصواب أن المركبة الشاقولية $v_y$ فقط هي التي تنعدم، أما المركبة الأفقية $v_x$ فتبقى ثابتة ($\\vec{v}_S \\neq \\vec{0}$)، و$\\Delta \\vec{v}$ عند الذروة لا ينعدم أيضاً بل يبقى شاقولياً نحو الأسفل.'
		},
		practice: [
			{
				questionAr: 'في الحركة الدائرية المنتظمة، ما هي الزاوية بين شعاع السرعة $\\vec{v}$ وشعاع تغير السرعة $\\Delta \\vec{v}$؟',
				options: ['$0^\\circ$ (متوازيان وفي نفس الجهة)', '$180^\\circ$ (متعاكسان)', '$90^\\circ$ (متعامدان)', 'تتغير الزاوية باستمرار'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لو كانا في نفس الجهة لتزايدت قيمة السرعة.',
					'خطأ: لو كانا متعاكسين لتناقصت قيمة السرعة.',
					'صحيح! $\\vec{v}$ مماسي للدائرة و$\\Delta \\vec{v}$ مركزي (قطري نحو المركز)، والمماس عمودي على نصف القطر.',
					'خطأ: في الحركة الدائرية المنتظمة تبقى الزاوية قائمة دوماً.'
				],
				explanationAr: 'بما أن قيمة السرعة ثابتة في الحركة الدائرية المنتظمة، فإن $\\Delta \\vec{v}$ (و$\\vec{F}$) عمودي دوماً على $\\vec{v}$ ومتجه نحو المركز.'
			},
			{
				questionAr: 'تُقذف كرة بزاوية $\\alpha = 45^\\circ$ بسرعة ابتدائية $v_0$. عند بلوغها الذروة $S$:',
				options: [
					'تنعدم سرعتها $\\vec{v}_S = \\vec{0}$ وتنعدم القوة المؤثرة',
					'تكون سرعتها أفقية ($v_y = 0$) وتؤثر عليها قوة الثقل نحو الأسفل',
					'يكون شعاع تغير السرعة $\\Delta \\vec{v} = \\vec{0}$',
					'تتجه سرعتها شاقولياً نحو الأعلى'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المركبة الأفقية $v_x$ لا تنعدم، والثقل $\\vec{P}$ يؤثر باستمرار.',
					'صحيح! عند الذروة $v_y = 0$ فتكون السرعة أفقية ($v_S = v_x$) بينما يبقى الثقل و$\\Delta \\vec{v}$ شاقوليين نحو الأسفل.',
					'خطأ: ما دام الثقل موجوداً، فإن $\\Delta \\vec{v} \\neq \\vec{0}$.',
					'خطأ: تكون متجهة أفقياً تماماً عند الذروة.'
				],
				explanationAr: 'عند الذروة يبلغ المسار أعلى نقطة له فتكون السرعة الشاقولية معدومة والسرعة الكلية أفقية ومساوية لـ $v_x$، وتحت تأثير الثقل المستمر يكون $\\Delta \\vec{v}$ نحو الأسفل.'
			},
			{
				questionAr: 'ما هي القوة التي تحفظ القمر في مداره شبه الدائري حول الأرض؟',
				options: [
					'مبدأ العطالة وحده دون وجود أي قوة',
					'قوة دفع المحركات الدائمة للقمر',
					'قوة التجاذب الكوني الجاذبة المركزية من الأرض نحو القمر',
					'قوة الاحتكاك مع الهواء'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: دون قوة، يتحرك القمر في خط مستقيم ويغادر مداره.',
					'خطأ: القمر الطبيعي لا يملك محركات، والأقمار الاصطناعية تدور دون تشغيل دائم للمحركات.',
					'صحيح! تجذب الأرض القمر بقوة مركزية تغير اتجاه شعاع سرعته باستمرار ليدور في مدار دائري.',
					'خطأ: الفضاء خالٍ تقريباً من الهواء.'
				],
				explanationAr: 'يدور القمر حول الأرض بفضل قوة الجاذبية الأرضية الجاذبة المركزية المتجهة نحو مركز الأرض.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 6: Motion, Force and Reference Frame
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcst_t1_motion_force_reference',
		slug: 'phy-1as-tcst-t1-motion-force-reference',
		grade: '1as_tcst',
		yearSubjectId: 655,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدات 2 و 3 و 4: القوة والحركات المستقيمة والمنحنية والمرجع',
		order: 6,
		titleAr: 'الحركة والقوة والمرجع (نسبية الحركة والمرجع الغاليلي)',
		objectives: [
			'إبراز نسبية المسار والسرعة باختلاف المرجع المختار',
			'التمييز بين المرجع العطالي (الغاليلي) والمرجع غير العطالي وإدراك أثر الشروط الابتدائية على شكل المسار'
		],
		keywordsAr: ['نسبية الحركة', 'المرجع الغاليلي', 'الشروط الابتدائية', 'المسار'],
		discover: {
			scenarioAr:
				'يجلس راكب داخل قطار يسير بسرعة ثابتة على سكة مستقيمة، ويترك كرة صغيرة تسقط من يده دون سرعة ابتدائية بالنسبة له. في نفس اللحظة يراقب تلميذ واقف على رصيف المحطة سقوط نفس الكرة.',
			svg: svgReferenceFrameDiagram(),
			steps: [
				{
					promptAr: 'ما هو شكل مسار الكرة بالنسبة للراكب داخل القطار؟ وما هو شكل مسارها بالنسبة للمراقب على الأرض؟',
					hintAr: 'بالنسبة للقطار، تتحرك الكرة عمودياً فقط؛ أما بالنسبة للأرض فتتحرك للأمام وللأسفل معاً.',
					expectedInput: 'منحني',
					revealAr: 'بالنسبة للراكب (مرجع القطار) مسار الكرة **مستقيم شاقولي**. أما بالنسبة للمراقب على الرصيف (المرجع الأرضي) فمسار الكرة **منحني (قطع مكافئ)**!'
				},
				{
					promptAr: 'لماذا اختلف شكل المسار في المرجعين رغم أن الكرة واحدة والقوة المؤثرة عليها (الثقل) واحدة؟',
					hintAr: 'تذكّر سرعة الكرة لحظة تركها ($t=0$) بالنسبة لكل مرجع.',
					expectedInput: 'الشروط الابتدائية',
					revealAr: 'لاختلاف **الشروط الابتدائية** (السرعة الابتدائية): في مرجع القطار $v_0 = 0$، بينما في المرجع الأرضي تملك الكرة سرعة ابتدائية أفقية تساوي سرعة القطار ($\\vec{v}_0 = \\vec{v}_{\\text{train}}$) فتتحرك كقذيفة أفقية!'
				},
				{
					promptAr: 'إذا فرمل القطار فجأة (تباطأ)، يندفع الركاب نحو الأمام وكأن قوة تدفعهم رغم عدم وجود جسم يدفعهم. هل مرجع القطار المتباطئ مرجع غاليلي؟',
					hintAr: 'هل يتحقق مبدأ العطالة في مرجع متسارع أو متباطئ؟',
					expectedInput: 'لا',
					revealAr: '**لا**! المرجع الذي يتحقق فيه مبدأ العطالة يُسمى **مرجعاً غاليلياً (عطالياً)**، ومرجع القطار أثناء الفرملة أو التسارع غير غاليلي لأن مبدأ العطالة يختل فيه.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**نسبية الحركة**: السكون والحركة، شكل المسار، وقيمة السرعة مفاهيم **نسبية** تتعلق بالجسم المرجعي المختار لدراسة الحركة.',
				'**المرجع الغاليلي (العطالي)**: هو كل مرجع يتحقق فيه **مبدأ العطالة**. عملياً في التجارب المخبرية القصيرة نعتبر **المرجع السطحي الأرضي** غاليلياً (ونستخدم المركزي الأرضي لدراسة الأقمار الاصطناعية، والهيليومركزي لدراسة الكواكب).',
				'**تأثير المراجع المتحركة**: كل مرجع يتحرك بحركة مستقيمة منتظمة بالنسبة لمرجع غاليلي هو أيضاً **مرجع غاليلي**، بينما المرجع المتسارع أو المتباطئ أو الدوار **ليس غاليلياً**.',
				'**أثر الشروط الابتدائية**: تخضع نفس القوة الثابتة (مثل الثقل $\\vec{P}$) لنفس القوانين، لكن شكل المسار يتوقف على اتجاه السرعة الابتدائية $\\vec{v}_0$: إذا كانت $\\vec{v}_0 = \\vec{0}$ أو موازية لـ $\\vec{P}$ فالمسار **مستقيم**؛ وإذا لم تكن موازية لـ $\\vec{P}$ فالمسار **منحني (مكافئ)**.'
			],
			visualSvg: svgReferenceFrameDiagram(),
			visualCaptionAr: 'مقارنة مسار سقوط كرة من قطار متحرك: مستقيم في مرجع القطار ومنحني في المرجع السطحي الأرضي',
			examples: [
				{
					problemAr: "يسير قطار بسرعة $v = 72\\,\\text{km/h}$ نحو الشرق، ويمشي داخل ممرّه مسافر بسرعة $v' = 1.5\\,\\text{m/s}$ نحو الشرق أيضاً. ما سرعة المسافر بالنسبة للقطار ثم بالنسبة للأرض؟",
					solutionAr:
						'سرعة القطار: $v = \\frac{72}{3.6} = 20\\,\\text{m/s}$.\nبالنسبة للقطار: $v_{\\text{المسافر/القطار}} = 1.5\\,\\text{m/s}$.\nبالنسبة للأرض (نفس الجهة): $v_{\\text{المسافر/الأرض}} = 20 + 1.5 = 21.5\\,\\text{m/s}$.'
				},
				{
					problemAr: 'لماذا نستخدم المرجع الهيليومركزي (المركزي الشمسي) لدراسة حركة كوكب المريخ بدلاً من المرجع السطحي الأرضي؟',
					solutionAr:
						'لأن مدة دراسة حركة الكواكب طويلة جداً مقارنة بدوران الأرض حول محورها وحول الشمس، فلا يمكن اعتبار السطحي الأرضي غاليلياً خلال أشهر أو سنوات، بينما يكون المرجع الهيليومركزي غاليلياً بدقة عالية وتبدو فيه مدارات الكواكب إهليلجية (قريبة من الدائرية) بسيطة.'
				}
			],
			watchOutAr:
				'قيمة القوة $\\vec{P}$ وشعاع تغير السرعة $\\Delta \\vec{v}$ لا يتغيران عند الانتقال من مرجع غاليلي إلى مرجع غاليلي آخر يتحرك بالنسبة للأول بسرعة ثابتة؛ الذي يتغير هو شكل المسار وشعاع السرعة الابتدائية $\\vec{v}_0$.'
		},
		practice: [
			{
				questionAr: 'في أي مرجع يكون مسار نقطة من محيط عجلة دراجة تسير على طريق مستقيم عبارة عن دائرة؟',
				options: [
					'المرجع السطحي الأرضي (مراقب على الرصيف)',
					'مرجع محور العجلة (الراكب على الدراجة)',
					'لا يكون دائرياً في أي مرجع',
					'في كل المراجع دون استثناء'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بالنسبة للأرض ترسم النقطة مساراً منحنياً معقداً (دويري/سيكلوئيد).',
					'صحيح! بالنسبة للراكب أو محور العجلة، تبقى النقطة على مسافة ثابتة $R$ من المحور فترسم دائرة.',
					'خطأ: في مرجع المحور المسار دائري تماماً.',
					'خطأ: المسار نسبي ويختلف باختلاف المرجع.'
				],
				explanationAr: 'المسار نسبي: نقطة من إطار العجلة تبعد مسافة ثابتة عن المحور، لذا فمسارها بالنسبة لمرجع الدراجة هو دائرة، وبالنسبة للطريق هو منحنى دويري.'
			},
			{
				questionAr: 'ما هو المرجع الأنسب (الغاليلي) لدراسة حركة الأقمار الاصطناعية حول الأرض؟',
				options: [
					'المرجع السطحي الأرضي',
					'المرجع المركزي الأرضي (الجيومركزي)',
					'مرجع القمر نفسه',
					'المرجع الهيليومركزي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السطحي الأرضي يدور مع دوران الأرض اليومي ولا يصلح لحساب المدارات.',
					'صحيح! المرجع الجيومركزي مبدؤه مركز الأرض ومحاوره متجهة نحو ثلاث نجوم بعيدة ثابتة.',
					'خطأ: مرجع القمر يدور حول الأرض وليس عطالياً.',
					'خطأ: الهيليومركزي مناسب لحركة الكواكب حول الشمس وليس للأقمار حول الأرض.'
				],
				explanationAr: 'نختار المرجع المركزي الأرضي (الجيومركزي) لدراسة حركة القمر والأقمار الاصطناعية حول الأرض.'
			},
			{
				questionAr: 'أي من المراجع التالية **لا** يمكن اعتباره مرجعاً غاليلياً؟',
				options: [
					'قطار يتحرك على سكة مستقيمة بسرعة ثابتة $100\\,\\text{km/h}$',
					'حافلة تنعطف وتزيد سرعتها في نفس الوقت',
					'مخبر فيزياء على سطح الأرض لدراسة سقوط كرة خلال $0.5\\,\\text{s}$',
					'مصعد يصعد بسرعة ثابتة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حركة مستقيمة منتظمة بالنسبة لمرجع غاليلي تحافظ على الصفة الغاليلية.',
					'أحسنت! الحافلة المتسارعة والمنعطفة مرجع غير عطالي يختل فيه مبدأ العطالة.',
					'خطأ: خلال مدة قصيرة يُعتبر المرجع السطحي الأرضي غاليلياً.',
					'خطأ: الصعود بسرعة ثابتة في خط مستقيم يحافظ على الصفة الغاليلية.'
				],
				explanationAr: 'كل مرجع في حركة غير مستقيمة أو غير منتظمة (متسارع أو متباطئ أو دوار) ليس مرجعاً غاليلياً.'
			}
		]
	}
];
