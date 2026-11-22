import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';

// ═══════════════════════════════════════════════════════════════════════════════
// FreeMono-Free Custom SVG Builders for 1AS TCL T2 (Optics)
// ═══════════════════════════════════════════════════════════════════════════════

function buildCameraObscuraTplSvg(abCm: number, dM: number, dPrimeCm: number): string {
	let body = `<rect x="8" y="8" width="384" height="178" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">تجربة الغرفة المظلمة (حساب طول الصورة المقلوبة)</text>`;

	// Object AB on left
	body += `<line x1="54" y1="136" x2="54" y2="70" stroke="#dc2626" stroke-width="2.8"/>`;
	body += `<polygon points="49,76 54,66 59,76" fill="#dc2626"/>`;
	body += `<text x="42" y="72" text-anchor="end" font-size="11" font-weight="bold" fill="#dc2626">B</text>`;
	body += `<text x="42" y="138" text-anchor="end" font-size="11" font-weight="bold" fill="#dc2626">A</text>`;
	body += `<text x="54" y="54" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">AB = ${abCm} cm</text>`;

	// Box
	body += `<rect x="172" y="48" width="186" height="108" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<rect x="170" y="98" width="4" height="8" fill="#fde047"/>`;
	body += `<text x="172" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">ثقب O</text>`;
	body += `<rect x="352" y="50" width="6" height="104" fill="#fef3c7"/>`;

	// Crossing rays
	body += `<line x1="54" y1="70" x2="352" y2="146" stroke="#facc15" stroke-width="1.5"/>`;
	body += `<line x1="54" y1="136" x2="352" y2="58" stroke="#fb923c" stroke-width="1.5"/>`;

	// Inverted image A'B'
	body += `<line x1="347" y1="60" x2="347" y2="143" stroke="#38bdf8" stroke-width="2.8"/>`;
	body += `<polygon points="342,138 347,146 352,138" fill="#38bdf8"/>`;
	body += `<text x="336" y="65" text-anchor="end" font-size="10.5" font-weight="bold" fill="#bae6fd">A'</text>`;
	body += `<text x="336" y="146" text-anchor="end" font-size="10.5" font-weight="bold" fill="#bae6fd">B'</text>`;

	// Distance labels
	body += `<line x1="54" y1="168" x2="172" y2="168" stroke="#2563eb" stroke-width="1.4"/>`;
	body += `<text x="113" y="181" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">d = ${dM} m</text>`;
	body += `<line x1="172" y1="168" x2="352" y2="168" stroke="#059669" stroke-width="1.4"/>`;
	body += `<text x="262" y="181" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#065f46">d' = ${dPrimeCm} cm</text>`;

	return wrapPhysicsSvg(400, 194, body);
}

function buildEclipseTplSvg(kind: 'solar' | 'lunar', isTotal: boolean): string {
	let body = `<rect x="8" y="8" width="384" height="176" rx="9" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="200" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">مخطط فلكي لظاهرة ${kind === 'solar' ? 'كسوف الشمس' : 'خسوف القمر'} (${isTotal ? 'كلي' : 'جزئي'})</text>`;

	// Sun
	body += `<circle cx="56" cy="98" r="22" fill="#facc15"/>`;
	body += `<text x="56" y="138" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">الشمس</text>`;

	if (kind === 'solar') {
		body += `<polygon points="56,76 184,90 184,106 56,120" fill="#fef08a" opacity="0.22"/>`;
		body += `<polygon points="184,90 278,98 184,106" fill="#020617" opacity="0.9"/>`;
		body += `<circle cx="184" cy="98" r="8" fill="#94a3b8"/>`;
		body += `<text x="184" y="132" text-anchor="middle" font-size="10.5" fill="#cbd5e1">القمر (محاق)</text>`;
		body += `<circle cx="282" cy="98" r="16" fill="#3b82f6"/>`;
		body += `<text x="282" y="138" text-anchor="middle" font-size="10.5" fill="#93c5fd">الأرض</text>`;
		body += `<circle cx="272" cy="${isTotal ? 98 : 87}" r="3.5" fill="#ef4444"/>`;
		body += `<text x="344" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fca5a5">${isTotal ? 'الظل التام' : 'الظليل'}</text>`;
	} else {
		body += `<polygon points="178,80 326,90 326,106 178,116" fill="#020617" opacity="0.9"/>`;
		body += `<circle cx="178" cy="98" r="16" fill="#3b82f6"/>`;
		body += `<text x="178" y="138" text-anchor="middle" font-size="10.5" fill="#93c5fd">الأرض</text>`;
		body += `<circle cx="278" cy="${isTotal ? 98 : 84}" r="8" fill="#dc2626"/>`;
		body += `<text x="278" y="132" text-anchor="middle" font-size="10.5" fill="#fca5a5">القمر (بدر)</text>`;
		body += `<text x="344" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#cbd5e1">${isTotal ? 'ظل الأرض التام' : 'حافة الظل'}</text>`;
	}

	body += `<text x="200" y="168" text-anchor="middle" font-size="10" fill="#e2e8f0">حدّد طور القمر، وقت الظاهرة، ونوعها من موقع المراقب</text>`;
	return wrapPhysicsSvg(400, 192, body);
}

function buildReflectionRefractionTplSvg(alphaDeg: number, iDeg: number, mediumName: string): string {
	let body = `<defs>
		<marker id="rrRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/>
		</marker>
		<marker id="rrBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="178" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	// Left panel: Plane mirror
	body += `<rect x="16" y="20" width="180" height="154" rx="7" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<text x="106" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">انعكاس على مرآة مستوية</text>`;
	body += `<line x1="28" y1="136" x2="184" y2="136" stroke="#0f172a" stroke-width="2.4"/>`;
	body += `<line x1="106" y1="54" x2="106" y2="136" stroke="#64748b" stroke-width="1.2" stroke-dasharray="4,2"/>`;
	body += `<line x1="46" y1="74" x2="106" y2="136" stroke="#dc2626" stroke-width="2" marker-end="url(#rrRed)"/>`;
	body += `<line x1="106" y1="136" x2="166" y2="74" stroke="#2563eb" stroke-width="2" marker-end="url(#rrBlue)"/>`;
	body += `<text x="58" y="128" font-size="10" font-weight="bold" fill="#dc2626">${alphaDeg}°</text>`;
	body += `<text x="122" y="92" font-size="10.5" font-weight="bold" fill="#2563eb">i' = ${iDeg}°</text>`;
	body += `<text x="106" y="158" text-anchor="middle" font-size="9.5" fill="#475569">الزاوية مع سطح المرآة: ${alphaDeg}°</text>`;

	// Right panel: Refraction air -> water/glass
	body += `<rect x="204" y="20" width="180" height="154" rx="7" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<rect x="205" y="102" width="178" height="71" fill="#dbeafe"/>`;
	body += `<line x1="206" y1="102" x2="382" y2="102" stroke="#1d4ed8" stroke-width="1.6"/>`;
	body += `<line x1="294" y1="48" x2="294" y2="164" stroke="#64748b" stroke-width="1.2" stroke-dasharray="4,2"/>`;
	body += `<text x="294" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">انكسار (هواء / ${mediumName})</text>`;
	body += `<line x1="240" y1="52" x2="294" y2="102" stroke="#dc2626" stroke-width="2" marker-end="url(#rrRed)"/>`;
	body += `<line x1="294" y1="102" x2="322" y2="162" stroke="#2563eb" stroke-width="2" marker-end="url(#rrBlue)"/>`;
	body += `<text x="276" y="76" font-size="10.5" font-weight="bold" fill="#dc2626">i<tspan dy="3" font-size="72%">1</tspan></text>`;
	body += `<text x="302" y="140" font-size="10.5" font-weight="bold" fill="#2563eb">i<tspan dy="3" font-size="72%">2</tspan></text>`;

	return wrapPhysicsSvg(400, 194, body);
}

function buildPrismAndStarSvg(starName: string, distLy: number): string {
	let body = `<rect x="8" y="8" width="384" height="178" rx="9" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">تبدد الضوء الأبيض عبر الموشور والأبعاد النجمية</text>`;

	// Prism on left
	body += `<polygon points="108,48 64,132 152,132" fill="#bae6fd" fill-opacity="0.28" stroke="#7dd3fc" stroke-width="1.8"/>`;
	body += `<line x1="20" y1="102" x2="84" y2="92" stroke="#ffffff" stroke-width="2.8"/>`;
	const cols = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
	cols.forEach((col, idx) => {
		const yOut = 96 + idx * 4;
		const yEnd = 78 + idx * 12;
		body += `<polyline fill="none" stroke="${col}" stroke-width="1.8" points="84,92 132,${yOut} 195,${yEnd}"/>`;
	});
	body += `<text x="198" y="80" font-size="9.5" font-weight="bold" fill="#fca5a5">أحمر</text>`;
	body += `<text x="198" y="142" font-size="9.5" font-weight="bold" fill="#d8b4fe">بنفسجي</text>`;

	// Star distance panel on right
	body += `<rect x="240" y="46" width="140" height="114" rx="7" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>`;
	body += `<text x="310" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#fde047">نجم ${starName}</text>`;
	body += `<text x="310" y="94" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">d = ${distLy} a.l.</text>`;
	body += `<text x="310" y="118" text-anchor="middle" font-size="10" fill="#38bdf8">1 a.l. = 9.46 × 10<tspan dy="-4" font-size="72%">12</tspan><tspan dy="4"> km</tspan></text>`;
	body += `<text x="310" y="144" text-anchor="middle" font-size="10" fill="#86efac">c = 300 000 km/s</text>`;

	body += `<text x="200" y="174" text-anchor="middle" font-size="10" fill="#cbd5e1">تبدد ضوء النجم عبر الموشور يكشف ألوان طيفه المستمر</text>`;
	return wrapPhysicsSvg(400, 194, body);
}

function buildIntegrationOpticsSvg(fiberKm: number, eclipseDiameterCm: number, starLy: number): string {
	let body = `<rect x="8" y="8" width="384" height="180" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">مشروع الاتصالات البصرية والرصد الفلكي الآمن</text>`;

	// Card 1: Fiber
	body += `<rect x="18" y="42" width="176" height="68" rx="6" fill="#0f172a"/>`;
	body += `<text x="106" y="60" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">1. رابط ليفي بصري</text>`;
	body += `<polyline fill="none" stroke="#38bdf8" stroke-width="2" points="28,84 62,68 96,96 130,68 164,96 184,82"/>`;
	body += `<text x="106" y="102" text-anchor="middle" font-size="9.5" fill="#cbd5e1">d = ${fiberKm} km  |  v = 200 000 km/s</text>`;

	// Card 2: Eclipse Chamber
	body += `<rect x="206" y="42" width="176" height="68" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>`;
	body += `<text x="294" y="60" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">2. رصد كسوف بغرفة مظلمة</text>`;
	body += `<circle cx="242" cy="84" r="10" fill="#facc15" stroke="#ca8a04"/>`;
	body += `<line x1="252" y1="84" x2="342" y2="84" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3,2"/>`;
	body += `<rect x="336" y="68" width="22" height="32" fill="#1e293b"/>`;
	body += `<text x="294" y="102" text-anchor="middle" font-size="9.5" fill="#334155">صورة القرص: ${eclipseDiameterCm} cm</text>`;

	// Card 3: Spectrum & Star
	body += `<rect x="18" y="122" width="364" height="54" rx="6" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.2"/>`;
	body += `<text x="200" y="142" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#065f46">3. تحليل الضوء الأبيض للنجم البعيد (${starLy} سنة ضوئية)</text>`;
	body += `<text x="200" y="162" text-anchor="middle" font-size="10" fill="#334155">الأبيض يتبدد عبر الموشور (أحمر .. بنفسجي) بينما الليزر وحيد اللون لا يتبدد</text>`;

	return wrapPhysicsSvg(400, 196, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Camera Obscura, Optical Media & Rectilinear Propagation
// ═══════════════════════════════════════════════════════════════════════════════

const tplCameraObscuraMedia: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t2_camera_obscura_media',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'optics',
	isExperimental: true,
	titleAr: 'الأوساط الضوئية والانتشار المستقيم والغرفة المظلمة',
	curriculumLessonId: 'phy_lesson_1as_tcl_t2_light_sources_media_camera_obscura',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const abCm = rng.pick([40, 50, 60, 80]);
		const dM = difficulty === 'easy' ? rng.pick([2, 4]) : rng.pick([2, 2.5, 4, 5]);
		const dPrimeCm = rng.pick([20, 25, 30, 40]);
		const dCm = dM * 100;
		const imgCm = roundTo((abCm * dPrimeCm) / dCm, 1);

		const svg = buildCameraObscuraTplSvg(abCm, dM, dPrimeCm);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t2_cam_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$A'B' = ${imgCm}\\,\\text{cm}$ وتكون مقلوبة وحقيقية`,
			[
				{
					text: `$A'B' = ${imgCm}\\,\\text{cm}$ وتكون معتدلة ووهمية`,
					diagnosticFeedback: 'الطول صحيح، لكن الغرفة المظلمة تشكل صورة مقلوبة وحقيقية على الشاشة!'
				},
				{
					text: `$A'B' = ${roundTo((abCm * dPrimeCm) / dM, 1)}\\,\\text{cm}$ وتكون مقلوبة`,
					diagnosticFeedback: 'نسيت توحيد الوحدات! يجب تحويل $d$ من المتر ($\\text{m}$) إلى السنتيمتر ($\\text{cm}$) قبل الحساب.'
				},
				{
					text: `$A'B' = ${roundTo((abCm * dCm) / dPrimeCm, 1)}\\,\\text{cm}$ وتكون معتدلة`,
					diagnosticFeedback: 'عكست النسبة! العلاقة الصحيحة هي $A\'B\' = AB \\times \\frac{d\'}{d}$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نضع جسماً مضاءً طوله $AB = ${abCm}\\,\\text{cm}$ على بُعد $d = ${dM}\\,\\text{m}$ من ثقب غرفة مظلمة عمقها $d' = ${dPrimeCm}\\,\\text{cm}$. ما طول الصورة $A'B'$ المتشكلة على الشاشة وما صفتها؟`,
				questionTextAr: `احسب طول الصورة $A'B'$ وحدد صفتها:`,
				imageUrl: svgPath,
				imageCaption: 'مخطط الأشعة في الغرفة المظلمة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحوّل $d = ${dM}\\,\\text{m} = ${dCm}\\,\\text{cm}$، ثم نطبق $\\frac{A'B'}{AB} = \\frac{d'}{d} \\implies A'B' = ${abCm} \\times \\frac{${dPrimeCm}}{${dCm}} = ${imgCm}\\,\\text{cm}$ وتكون الصورة مقلوبة وحقيقية.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أنجز التلاميذ في المخبر تجربة *الغرفة المظلمة* (التي ابتكرها العالم المسلم الحسن بن الهيثم) بوضع شمعة مشتعلة طولها $AB = ${abCm} "cm"$ على بُعد $d = ${dM} "m"$ من الثقب، علماً أن عمق الغرفة المظلمة هو $d' = ${dPrimeCm} "cm"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) كيف تبدو صورة الشمعة على شاشة الغرفة المظلمة (معتدلة أم مقلوبة)؟ فسّر ذلك بالاعتماد على مبدأ انتشار الضوء.`,
								answer: `1) تبدو الصورة *حقيقية ومقلوبة*؛ لأن *الضوء ينتشر في خطوط مستقيمة*، فتتقاطع الأشعة الصادرة من أعلى الشمعة وأسفلها عند الثقب الصغير.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'الغرفة المظلمة والأبعاد الهندسية'
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب العلاقة التي تربط طول الصورة $A'B'$ بطول الجسم $AB$ والمسافتين $d$ و $d'$، ثم احسب طول الصورة $A'B'$ بالسنتيمتر بعد توحيد الوحدات.`,
						answer: `2) العلاقة: $frac(A'B', AB) = frac(d', d)$.\nالتحويل: $d = ${dM} "m" = ${dCm} "cm"$.\nالحساب: $A'B' = ${abCm} times frac(${dPrimeCm}, ${dCm}) = ${imgCm} "cm"$.`,
						mark: '2'
					},
					{
						type: 'table',
						headers: ['الجسم أو الوسط الضوئي', 'التصنيف (مضيء / مضاء أو شفاف / شاف / عاتم)'],
						cells: [],
						rows: [
							[
								'لهب الشمعة المشتعلة',
								{ content: '................', answer: 'جسم مضيء اصطناعي', mark: '0.5' }
							],
							[
								'الورق الشفاف في شاشة الغرفة المظلمة',
								{ content: '................', answer: 'وسط شاف', mark: '0.5' }
							],
							[
								'جدران الصندوق الخشبي للغرفة المظلمة',
								{ content: '................', answer: 'وسط عاتم', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `4) ماذا يحدث لوضوح وإضاءة الصورة إذا وسّعنا ثقب الغرفة المظلمة كثيراً؟`,
						answer: `4) تزداد *إضاءة* الصورة لكن يقل *وضوحها* (تصبح مشوشة) لتداخل الحزم الضوئية القادمة من كل نقطة.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الانتشار المستقيم للضوء يسبب تقاطع الأشعة عند الثقب الصغير وانقلاب الصورة.',
				`وحّد الوحدات أولاً: $d = ${dM}\\,\\text{m} = ${dCm}\\,\\text{cm}$، ثم استعمل $\\frac{A'B'}{AB} = \\frac{d'}{d}$.`,
				'الورق الشفاف يمرر جزءاً من الضوء دون رؤية واضحة خلفه فهو وسط شاف.'
			],
			solutionStepsAr: [
				'الصورة مقلوبة وحقيقية بسبب الانتشار المستقيم للضوء.',
				`بتوحيد الوحدات ($d = ${dCm}\\,\\text{cm}$): $A'B' = ${abCm} \\times \\frac{${dPrimeCm}}{${dCm}} = ${imgCm}\\,\\text{cm}$.`,
				'توسيع الثقب يزيد الإضاءة ويُفقد الصورة وضوحها.'
			],
			finalAnswer: `A'B' = ${imgCm} cm (مقلوبة)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Shadows, Penumbra & Solar/Lunar Eclipses
// ═══════════════════════════════════════════════════════════════════════════════

const tplShadowsEclipses: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t2_shadows_eclipses',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'optics',
	titleAr: 'الظل والظليل وظاهرتا كسوف الشمس وخسوف القمر',
	curriculumLessonId: 'phy_lesson_1as_tcl_t2_light_ray_shadows_eclipses',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const kind: 'solar' | 'lunar' = seed % 2 === 0 ? 'solar' : 'lunar';
		const isTotal = difficulty === 'easy' ? true : rng.pick([true, false]);

		const svg = buildEclipseTplSvg(kind, isTotal);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t2_ecl_${kind}_${difficulty}_s${cleanSeed}`, svg);

		const correctMcq =
			kind === 'solar'
				? `كسوف ${isTotal ? 'كلي' : 'جزئي'} للشمس؛ يحدث نهاراً عندما يقع القمر (محاق) بين الشمس والأرض`
				: `خسوف ${isTotal ? 'كلي' : 'جزئي'} للقمر؛ يحدث ليلاً عندما تقع الأرض بين الشمس والقمر (بدر)`;

		const mcq = buildUniqueMcqOptions(
			correctMcq,
			[
				{
					text:
						kind === 'solar'
							? `خسوف ${isTotal ? 'كلي' : 'جزئي'} للقمر؛ يحدث ليلاً عندما يقع القمر بين الشمس والأرض`
							: `كسوف ${isTotal ? 'كلي' : 'جزئي'} للشمس؛ يحدث نهاراً عندما تقع الأرض بين الشمس والقمر`,
					diagnosticFeedback: 'تحقق من الترتيب في الرسم! عندما يكون القمر في الوسط يحدث كسوف الشمس، وعندما تكون الأرض في الوسط يحدث خسوف القمر.'
				},
				{
					text:
						kind === 'solar'
							? `كسوف ${isTotal ? 'جزئي' : 'كلي'} للشمس؛ يحدث في طور البدر ليلاً`
							: `خسوف ${isTotal ? 'جزئي' : 'كلي'} للقمر؛ يحدث في طور المحاق نهاراً`,
					diagnosticFeedback: 'راجع طور القمر وموضع المراقب (الظل التام = كلي، الظليل = جزئي).'
				},
				{
					text: `انكسار أشعة الشمس داخل القمر؛ وهو علامة غضب وخرافة فلكية`,
					diagnosticFeedback: 'الكسوف والخسوف ظاهرتان طبيعيتان تفسران بالانتشار المستقيم للضوء، وهما آية عظيمة من آيات الله تدعو للتفكر لا للخرافات.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يبين المخطط الفلكي المقابل اصطفاف الشمس والأرض والقمر على استقامة واحدة. ما الظاهرة الفلكية الممثلة، ومتى تحدث؟`,
				questionTextAr: `حدد الظاهرة الفلكية الممثلة في المخطط وشروط حدوثها:`,
				imageUrl: svgPath,
				imageCaption: 'تمثيل هندسي لاصطفاف الشمس والأرض والقمر',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					kind === 'solar'
						? `يقع القمر (محاق) بين الشمس والأرض فيسقط ظله على الأرض نهاراً، ما يسبب **كسوفاً ${isTotal ? 'كلياً' : 'جزئياً'} للشمس**.`
						: `تقع الأرض بين الشمس والقمر (بدر) فيدخل القمر في ظل الأرض ليلاً، ما يسبب **خسوفاً ${isTotal ? 'كلياً' : 'جزئياً'} للقمر**.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تأمل المخطط الفلكي المقابل الذي يمثل إحدى الظواهر الكونية المفسرة بمبدأ الانتشار المستقيم للضوء (وهي آية عظيمة من آيات الله في الكون):`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) سمِّ الظاهرة الممثلة في المخطط ونوعها (${isTotal ? 'كلي أم جزئي' : 'كلي أم جزئي'})، وحدّد في أي طور يكون القمر ووقت حدوثها (نهاراً أم ليلاً).`,
								answer:
									kind === 'solar'
										? `1) الظاهرة: *كسوف ${isTotal ? 'كلي' : 'جزئي'} للشمس*.\nطور القمر: *المحاق*، وتحدث *نهاراً* عند وقوع القمر بين الشمس والأرض.`
										: `1) الظاهرة: *خسوف ${isTotal ? 'كلي' : 'جزئي'} للقمر*.\nطور القمر: *البدر*، وتحدث *ليلاً* عند وقوع الأرض بين الشمس والقمر.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: kind === 'solar' ? 'رسم تخطيطي للكسوف' : 'رسم تخطيطي للخسوف'
							}
						]
					},
					{
						type: 'text',
						content: `2) ما الفرق بين منطقة *الظل التام* ومنطقة *الظليل* عند الإضاءة بمنبع ضوئي واسع كالشمس؟`,
						answer: `2) *الظل التام*: منطقة لا يصلها أي ضوء من المنبع (انعدام الرؤية).\n*الظليل*: منطقة تحيط بالظل التام يصلها جزء من أشعة المنبع الواسع فقط (رؤية جزئية للمنبع).`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['الظاهرة / العنصر', 'الإجابة العلمية الصحيحة'],
						cells: [],
						rows: [
							[
								'ترتيب الأجرام الثلاثة في هذه الظاهرة',
								{
									content: '................',
									answer: kind === 'solar' ? 'الشمس - القمر - الأرض' : 'الشمس - الأرض - القمر',
									mark: '0.5'
								}
							],
							[
								'شكل الضوء عند إضاءة كرة عاتمة بمنبع نقطي',
								{ content: '................', answer: 'ظل تام حاد فقط (دون ظليل)', mark: '0.5' }
							],
							[
								'الجزء غير المضاء على سطح الكرة العاتمة نفسها',
								{ content: '................', answer: 'الظل الذاتي', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `4) اذكر الموقف العلمي والديني السليم من ظاهرتي الكسوف والخسوف، واذكر احتياطاً وقائياً أساسياً عند رصد كسوف الشمس.`,
						answer: `4) هما *آيتان عظيمتان من آيات الله* تخضعان لحساب دقيق والانتشار المستقيم للضوء، فتدعوان للتفكر والتسبيح وصلاة الكسوف/الخسوف بعيداً عن الخرافات.\nالاحتياط الوقائي: *عدم النظر مباشرة إلى الشمس بالعين المجردة* دون نظارات كسوف معتمدة لتجنب تلف الشبكية.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'انظر إلى الجرم المتوسط في الرسم: القمر في الوسط = كسوف الشمس؛ الأرض في الوسط = خسوف القمر.',
				'المنبع الواسع يكوّن ظلاً تاماً محاطاً بمنطقة ظليل.',
				'الكسوف نهاراً في طور المحاق، والخسوف ليلاً في طور البدر.'
			],
			solutionStepsAr: [
				kind === 'solar'
					? `الظاهرة: كسوف ${isTotal ? 'كلي' : 'جزئي'} للشمس (القمر محاق بين الشمس والأرض نهاراً).`
					: `الظاهرة: خسوف ${isTotal ? 'كلي' : 'جزئي'} للقمر (الأرض بين الشمس والقمر البدر ليلاً).`,
				'الظل التام تنعدم فيه رؤية المنبع، والظليل يُرى فيه جزء من المنبع الواسع.',
				'الموقف السليم: التفكر في آيات الله مع احترام قواعد السلامة البصرية.'
			],
			finalAnswer: kind === 'solar' ? `كسوف ${isTotal ? 'كلي' : 'جزئي'} للشمس` : `خسوف ${isTotal ? 'كلي' : 'جزئي'} للقمر`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Plane Mirror Reflection & Light Refraction (Experimental)
// ═══════════════════════════════════════════════════════════════════════════════

const tplReflectionRefraction: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t2_reflection_refraction',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'optics',
	isExperimental: true,
	titleAr: 'انعكاس الضوء على مرآة مستوية وانكسار الضوء وتطبيقاتهما',
	curriculumLessonId: 'phy_lesson_1as_tcl_t2_reflection_refraction_applications',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const alphaDeg = difficulty === 'easy' ? rng.pick([30, 45]) : rng.pick([20, 25, 30, 35, 40]);
		const iDeg = 90 - alphaDeg;
		const totalRayAngle = 2 * iDeg;
		const distMirrorM = rng.pick([1.2, 1.5, 2.0, 2.5]);
		const distPersonToImg = roundTo(2 * distMirrorM, 1);

		const media = [
			{ name: 'الماء', n2: 1.33 },
			{ name: 'الزجاج', n2: 1.5 }
		];
		const med = rng.pick(media);

		const svg = buildReflectionRefractionTplSvg(alphaDeg, iDeg, med.name);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t2_refr_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$i = ${iDeg}^\\circ$ و $i' = ${iDeg}^\\circ$`,
			[
				{
					text: `$i = ${alphaDeg}^\\circ$ و $i' = ${alphaDeg}^\\circ$`,
					diagnosticFeedback: `خطأ شائع! $${alphaDeg}^\\circ$ هي الزاوية المحصورة مع سطح المرآة؛ زاوية الورود تُقاس دائماً مع الناظم ($90^\\circ - ${alphaDeg}^\\circ$).`
				},
				{
					text: `$i = ${iDeg}^\\circ$ و $i' = ${alphaDeg}^\\circ$`,
					diagnosticFeedback: 'خطأ: حسب قانون الانعكاس يجب أن تساوي زاوية الانعكاس زاوية الورود ($i\' = i$).'
				},
				{
					text: `$i = ${totalRayAngle}^\\circ$ و $i' = ${iDeg}^\\circ$`,
					diagnosticFeedback: `$${totalRayAngle}^\\circ$ هي الزاوية الكلية بين الشعاع الوارد والشعاع المنعكس ($i + i'$).`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يسقط شعاع ضوئي على مرآة مستوية بحيث يصنع مع **سطح المرآة** زاوية قدرها $${alphaDeg}^\\circ$ (كما في الجزء الأيسر من الرسم). ما قيمة زاوية الورود $i$ وزاوية الانعكاس $i'$؟`,
				questionTextAr: `أوجد زاوية الورود $i$ وزاوية الانعكاس $i'$:`,
				imageUrl: svgPath,
				imageCaption: 'تجربتا الانعكاس على مرآة مستوية والانكسار',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الناظم عمودي على المرآة، إذن زاوية الورود $i = 90^\\circ - ${alphaDeg}^\\circ = ${iDeg}^\\circ$، وحسب قانون الانعكاس $i' = i = ${iDeg}^\\circ$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يدرس تلميذ في مخبر الفيزياء ظاهرتي *انعكاس الضوء* على مرآة مستوية و*انكسار الضوء* عند السطح الفاصل بين الهواء و${med.name} ($n_2 = ${med.n2}$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) يصنع الشعاع الوارد على المرآة المستوية زاوية $${alphaDeg} degree$ مع سطحها. اذكر قانون الانعكاس الثاني، ثم احسب زاوية الورود $i$ وزاوية الانعكاس $i'$ والزاوية بين الشعاعين الوارد والمنعكس.`,
								answer: `1) قانون الانعكاس الثاني: زاوية الورود تساوي زاوية الانعكاس ($i = i'$).\nزاوية الورود (مع الناظم): $i = 90 degree - ${alphaDeg} degree = ${iDeg} degree$.\nزاوية الانعكاس: $i' = ${iDeg} degree$.\nالزاوية بين الشعاعين الوارد والمنعكس: $i + i' = ${totalRayAngle} degree$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `الانعكاس والانكسار`
							}
						]
					},
					{
						type: 'text',
						content: `2) يقف التلميذ أمام مرآة مستوية شاقولية على بُعد $${distMirrorM} "m"$ منها. اذكر ثلاث خصائص لصورته المتشكلة في المرآة، واحسب المسافة الفاصلة بين التلميذ وصورته.`,
						answer: `2) خصائص الصورة: *وهمية، معتدلة، مساوية للجسم، ومتناظرة بالنسبة لمستوي المرآة* (ومعكوسة جانبياً).\nتبعد الصورة $${distMirrorM} "m"$ خلف المرآة، إذن المسافة بين التلميذ وصورته: $${distMirrorM} + ${distMirrorM} = ${distPersonToImg} "m"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) في الجزء الأيمن، ينتقل الشعاع من الهواء إلى *${med.name}*. هل يقترب الشعاع المنكسر من الناظم أم يبتعد عنه؟ علل، ثم فسر سبب رؤية قلم رصاص مغموس في كأس ماء وكأنه منكسر.`,
						answer: `3) *يقترب الشعاع المنكسر من الناظم* ($i_2 < i_1$) لأن سرعة الضوء في ${med.name} أقل منها في الهواء ($n_2 = ${med.n2} > 1$).\nيبدو القلم منكسراً لأن الأشعة القادمة من جزئه المغمور تنحرف (تنكسر مبتعدة عن الناظم) عند خروجها من الماء إلى الهواء فتصل للعين بمسار مغير.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر تطبيقاً تكنولوجياً هاماً لكل من: (أ) الانعكاس على المرآة المستوية، و(ب) الانعكاس الكلي المرتبط بانكسار الضوء.`,
						answer: `4) أ) تطبيق للانعكاس: *البيريسكوب* (منظار الغواصات) أو مرايا السيارات.\nب) تطبيق للانعكاس الكلي: *الألياف البصرية* في الاتصالات والإنترنت السريع والمنظار الطبي.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`زاوية الورود تُقاس مع الناظم وليس مع سطح المرآة: $i = 90^\\circ - ${alphaDeg}^\\circ$.`,
				'صورة المرآة المستوية متناظرة خلفها على نفس البُعد.',
				'عند انتقال الضوء من الهواء إلى وسط أكثر كثافة ضوئية (ماء/زجاج) يقترب من الناظم.'
			],
			solutionStepsAr: [
				`الانعكاس: $i = 90^\\circ - ${alphaDeg}^\\circ = ${iDeg}^\\circ$ و$i' = ${iDeg}^\\circ$ (والزاوية الكلية $${totalRayAngle}^\\circ$).`,
				`بُعد الصورة عن التلميذ: $2 \\times ${distMirrorM} = ${distPersonToImg}\\,\\text{m}$.`,
				`في ${med.name} يقترب الشعاع من الناظم لتناقص سرعة الضوء، وتُطبَّق الظاهرة في الألياف البصرية.`
			],
			finalAnswer: `i = i' = ${iDeg}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Prism Dispersion, Visible Spectrum, Speed of Light & Light-Year
// ═══════════════════════════════════════════════════════════════════════════════

const tplPrismSpeedLightYear: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t2_prism_speed_light_year',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'optics',
	titleAr: 'تبدد الضوء الأبيض عبر الموشور، سرعة الضوء، والسنة الضوئية',
	curriculumLessonId: 'phy_lesson_1as_tcl_t2_dispersion_spectrum_speed_light_year',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const stars = [
			{ name: 'قنطورس الأقرب', distLy: 4.2 },
			{ name: 'الشعرى اليمانية (سيريوس)', distLy: 8.6 },
			{ name: 'النسر الواقع (فيغا)', distLy: 25 },
			{ name: 'الدبران', distLy: 65 }
		];
		const star = difficulty === 'easy' ? stars[0] : rng.pick(stars);
		const distKmSci = roundTo(star.distLy * 9.46, 2); // * 10^12 km

		const planetDistMKm = rng.pick([60, 90, 150, 210]); // millions of km
		const travelSec = Math.round((planetDistMKm * 1e6) / 3e5);

		const svg = buildPrismAndStarSvg(star.name, star.distLy);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t2_prism_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`مسافة تقدر بنحو $${distKmSci} \\times 10^{12}\\,\\text{km}$ ويستغرق ضوؤه $${star.distLy}$ سنة ليصل إلينا`,
			[
				{
					text: `مدة زمنية تساوي $${star.distLy}$ سنة، ولا تقاس بالكيلومتر`,
					diagnosticFeedback: 'خطأ شائع! السنة الضوئية هي وحدة مسافة وليست وحدة زمن!'
				},
				{
					text: `مسافة تقدر بنحو $${roundTo(star.distLy * 150, 1)}\\,\\text{km}$ مليونية (الوحدة الفلكية)`,
					diagnosticFeedback: 'استعملت قيمة الوحدة الفلكية ($150$ مليون $\\text{km}$) بدلاً من السنة الضوئية ($9.46 \\times 10^{12}\\,\\text{km}$).'
				},
				{
					text: `مسافة تقدر بنحو $${roundTo(9.46 / star.distLy, 2)} \\times 10^{12}\\,\\text{km}$`,
					diagnosticFeedback: 'قسمت $9.46$ على عدد السنوات الضوئية بدلاً من الضرب!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يبعد نجم **${star.name}** عن الأرض مسافة قدرها $${star.distLy}\\,\\text{a.l.}$ (سنة ضوئية). علماً أن $1\\,\\text{a.l.} \\approx 9.46 \\times 10^{12}\\,\\text{km}$، ماذا تمثل هذه القيمة بالكيلومتر وما الزمن الذي يستغرقه ضوء النجم ليصل إلينا؟`,
				questionTextAr: `حوّل بُعد نجم ${star.name} ($${star.distLy}\\,\\text{a.l.}$) إلى الكيلومتر وحدد زمن وصول ضوئه:`,
				imageUrl: svgPath,
				imageCaption: 'تبدد ضوء النجم عبر الموشور وبعده الفلكي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `السنة الضوئية وحدة مسافة: $d = ${star.distLy} \\times 9.46 \\times 10^{12} \\approx ${distKmSci} \\times 10^{12}\\,\\text{km}$، ويستغرق ضوء النجم $${star.distLy}$ سنة ليصل إلى الأرض.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يدرس فلكي طيف الضوء الأبيض الصادر عن نجم *${star.name}* الذي يبعد عن الأرض مسافة $d = ${star.distLy} "a.l."$ (سنة ضوئية)، كما يقيس زمن وصول إشارة ضوئية من كوكب يبعد عنا $${planetDistMKm}$ مليون كيلومتر.\nنعطي: سرعة الضوء في الفراغ $c = 300\\,000 "km/s"$، والسنة الضوئية $1 "a.l." approx 9.46 times 10^(12) "km"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) ماذا نسمي ظاهرة تفكك الضوء الأبيض عند عبوره الموشور الزجاجي؟ رتب ألوان الطيف السبعة الناتجة من الأقل انحرافاً إلى الأكثر انحرافاً.`,
								answer: `1) تسمى الظاهرة *تبدد الضوء الأبيض*.\nالترتيب من الأقل انحرافاً إلى الأكثر انحرافاً: *الأحمر، البرتقالي، الأصفر، الأخضر، الأزرق، النيلي، البنفسجي*.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `الموشور وبُعد النجم ${star.name}`
							}
						]
					},
					{
						type: 'text',
						content: `2) إذا استبدلنا الضوء الأبيض بشعاع *ليزر أحمر*، هل يتبدد عبر الموشور؟ علل إجابتك بالتمييز بين الضوء وحيد اللون ومتعدد الألوان.`,
						answer: `2) *لا يتبدد* شعاع الليزر الأحمر بل ينحرف فقط؛ لأنه *ضوء وحيد اللون* (إشعاع بسيط واحد)، بينما الضوء الأبيض *ضوء متعدد الألوان*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) عرّف *السنة الضوئية* ($"a.l."$)، ثم احسب بالكيلومتر المسافة الفاصلة بين الأرض ونجم *${star.name}* ($${star.distLy} "a.l."$).`,
						answer: `3) *السنة الضوئية* هي المسافة التي يقطعها الضوء في الفراغ خلال سنة أرضية واحدة.\nالمسافة: $d = ${star.distLy} times 9.46 times 10^(12) approx ${distKmSci} times 10^(12) "km"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) احسب بالثواني ($"s"$) المدة الزمنية التي يستغرقها الضوء ليقطع المسافة بين الأرض وكوكب يبعد عنا $${planetDistMKm} times 10^6 "km"$.`,
						answer: `4) $t = frac(d, c) = frac(${planetDistMKm} times 10^6, 300\\,000) = ${travelSec} "s"$.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الأحمر أقل ألوان الطيف انحرافاً والبنفسجي أكثرها انحرافاً.',
				'الليزر ضوء وحيد اللون لا يتبدد عبر الموشور.',
				'السنة الضوئية وحدة مسافة: اضرب عدد السنوات الضوئية في $9.46 \\times 10^{12}\\,\\text{km}$.'
			],
			solutionStepsAr: [
				'التبدد يعطي 7 ألوان من الأحمر (أقل انحرافاً) إلى البنفسجي (أكثر انحرافاً).',
				'الليزر الأحمر وحيد اللون لا يتبدد.',
				`بُعد النجم: $${distKmSci} \\times 10^{12}\\,\\text{km}$، وزمن وصول ضوء الكوكب: $t = ${travelSec}\\,\\text{s}$.`
			],
			finalAnswer: `${distKmSci} × 10¹² km`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 (Integration): Optical Communications & Astronomical Observation
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationOpticsCommunication: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t2_integration_optics_communication',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'وضعية إدماجية (الإنسان والاتصال — الضوء): الألياف البصرية ورصد الكسوف والطيف',
	curriculumLessonId: 'phy_lesson_1as_tcl_t2_dispersion_spectrum_speed_light_year',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const links = [
			{ route: 'الجزائر العاصمة ووهران', km: 400 },
			{ route: 'الجزائر العاصمة وقسنطينة', km: 400 },
			{ route: 'وهران وبشار', km: 600 },
			{ route: 'الجزائر العاصمة وتمنراست', km: 2000 }
		];
		const link = difficulty === 'easy' ? links[0] : rng.pick(links);
		const vGlassKms = 200000;
		const timeSec = roundTo(link.km / vGlassKms, 4);
		const timeMs = roundTo(timeSec * 1000, 1);

		// Sun diameter through pinhole camera: Sun angular diameter approx 1/100 rad => A'B' / d' = 1 / 100
		const camDepthCm = rng.pick([50, 100, 150, 200]);
		const sunImgCm = roundTo(camDepthCm / 100, 2);
		const starLy = rng.pick([4.2, 8.6, 12]);
		const starKmSci = roundTo(starLy * 9.46, 2);

		const svg = buildIntegrationOpticsSvg(link.km, sunImgCm, starLy);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t2_int_opt_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$t = ${timeMs}\\,\\text{ms}$؛ وتنتقل الإشارة بالانعكاس الكلي الداخلي`,
			[
				{
					text: `$t = ${roundTo(link.km / 300, 2)}\\,\\text{ms}$؛ وتنتقل الإشارة بالانعكاس الكلي`,
					diagnosticFeedback: 'خطأ: سرعة الضوء داخل الزجاج هي $200\\,000\\,\\text{km/s}$ وليست $300\\,000\\,\\text{km/s}$ (سرعته في الفراغ).'
				},
				{
					text: `$t = ${timeSec}\\,\\text{ms}$؛ وتنتقل الإشارة بتبدد الموشور`,
					diagnosticFeedback: 'خطأ في التحويل من الثانية إلى الميلي ثانية ($1\\,\\text{s} = 1000\\,\\text{ms}$)، والظاهرة هي الانعكاس الكلي.'
				},
				{
					text: `$t = ${roundTo(timeMs * 10, 1)}\\,\\text{ms}$؛ وتنتقل الإشارة بالظل والظليل`,
					diagnosticFeedback: 'راجع الحساب: $t(\\text{s}) = \\frac{d}{v}$ ثم نضرب في $1000$ للتحويل إلى $\\text{ms}$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تربط شبكة اتصالات حديثة بين **${link.route}** بكابل من الألياف البصرية طوله $d = ${link.km}\\,\\text{km}$. إذا كانت سرعة الضوء داخل قلب الليف الزجاجي $v = 200\\,000\\,\\text{km/s}$، ما المدة الزمنية بالميلي ثانية ($\\text{ms}$) لوصول الإشارة الضوئية وما الظاهرة التي تبقيها محصورة داخل الليف؟`,
				questionTextAr: `احسب زمن وصول الإشارة الضوئية بالميلي ثانية وحدد الظاهرة البصرية في الليف:`,
				imageUrl: svgPath,
				imageCaption: 'الرابط البصري والرصد الفلكي المدمج',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$t = \\frac{${link.km}}{200\\,000} = ${timeSec}\\,\\text{s} = ${timeMs}\\,\\text{ms}$، ويستمر الضوء محصوراً داخل الليف بفضل **الانعكاس الكلي الداخلي**.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'الوضعية الإدماجية — الإنسان والاتصال (الضوء)',
				instruction: `نظم نادي علم الفلك والاتصالات بالثانوية يوماً دراسياً تناول فيه: ربط مدينتي *${link.route}* بالألياف البصرية ($d = ${link.km} "km"$)، ورصد ظاهرة كسوف الشمس بأمان عبر الغرفة المظلمة، وتحليل ضوء نجم يبعد عنا $${starLy} "a.l."$.\nنعطي: سرعة الضوء في زجاج الليف $v = 200\\,000 "km/s"$، وفي الفراغ $c = 300\\,000 "km/s"$، و$1 "a.l." approx 9.46 times 10^(12) "km"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'معطيات مشروع الاتصالات البصرية والرصد الفلكي',
						width: 350
					},
					{
						type: 'text',
						content: `*الجزء الأول: الألياف البصرية وسرعة الضوء (2.5 نقطة)*\n1) لماذا تكون سرعة الضوء داخل الليف الزجاجي ($200\\,000 "km/s"$) أقل من سرعته في الفراغ ($300\\,000 "km/s"$)? وما الظاهرة التي تسمح للضوء بالسير داخل الليف المنحني دون خروجه؟\n2) احسب الزمن المستغرق لانتقال نبضة ضوئية بين ${link.route} بالثواني ثم بالميلي ثانية ($"ms"$).`,
						answer: `1) تقل سرعة الضوء لأن الزجاج وسط مادي شفاف أشد كسراً من الفراغ ($n > 1$).\nالظاهرة التي تحافظ على الضوء داخل الليف هي *الانعكاس الكلي الداخلي المتكرر*.\n2) $t = frac(${link.km}, 200\\,000) = ${timeSec} "s" = ${timeMs} "ms"$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: كسوف الشمس والغرفة المظلمة (3 نقاط)*\n1) فسر سبب حدوث كسوف الشمس (الترتيب الفلكي وطور القمر)، ولماذا نهى المختصون عن مشاهدته بالعين المجردة؟\n2) بنى التلاميذ غرفة مظلمة عمقها $d' = ${camDepthCm} "cm"$ لإسقاط صورة قرص الشمس بأمان. إذا علمت أن نسبة قطر الشمس إلى بعدها عن الأرض تساوي $frac(A B, d) = frac(1, 100)$، فاحسب قطر صورة الشمس $A'B'$ على الشاشة واذكر صفتها (معتدلة أم مقلوبة).`,
						answer: `1) يحدث كسوف الشمس *نهاراً* عندما يقع *القمر (محاق) بين الشمس والأرض* على استقامة واحدة، فيسقط ظل القمر على الأرض؛ وهي آية من آيات الله.\nيمنع النظر مباشرة لأن أشعة الشمس المركزة تحرق شبكية العين.\n2) $frac(A'B', d') = frac(A B, d) = frac(1, 100) arrow.r.double A'B' = frac(${camDepthCm}, 100) = ${sunImgCm} "cm"$، وتكون الصورة *حقيقية ومقلوبة*.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: تبدد الضوء والسنة الضوئية (2.5 نقطة)*\n1) عند تمرير ضوء النجم عبر موشور زجاجي، يتبدد إلى ألوان الطيف. أي لونين يحدّان الطيف (الأقل انحرافاً والأكثر انحرافاً)؟ ولماذا لا يتبدد شعاع الليزر داخل الليف البصري؟\n2) احسب بالكيلومتر المسافة بين الأرض والنجم البعيد عنا $${starLy} "a.l."$.`,
						answer: `1) الأقل انحرافاً هو *الأحمر* والأكثر انحرافاً هو *البنفسجي*.\nلا يتبدد الليزر لأنه *ضوء وحيد اللون* (إشعاع واحد بسيط).\n2) $d = ${starLy} times 9.46 times 10^(12) approx ${starKmSci} times 10^(12) "km"$.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'في الألياف البصرية ينتقل الضوء عبر سلسلة من الانعكاسات الكلية الداخلية.',
				`لحساب قطر صورة الشمس في الغرفة المظلمة: $A'B' = d' \\times \\frac{AB}{d} = \\frac{${camDepthCm}}{100}$.`,
				'السنة الضوئية وحدة مسافة تساوي $9.46 \\times 10^{12}\\,\\text{km}$.'
			],
			solutionStepsAr: [
				`زمن النقل في الليف البصري: $t = ${timeSec}\\,\\text{s} = ${timeMs}\\,\\text{ms}$ بالانعكاس الكلي.`,
				`قطر صورة الكسوف في الغرفة المظلمة: $A'B' = ${sunImgCm}\\,\\text{cm}$ (مقلوبة).`,
				`طيف النجم يمتد من الأحمر (أقل انحرافاً) إلى البنفسجي، وبعده $${starKmSci} \\times 10^{12}\\,\\text{km}$.`
			],
			finalAnswer: `t = ${timeMs} ms, A'B' = ${sunImgCm} cm`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates for 1AS TCL Physics
// ═══════════════════════════════════════════════════════════════════════════════

export const PHYSICS_TEMPLATES_1AS_TCL_T2: PhysicsParameterizedTemplate[] = [
	tplCameraObscuraMedia,
	tplShadowsEclipses,
	tplReflectionRefraction,
	tplPrismSpeedLightYear,
	tplIntegrationOpticsCommunication
];
