import type { PhysicsInteractiveLessonData } from '../../types';
import { wrapPhysicsSvg } from '../../svg-physics';

// ===========================================================================
// Bespoke FreeMono-Free SVG Builders for 1AS TCL Physics T2 (Optics)
// ===========================================================================

function svgOpticalMediaAndAlignedHoles(): string {
	let body = `<defs>
		<marker id="omArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الأوساط الضوئية ومبدأ الانتشار المستقيم للضوء</text>`;

	// Top row: 3 optical media cards
	body += `<rect x="20" y="42" width="132" height="58" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.3"/>`;
	body += `<text x="86" y="62" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">وسط شفاف</text>`;
	body += `<text x="86" y="82" text-anchor="middle" font-size="10" fill="#334155">الهواء، الزجاج الأملس</text>`;

	body += `<rect x="164" y="42" width="132" height="58" rx="6" fill="#fefce8" stroke="#eab308" stroke-width="1.3"/>`;
	body += `<text x="230" y="62" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#854d0e">وسط شاف</text>`;
	body += `<text x="230" y="82" text-anchor="middle" font-size="10" fill="#334155">الورق المزيت، الضباب</text>`;

	body += `<rect x="308" y="42" width="132" height="58" rx="6" fill="#f1f5f9" stroke="#475569" stroke-width="1.3"/>`;
	body += `<text x="374" y="62" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">وسط عاتم</text>`;
	body += `<text x="374" y="82" text-anchor="middle" font-size="10" fill="#334155">الخشب، الورق المقوى</text>`;

	// Bottom row: 3 aligned pinholes experiment
	body += `<circle cx="52" cy="148" r="9" fill="#fde047" stroke="#ca8a04" stroke-width="1.6"/>`;
	body += `<text x="52" y="176" text-anchor="middle" font-size="10" font-weight="bold" fill="#854d0e">منبع ضوئي</text>`;
	for (const px of [125, 210, 295]) {
		body += `<rect x="${px}" y="114" width="7" height="28" fill="#334155"/>`;
		body += `<rect x="${px}" y="154" width="7" height="28" fill="#334155"/>`;
	}
	body += `<line x1="62" y1="148" x2="365" y2="148" stroke="#dc2626" stroke-width="2" marker-end="url(#omArr)"/>`;
	body += `<ellipse cx="394" cy="148" rx="15" ry="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<circle cx="390" cy="148" r="4" fill="#1d4ed8"/>`;
	body += `<text x="394" y="176" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">عين الملاحظ</text>`;
	body += `<text x="230" y="195" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">الثقوب على استقامة واحدة: ينتشر الضوء في خطوط مستقيمة</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgCameraObscuraDiagram(): string {
	let body = `<defs>
		<marker id="coArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="27" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الغرفة المظلمة (تشكّل صورة حقيقية مقلوبة)</text>`;

	// Upright object AB on left at x=62 (y=140 down to y=74)
	body += `<line x1="62" y1="142" x2="62" y2="76" stroke="#dc2626" stroke-width="3"/>`;
	body += `<polygon points="56,82 62,70 68,82" fill="#dc2626"/>`;
	body += `<text x="48" y="76" text-anchor="end" font-size="11.5" font-weight="bold" fill="#dc2626">B</text>`;
	body += `<text x="48" y="146" text-anchor="end" font-size="11.5" font-weight="bold" fill="#dc2626">A</text>`;

	// Dark box from x=196 to x=394, y=46 to y=170
	body += `<rect x="196" y="46" width="198" height="124" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>`;
	// Pinhole at x=196, y=108
	body += `<rect x="194" y="103" width="4" height="10" fill="#fde047"/>`;
	body += `<text x="196" y="40" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">ثقب صغير (O)</text>`;

	// Translucent screen on right wall x=390
	body += `<rect x="388" y="48" width="6" height="120" fill="#fef3c7"/>`;
	body += `<text x="412" y="112" font-size="10.5" font-weight="bold" fill="#334155">شاشة</text>`;
	body += `<text x="412" y="128" font-size="10" fill="#475569">(شاف)</text>`;

	// Crossing light rays:
	// B(62,74) -> O(196,108) -> B'(388, 156.6)
	// A(62,142) -> O(196,108) -> A'(388, 59.4)
	body += `<line x1="62" y1="74" x2="388" y2="156.6" stroke="#facc15" stroke-width="1.6"/>`;
	body += `<line x1="62" y1="142" x2="388" y2="59.4" stroke="#fb923c" stroke-width="1.6"/>`;

	// Inverted image A'B' on screen at x=385
	body += `<line x1="383" y1="60" x2="383" y2="154" stroke="#38bdf8" stroke-width="3"/>`;
	body += `<polygon points="378,148 383,157 388,148" fill="#38bdf8"/>`;
	body += `<text x="372" y="64" text-anchor="end" font-size="11" font-weight="bold" fill="#bae6fd">A'</text>`;
	body += `<text x="372" y="160" text-anchor="end" font-size="11" font-weight="bold" fill="#bae6fd">B'</text>`;

	// Distance labels d and d'
	body += `<line x1="62" y1="184" x2="196" y2="184" stroke="#2563eb" stroke-width="1.4"/>`;
	body += `<text x="129" y="197" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">d (بعد الجسم)</text>`;
	body += `<line x1="196" y1="184" x2="388" y2="184" stroke="#059669" stroke-width="1.4"/>`;
	body += `<text x="292" y="197" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">d' (عمق الغرفة)</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgPointVsExtendedShadows(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f8fafc">الظل والظليل: مقارنة بين المنبع النقطي والمنبع الواسع</text>`;

	// Left panel: Point source
	body += `<rect x="18" y="40" width="204" height="148" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>`;
	body += `<text x="120" y="58" text-anchor="middle" font-size="11" font-weight="bold" fill="#fde047">1. منبع نقطي (ظل تام فقط)</text>`;
	body += `<circle cx="42" cy="112" r="4.5" fill="#fde047"/>`;
	body += `<rect x="192" y="68" width="8" height="96" fill="#fef9c3"/>`;
	body += `<rect x="192" y="92" width="8" height="48" fill="#020617"/>`;
	body += `<line x1="42" y1="112" x2="192" y2="92" stroke="#facc15" stroke-width="1.2" stroke-dasharray="4,2"/>`;
	body += `<line x1="42" y1="112" x2="192" y2="132" stroke="#facc15" stroke-width="1.2" stroke-dasharray="4,2"/>`;
	body += `<circle cx="110" cy="112" r="14" fill="#64748b"/>`;
	body += `<path d="M 110 98 A 14 14 0 0 1 110 126 Z" fill="#0f172a"/>`;
	body += `<text x="120" y="178" text-anchor="middle" font-size="10" fill="#cbd5e1">حواف الظل المحمول حادة وواضحة</text>`;

	// Right panel: Extended source
	body += `<rect x="238" y="40" width="204" height="148" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>`;
	body += `<text x="340" y="58" text-anchor="middle" font-size="11" font-weight="bold" fill="#fde047">2. منبع واسع (ظل تام + ظليل)</text>`;
	body += `<ellipse cx="262" cy="112" rx="6" ry="20" fill="#fde047"/>`;
	body += `<rect x="412" y="68" width="8" height="96" fill="#fef9c3"/>`;
	body += `<rect x="412" y="80" width="8" height="72" fill="#94a3b8"/>`;
	body += `<rect x="412" y="98" width="8" height="28" fill="#020617"/>`;
	body += `<line x1="262" y1="92" x2="412" y2="98" stroke="#facc15" stroke-width="1.1" stroke-dasharray="3,2"/>`;
	body += `<line x1="262" y1="132" x2="412" y2="126" stroke="#facc15" stroke-width="1.1" stroke-dasharray="3,2"/>`;
	body += `<line x1="262" y1="92" x2="412" y2="152" stroke="#fb923c" stroke-width="1.1" stroke-dasharray="3,2"/>`;
	body += `<line x1="262" y1="132" x2="412" y2="80" stroke="#fb923c" stroke-width="1.1" stroke-dasharray="3,2"/>`;
	body += `<circle cx="330" cy="112" r="15" fill="#64748b"/>`;
	body += `<path d="M 330 97 A 15 15 0 0 1 330 127 Z" fill="#0f172a"/>`;
	body += `<text x="340" y="178" text-anchor="middle" font-size="10" fill="#cbd5e1">يحيط بالظل التام منطقة ظليل رمادية</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgSolarAndLunarEclipse(): string {
	let body = `<rect x="8" y="8" width="444" height="198" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="230" y="27" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f8fafc">ظاهرتا الكسوف والخسوف (اصطفاف الشمس والأرض والقمر)</text>`;

	// Top row: Solar Eclipse
	body += `<text x="434" y="66" text-anchor="end" font-size="11.5" font-weight="bold" fill="#fde047">كسوف الشمس (نهارا - محاق):</text>`;
	body += `<circle cx="58" cy="66" r="18" fill="#facc15"/>`;
	body += `<text x="58" y="96" text-anchor="middle" font-size="10" fill="#fde047">الشمس</text>`;
	body += `<polygon points="58,48 168,59 168,73 58,84" fill="#fef08a" opacity="0.22"/>`;
	body += `<polygon points="168,59 250,66 168,73" fill="#020617" opacity="0.9"/>`;
	body += `<circle cx="168" cy="66" r="7" fill="#94a3b8"/>`;
	body += `<text x="168" y="96" text-anchor="middle" font-size="10" fill="#cbd5e1">القمر</text>`;
	body += `<circle cx="254" cy="66" r="13" fill="#3b82f6"/>`;
	body += `<text x="254" y="96" text-anchor="middle" font-size="10" fill="#93c5fd">الأرض</text>`;

	// Divider
	body += `<line x1="24" y1="108" x2="436" y2="108" stroke="#334155" stroke-width="1"/>`;

	// Bottom row: Lunar Eclipse
	body += `<text x="434" y="144" text-anchor="end" font-size="11.5" font-weight="bold" fill="#93c5fd">خسوف القمر (ليلا - بدر):</text>`;
	body += `<circle cx="58" cy="144" r="18" fill="#facc15"/>`;
	body += `<text x="58" y="174" text-anchor="middle" font-size="10" fill="#fde047">الشمس</text>`;
	body += `<polygon points="165,131 280,140 280,148 165,157" fill="#020617" opacity="0.9"/>`;
	body += `<circle cx="165" cy="144" r="13" fill="#3b82f6"/>`;
	body += `<text x="165" y="174" text-anchor="middle" font-size="10" fill="#93c5fd">الأرض</text>`;
	body += `<circle cx="254" cy="144" r="7" fill="#dc2626"/>`;
	body += `<text x="254" y="174" text-anchor="middle" font-size="10" fill="#fca5a5">القمر</text>`;

	body += `<text x="230" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fca5a5">تحذير: يمنع النظر مباشرة إلى الشمس أثناء الكسوف دون نظارات واقية خاصة</text>`;

	return wrapPhysicsSvg(460, 214, body);
}

function svgPlaneMirrorReflection(): string {
	let body = `<defs>
		<marker id="mrRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/>
		</marker>
		<marker id="mrBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">قانون انعكاس الضوء على مرآة مستوية (i = i')</text>`;

	// Mirror horizontal at y=132
	body += `<line x1="40" y1="132" x2="290" y2="132" stroke="#0f172a" stroke-width="2.6"/>`;
	for (let x = 44; x < 288; x += 12) {
		body += `<line x1="${x}" y1="132" x2="${x - 6}" y2="140" stroke="#64748b" stroke-width="1.2"/>`;
	}
	body += `<text x="48" y="156" font-size="10.5" font-weight="bold" fill="#334155">مرآة مستوية</text>`;

	// Normal at x=165
	body += `<line x1="165" y1="44" x2="165" y2="132" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4,3"/>`;
	body += `<text x="165" y="40" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">الناظم (N)</text>`;

	// Incident ray (85, 56) -> (165, 132)
	body += `<line x1="85" y1="56" x2="165" y2="132" stroke="#dc2626" stroke-width="2.2" marker-end="url(#mrRed)"/>`;
	body += `<text x="92" y="86" font-size="10.5" font-weight="bold" fill="#dc2626">شعاع وارد</text>`;
	body += `<text x="148" y="96" font-size="11.5" font-weight="bold" fill="#dc2626">i</text>`;

	// Reflected ray (165, 132) -> (245, 56)
	body += `<line x1="165" y1="132" x2="245" y2="56" stroke="#2563eb" stroke-width="2.2" marker-end="url(#mrBlue)"/>`;
	body += `<text x="236" y="86" font-size="10.5" font-weight="bold" fill="#2563eb">شعاع منعكس</text>`;
	body += `<text x="178" y="96" font-size="11.5" font-weight="bold" fill="#2563eb">i'</text>`;
	body += `<text x="165" y="150" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">نقطة الورود I</text>`;

	// Info card on right
	body += `<rect x="304" y="46" width="136" height="136" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.3"/>`;
	body += `<text x="372" y="68" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">خصائص الصورة</text>`;
	body += `<text x="372" y="92" text-anchor="middle" font-size="10.5" fill="#0f172a">1. زاوية الورود = الانعكاس</text>`;
	body += `<text x="372" y="114" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">i = i'</text>`;
	body += `<text x="372" y="138" text-anchor="middle" font-size="10.5" fill="#0f172a">2. صورة وهمية ومعتدلة</text>`;
	body += `<text x="372" y="160" text-anchor="middle" font-size="10.5" fill="#0f172a">3. مساوية للجسم ومتناظرة</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgRefractionAndOpticalFiber(): string {
	let body = `<defs>
		<marker id="rfRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/>
		</marker>
		<marker id="rfBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="444" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;

	// Left: Air -> Water refraction
	body += `<rect x="18" y="20" width="204" height="170" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<rect x="19" y="106" width="202" height="83" fill="#dbeafe"/>`;
	body += `<line x1="20" y1="106" x2="220" y2="106" stroke="#1d4ed8" stroke-width="1.6"/>`;
	body += `<line x1="120" y1="42" x2="120" y2="176" stroke="#64748b" stroke-width="1.2" stroke-dasharray="4,2"/>`;
	body += `<text x="120" y="38" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">انكسار (هواء / ماء)</text>`;
	body += `<text x="30" y="96" font-size="10" font-weight="bold" fill="#475569">هواء (n=1)</text>`;
	body += `<text x="30" y="124" font-size="10" font-weight="bold" fill="#1e3a8a">ماء (n=1.33)</text>`;
	body += `<line x1="62" y1="50" x2="120" y2="106" stroke="#dc2626" stroke-width="2" marker-end="url(#rfRed)"/>`;
	body += `<line x1="120" y1="106" x2="154" y2="174" stroke="#2563eb" stroke-width="2" marker-end="url(#rfBlue)"/>`;
	body += `<text x="102" y="74" font-size="10.5" font-weight="bold" fill="#dc2626">i<tspan dy="3" font-size="72%">1</tspan></text>`;
	body += `<text x="128" y="148" font-size="10.5" font-weight="bold" fill="#2563eb">i<tspan dy="3" font-size="72%">2</tspan></text>`;

	// Right: Optical Fiber (Total Internal Reflection)
	body += `<rect x="238" y="20" width="204" height="170" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>`;
	body += `<text x="340" y="42" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">تطبيق: الألياف البصرية</text>`;
	body += `<rect x="252" y="72" width="176" height="58" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>`;
	body += `<polyline fill="none" stroke="#facc15" stroke-width="2.2" points="256,102 296,74 344,128 392,74 424,106"/>`;
	body += `<text x="340" y="152" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">انعكاس كلي متكرر داخل الليف</text>`;
	body += `<text x="340" y="172" text-anchor="middle" font-size="10" fill="#cbd5e1">نقل الإنترنت والبيانات بسرعة فائقة</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgPrismRainbowDispersion(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="230" y="29" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f8fafc">تبدد الضوء الأبيض عبر الموشور الزجاجي (7 ألوان)</text>`;

	// Prism
	body += `<polygon points="186,48 128,162 244,162" fill="#bae6fd" fill-opacity="0.28" stroke="#7dd3fc" stroke-width="2"/>`;
	// White beam
	body += `<line x1="28" y1="126" x2="152" y2="112" stroke="#ffffff" stroke-width="3.2"/>`;
	body += `<text x="80" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">ضوء أبيض</text>`;

	const spectrum = [
		{ col: '#ef4444', yOut: 118, yEnd: 92 },
		{ col: '#f97316', yOut: 122, yEnd: 104 },
		{ col: '#eab308', yOut: 126, yEnd: 116 },
		{ col: '#22c55e', yOut: 130, yEnd: 128 },
		{ col: '#3b82f6', yOut: 134, yEnd: 140 },
		{ col: '#6366f1', yOut: 138, yEnd: 152 },
		{ col: '#a855f7', yOut: 142, yEnd: 164 }
	];
	for (const s of spectrum) {
		body += `<polyline fill="none" stroke="${s.col}" stroke-width="2.1" points="152,112 218,${s.yOut} 326,${s.yEnd}"/>`;
	}

	body += `<rect x="326" y="82" width="8" height="92" fill="#e2e8f0"/>`;
	body += `<text x="342" y="96" font-size="10.5" font-weight="bold" fill="#fca5a5">أحمر (أقل انحرافا)</text>`;
	body += `<text x="342" y="130" font-size="10.5" fill="#fde047">طيف مستمر</text>`;
	body += `<text x="342" y="166" font-size="10.5" font-weight="bold" fill="#d8b4fe">بنفسجي (أكثر انحرافا)</text>`;
	body += `<text x="230" y="189" text-anchor="middle" font-size="10.5" fill="#cbd5e1">الليزر وحيد اللون لا يتبدد بينما الضوء الأبيض متعدد الألوان يتبدد</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

function svgLightSpeedAndLightYear(): string {
	let body = `<rect x="8" y="8" width="444" height="194" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f8fafc">سرعة الضوء في الفراغ والسنة الضوئية (وحدة مسافة)</text>`;

	// Sun & Earth
	body += `<circle cx="56" cy="88" r="20" fill="#facc15"/>`;
	body += `<text x="56" y="124" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">الشمس</text>`;
	body += `<circle cx="212" cy="88" r="11" fill="#3b82f6"/>`;
	body += `<text x="212" y="124" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#93c5fd">الأرض</text>`;
	body += `<line x1="78" y1="88" x2="198" y2="88" stroke="#fde047" stroke-width="1.8" stroke-dasharray="4,2"/>`;
	body += `<text x="138" y="76" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">150 مليون km</text>`;
	body += `<text x="138" y="106" text-anchor="middle" font-size="10" fill="#86efac">يقطعها الضوء في 8 min 20 s</text>`;

	// Distant star & Light-year card
	body += `<rect x="248" y="44" width="190" height="114" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>`;
	body += `<text x="343" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#fde047">ثوابت فلكية أساسية</text>`;
	body += `<text x="343" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">c = 300 000 km/s</text>`;
	body += `<text x="343" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#38bdf8">1 a.l. = 9.46 × 10<tspan dy="-4" font-size="72%">12</tspan><tspan dy="4"> km</tspan></text>`;
	body += `<text x="343" y="144" text-anchor="middle" font-size="10" fill="#cbd5e1">(السنة الضوئية تقيس المسافة)</text>`;

	body += `<text x="230" y="184" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#e2e8f0">رؤية نجم يبعد عنا 4 سنوات ضوئية تعني أننا نراه كما كان قبل 4 سنوات</text>`;

	return wrapPhysicsSvg(460, 210, body);
}

// ===========================================================================
// Exported Trimester 2 Interactive Lessons for 1AS TCL Physics
// ===========================================================================

export const PHYSICS_LESSONS_1AS_TCL_T2: PhysicsInteractiveLessonData[] = [
	// -------------------------------------------------------------------------
	// Lesson 1: Light Sources, Optical Media, Rectilinear Propagation & Dark Chamber
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t2_light_sources_media_camera_obscura',
		slug: 'phy-1as-tcl-t2-light-sources-media-camera-obscura',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المجال 2: الإنسان والاتصال — الضوء',
		order: 1,
		titleAr: 'المنابع والأوساط الضوئية والانتشار المستقيم للضوء والغرفة المظلمة',
		objectives: [
			'التمييز بين المنابع الضوئية المضيئة والأجسام المضاءة، وتصنيف الأوساط إلى شفافة وشافة وعاتمة',
			'إثبات مبدأ الانتشار المستقيم للضوء تجريبياً وتطبيق شرط الرؤية المباشرة لجسم',
			'وصف مبدأ عمل الغرفة المظلمة (بيت مظلم للحسن بن الهيثم) وتفسير انقلاب الصورة وحساب طولها'
		],
		keywordsAr: [
			'منبع مضيء ومضاء',
			'وسط شفاف وشاف وعاتم',
			'الانتشار المستقيم',
			'الغرفة المظلمة',
			'صورة مقلوبة',
			'الحسن بن الهيثم'
		],
		discover: {
			scenarioAr:
				'في حصة البصريات، أحضر التلاميذ صندوقاً مغلقاً أسود الداخل به ثقب صغير في واجهته الأمامية وورق شفاف (شاف) في واجهته الخلفية (الغرفة المظلمة)، ووضعوا أمام الثقب شمعة مشتعلة طول لهبها $AB = 6\\,\\text{cm}$.',
			svg: svgOpticalMediaAndAlignedHoles(),
			steps: [
				{
					promptAr:
						'صنّف كلّاً من (الشمعة المشتعلة، القمر، الزجاج المصنفر، الخشب) حسب دوره الضوئي أو طبيعته كوسط.',
					hintAr: 'الجسم المضيء ينتج الضوء؛ والزجاج المصنفر يسمح بمرور جزء من الضوء دون وضوح.',
					expectedInput: 'الشمعة مضيئة والقمر مضاء والزجاج المصنفر شاف والخشب عاتم',
					revealAr:
						'الشمعة المشتعلة **منبع مضيء**، القمر **جسم مضاء** (يعكس ضوء الشمس)، الزجاج المصنفر **وسط شاف**، والخشب **وسط عاتم**.'
				},
				{
					promptAr:
						'عند النظر إلى شاشة الغرفة المظلمة، كيف تبدو صورة لهب الشمعة: معتدلة أم مقلوبة؟ وما المبدأ الضوئي المفسر لذلك؟',
					hintAr: 'الأشعة القادمة من أعلى اللهب وأسفله تتقاطع عند الثقب الصغير وتسير في خطوط مستقيمة.',
					expectedInput: 'مقلوبة بسبب الانتشار المستقيم للضوء',
					revealAr:
						'تبدو الصورة **حقيقية ومقلوبة** على الشاشة، لأن **الضوء ينتشر في خطوط مستقيمة** عبر الثقب الصغير فيتقاطع الشعاع العلوي مع السفلي.'
				},
				{
					promptAr:
						'ماذا يحدث لصورة الشمعة إذا وسّعنا قطر الثقب في الغرفة المظلمة كثيراً؟',
					hintAr: 'يدخل ضوء أكثر لكن الأشعة من النقطة الواحدة تتداخل على الشاشة.',
					expectedInput: 'أكثر إضاءة وأقل وضوحاً',
					revealAr:
						'تصبح الصورة **أكثر إضاءة** ولكنها **أقل وضوحاً (مشوشة)** لأن حزمة أوسع من الأشعة تمر من كل نقطة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المنابع الضوئية**:\n- **الأجسام المضيئة**: تُصدر الضوء بنفسها، طبيعية (الشمس، النجوم، البرق) أو اصطناعية (المصباح، الشمعة).\n- **الأجسام المضاءة**: لا تُنتج الضوء بل تنثر (تعكس) جزءاً من الضوء الذي تتلقاه (القمر، الكواكب، الكتاب، السبورة).',
				'**الأوساط الضوئية**:\n- **الوسط الشفاف**: يمرر الضوء ويسمح برؤية الأجسام بوضوح (الهواء، الماء الصافي، الزجاج الأملس).\n- **الوسط الشاف**: يمرر جزءاً من الضوء ولا يسمح برؤية واضحة (الورق المزيت، الزجاج المحبب، الضباب).\n- **الوسط العاتم**: يمنع مرور الضوء تماماً (الخشب، الحديد، الورق المقوى).',
				'**الانتشار المستقيم للضوء وشرط الرؤية**: ينتشر الضوء في الوسط الشفاف المتجانس في **خطوط مستقيمة**. ولرؤية جسم يجب أن يصل الضوء المنبعث أو المنعكس عنه إلى عين الملاحظ.',
				'**الغرفة المظلمة (إنجاز العالم المسلم الحسن بن الهيثم)**: علبة معتمة ذات ثقب صغير في أحد أوجهها وشاشة شافة في الوجه المقابل، تتشكل عليها **صورة حقيقية ومقلوبة** للشيء المضاء. يرتبط طول الصورة $A\'B\'$ بطول الجسم $AB$ بعلاقة طاليس:\n$$\\frac{A\'B\'}{AB} = \\frac{d\'}{d}$$\nحيث $d$ بُعد الجسم عن الثقب و$d\'$ عمق الغرفة (بُعد الشاشة عن الثقب).'
			],
			visualSvg: svgCameraObscuraDiagram(),
			visualCaptionAr: 'مسار الأشعة المستقيمة داخل الغرفة المظلمة وتشكّل الصورة المقلوبة A\'B\'',
			examples: [
				{
					problemAr:
						'نضع شجرة طولها $AB = 6\\,\\text{m}$ على بُعد $d = 12\\,\\text{m}$ من ثقب غرفة مظلمة عمقها $d\' = 30\\,\\text{cm}$. احسب طول صورة الشجرة $A\'B\'$ على الشاشة.',
					solutionAr:
						'نوحّد وحدات المسافات: $d = 12\\,\\text{m}$ و$d\' = 0.3\\,\\text{m}$ (أو كلاهما بالسنتيمتر).\nنطبق علاقة الغرفة المظلمة:\n$$A\'B\' = AB \\times \\frac{d\'}{d} = 6 \\times \\frac{0.3}{12} = 0.15\\,\\text{m} = 15\\,\\text{cm}$$\nوتكون الصورة مقلوبة وحقيقية.'
				},
				{
					problemAr:
						'لماذا استطاع الحسن بن الهيثم في كتابه «المناظر» تصحيح اعتقاد الإغريق القديم بأن العين ترسل أشعة نحو الأجسام؟',
					solutionAr:
						'أثبت بن الهيثم عبر تجارب الغرفة المظلمة أن **الضوء يخرج من الأجسام المضيئة أو المضاءة ويدخل إلى العين** (وليس العكس)، مما أسس لعلم البصريات الحديث وفكرة آلة التصوير.'
				}
			],
			watchOutAr:
				'احذر عند تطبيق علاقة الغرفة المظلمة $\\frac{A\'B\'}{AB} = \\frac{d\'}{d}$ من خلط الوحدات بين $d$ (غالباً بالمتر $\\text{m}$) و$d\'$ (غالباً بالسنتيمتر $\\text{cm}$)! يجب تحويلهما إلى نفس الوحدة قبل القسمة.'
		},
		practice: [
			{
				questionAr:
					'يُوضع جسم مضاء ارتفاعه $AB = 40\\,\\text{cm}$ على بُعد $d = 2\\,\\text{m}$ أمام ثقب غرفة مظلمة عمقها $d\' = 25\\,\\text{cm}$. ما طول الصورة المتشكلة على الشاشة وما صفتها؟',
				options: [
					'$5\\,\\text{cm}$ ومعتدلة',
					'$5\\,\\text{cm}$ ومقلوبة',
					'$3.2\\,\\text{cm}$ ومقلوبة',
					'$20\\,\\text{cm}$ ومعتدلة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الطول صحيح ($5\\,\\text{cm}$) لكن الصورة في الغرفة المظلمة تكون مقلوبة دوماً لا معتدلة!',
					'أحسنت! $d = 200\\,\\text{cm}$، إذن $A\'B\' = 40 \\times \\frac{25}{200} = 5\\,\\text{cm}$ وتكون مقلوبة.',
					'راجع عملية الضرب والقسمة بعد توحيد الوحدات.',
					'الغرفة المظلمة تعطي صورة مقلوبة بسبب تقاطع الأشعة عند الثقب.'
				],
				explanationAr:
					'نحوّل $d = 2\\,\\text{m} = 200\\,\\text{cm}$، ومنه $A\'B\' = 40 \\times \\frac{25}{200} = 5\\,\\text{cm}$، وبسبب الانتشار المستقيم للضوء تكون الصورة مقلوبة.'
			},
			{
				questionAr:
					'في غرفة مظلمة، قرّبنا الجسم المضيء من الثقب (أنقصنا المسافة $d$) مع بقاء عمق الغرفة $d\'$ ثابتاً. ماذا يحدث لحجم الصورة على الشاشة؟',
				options: ['يصغر حجمها', 'يكبر حجمها', 'يبقى حجمها ثابتاً', 'تتحول إلى صورة معتدلة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكس ذلك: إبعاد الجسم هو الذي يصغّر الصورة.',
					'صحيح! حسب العلاقة $A\'B\' = AB \\times \\frac{d\'}{d}$، نقصان المقام $d$ يزيد من طول الصورة.',
					'يتغير حجم الصورة بتغير البُعد عن الثقب.',
					'تبقى الصورة مقلوبة دوماً ما دام الضوء ينتشر في خطوط مستقيمة.'
				],
				explanationAr:
					'كلما اقترب الجسم من ثقب الغرفة المظلمة زادت زاوية ورود الأشعة وكَبُر طول الصورة $A\'B\'$.'
			},
			{
				questionAr: 'أيّ من الأجسام التالية يُعدّ جسماً **مضاءً** وليس جسماً مضيئاً بذاته؟',
				options: ['الشمس', 'البرق', 'القمر', 'شمعة مشتعلة'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الشمس نجم مضيء طبيعي ينتج الضوء.',
					'البرق ظاهرة مضيئة طبيعية تصدر الضوء.',
					'ممتاز! القمر جسم معتم بارد يعكس ضوء الشمس الساقط عليه فنراه مضاءً.',
					'الشمعة المشتعلة منبع مضيء اصطناعي.'
				],
				explanationAr: 'القمر لا ينتج ضوءاً بنفسه، بل يعكس ضوء الشمس نحو الأرض لذا فهو جسم مضاء.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 2: Light Ray Model, Shadows & Eclipses
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t2_light_ray_shadows_eclipses',
		slug: 'phy-1as-tcl-t2-light-ray-shadows-eclipses',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المجال 2: الإنسان والاتصال — الضوء',
		order: 2,
		titleAr: 'نموذج الشعاع الضوئي، الظل والظليل، وظاهرتا الكسوف والخسوف',
		objectives: [
			'تمثيل انتشار الضوء بنموذج الشعاع الضوئي والحزمة الضوئية (متوازية، متباعدة، متقاربة)',
			'التمييز بين الظل الذاتي، الظل المحمول (التام)، والظليل عند الإضاءة بمنبع نقطي ومنبع واسع',
			'تفسير ظاهرتي كسوف الشمس وخسوف القمر هندسياً كآيتين من آيات الله تدعوان للتفكر والابتعاد عن الخرافات'
		],
		keywordsAr: [
			'الشعاع الضوئي',
			'الحزمة الضوئية',
			'الظل التام',
			'الظليل',
			'كسوف الشمس',
			'خسوف القمر'
		],
		discover: {
			scenarioAr:
				'أضاء الأستاذ كرة عاتمة أمام شاشة بيضاء بمصباح صغير جداً (منبع نقطي) أولاً، ثم بمصباح كبير واسع ثانياً. لاحظ التلاميذ تغير مظهر الظل على الشاشة، ثم ربط الأستاذ الظاهرة بكسوف الشمس وخسوف القمر.',
			svg: svgPointVsExtendedShadows(),
			steps: [
				{
					promptAr:
						'ما الفرق الرئيسي الذي يظهر على الشاشة بين إضاءة الكرة بمنبع نقطي وإضاءتها بمنبع واسع؟',
					hintAr: 'هل توجد منطقة نصف مضاءة (رمادية) مع المنبع النقطي؟',
					expectedInput: 'الظليل يظهر مع المنبع الواسع فقط',
					revealAr:
						'المنبع النقطي يكوّن **ظلاً تاماً** فقط بحدود حادة، بينما المنبع الواسع يكوّن **ظلاً تاماً** محاطاً بمنطقة شبه مضاءة تُسمى **الظليل**.'
				},
				{
					promptAr:
						'إذا نظر مراقب من منطقة **الظليل** باتجاه المنبع الضوئي الواسع، كيف يرى المنبع؟',
					hintAr: 'هل تحجب الكرة العاتمة كل المنبع أم جزءاً منه فقط؟',
					expectedInput: 'يرى جزءاً من المنبع',
					revealAr:
						'في منطقة **الظليل** يرى المراقب **جزءاً فقط** من المنبع الضوئي (رؤية جزئية)، أما في **الظل التام** فلا يراه إطلاقاً.'
				},
				{
					promptAr:
						'عند حدوث **كسوف الشمس**، أي جرم سماوي يقع في الوسط بين الجرمين الآخرين، وفي أي طور يكون القمر؟',
					hintAr: 'يحجب القمر ضوء الشمس عن جزء من الأرض نهاراً.',
					expectedInput: 'القمر في الوسط ويكون محاقاً',
					revealAr:
						'في كسوف الشمس يقع **القمر في الوسط** بين الشمس والأرض (`الشمس ← القمر ← الأرض`)، ويكون القمر في طور **المحاق**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**نموذج الشعاع الضوئي والحزمة الضوئية**: نمثّل مسار الضوء بخط مستقيم مزود بسهم يبين جهة الانتشار يُسمى **الشعاع الضوئي**. وتُسمى مجموعة الأشعة **حزمة ضوئية** (متوازية كأشعة الليزر، متباعدة كالمصباح، متقاربة كالعدسة المجمعة).',
				'**الظل والظليل**:\n- **الظل الذاتي**: الجزء غير المضاء من سطح الجسم العاتم.\n- **الظل التام (الظل المحمول)**: منطقة خلف الجسم العاتم لا يصلها أي شعاع ضوئي (انعدام الرؤية).\n- **الظليل**: منطقة تحيط بالظل التام عند الإضاءة **بمنبع واسع** يصلها جزء من أشعة المنبع فقط (رؤية جزئية للمنبع).',
				'**ظاهرتا الكسوف والخسوف (آية عظيمة من آيات الله)**: تحدثان وفق قوانين الانتشار المستقيم للضوء عند اصطفاف الشمس والأرض والقمر على استقامة واحدة، وهما آية من آيات الله تدل على دقة نظام الكون:\n- **كسوف الشمس**: يحدث **نهاراً** في طور **المحاق** عندما يقع **القمر بين الشمس والأرض**، فيسقط ظل القمر التام على بقعة صغيرة من الأرض (**كسوف كلي**) وظليله على منطقة أوسع (**كسوف جزئي**).\n- **خسوف القمر**: يحدث **ليلاً** في طور **البدر** عندما تقع **الأرض بين الشمس والقمر**، فيدخل القمر في مخروط ظل الأرض كلياً (**خسوف كلي**) أو جزئياً (**خسوف جزئي**).',
				'**تنبيه وقائي هام**: يُمنع منعاً باتاً النظر إلى الشمس بالعين المجردة أو عبر منظار عادي أثناء الكسوف لتفادي احتراق شبكية العين، بل تُستعمل نظارات كسوف معتمدة أو إسقاط الصورة عبر الغرفة المظلمة.'
			],
			visualSvg: svgSolarAndLunarEclipse(),
			visualCaptionAr: 'تمثيل هندسي لظاهرتي كسوف الشمس (القمر في الوسط) وخسوف القمر (الأرض في الوسط)',
			examples: [
				{
					problemAr:
						'رصد سكان مدينة جزائرية اختفاءً كاملاً لقرص الشمس في منتصف النهار لبضع دقائق، بينما رآه سكان مدينة أخرى مجاورة منقوصاً فقط. فسر ذلك علمياً.',
					solutionAr:
						'سكان المدينة الأولى كانوا داخل بقعة **الظل التام** للقمر على الأرض فشاهدوا **كسوفاً كلياً**، بينما كان سكان المدينة الثانية داخل منطقة **الظليل** فشاهدوا **كسوفاً جزئياً** للشمس.'
				},
				{
					problemAr:
						'لماذا لا يحدث خسوف القمر في كل شهر قمري عند اكتمال القمر بدراً؟',
					solutionAr:
						'لأن مستوى مدار القمر حول الأرض يميل بنحو $5^\\circ$ عن مستوى مدار الأرض حول الشمس، فلا يقع القمر والأرض والشمس على استقامة واحدة تامة في كل بدر.'
				}
			],
			watchOutAr:
				'احذر الخلط بين الترتيبين:\n- في **كسوف الشمس**: الترتيب `شمس ← قمر ← أرض` (القمر يحجب الشمس نهاراً وهو محاق).\n- في **خسوف القمر**: الترتيب `شمس ← أرض ← قمر` (الأرض تحجب ضوء الشمس عن القمر ليلاً وهو بدر).'
		},
		practice: [
			{
				questionAr:
					'ما الترتيب الصحيح للأجرام الثلاثة عند حدوث **خسوف القمر**، وفي أي طور يكون القمر؟',
				options: [
					'الشمس ← القمر ← الأرض (القمر محاق)',
					'الشمس ← الأرض ← القمر (القمر بدر)',
					'الأرض ← الشمس ← القمر (القمر هلال)',
					'القمر ← الشمس ← الأرض (القمر بدر)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا الترتيب يوافق كسوف الشمس وليس خسوف القمر.',
					'ممتاز! تقع الأرض بين الشمس والقمر عندما يكون القمر بدراً فتسقط عليه ظلها ليلاً.',
					'الشمس لا تقع بين الأرض والقمر.',
					'القمر يدور حول الأرض ولا تقع الشمس بينهما.'
				],
				explanationAr:
					'في خسوف القمر تحجب الأرض ضوء الشمس عن القمر البدر، فيكون الترتيب: الشمس ← الأرض ← القمر.'
			},
			{
				questionAr:
					'يلاحظ شخص واقف في نقطة $M$ خلف كرة عاتمة مضاءة بمنبع ضوئي واسع أنه يرى **نصف** قرص المنبع الضوئي فقط. في أي منطقة يقع هذا الشخص؟',
				options: ['منطقة الظل الذاتي', 'منطقة الظل التام', 'منطقة الظليل', 'المنطقة المضاءة كلياً'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الظل الذاتي يوجد على سطح الكرة العاتمة نفسها.',
					'في الظل التام تنعدم رؤية المنبع كلياً.',
					'صحيح! الرؤية الجزئية للمنبع الضوئي الواسع تميز منطقة الظليل.',
					'في المنطقة المضاءة يرى الشخص كامل المنبع الضوئي.'
				],
				explanationAr:
					'تستقبل منطقة الظليل جزءاً فقط من أشعة المنبع الواسع، لذلك يرى المراقب فيها جزءاً من المنبع.'
			},
			{
				questionAr: 'ما الإجراء الوقائي الصحيح لمتابعة ظاهرة **كسوف الشمس** بأمان؟',
				options: [
					'استعمال نظارات شمسية سوداء عادية',
					'النظر مباشرة بالعين المجردة لبضع ثوانٍ فقط',
					'استعمال نظارات كسوف معتمدة أو الإسقاط عبر الغرفة المظلمة',
					'استعمال مكبر زجاجي لتوضيح قرص الشمس'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'النظارات الشمسية العادية لا تمنع الأشعة فوق البنفسجية وتحت الحمراء الضارة بالشبكية.',
					'النظر المباشر ولو لثوانٍ قد يسبب تلفاً دائماً للعين.',
					'صحيح! تحمي نظارات الكسوف المعتمدة العين، كما يتيح الإسقاط غير المباشر المشاهدة الآمنة.',
					'المكبر يركز أشعة الشمس ويحرق العين فوراً!'
				],
				explanationAr:
					'تُشاهد ظاهرة كسوف الشمس حصراً عبر نظارات خاصة معتمدة أو بالإسقاط غير المباشر.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 3: Reflection on Plane Mirror & Refraction + Applications
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t2_reflection_refraction_applications',
		slug: 'phy-1as-tcl-t2-reflection-refraction-applications',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المجال 2: الإنسان والاتصال — الضوء',
		order: 3,
		titleAr: 'انعكاس الضوء على مرآة مستوية وانكسار الضوء وتطبيقاتهما',
		objectives: [
			'صياغة قانوني الانعكاس على مرآة مستوية (i = i\') وتحديد خصائص الصورة المتشكلة (وهمية، معتدلة، متناظرة)',
			'تفسير ظاهرة انكسار الضوء عند انتقاله بين وسطين شفافين مختلفين وربطها بتغير سرعة الضوء',
			'التعرف على تطبيقات الانعكاس والانكسار في الحياة اليومية والتكنولوجيا (البيريسكوب، رؤية قلم منكسر، السراب، الألياف البصرية)'
		],
		keywordsAr: [
			'انعكاس الضوء',
			'المرآة المستوية',
			'زاوية الورود',
			'زاوية الانعكاس',
			'انكسار الضوء',
			'البيريسكوب',
			'الألياف البصرية'
		],
		discover: {
			scenarioAr:
				'سلّط تلميذ شعاع ليزر على مرآة مستوية أفقية فصنع الشعاع الوارد زاوية $35^\\circ$ مع **الناظم**، ثم وجّه نفس الشعاع نحو حوض زجاجي مملوء بالماء فلاحظ أن مسار الشعاع تغير داخل الماء، كما بدا له قلم الرصاص المغموس في الماء وكأنه منكسر!',
			svg: svgPlaneMirrorReflection(),
			steps: [
				{
					promptAr:
						'إذا كانت زاوية الورود على المرآة المستوية $i = 35^\\circ$ (مع الناظم)، فما قيمة زاوية الانعكاس $i\'$ وما الزاوية المحصورة بين الشعاعين الوارد والمنعكس؟',
					hintAr: 'حسب قانون الانعكاس: $i\' = i$.',
					expectedInput: '35 و 70',
					revealAr:
						'زاوية الانعكاس $i\' = i = 35^\\circ$، والزاوية الكلية بين الشعاع الوارد والشعاع المنعكس تساوي $i + i\' = 35^\\circ + 35^\\circ = 70^\\circ$.'
				},
				{
					promptAr:
						'إذا وقفت على بُعد $1.5\\,\\text{m}$ أمام مرآة حائط مستوية، فكم تبعد صورتك عن المرآة، وكم تبعد عنك؟',
					hintAr: 'الصورة متناظرة بالنسبة لمستوي المرآة ($d_{\\text{صورة}} = d_{\\text{جسم}}$).',
					expectedInput: '1.5 m و 3 m',
					revealAr:
						'تبعد صورتك عن المرآة **$1.5\\,\\text{m}$** خلفها، وبالتالي تبعد عنك مسافة $1.5 + 1.5 = 3\\,\\text{m}$.'
				},
				{
					promptAr:
						'لماذا ينكسر (ينحرف) الشعاع الضوئي عند عبوره من الهواء إلى الماء، بينما لا ينحرف إذا سقط عمودياً على السطح الفاصل؟',
					hintAr: 'سرعة الضوء في الماء أقل من سرعته في الهواء.',
					expectedInput: 'تغير سرعة انتشار الضوء',
					revealAr:
						'يحدث الانكسار بسبب **تغير سرعة الضوء** عند انتقاله من وسط شفاف إلى آخر (أو اختلاف قرينة الانكسار $n$)، وعند الورود العمودي ($i_1 = 0^\\circ$) ينفذ دون انحراف.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قانونا انعكاس الضوء على مرآة مستوية**:\n1) يقع الشعاع الوارد والشعاع المنعكس و**الناظم** (العمودي على المرآة عند نقطة الورود) في مستوٍ واحد.\n2) **زاوية الورود تساوي زاوية الانعكاس**: $i = i\'$.',
				'**خصائص الصورة في المرآة المستوية**: تكون الصورة المتشكلة لجسم أمام مرآة مستوية **وهمية** (تظهر خلف المرآة ولا يمكن استقبالها على شاشة)، **معتدلة**، **مساوية للجسم في الأبعاد**، **متناظرة** معه بالنسبة لمستوي المرآة، و**معكوسة جانبياً** (يمين الجسم يظهر يساراً في الصورة).',
				'**انكسار الضوء وقانون ديكارت**: هو تغير اتجاه الشعاع الضوئي عند اجتيازه السطح الفاصل بين وسطين شفافين مختلفين (مثل الهواء والماء أو الزجاج) بسبب تغير سرعته. يحقق علاقة سنيل-ديكارت: $n_1 \\sin i_1 = n_2 \\sin i_2$.\n- من وسط أقل كثافة ضوئية كالهواء ($n=1$) إلى وسط أشد كسراً كالماء ($n=1.33$) أو الزجاج ($n=1.5$): **يقترب الشعاع المنكسر من الناظم** ($i_2 < i_1$).\n- من الماء أو الزجاج إلى الهواء: **يبتعد عن الناظم** ($i_2 > i_1$)، وإذا فاقت زاوية الورود **الزاوية الحدية** يحدث **انعكاس كلي**.',
				'**تطبيقات يومية وتقنية**:\n- **تطبيقات الانعكاس**: **البيريسكوب** (منظار الغواصات بمرآتين مائلتين بزاوية $45^\\circ$)، مرايا السيارات، المرايا العاكسة في الطاقة الشمسية.\n- **تطبيقات الانكسار والانعكاس الكلي**: **العدسات والنظارات الطبية**، **الألياف البصرية** لنقل الاتصالات والإنترنت والمنظار الطبي، وظواهر **السراب** و**العمق الظاهري** وانكسار القلم في كأس ماء.'
			],
			visualSvg: svgRefractionAndOpticalFiber(),
			visualCaptionAr: 'انكسار الضوء بين الهواء والماء، ومبدأ الانعكاس الكلي داخل الألياف البصرية',
			examples: [
				{
					problemAr:
						'يرد شعاع ضوئي على مرآة مستوية بحيث يصنع مع **سطح المرآة نفسه** زاوية قدرها $25^\\circ$. أوجد زاوية الورود $i$ وزاوية الانعكاس $i\'$.',
					solutionAr:
						'الناظم عمودي على سطح المرآة ($90^\\circ$)، وزاوية الورود تُقاس دائماً مع الناظم!\nإذن: $i = 90^\\circ - 25^\\circ = 65^\\circ$.\nوحسب قانون الانعكاس: $i\' = i = 65^\\circ$.'
				},
				{
					problemAr:
						'لماذا تبدو العملة المعدنية الموضوعة في قاع حوض مملوء بالماء أقرب إلى السطح مما هي عليه في الواقع؟',
					solutionAr:
						'لأن الأشعة المنعكسة عن العملة تنكسر عند خروجها من الماء إلى الهواء **مبتعدة عن الناظم**، فتلتقط العين امتدادها المستقيم فترى صورة ظاهرية أعلى من الموضع الحقيقي (العمق الظاهري أصغر من العمق الحقيقي).'
				}
			],
			watchOutAr:
				'انتبه للفخ الكلاسيكي في التمارين: زاوية الورود $i$ تُقاس دائماً بين الشعاع الوارد و**الناظم** (العمودي على المرآة)، وليس بين الشعاع وسطح المرآة! إذا أُعطيت الزاوية مع سطح المرآة فاطرحها من $90^\\circ$ أولاً.'
		},
		practice: [
			{
				questionAr:
					'يسقط شعاع ضوئي على مرآة مستوية صانعاً زاوية $20^\\circ$ مع **سطح المرآة**. ما قيمة زاوية الانعكاس $i\'$؟',
				options: ['$20^\\circ$', '$40^\\circ$', '$70^\\circ$', '$90^\\circ$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'$20^\\circ$ هي الزاوية مع سطح المرآة وليست مع الناظم!',
					'يجب حساب زاوية الورود مع الناظم أولاً ثم تطبيق $i\' = i$.',
					'ممتاز! $i = 90^\\circ - 20^\\circ = 70^\\circ$، ومنه زاوية الانعكاس $i\' = 70^\\circ$.',
					'$90^\\circ$ هي الزاوية بين المرآة والناظم.'
				],
				explanationAr:
					'الناظم عمودي على المرآة، فزاوية الورود $i = 90^\\circ - 20^\\circ = 70^\\circ$، وحسب قانون الانعكاس $i\' = i = 70^\\circ$.'
			},
			{
				questionAr:
					'عند انتقال شعاع ضوئي مائل من **الهواء** ($n_1 = 1$) إلى **الزجاج** ($n_2 = 1.5$)، كيف يتغير مساره بالنسبة للناظم؟',
				options: [
					'يبتعد عن الناظم ($i_2 > i_1$)',
					'يقترب من الناظم ($i_2 < i_1$)',
					'ينفذ في خط مستقيم دون انحراف دائماً',
					'ينعكس كلياً نحو الهواء دون اختراق الزجاج'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يبتعد عن الناظم عند الانتقال من وسط أشد كسراً إلى وسط أقل كسراً (مثل زجاج $\\to$ هواء).',
					'صحيح! لأن الزجاج أشد كسراً من الهواء ($n_2 > n_1$) تقل سرعة الضوء ويقترب الشعاع من الناظم.',
					'ينفذ دون انحراف فقط عند الورود العمودي ($i_1 = 0^\\circ$).',
					'الانعكاس الكلي يحدث فقط عند الانتقال من وسط أكبر قرينة إلى أقل قرينة ($n_1 > n_2$).'
				],
				explanationAr:
					'عند دخول الضوء من الهواء إلى الزجاج أو الماء تقل سرعته فينكسر مقترباً من الناظم ($i_2 < i_1$).'
			},
			{
				questionAr: 'ما الظاهرة البصرية التي تعتمد عليها **الألياف البصرية** في نقل إشارات الإنترنت لمسافات طويلة دون ضياع الضوء؟',
				options: [
					'تبدد الضوء الأبيض',
					'الانكسار المزدوج في الموشور',
					'الانعكاس الكلي الداخلي المتكرر',
					'الانتشار في الغرفة المظلمة'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'التبدد يفكك الضوء الأبيض إلى ألوان، وليس هو مبدأ الليف البصري.',
					'الموشور يشتت الألوان بينما الليف يحفظ الحزمة داخله.',
					'أحسنت! ينحبس الضوء داخل قلب الليف البصري بفضل سلسلة من الانعكاسات الكلية الداخلية.',
					'الغرفة المظلمة تعطي صوراً مقلوبة عبر ثقب صغير.'
				],
				explanationAr:
					'تعمل الألياف البصرية بفضل ظاهرة الانعكاس الكلي للضوء على السطح الفاصل بين القلب الزجاجي والغمد.'
			}
		]
	},

	// -------------------------------------------------------------------------
	// Lesson 4: Prism Dispersion, Visible Spectrum, Speed of Light & Light-Year
	// -------------------------------------------------------------------------
	{
		id: 'phy_lesson_1as_tcl_t2_dispersion_spectrum_speed_light_year',
		slug: 'phy-1as-tcl-t2-dispersion-spectrum-speed-light-year',
		grade: '1as_tcl',
		yearSubjectId: 802,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المجال 2: الإنسان والاتصال — الضوء',
		order: 4,
		titleAr: 'تبدد الضوء الأبيض عبر الموشور، طيف الضوء المرئي، وسرعة الضوء والسنة الضوئية',
		objectives: [
			'تفسير ظاهرة تبدد الضوء الأبيض عبر الموشور الزجاجي والتمييز بين الضوء متعدد الألوان والضوء وحيد اللون',
			'حفظ ترتيب ألوان الطيف المرئي السبعة وتفسير تشكل قوس قزح طبيعياً',
			'توظيف سرعة الضوء في الفراغ ($c = 300\\,000\\,\\text{km/s}$) وتعريف السنة الضوئية ($\\text{a.l.}$) لحساب المسافات الفلكية'
		],
		keywordsAr: [
			'تبدد الضوء الأبيض',
			'الموشور',
			'طيف الضوء المرئي',
			'قوس قزح',
			'سرعة الضوء',
			'السنة الضوئية'
		],
		discover: {
			scenarioAr:
				'وجّه التلاميذ حزمة ضوء أبيض نحو موشور زجاجي فظهر على الشاشة شريط ملون يشبه قوس قزح، ثم وجهوا شعاع ليزر أحمر نحو الموشور فلم يتفرّق! وبعدها تساءلوا: إذا كان الضوء يسير بسرعة $c = 300\\,000\\,\\text{km/s}$، فكيف نقيس بُعد النجوم البعيدة؟',
			svg: svgPrismRainbowDispersion(),
			steps: [
				{
					promptAr:
						'ما الفرق بين الضوء الأبيض (الشمس) وضوء الليزر الأحمر من حيث التركيب اللوني؟',
					hintAr: 'أحدهما يتكون من إشعاعات متعددة والآخر إشعاع بسيط واحد.',
					expectedInput: 'الضوء الأبيض متعدد الألوان والليزر وحيد اللون',
					revealAr:
						'الضوء الأبيض **ضوء متعدد الألوان** (مركب من إشعاعات متعددة)، أما ضوء الليزر الأحمر فهو **ضوء وحيد اللون** لذا لا يتبدد عبر الموشور.'
				},
				{
					promptAr: 'في طيف الضوء الأبيض الناتج عن الموشور، أي لون ينحرف **أقل** وأي لون ينحرف **أكثر**؟',
					hintAr: 'راجع الرسم: الأحمر في الأعلى والبنفسجي في الأسفل نحو قاعدة الموشور.',
					expectedInput: 'الأحمر أقل انحرافاً والبنفسجي أكثر انحرافاً',
					revealAr:
						'اللون **الأحمر** هو الأقل انحرافاً، واللون **البنفسجي** هو الأكثر انحرافاً نحو قاعدة الموشور.'
				},
				{
					promptAr:
						'تبعد الشمس عن الأرض بمقدار $d = 150\\,000\\,000\\,\\text{km}$. كم ثانية يستغرق ضوء الشمس ليصل إلى الأرض ($c = 300\\,000\\,\\text{km/s}$)?',
					hintAr: 'استعمل علاقة السرعة: $t = \\frac{d}{c}$.',
					expectedInput: '500',
					revealAr:
						'$t = \\frac{150\\,000\\,000}{300\\,000} = 500\\,\\text{s} \\approx 8\\,\\text{min}\\,20\\,\\text{s}$. أي أننا نرى الشمس كما كانت قبل نحو $8$ دقائق!'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تبدد الضوء الأبيض وطيفه**: الضوء الأبيض ضوء **مركب (متعدد الألوان)**؛ عند اجتيازه لموشور زجاجي يتفكك إلى **طيف الضوء المرئي** المتكون من سبعة ألوان رئيسية متتالية: **الأحمر، البرتقالي، الأصفر، الأخضر، الأزرق، النيلي، البنفسجي** (الأحمر أقلها انحرافاً والبنفسجي أكثرها انحرافاً). في الطبيعة يحدث التبدد داخل قطرات المطر فيظهر **قوس قزح**.',
				'**الضوء وحيد اللون**: هو ضوء بسيط لا يتبدد عند عبوره الموشور (مثل شعاع الليزر الأحمر أو الأخضر)، بل ينحرف فقط دون أن ينقسم إلى ألوان.',
				'**سرعة انتشار الضوء**: ينتشر الضوء في الفراغ وفي الهواء بسرعة هائلة ثابتة تساوي تقريباً:\n$$c \\approx 300\\,000\\,\\text{km/s} = 3 \\times 10^8\\,\\text{m/s}$$\nوتقل سرعته في الأوساط الشفافة المادية (الماء $\\approx 225\\,000\\,\\text{km/s}$، الزجاج $\\approx 200\\,000\\,\\text{km/s}$).',
				'**السنة الضوئية ($\\text{a.l.}$ / $\\text{ly}$)**: هي **وحدة مسافة** (وليس وحدة زمن!) تساوي المسافة التي يقطعها الضوء في الفراغ خلال سنة أرضية واحدة ($365.25$ يوماً):\n$$1\\,\\text{a.l.} = c \\times 1\\,\\text{سنة} \\approx 9.46 \\times 10^{12}\\,\\text{km} \\approx 9.5 \\times 10^{12}\\,\\text{km}$$'
			],
			visualSvg: svgLightSpeedAndLightYear(),
			visualCaptionAr: 'سرعة الضوء في الفراغ وزمن وصول ضوء الشمس وتعريف السنة الضوئية',
			examples: [
				{
					problemAr:
						'أقرب نجم إلينا بعد الشمس هو «قنطورس الأقرب» ويبعد عن الأرض بنحو $4.2\\,\\text{a.l.}$. احسب بُعده بالكيلومتر، وكم يستغرق ضوؤه ليصل إلى تلسكوباتنا؟',
					solutionAr:
						'1) المسافة بالكيلومتر: $d = 4.2 \\times 9.46 \\times 10^{12} \\approx 3.97 \\times 10^{13}\\,\\text{km}$.\n2) زمن وصول الضوء: يستغرق ضوؤه **$4.2$ سنة** للوصول إلينا (أي أننا نراه اليوم كما كان قبل $4.2$ سنوات!).'
				},
				{
					problemAr:
						'أرسل مركز فلكي نبضة ليزر نحو القمر لقياس بُعده، فعادت النبضة المنعكسة بعد مرور $t_{\\text{ذهاب وإياب}} = 2.56\\,\\text{s}$. احسب المسافة بين الأرض والقمر.',
					solutionAr:
						'زمن الذهاب فقط: $t = \\frac{2.56}{2} = 1.28\\,\\text{s}$.\nالمسافة: $d = c \\times t = 300\\,000 \\times 1.28 = 384\\,000\\,\\text{km}$.'
				}
			],
			watchOutAr:
				'خطأ شائع جداً: الاعتقاد بأن **السنة الضوئية** تقيس الزمن لأنها تحتوي على كلمة «سنة»! في الحقيقة السنة الضوئية وحدة **مسافة** هائلة ($\\approx 9.46 \\times 10^{12}\\,\\text{km}$) تستعمل لقياس الأبعاد بين النجوم والمجرات.'
		},
		practice: [
			{
				questionAr: 'ما هو المفهوم الصحيح **للسنة الضوئية** ($\\text{a.l.}$)؟',
				options: [
					'وحدة لقياس الزمن الفلكي تساوي $365$ يوماً',
					'وحدة لقياس المسافة وتساوي المسافة التي يقطعها الضوء في الفراغ خلال سنة واحدة',
					'وحدة لقياس سرعة النجوم في الفضاء',
					'المسافة المتوسطة بين الأرض والشمس ($150$ مليون $\\text{km}$)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'السنة الضوئية لا تقيس الزمن بل المسافة!',
					'أحسنت! $1\\,\\text{a.l.} \\approx 9.46 \\times 10^{12}\\,\\text{km}$ وهي المسافة التي يقطعها الضوء في سنة واحدة.',
					'سرعة الضوء تقاس بـ $\\text{km/s}$ أو $\\text{m/s}$.',
					'المسافة بين الأرض والشمس تسمى الوحدة الفلكية ($1\\,\\text{UA}$) وليس السنة الضوئية.'
				],
				explanationAr:
					'السنة الضوئية وحدة مسافة فلكية تُقدّر بنحو $9.46 \\times 10^{12}\\,\\text{km}$ وتستعمل للأبعاد النجمية.'
			},
			{
				questionAr:
					'عند إسقاط شعاع **ليزر أخضر** على موشور زجاجي، ماذا يخرج من الوجه المقابل للموشور؟',
				options: [
					'طيف مستمر من سبعة ألوان كقوس قزح',
					'شعاع أخضر وحيد اللون منحرف دون أن يتفكك إلى ألوان',
					'ضوء أبيض ساطع',
					'ينعدم الضوء تماماً داخل الموشور'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الطيف السباعي يظهر عند تبدد الضوء الأبيض متعدد الألوان فقط.',
					'صحيح! الليزر ضوء وحيد اللون (بسيط) ينكسر وينحرف عبر الموشور لكنه لا يتبدد.',
					'الضوء الأبيض يتكون بجمع الألوان السبعة وليس من لون واحد.',
					'الزجاج وسط شفاف يسمح بمرور الضوء.'
				],
				explanationAr:
					'الموشور لا يخلق الألوان، ولأن الليزر وحيد اللون فإنه ينحرف عبر الموشور دون أن يتبدد.'
			},
			{
				questionAr:
					'يبعد كوكب المريخ في وضعية معينة عن الأرض مسافة $d = 75\\,000\\,000\\,\\text{km}$. كم دقيقة يستغرق إرسال إشارة ضوئية (راديوية) من الأرض إلى المسبار فوق المريخ ($c = 300\\,000\\,\\text{km/s}$)?',
				options: ['$250\\,\\text{min}$', '$4.17\\,\\text{min}$ ($250\\,\\text{s}$)', '$0.25\\,\\text{min}$', '$60\\,\\text{min}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$250$ هي المدة بالثواني ($\\text{s}$) وليست بالدقائق!',
					'ممتاز! $t = \\frac{75\\,000\\,000}{300\\,000} = 250\\,\\text{s} = \\frac{250}{60} \\approx 4.17\\,\\text{min}$.',
					'راجع عملية القسمة $75\\,000\\,000 \\div 300\\,000$.',
					'لم تطبق العلاقة $t = d / c$.'
				],
				explanationAr:
					'الزمن بالثواني هو $t = \\frac{75\\,000\\,000}{300\\,000} = 250\\,\\text{s}$، وبالتحويل إلى الدقائق نقسم على $60$ فنجد $\\approx 4.17\\,\\text{min}$.'
			}
		]
	}
];
