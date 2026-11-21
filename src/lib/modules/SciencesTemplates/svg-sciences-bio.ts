import { calloutBadge, esc, escRich, haloText, wrapSciencesSvg } from './svg-sciences-core';
import {
	renderLessonIllustration,
	type IllustrationId
} from '../VisualAssets/illustrations-registry';

/** 6. Human Physiology Diagrams (4AM BEM, 1AS, 2AS SE/MATH) */
export function svgPhysiologyDiagram(
	kind:
		| 'digestive_villus'
		| 'digestive_tract'
		| 'reflex_arc'
		| 'myotatic_reflex'
		| 'glycemia_loop'
		| 'alveolus_gas'
		| 'cardiac_nerves'
		| 'kidney_urinary'
		| 'blood_smear',
	opts?: { numbered?: boolean; title?: string }
): string {
	const numbered = opts?.numbered ?? false;
	if (kind === 'digestive_villus' && numbered) {
		return renderLessonIllustration('sci_13_intestinal_villus', {
			title: opts?.title ?? 'البنية المجهرية للزغابة المعوية وطريقا الامتصاص',
			hideLegend: true,
			pins: [
				{ num: '1', xPct: 16, yPct: 35, color: '#b45309' },
				{ num: '2', xPct: 34, yPct: 58, color: '#dc2626' },
				{ num: '3', xPct: 22, yPct: 92, color: '#dc2626' },
				{ num: '4', xPct: 50, yPct: 38, color: '#16a34a' },
				{ num: '5', xPct: 68, yPct: 58, color: '#2563eb' },
				{ num: '6', xPct: 78, yPct: 94, color: '#16a34a' }
			]
		});
	}
	if (!numbered) {
		const physIllMap: Partial<Record<typeof kind, IllustrationId>> = {
			digestive_villus: 'sci_13_intestinal_villus',
			digestive_tract: 'sci_12_digestive_tract_organs',
			reflex_arc: 'sci_19_neuron_synapse_arc',
			alveolus_gas: 'sci_14_pulmonary_alveolus',
			cardiac_nerves: 'sci_15_heart_cross_section',
			kidney_urinary: 'sci_16_kidney_urinary_nephron',
			blood_smear: 'sci_17_blood_smear_cells'
		};
		const illId = physIllMap[kind];
		if (illId) {
			return renderLessonIllustration(illId, { title: opts?.title });
		}
	}
	const w = 460;
	const h = 255;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'digestive_villus') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'بنية الزغابة المعوية وطريقا الامتصاص')}</text>`;
		// Villus outer finger epithelium
		body += `<path d="M 162 224 L 162 110 C 162 56, 298 56, 298 110 L 298 224" fill="#fef3c7" stroke="#d97706" stroke-width="5"/>`;
		// Central lacteal (lymphatic vessel)
		body += `<path d="M 224 224 L 224 108 C 224 96, 236 96, 236 108 L 236 224 Z" fill="#fef08a" stroke="#16a34a" stroke-width="2"/>`;
		// Arterial (red) & venous (blue) capillary network
		body += `<path d="M 186 224 L 186 116 C 186 82, 230 78, 230 92" fill="none" stroke="#dc2626" stroke-width="3.2"/>`;
		body += `<path d="M 274 224 L 274 116 C 274 82, 230 78, 230 92" fill="none" stroke="#2563eb" stroke-width="3.2"/>`;
		body += `<path d="M 186 135 Q 230 124 274 135 M 186 168 Q 230 156 274 168" fill="none" stroke="#ef4444" stroke-width="1.6"/>`;
		const lbls = [
			{ x1: 162, y1: 96, ex: 108, ty: 82, text: numbered ? '1' : 'ظهارة معوية (صف واحد)', side: 'left' },
			{ x1: 186, y1: 152, ex: 108, ty: 146, text: numbered ? '2' : 'شريان داخل (دم)', side: 'left' },
			{ x1: 186, y1: 204, ex: 108, ty: 206, text: numbered ? '3' : 'الطريق الدموي (غلوكوز)', side: 'left' },
			{ x1: 230, y1: 118, ex: 356, ty: 94, text: numbered ? '4' : 'وعاء بلغمي مركزي', side: 'right' },
			{ x1: 274, y1: 152, ex: 356, ty: 154, text: numbered ? '5' : 'وريد خارج', side: 'right' },
			{ x1: 230, y1: 208, ex: 356, ty: 208, text: numbered ? '6' : 'الطريق اللمفاوي (دسم)', side: 'right' }
		];
		for (const l of lbls) {
			body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.ex}" y2="${l.ty}" stroke="#475569" stroke-width="1.1"/>`;
			if (numbered) body += calloutBadge(l.side === 'left' ? l.ex - 12 : l.ex + 12, l.ty, l.text, '#d97706');
			else body += `<text x="${l.side === 'left' ? l.ex - 4 : l.ex + 4}" y="${l.ty + 4}" text-anchor="${l.side === 'left' ? 'end' : 'start'}" font-size="10.2" font-weight="bold" fill="#0f172a">${esc(l.text)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'reflex_arc' || kind === 'myotatic_reflex') {
		const isMyotatic = kind === 'myotatic_reflex';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? (isMyotatic ? 'القوس الانعكاسية للمنعكس العضلي (أخيلي/رضفي)' : 'العناصر التشريحية المتدخلة في الفعل المنعكس'))}</text>`;
		// Spinal cord cross section on left
		body += `<ellipse cx="122" cy="140" rx="64" ry="52" fill="#f1f5f9" stroke="#334155" stroke-width="2.2"/>`;
		// Gray matter butterfly
		body += `<path d="M 96 112 Q 112 126 122 126 Q 132 126 148 112 Q 142 140 148 168 Q 132 154 122 154 Q 112 154 96 168 Q 102 140 96 112 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>`;
		// Receptor / Muscle on right
		body += `<rect x="332" y="64" width="100" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>`;
		body += `<text x="382" y="90" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#1e3a8a">${isMyotatic ? 'مغزل عصبي عضلي' : 'مستقبل حسي (جلد)'}</text>`;
		body += `<rect x="332" y="168" width="100" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>`;
		body += `<text x="382" y="194" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#991b1b">${isMyotatic ? 'عضلة باسطة منفذة' : 'عضو منفذ (عضلة)'}</text>`;
		// Sensory fiber (top - dorsal root with ganglion)
		body += `<path d="M 332 86 Q 230 68 142 118" fill="none" stroke="#2563eb" stroke-width="2.6"/>`;
		body += `<circle cx="242" cy="82" r="9" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.6"/>`;
		// Motor fiber (bottom - ventral root)
		body += `<path d="M 142 162 Q 230 210 332 190" fill="none" stroke="#dc2626" stroke-width="2.6"/>`;
		body += haloText(`x="242" y="66" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#1d4ed8', numbered ? '1' : 'عصبون حسي (جذر خلفي)');
		body += haloText(`x="242" y="218" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#dc2626', numbered ? '2' : 'عصبون حركي (جذر أمامي)');
		body += haloText(`x="122" y="210" text-anchor="middle" font-size="10.8" font-weight="bold"`, '#0f172a', numbered ? '3' : 'النخاع الشوكي (مركز عصبي)');
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'glycemia_loop') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مخطط حلقة التنظيم الذاتي لتحلون الدم')}</text>`;
		// Central reference box
		body += `<rect x="160" y="42" width="140" height="36" rx="8" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>`;
		body += `<text x="230" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#14532d">تحلون الدم ≈ 1 g/L</text>`;
		// Right branch: Hyperglycemia -> beta cells -> Insulin -> Liver/Muscle
		body += `<rect x="264" y="102" width="172" height="54" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>`;
		body += `<text x="350" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">إفراط سكري (&gt; 1 g/L)</text>`;
		body += `<text x="350" y="142" text-anchor="middle" font-size="10" fill="#7f1d1d">خلايا β (لانغرهانس) ← أنسولين</text>`;
		body += `<rect x="264" y="182" width="172" height="46" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>`;
		body += `<text x="350" y="201" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">تخزين الغلوكوز (غليكوجين)</text>`;
		body += `<text x="350" y="218" text-anchor="middle" font-size="9.5" fill="#1e40af">في الكبد والعضلات والنسيج الدهني</text>`;
		// Left branch: Hypoglycemia -> alpha cells -> Glucagon -> Liver
		body += `<rect x="24" y="102" width="172" height="54" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>`;
		body += `<text x="110" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">قصور سكري (&lt; 1 g/L)</text>`;
		body += `<text x="110" y="142" text-anchor="middle" font-size="10" fill="#78350f">خلايا α (لانغرهانس) ← غلوكاغون</text>`;
		body += `<rect x="24" y="182" width="172" height="46" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>`;
		body += `<text x="110" y="201" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">إماهة الغليكوجين الكبدي</text>`;
		body += `<text x="110" y="218" text-anchor="middle" font-size="9.5" fill="#14532d">تحرير الغلوكوز في الدم</text>`;
		// Connecting arrows
		body += `<line x1="270" y1="78" x2="320" y2="100" stroke="#dc2626" stroke-width="2"/>`;
		body += `<line x1="350" y1="156" x2="350" y2="180" stroke="#2563eb" stroke-width="2"/>`;
		body += `<line x1="190" y1="78" x2="140" y2="100" stroke="#d97706" stroke-width="2"/>`;
		body += `<line x1="110" y1="156" x2="110" y2="180" stroke="#16a34a" stroke-width="2"/>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'alveolus_gas') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'المبادلات الغازية التنفسية على مستوى السنخ الرئوي')}</text>`;
		// Alveolus sac
		body += `<circle cx="230" cy="126" r="56" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.4"/>`;
		body += `<rect x="216" y="42" width="28" height="34" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.2"/>`;
		body += `<text x="230" y="120" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0369a1">سنخ رئوي</text>`;
		body += `<text x="230" y="138" text-anchor="middle" font-size="10" fill="#0c4a6e">هواء غني بـ O₂</text>`;
		// Blood capillary wrapping bottom
		body += `<path d="M 62 192 Q 145 212 230 198 Q 315 212 398 192" fill="none" stroke="#dc2626" stroke-width="18" stroke-linecap="round" opacity="0.22"/>`;
		body += `<path d="M 62 192 Q 145 212 230 198 Q 315 212 398 192" fill="none" stroke="#b91c1c" stroke-width="2.2"/>`;
		// Gas exchange labels
		body += haloText(`x="184" y="176" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#dc2626', 'O₂ ↓ إلى الدم');
		body += haloText(`x="278" y="176" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#2563eb', 'CO₂ ↑ إلى السنخ');
		body += `<text x="368" y="168" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#1d4ed8">دم داخل (غني بـ CO₂)</text>`;
		body += `<text x="94" y="168" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#dc2626">دم خارج (غني بـ O₂)</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'digestive_tract') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'محطات الهضم في الأنبوب الهضمي')}</text>`;
		const stations = [
			{ x: 374, name: 'الفم', enzyme: 'أميلاز لعابي', prod: 'نشاء ← مالتوز', col: '#2563eb', bg: '#eff6ff' },
			{ x: 230, name: 'المعدة', enzyme: 'بروتياز 1 (بيبسين)', prod: 'بروتين ← متعدد ببتيد', col: '#d97706', bg: '#fffbeb' },
			{ x: 86, name: 'المعي الدقيق', enzyme: 'مالتاز + بروتياز + ليباز', prod: 'مغذيات (غلوكوز، أحماض)', col: '#16a34a', bg: '#f0fdf4' }
		];
		for (const s of stations) {
			body += `<rect x="${s.x - 62}" y="58" width="124" height="148" rx="10" fill="${s.bg}" stroke="${s.col}" stroke-width="2"/>`;
			body += `<text x="${s.x}" y="88" text-anchor="middle" font-size="13" font-weight="bold" fill="${s.col}">${esc(s.name)}</text>`;
			body += `<text x="${s.x}" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(s.enzyme)}</text>`;
			body += `<text x="${s.x}" y="166" text-anchor="middle" font-size="10" fill="#334155">${esc(s.prod)}</text>`;
		}
		body += `<text x="302" y="136" text-anchor="middle" font-size="18" font-weight="bold" fill="#475569">←</text>`;
		body += `<text x="158" y="136" text-anchor="middle" font-size="18" font-weight="bold" fill="#475569">←</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	// cardiac_nerves (1AS TCST)
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'التحكم العصبي في الوتيرة القلبية')}</text>`;
	body += `<rect x="164" y="42" width="132" height="44" rx="8" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>`;
	body += `<text x="230" y="68" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#581c87">البصلة السيسائية</text>`;
	body += `<ellipse cx="230" cy="196" rx="56" ry="34" fill="#fee2e2" stroke="#dc2626" stroke-width="2.2"/>`;
	body += `<text x="230" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">القلب</text>`;
	body += `<path d="M 192 86 Q 112 136 184 184" fill="none" stroke="#2563eb" stroke-width="2.4"/>`;
	body += `<path d="M 268 86 Q 348 136 276 184" fill="none" stroke="#dc2626" stroke-width="2.4"/>`;
	body += `<text x="98" y="136" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#1d4ed8">عصب قرب ودي (مبطئ)</text>`;
	body += `<text x="362" y="136" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#dc2626">عصب ودي (مسرّع)</text>`;
	return wrapSciencesSvg(w, h, body);
}

/** 7. Genetics & Cell Division Diagrams (4AM, 1AS, 2AS SE/MATH) */
export function svgGeneticsDiagram(
	kind: 'karyotype' | 'mitosis_stages' | 'meiosis_stages' | 'pedigree_chart' | 'punnett_square',
	opts?: {
		title?: string;
		trisomy21?: boolean;
		sex?: 'XY' | 'XX';
		punnett?: { p1: [string, string]; p2: [string, string] };
	}
): string {
	if (kind === 'mitosis_stages') {
		return renderLessonIllustration('sci_24_plant_mitosis_phases', { title: opts?.title });
	}
	const w = 460;
	const h = 248;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'meiosis_stages') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مراحل الانقسام المنصف (2n ← n)')}</text>`;
		const stages = [
			{ x: 382, t: 'تمهيدية I', sub: 'تقارب رباعيات + عبور' },
			{ x: 280, t: 'استوائية I', sub: 'اصطفاف أزواج متماثلة' },
			{ x: 178, t: 'انفصالية I', sub: 'افتراق الصبغيات (n)' },
			{ x: 76, t: 'نهائية II', sub: '4 خلايا أحادية (n)' }
		];
		stages.forEach((st, idx) => {
			body += `<rect x="${st.x - 44}" y="44" width="88" height="176" rx="8" fill="#ffffff" stroke="#4f46e5" stroke-width="1.6"/>`;
			body += `<text x="${st.x}" y="64" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#3730a3">${esc(st.t)}</text>`;
			body += `<circle cx="${st.x}" cy="126" r="30" fill="#eef2ff" stroke="#6366f1" stroke-width="1.6"/>`;
			if (idx === 0) {
				body += `<path d="M ${st.x - 10} 114 L ${st.x + 8} 134 M ${st.x + 8} 114 L ${st.x - 10} 134" stroke="#dc2626" stroke-width="2.5"/>`;
				body += `<path d="M ${st.x - 4} 122 L ${st.x + 14} 142 M ${st.x + 14} 122 L ${st.x - 4} 142" stroke="#2563eb" stroke-width="2.5"/>`;
			} else if (idx === 1) {
				body += `<line x1="${st.x}" y1="98" x2="${st.x}" y2="154" stroke="#94a3b8" stroke-dasharray="3,2"/>`;
				body += `<line x1="${st.x - 10}" y1="114" x2="${st.x + 10}" y2="114" stroke="#dc2626" stroke-width="3"/>`;
				body += `<line x1="${st.x - 10}" y1="138" x2="${st.x + 10}" y2="138" stroke="#2563eb" stroke-width="3"/>`;
			} else if (idx === 2) {
				body += `<path d="M ${st.x - 16} 116 L ${st.x - 8} 124 L ${st.x - 16} 132" fill="none" stroke="#dc2626" stroke-width="2.4"/>`;
				body += `<path d="M ${st.x + 16} 116 L ${st.x + 8} 124 L ${st.x + 16} 132" fill="none" stroke="#2563eb" stroke-width="2.4"/>`;
			} else {
				body += `<circle cx="${st.x - 13}" cy="126" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>`;
				body += `<circle cx="${st.x + 13}" cy="126" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>`;
			}
			body += `<text x="${st.x}" y="198" text-anchor="middle" font-size="9.4" fill="#334155">${esc(st.sub)}</text>`;
		});
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'karyotype') {
		const tri = opts?.trisomy21 ?? false;
		const sex = opts?.sex ?? 'XY';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? (tri ? 'طابع نووي لشخص مصاب بتناذر داون (2n+1 = 47)' : `الطابع النووي لخلية جسمية طبيعية (${sex})` ))}</text>`;
		// Simplified representative pairs 1, 2, 3, ..., 21, 22, 23(sex)
		const pairs = ['1', '2', '3', '13', '18', '21', '22', '23'];
		pairs.forEach((p, i) => {
			const px = 54 + i * 50;
			const is21Tri = p === '21' && tri;
			const isSex = p === '23';
			const col = is21Tri ? '#dc2626' : isSex ? '#7c3aed' : '#1d4ed8';
			const chrH = Math.max(24, 58 - i * 4);
			body += `<rect x="${px - 10}" y="${120 - chrH / 2}" width="6" height="${chrH}" rx="3" fill="${col}"/>`;
			body += `<rect x="${px + 2}" y="${120 - (isSex && sex === 'XY' ? chrH * 0.55 : chrH) / 2}" width="6" height="${isSex && sex === 'XY' ? chrH * 0.55 : chrH}" rx="3" fill="${col}"/>`;
			if (is21Tri) {
				body += `<rect x="${px + 13}" y="${120 - chrH / 2}" width="6" height="${chrH}" rx="3" fill="#dc2626"/>`;
				body += `<rect x="${px - 15}" y="${120 - chrH / 2 - 6}" width="39" height="${chrH + 12}" rx="5" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3,2"/>`;
			}
			body += `<text x="${px + 2}" y="176" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${col}">${isSex ? sex : p}</text>`;
		});
		body += `<text x="${w / 2}" y="214" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${tri ? 'الصيغة الصبغية: 2n + 1 = 47 (ثلاثية الصبغي 21)' : `الصيغة الصبغية: 2n = 46 (44 صبغي جسمي + ${sex})`}</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'pedigree_chart') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'شجرة نسب عائلة مصابة بمرض وراثي متنحٍ')}</text>`;
		// Generation I: healthy carrier parents (male square + female circle)
		body += `<rect x="172" y="54" width="24" height="24" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>`;
		body += `<circle cx="276" cy="66" r="12" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>`;
		body += `<line x1="196" y1="66" x2="264" y2="66" stroke="#0f172a" stroke-width="2"/>`;
		body += `<text x="150" y="70" font-size="10.5" font-weight="bold" fill="#475569">I</text>`;
		// Descendants Generation II
		body += `<line x1="230" y1="66" x2="230" y2="112" stroke="#0f172a" stroke-width="2"/>`;
		body += `<line x1="130" y1="112" x2="330" y2="112" stroke="#0f172a" stroke-width="2"/>`;
		for (const cx of [130, 230, 330]) {
			body += `<line x1="${cx}" y1="112" x2="${cx}" y2="132" stroke="#0f172a" stroke-width="2"/>`;
		}
		// Child 1 healthy male, Child 2 affected female (filled!), Child 3 healthy female
		body += `<rect x="118" y="132" width="24" height="24" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>`;
		body += `<circle cx="230" cy="144" r="12" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>`;
		body += `<circle cx="330" cy="144" r="12" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>`;
		body += `<text x="90" y="148" font-size="10.5" font-weight="bold" fill="#475569">II</text>`;
		// Legend
		body += `<rect x="52" y="192" width="14" height="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/><text x="72" y="203" font-size="10" fill="#334155">ذكر سليم</text>`;
		body += `<circle cx="164" cy="199" r="7" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/><text x="176" y="203" font-size="10" fill="#334155">أنثى سليمة</text>`;
		body += `<circle cx="280" cy="199" r="7" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.6"/><text x="292" y="203" font-size="10" font-weight="bold" fill="#dc2626">فرد مصاب بالمرض</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	// punnett_square
	const p1 = opts?.punnett?.p1 ?? ['A', 'a'];
	const p2 = opts?.punnett?.p2 ?? ['A', 'a'];
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'جدول التضريب الوراثي (الجيل الثاني F₂)')}</text>`;
	body += `<rect x="120" y="54" width="220" height="156" rx="6" fill="#ffffff" stroke="#334155" stroke-width="2"/>`;
	body += `<line x1="194" y1="54" x2="194" y2="210" stroke="#334155" stroke-width="1.6"/>`;
	body += `<line x1="268" y1="54" x2="268" y2="210" stroke="#334155" stroke-width="1.6"/>`;
	body += `<line x1="120" y1="106" x2="340" y2="106" stroke="#334155" stroke-width="1.6"/>`;
	body += `<line x1="120" y1="158" x2="340" y2="158" stroke="#334155" stroke-width="1.6"/>`;
	body += `<text x="157" y="84" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">الأمشاج</text>`;
	body += `<text x="231" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">${esc(p1[0])}</text>`;
	body += `<text x="304" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">${esc(p1[1])}</text>`;
	body += `<text x="157" y="136" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">${esc(p2[0])}</text>`;
	body += `<text x="157" y="188" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">${esc(p2[1])}</text>`;
	body += `<text x="231" y="136" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${esc(p1[0] + p2[0])}</text>`;
	body += `<text x="304" y="136" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${esc(p1[1] + p2[0])}</text>`;
	body += `<text x="231" y="188" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${esc(p1[0] + p2[1])}</text>`;
	body += `<text x="304" y="188" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${esc(p1[1] + p2[1])}</text>`;
	return wrapSciencesSvg(w, h, body);
}

/** 8. Geology & Earth Sciences Diagrams (3AM, 2AS, 3AS SE) */
export function svgGeologyDiagram(
	kind:
		| 'earthquake_fault'
		| 'plate_subduction'
		| 'oceanic_ridge'
		| 'volcano_section'
		| 'rock_strata_fossils'
		| 'soil_water_table',
	opts?: { numbered?: boolean; title?: string }
): string {
	const numbered = opts?.numbered ?? false;
	if (kind === 'oceanic_ridge' && numbered) {
		return renderLessonIllustration('sci_22_oceanic_ridge_spreading', {
			title: opts?.title ?? 'نشاط الظهرة المحيطية وتباعد الصفائح',
			hideLegend: true,
			pins: [
				{ num: '1', xPct: 50, yPct: 42, color: '#b91c1c' },
				{ num: '2', xPct: 68, yPct: 78, color: '#9a3412' }
			]
		});
	}
	if (!numbered) {
		const geoIllMap: Partial<Record<typeof kind, IllustrationId>> = {
			earthquake_fault: 'sci_20_geology_fault_folds',
			plate_subduction: 'sci_21_subduction_volcano',
			oceanic_ridge: 'sci_22_oceanic_ridge_spreading',
			volcano_section: 'sci_21_subduction_volcano',
			soil_water_table: 'sci_23_soil_horizons_aquifer'
		};
		const illId = geoIllMap[kind];
		if (illId) {
			return renderLessonIllustration(illId, { title: opts?.title });
		}
	}
	const w = 460;
	const h = 250;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'earthquake_fault') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مقطع تخطيطي للزلزال (البؤرة، الفالق، المركز السطحي)')}</text>`;
		// Ground surface & rock layers
		body += `<rect x="30" y="92" width="400" height="44" fill="#d6d3d1" stroke="#57534e" stroke-width="1.3"/>`;
		body += `<rect x="30" y="136" width="400" height="84" fill="#a8a29e" stroke="#57534e" stroke-width="1.3"/>`;
		body += `<line x1="30" y1="92" x2="430" y2="92" stroke="#15803d" stroke-width="4"/>`;
		// Fault line
		body += `<line x1="274" y1="92" x2="188" y2="220" stroke="#7f1d1d" stroke-width="3.2"/>`;
		// Focus (البؤرة) & seismic wave rings
		body += `<circle cx="222" cy="170" r="9" fill="#dc2626"/>`;
		for (const r of [24, 44, 68]) {
			body += `<circle cx="222" cy="170" r="${r}" fill="none" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="4,3"/>`;
		}
		// Epicenter directly above focus
		body += `<line x1="222" y1="92" x2="222" y2="170" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4,3"/>`;
		body += `<circle cx="222" cy="92" r="6" fill="#1d4ed8"/>`;
		body += haloText(`x="222" y="74" text-anchor="middle" font-size="11" font-weight="bold"`, '#1d4ed8', numbered ? '1' : 'المركز السطحي (أكبر شدة)');
		body += haloText(`x="110" y="174" text-anchor="middle" font-size="11" font-weight="bold"`, '#dc2626', numbered ? '2' : 'البؤرة الزلزالية');
		body += haloText(`x="344" y="120" text-anchor="middle" font-size="11" font-weight="bold"`, '#7f1d1d', numbered ? '3' : 'فالق (انكسار صخري)');
		body += haloText(`x="340" y="192" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#b91c1c', numbered ? '4' : 'أمواج زلزالية');
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'plate_subduction') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'ظاهرة الغوص وتشكّل البراكين الانفجارية')}</text>`;
		// Ocean water on left
		body += `<rect x="26" y="74" width="194" height="36" fill="#bae6fd"/>`;
		// Oceanic lithosphere subducting down-right
		body += `<polygon points="26,110 218,110 318,218 268,218 190,136 26,136" fill="#475569" stroke="#1e293b" stroke-width="1.8"/>`;
		// Continental plate overriding on right
		body += `<polygon points="222,94 434,94 434,154 256,154" fill="#d97706" opacity="0.35" stroke="#92400e" stroke-width="1.8"/>`;
		// Volcanic chain on continental margin
		body += `<polygon points="292,94 318,52 344,94" fill="#78350f" stroke="#451a03" stroke-width="1.6"/>`;
		body += `<line x1="318" y1="62" x2="318" y2="178" stroke="#dc2626" stroke-width="3.5"/>`;
		body += `<circle cx="318" cy="182" r="14" fill="#ef4444"/>`;
		// Asthenosphere background
		body += `<text x="108" y="196" text-anchor="middle" font-size="11" font-weight="bold" fill="#9a3412">الأستينوسفير (الرداء الماغماتي)</text>`;
		body += haloText(`x="108" y="128" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#0f172a', numbered ? '1' : 'صفيحة محيطية غائصة');
		body += haloText(`x="212" y="90" text-anchor="middle" font-size="10" font-weight="bold"`, '#0369a1', numbered ? '2' : 'خندق محيطي');
		body += haloText(`x="382" y="72" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#991b1b', numbered ? '3' : 'بركان انفجاري');
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'oceanic_ridge' || kind === 'volcano_section') {
		const isRidge = kind === 'oceanic_ridge';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? (isRidge ? 'الظهرة المحيطية وتوسع قاع المحيط' : 'مقطع تخطيطي للبركان وأجزائه'))}</text>`;
		if (isRidge) {
			body += `<rect x="28" y="64" width="404" height="58" fill="#bae6fd"/>`;
			body += `<polygon points="28,122 198,122 222,94 238,94 262,122 432,122 432,164 28,164" fill="#64748b" stroke="#1e293b" stroke-width="1.8"/>`;
			body += `<rect x="220" y="96" width="20" height="122" fill="#ef4444"/>`;
			body += haloText(`x="118" y="146" text-anchor="middle" font-size="11" font-weight="bold"`, '#ffffff', '← تباعد الصفائح');
			body += haloText(`x="342" y="146" text-anchor="middle" font-size="11" font-weight="bold"`, '#ffffff', 'تباعد الصفائح →');
			body += haloText(`x="230" y="84" text-anchor="middle" font-size="10.8" font-weight="bold"`, '#991b1b', numbered ? '1' : 'رفت الظهرة (صعود الماغما)');
			body += haloText(`x="230" y="210" text-anchor="middle" font-size="10.8" font-weight="bold"`, '#9a3412', numbered ? '2' : 'تيارات الحمل الحراري');
		} else {
			body += `<polygon points="108,208 214,68 246,68 352,208" fill="#a8a29e" stroke="#44403c" stroke-width="2"/>`;
			body += `<rect x="222" y="68" width="16" height="122" fill="#dc2626"/>`;
			body += `<ellipse cx="230" cy="204" rx="54" ry="20" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>`;
			body += `<ellipse cx="230" cy="50" rx="44" ry="14" fill="#cbd5e1" stroke="#64748b" stroke-width="1.4"/>`;
			body += haloText(`x="356" y="62" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#475569', numbered ? '1' : 'سحابة رماد وغازات');
			body += haloText(`x="362" y="128" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#dc2626', numbered ? '2' : 'المدخنة واللافا');
			body += haloText(`x="92" y="198" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#991b1b', numbered ? '3' : 'الغرفة الماغماتية');
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'rock_strata_fossils') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'توضع الطبقات الرسوبية والمستحاثات المرشدة (مبدأ التراكب)')}</text>`;
		const layers = [
			{ y: 54, h: 42, fill: '#fef3c7', label: 'طبقة 1 (الأحدث): كلس + مستحاثات بحرية حديثة' },
			{ y: 96, h: 44, fill: '#fde68a', label: 'طبقة 2 (متوسطة): غضار + أمونيت (الحقب الثاني)' },
			{ y: 140, h: 44, fill: '#fed7aa', label: 'طبقة 3: حجر رملي + آثار قارية' },
			{ y: 184, h: 44, fill: '#d6d3d1', label: 'طبقة 4 (الأقدم): شيست + ثلاثية الفصوص (الحقب الأول)' }
		];
		for (const l of layers) {
			body += `<rect x="44" y="${l.y}" width="372" height="${l.h}" fill="${l.fill}" stroke="#57534e" stroke-width="1.5"/>`;
			body += `<text x="230" y="${l.y + l.h / 2 + 4}" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#1c1917">${esc(l.label)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	// soil_water_table
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'آفاق التربة وتشكّل الجيب المائي الجوفي')}</text>`;
	body += `<rect x="40" y="54" width="380" height="32" fill="#78350f" opacity="0.72"/><text x="230" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">طبقة سطحية غنية بالدبال (نفاذة)</text>`;
	body += `<rect x="40" y="86" width="380" height="44" fill="#d97706" opacity="0.45"/><text x="230" y="113" text-anchor="middle" font-size="11" font-weight="bold" fill="#451a03">طبقة صخور رملية نفاذة</text>`;
	body += `<rect x="40" y="130" width="380" height="46" fill="#38bdf8" opacity="0.55"/><text x="230" y="158" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0c4a6e">طبقة مشبعة بالماء (جيب مائي جوفي)</text>`;
	body += `<rect x="40" y="176" width="380" height="46" fill="#64748b"/><text x="230" y="204" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">صخرة أم غضارية غير نفاذة (كتيمة)</text>`;
	return wrapSciencesSvg(w, h, body);
}

/** 9. Plant Biology, Ecology & Kid-Friendly Primary Illustrations (1AP–5AP, 1AM, 2AM, 1AS) */
export function svgPlantAndPrimaryDiagram(
	kind:
		| 'plant_anatomy'
		| 'stomata_sap'
		| 'seed_germination'
		| 'food_chain'
		| 'water_cycle'
		| 'five_senses'
		| 'states_of_matter'
		| 'balanced_diet'
		| 'breathing_lungs'
		| 'simple_circuit'
		| 'teeth_types'
		| 'animal_adaptation'
		| 'day_night_earth'
		| 'recycling_solar'
		| 'xylem_phloem',
	opts?: { numbered?: boolean; title?: string; items?: string[] }
): string {
	const numbered = opts?.numbered ?? false;
	if (kind === 'day_night_earth') {
		return renderLessonIllustration('sci_07_earth_day_night_sun', { title: opts?.title });
	}
	if (kind === 'recycling_solar') {
		return renderLessonIllustration('sci_10_recycling_solar_energy', { title: opts?.title });
	}
	if (kind === 'xylem_phloem') {
		return renderLessonIllustration('sci_25_xylem_phloem_vessels', { title: opts?.title });
	}
	if (!numbered && !opts?.items) {
		const priSciIllMap: Partial<Record<typeof kind, IllustrationId>> = {
			plant_anatomy: 'sci_02_plant_flower_anatomy',
			stomata_sap: 'sci_11_leaf_photosynthesis_stomata',
			seed_germination: 'sci_01_seed_germination',
			water_cycle: 'sci_04_water_cycle',
			states_of_matter: 'sci_05_states_of_water',
			balanced_diet: 'sci_03_healthy_food_groups',
			breathing_lungs: 'sci_09_lungs_ribcage_breathing',
			simple_circuit: 'sci_06_simple_electric_circuit',
			teeth_types: 'sci_08_tooth_molar_section'
		};
		const illId = priSciIllMap[kind];
		if (illId) {
			return renderLessonIllustration(illId, { title: opts?.title });
		}
	}
	const w = 460;
	const h = 250;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'plant_anatomy' || kind === 'stomata_sap') {
		const isSap = kind === 'stomata_sap';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? (isSap ? 'دوران النسغ الناقص والنسغ الكامل والتركيب الضوئي' : 'أجزاء النبات الأخضر ووظائفها'))}</text>`;
		// Soil band
		body += `<rect x="76" y="174" width="308" height="54" rx="6" fill="#d6c096" stroke="#92400e" stroke-width="1.4"/>`;
		// Roots
		body += `<path d="M 230 174 L 230 218 M 230 186 L 196 212 M 230 188 L 266 214 M 230 198 L 210 220" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>`;
		// Stem
		body += `<rect x="223" y="76" width="14" height="98" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>`;
		// Leaves
		body += `<ellipse cx="182" cy="118" rx="38" ry="18" fill="#4ade80" stroke="#15803d" stroke-width="1.8" transform="rotate(-18 182 118)"/>`;
		body += `<ellipse cx="278" cy="118" rx="38" ry="18" fill="#4ade80" stroke="#15803d" stroke-width="1.8" transform="rotate(18 278 118)"/>`;
		// Flower / sun
		body += `<circle cx="230" cy="64" r="14" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>`;
		body += `<circle cx="388" cy="58" r="16" fill="#facc15" stroke="#eab308" stroke-width="2"/>`;
		if (isSap) {
			// Ascending raw sap (blue) & descending elaborated sap (red)
			body += `<line x1="214" y1="172" x2="214" y2="96" stroke="#2563eb" stroke-width="2.6"/>`;
			body += `<polygon points="209,102 219,102 214,90" fill="#2563eb"/>`;
			body += `<line x1="246" y1="96" x2="246" y2="172" stroke="#dc2626" stroke-width="2.6"/>`;
			body += `<polygon points="241,166 251,166 246,178" fill="#dc2626"/>`;
			body += haloText(`x="114" y="96" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#1d4ed8', 'نسغ ناقص (ماء + أملاح)');
			body += haloText(`x="356" y="148" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#dc2626', 'نسغ كامل (مواد عضوية)');
			body += haloText(`x="356" y="96" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#15803d', 'امتصاص CO₂ وطرح O₂');
		} else {
			body += `<text x="108" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">${numbered ? '1' : 'الزهرة (التكاثر)'}</text>`;
			body += `<text x="108" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${numbered ? '2' : 'الأوراق (صنع الغذاء)'}</text>`;
			body += `<text x="356" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">${numbered ? '3' : 'الساق (نقل الماء)'}</text>`;
			body += `<text x="348" y="206" text-anchor="middle" font-size="11" font-weight="bold" fill="#78350f">${numbered ? '4' : 'الجذور (امتصاص وتثبيت)'}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'seed_germination') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مراحل إنتاش البذرة ونمو النبيتة')}</text>`;
		const steps = [
			{ x: 382, t: '1. بذرة منتفخة', sub: 'امتصاص الماء' },
			{ x: 280, t: '2. بروز الجذير', sub: 'يتجه نحو الأسفل' },
			{ x: 178, t: '3. نمو السويقة', sub: 'تتجه نحو الضوء' },
			{ x: 76, t: '4. نبيتة مورقة', sub: 'ظهور الأوراق الخضراء' }
		];
		steps.forEach((st, idx) => {
			body += `<rect x="${st.x - 44}" y="44" width="88" height="176" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.6"/>`;
			body += `<rect x="${st.x - 40}" y="138" width="80" height="32" fill="#e5d3b3"/>`;
			body += `<ellipse cx="${st.x}" cy="136" rx="14" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>`;
			if (idx >= 1) body += `<path d="M ${st.x} 145 L ${st.x} 166" stroke="#78350f" stroke-width="2.4"/>`;
			if (idx >= 2) body += `<path d="M ${st.x} 127 L ${st.x} 96" stroke="#16a34a" stroke-width="3"/>`;
			if (idx >= 3) {
				body += `<ellipse cx="${st.x - 14}" cy="92" rx="14" ry="7" fill="#4ade80" stroke="#15803d" stroke-width="1.4"/>`;
				body += `<ellipse cx="${st.x + 14}" cy="92" rx="14" ry="7" fill="#4ade80" stroke="#15803d" stroke-width="1.4"/>`;
			}
			body += `<text x="${st.x}" y="66" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#166534">${esc(st.t)}</text>`;
			body += `<text x="${st.x}" y="198" text-anchor="middle" font-size="9.5" fill="#334155">${esc(st.sub)}</text>`;
		});
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'food_chain') {
		const items = opts?.items ?? ['نبات أخضر (منتج)', 'جرادة (مستهلك 1)', 'ضفدع (مستهلك 2)', 'أفعى (مستهلك 3)'];
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'سلسلة غذائية في وسط حي')}</text>`;
		const colors = ['#16a34a', '#2563eb', '#d97706', '#dc2626'];
		const bgs = ['#f0fdf4', '#eff6ff', '#fffbeb', '#fef2f2'];
		const n = Math.min(4, items.length);
		const bw = 90;
		for (let i = 0; i < n; i++) {
			const x = 356 - i * 108;
			body += `<rect x="${x}" y="82" width="${bw}" height="74" rx="10" fill="${bgs[i]}" stroke="${colors[i]}" stroke-width="2"/>`;
			body += `<text x="${x + bw / 2}" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${colors[i]}">${esc(items[i])}</text>`;
			if (i < n - 1) {
				body += `<text x="${x - 9}" y="124" text-anchor="middle" font-size="16" font-weight="bold" fill="#334155">←</text>`;
			}
		}
		body += `<text x="${w / 2}" y="198" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">السهم (←) يعني: "يُؤكل من طرف" — انتقال المادة العضوية والطاقة</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'water_cycle') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'دورة الماء في الطبيعة')}</text>`;
		// Sun
		body += `<circle cx="386" cy="64" r="20" fill="#fde047" stroke="#eab308" stroke-width="2"/>`;
		// Cloud
		body += `<ellipse cx="164" cy="70" rx="54" ry="20" fill="#cbd5e1" stroke="#64748b" stroke-width="1.8"/>`;
		// Rain drops
		for (const rx of [136, 156, 176, 194]) {
			body += `<line x1="${rx}" y1="94" x2="${rx - 4}" y2="118" stroke="#2563eb" stroke-width="2"/>`;
		}
		// Mountain + Sea
		body += `<polygon points="44,216 128,118 228,216" fill="#a8a29e" stroke="#57534e" stroke-width="1.6"/>`;
		body += `<rect x="218" y="176" width="208" height="44" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>`;
		// Evaporation arrows
		body += `<path d="M 320 170 L 320 102" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4,3"/>`;
		body += haloText(`x="320" y="136" text-anchor="middle" font-size="11" font-weight="bold"`, '#dc2626', '1. تبخر');
		body += haloText(`x="164" y="74" text-anchor="middle" font-size="11" font-weight="bold"`, '#0f172a', '2. تكاثف');
		body += haloText(`x="164" y="134" text-anchor="middle" font-size="11" font-weight="bold"`, '#1d4ed8', '3. تساقط');
		body += haloText(`x="206" y="202" text-anchor="middle" font-size="11" font-weight="bold"`, '#0c4a6e', '4. جريان ومياه جوفية');
		return wrapSciencesSvg(w, h, body);
	}

	// Clean visual cards for remaining primary & middle topics
	const cardsMap: Record<
		'five_senses' | 'states_of_matter' | 'balanced_diet' | 'breathing_lungs' | 'simple_circuit' | 'teeth_types' | 'animal_adaptation',
		{ title: string; cards: Array<{ head: string; detail: string; col: string; bg: string }> }
	> = {
		five_senses: {
			title: opts?.title ?? 'الحواس الخمس وأعضاؤها عند الإنسان',
			cards: [
				{ head: 'العين (البصر)', detail: 'رؤية الألوان والأشكال', col: '#2563eb', bg: '#eff6ff' },
				{ head: 'الأذن (السمع)', detail: 'تمييز الأصوات', col: '#7c3aed', bg: '#f5f3ff' },
				{ head: 'الأنف (الشم)', detail: 'تمييز الروائح', col: '#16a34a', bg: '#f0fdf4' },
				{ head: 'اللسان (الذوق)', detail: 'حلو، مالح، حامض، مر', col: '#dc2626', bg: '#fef2f2' },
				{ head: 'الجلد (اللمس)', detail: 'الحرارة، النعومة والخشونة', col: '#d97706', bg: '#fffbeb' }
			]
		},
		states_of_matter: {
			title: opts?.title ?? 'حالات المادة الثلاث وتحولاتها',
			cards: [
				{ head: 'الحالة الصلبة', detail: 'لها شكل وحجم ثابتان (جليد، خشب)', col: '#2563eb', bg: '#eff6ff' },
				{ head: 'الحالة السائلة', detail: 'تأخذ شكل الإناء وتجري (ماء، زيت)', col: '#0284c7', bg: '#f0f9ff' },
				{ head: 'الحالة الغازية', detail: 'تنتشر وتملأ كل الحجم (هواء، بخار)', col: '#16a34a', bg: '#f0fdf4' }
			]
		},
		balanced_diet: {
			title: opts?.title ?? 'المجموعات الغذائية الأساسية للراتب المتوازن',
			cards: [
				{ head: 'أغذية البناء والنمو', detail: 'بروتينات (لحوم، بيض، حليب، بقول)', col: '#dc2626', bg: '#fef2f2' },
				{ head: 'أغذية الطاقة', detail: 'غلوسيدات ودسم (خبز، عجائن، زيت زيتون)', col: '#d97706', bg: '#fffbeb' },
				{ head: 'أغذية الوقاية', detail: 'فيتامينات وأملاح وماء (خضر وفواكه)', col: '#16a34a', bg: '#f0fdf4' }
			]
		},
		breathing_lungs: {
			title: opts?.title ?? 'الحركات التنفسية عند الإنسان',
			cards: [
				{ head: 'الشهيق (دخول الهواء)', detail: 'يرتفع الصدر وتمتلئ الرئتان بهواء غني بـ O₂', col: '#0284c7', bg: '#f0f9ff' },
				{ head: 'الزفير (خروج الهواء)', detail: 'ينخفض الصدر ويُطرح هواء غني بـ CO₂ وبخار الماء', col: '#dc2626', bg: '#fef2f2' }
			]
		},
		simple_circuit: {
			title: opts?.title ?? 'عناصر الدارة الكهربائية البسيطة',
			cards: [
				{ head: 'البطارية (المولد)', detail: 'تغذي الدارة بالكهرباء (قطب + وقطب −)', col: '#dc2626', bg: '#fef2f2' },
				{ head: 'المصباح', detail: 'يتوهج عندما تكون الدارة مغلقة', col: '#d97706', bg: '#fffbeb' },
				{ head: 'القاطعة والأسلاك', detail: 'تتحكم في فتح وغلق الدارة عبر نواقل', col: '#16a34a', bg: '#f0fdf4' }
			]
		},
		teeth_types: {
			title: opts?.title ?? 'أنواع الأسنان والنظام الغذائي',
			cards: [
				{ head: 'القواطع', detail: 'لقطع وقضم الأغذية', col: '#2563eb', bg: '#eff6ff' },
				{ head: 'الأنياب', detail: 'لتمزيق اللحوم (متطورة عند اللواحم)', col: '#dc2626', bg: '#fef2f2' },
				{ head: 'الأضراس', detail: 'لطحن وسحق الغذاء (مسطحة عند العواشب)', col: '#16a34a', bg: '#f0fdf4' }
			]
		},
		animal_adaptation: {
			title: opts?.title ?? 'تكيف الكائنات الحية مع أوساط عيشها',
			cards: [
				{ head: 'الوسط المائي (السمكة)', detail: 'تنفس غلصمي + زعانف للسباحة + شكل مغزلي', col: '#0284c7', bg: '#f0f9ff' },
				{ head: 'الوسط الهوائي (الطائر)', detail: 'تنفس رئوي + أجنحة وريش وعظام خفيفة', col: '#7c3aed', bg: '#f5f3ff' },
				{ head: 'الوسط الصحراوي (الجمل/الصبار)', detail: 'تقليص فقدان الماء (أشواك، سنام، جذور عميقة)', col: '#d97706', bg: '#fffbeb' }
			]
		}
	};
	const cfg = cardsMap[kind];
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(cfg.title)}</text>`;
	const n = cfg.cards.length;
	if (n <= 3) {
		const cw = Math.floor((w - 36 - (n - 1) * 14) / n);
		cfg.cards.forEach((c, i) => {
			const x = 18 + (n - 1 - i) * (cw + 14);
			body += `<rect x="${x}" y="52" width="${cw}" height="168" rx="10" fill="${c.bg}" stroke="${c.col}" stroke-width="2"/>`;
			body += `<text x="${x + cw / 2}" y="102" text-anchor="middle" font-size="12" font-weight="bold" fill="${c.col}">${escRich(c.head)}</text>`;
			body += `<text x="${x + cw / 2}" y="148" text-anchor="middle" font-size="10.2" fill="#334155">${escRich(c.detail)}</text>`;
		});
	} else {
		// 5 cards in 2 neat rows (3 top, 2 bottom)
		cfg.cards.forEach((c, i) => {
			const row = i < 3 ? 0 : 1;
			const colIdx = row === 0 ? 2 - i : 1 - (i - 3);
			const cw = row === 0 ? 132 : 186;
			const startX = row === 0 ? 20 : 38;
			const x = startX + colIdx * (cw + 12);
			const y = row === 0 ? 48 : 144;
			body += `<rect x="${x}" y="${y}" width="${cw}" height="82" rx="9" fill="${c.bg}" stroke="${c.col}" stroke-width="1.8"/>`;
			body += `<text x="${x + cw / 2}" y="${y + 32}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c.col}">${escRich(c.head)}</text>`;
			body += `<text x="${x + cw / 2}" y="${y + 58}" text-anchor="middle" font-size="9.8" fill="#334155">${escRich(c.detail)}</text>`;
		});
	}
	return wrapSciencesSvg(w, h, body);
}

/** 10. Classic Biology Laboratory Experimental Setups (1AM, 4AM, 1AS, 3AS) */
export function svgLabExperiment(
	kind: 'food_reagents' | 'salivary_amylase' | 'elodea_oxygen' | 'respiration_fermentation' | 'skin_graft',
	opts?: { title?: string }
): string {
	const w = 460;
	const h = 238;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'food_reagents' || kind === 'salivary_amylase') {
		const isAmylase = kind === 'salivary_amylase';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? (isAmylase ? 'تجربة هضم النشاء بالأميلاز اللعابي (37°C)' : 'الكشف الكيميائي عن العناصر الغذائية في المختبر'))}</text>`;
		const tubes = isAmylase
			? [
					{ x: 356, top: 'أنبوب أ', fill: '#1e3a8a', bot: 'نشاء + ماء يود', res: 'أزرق بنفسجي (نشاء)' },
					{ x: 230, top: 'أنبوب ب (37°C)', fill: '#fde047', bot: 'نشاء + لعاب + يود', res: 'غياب النشاء (هضم)' },
					{ x: 104, top: 'أنبوب ج + تسخين', fill: '#ea580c', bot: 'نشاء + لعاب + فهلنغ', res: 'أحمر آجوري (مالتوز)' }
				]
			: [
					{ x: 356, top: 'ماء اليود', fill: '#1e3a8a', bot: 'الكشف عن النشاء', res: 'أزرق بنفسجي' },
					{ x: 230, top: 'فهلنغ + تسخين', fill: '#dc2626', bot: 'السكريات البسيطة', res: 'أحمر آجوري' },
					{ x: 104, top: 'حمض الآزوت', fill: '#eab308', bot: 'الكشف عن البروتين', res: 'لون أصفر' }
				];
		for (const t of tubes) {
			body += `<rect x="${t.x - 16}" y="62" width="32" height="92" rx="14" fill="#ffffff" stroke="#334155" stroke-width="2"/>`;
			body += `<rect x="${t.x - 14}" y="110" width="28" height="42" rx="10" fill="${t.fill}" opacity="0.82"/>`;
			body += `<text x="${t.x}" y="52" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(t.top)}</text>`;
			body += `<text x="${t.x}" y="176" text-anchor="middle" font-size="10" fill="#334155">${esc(t.bot)}</text>`;
			body += `<text x="${t.x}" y="196" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f766e">${esc(t.res)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'elodea_oxygen') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'تجربة إظهار انطلاق غاز O₂ أثناء التركيب الضوئي (نبات الإيلوديا)')}</text>`;
		// Beaker
		body += `<rect x="148" y="88" width="164" height="118" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.2"/>`;
		// Funnel + inverted test tube
		body += `<polygon points="184,196 276,196 244,124 216,124" fill="none" stroke="#475569" stroke-width="1.8"/>`;
		body += `<rect x="218" y="48" width="24" height="78" rx="10" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>`;
		// O2 gas pocket at top + rising bubbles
		body += `<rect x="220" y="50" width="20" height="24" rx="8" fill="#fef08a"/>`;
		for (const by of [110, 96, 82]) body += `<circle cx="230" cy="${by}" r="3.5" fill="#ffffff" stroke="#0284c7" stroke-width="1.2"/>`;
		// Plant inside funnel
		body += `<path d="M 230 192 L 230 144 M 230 176 L 210 162 M 230 168 L 250 156" stroke="#15803d" stroke-width="3.2"/>`;
		// Light source
		body += `<circle cx="382" cy="96" r="18" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>`;
		body += `<text x="382" y="132" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#b45309">مصدر ضوئي</text>`;
		body += `<text x="90" y="72" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#15803d">غاز O₂ متجمع</text>`;
		body += `<text x="90" y="156" text-anchor="middle" font-size="10.5" fill="#0369a1">ماء غني بـ CO₂</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'respiration_fermentation') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مقارنة بين التنفس الخلوي والتخمر الكحولي (الخميرة)')}</text>`;
		body += `<rect x="242" y="52" width="194" height="162" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>`;
		body += `<text x="339" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">وسط هوائي (التنفس)</text>`;
		body += `<text x="339" y="108" text-anchor="middle" font-size="10.5" fill="#14532d">هدم كلي للغلوكوز بوجود O₂</text>`;
		body += `<text x="339" y="136" text-anchor="middle" font-size="10.5" fill="#14532d">نواتج معدنية: CO₂ + H₂O</text>`;
		body += `<text x="339" y="172" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">طاقة كبيرة (38 ATP) + تكاثر كبير</text>`;

		body += `<rect x="24" y="52" width="194" height="162" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>`;
		body += `<text x="121" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">وسط لاهوائي (التخمر)</text>`;
		body += `<text x="121" y="108" text-anchor="middle" font-size="10.5" fill="#78350f">هدم جزئي للغلوكوز بغياب O₂</text>`;
		body += `<text x="121" y="136" text-anchor="middle" font-size="10.5" fill="#78350f">إيثانول (مادة عضوية) + CO₂</text>`;
		body += `<text x="121" y="172" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b45309">طاقة ضئيلة (2 ATP) + تكاثر قليل</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	// skin_graft (4AM & 3AS Immunology self/non-self)
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'تجارب زرع الطعوم الجلدية (الذات واللاذات)')}</text>`;
	body += `<rect x="242" y="52" width="194" height="162" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>`;
	body += `<text x="339" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">طعم ذاتي (نفس الفرد A ← A)</text>`;
	body += `<text x="339" y="120" text-anchor="middle" font-size="11" fill="#14532d">تطابق تام في مؤشرات CMH</text>`;
	body += `<text x="339" y="164" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">✓ قبول الطعم</text>`;

	body += `<rect x="24" y="52" width="194" height="162" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>`;
	body += `<text x="121" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">طعم غيري (فرد A ← فرد B)</text>`;
	body += `<text x="121" y="120" text-anchor="middle" font-size="11" fill="#7f1d1d">اختلاف CMH ← تنشيط LTc</text>`;
	body += `<text x="121" y="164" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">✕ رفض الطعم (أسرع في المرة 2)</text>`;
	return wrapSciencesSvg(w, h, body);
}
