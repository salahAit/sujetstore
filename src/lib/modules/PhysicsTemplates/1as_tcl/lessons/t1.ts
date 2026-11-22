import type { PhysicsInteractiveLessonData } from '../../types';
import { chemSpecies } from '../../chem-helpers';
import { wrapPhysicsSvg } from '../../svg-physics';

// ===========================================================================
// Bespoke FreeMono-Free SVG Builders for 1AS TCL Physics T1
// ===========================================================================

function chemSvg(parts: Array<{ text: string; sub?: string; sup?: string }>): string {
	return parts
		.map((p, idx) => {
			let out = p.text;
			if (p.sub) {
				out += `<tspan dy="3" font-size="72%">${p.sub}</tspan>`;
				if (idx < parts.length - 1 || p.sup) out += `<tspan dy="-3"></tspan>`;
			}
			if (p.sup) {
				out += `<tspan dy="-4" font-size="72%">${p.sup}</tspan>`;
				if (idx < parts.length - 1) out += `<tspan dy="4"></tspan>`;
			}
			return out;
		})
		.join('');
}

function svgWaterDetectionTest(): string {
	let body = `<defs>
		<marker id="wdArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
			<path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="29" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الكشف التجريبي عن وجود الماء بكبريتات النحاس اللامائية</text>`;

	// Left dish: anhydrous white copper sulfate
	body += `<rect x="24" y="46" width="175" height="140" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.3"/>`;
	body += `<text x="111" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#334155">1. قبل إضافة قطرة العينة</text>`;
	// Watch glass
	body += `<path d="M 55 122 Q 111 142 167 122 Z" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>`;
	// White powder mound
	body += `<path d="M 78 122 Q 111 98 144 122 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="111" y="156" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">كبريتات النحاس اللامائية</text>`;
	body += `<text x="111" y="174" text-anchor="middle" font-size="10.5" fill="#64748b">(مسحوق أبيض جاف)</text>`;

	// Arrow + dropper
	body += `<line x1="204" y1="112" x2="254" y2="112" stroke="#2563eb" stroke-width="2.2" marker-end="url(#wdArr)"/>`;
	body += `<text x="229" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">+ قطرة ماء</text>`;
	body += `<text x="229" y="132" text-anchor="middle" font-size="10" fill="#475569">أو عصير</text>`;

	// Right dish: hydrated blue copper sulfate
	body += `<rect x="262" y="46" width="175" height="140" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>`;
	body += `<text x="349" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">2. عند وجود الماء</text>`;
	body += `<path d="M 293 122 Q 349 142 405 122 Z" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/>`;
	body += `<path d="M 316 122 Q 349 98 382 122 Z" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.2"/>`;
	body += `<text x="349" y="156" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">تلون أزرق مميز</text>`;
	body += `<text x="349" y="174" text-anchor="middle" font-size="10.5" fill="#1e3a8a">دليل قاطع على وجود الماء</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgWaterCycleDiagram(): string {
	let body = `<defs>
		<marker id="wcArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#0284c7"/>
		</marker>
		<marker id="wcArrSun" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#d97706"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="204" rx="10" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0c4a6e">دورة الماء في الطبيعة (تحولات فيزيائية مستمرة)</text>`;

	// Sun
	body += `<circle cx="62" cy="64" r="18" fill="#facc15" stroke="#ca8a04" stroke-width="1.6"/>`;
	body += `<text x="62" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#854d0e">الشمس (طاقة)</text>`;

	// Cloud
	body += `<rect x="200" y="42" width="132" height="36" rx="18" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>`;
	body += `<text x="266" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e293b">تكاثف (سحب)</text>`;

	// Mountain & land
	body += `<polygon points="310,170 375,88 438,170" fill="#d6d3d1" stroke="#78716c" stroke-width="1.4"/>`;
	body += `<rect x="20" y="170" width="420" height="32" fill="#e7e5e4"/>`;
	// Sea
	body += `<rect x="20" y="152" width="215" height="50" fill="#38bdf8" fill-opacity="0.75" stroke="#0284c7" stroke-width="1.3"/>`;
	body += `<text x="128" y="182" text-anchor="middle" font-size="12" font-weight="bold" fill="#0c4a6e">البحار والمحيطات</text>`;

	// Evaporation arrows up
	body += `<line x1="115" y1="146" x2="115" y2="96" stroke="#d97706" stroke-width="2" marker-end="url(#wcArrSun)"/>`;
	body += `<line x1="145" y1="146" x2="178" y2="86" stroke="#d97706" stroke-width="2" marker-end="url(#wcArrSun)"/>`;
	body += `<text x="115" y="122" text-anchor="end" font-size="10.5" font-weight="bold" fill="#b45309">تبخر </text>`;
	body += `<text x="215" y="114" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">نتح النبات</text>`;

	// Precipitation arrows down
	body += `<line x1="300" y1="80" x2="335" y2="118" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,2" marker-end="url(#wcArr)"/>`;
	body += `<text x="352" y="102" font-size="10.5" font-weight="bold" fill="#0369a1">تساقط</text>`;

	// Runoff & infiltration arrows left
	body += `<line x1="316" y1="158" x2="245" y2="162" stroke="#0284c7" stroke-width="2" marker-end="url(#wcArr)"/>`;
	body += `<text x="278" y="150" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">جريان سطحي</text>`;
	body += `<line x1="330" y1="186" x2="245" y2="186" stroke="#0369a1" stroke-width="1.8" stroke-dasharray="4,3" marker-end="url(#wcArr)"/>`;
	body += `<text x="342" y="191" font-size="10" font-weight="bold" fill="#334155">مياه جوفية (تسرب)</text>`;

	return wrapPhysicsSvg(460, 220, body);
}

function svgSeparationMethodsGallery(): string {
	let body = `<defs>
		<marker id="spArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/>
		</marker>
	</defs>`;
	body += `<rect x="6" y="6" width="448" height="198" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">طرق فصل الخلائط المائية غير المتجانسة والمتجانسة</text>`;

	// Card 1: Decantation (الإبانة)
	body += `<rect x="16" y="38" width="136" height="154" rx="8" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>`;
	body += `<text x="84" y="56" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#92400e">1. الإبانة (سائلان)</text>`;
	body += `<polygon points="56,68 112,68 88,116 80,116" fill="#fef08a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<polygon points="69,92 99,92 88,116 80,116" fill="#60a5fa"/>`;
	body += `<rect x="82" y="116" width="4" height="22" fill="#334155"/>`;
	body += `<rect x="66" y="140" width="36" height="26" fill="#dbeafe" stroke="#334155" stroke-width="1.3"/>`;
	body += `<text x="122" y="84" font-size="9.5" font-weight="bold" fill="#b45309">زيت</text>`;
	body += `<text x="122" y="108" font-size="9.5" font-weight="bold" fill="#1d4ed8">ماء</text>`;
	body += `<text x="84" y="182" text-anchor="middle" font-size="10" fill="#475569">أنبوبة الإبانة</text>`;

	// Card 2: Filtration (الترشيح)
	body += `<rect x="162" y="38" width="136" height="154" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.3"/>`;
	body += `<text x="230" y="56" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">2. الترشيح (صلب+سائل)</text>`;
	body += `<polygon points="200,72 260,72 234,108 226,108" fill="#ffffff" stroke="#334155" stroke-width="1.4"/>`;
	body += `<polygon points="208,76 252,76 230,104" fill="#fde68a" stroke="#d97706" stroke-width="1"/>`;
	body += `<rect x="228" y="108" width="4" height="24" fill="#334155"/>`;
	body += `<rect x="206" y="136" width="48" height="30" fill="#e0f2fe" stroke="#334155" stroke-width="1.3"/>`;
	body += `<text x="230" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">رشاحة صافية</text>`;
	body += `<text x="230" y="182" text-anchor="middle" font-size="10" fill="#475569">يحجز العوالق الصلبة</text>`;

	// Card 3: Distillation (التقطير)
	body += `<rect x="308" y="38" width="136" height="154" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.3"/>`;
	body += `<text x="376" y="56" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#065f46">3. التقطير (متجانس)</text>`;
	body += `<circle cx="342" cy="126" r="18" fill="#dbeafe" stroke="#334155" stroke-width="1.4"/>`;
	body += `<rect x="338" y="88" width="8" height="22" fill="#f8fafc" stroke="#334155" stroke-width="1.3"/>`;
	body += `<path d="M 332 148 Q 342 156 352 148" fill="none" stroke="#dc2626" stroke-width="2.2"/>`;
	body += `<line x1="346" y1="90" x2="398" y2="112" stroke="#334155" stroke-width="2.2"/>`;
	body += `<rect x="358" y="90" width="32" height="18" rx="4" transform="rotate(23 374 99)" fill="#bae6fd" fill-opacity="0.6" stroke="#0284c7" stroke-width="1.2"/>`;
	body += `<rect x="396" y="128" width="30" height="34" fill="#e0f2fe" stroke="#334155" stroke-width="1.3"/>`;
	body += `<text x="411" y="150" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#0369a1">ماء مقطر</text>`;
	body += `<text x="376" y="182" text-anchor="middle" font-size="10" fill="#475569">تبخر ثم تكثيف</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgDistillationApparatus(): string {
	let body = `<defs>
		<marker id="dsArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#0284c7"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">تركيب التقطير المخبري للحصول على الماء المقطر (النقي)</text>`;

	// Heater & Boiling flask
	body += `<rect x="64" y="160" width="66" height="16" rx="3" fill="#475569"/>`;
	body += `<path d="M 80 156 Q 97 146 114 156" fill="#f97316" stroke="#dc2626" stroke-width="1.5"/>`;
	body += `<circle cx="97" cy="122" r="28" fill="#dbeafe" stroke="#0f172a" stroke-width="1.8"/>`;
	body += `<rect x="91" y="64" width="12" height="34" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
	// Thermometer
	body += `<line x1="97" y1="42" x2="97" y2="96" stroke="#dc2626" stroke-width="2"/>`;
	body += `<text x="97" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">ماء مالح</text>`;
	body += `<text x="132" y="54" font-size="10.5" font-weight="bold" fill="#dc2626">محرار (100 °C)</text>`;

	// Condenser tube
	body += `<line x1="103" y1="74" x2="318" y2="122" stroke="#0f172a" stroke-width="2.5"/>`;
	body += `<polygon points="150,74 282,104 276,124 144,94" fill="#bae6fd" fill-opacity="0.65" stroke="#0284c7" stroke-width="1.5"/>`;
	body += `<text x="216" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">المبرد (المكثف)</text>`;
	// Cooling water arrows
	body += `<line x1="258" y1="142" x2="258" y2="120" stroke="#0284c7" stroke-width="1.6" marker-end="url(#dsArr)"/>`;
	body += `<text x="258" y="156" text-anchor="middle" font-size="9.5" fill="#0369a1">دخول ماء بارد</text>`;
	body += `<line x1="164" y1="78" x2="164" y2="54" stroke="#dc2626" stroke-width="1.6" marker-end="url(#dsArr)"/>`;
	body += `<text x="164" y="48" text-anchor="middle" font-size="9.5" fill="#dc2626">خروج ماء دافئ</text>`;

	// Receiving beaker
	body += `<rect x="316" y="124" width="58" height="54" fill="#ffffff" stroke="#0f172a" stroke-width="1.7"/>`;
	body += `<rect x="317" y="146" width="56" height="31" fill="#e0f2fe"/>`;
	body += `<text x="345" y="166" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0369a1">ماء مقطر</text>`;
	body += `<text x="345" y="191" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">(نقي كيميائيا)</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgPhScaleBar(): string {
	const colors = [
		'#dc2626', '#ea580c', '#f97316', '#f59e0b', '#eab308', '#a3e635', '#84cc16',
		'#22c55e',
		'#14b8a6', '#06b6d4', '#3b82f6', '#2563eb', '#4f46e5', '#6d28d9', '#7e22ce'
	];
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">سلم درجة الحموضة pH للمحاليل المائية (عند 25 °C)</text>`;

	const startX = 24;
	const cellW = 27.5;
	for (let v = 0; v <= 14; v++) {
		const x = startX + v * cellW;
		body += `<rect x="${x.toFixed(1)}" y="66" width="${cellW.toFixed(1)}" height="32" fill="${colors[v]}" stroke="#ffffff" stroke-width="1"/>`;
		body += `<text x="${(x + cellW / 2).toFixed(1)}" y="86" text-anchor="middle" font-size="11" font-weight="bold" fill="${v >= 4 && v <= 8 ? '#0f172a' : '#ffffff'}">${v}</text>`;
	}

	// Region brackets / labels
	body += `<rect x="24" y="106" width="${(7 * cellW - 2).toFixed(1)}" height="28" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.2"/>`;
	body += `<text x="${(24 + 3.5 * cellW).toFixed(1)}" y="124" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">وسط حمضي (pH &lt; 7)</text>`;

	body += `<rect x="${(24 + 7 * cellW).toFixed(1)}" y="106" width="${cellW.toFixed(1)}" height="28" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>`;
	body += `<text x="${(24 + 7.5 * cellW).toFixed(1)}" y="54" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">معتدل</text>`;

	body += `<rect x="${(24 + 8 * cellW + 2).toFixed(1)}" y="106" width="${(7 * cellW - 2).toFixed(1)}" height="28" rx="4" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.2"/>`;
	body += `<text x="${(24 + 11.5 * cellW).toFixed(1)}" y="124" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#3730a3">وسط أساسي (pH &gt; 7)</text>`;

	// Examples
	body += `<text x="72" y="156" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b91c1c">عصير الليمون (2.3)</text>`;
	body += `<text x="155" y="176" text-anchor="middle" font-size="10.5" fill="#9a3412">الخل (3) / القهوة (5)</text>`;
	body += `<text x="${(24 + 7.5 * cellW).toFixed(1)}" y="156" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">ماء مقطر (7)</text>`;
	body += `<text x="342" y="156" text-anchor="middle" font-size="10.5" fill="#1d4ed8">ماء الصابون (9)</text>`;
	body += `<text x="385" y="176" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#4c1d95">ماء جافيل (11.5)</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgConcentrationMassDiagram(): string {
	let body = `<defs>
		<marker id="cmArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#16a34a"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="184" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">انحفاظ الكتلة وحساب التركيز الكتلي C<tspan dy="3" font-size="72%">m</tspan><tspan dy="-3"> = m / V</tspan></text>`;

	// Before
	body += `<rect x="26" y="48" width="76" height="66" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<rect x="27" y="70" width="74" height="43" fill="#dbeafe"/>`;
	body += `<text x="64" y="95" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">ماء: 200 g</text>`;
	body += `<rect x="114" y="86" width="54" height="28" rx="4" fill="#fef3c7" stroke="#d97706"/>`;
	body += `<text x="141" y="104" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">ملح 10 g</text>`;
	body += `<text x="96" y="138" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">قبل المزج: 210 g</text>`;

	// Arrow
	body += `<line x1="178" y1="88" x2="218" y2="88" stroke="#16a34a" stroke-width="2.2" marker-end="url(#cmArr)"/>`;

	// After
	body += `<rect x="228" y="48" width="94" height="66" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<rect x="229" y="68" width="92" height="45" fill="#bfdbfe"/>`;
	body += `<text x="275" y="88" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">محلول متجانس</text>`;
	body += `<text x="275" y="104" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">V = 0.2 L</text>`;
	body += `<text x="275" y="138" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">بعد الانحلال: 210 g</text>`;

	// Formula Box
	body += `<rect x="334" y="46" width="106" height="122" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.3"/>`;
	body += `<text x="387" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">التركيز الكتلي</text>`;
	body += `<text x="387" y="98" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">C<tspan dy="3" font-size="72%">m</tspan><tspan dy="-3"> = m / V</tspan></text>`;
	body += `<text x="387" y="124" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C<tspan dy="3" font-size="72%">m</tspan><tspan dy="-3"> = 10 / 0.2</tspan></text>`;
	body += `<text x="387" y="148" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">= 50 g/L</text>`;
	body += `<text x="165" y="170" text-anchor="middle" font-size="10.5" fill="#475569">تمديد المحلول (إضافة الماء) ينقص التركيز الكتلي بينما تبقى كتلة المنحل محفوظة</text>`;

	return wrapPhysicsSvg(460, 200, body);
}

function svgAtmosphereComposition(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="29" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مكونات الهواء الجاف في الغلاف الجوي</text>`;

	// Segmented composition bar (width = 400 px from x=30 to x=430)
	// 78% N2 = 312 px, 21% O2 = 84 px, 1% other = 4 px (make 8 px visible for label)
	body += `<rect x="30" y="52" width="308" height="44" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.2"/>`;
	body += `<rect x="338" y="52" width="84" height="44" fill="#10b981" stroke="#059669" stroke-width="1.2"/>`;
	body += `<rect x="422" y="52" width="8" height="44" fill="#f59e0b" stroke="#d97706" stroke-width="1.2"/>`;

	body += `<text x="184" y="79" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#ffffff">78% ثنائي الآزوت (${chemSvg([{ text: 'N', sub: '2' }])})</text>`;
	body += `<text x="380" y="79" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">21% ${chemSvg([{ text: 'O', sub: '2' }])}</text>`;
	body += `<text x="426" y="114" text-anchor="end" font-size="10.5" font-weight="bold" fill="#b45309">1% غازات أخرى (Ar, CO<tspan dy="3" font-size="72%">2</tspan><tspan dy="-3">)</tspan></text>`;

	// Bottom cards: approx 4/5 and 1/5 + candle experiment
	body += `<rect x="26" y="124" width="198" height="62" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2"/>`;
	body += `<text x="125" y="147" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">النسبة الحجمية التقريبية</text>`;
	body += `<text x="125" y="168" text-anchor="middle" font-size="11" fill="#334155">4/5 آزوت (${chemSvg([{ text: 'N', sub: '2' }])}) + 1/5 أكسجين (${chemSvg([{ text: 'O', sub: '2' }])})</text>`;

	body += `<rect x="236" y="124" width="198" height="62" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.2"/>`;
	body += `<text x="335" y="147" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#065f46">الخصائص الفيزيائية للهواء</text>`;
	body += `<text x="335" y="168" text-anchor="middle" font-size="11" fill="#334155">كتلة 1 L من الهواء = 1.3 g تقريبا</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgAirMassAndPressure(): string {
	let body = `<defs>
		<marker id="apArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">وزن الهواء والضغط الجوي</text>`;

	// Left: weighing air in ball
	body += `<rect x="22" y="42" width="204" height="146" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<text x="124" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">للهواء كتلة (ميزان إلكتروني)</text>`;
	body += `<circle cx="72" cy="96" r="20" fill="#fde68a" stroke="#b45309" stroke-width="1.5"/>`;
	body += `<text x="72" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">مضغوطة</text>`;
	body += `<rect x="40" y="124" width="64" height="22" rx="3" fill="#0f172a"/>`;
	body += `<text x="72" y="139" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#22c55e">452.6 g</text>`;

	body += `<circle cx="174" cy="98" r="16" fill="#e2e8f0" stroke="#64748b" stroke-width="1.4" stroke-dasharray="3,2"/>`;
	body += `<text x="174" y="102" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">منقوصة</text>`;
	body += `<rect x="142" y="124" width="64" height="22" rx="3" fill="#0f172a"/>`;
	body += `<text x="174" y="139" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#22c55e">450.0 g</text>`;
	body += `<text x="124" y="170" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">كتلة 2 L هواء = 2.6 g</text>`;

	// Right: atmospheric pressure
	body += `<rect x="236" y="42" width="202" height="146" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.3"/>`;
	body += `<text x="337" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">الضغط الجوي والبارومتر</text>`;
	body += `<circle cx="337" cy="108" r="28" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>`;
	body += `<line x1="337" y1="108" x2="355" y2="90" stroke="#dc2626" stroke-width="2.2" marker-end="url(#apArr)"/>`;
	body += `<circle cx="337" cy="108" r="3" fill="#0f172a"/>`;
	body += `<text x="337" y="152" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">عند سطح البحر: 1013 hPa</text>`;
	body += `<text x="337" y="172" text-anchor="middle" font-size="10.5" fill="#475569">يتناقص الضغط الجوي بالارتفاع</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

const spH2O = chemSpecies('H2O').katex;
const spN2 = chemSpecies('N2').katex;
const spO2 = chemSpecies('O2').katex;
const spCO2 = chemSpecies('CO2').katex;
const spCO = chemSpecies('CO').katex;
const spSO2 = chemSpecies('SO2').katex;
const spCuSO4 = chemSpecies('CuSO4').katex;

// ===========================================================================
// Exported Trimester 1 Interactive Lessons for 1AS TCL Physics
// ===========================================================================

export const PHYSICS_LESSONS_1AS_TCL_T1: PhysicsInteractiveLessonData[] = [
	// -------------------------------------------------------------------------
	// Lesson 1: Water in Nature, Copper Sulfate Test & Water Cycle
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t1_water_nature_detection_cycle',
		slug: 'phy-1as-tcl-t1-water-nature-detection-cycle',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المجال 1: الإنسان والبيئة',
		order: 1,
		titleAr: 'الماء في الطبيعة: الكشف عن الماء بكبريتات النحاس اللامائية ودورة الماء في الطبيعة',
		objectives: [
			'تحديد حالات الماء الثلاث في الطبيعة وخصائص كل حالة، والتمييز بين بخار الماء غير المرئي والسحاب',
			'استعمال كبريتات النحاس اللامائية للكشف التجريبي عن وجود الماء في المواد الغذائية والطبيعية',
			'تفسير مراحل دورة الماء في الطبيعة وعلاقتها بالطاقة الشمسية وترشيد استهلاك المياه وحمايتها'
		],
		keywordsAr: [
			'الماء في الطبيعة',
			'كبريتات النحاس اللامائية',
			'دورة الماء',
			'التبخر',
			'التكاثف',
			'التساقط'
		],
		discover: {
			scenarioAr: `في مخبر الثانوية، أراد تلاميذ السنة الأولى آداب التحقق من وجود الماء في أربع عينات: عصير تفاح، قطعة خبز، زيت نباتي، وقطرة ماء الحنفية، فوضعوا قليلاً من مسحوق **كبريتات النحاس اللامائية** (${spCuSO4}) ذي اللون الأبيض على كل عينة.`,
			svg: svgWaterDetectionTest(),
			steps: [
				{
					promptAr:
						'ماذا يحدث للون مسحوق كبريتات النحاس اللامائية الأبيض عند ملامسته لقطرة ماء أو عصير التفاح؟',
					hintAr: 'يتغير اللون من الأبيض إلى أحد الألوان المميزة للبحر والسماء.',
					expectedInput: 'أزرق',
					revealAr:
						'يتحول لون كبريتات النحاس اللامائية من **الأبيض** إلى **الأزرق** (تتشكل كبريتات النحاس المميهة)، وهذا هو الكشف المخبري المميز للماء.'
				},
				{
					promptAr:
						'عند وضع المسحوق الأبيض على قطرة زيت نباتي نقي، بقي لونه أبيضاً. ماذا نستنتج؟',
					hintAr: 'هل يحتوي الزيت النقي على الماء؟',
					expectedInput: 'لا يحتوي على الماء',
					revealAr:
						'نستنتج أن الزيت النباتي النقي **لا يحتوي على الماء**، بينما عصير التفاح والخبز والحليب تحول لون المسحوق إلى الأزرق لاحتوائها على الماء.'
				},
				{
					promptAr:
						'في الطبيعة، يسخن ماء البحر بأشعة الشمس ويتحول إلى بخار ماء غير مرئي يصعد إلى الأعلى فيبرد ويشكّل السحب. ما اسم التحول الأول وما اسم التحول الثاني؟',
					hintAr: 'من سائل إلى غاز ثم من غاز إلى قطيرات سائلة دقيقة.',
					expectedInput: 'التبخر ثم التكاثف',
					revealAr:
						'التحول من سائل إلى غاز هو **التبخر**، وتحول البخار البارد في الأعالي إلى قطيرات مائية تشكّل السحب هو **التكاثف**.'
				}
			]
		},
		summary: {
			rulesAr: [
				`**الماء في الطبيعة وحالاته**: يغطي الماء نحو $71\\%$ من سطح الأرض، ويوجد في الطبيعة في ثلاث حالات فيزيائية:\n- **الحالة السائلة**: البحار، المحيطات، الأنهار، الأمطار، المياه الجوفية، والسحب والضباب (قطيرات ماء دقيقة معلقة).\n- **الحالة الصلبة**: الجليد، الثلوج، البرد، والغطاء القطبي.\n- **الحالة الغازية**: **بخار الماء** الموجود في الهواء الجوي وهو غاز **غير مرئي** (لا تخلط بينه وبين السحاب!).`,
				`**الكشف عن الماء بكبريتات النحاس اللامائية**: للكشف عن وجود الماء في أي مادة، نضع عليها مسحوق **كبريتات النحاس اللامائية** ذو اللون **الأبيض**؛ فإذا احتوت المادة على الماء يتحول المسحوق إلى اللون **الأزرق**.`,
				`**معايير نقاوة الماء النقي**: عند الضغط الجوي العادي ($1013\\,\\text{hPa}$)، يتجمد الماء النقي (${spH2O}$) عند درجة حرارة ثابتة هي $0^\\circ\\text{C}$ ويغلي عند $100^\\circ\\text{C}$.`,
				`**دورة الماء في الطبيعة**: تتجدد المياه بفضل **الطاقة الشمسية** والجاذبية عبر مراحل مترابطة:\n1) **التبخر** من المسطحات المائية و**النتح** من النباتات.\n2) **التكاثف** في طبقات الجو العليا الباردة لتشكيل السحب.\n3) **التساقط** على شكل أمطار أو ثلوج أو بَرَد.\n4) **الجريان السطحي** في الأودية و**التسرب** لتغذية المياه الجوفية ثم العودة إلى البحار.`
			],
			visualSvg: svgWaterCycleDiagram(),
			visualCaptionAr: 'مخطط مبسط لمراحل دورة الماء في الطبيعة تحت تأثير الطاقة الشمسية',
			examples: [
				{
					problemAr:
						'اختبر مخبري ثلاث مواد بكبريتات النحاس اللامائية البيضاء: (أ) لب الطماطم فأصبح أزرق، (ب) مسحوق السكر الجاف فبقي أبيض، (ج) الحليب الطازج فأصبح أزرق. ما هي المواد التي تحتوي على الماء؟',
					solutionAr:
						'المادتان اللتان تحتويان على الماء هما **(أ) الطماطم** و**(ج) الحليب الطازج** لأن كبريتات النحاس اللامائية تحوّلت إلى اللون الأزرق عند ملامستهما، أما السكر الجاف فخالي من الماء.'
				},
				{
					problemAr:
						'اشرح كيف تساهم عملية **النتح** عند الغابات الجزائرية كغابات الشريعة وجرجرة في دورة الماء؟',
					solutionAr:
						'تطرح الأشجار بخار الماء عبر أوراقها (عملية النتح)، فيضاف إلى بخار الماء الناتج عن تبخر البحار والوديان، ثم يصعد البخار ويتكاثف في الجو ليزيد من فرص تشكل السحب وتساقط الأمطار.'
				}
			],
			watchOutAr:
				'خطأ شائع: الاعتقاد بأن **السحاب** أو الضباب يتكون من غاز بخار الماء! في الحقيقة بخار الماء غاز شفاف لا يُرى بالعين، أما السحاب الأبيض الذي نراه فهو ملايين القطيرات المائية **السائلة** الدقيقة (أو بلورات الجليد الصغيرة) الناتجة عن التكاثف.'
		},
		practice: [
			{
				questionAr:
					'ما الكاشف الكيميائي المستعمل في المخبر للكشف عن وجود الماء في فاكهة أو مادة غذائية، وما التغير اللوني المشاهد؟',
				options: [
					'ماء الجير؛ يتعكر فيتحول إلى أبيض',
					'كبريتات النحاس اللامائية؛ تتحول من الأبيض إلى الأزرق',
					'كبريتات النحاس اللامائية؛ تتحول من الأزرق إلى الأحمر',
					'شريط الـ pH؛ يتحول إلى اللون الأخضر'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ماء الجير يستعمل للكشف عن غاز ثنائي أكسيد الكربون وليس عن الماء.',
					'صحيح! كبريتات النحاس اللامائية مسحوق أبيض يصبح أزرق اللون عند ملامسة الماء.',
					'انتبه: لونها الأصلي الجاف أبيض وتتحول إلى الأزرق عند التميّه.',
					'ورق الـ pH يقيس حموضة المحاليل المائية ولا يكشف عن وجود الماء في الأغذية الجافة.'
				],
				explanationAr:
					'تتحول كبريتات النحاس اللامائية البيضاء إلى كبريتات النحاس المميهة الزرقاء بمجرد ملامستها للماء.'
			},
			{
				questionAr: 'ما المصدر الطاقي الرئيسي الذي يحرك دورة الماء في الطبيعة ويسبب تبخر مياه البحار؟',
				options: ['حركة الرياح فقط', 'الطاقة الشمسية', 'طاقة المد والجزر', 'حرارة باطن الأرض'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الرياح تنقل السحب لكنها ليست السبب الأساسي لتبخر المحيطات.',
					'ممتاز! إشعاع الشمس يسخّن المسطحات المائية فيتبخر الماء وتبدأ الدورة.',
					'المد والجزر حركة بحرية ناتجة عن جاذبية القمر ولا تسبب التبخر.',
					'باطن الأرض يغذي الينابيع الحارة فقط ولا يحرك الدورة العالمية.'
				],
				explanationAr:
					'تسخّن الشمس البحار والمحيطات عبر الإشعاع، فتحدث عملية التبخر التي تنطلق منها دورة الماء.'
			},
			{
				questionAr:
					'أثناء دورة الماء، تتكوّن الغيوم في طبقات الجو العليا الباردة نتيجة تحول بخار الماء الصاعد إلى قطيرات ماء صغيرة. ما اسم هذا التحول الفيزيائي؟',
				options: ['التبخر', 'الانصهار', 'التكاثف', 'التسرب'],
				correctIndex: 2,
				diagnosticFeedback: [
					'التبخر هو تحول السائل إلى بخار (غاز) عند السطح، وليس العكس.',
					'الانصهار هو تحول الجليد الصلب إلى ماء سائل.',
					'أحسنت! تحول بخار الماء الغازي عند التبريد إلى قطيرات سائلة يسمى التكاثف.',
					'التسرب هو نفاذ مياه الأمطار داخل التربة نحو المياه الجوفية.'
				],
				explanationAr:
					'عندما يصعد بخار الماء ويبرد في الطبقات العليا يتكاثف متحولاً إلى قطيرات سائلة تشكل السحب.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 2: Homogeneous & Heterogeneous Aqueous Mixtures + Separation
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t1_aqueous_mixtures_separation',
		slug: 'phy-1as-tcl-t1-aqueous-mixtures-separation',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المجال 1: الإنسان والبيئة',
		order: 2,
		titleAr: 'الخلائط المائية المتجانسة وغير المتجانسة وطرق الفصل (الإبانة، الترشيح، التقطير)',
		objectives: [
			'التمييز بين الخليط المائي المتجانس والخليط المائي غير المتجانس بالعين المجردة',
			'اختيار تقنية الفصل المناسبة لخليط غير متجانس (التركيد، الإبانة، الترشيح) وتنفيذها تجريبياً',
			'شرح مبدأ عملية التقطير لفصل مكونات الخليط المتجانس والحصول على ماء مقطر نقي، وربطها بتحلية مياه البحر'
		],
		keywordsAr: [
			'خليط متجانس',
			'خليط غير متجانس',
			'الإبانة',
			'الترشيح',
			'التركيد',
			'التقطير',
			'الرشاحة',
			'الماء المقطر'
		],
		discover: {
			scenarioAr:
				'بعد رحلة ميدانية، أحضر التلاميذ ثلاث قارورات ماء: (1) ماء عكر مختلط بالتراب والرمل، (2) خليط ماء وزيت، (3) ماء بحر صافٍ مالح. طلب الأستاذ استخلاص ماء نقي من كل عينة باستعمال أدوات المخبر.',
			svg: svgSeparationMethodsGallery(),
			steps: [
				{
					promptAr: 'صنّف العينات الثلاث إلى خليط متجانس وخليط غير متجانس.',
					hintAr: 'هل يمكنك التمييز بين مكونات ماء البحر بالعين المجردة؟ وماذا عن الماء والزيت؟',
					expectedInput: 'العينتان 1 و 2 غير متجانستين و 3 متجانس',
					revealAr:
						'الماء العكر و(الماء + الزيت) **خليطان غير متجانسين** لأننا نميز مكوناتهما بالعين، أما ماء البحر المالح الصافي فهو **خليط متجانس**.'
				},
				{
					promptAr: 'ما اسم الأنبوبة المخروطية المزودة بصنبور التي نستعملها لفصل الزيت الطافي فوق الماء؟',
					hintAr: 'نسمي التقنية «الإبانة»، فما اسم الأداة؟',
					expectedInput: 'أنبوبة الإبانة',
					revealAr:
						'نستعمل **أنبوبة الإبانة** لفصل سائلين غير ممتزجين (الماء في الأسفل لأنه أثقل كثافة والزيت يطفو في الأعلى).'
				},
				{
					promptAr:
						'بعد ترشيح ماء عكر حصلنا على «رشاحة صافية». إذا سخّنّاها في دورق التقطير، ماذا نجمع في نهاية المبرد (المكثف)؟',
					hintAr: 'يتبخر الماء ويتكاثف في المبرد تاركاً الأملاح.',
					expectedInput: 'ماء مقطر',
					revealAr:
						'نجمع **الماء المقطر** (وهو ماء نقي خالٍ من الأملاح المنحلة)، بينما تترسب الأملاح في قاع دورق التسخين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الخليط المائي**: جسم يتكوّن من الماء ومادة واحدة أو أكثر:\n- **خليط غير متجانس**: يمكن التمييز بين مكوناته بالعين المجردة (مثل: ماء + رمل، ماء + زيت، عصير لبّ طبيعي).\n- **خليط متجانس**: لا يمكن التمييز بين مكوناته بالعين المجردة ويظهر كجسم واحد (مثل: ماء + ملح، ماء + سكر، ماء معدني، خل).',
				'**طرق فصل الخلائط غير المتجانسة**:\n1) **التركيد (الترويق)**: ترك الخليط ساكناً لتترسب الحبيبات الثقيلة (كالرمل والحصى) في الأسفل بفعل الجاذبية.\n2) **الإبانة**: فصل سائلين **غير ممتزجين** (كالماء والزيت) باستعمال **أنبوبة الإبانة** حيث ينفصل السائل الأثقل أسفل الصنبور.\n3) **الترشيح**: تمرير الخليط عبر **ورق الترشيح** الموضوع داخل قمع، فتُحتجز الشوائب الصلبة الدقيقة على الورق وينفذ سائل صافٍ يسمى **الرشاحة**.',
				'**فصل الخلائط المتجانسة (التقطير)**: لا ينفع الترشيح لفصل الأملاح المنحلة في الماء لأنها تمر عبر مسام ورق الترشيح؛ لذلك نستعمل **التقطير** الذي يعتمد على:\n- **التبخر**: تسخين الخليط في الدورق حتى يغلي الماء عند $100^\\circ\\text{C}$ ويتحول لبخار.\n- **التكاثف**: مرور البخار داخل **المبرد (المكثف)** المحاط بماء بارد ليعود إلى الحالة السائلة، فنحصل على **ماء مقطر (نقي)**.',
				'**تطبيق بيئي وتكنولوجي**: تعتمد **محطات تحلية مياه البحر** في الجزائر (مثل محطات الحامة ومقطع وهران وكاب جنات) وأنظمة تنقية المياه الشروب على مراحل متتالية تجمع بين التركيد والترشيح وفصل الأملاح.'
			],
			visualSvg: svgDistillationApparatus(),
			visualCaptionAr: 'جهاز التقطير المخبري: الدورق والمحرار والمبرد للحصول على ماء مقطر نقي',
			examples: [
				{
					problemAr:
						'لديك خليط مكون من: ماء + زيت زيتون + برادة حديد دقيقة + ملح طعام منحل. ما الخطوات المتسلسلة لفصل جميع مكونات هذا الخليط؟',
					solutionAr:
						'1) **الفرز المغناطيسي** (أو الترشيح): لسحب برادة الحديد الصلبة.\n2) **الإبانة**: لفصل الزيت الطافي فوق الماء المالح عبر أنبوبة الإبانة.\n3) **التقطير**: لتبخير الماء وتكثيفه فنحصل على الماء المقطر النقي ويبقى الملح في الدورق.'
				},
				{
					problemAr:
						'اشترى عادل قارورة ماء معدني كُتب عليها «ماء صافٍ طبيعي — بقايا جافة $280\\,\\text{mg/L}$». هل هذا الماء خليط متجانس أم ماء نقي؟',
					solutionAr:
						'الماء المعدني **خليط متجانس** وليس ماءً نقياً؛ لأن كلمة «بقايا جافة» تدل على وجود أملاح معدنية مذابة (كالكلسيوم والمغنيسيوم) رغم أنه صافٍ بالعين.'
				}
			],
			watchOutAr:
				'احذر الخلط بين **الرشاحة الصافية** و**الماء النقي**! الرشاحة الناتجة عن الترشيح خالية من العوالق الصلبة المرئية فقط، لكنها ما تزال تحتوي على الأملاح المنحلة؛ الماء النقي هو **الماء المقطر**.'
		},
		practice: [
			{
				questionAr:
					'ما التقنية المخبرية المثلى لفصل خليط **غير متجانس** يتكون من **الماء وزيت الزيتون**؟',
				options: ['الترشيح بورق مسامي', 'الإبانة باستعمال أنبوبة الإبانة', 'التقطير البسيط', 'التركيد بالانتظار فقط'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترشيح يفصل جسماً صلباً عن سائل، بينما الزيت سائل قد يمر أو يسد المسام.',
					'أحسنت! الإبانة تفصل بين سائلين لا يمتزجان اعتماداً على اختلاف كثافتيهما.',
					'التقطير مكلف ومعقد ومخصص لفصل الخلائط المتجانسة.',
					'التركيد يفصل الطبقتين في الكأس لكن يصعب سكبهما بدقة مثل أنبوبة الإبانة المزودة بصنبور.'
				],
				explanationAr:
					'الماء والزيت سائلان غير ممتزجين، يطفو الزيت فوق الماء فنفصلهما بسهولة في أنبوبة الإبانة.'
			},
			{
				questionAr: 'في عملية التقطير المخبري لماء البحر، ما الدور الرئيسي **للمبرد (المكثف)**؟',
				options: [
					'تسخين ماء البحر ليتبخر بسرعة',
					'حجز حبات الرمل العالقة في الماء',
					'تبريد بخار الماء وتكثيفه ليصبح ماءً مقطراً سائلاً',
					'إذابة الملح في قاع الدورق'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'المسخن الحراري هو الذي يسخن الماء وليس المبرد.',
					'ورق الترشيح هو الذي يحجز الرمل.',
					'صحيح! يحيط ماء بارد بأنبوب البخار في المبرد فيبرده ويكثفه إلى قطرات ماء مقطر.',
					'الملح يتبقى صلباً في الدورق ولا يصل أصلاً إلى المبرد.'
				],
				explanationAr:
					'يمرر المبرد ماءً بارداً حول الأنبوب الداخلي لتحويل بخار الماء الصاعد إلى سائل (التكاثف).'
			},
			{
				questionAr: 'أيّ من العينات التالية يُعتبر **خليطاً متجانساً**؟',
				options: [
					'ماء ممزوج بالطين والحصى',
					'ماء مضاف إليه قطرات من زيت المائدة',
					'ماء معدني صافٍ يحتوي أملاحاً معدنية مذابة',
					'عصير برتقال غير مصفى يحتوي قطع لبّ'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الطين والحصى يُريان بالعين المجردة فهو خليط غير متجانس.',
					'الزيت لا يمتزج بالماء ويشكل طبقة علوية مميزة فهو غير متجانس.',
					'ممتاز! الماء المعدني لا يمكن التمييز بين مكوناته بالعين المجردة فهو خليط متجانس.',
					'وجود قطع اللب المرئية يجعله خليطاً غير متجانس.'
				],
				explanationAr:
					'الماء المعدني خليط متجانس لأن الأملاح المذابة موزعة بانتظام ولا يمكن تمييزها بالعين.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 3: Aqueous Solutions, Mass Concentration & pH
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t1_solutions_mass_concentration_ph',
		slug: 'phy-1as-tcl-t1-solutions-mass-concentration-ph',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المجال 1: الإنسان والبيئة',
		order: 3,
		titleAr: 'المحاليل المائية، الانحلال والتركيز الكتلي وقياس درجة الحموضة pH',
		objectives: [
			'التمييز بين المُحل (الماء) والمُنحل، وتحديد طبيعة المحلول (ممدد، مركز، مشبع) والتحقق من انحفاظ الكتلة',
			'حساب التركيز الكتلي لمحلول مائي بالعلاقة C_m = m / V وتطبيقها عند التحضير أو التمديد',
			'قياس درجة حموضة المحاليل المائية (pH) وتصنيفها إلى حمضية ومعتدلة وأساسية وربطها بالبيئة (الأمطار الحمضية)'
		],
		keywordsAr: [
			'المحلول المائي',
			'التركيز الكتلي',
			'انحفاظ الكتلة',
			'التمديد',
			'درجة الحموضة pH',
			'محلول حمضي ومعتدل وأساسي'
		],
		discover: {
			scenarioAr:
				'أذاب تلميذ $10\\,\\text{g}$ من ملح الطعام في الماء لتحضير محلول مائي حجمه $V = 200\\,\\text{mL}$، ثم أراد فحص درجة حموضة محاليل مألوفة (عصير الليمون، ماء مقطر، ماء جافيل) باستعمال جهاز الـ $\\text{pH}$ متر.',
			svg: svgPhScaleBar(),
			steps: [
				{
					promptAr:
						'لحساب التركيز الكتلي $C_m = \\frac{m}{V}$ بوحدة $\\text{g/L}$، يجب تحويل الحجم $V = 200\\,\\text{mL}$ إلى اللتر ($\\text{L}$). كم يساوي؟',
					hintAr: 'اقسم الحجم بالمليلتر على $1000$.',
					expectedInput: '0.2',
					revealAr: '$V = \\frac{200}{1000} = 0.2\\,\\text{L}$، ومنه $C_m = \\frac{10}{0.2} = 50\\,\\text{g/L}$.'
				},
				{
					promptAr:
						'إذا أضفنا إلى هذا المحلول كمية من الماء المقطر (عملية التمديد)، هل يزداد التركيز الكتلي أم ينقص، وماذا يحدث لكتلة الملح المذاب؟',
					hintAr: 'يزداد الحجم بينما كتلة الملح لا تتغير.',
					expectedInput: 'ينقص التركيز وتبقى كتلة الملح ثابتة',
					revealAr:
						'عند التمديد **ينقص التركيز الكتلي** لأن الحجم يزداد، بينما **تبقى كتلة الملح المنحلة ثابتة** ($m = C_{m1} V_1 = C_{m2} V_2$).'
				},
				{
					promptAr:
						'سجل جهاز الـ $\\text{pH}$ متر القيم التالية: عصير الليمون ($2.3$)، ماء مقطر ($7.0$)، ماء جافيل ($11.5$). أيها حمضي وأيها معتدل وأيها أساسي؟',
					hintAr: 'قارن كل قيمة بالرقم $7$.',
					expectedInput: 'الليمون حمضي والماء معتدل وجافيل أساسي',
					revealAr:
						'عصير الليمون **حمضي** ($\\text{pH} < 7$)، الماء المقطر **معتدل** ($\\text{pH} = 7$)، وماء جافيل **أساسي (قاعدي)** ($\\text{pH} > 7$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المحلول المائي وانحفاظ الكتلة**: يتكون من **المُحل** (الماء) و**المُنحل** (المادة المذابة). عند الانحلال تتوزع حبيبات المنحل بين حبيبات الماء وتبقى الكتلة الكلية محفوظة: $m_{\\text{محلول}} = m_{\\text{ماء}} + m_{\\text{منحل}}$. عندما يعجز الماء عن إذابة المزيد في درجة حرارة معينة يسمى المحلول **مشبعاً**.',
				'**التركيز الكتلي ($C_m$)**: يعبر عن كتلة المنحل المذابة في لتر واحد من المحلول:\n$$C_m = \\frac{m}{V} \\iff m = C_m \\times V$$\nحيث $m$ كتلة المنحل بالغرام ($\\text{g}$) و$V$ حجم المحلول باللتر ($\\text{L}$)، ووحدة التركيز الكتلي هي $\\text{g/L}$.\nعند **تمديد** محلول بإضافة الماء النقي، تنحفظ كتلة المنحل: $C_{m1} V_1 = C_{m2} V_2$.',
				'**درجة الحموضة ($\\text{pH}$)**: مقدار لا وحدة له يأخذ قيماً من $0$ إلى $14$ (عند $25^\\circ\\text{C}$) ويُقاس بـ **ورق الـ $\\text{pH}$** أو **جهاز الـ $\\text{pH}$ متر**:\n- **وسط حمضي**: $0 \\le \\text{pH} < 7$ (تزداد الحموضة كلما اقتربنا من $0$).\n- **وسط معتدل**: $\\text{pH} = 7$ (مثل الماء المقطر).\n- **وسط أساسي (قاعدي)**: $7 < \\text{pH} \\le 14$ (تزداد القاعدية كلما اقتربنا من $14$).',
				'**أثر التمديد على الـ $\\text{pH}$ والبيئة**: عند تمديد محلول حمضي يرتفع الـ $\\text{pH}$ ليقترب من $7$، وعند تمديد محلول أساسي ينخفض ليقترب من $7$ (دون أن يتعدى $7$). بيئياً، يؤدي تلوث الجو بالغازات الحمضية إلى **الأمطار الحمضية** ($\\text{pH} < 5.6$) التي تضر بالتربة والغابات.'
			],
			visualSvg: svgConcentrationMassDiagram(),
			visualCaptionAr: 'تحقق مبدأ انحفاظ الكتلة في المحلول المائي وطريقة حساب التركيز الكتلي',
			examples: [
				{
					problemAr:
						'نذيب $15\\,\\text{g}$ من السكر في $250\\,\\text{g}$ من الماء فنحصل على محلول حجمه $250\\,\\text{mL}$. احسب كتلة المحلول الناتج ثم احسب تركيزه الكتلي $C_m$.',
					solutionAr:
						'1) حسب انحفاظ الكتلة: $m_{\\text{محلول}} = 250 + 15 = 265\\,\\text{g}$.\n2) نحول الحجم: $V = 250\\,\\text{mL} = 0.25\\,\\text{L}$.\nالتركيز الكتلي: $C_m = \\frac{15}{0.25} = 60\\,\\text{g/L}$.'
				},
				{
					problemAr:
						'نأخذ $100\\,\\text{mL}$ من هذا المحلول ($C_{m1} = 60\\,\\text{g/L}$) ونضيف إليه $200\\,\\text{mL}$ من الماء المقطر. ما هو التركيز الكتلي الجديد $C_{m2}$؟',
					solutionAr:
						'الحجم النهائي: $V_2 = 100 + 200 = 300\\,\\text{mL} = 0.3\\,\\text{L}$.\nكتلة السكر المأخوذة: $m = C_{m1} \\times V_1 = 60 \\times 0.1 = 6\\,\\text{g}$.\nالتركيز الجديد: $C_{m2} = \\frac{6}{0.3} = 20\\,\\text{g/L}$.'
				}
			],
			watchOutAr:
				'احذر من نسيان تحويل الحجم من $\\text{mL}$ إلى $\\text{L}$ عند حساب $C_m = \\frac{m}{V}$! كذلك تذكر أن الماء عند تمديد محلول حمضي يرفع الـ $\\text{pH}$ نحو $7$ فقط ولا يجعله أبداً أساسياً ($> 7$).'
		},
		practice: [
			{
				questionAr:
					'أذابت سلمى $8\\,\\text{g}$ من كبريتات النحاس في الماء لتحضير محلول حجمه $400\\,\\text{mL}$. ما قيمة التركيز الكتلي $C_m$ للمحلول؟',
				options: ['$20\\,\\text{g/L}$', '$0.02\\,\\text{g/L}$', '$3.2\\,\\text{g/L}$', '$50\\,\\text{g/L}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! $V = 400\\,\\text{mL} = 0.4\\,\\text{L}$، إذن $C_m = \\frac{8}{0.4} = 20\\,\\text{g/L}$.',
					'نسيت تحويل الحجم من المليلتر إلى اللتر قبل القسمة.',
					'ضربت $8 \\times 0.4$ بدلاً من القسمة $m / V$.',
					'عكست النسبة أو أخطأت في القسمة؛ $8 \\div 0.4 = 20$.'
				],
				explanationAr:
					'نحول الحجم إلى اللتر: $V = 0.4\\,\\text{L}$، ثم نطبق القانون $C_m = \\frac{m}{V} = \\frac{8}{0.4} = 20\\,\\text{g/L}$.'
			},
			{
				questionAr: 'لدينا ثلاث عينات: الخل ($\\text{pH} = 3$)، الماء المقطر ($\\text{pH} = 7$)، والصابون السائل ($\\text{pH} = 9$). أي ترتيب يعرضها من الوسط **الأكثر حموضة** إلى **الأساسي**؟',
				options: [
					'الصابون ← الماء المقطر ← الخل',
					'الخل ← الماء المقطر ← الصابون',
					'الماء المقطر ← الخل ← الصابون',
					'الخل ← الصابون ← الماء المقطر'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا الترتيب من الأساسي إلى الحمضي (معكوس).',
					'صحيح! الخل حمضي ($3$)، والماء معتدل ($7$)، والصابون أساسي ($9$).',
					'الماء المقطر معتدل وليس أكثر حموضة من الخل.',
					'المعتدل ($7$) يقع بين الحمضي ($<7$) والأساسي ($>7$).'
				],
				explanationAr:
					'كلما صغر رقم الـ $\\text{pH}$ زادت الحموضة؛ إذن الترتيب هو: الخل ($3$) ثم الماء المقطر ($7$) ثم الصابون ($9$).'
			},
			{
				questionAr: 'عند إضافة كمية كبيرة من الماء المقطر ($\\text{pH} = 7$) إلى محلول حمضي ($\\text{pH} = 2$)، كيف تتغير قيمة الـ $\\text{pH}$؟',
				options: [
					'تنخفض وتصبح أقل من $2$',
					'تتزايد وتقترب من $7$ دون أن تتجاوزها',
					'تقفز لتصبح أكبر من $7$ (أساسي)',
					'تبقى ثابتة عند $2$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التمديد يضعف الحموضة فيرتفع رقم الـ $\\text{pH}$ ولا ينخفض.',
					'صحيح! تمديد الحمض بالماء المقطر يخفف حموضته فتقترب قيمة الـ $\\text{pH}$ من $7$ دون تجاوزها.',
					'لا يتحول المحلول الحمضي إلى أساسي بإضافة الماء المعتدل.',
					'تتغير قيمة الـ $\\text{pH}$ عند تغير التركيز بالتمديد.'
				],
				explanationAr:
					'بتمديد محلول حمضي يضعف تركيزه فتتزايد قيمة الـ $\\text{pH}$ وتقترب من $7$ (حد الاعتدال).'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 4: Air Around Us, Atmospheric Pressure & Environmental Protection
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t1_air_atmosphere_pressure_pollution',
		slug: 'phy-1as-tcl-t1-air-atmosphere-pressure-pollution',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المجال 1: الإنسان والبيئة',
		order: 4,
		titleAr: 'الهواء حولنا، الضغط الجوي ووزن الهواء وحماية البيئة من التلوث',
		objectives: [
			'معرفة التركيب الحجمي للهواء الجاف (78% ثنائي الآزوت، 21% ثنائي الأكسجين، 1% غازات أخرى) وتجربة الشمعة',
			'إثبات أن للهواء كتلة ووزناً ($\\approx 1.3\\,\\text{g/L}$) وأنه يمارس ضغطاً جوياً يُقاس بالبارومتر',
			'تشخيص أسباب تلوث الهواء (الاحتباس الحراري، الأمطار الحمضية، غاز CO) واقتراح حلول بيئية مستدامة'
		],
		keywordsAr: [
			'الغلاف الجوي',
			'ثنائي الآزوت',
			'ثنائي الأكسجين',
			'كتلة الهواء',
			'الضغط الجوي',
			'البارومتر',
			'تلوث الهواء',
			'الاحتباس الحراري'
		],
		discover: {
			scenarioAr:
				'أجرى الأستاذ تجربة وضع شمعة مشتعلة فوق ماء ملوّن وتغطيتها بناقوس زجاجي مدرج؛ فلاحظ التلاميذ انطفاء الشمعة بعد لحظات وارتفاع الماء داخل الناقوس بمقدار الخُمس ($\\frac{1}{5}$) تقريباً! كما وزن كرة قدم منفوخة ثم أفرغ منها $2\\,\\text{L}$ من الهواء.',
			svg: svgAtmosphereComposition(),
			steps: [
				{
					promptAr:
						'ما اسم الغاز الموجود في الهواء الذي استُهلك أثناء احتراق الشمعة ويشغل نحو خمس ($21\\%$) حجم الهواء؟',
					hintAr: 'غاز ضروري للتنفس والاحتراق صيغته $\\ce{O2}$.',
					expectedInput: 'ثنائي الأكسجين',
					revealAr:
						'الغاز المستهلك هو **ثنائي الأكسجين** (${spO2}$) ويمثل نحو **$21\\%$** (أي $\\approx \\frac{1}{5}$) من حجم الهواء الجاف، أما الباقي فأغلبه **ثنائي الآزوت** (${spN2}$) بنسبة **$78\\%$**.'
				},
				{
					promptAr:
						'علماً أن كتلة $1\\,\\text{L}$ من الهواء في الشروط العادية تساوي تقريباً $1.3\\,\\text{g}$، كم تنقص كتلة الكرة عندما نفرغ منها $2\\,\\text{L}$ من الهواء؟',
					hintAr: 'اضرب $2 \\times 1.3$.',
					expectedInput: '2.6',
					revealAr:
						'تنقص الكتلة بمقدار $m = 2 \\times 1.3 = 2.6\\,\\text{g}$، مما يثبت تجريبياً أن **للهواء كتلة ووزناً**.'
				},
				{
					promptAr:
						'عند صعودنا إلى قمة جبل الشريعة أو جرجرة، هل يزداد الضغط الجوي أم يتناقص مقارنة بمستوى سطح البحر؟',
					hintAr: 'سمك عمود الهواء فوق الجبل أقل منه عند سطح البحر.',
					expectedInput: 'يتناقص',
					revealAr:
						'**يتناقص** الضغط الجوي كلما ارتفعنا عن سطح البحر لأن طول ووزن عمود الهواء الذي يضغط علينا يتناقص.'
				}
			]
		},
		summary: {
			rulesAr: [
				`**تركيب الهواء الجاف**: الهواء خليط غازي متجانس يحيط بالأرض (الغلاف الجوي)، ويتكون حجمياً من:\n- **$78\\%$ غاز ثنائي الآزوت** (${spN2}$) — غاز خامل نسبياً لا يساعد على الاحتراق.\n- **$21\\%$ غاز ثنائي الأكسجين** (${spO2}$) — ضروري للتنفس والاحتراق.\n- **$1\\%$ غازات أخرى** (الأرغون $\\approx 0.93\\%$، ثنائي أكسيد الكربون ${spCO2} \\approx 0.04\\%$، وكميات متغيرة من بخار الماء).`,
				'**كتلة الهواء ووزنه**: الهواء مادة غازية لها كتلة وثقل؛ وتبلغ كتلة $1\\,\\text{L}$ من الهواء في الشروط النظامية نحو $1.3\\,\\text{g}$ ($1.29\\,\\text{g/L}$)، بينما تبلغ كتلة $1\\,\\text{m}^3$ ($1000\\,\\text{L}$) نحو $1.3\\,\\text{kg}$.',
				'**الضغط الجوي وقياسه**: ينشأ **الضغط الجوي** عن وزن عمود الهواء المسلّط على السطوح.\n- يُقاس الضغط الجوي بجهاز **البارومتر** (أما ضغط غاز محصور فيُقاس بـ **المانومتر**).\n- القيمة المرجعية عند سطح البحر: $P_0 \\approx 1013\\,\\text{hPa}$ ($\\approx 1\\,\\text{bar} = 10^5\\,\\text{Pa} = 76\\,\\text{cmHg}$)، ويتناقص الضغط بالارتفاع.',
				`**تلوث الهواء وحماية البيئة**:\n- **الاحتراق غير التام** ينتج غاز أحادي أكسيد الكربون (${spCO}$) السام والقاتل.\n- تراكم الغازات الدفيئة (${spCO2}$ والميثان) يضاعف ظاهرة **الاحتباس الحراري** وتغير المناخ.\n- انبعاث أكاسيد الكبريت (${spSO2}$) والآزوت من المصانع يسبب **الأمطار الحمضية**.\n- **سبل الحماية**: التشجير (مشروع السد الأخضر في الجزائر)، الطاقات المتجددة النظيفة، صيانة أجهزة التدفئة لتجنب اختناق ${spCO}$، والنقل النظيف.`
			],
			visualSvg: svgAirMassAndPressure(),
			visualCaptionAr: 'إثبات كتلة الهواء بالميزان الإلكتروني وقياس الضغط الجوي بالبارومتر',
			examples: [
				{
					problemAr:
						'قاعة درس أبعادها $8\\,\\text{m} \\times 5\\,\\text{m} \\times 3\\,\\text{m}$. احسب حجم الهواء فيها بالمتر المكعب ($\\text{m}^3$)، ثم استنتج حجم غاز ثنائي الأكسجين (${spO2}$) وثنائي الآزوت (${spN2}$) وكتلة الهواء الكلية علماً أن كتلة $1\\,\\text{m}^3$ من الهواء هي $1.3\\,\\text{kg}$.',
					solutionAr:
						'1) حجم القاعة: $V = 8 \\times 5 \\times 3 = 120\\,\\text{m}^3$.\n2) حجم ${spO2}$: $V(\\ce{O2}) = 120 \\times \\frac{21}{100} = 25.2\\,\\text{m}^3$.\n3) حجم ${spN2}$: $V(\\ce{N2}) = 120 \\times \\frac{78}{100} = 93.6\\,\\text{m}^3$.\n4) كتلة الهواء: $m = 120 \\times 1.3 = 156\\,\\text{kg}$.'
				},
				{
					problemAr:
						'لماذا تنصح مصالح الحماية المدنية في الجزائر بترك نافذة تهوية مفتوحة في الشتاء عند تشغيل المدفأة الغازية؟',
					solutionAr:
						'لضمان دخول كمية كافية من ثنائي الأكسجين (${spO2}$) حتى يكون احتراق الغاز **احتراقاً تاماً**، وتجنب الاحتراق غير التام الذي ينتج غاز أحادي أكسيد الكربون (${spCO}$) القاتل الصامت.'
				}
			],
			watchOutAr:
				'احذر من الخلط بين **البارومتر** (الذي يقيس الضغط الجوي المحيط) و**المانومتر** (الذي يقيس ضغط الغاز المحصور داخل إطار سيارة أو قارورة). وتذكّر أن $1\\,\\text{m}^3 = 1000\\,\\text{L}$!'
		},
		practice: [
			{
				questionAr:
					'يحتوي حيز حجمه $200\\,\\text{L}$ على هواء جاف نقي. ما هو الحجم التقريبي لغاز ثنائي الأكسجين (${spO2}$) وغاز ثنائي الآزوت (${spN2}$) داخل هذا الحيز؟',
				options: [
					'$42\\,\\text{L}$ من $\\ce{O2}$ و $156\\,\\text{L}$ من $\\ce{N2}$',
					'$156\\,\\text{L}$ من $\\ce{O2}$ و $42\\,\\text{L}$ من $\\ce{N2}$',
					'$100\\,\\text{L}$ من $\\ce{O2}$ و $100\\,\\text{L}$ من $\\ce{N2}$',
					'$21\\,\\text{L}$ من $\\ce{O2}$ و $78\\,\\text{L}$ من $\\ce{N2}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! $200 \\times 0.21 = 42\\,\\text{L}$ أكسجين، و$200 \\times 0.78 = 156\\,\\text{L}$ آزوت.',
					'عكست النسبتين: الآزوت هو الغاز الغالب بنسبة $78\\%$ والأكسجين بنسبة $21\\%$.',
					'الهواء ليس مقسوماً بالتساوي بين الغازين.',
					'هذه النسب توافق $100\\,\\text{L}$ هواء وليس $200\\,\\text{L}$.'
				],
				explanationAr:
					'نسبتا الهواء هما $21\\%$ لـ ${spO2}$ و$78\\%$ لـ ${spN2}$؛ ففي $200\\,\\text{L}$ نضرب كل نسبة في $200$.'
			},
			{
				questionAr:
					'قارورة سعتها $5\\,\\text{L}$ مملوءة بالهواء في الشروط العادية. إذا كانت كتلة $1\\,\\text{L}$ من الهواء هي $1.3\\,\\text{g}$، فما كتلة الهواء داخل القارورة؟',
				options: ['$5\\,\\text{g}$', '$6.5\\,\\text{g}$', '$3.85\\,\\text{g}$', '$1.3\\,\\text{g}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الهواء ليس ماءً؛ كثافته ليست $1\\,\\text{g/L}$ بل $1.3\\,\\text{g/L}$.',
					'ممتاز! $m = 5 \\times 1.3 = 6.5\\,\\text{g}$.',
					'قسمت $5 \\div 1.3$ بدلاً من الضرب.',
					'$1.3\\,\\text{g}$ هي كتلة لتر واحد فقط.'
				],
				explanationAr:
					'كتلة الهواء تساوي الحجم مضروباً في الكتلة الحجمية ($1.3\\,\\text{g/L}$): $5 \\times 1.3 = 6.5\\,\\text{g}$.'
			},
			{
				questionAr: 'ما اسم الجهاز الذي يقيس **الضغط الجوي**، وماذا يحدث لقيمته عند الصعود إلى قمة جبل؟',
				options: [
					'المانومتر؛ يزداد الضغط الجوي',
					'البارومتر؛ يتناقص الضغط الجوي',
					'المحرار؛ يتناقص الضغط الجوي',
					'البارومتر؛ يبقى الضغط الجوي ثابتاً'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المانومتر يقيس ضغط الغازات المحصورة، والضغط الجوي ينخفض بالارتفاع.',
					'صحيح! نقيس الضغط الجوي بالبارومتر ويتناقص كلما ارتفعنا لقلة سمك عمود الهواء.',
					'المحرار يقيس درجة الحرارة وليس الضغط.',
					'يتغير الضغط الجوي بالارتفاع وبالتغيرات المناخية.'
				],
				explanationAr:
					'يقاس الضغط الجوي بالبارومتر، وكلما ارتفعنا قلّ وزن عمود الهواء فوقنا فتقل قيمة الضغط الجوي.'
			}
		]
	}
];
