import type { PhysicsInteractiveLessonData } from '../../types';
import { chemSpecies } from '../../chem-helpers';
import { wrapPhysicsSvg } from '../../svg-physics';

// ===========================================================================
// Bespoke FreeMono-Free SVG Builders for 1AS TCL Physics T3 (Energy)
// ===========================================================================

function subT(base: string, s: string): string {
	return `${base}<tspan dy="3" font-size="72%">${s}</tspan>`;
}

function svgEnergyFormsVsTransfers(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">أشكال تخزين الطاقة وأنماط التحويل الطاقوي</text>`;

	// Left box: Storage Forms
	body += `<rect x="20" y="42" width="204" height="148" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.4"/>`;
	body += `<text x="122" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">أشكال تخزين الطاقة (تحت الفقاعة)</text>`;
	body += `<text x="122" y="88" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${subT('E', 'c')}<tspan dy="-3"> : حركية (جسم متحرك / رياح)</tspan></text>`;
	body += `<text x="122" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${subT('E', 'pp')}<tspan dy="-3"> : كامنة ثقالية (ماء السد)</tspan></text>`;
	body += `<text x="122" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${subT('E', 'pe')}<tspan dy="-3"> : كامنة مرونية (نابض مشدود)</tspan></text>`;
	body += `<text x="122" y="166" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${subT('E', 'i')}<tspan dy="-3"> : داخلية (بطارية / وقود / شمس)</tspan></text>`;

	// Right box: Transfer Modes
	body += `<rect x="236" y="42" width="204" height="148" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>`;
	body += `<text x="338" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">أنماط التحويل (فوق السهم)</text>`;
	body += `<text x="338" y="88" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">W : تحويل ميكانيكي (قوة وحركة)</text>`;
	body += `<text x="338" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${subT('W', 'e')}<tspan dy="-3"> : تحويل كهربائي (تيار كهربائي)</tspan></text>`;
	body += `<text x="338" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">Q : تحويل حراري (تسخين / ضياع)</text>`;
	body += `<text x="338" y="166" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${subT('E', 'r')}<tspan dy="-3"> : تحويل إشعاعي (ضوء / أشعة)</tspan></text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgDailyEnergyConverters(): string {
	let body = `<defs>
		<marker id="dcArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
		<marker id="dcQ" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
			<path d="M0,0 L5,2.5 L0,5 Z" fill="#dc2626"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">أمثلة عن المحولات الطاقوية في حياتنا اليومية</text>`;

	const cards = [
		{ x: 18, title: 'المصباح الكهربائي', inLbl: 'We', outLbl: 'Er (مفيد)', bg: '#fefce8', stroke: '#eab308', fillTitle: '#854d0e' },
		{ x: 162, title: 'المحرك الكهربائي', inLbl: 'We', outLbl: 'W (مفيد)', bg: '#eff6ff', stroke: '#3b82f6', fillTitle: '#1e3a8a' },
		{ x: 306, title: 'اللوح الشمسي', inLbl: 'Er', outLbl: 'We (مفيد)', bg: '#ecfdf5', stroke: '#16a34a', fillTitle: '#065f46' }
	];
	for (const c of cards) {
		body += `<rect x="${c.x}" y="44" width="136" height="146" rx="8" fill="${c.bg}" stroke="${c.stroke}" stroke-width="1.3"/>`;
		body += `<text x="${c.x + 68}" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c.fillTitle}">${c.title}</text>`;
		body += `<line x1="${c.x + 12}" y1="106" x2="${c.x + 36}" y2="106" stroke="#2563eb" stroke-width="1.8" marker-end="url(#dcArr)"/>`;
		body += `<text x="${c.x + 22}" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">${c.inLbl}</text>`;
		body += `<rect x="${c.x + 40}" y="86" width="56" height="38" rx="6" fill="#ffffff" stroke="#334155" stroke-width="1.4"/>`;
		body += `<text x="${c.x + 68}" y="110" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">محول</text>`;
		body += `<line x1="${c.x + 98}" y1="106" x2="${c.x + 126}" y2="106" stroke="#16a34a" stroke-width="1.8" marker-end="url(#dcArr)"/>`;
		body += `<text x="${c.x + 108}" y="80" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">${c.outLbl}</text>`;
		body += `<line x1="${c.x + 68}" y1="126" x2="${c.x + 68}" y2="162" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2" marker-end="url(#dcQ)"/>`;
		body += `<text x="${c.x + 68}" y="178" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Q (ضياع حراري)</text>`;
	}
	return wrapPhysicsSvg(460, 210, body);
}

function svgHydroelectricDamChain(): string {
	let body = `<defs>
		<marker id="hdArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
		<marker id="hdQ" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
			<path d="M0,0 L5,2.5 L0,5 Z" fill="#dc2626"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="202" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">السلسلة الوظيفية والطاقوية لإنتاج الكهرباء من السد (الدينامو)</text>`;

	const nodes = [
		{ cx: 52, name: 'ماء السد', func: 'يسقط', energy: 'Epp + Ec' },
		{ cx: 141, name: 'العنفة', func: 'تدور', energy: 'Ec' },
		{ cx: 230, name: 'الدينامو', func: 'يدور', energy: 'Ec' },
		{ cx: 319, name: 'المصباح', func: 'يتوهج', energy: 'Ei' },
		{ cx: 408, name: 'الغرفة', func: 'تضاء', energy: 'Ei' }
	];
	const arrows = [
		{ func: 'يدير', energy: 'W' },
		{ func: 'يدير', energy: 'W' },
		{ func: 'يغذي', energy: 'We' },
		{ func: 'يضيء', energy: 'Er' }
	];

	for (let i = 0; i < nodes.length; i++) {
		const n = nodes[i];
		body += `<ellipse cx="${n.cx}" cy="90" rx="33" ry="20" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>`;
		body += `<text x="${n.cx}" y="94" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">${n.name}</text>`;
		body += `<text x="${n.cx}" y="128" text-anchor="middle" font-size="10.5" fill="#475569">${n.func}</text>`;
		body += `<text x="${n.cx}" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">${n.energy}</text>`;

		if (i > 0 && i < nodes.length - 1) {
			body += `<line x1="${n.cx}" y1="154" x2="${n.cx}" y2="182" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3,2" marker-end="url(#hdQ)"/>`;
			body += `<text x="${n.cx + 12}" y="178" font-size="10" font-weight="bold" fill="#dc2626">Q</text>`;
		}

		if (i < nodes.length - 1) {
			const x1 = n.cx + 35;
			const x2 = nodes[i + 1].cx - 36;
			const mx = (x1 + x2) / 2;
			body += `<line x1="${x1}" y1="90" x2="${x2}" y2="90" stroke="#2563eb" stroke-width="1.8" marker-end="url(#hdArr)"/>`;
			body += `<text x="${mx}" y="62" text-anchor="middle" font-size="10" fill="#475569">${arrows[i].func}</text>`;
			body += `<text x="${mx}" y="79" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">${arrows[i].energy}</text>`;
		}
	}
	body += `<text x="230" y="198" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">الأسهم المتقطعة الحمراء (Q) تمثل التحويل الحراري الضائع نحو المحيط</text>`;
	return wrapPhysicsSvg(460, 218, body);
}

function svgEnergyConservationBalance(): string {
	let body = `<defs>
		<marker id="ecArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#0f172a"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">مبدأ انحفاظ الطاقة (الطاقة لا تفنى بل تتحول)</text>`;

	// Left: Steady converter (Lamp)
	body += `<rect x="20" y="42" width="204" height="146" rx="8" fill="#ffffff" stroke="#eab308" stroke-width="1.3"/>`;
	body += `<text x="122" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#854d0e">مصباح (نظام دائم)</text>`;
	body += `<ellipse cx="122" cy="108" rx="34" ry="24" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>`;
	body += `<text x="122" y="112" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">المصباح</text>`;
	body += `<line x1="28" y1="108" x2="84" y2="108" stroke="#2563eb" stroke-width="2" marker-end="url(#ecArr)"/>`;
	body += `<text x="55" y="98" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">100 J (We)</text>`;
	body += `<line x1="158" y1="98" x2="212" y2="98" stroke="#16a34a" stroke-width="2" marker-end="url(#ecArr)"/>`;
	body += `<text x="188" y="88" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Er = 25 J</text>`;
	body += `<line x1="158" y1="118" x2="212" y2="118" stroke="#dc2626" stroke-width="1.7" stroke-dasharray="3,2" marker-end="url(#ecArr)"/>`;
	body += `<text x="188" y="135" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Q = 75 J</text>`;
	body += `<text x="122" y="172" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">100 J = 25 J + 75 J (محفوظة)</text>`;

	// Right: General equation card
	body += `<rect x="236" y="42" width="204" height="146" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.3"/>`;
	body += `<text x="338" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">العلاقة العامة لانحفاظ الطاقة</text>`;
	body += `<rect x="248" y="78" width="180" height="44" rx="6" fill="#ffffff" stroke="#93c5fd" stroke-width="1.2"/>`;
	body += `<text x="338" y="97" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">E(نهائية) = E(ابتدائية)</text>`;
	body += `<text x="338" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">+ E(مكتسبة) - E(مقدمة)</text>`;
	body += `<text x="338" y="146" text-anchor="middle" font-size="10.5" fill="#334155">إذا لم يتغير مخزون الجملة:</text>`;
	body += `<text x="338" y="168" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">E(مكتسبة) = E(مفيدة) + Q(ضائعة)</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgPowerUnitsTriangle(): string {
	let body = `<defs>
		<marker id="puArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#0f172a"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الاستطاعة الطاقوية (P = E / t) وتحويل وحدات الطاقة</text>`;

	// Triangle on left
	body += `<polygon points="94,48 34,152 154,152" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>`;
	body += `<line x1="64" y1="100" x2="124" y2="100" stroke="#1d4ed8" stroke-width="1.5"/>`;
	body += `<line x1="94" y1="100" x2="94" y2="152" stroke="#1d4ed8" stroke-width="1.5"/>`;
	body += `<text x="94" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">E</text>`;
	body += `<text x="72" y="135" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">P</text>`;
	body += `<text x="116" y="135" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">t</text>`;
	body += `<text x="94" y="176" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">E = P × t</text>`;

	// Conversion blocks on right
	body += `<rect x="176" y="54" width="66" height="44" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>`;
	body += `<text x="209" y="80" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#166534">kWh</text>`;
	body += `<line x1="244" y1="76" x2="274" y2="76" stroke="#0f172a" stroke-width="1.6" marker-end="url(#puArr)"/>`;
	body += `<text x="259" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">×1000</text>`;

	body += `<rect x="278" y="54" width="66" height="44" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>`;
	body += `<text x="311" y="80" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#92400e">Wh</text>`;
	body += `<line x1="346" y1="76" x2="376" y2="76" stroke="#0f172a" stroke-width="1.6" marker-end="url(#puArr)"/>`;
	body += `<text x="361" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">×3600</text>`;

	body += `<rect x="380" y="54" width="58" height="44" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>`;
	body += `<text x="409" y="80" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#b91c1c">J</text>`;

	// Rules box below
	body += `<rect x="176" y="114" width="262" height="72" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="307" y="136" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">الجملة الدولية: P (W) × t (s) = E (J)</text>`;
	body += `<text x="307" y="156" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">الفاتورة المنزلية: P (kW) × t (h) = E (kWh)</text>`;
	body += `<text x="307" y="176" text-anchor="middle" font-size="10.5" fill="#dc2626">1 kWh = 3 600 000 J  |  1 kW = 1000 W</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgDomesticPowerAndMeter(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">مقارنة استطاعة الأجهزة المنزلية وقراءة العداد الكهربائي</text>`;

	// Bar chart of appliance powers
	const bars = [
		{ label: 'مصباح LED', w: 12, p: '10 W', col: '#16a34a' },
		{ label: 'تلفاز', w: 28, p: '100 W', col: '#2563eb' },
		{ label: 'ثلاجة', w: 38, p: '150 W', col: '#0284c7' },
		{ label: 'مكواة', w: 112, p: '1500 W', col: '#f59e0b' },
		{ label: 'سخان ماء', w: 145, p: '2000 W', col: '#dc2626' }
	];
	bars.forEach((b, idx) => {
		const y = 48 + idx * 28;
		body += `<text x="72" y="${y + 14}" text-anchor="end" font-size="10.5" font-weight="bold" fill="#334155">${b.label}</text>`;
		body += `<rect x="80" y="${y + 2}" width="${b.w}" height="16" rx="3" fill="${b.col}"/>`;
		body += `<text x="${86 + b.w}" y="${y + 14}" font-size="10" font-weight="bold" fill="#0f172a">${b.p}</text>`;
	});

	// Meter card on right
	body += `<rect x="282" y="44" width="156" height="142" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.4"/>`;
	body += `<text x="360" y="65" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#854d0e">فاتورة سونلغاز</text>`;
	body += `<text x="360" y="90" text-anchor="middle" font-size="10.5" fill="#0f172a">القديم: 12400 kWh</text>`;
	body += `<text x="360" y="112" text-anchor="middle" font-size="10.5" fill="#0f172a">الجديد: 12850 kWh</text>`;
	body += `<line x1="296" y1="124" x2="424" y2="124" stroke="#eab308" stroke-width="1.2"/>`;
	body += `<text x="360" y="146" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">الاستهلاك = 450 kWh</text>`;
	body += `<text x="360" y="168" text-anchor="middle" font-size="10" fill="#475569">التكلفة = الطاقة × التسعيرة</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgEfficiencyComparisonChart(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">المردود الطاقوي: مقارنة المصباح المتوهج بمصباح LED</text>`;

	// Incandescent bar (10% useful, 90% heat) width = 320
	body += `<text x="230" y="54" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">مصباح متوهج قديم (يمتص 100 J)</text>`;
	body += `<rect x="70" y="62" width="32" height="28" fill="#16a34a"/>`;
	body += `<rect x="102" y="62" width="288" height="28" fill="#ef4444"/>`;
	body += `<text x="86" y="80" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">10%</text>`;
	body += `<text x="246" y="80" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">90% حرارة ضائعة Q (مردود ضعيف)</text>`;

	// LED bar (85% useful, 15% heat)
	body += `<text x="230" y="114" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">مصباح اقتصادي LED (يمتص 100 J)</text>`;
	body += `<rect x="70" y="122" width="272" height="28" fill="#16a34a"/>`;
	body += `<rect x="342" y="122" width="48" height="28" fill="#ef4444"/>`;
	body += `<text x="206" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">85% إضاءة مفيدة Er (مردود مرتفع)</text>`;
	body += `<text x="366" y="140" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">15%</text>`;

	// Formula footer
	body += `<rect x="52" y="160" width="356" height="30" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>`;
	body += `<text x="230" y="180" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">المردود (%) = ( الطاقة المفيدة / الطاقة المستهلكة ) × 100  (دوما أصغر من 100%)</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgRenewableEnergiesAlgeria(): string {
	let body = `<defs>
		<marker id="reArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#059669"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#166534">الطاقات المتجددة النظيفة في الجزائر وترشيد الاستهلاك</text>`;

	// Solar Card
	body += `<rect x="20" y="44" width="202" height="106" rx="8" fill="#ffffff" stroke="#eab308" stroke-width="1.3"/>`;
	body += `<circle cx="54" cy="76" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="1.4"/>`;
	body += `<line x1="72" y1="80" x2="108" y2="92" stroke="#059669" stroke-width="1.8" marker-end="url(#reArr)"/>`;
	body += `<polygon points="116,108 144,74 198,74 170,108" fill="#1d4ed8" stroke="#0f172a" stroke-width="1.4"/>`;
	body += `<text x="121" y="128" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">الطاقة الشمسية (ألواح ضوئية)</text>`;
	body += `<text x="121" y="143" text-anchor="middle" font-size="9.5" fill="#475569">مثالية بالصحراء والهضاب العليا</text>`;

	// Wind Card
	body += `<rect x="238" y="44" width="202" height="106" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="1.3"/>`;
	body += `<line x1="306" y1="74" x2="306" y2="112" stroke="#475569" stroke-width="3"/>`;
	body += `<line x1="306" y1="74" x2="286" y2="56" stroke="#1d4ed8" stroke-width="2.4"/>`;
	body += `<line x1="306" y1="74" x2="328" y2="58" stroke="#1d4ed8" stroke-width="2.4"/>`;
	body += `<line x1="306" y1="74" x2="306" y2="98" stroke="#1d4ed8" stroke-width="2.4"/>`;
	body += `<text x="366" y="84" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0369a1">حقل أدرار</text>`;
	body += `<text x="366" y="100" text-anchor="middle" font-size="10" fill="#475569">عنفة ريحية</text>`;
	body += `<text x="339" y="128" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">طاقة الرياح (تحول Ec إلى We)</text>`;
	body += `<text x="339" y="143" text-anchor="middle" font-size="9.5" fill="#475569">نظيفة، متجددة، دون انبعاث CO2</text>`;

	// Conservation footer
	body += `<rect x="20" y="160" width="420" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.2"/>`;
	body += `<text x="230" y="180" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#14532d">الترشيد المنزلي: مصابيح LED + إطفاء وضع الاستعداد + العزل الحراري + استغلال ضوء النهار</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

const spCO2 = chemSpecies('CO2').katex;

// ===========================================================================
// Exported Trimester 3 Interactive Lessons for 1AS TCL Physics
// ===========================================================================

export const PHYSICS_LESSONS_1AS_TCL_T3: PhysicsInteractiveLessonData[] = [
	// -------------------------------------------------------------------------
	// Lesson 1: Forms of Energy & Modes of Energy Transfer
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t3_energy_forms_transfers',
		slug: 'phy-1as-tcl-t3-energy-forms-transfers',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال 3: الإنسان والطاقة',
		order: 1,
		titleAr: 'أشكال الطاقة وأنماط التحويل الطاقوي (الميكانيكي، الكهربائي، الحراري، الإشعاعي)',
		objectives: [
			'تحديد أشكال تخزين الطاقة الأربعة: الحركية ($E_c$)، الكامنة الثقالية ($E_{pp}$)، الكامنة المرونية ($E_{pe}$)، والداخلية ($E_i$)',
			'التمييز بين أنماط التحويل الطاقوي الأربعة: الميكانيكي ($W$)، الكهربائي ($W_e$)، الحراري ($Q$)، والإشعاعي ($E_r$)',
			'تصنيف المحولات الطاقوية اليومية حسب نمط الطاقة المكتسبة ونمط الطاقة المفيدة المقدمة'
		],
		keywordsAr: [
			'أشكال الطاقة',
			'أنماط التحويل',
			'طاقة حركية',
			'طاقة كامنة',
			'طاقة داخلية',
			'تحويل ميكانيكي',
			'تحويل كهربائي',
			'تحويل حراري وإشعاعي'
		],
		discover: {
			scenarioAr:
				'في الصباح، يضيء كريم غرفته بمصباح كهربائي، ثم يسخن الماء في مدفأة كهربائية ويستعمل سيارته اللعبة المزودة بنابض يُشَدُّ بالمفتاح، كما يلاحظ لوحاً شمسياً فوق سطح المدرسة يغذي الإنارة.',
			svg: svgEnergyFormsVsTransfers(),
			steps: [
				{
					promptAr:
						'ما شكل الطاقة المخزنة في كل من: (أ) السيارة اللعبة وهي تسير، (ب) النابض المشدود داخلها، (ج) البطارية الكيميائية؟',
					hintAr: 'الحركة توافق $E_c$، والمرونة $E_{pe}$، والكيميائية/المجهرية $E_i$.',
					expectedInput: 'Ec و Epe و Ei',
					revealAr:
						'السيارة المتحركة تخزن **طاقة حركية ($E_c$)**، والنابض المشدود يخزن **طاقة كامنة مرونية ($E_{pe}$)**، والبطارية تخزن **طاقة داخلية ($E_i$)**.'
				},
				{
					promptAr:
						'عندما يشتغل المصباح الكهربائي يكتسب طاقة عبر تيار كهربائي ثم ينير الغرفة ويسخن. ما نمط التحويل المكتسب وما نمطا التحويل المقدمين؟',
					hintAr: 'الكهربائي رمزه $W_e$، والضوء $E_r$، والحرارة $Q$.',
					expectedInput: 'يكتسب We ويقدم Er و Q',
					revealAr:
						'يكتسب المصباح **تحويلاً كهربائياً ($W_e$)**، ويحوّله إلى **تحويل بالإشعاع ($E_r$)** مفيد للإضاءة و**تحويل حراري ($Q$)** غير مفيد في المحيط.'
				},
				{
					promptAr: 'ما نمط التحويل الذي تستقبله الألواح الشمسية من الشمس؟',
					hintAr: 'تصل طاقة الشمس عبر الفضاء دون تلامس مادي أو أسلاك كهربائية.',
					expectedInput: 'تحويل إشعاعي Er',
					revealAr:
						'تستقبل الألواح الشمسية **تحويلاً بالإشعاع ($E_r$)** من الشمس وتحوّله إلى تحويل كهربائي ($W_e$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**أشكال تخزين الطاقة (في الجملة)**:\n- **الطاقة الحركية ($E_c$)**: يمتلكها كل جسم في حالة حركة (ماء متدفق، رياح، سيارة، عنفة تدور).\n- **الطاقة الكامنة الثقالية ($E_{pp}$)**: تخزنها جملة `(جسم + أرض)` عندما يكون الجسم على ارتفاع عن سطح الأرض (ماء خلف سد، حجر مرفوع).\n- **الطاقة الكامنة المرونية ($E_{pe}$)**: تخزنها الأجسام المرنة المشوهة (نابض مضغوط أو ممدد، وتر قوس مشدود).\n- **الطاقة الداخلية ($E_i$)**: ترتبط ببنية المادة المجهرية (طاقة كيميائية في البطاريات والوقود والغذاء، وطاقة حرارية في الأجسام الساخنة).',
				'**أنماط التحويل الطاقوي (بين الجمل)**:\n- **التحويل الميكانيكي ($W$)**: يتم بواسطة قوة تُحدث حركة أو دوراناً (مثل سقوط الماء الذي يدير العنفة).\n- **التحويل الكهربائي ($W_e$)**: يتم بمرور تيار كهربائي يغذي جهازاً (مثل البطارية التي تغذي المحرك).\n- **التحويل الحراري ($Q$)**: انتقال الحرارة من جسم ساخن نحو جسم بارد (التدفئة، الطبخ، والضياع الحراري).\n- **التحويل الإشعاعي ($E_r$)**: انتقال الطاقة بواسطة الضوء والأشعة الكهرومغناطيسية (الشمس، المصباح).',
				'**وحدة الطاقة**: تُقاس الطاقة في الجملة الدولية ($\\text{SI}$) بوحدة **الجول ($\\text{J}$)** (وغالباً بالكيلوجول $1\\,\\text{kJ} = 1000\\,\\text{J}$ أو بالكيلوواط ساعي $\\text{kWh}$ في الكهرباء).'
			],
			visualSvg: svgDailyEnergyConverters(),
			visualCaptionAr: 'نماذج لمحولات طاقوية مألوفة: التحويل المفيد مقابل الضياع الحراري Q',
			examples: [
				{
					problemAr:
						'حدّد نمط التخزين ونمطي التحويل المفيد وغير المفيد لـ **مجفف الشعر الكهربائي** أثناء عمله.',
					solutionAr:
						'يستقبل المجفف **تحويلاً كهربائياً ($W_e$)** من المأخذ؛ به محرك يقدّم **تحويلاً ميكانيكياً ($W$)** لتدوير المروحة ودفع الهواء، ومقاومة تسخين تقدم **تحويلاً حرارياً ($Q$)** لتجفيف الشعر.'
				},
				{
					problemAr:
						'ما شكل الطاقة المخزنة في خزان مياه وُضع فوق سطح بناية، وماذا تتحول إليه هذه الطاقة إذا سقط الماء نحو الأسفل؟',
					solutionAr:
						'الماء في الأعلى يخزن **طاقة كامنة ثقالية ($E_{pp}$)** (مع الأرض)؛ وعند سقوطه تتحول تدريجياً إلى **طاقة حركية ($E_c$)**.'
				}
			],
			watchOutAr:
				'احذر الخلط بين **شكل تخزين الطاقة** (مخزون داخل الجسم مثل $E_c, E_{pp}, E_{pe}, E_i$) و**نمط التحويل الطاقوي** (طاقة تنتقل من جملة إلى أخرى مثل $W, W_e, Q, E_r$)! فالكهرباء $W_e$ مثلاً نمط تحويل وليست مخزونة داخل جسم.'
		},
		practice: [
			{
				questionAr: 'ما شكل الطاقة المخزنة في **ماء محجوز خلف سد مرتفع** وفي **سيارة تتحرك بسرعة ثابتة** على الترتيب؟',
				options: [
					'$E_c$ و $E_{pe}$',
					'$E_{pp}$ و $E_c$',
					'$E_i$ و $W$',
					'$W_e$ و $E_{pp}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'$E_{pe}$ خاصة بالأجسام المرنة كالنابض، والماء الساكن المرتفع يخزن طاقة كامنة ثقالية.',
					'ممتاز! الماء المرتفع يخزن طاقة كامنة ثقالية ($E_{pp}$)، والسيارة المتحركة تخزن طاقة حركية ($E_c$).',
					'$W$ نمط تحويل ميكانيكي وليس شكل تخزين.',
					'$W_e$ نمط تحويل كهربائي وليس شكل تخزين.'
				],
				explanationAr:
					'الارتفاع عن سطح الأرض يرتبط بالطاقة الكامنة الثقالية ($E_{pp}$)، والحركة ترتبط بالطاقة الحركية ($E_c$).'
			},
			{
				questionAr: 'في **اللوح الشمسي الكهروضوئي** الذي يشغل مصباح حديقة، ما نمط التحويل الذي يتلقاه اللوح وما نمط التحويل الذي يقدمه للمصباح؟',
				options: [
					'يتلقى $W$ ويقدم $Q$',
					'يتلقى $E_r$ ويقدم $W_e$',
					'يتلقى $W_e$ ويقدم $E_r$',
					'يتلقى $Q$ ويقدم $W$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الشمس لا تدفع اللوح ميكانيكياً.',
					'صحيح! اللوح يتلقى إشعاعاً شمسياً ($E_r$) ويحوله إلى تيار كهربائي ($W_e$).',
					'عكست: هذا ينطبق على المصباح وليس اللوح الشمسي!',
					'اللوح الكهروضوئي يستغل الإشعاع الضوئي وليس التدفئة لإنتاج تيار كهربائي.'
				],
				explanationAr:
					'يستقبل اللوح الشمسي الطاقة بالإشعاع ($E_r$) ويحولها إلى طاقة كهربائية ($W_e$) تغذي المصباح.'
			},
			{
				questionAr: 'أثناء اشتغال أي جهاز كهربائي أو ميكانيكي، يُفقد جزء من الطاقة في المحيط الخارجي دون الاستفادة منه. على أي شكل يكون غالباً؟',
				options: [
					'طاقة كامنة مرونية ($E_{pe}$)',
					'تحويل حراري غير مفيد ($Q$)',
					'طاقة كامنة ثقالية ($E_{pp}$)',
					'تحويل كهربائي ($W_e$)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المرونية تخص النابض والمطاط.',
					'أحسنت! يضيع جزء من الطاقة دوماً على شكل حرارة ($Q$) نتيجة الاحتكاك أو مقاومة الأسلاك.',
					'الثقالية تخص الارتفاع عن الأرض.',
					'الضياع لا يتحول تلقائياً إلى كهرباء في المحيط.'
				],
				explanationAr:
					'بسبب الاحتكاك وتسخن الأجهزة، يتحول جزء من الطاقة إلى تحويل حراري غير مفيد ($Q$) يضيع في الوسط المحيط.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 2: Functional Chain, Energy Chain & Principle of Conservation
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t3_functional_energy_chain_conservation',
		slug: 'phy-1as-tcl-t3-functional-energy-chain-conservation',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال 3: الإنسان والطاقة',
		order: 2,
		titleAr: 'السلسلة الوظيفية والسلسلة الطاقوية ومبدأ انحفاظ الطاقة',
		objectives: [
			'بناء السلسلة الوظيفية لتركيبة تكنولوجية (أفعال الحالة تحت الفقاعات وأفعال الأداء فوق الأسهم)',
			'تحويل السلسلة الوظيفية إلى سلسلة طاقوية باستعمال رموز أشكال التخزين وأنماط التحويل مع إبراز الضياع الحراري Q',
			'تطبيق مبدأ انحفاظ الطاقة لفظياً ورياضياً على الجمل والمحولات الطاقوية'
		],
		keywordsAr: [
			'السلسلة الوظيفية',
			'السلسلة الطاقوية',
			'فعل الحالة',
			'فعل الأداء',
			'مبدأ انحفاظ الطاقة',
			'الدينامو والسد'
		],
		discover: {
			scenarioAr:
				'في مخبر العلوم الفيزيائية، حقق التلاميذ تركيبة إشعال مصباح بسقوط ماء من خزان مرتفع (نموذج سد مائي) يُدير عنفة موصولة بمنوبة (دينامو) تغذي المصباح، فكتبوا السلسلة الوظيفية ثم حولوها إلى سلسلة طاقوية.',
			svg: svgHydroelectricDamChain(),
			steps: [
				{
					promptAr:
						'في السلسلة الوظيفية: نكتب «فعل الحالة» تحت الفقاعة و«فعل الأداء» فوق السهم. ما فعل الحالة المناسب للماء الساقط، وما فعل الأداء بين العنفة والدينامو؟',
					hintAr: 'الماء «يسقط»؛ والعنفة «تدير» الدينامو.',
					expectedInput: 'يسقط و يدير',
					revealAr:
						'تحت فقاعة الماء نكتب **يسقط**، وفوق السهم بين العنفة والدينامو نكتب **يدير**، وتحت الدينامو **يدور**، وفوق السهم إلى المصباح **يغذي**.'
				},
				{
					promptAr:
						'في السلسلة الطاقوية، نستبدل «يتفرغ/يغذي» في البطارية والمحرك برموز علمية. ما الرمز تحت البطارية وما الرمز فوق السهم نحو المصباح؟',
					hintAr: 'البطارية تخزن طاقة داخلية، والتيار تحويل كهربائي.',
					expectedInput: 'Ei و We',
					revealAr:
						'تحت البطارية نكتب **$E_i$** وفوق السهم إلى المصباح نكتب **$W_e$**.'
				},
				{
					promptAr:
						'تلقى المصباح طاقة كهربائية قدرها $100\\,\\text{J}$ فأعطى $25\\,\\text{J}$ إضاءة ($E_r$). أين ذهبت الـ $75\\,\\text{J}$ الباقية حسب مبدأ انحفاظ الطاقة؟',
					hintAr: 'تلمس المصباح فتجده ساخناً!',
					expectedInput: 'تحولت إلى حرارة Q ضائعة',
					revealAr:
						'الطاقة لا تفنى؛ فقد تحوّلت الـ $75\\,\\text{J}$ الباقية إلى **تحويل حراري غير مفيد ($Q = 75\\,\\text{J}$)** ضاع في هواء الغرفة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**السلسلة الوظيفية**: مخطط يصف وظيفة كل عنصر في تركيبة ما عبر **فقاعات** (تحتها **فعل الحالة** مثل: يتفرغ، يسقط، يدور، يتوهج) و**أسهم** (فوقها **فعل الأداء** مثل: يغذي، يدير، يسخن، يضيء).',
				'**السلسلة الطاقوية**: نستبدل أفعال الحالة في السلسلة الوظيفية برموز **أشكال تخزين الطاقة** ($E_c, E_{pp}, E_{pe}, E_i$)، ونستبدل أفعال الأداء برموز **أنماط التحويل** ($W, W_e, Q, E_r$)، مع إضافة **سهم متقطع نحو المحيط يحمل الرمز $Q$** لتمثيل الضياع الحراري.',
				'**مثال مرجعي (من السد إلى المصباح)**:\n`الماء + الأرض` ($E_{pp}+E_c$) $\\xrightarrow{W}$ `العنفة` ($E_c$) $\\xrightarrow{W}$ `الدينامو` ($E_c$) $\\xrightarrow{W_e}$ `المصباح` ($E_i$) $\\xrightarrow{E_r + Q}$ `الغرفة/المحيط`.',
				'**مبدأ انحفاظ الطاقة**: «الطاقة لا تُستحدث ولا تزول؛ إذا اكتسبت جملة طاقة أو فقدتها، فإنها بالضرورة قد أخذتها من جملة أخرى أو قدّمتها لها».\n$$E_{\\text{نهائية}} = E_{\\text{ابتدائية}} + E_{\\text{مكتسبة}} - E_{\\text{مقدمة}}$$\nوبالنسبة لجهاز في نظام دائم (لا يتغير مخزونه كالمصباح أو المحرك): $E_{\\text{المكتسبة}} = E_{\\text{المفيدة}} + Q_{\\text{الضائعة}}$.'
			],
			visualSvg: svgEnergyConservationBalance(),
			visualCaptionAr: 'تحقق مبدأ انحفاظ الطاقة: مجموع الطاقات الخارجة يساوي الطاقة الداخلة',
			examples: [
				{
					problemAr:
						'يتلقى محرك كهربائي طاقة كهربائية قدرها $E_{\\text{مكتسبة}} = 500\\,\\text{J}$، ويضيع منه حرارياً بسبب الاحتكاك $Q = 120\\,\\text{J}$. احسب الطاقة الميكانيكية المفيدة $W$ التي يقدمها.',
					solutionAr:
						'بتطبيق مبدأ انحفاظ الطاقة على المحرك (مخزونه ثابت):\n$$E_{\\text{مكتسبة}} = W + Q \\implies W = 500 - 120 = 380\\,\\text{J}$$'
				},
				{
					problemAr:
						'حوّل السلسلة الوظيفية لتشغيل مروحة ببطارية (`البطارية ← المحرك ← المروحة`) إلى سلسلة طاقوية.',
					solutionAr:
						'**البطارية** ($E_i$) $\\xrightarrow{W_e}$ **المحرك** ($E_c$) $\\xrightarrow{W}$ **المروحة** ($E_c$) $\\xrightarrow{W}$ **الهواء** ($E_c$)، مع أسهم متقطعة للتحويل الحراري $Q$ نحو المحيط.'
				}
			],
			watchOutAr:
				'لا تكتب أبداً أفعال الحالة (مثل «يدور» أو «يتوهج») في **السلسلة الطاقوية** ولا تكتب الرموز ($E_c, W_e$) في **السلسلة الوظيفية**! كذلك تذكر أن ضياع الطاقة $Q$ في المحيط لا يعني اختفاءها من الكون بل تحوّلها إلى شكل غير مستغَل.'
		},
		practice: [
			{
				questionAr:
					'في السلسلة الطاقوية لمنوبة دراجة (دينامو) تشتعل بها مصباح: `العجلة ← الدينامو ← المصباح`. ما نمطا التحويل فوق السهمين على الترتيب؟',
				options: ['$W_e$ ثم $W$', '$W$ ثم $W_e$', '$Q$ ثم $E_r$', '$E_c$ ثم $E_i$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست الترتيب: العجلة تدير الدينامو ميكانيكياً أولاً ثم يولد الدينامو تياراً كهربائياً.',
					'ممتاز! العجلة تدير الدينامو بتحويل ميكانيكي ($W$)، والدينامو يغذي المصباح بتحويل كهربائي ($W_e$).',
					'$Q$ و $E_r$ هما التحويلان الخارجان من المصباح نحو المحيط.',
					'$E_c$ و $E_i$ أنماط تخزين تُكتب تحت الفقاعات لا فوق الأسهم.'
				],
				explanationAr:
					'تدير العجلة محور الدينامو بتحويل ميكانيكي ($W$)، فيُنتج تياراً كهربائياً ($W_e$) يغذي المصباح.'
			},
			{
				questionAr:
					'تتلقى مدفأة كهربائية طاقة كهربائية قدرها $1000\\,\\text{J}$ وتعمل بانتظام. إذا قدمت طاقة مفيدة حرارية $Q = 950\\,\\text{J}$ وإضاءة خافتة، فكم تبلغ الطاقة الكلية المقدمة للمحيط؟',
				options: ['$50\\,\\text{J}$', '$950\\,\\text{J}$', '$1000\\,\\text{J}$', '$1950\\,\\text{J}$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'$50\\,\\text{J}$ هي قيمة الإشعاع الخافت فقط ($1000 - 950$).',
					'$950\\,\\text{J}$ هي الحرارة وحدها، والسؤال يطلب الطاقة الكلية المقدمة للمحيط.',
					'صحيح! حسب مبدأ انحفاظ الطاقة، في النظام الدائم تساوي الطاقة المقدمة للمحيط كامل الطاقة المكتسبة ($1000\\,\\text{J}$).',
					'لا نجمع الطاقة الداخلة مع الخارجة!'
				],
				explanationAr:
					'ينص مبدأ انحفاظ الطاقة على أن الطاقة المحوّلة الكلية تبقى محفوظة ($E_{\\text{مكتسبة}} = E_{\\text{مقدمة}} = 1000\\,\\text{J}$).'
			},
			{
				questionAr: 'في **السلسلة الوظيفية** لتوليد الكهرباء بسد مائي، ماذا نكتب فوق السهم بين «الماء» و«العنفة»؟',
				options: ['يسقط', 'يدير', '$W$', '$E_{pp}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'«يسقط» فعل حالة يُكتب تحت فقاعة الماء وليس فوق السهم.',
					'أحسنت! فعل الأداء الذي يقوم به الماء الساقط على العنفة هو «يدير».',
					'$W$ يُستعمل في السلسلة الطاقوية وليس في السلسلة الوظيفية.',
					'$E_{pp}$ نمط تخزين طاقوي يُكتب تحت الفقاعة.'
				],
				explanationAr:
					'فوق السهم في السلسلة الوظيفية نكتب فعل الأداء باللغة العربية (الماء **يدير** العنفة).'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 3: Power P = E / t, Units (W, kW, J, kWh) & Electricity Bill
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t3_power_units_electricity_bill',
		slug: 'phy-1as-tcl-t3-power-units-electricity-bill',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال 3: الإنسان والطاقة',
		order: 3,
		titleAr: 'الاستطاعة الطاقوية P = E / t والوحدات وحساب الفاتورة الكهربائية للمنزل',
		objectives: [
			'تعريف استطاعة التحويل الطاقوي وتطبيق العلاقة P = E / t لحساب الاستطاعة أو الطاقة أو الزمن',
			'التحويل السليم بين وحدات الاستطاعة (W, kW) ووحدات الطاقة الدولية والعملية (J, Wh, kWh)',
			'قراءة مؤشر العداد الكهربائي وحساب تكلفة فاتورة الكهرباء المنزلية بالدينار الجزائري (DA)'
		],
		keywordsAr: [
			'الاستطاعة الطاقوية',
			'الواط',
			'الجول',
			'الكيلوواط ساعي',
			'فاتورة الكهرباء',
			'العداد الكهربائي'
		],
		discover: {
			scenarioAr:
				'تحمل مكواة منزلية الدلالة `$2000\\,\\text{W}$`، بينما يحمل مصباح LED الدلالة `$10\\,\\text{W}$`. شغّلت العائلة المكواة لمدة $1.5\\,\\text{h}$، وقرأت في فاتورة سونلغاز أن مؤشر العداد ارتفع من $12400\\,\\text{kWh}$ إلى $12850\\,\\text{kWh}$.',
			svg: svgPowerUnitsTriangle(),
			steps: [
				{
					promptAr:
						'ماذا تعني الدلالة `$2000\\,\\text{W}$` المكتوبة على المكواة من حيث استهلاك الطاقة في كل ثانية؟',
					hintAr: 'الواط الواحد يساوي جول واحد في الثانية ($1\\,\\text{W} = 1\\,\\text{J/s}$).',
					expectedInput: 'تحول 2000 جول في الثانية',
					revealAr:
						'تعني أن **استطاعة التحويل الطاقوي** للمكواة هي $P = 2000\\,\\text{W}$، أي أنها تحول $2000\\,\\text{J}$ من الطاقة الكهربائية في كل ثانية.'
				},
				{
					promptAr:
						'احسب الطاقة الكهربائية المستهلكة من طرف المكواة ($P = 2000\\,\\text{W} = 2\\,\\text{kW}$) خلال $1.5\\,\\text{h}$ بالكيلوواط ساعي ($\\text{kWh}$).',
					hintAr: 'طبّق العلاقة $E = P \\times t$ مع $P$ بالكيلوواط و$t$ بالساعة.',
					expectedInput: '3',
					revealAr: '$E = 2\\,\\text{kW} \\times 1.5\\,\\text{h} = 3\\,\\text{kWh}$ (أي $3000\\,\\text{Wh}$).'
				},
				{
					promptAr:
						'انطلاقاً من قراءتي العداد ($12400$ و $12850$), ما هي الطاقة الكلية المستهلكة في المنزل خلال الثلاثي بوحدة $\\text{kWh}$؟',
					hintAr: 'اطرح القراءة القديمة من القراءة الجديدة.',
					expectedInput: '450',
					revealAr:
						'$E_{\\text{فاتورة}} = 12850 - 12400 = 450\\,\\text{kWh}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الاستطاعة الطاقوية ($P$)**: مقدار فيزيائي يعبر عن سرعة تحويل الطاقة (الطاقة المحولة خلال وحدة الزمن):\n$$P = \\frac{E}{t} \\iff E = P \\times t \\iff t = \\frac{E}{P}$$',
				'**تجانس الوحدات والتحويلات**:\n- **في الجملة الدولية ($\\text{SI}$)**: $P$ بـ **الواط ($\\text{W}$)**، و$t$ بـ **الثانية ($\\text{s}$)** $\\implies E$ بـ **الجول ($\\text{J}$)**.\n- **في الاستعمال المنزلي (الفواتير)**: $P$ بـ **الكيلوواط ($\\text{kW}$)**، و$t$ بـ **الساعة ($\\text{h}$)** $\\implies E$ بـ **الكيلوواط ساعي ($\\text{kWh}$)**.\n- **التحويلات الأساسية**:\n$$1\\,\\text{kW} = 1000\\,\\text{W}, \\quad 1\\,\\text{Wh} = 3600\\,\\text{J}, \\quad 1\\,\\text{kWh} = 1000\\,\\text{Wh} = 3.6 \\times 10^6\\,\\text{J}$$',
				'**حساب الفاتورة الكهربائية المنزلية**:\n1) الطاقة المستهلكة خلال الفترة = $\\text{المؤشر الجديد} - \\text{المؤشر القديم}$ (بـ $\\text{kWh}$).\n2) لحساب استهلاك المنزل من الأجهزة: نجمع طاقة كل جهاز $E_{\\text{جهاز}} = P(\\text{kW}) \\times t(\\text{h})$.\n3) **المبلغ المالي** = $\\text{الطاقة (kWh)} \\times \\text{سعر الكيلوواط ساعي (DA/kWh)}$ (وفي الفاتورة الحقيقية تُحسب الأشطر الاستهلاكية مع الرسوم الثابتة والضريبة).'
			],
			visualSvg: svgDomesticPowerAndMeter(),
			visualCaptionAr: 'مقارنة استطاعات الأجهزة المنزلية وحساب استهلاك العداد الكهربائي',
			examples: [
				{
					problemAr:
						'تشتغل مدفأة كهربائية استطاعتها $P = 1500\\,\\text{W}$ لمدة ساعتين ($2\\,\\text{h}$) يومياً طوال شهر ($30$ يوماً). احسب الطاقة المستهلكة خلال الشهر بوحدة $\\text{kWh}$ ثم بالجول ($\text{J}$)، واحسب تكلفتها إذا كان سعر $1\\,\\text{kWh}$ هو $4.2\\,\\text{DA}$.',
					solutionAr:
						'1) الزمن الشهري: $t = 2 \\times 30 = 60\\,\\text{h}$. والاستطاعة: $P = 1.5\\,\\text{kW}$.\n2) الطاقة بالكيلوواط ساعي: $E = 1.5 \\times 60 = 90\\,\\text{kWh}$.\n3) بالجول: $E = 90 \\times 3.6 \\times 10^6 = 3.24 \\times 10^8\\,\\text{J}$.\n4) التكلفة: $90 \\times 4.2 = 378\\,\\text{DA}$.'
				},
				{
					problemAr:
						'سجل العداد الكهربائي لمنزل الرقم القديم $8240\\,\\text{kWh}$ والرقم الجديد $8540\\,\\text{kWh}$. احسب الطاقة المستهلكة وتكلفتها إذا سُعّرت الأشطر كالتالي: أول $125\\,\\text{kWh}$ بسعر $1.8\\,\\text{DA/kWh}$، والباقي بسعر $4.2\\,\\text{DA/kWh}$.',
					solutionAr:
						'1) الاستهلاك: $E = 8540 - 8240 = 300\\,\\text{kWh}$.\n2) الشطر الأول: $125 \\times 1.8 = 225\\,\\text{DA}$.\n3) الشطر الثاني ($300 - 125 = 175\\,\\text{kWh}$): $175 \\times 4.2 = 735\\,\\text{DA}$.\n4) المجموع: $225 + 735 = 960\\,\\text{DA}$.'
				}
			],
			watchOutAr:
				'خطأ شائع: ضرب الاستطاعة بالواط ($\\text{W}$) في الزمن بالساعات ($\\text{h}$) وكتابة الوحدة $\\text{kWh}$! الناتج عند ضرب $\\text{W} \\times \\text{h}$ هو **الواط ساعي ($\\text{Wh}$)**، ويجب القسمة على $1000$ للحصول على $\\text{kWh}$.'
		},
		practice: [
			{
				questionAr:
					'يشتغل مجفف شعر استطاعته $P = 1200\\,\\text{W}$ لمدة $30\\,\\text{min}$ ($0.5\\,\\text{h}$). ما الطاقة الكهربائية التي يستهلكها بوحدة $\\text{kWh}$ وبوحدة $\\text{J}$؟',
				options: [
					'$0.6\\,\\text{kWh}$ و $2\\,160\\,000\\,\\text{J}$',
					'$600\\,\\text{kWh}$ و $36\\,000\\,\\text{J}$',
					'$0.6\\,\\text{kWh}$ و $600\\,\\text{J}$',
					'$2.4\\,\\text{kWh}$ و $8\\,640\\,000\\,\\text{J}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! $E = 1.2\\,\\text{kW} \\times 0.5\\,\\text{h} = 0.6\\,\\text{kWh} = 600\\,\\text{Wh} = 600 \\times 3600 = 2\\,160\\,000\\,\\text{J}$.',
					'$600$ هو بالواط ساعي ($\\text{Wh}$) وليس بالكيلوواط ساعي!',
					'تذكّر أن $1\\,\\text{Wh} = 3600\\,\\text{J}$.',
					'ضربت في $2$ بدلاً من $0.5$.'
				],
				explanationAr:
					'نحوّل $P = 1.2\\,\\text{kW}$ و$t = 0.5\\,\\text{h}$ فنجد $E = 0.6\\,\\text{kWh}$، وبالتحويل للجول نضرب في $3.6 \\times 10^6$ فنجد $2.16 \\times 10^6\\,\\text{J}$.'
			},
			{
				questionAr:
					'حاسوب مكتبي يستهلك طاقة قدرها $E = 750\\,\\text{Wh}$ عند تشغيله لمدة $t = 3\\,\\text{h}$. ما استطاعة تحويله الطاقوي $P$؟',
				options: ['$2250\\,\\text{W}$', '$250\\,\\text{W}$', '$250\\,\\text{kW}$', '$0.25\\,\\text{W}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ضربت الطاقة في الزمن! القانون هو $P = E / t$.',
					'ممتاز! $P = \\frac{750\\,\\text{Wh}}{3\\,\\text{h}} = 250\\,\\text{W}$.',
					'بما أن الطاقة بـ $\\text{Wh}$ والزمن بـ $\\text{h}$ فالاستطاعة بـ $\\text{W}$ لا $\\text{kW}$.',
					'$0.25$ تكون بوحدة $\\text{kW}$ وليس $\\text{W}$.'
				],
				explanationAr: 'من العلاقة $P = \\frac{E}{t}$ نحسب $\\frac{750\\,\\text{Wh}}{3\\,\\text{h}} = 250\\,\\text{W}$.'
			},
			{
				questionAr:
					'استهلكت أسرة في شهر واحد $150\\,\\text{kWh}$ من الكهرباء بسعر وسطي $4\\,\\text{DA/kWh}$. ما قيمة الاستهلاك المالي بالعملة الوطنية؟',
				options: ['$37.5\\,\\text{DA}$', '$600\\,\\text{DA}$', '$154\\,\\text{DA}$', '$6000\\,\\text{DA}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'قسمت بدلاً من الضرب في السعر!',
					'صحيح! التكلفة $= 150 \\times 4 = 600\\,\\text{DA}$.',
					'جمعت العددين بدلاً من الضرب.',
					'راجع الصفر الزائد: $150 \\times 4 = 600$.'
				],
				explanationAr: 'التكلفة تساوي كمية الطاقة المستهلكة مضروبة في ثمن الكيلوواط ساعي الواحد: $150 \\times 4 = 600\\,\\text{DA}$.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 4: Energy Efficiency, Renewable Energies & Home Conservation
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t3_efficiency_renewables_conservation',
		slug: 'phy-1as-tcl-t3-efficiency-renewables-conservation',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال 3: الإنسان والطاقة',
		order: 4,
		titleAr: 'المردود الطاقوي والطاقات المتجددة (الشمسية والريحية) وترشيد الاستهلاك المنزلي',
		objectives: [
			'تعريف وحساب المردود الطاقوي لمحوّل أو جهاز وتفسير سبب كونه دوماً أصغر من 100%',
			'التمييز بين الطاقات الأحفورية الملوّثة والطاقات المتجددة النظيفة (الشمسية، الريحية، المائية) وأهميتها في الجزائر',
			'اقتراح وتقييم حلول عملية لترشيد الاستهلاك المنزلي وتقليل البصمة الكربونية والفاتورة'
		],
		keywordsAr: [
			'المردود الطاقوي',
			'الطاقة المفيدة',
			'الطاقات المتجددة',
			'الطاقة الشمسية',
			'طاقة الرياح',
			'ترشيد الاستهلاك'
		],
		discover: {
			scenarioAr:
				'قارن تلاميذ الثانويّة بين مصباح قديم متوهج ($60\\,\\text{W}$) لا يحول سوى $6\\,\\text{W}$ إلى إضاءة، ومصباح LED حديث ($10\\,\\text{W}$) يحول $8.5\\,\\text{W}$ إلى إضاءة! ثم درسوا مشروع محطة شمسية وريحية في الجنوب الجزائري.',
			svg: svgEfficiencyComparisonChart(),
			steps: [
				{
					promptAr:
						'ما نسبة الطاقة الضائعة حرارياً في المصباح المتوهج القديم الذي يمتص $60\\,\\text{W}$ ويعطي $6\\,\\text{W}$ ضوءاً فقط؟',
					hintAr: 'النسبة المفيدة هي $\\frac{6}{60} = 10\\%$، فكم يتبقى للحرارة الضائعة؟',
					expectedInput: '90%',
					revealAr:
						'يضيع **$90\\%$** ($54\\,\\text{W}$) على شكل حرارة غير مفيدة، بينما لا تتعدى الطاقة الضوئية المفيدة $10\\%$ (مردود ضعيف جداً).'
				},
				{
					promptAr:
						'احسب المردود الطاقوي $\\eta$ لمصباح LED الذي يعطي $8.5\\,\\text{W}$ ضوءاً من أصل $10\\,\\text{W}$ يمتصها.',
					hintAr: '$\\eta = \\frac{P_{\\text{مفيدة}}}{P_{\\text{المستهلكة}}} \\times 100\\%$.',
					expectedInput: '85%',
					revealAr:
						'المردود الطاقوي لمصباح LED هو $\\eta = \\frac{8.5}{10} \\times 100\\% = 85\\%$، وهو أكثر فعالية بأضعاف من المصباح القديم!'
				},
				{
					promptAr:
						'لماذا يُعد استبدال المحطات العاملة بالوقود الأحفوري بمحطات شمسية وريحية مكسباً مزدوجاً للبيئة والاقتصاد؟',
					hintAr: 'فكّر في نفاد المصادر وفي انبعاثات غاز ${spCO2}$.',
					expectedInput: 'لا تنفد ولا تلوث البيئة',
					revealAr:
						'لأن الطاقات المتجددة (الشمس والرياح) **دائمة لا تنفد** و**نظيفة لا تلوث الجو** بانبعاثات ${spCO2}$ المسببة للاحتباس الحراري.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المردود الطاقوي ($\\eta$)**: هو النسبة بين الطاقة المفيدة التي يقدمها الجهاز والطاقة الكلية التي يستهلكها:\n$$\\eta = \\frac{E_{\\text{مفيدة}}}{E_{\\text{المستهلكة}}} = \\frac{P_{\\text{مفيدة}}}{P_{\\text{المستهلكة}}} \\qquad \\text{أو كنسبة مئوية:} \\qquad \\eta(\\%) = \\frac{E_{\\text{مفيدة}}}{E_{\\text{المستهلكة}}} \\times 100\\%$$\nبما أن جزءاً من الطاقة يضيع حتماً كحرارة ($Q > 0$)، فإن $E_{\\text{مفيدة}} < E_{\\text{المستهلكة}}$، وبالتالي يكون المردود **دوماً أصغر من $1$ (أو أصغر من $100\\%$)**.',
				`**الطاقات المتجددة مقابل غير المتجددة**:\n- **الطاقات غير المتجددة (الأحفورية)**: مثل البترول والغاز الطبيعي والفحم؛ احتياطاتها محدودة وتنتج غازات دفيئة (${spCO2}$) تلوث الجو.\n- **الطاقات المتجددة (النظيفة)**: مصادر طبيعية تتجدد باستمرار ولا تلوث البيئة، أبرزها:\n  1) **الطاقة الشمسية**: ألواح كهروضوئية (تنتج الكهرباء) وسخانات شمسية (تسخين الماء)، وتزخر الجزائر بقدرة هائلة خاصة في الصحراء والهضاب العليا (محطات أدرار، تمنراست، حاسي الرمل).\n  2) **طاقة الرياح**: عنفات ريحية تحوّل الطاقة الحركية للرياح إلى كهرباء (حقل كبرتن بأدرار).\n  3) **الطاقة المائية (السدود)** و**الطاقة الحرارية الأرضية** و**الكتلة الحيوية**.`,
				'**ترشيد الاستهلاك المنزلي (النجاعة الطاقوية)**:\n- استبدال المصابيح المتوهجة بمصابيح **LED** ذات المردود العالي.\n- فصل الأجهزة عن المأخذ كلياً بدل تركها في **وضع الاستعداد (Veille)**.\n- ضبط مكيف الهواء على $25^\\circ\\text{C}$ واستعمال العزل الحراري للنوافذ والجدران.\n- تشغيل الأجهزة ذات الاستطاعة الكبيرة (الغسالة، المكواة) خارج أوقات الذروة.'
			],
			visualSvg: svgRenewableEnergiesAlgeria(),
			visualCaptionAr: 'الطاقات المتجددة النظيفة في الجزائر وسلوكات ترشيد الطاقة في المنزل',
			examples: [
				{
					problemAr:
						'يتلقى لوح شمسي مساحةً معينة من الإشعاع الشمسي طاقة قدرها $E_{\\text{شمس}} = 2000\\,\\text{J}$ خلال ثانية، فينتج طاقة كهربائية مفيدة $E_e = 360\\,\\text{J}$. احسب مردود اللوح الشمسي $\\eta$ ثم استنتج الطاقة الضائعة $Q$.',
					solutionAr:
						'1) المردود الطاقوي: $\\eta = \\frac{360}{2000} \\times 100\\% = 18\\%$.\n2) الطاقة الضائعة (منعكسة أو حرارية): $Q = 2000 - 360 = 1640\\,\\text{J}$.'
				},
				{
					problemAr:
						'منزل يستعمل $8$ مصابيح قديمة ($60\\,\\text{W}$ لكل واحد) لمدة $5\\,\\text{h}$ يومياً. إذا استبدلها بـ $8$ مصابيح LED ($10\\,\\text{W}$)، فكم توفر العائلة من الطاقة في شهر ($30$ يوماً) بوحدة $\\text{kWh}$؟',
					solutionAr:
						'استهلاك المصابيح القديمة: $E_1 = \\frac{8 \\times 60 \\times 5 \\times 30}{1000} = 72\\,\\text{kWh}$.\nاستهلاك مصابيح LED: $E_2 = \\frac{8 \\times 10 \\times 5 \\times 30}{1000} = 12\\,\\text{kWh}$.\nالطاقة الموفّرة شهرياً: $\\Delta E = 72 - 12 = 60\\,\\text{kWh}$!'
				}
			],
			watchOutAr:
				'تذكّر دائماً أن **المردود الطاقوي $\\eta$ مستحيل أن يساوي أو يفوق $100\\%$**؛ فإذا وجدتَ في حساباتك $\\eta = 120\\%$ فاعلم فوراً أنك عكست البسط والمقام (وضعت الطاقة الكلية في البسط والمفيدة في المقام)!'
		},
		practice: [
			{
				questionAr:
					'يمتص محرك كهربائي طاقة كهربائية قدرها $800\\,\\text{J}$، ويقدّم شغلاً ميكانيكياً مفيداً قدره $600\\,\\text{J}$. ما قيمة المردود الطاقوي $\\eta$ لهذا المحرك؟',
				options: ['$25\\%$', '$75\\%$', '$133\\%$', '$200\\%$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$25\\%$ هي نسبة الطاقة الحرارية الضائعة ($200/800$) وليست المردود المفيد!',
					'أحسنت! $\\eta = \\frac{600}{800} \\times 100\\% = 75\\%$.',
					'مستحيل أن يفوق المردود $100\\%$! لقد عكست الكسر.',
					'$200$ هي الطاقة الضائعة بالجول وليس المردود.'
				],
				explanationAr:
					'المردود الطاقوي يساوي قسمة الطاقة المفيدة على الطاقة المستهلكة: $\\eta = \\frac{600}{800} \\times 100\\% = 75\\%$.'
			},
			{
				questionAr: 'أيّ من مصادر الطاقة التالية يُعدّ مصدراً **متجدداً ونظيفاً**؟',
				options: ['الغاز الطبيعي', 'الفحم الحجري', 'الإشعاع الشمسي والرياح', 'البترول الخام'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الغاز الطبيعي طاقة أحفورية غير متجددة.',
					'الفحم الحجري طاقة أحفورية شديدة التلويث.',
					'ممتاز! الشمس والرياح طاقتان متجددتان دائمتان وصديقتان للبيئة.',
					'البترول وقود أحفوري ينضب ويلوث الجو.'
				],
				explanationAr:
					'الشمس والرياح والمياه الجارية مصادر متجددة لا تنفد ولا تطلق غازات احتباس حراري أثناء توليد الكهرباء.'
			},
			{
				questionAr:
					'ما الفائدة المباشرة لاستبدال المصابيح المتوهجة التقليدية بمصابيح LED في المنازل والمدارس؟',
				options: [
					'زيادة الحرارة المنبعثة في الغرفة',
					'خفض المردود الطاقوي للمنزل',
					'تحقيق نفس الإضاءة باستهلاك طاقة كهربائية أقل بفضل مردودها المرتفع',
					'رفع قيمة الفاتورة الكهربائية'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مصابيح LED تسخن أقل بكثير من المصابيح المتوهجة.',
					'بل ترفع المردود الطاقوي لأنها تحول معظم الكهرباء إلى ضوء لا إلى حرارة.',
					'صحيح! مردود LED يقارب $85\\%$ مقارنة بنحو $10\\%$ للمصباح المتوهج، ما يوفر الطاقة والمال.',
					'بل تخفض قيمة الفاتورة بشكل ملحوظ.'
				],
				explanationAr:
					'تمتاز مصابيح LED بمردود طاقوي عالٍ يقلص الطاقة الضائعة حرارياً ويخفض استهلاك الكهرباء.'
			}
		]
	}
];
