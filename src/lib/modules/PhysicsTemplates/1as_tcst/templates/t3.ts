import type { Difficulty, PhysicsGeneratedExerciseInstance, PhysicsParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot, wrapPhysicsSvg } from '../../svg-physics';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom SVG Builders for 1AS TCST T3
// ═══════════════════════════════════════════════════════════════════════════════

function buildRefractionSvg(n1: number, n2: number, i1Deg: number, i2Deg: number, name1: string, name2: string): string {
	let body = `<defs>
		<marker id="rfRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
		<marker id="rfBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
	</defs>`;
	body += `<rect x="10" y="12" width="360" height="176" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<rect x="11" y="100" width="358" height="87" fill="#dbeafe" fill-opacity="0.65"/>`;
	body += `<line x1="12" y1="100" x2="368" y2="100" stroke="#1d4ed8" stroke-width="1.8"/>`;
	body += `<line x1="175" y1="26" x2="175" y2="178" stroke="#64748b" stroke-width="1.3" stroke-dasharray="4,3"/>`;
	body += `<text x="26" y="40" font-size="11.5" font-weight="bold" fill="#334155">${name1} (n₁ = ${n1})</text>`;
	body += `<text x="26" y="120" font-size="11.5" font-weight="bold" fill="#1e3a8a">${name2} (n₂ = ${n2})</text>`;

	const rad1 = (i1Deg * Math.PI) / 180;
	const rad2 = (i2Deg * Math.PI) / 180;
	const rLen = 78;
	const xIn = 175 - rLen * Math.sin(rad1);
	const yIn = 100 - rLen * Math.cos(rad1);
	const xOut = 175 + rLen * Math.sin(rad2);
	const yOut = 100 + rLen * Math.cos(rad2);

	body += `<line x1="${xIn.toFixed(1)}" y1="${yIn.toFixed(1)}" x2="175" y2="100" stroke="#dc2626" stroke-width="2.2" marker-end="url(#rfRed)"/>`;
	body += `<text x="${(175 - 22 * Math.sin(rad1 / 2) - 8).toFixed(1)}" y="66" font-size="11.5" font-weight="bold" fill="#dc2626">i₁=${i1Deg}°</text>`;
	body += `<line x1="175" y1="100" x2="${xOut.toFixed(1)}" y2="${yOut.toFixed(1)}" stroke="#2563eb" stroke-width="2.2" marker-end="url(#rfBlue)"/>`;
	body += `<text x="${(175 + 24 * Math.sin(rad2 / 2) + 8).toFixed(1)}" y="148" font-size="11.5" font-weight="bold" fill="#2563eb">i₂=${i2Deg}°</text>`;

	body += `<rect x="248" y="26" width="110" height="62" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>`;
	body += `<text x="303" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">قانون ديكارت</text>`;
	body += `<text x="303" y="70" text-anchor="middle" font-size="11" fill="#2563eb">n₁ sin i₁ = n₂ sin i₂</text>`;
	return wrapPhysicsSvg(380, 200, body);
}

function buildPrismSvg(angleA: number, iDeg: number, iPrimeDeg: number, devDeg: number): string {
	let body = '';
	body += `<rect x="10" y="12" width="360" height="176" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>`;
	body += `<polygon points="180,42 118,158 242,158" fill="#bae6fd" fill-opacity="0.25" stroke="#7dd3fc" stroke-width="2"/>`;
	body += `<text x="180" y="34" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#bae6fd">A = ${angleA}°</text>`;
	body += `<polyline fill="none" stroke="#facc15" stroke-width="2.4" points="48,128 148,102 214,116 328,152"/>`;
	body += `<line x1="48" y1="128" x2="290" y2="66" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,3"/>`;
	body += `<text x="86" y="106" font-size="11" font-weight="bold" fill="#fde047">i = ${iDeg}°</text>`;
	body += `<text x="276" y="160" font-size="11" font-weight="bold" fill="#fde047">i' = ${iPrimeDeg}°</text>`;
	body += `<text x="278" y="96" font-size="11" font-weight="bold" fill="#f87171">D = ${devDeg}°</text>`;
	return wrapPhysicsSvg(380, 200, body);
}

function buildStarSpectrumSvg(starName: string, linesNm: number[]): string {
	let body = `<defs><linearGradient id="spGr" x1="0%" y1="0%" x2="100%" y2="0%">
		<stop offset="0%" stop-color="#7c3aed"/>
		<stop offset="25%" stop-color="#2563eb"/>
		<stop offset="50%" stop-color="#22c55e"/>
		<stop offset="72%" stop-color="#eab308"/>
		<stop offset="100%" stop-color="#dc2626"/>
	</linearGradient></defs>`;
	body += `<rect x="10" y="10" width="370" height="162" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="195" y="32" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">طيف امتصاص النجم ${starName} (λ بوحدة nm)</text>`;
	body += `<rect x="26" y="48" width="338" height="44" rx="4" fill="url(#spGr)" stroke="#0f172a" stroke-width="1.2"/>`;
	const mapX = (nm: number) => 26 + ((nm - 400) / 300) * 338;
	for (const nm of linesNm) {
		const px = Math.min(358, Math.max(32, mapX(nm)));
		body += `<line x1="${px.toFixed(1)}" y1="49" x2="${px.toFixed(1)}" y2="91" stroke="#0f172a" stroke-width="3"/>`;
		body += `<text x="${px.toFixed(1)}" y="110" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">${nm}</text>`;
	}
	body += `<text x="26" y="136" font-size="10.5" fill="#475569">400 nm (بنفسجي)</text>`;
	body += `<text x="364" y="136" text-anchor="end" font-size="10.5" fill="#475569">700 nm (أحمر)</text>`;
	body += `<text x="195" y="158" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">طابق مواقع الخطوط السوداء مع أطياف المخابر لتحديد العناصر</text>`;
	return wrapPhysicsSvg(390, 182, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Refraction, Snell-Descartes & Total Internal Reflection (Lesson 1)
// ═══════════════════════════════════════════════════════════════════════════════

const tplRefractionTir: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t3_refraction_tir',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'انكسار الضوء، قانونا ديكارت، والانعكاس الكلي (الألياف البصرية)',
	curriculumLessonId: 'phy_lesson_1as_tcst_t3_refraction_snell_descartes',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const media = [
			{ name: 'الماء', n2: 1.33 },
			{ name: 'زجاج التاج', n2: 1.50 },
			{ name: 'زجاج الصوان', n2: 1.60 },
			{ name: 'البلكسيغلاس', n2: 1.49 }
		];
		const m = rng.pick(media);
		const n1 = 1.0;
		const i1Deg = difficulty === 'easy' ? rng.pick([30, 45]) : rng.pick([30, 40, 45, 50, 60]);
		const sinI2 = (n1 * Math.sin((i1Deg * Math.PI) / 180)) / m.n2;
		const i2Deg = roundTo((Math.asin(sinI2) * 180) / Math.PI, 1);
		const vMedium = roundTo(3.0 / m.n2, 2); // * 10^8 m/s
		const iCritDeg = roundTo((Math.asin(n1 / m.n2) * 180) / Math.PI, 1);
		const testAngle = Math.ceil(iCritDeg) + 8;

		const svg = buildRefractionSvg(n1, m.n2, i1Deg, i2Deg, 'الهواء', m.name);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t3_refr_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$i_2 \\approx ${i2Deg}^\\circ$`,
			[
				{
					text: `$i_2 \\approx ${i1Deg}^\\circ$`,
					diagnosticFeedback: 'خطأ: تساوي الزاويتين يحدث في الانعكاس ($i_1 = i\'_1$)، أما في الانكسار فيتغير اتجاه الشعاع!'
				},
				{
					text: `$i_2 \\approx ${roundTo(90 - i2Deg, 1)}^\\circ$`,
					diagnosticFeedback: 'خطأ: هذه الزاوية المحصورة مع السطح الكاسر وليس مع الناظم!'
				},
				{
					text: `$i_2 \\approx ${roundTo(i1Deg * m.n2, 1)}^\\circ$`,
					diagnosticFeedback: 'خطأ: قانون ديكارت يربط جيوب الزوايا ($\\sin i$) لا الزوايا نفسها، وعند $n_2 > n_1$ تقل الزاوية.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يرد شعاع ضوئي من الهواء ($n_1 = 1.00$) على سطح ${m.name} ($n_2 = ${m.n2}$) بزاوية ورود $i_1 = ${i1Deg}^\\circ$. ما هي زاوية الانكسار $i_2$؟`,
				questionTextAr: `احسب زاوية الانكسار $i_2$:`,
				imageUrl: svgPath,
				imageCaption: `انكسار شعاع ضوئي من الهواء نحو ${m.name}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتطبيق قانون ديكارت: $n_1 \\sin i_1 = n_2 \\sin i_2 \\implies \\sin i_2 = \\frac{1.00 \\times \\sin ${i1Deg}^\\circ}{${m.n2}} \\approx ${roundTo(sinI2, 3)} \\implies i_2 \\approx ${i2Deg}^\\circ$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نرسل حزمة ضوئية وحيدة اللون من الهواء ($n_1 = 1.00$) نحو كتلة شفافة من ${m.name} قرينة انكساره $n_2 = ${m.n2}$ بزاوية ورود $i_1 = ${i1Deg} degree$.\nنعطي سرعة الضوء في الخلاء: $c = 3.0 times 10^8 "m/s"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `ظاهرة الانكسار عند السطح الفاصل هواء / ${m.name}`,
						width: 340
					},
					{
						type: 'text',
						content: `1) احسب سرعة انتشار الضوء $v$ داخل ${m.name}.`,
						answer: `1) $n_2 = frac(c, v) arrow.r.double v = frac(c, n_2) = frac(3.0 times 10^8, ${m.n2}) approx ${vMedium} times 10^8 "m/s"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) اذكر قانوني ديكارت للانكسار، ثم احسب زاوية الانكسار $i_2$ وزاوية الانعكاس الجزئي $i'_1$.`,
						answer: `2) قانون ديكارت الأول: الشعاع الوارد والشعاع المنكسر والناظم تقع في مستوي واحد.\nالقانون الثاني: $n_1 sin i_1 = n_2 sin i_2 arrow.r.double sin i_2 = frac(1.00 times sin ${i1Deg} degree, ${m.n2}) approx ${roundTo(sinI2, 3)} arrow.r.double i_2 approx ${i2Deg} degree$.\nزاوية الانعكاس: $i'_1 = i_1 = ${i1Deg} degree$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) نُرسل الآن الشعاع من داخل ${m.name} نحو الهواء. حدد شرطي حدوث الانعكاس الكلي ثم احسب الزاوية الحدية $i_ell$.`,
						answer: `3) شرطا الانعكاس الكلي: انتقال الضوء من وسط أشد كسراً إلى أقل كسراً ($n_("وسط") > n_("هواء")$) وكون زاوية الورود أكبر من الزاوية الحدية ($i > i_ell$).\n$sin i_ell = frac(n_1, n_2) = frac(1.00, ${m.n2}) approx ${roundTo(1 / m.n2, 3)} arrow.r.double i_ell approx ${iCritDeg} degree$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) ماذا يحدث إذا ورد الشعاع من ${m.name} نحو الهواء بزاوية $i = ${testAngle} degree$؟ اذكر تطبيقاً تقنياً هاماً لهذه الظاهرة.`,
						answer: `4) بما أن $i = ${testAngle} degree > i_ell = ${iCritDeg} degree$، لا ينكسر الشعاع نحو الهواء بل يحدث *انعكاس كلي* بزاوية انعكاس $i' = ${testAngle} degree$.\nالتطبيق التقني: نقل البيانات في *الألياف البصرية* أو التنظير الطبي.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`قرينة الانكسار $n = c / v$، وسرعة الضوء في الوسط المادي دوماً أقل من $c$.`,
				`قانون ديكارت للانكسار: $n_1 \\sin i_1 = n_2 \\sin i_2$.`,
				`الزاوية الحدية عند الانتقال نحو الهواء: $\\sin i_{\\ell} = \\frac{1}{n_2}$.`
			],
			solutionStepsAr: [
				`سرعة الضوء في ${m.name}: $v \\approx ${vMedium} \\times 10^8\\,\\text{m/s}$.`,
				`زاوية الانكسار: $i_2 \\approx ${i2Deg}^\\circ$ وزاوية الانعكاس $i'_1 = ${i1Deg}^\\circ$.`,
				`الزاوية الحدية: $i_{\\ell} \\approx ${iCritDeg}^\\circ$، وعند $i = ${testAngle}^\\circ$ يحدث انعكاس كلي.`
			],
			finalAnswer: `i₂ ≈ ${i2Deg}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: White Light Dispersion & Prism (Lesson 2)
// ═══════════════════════════════════════════════════════════════════════════════

const tplPrismDispersion: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t3_prism_dispersion',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'تبدد الضوء الأبيض عبر الموشور والإشعاعات وحيدة اللون',
	curriculumLessonId: 'phy_lesson_1as_tcst_t3_white_light_dispersion_prism',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const angleA = 60;
		const nRed = rng.pick([1.51, 1.52]);
		const nViolet = roundTo(nRed + rng.pick([0.03, 0.04]), 2);
		const iDeg = difficulty === 'easy' ? 45 : rng.pick([40, 45, 50]);
		const sinR = Math.sin((iDeg * Math.PI) / 180) / nRed;
		const rDeg = roundTo((Math.asin(sinR) * 180) / Math.PI, 1);
		const rPrimeDeg = roundTo(angleA - rDeg, 1);
		const sinIPrime = Math.min(0.999, nRed * Math.sin((rPrimeDeg * Math.PI) / 180));
		const iPrimeDeg = roundTo((Math.asin(sinIPrime) * 180) / Math.PI, 1);
		const devDeg = roundTo(iDeg + iPrimeDeg - angleA, 1);

		const svg = buildPrismSvg(angleA, iDeg, iPrimeDeg, devDeg);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t3_prism_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$D = ${devDeg}^\\circ$`,
			[
				{
					text: `$D = ${roundTo(iDeg + iPrimeDeg + angleA, 1)}^\\circ$`,
					diagnosticFeedback: 'خطأ: علاقة الانحراف في الموشور هي $D = i + i\' - A$ وليس $+ A$.'
				},
				{
					text: `$D = ${roundTo(iDeg + iPrimeDeg, 1)}^\\circ$`,
					diagnosticFeedback: 'خطأ: نسيت طرح زاوية رأس الموشور $A = 60^\\circ$.'
				},
				{
					text: `$D = ${roundTo(Math.abs(iPrimeDeg - iDeg), 1)}^\\circ$`,
					diagnosticFeedback: 'خطأ: الانحراف الكلي يساوي مجموع زاويتي الورود والخروج منقوصاً منه $A$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يرد شعاع أحمر وحيد اللون على موشور زجاجي زاوية رأسه $A = ${angleA}^\\circ$ بزاوية ورود $i = ${iDeg}^\\circ$ ويخرج من الوجه الثاني بزاوية $i' = ${iPrimeDeg}^\\circ$. ما هي زاوية الانحراف $D$؟`,
				questionTextAr: `احسب زاوية الانحراف $D$ عبر الموشور:`,
				imageUrl: svgPath,
				imageCaption: `انحراف شعاع ضوئي عبر موشور ($A = ${angleA}^\\circ$)`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `علاقة الانحراف في الموشور: $D = i + i' - A = ${iDeg}^\\circ + ${iPrimeDeg}^\\circ - ${angleA}^\\circ = ${devDeg}^\\circ$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نُرسل حزمة ضوئية على موشور زجاجي زاوية رأسه $A = ${angleA} degree$ موضوع في الهواء ($n_("air") = 1.00$).\nقرينة انكسار هذا الزجاج للإشعاع الأحمر ($lambda_R = 656 "nm"$) هي $n_R = ${nRed}$، وللبنفسجي ($lambda_V = 410 "nm"$) هي $n_V = ${nViolet}$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `مسار الشعاع الضوئي عبر الموشور`,
						width: 340
					},
					{
						type: 'text',
						content: `1) ميّز بين الضوء الأبيض والضوء وحيد اللون عند اجتياز الموشور، واذكر اسم الظاهرة الملاحظة للضوء الأبيض.`,
						answer: `1) *الضوء وحيد اللون* لا يتبدد عند اجتياز الموشور ويمتاز بطول موجة واحد $lambda$؛ أما *الضوء الأبيض* فهو متعدد الألوان ويتفكك إلى طيف مستمر من الألوان في ظاهرة تُسمى *تبدد الضوء*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) فسر لماذا ينحرف الإشعاع البنفسجي أكثر من الإشعاع الأحمر عبر الموشور، وماذا نسمي الزجاج في هذه الحالة؟`,
						answer: `2) لأن قرينة انكسار الزجاج تتعلق بطول الموجة $lambda$، وحيث إن $n_V (${nViolet}) > n_R (${nRed})$ فإن الإشعاع البنفسجي يعاني انحرافاً أكبر. يُسمى الزجاج *وسطاً مبدداً*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بالنسبة للإشعاع الأحمر الذي يرد بزاوية $i = ${iDeg} degree$، احسب زاوية الانكسار الأولى $r$ داخل الموشور، ثم استنتج زاوية الورود الثانية $r'$ على الوجه الثاني.`,
						answer: `3) على الوجه الأول: $sin r = frac(sin ${iDeg} degree, ${nRed}) approx ${roundTo(sinR, 3)} arrow.r.double r approx ${rDeg} degree$.\nعلى الوجه الثاني: من علاقة الموشور $A = r + r' arrow.r.double r' = ${angleA} - ${rDeg} = ${rPrimeDeg} degree$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) علماً أن زاوية الخروج هي $i' = ${iPrimeDeg} degree$، احسب زاوية الانحراف الكلية $D$ للإشعاع الأحمر.`,
						answer: `4) $D = i + i' - A = ${iDeg} + ${iPrimeDeg} - ${angleA} = ${devDeg} degree$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`الموشور وسط مبدِّد لأن قرينة انكساره تزداد بنقصان طول الموجة $\\lambda$ ($n_V > n_R$).`,
				`علاقات الموشور: $A = r + r'$ و$D = i + i' - A$.`,
				`استخدم قانون ديكارت على الوجه الأول لإيجاد $r$: $\\sin i = n \\sin r$.`
			],
			solutionStepsAr: [
				`الضوء الأبيض متعدد الألوان يتبدد لأن $n$ تتعلق بـ $\\lambda$ ($n_V > n_R$).`,
				`زاوية الانكسار الأولى $r \\approx ${rDeg}^\\circ$ و$r' \\approx ${rPrimeDeg}^\\circ$.`,
				`زاوية الانحراف الكلية $D = ${devDeg}^\\circ$.`
			],
			finalAnswer: `D = ${devDeg}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Emission & Absorption Spectra & Astrophysics (Lesson 3)
// ═══════════════════════════════════════════════════════════════════════════════

const tplSpectraAstrophysics: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t3_spectra_astrophysics',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'أطياف الإصدار والامتصاص وتحليل غلاف النجوم',
	curriculumLessonId: 'phy_lesson_1as_tcst_t3_emission_absorption_spectra',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const elementsDb = [
			{ sym: 'H', nameAr: 'الهيدروجين', lines: [410, 434, 486, 656] },
			{ sym: 'Na', nameAr: 'الصوديوم', lines: [589] },
			{ sym: 'He', nameAr: 'الهيليوم', lines: [447, 588, 668] },
			{ sym: 'Hg', nameAr: 'الزئبق', lines: [436, 546, 579] }
		];
		const chosenPair = rng.pick([
			{ star: 'سيروس (Sirius)', tempK: 9900, colorAr: 'أبيض مزرق', elem1: elementsDb[0], elem2: elementsDb[1] },
			{ star: 'الشمس (Sun)', tempK: 5800, colorAr: 'أصفر أبيض', elem1: elementsDb[0], elem2: elementsDb[2] },
			{ star: 'فيغا (Vega)', tempK: 9600, colorAr: 'أبيض مزرق', elem1: elementsDb[2], elem2: elementsDb[1] }
		]);
		const starLines = [...chosenPair.elem1.lines.slice(0, 2), ...chosenPair.elem2.lines.slice(0, 2)].sort((a, b) => a - b);
		const svg = buildStarSpectrumSvg(chosenPair.star, starLines);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t3_spec_${difficulty}_s${seed}`, svg);

		const correctElements = `${chosenPair.elem1.nameAr} (${chosenPair.elem1.sym}) و${chosenPair.elem2.nameAr} (${chosenPair.elem2.sym})`;
		const mcq = buildUniqueMcqOptions(
			correctElements,
			[
				{
					text: `الزئبق (Hg) وحده`,
					diagnosticFeedback: 'خطأ: خطوط الزئبق ($436, 546, 579\\,\\text{nm}$) لا تطابق الخطوط الظاهرة في طيف النجم.'
				},
				{
					text: `الهيدروجين (H) والزئبق (Hg)`,
					diagnosticFeedback: 'خطأ: تحقق من أطوال الموجات الخاصة بكل عنصر في الجدول.'
				},
				{
					text: `لا يمكن معرفة العناصر لأن الخطوط سوداء وليست ملونة`,
					diagnosticFeedback: 'خطأ: الخطوط السوداء (طيف الامتصاص) تقع عند نفس $\\lambda$ لخطوط الإصدار المميزة للعنصر!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يُظهر طيف الامتصاص للنجم ${chosenPair.star} خطوطاً داكنة عند الأطوال الموجية: $${starLines.join(', ')}\\,\\text{nm}$. علماً أن خطوط الإصدار المميزة هي: H ($410, 434, 486, 656$), Na ($589$), He ($447, 588, 668$), Hg ($436, 546, 579$). ما هما العنصران الموجودان في غلاف النجم؟`,
				questionTextAr: `حدد العناصر المكتشفة في غلاف النجم:`,
				imageUrl: svgPath,
				imageCaption: `طيف الامتصاص للنجم ${chosenPair.star}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بمطابقة الأطوال الموجية $${starLines.join(', ')}\\,\\text{nm}$ مع الجدول نجد أنها توافق عنصري ${correctElements}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `التحليل الطيفي أداة أساسية لدراسة النجوم عن بعد. ندرس طيف النجم ${chosenPair.star} ذي اللون ${chosenPair.colorAr} (درجة حرارة سطحه $T approx ${chosenPair.tempK} "K"$).`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `تمثيل تخطيطي لطيف الامتصاص النجمي`,
						width: 350
					},
					{
						type: 'table',
						headers: ['العنصر الكيميائي', 'أطوال موجات الإصدار المميزة ($lambda$ بـ $"nm"$)'],
						cells: [],
						rows: elementsDb.map((el) => [`${el.nameAr} (${el.sym})`, el.lines.join(' ; ')]),
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `1) ما نوع الطيف الذي يُصدره قلب النجم المتوهج قبل عبوره الغلاف الغازي؟ وكيف يتغير عند مرور الضوء عبر الغلاف الغازي البارد نسبياً؟`,
						answer: `1) يُصدر قلب النجم المتوهج *طيف إصدار مستمراً*. وعند عبوره الغلاف الغازي الأقل حرارة، تمتص ذرات الغاز بعض الإشعاعات الخاصة بها فتظهر خطوط سوداء، فنحصل على *طيف امتصاص*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) ظهرت في طيف النجم خطوط امتصاص عند: $${starLines.join(" nm ; ")} "nm"$. استنتج العنصرين الكيميائيين الموجودين في غلافه الجوي مع التعليل.`,
						answer: `2) بمطابقة الأطوال الموجية للخطوط الداكنة مع الجدول المخبري (حيث يمتص العنصر نفس الإشعاعات التي يصدرها)، نجد وجود عنصري: *${correctElements}*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) قارن درجة حرارة النجم ${chosenPair.star} ($${chosenPair.tempK} "K"$) بنجم آخر أحمر اللون مثل منكب الجوزاء ($T approx 3500 "K"$). كيف نستدل طيفياً على ذلك؟`,
						answer: `3) النجم ${chosenPair.star} أشد حرارة من منكب الجوزاء. نستدل طيفياً من الطيف المستمر: كلما ارتفعت درجة الحرارة اغتنى الطيف المستمر بالإشعاعات ذات الأطوال الموجية القصيرة (الأزرق والبنفسجي).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر فرقاً أساسياً واحداً بين طيف الإصدار المستمر وطيف الإصدار المتقطع (الخطوط) من حيث المصدر والمظهر.`,
						answer: `4) *طيف الإصدار المستمر* يصدر عن الأجسام الصلبة أو السائلة أو الغازات عالية الضغط المتوهجة ويظهر كشريط متصل من الألوان؛ أما *طيف الإصدار المتقطع* فيصدر عن غاز منخفض الضغط مثار ويظهر على شكل خطوط ملونة متباعدة على خلفية سوداء.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`ذرات الغلاف الغازي البارد تمتص نفس الأطوال الموجية التي تصدرها وهي ساخنة مثارة.`,
				`قارن كل قيمة طول موجة $\\lambda$ مع الجدول المرفق.`,
				`الطيف المستمر يخبرنا عن درجة حرارة السطح، وخطوط الامتصاص تخبرنا عن التركيب الكيميائي.`
			],
			solutionStepsAr: [
				`قلب النجم يصدر طيفاً مستمراً، وغلافه يولّد طيف امتصاص بخطوط داكنة.`,
				`العناصر المكتشفة بمطابقة $\\lambda$: ${correctElements}.`,
				`الامتداد نحو الأزرق/البنفسجي يدل على درجة حرارة سطح أعلى.`
			],
			finalAnswer: correctElements
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Stoichiometry & Progress Table (Lesson 4)
// ═══════════════════════════════════════════════════════════════════════════════

const tplStoichiometryIce: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t3_stoichiometry_ice',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'matter',
	titleAr: 'المقاربة الكمية لتفاعل كيميائي (جدول التقدم والمتفاعل المحد)',
	curriculumLessonId: 'phy_lesson_1as_tcst_t3_stoichiometry_progress_table',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Reaction: Mg(s) + 2 H3O+(aq) -> Mg2+(aq) + H2(g) + 2 H2O(l)
		const mMgG = rng.pick([0.72, 0.96, 1.2, 1.44]); // M(Mg) = 24 g/mol -> nMg = 0.03, 0.04, 0.05, 0.06 mol
		const nMg0 = roundTo(mMgG / 24, 3);
		const vAcidMl = 100;
		const cAcid = difficulty === 'easy' ? rng.pick([0.4, 0.6, 0.8]) : rng.pick([0.5, 0.7, 0.9, 1.0]);
		const nAcid0 = roundTo(cAcid * (vAcidMl / 1000), 3);

		const ratioMg = nMg0;
		const ratioAcid = roundTo(nAcid0 / 2, 4);
		const xMax = Math.min(ratioMg, ratioAcid);
		const isStoich = Math.abs(ratioMg - ratioAcid) < 1e-6;
		const limitingAr = isStoich
			? 'المزيج في الشروط الستكيومترية (ينفد المتفاعلان معاً)'
			: ratioMg < ratioAcid
				? 'المغنيسيوم $\\ce{Mg}$'
				: 'شوارد الهيدرونيوم $\\ce{H3O+}$';
		const limitingTypst = isStoich
			? 'المزيج في الشروط الستكيومترية'
			: ratioMg < ratioAcid
				? 'المغنيسيوم $"Mg"$'
				: 'شوارد الهيدرونيوم $"H"_3 "O"^+$';

		const nMgFinal = roundTo(nMg0 - xMax, 4);
		const nAcidFinal = roundTo(nAcid0 - 2 * xMax, 4);
		const nH2Final = roundTo(xMax, 4);
		const vM = 24; // L/mol at 25°C
		const vH2L = roundTo(nH2Final * vM, 3);

		const eq = chemEquation(
			[
				{ coeff: 1, formula: 'Mg', state: 's' },
				{ coeff: 2, formula: 'H3O+', state: 'aq' }
			],
			[
				{ coeff: 1, formula: 'Mg^2+', state: 'aq' },
				{ coeff: 1, formula: 'H2', state: 'g' },
				{ coeff: 2, formula: 'H2O', state: 'l' }
			]
		);

		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [
				chemSpecies('Mg', 's'),
				chemSpecies('H3O+', 'aq'),
				chemSpecies('Mg^2+', 'aq'),
				chemSpecies('H2', 'g'),
				chemSpecies('H2O', 'l')
			],
			initial: [
				{ katex: `$${nMg0}$`, typst: `$${nMg0}$` },
				{ katex: `$${nAcid0}$`, typst: `$${nAcid0}$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			],
			intermediate: [
				{ katex: `$${nMg0} - x$`, typst: `$${nMg0} - x$` },
				{ katex: `$${nAcid0} - 2x$`, typst: `$${nAcid0} - 2 x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			],
			final: [
				{ katex: `$${nMg0} - x_{\\max}$`, typst: `$${nMg0} - x_("max")$` },
				{ katex: `$${nAcid0} - 2x_{\\max}$`, typst: `$${nAcid0} - 2 x_("max")$` },
				{ katex: `$x_{\\max}$`, typst: `$x_("max")$` },
				{ katex: `$x_{\\max}$`, typst: `$x_("max")$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			],
			finalAnswers: [
				{ katex: `$${nMgFinal}$`, typst: `$${nMgFinal}$` },
				{ katex: `$${nAcidFinal}$`, typst: `$${nAcidFinal}$` },
				{ katex: `$${xMax}$`, typst: `$${xMax}$` },
				{ katex: `$${nH2Final}$`, typst: `$${nH2Final}$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			]
		});

		const curveSvg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: roundTo(Math.max(ratioMg, ratioAcid) * 1.15, 3),
			yMin: 0,
			yMax: roundTo(Math.max(nMg0, nAcid0) * 1.15, 3),
			xLabel: 'x (mol)',
			yLabel: 'n (mol)',
			title: 'تطور كميات المادة بدلالة التقدم x',
			curves: [
				{ fn: (x) => (x <= xMax ? nMg0 - x : nMgFinal), color: '#2563eb', label: 'n(Mg)' },
				{ fn: (x) => (x <= xMax ? nAcid0 - 2 * x : nAcidFinal), color: '#dc2626', label: 'n(H₃O⁺)' },
				{ fn: (x) => (x <= xMax ? x : nH2Final), color: '#059669', label: 'n(H₂)' }
			],
			dashedGuides: [{ x1: xMax, y1: 0, x2: xMax, y2: Math.max(nMg0, nAcid0), color: '#64748b', label: `x_max=${xMax}`, labelPos: 'top' }],
			points: [{ x: xMax, y: nH2Final, label: `(${xMax}, ${nH2Final})`, color: '#059669' }]
		});
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t3_ice_${difficulty}_s${seed}`, curveSvg);

		const mcq = buildUniqueMcqOptions(
			`$x_{\\max} = ${xMax}\\,\\text{mol}$`,
			[
				{
					text: `$x_{\\max} = ${Math.max(ratioMg, ratioAcid)}\\,\\text{mol}$`,
					diagnosticFeedback: 'خطأ: أخذت القيمة الكبرى! التقدم الأعظمي هو القيمة الصغرى لأن التفاعل يتوقف عند نفاد أول متفاعل.'
				},
				{
					text: `$x_{\\max} = ${nAcid0}\\,\\text{mol}$`,
					diagnosticFeedback: 'خطأ: نسيت قسمة كمية مادة $\\ce{H3O+}$ على المعامل الستكيومتري $2$.'
				},
				{
					text: `$x_{\\max} = ${roundTo(nMg0 + nAcid0, 3)}\\,\\text{mol}$`,
					diagnosticFeedback: 'خطأ: لا تُجمع كميات المادة الابتدائية لإيجاد التقدم الأعظمي.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يتفاعل $n_0(\\ce{Mg}) = ${nMg0}\\,\\text{mol}$ من المغنيسيوم مع $n_0(\\ce{H3O+}) = ${nAcid0}\\,\\text{mol}$ وفق المعادلة: ${eq.katex}. ما هي قيمة التقدم الأعظمي $x_{\\max}$؟`,
				questionTextAr: `عيّن التقدم الأعظمي $x_{\\max}$:`,
				imageUrl: svgPath,
				imageCaption: `تطور كميات المادة بدلالة التقدم $x$`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `نقارن: $\\frac{n_0(\\ce{Mg})}{1} = ${ratioMg}$ و$\\frac{n_0(\\ce{H3O+})}{2} = ${ratioAcid}$. القيمة الأصغر هي $x_{\\max} = ${xMax}\\,\\text{mol}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ندخل كتلة $m = ${mMgG} "g"$ من شريط المغنيسيوم ${chemSpecies('Mg', 's').typst} في حجم $V = ${vAcidMl} "mL"$ من محلول حمض كلور الماء تركيزه $C = ${cAcid} "mol/L"$. ينمذج التفاعل بالمعادلة:\n${eq.typst}\nنعطي: $M("Mg") = 24 "g/mol"$، $V_M = ${vM} "L/mol"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `منحنى تطور كميات المادة n = f(x)`,
						width: 340
					},
					{
						type: 'text',
						content: `1) احسب كميتي المادة الابتدائيتين $n_0("Mg")$ و$n_0("H"_3 "O"^+)$.`,
						answer: `1) $n_0("Mg") = frac(m, M) = frac(${mMgG}, 24) = ${nMg0} "mol"$.\n$n_0("H"_3 "O"^+) = C times V = ${cAcid} times ${vAcidMl / 1000} = ${nAcid0} "mol"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) أنشئ جدول التقدم للتفاعل الكيميائي وأكمله بالحالة النهائية.`,
						answer: `2) جدول التقدم موضح أدناه (الأرقام النهائية باللون الأزرق):`,
						mark: '2'
					},
					ice.typstBlock,
					{
						type: 'text',
						content: `3) عيّن التقدم الأعظمي $x_("max")$ والمتفاعل المحد.`,
						answer: `3) نقارن النسبتين:\n- $frac(n_0("Mg"), 1) = ${ratioMg} "mol"$\n- $frac(n_0("H"_3 "O"^+), 2) = frac(${nAcid0}, 2) = ${ratioAcid} "mol"$\nإذن $x_("max") = ${xMax} "mol"$، والمتفاعل المحد هو: *${limitingTypst}*.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) احسب الحجم النهائي لغاز الهيدروجين المنطلق $V_("H"_2)$ وكمية مادة المتفاعل المتبقي (إن وجد).`,
						answer: `4) حجم غاز الهيدروجين: $V_("H"_2) = n_f("H"_2) times V_M = ${nH2Final} times ${vM} = ${vH2L} "L"$.\nالمتبقّي: $n_f("Mg") = ${nMgFinal} "mol"$ و$n_f("H"_3 "O"^+) = ${nAcidFinal} "mol"$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`احسب $n_0(\\ce{Mg}) = m/M$ و$n_0(\\ce{H3O+}) = C \\cdot V$ باللتر.`,
				`قسّم $n_0$ لكل متفاعل على معامله الستكيومتري: القيمة الأصغر هي $x_{\\max}$.`,
				`حجم الغاز المنطلق $V(\\ce{H2}) = n_f(\\ce{H2}) \\cdot V_M$.`
			],
			solutionStepsAr: [
				`$n_0(\\ce{Mg}) = ${nMg0}\\,\\text{mol}$ و$n_0(\\ce{H3O+}) = ${nAcid0}\\,\\text{mol}$.`,
				`المقارنة: $x_{\\max} = ${xMax}\\,\\text{mol}$ والمتفاعل المحد: ${limitingAr}.`,
				`حجم $\\ce{H2}$ المنطلق: $V(\\ce{H2}) = ${vH2L}\\,\\text{L}$.`
			],
			finalAnswer: `x_max = ${xMax} mol`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 (Integration): Optics + Stoichiometry Synthesis (T3 Exam Style)
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationOpticsChem: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t3_integration_optics_chem',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة إدماجية (فصل 3): الألياف البصرية والتحليل الطيفي للهب الصوديوم',
	curriculumLessonId: 'phy_lesson_1as_tcst_t3_integration',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nCore = rng.pick([1.48, 1.50, 1.52]);
		const nClad = roundTo(nCore - rng.pick([0.12, 0.14]), 2);
		const sinCrit = roundTo(nClad / nCore, 4);
		const iCritDeg = roundTo((Math.asin(sinCrit) * 180) / Math.PI, 1);
		const iIncAirDeg = rng.pick([20, 25, 30]);
		const sinRefrEntry = Math.sin((iIncAirDeg * Math.PI) / 180) / nCore;
		const rEntryDeg = roundTo((Math.asin(sinRefrEntry) * 180) / Math.PI, 1);
		const iWallDeg = roundTo(90 - rEntryDeg, 1);

		const lambdaNm = 589; // Sodium D-line
		const freqHz = roundTo(3.0 / (lambdaNm * 0.001), 2); // * 10^14 Hz -> 5.09 * 10^14 Hz

		const svg = buildRefractionSvg(nCore, nClad, Math.min(75, Math.round(iWallDeg)), 85, 'القلب الزجاجي', 'الغمد');
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t3_int_opt_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$i_{\\ell} \\approx ${iCritDeg}^\\circ$ — يحدث انعكاس كلي لأن $i_{\\text{جدار}} = ${iWallDeg}^\\circ > i_{\\ell}$`,
			[
				{
					text: `$i_{\\ell} \\approx ${iCritDeg}^\\circ$ — ينكسر الشعاع ويخرج إلى الغمد`,
					diagnosticFeedback: `خطأ: بما أن $i_{\\text{جدار}} = ${iWallDeg}^\\circ > ${iCritDeg}^\\circ$ يتحقق شرط الانعكاس الكلي!`
				},
				{
					text: `$i_{\\ell} \\approx ${roundTo(90 - iCritDeg, 1)}^\\circ$ — يحدث انعكاس كلي`,
					diagnosticFeedback: 'خطأ: الزاوية الحدية تُحسب من $\\sin i_{\\ell} = n_2 / n_1$ وليس $90^\\circ - i_{\\ell}$.'
				},
				{
					text: `لا يمكن حدوث انعكاس كلي لأن $n_{\\text{قلب}} > n_{\\text{غمد}}$`,
					diagnosticFeedback: 'خطأ: $n_{\\text{قلب}} > n_{\\text{غمد}}$ هو بالضبط الشرط الضروري لحدوث الانعكاس الكلي!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يتكون ليف بصري من قلب قرينته $n_1 = ${nCore}$ وغمد قرينته $n_2 = ${nClad}$. يرد شعاع ليزر من الهواء على مدخل الليف بزاوية $i_0 = ${iIncAirDeg}^\\circ$ فيبلغ السطح الفاصل قلب/غمد بزاوية $i_{\\text{جدار}} = ${iWallDeg}^\\circ$. احسب الزاوية الحدية $i_{\\ell}$ واستنتج سلوك الشعاع:`,
				questionTextAr: `الزاوية الحدية $i_{\\ell}$ وسلوك الشعاع داخل الليف البصري:`,
				imageUrl: svgPath,
				imageCaption: `انتقال الضوء في ليف بصري ($n_1=${nCore}, n_2=${nClad}$)`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$\\sin i_{\\ell} = \\frac{n_2}{n_1} = \\frac{${nClad}}{${nCore}} \\approx ${sinCrit} \\implies i_{\\ell} \\approx ${iCritDeg}^\\circ$. وبما أن $i_{\\text{جدار}} = ${iWallDeg}^\\circ > i_{\\ell}$، ينعكس الشعاع كلياً داخل القلب.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الإدماجي الأول — البصريات والأطياف',
				instruction: `نُغذّي ليفاً بصرياً بضوء أصفر وحيد اللون صادر عن مصباح بخار الصوديوم، طول موجته في الخلاء $lambda = ${lambdaNm} "nm"$ ($c = 3.0 times 10^8 "m/s"$).\nيتكون الليف من قلب زجاجي قرينته $n_1 = ${nCore}$ وغمد قرينته $n_2 = ${nClad}$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `السطح الفاصل بين القلب الزجاجي والغمد في الليف البصري`,
						width: 340
					},
					{
						type: 'text',
						content: `*الجزء الأول: خصائص الإشعاع الطيفي* (2.5 نقطة)\n1) ما طبيعة طيف الإصدار لمصباح بخار الصوديوم منخفض الضغط؟ وهل يتبدد هذا الضوء الأصفر ($lambda = ${lambdaNm} "nm"$) عند مروره عبر موشور زجاجي؟ علل.\n2) احسب تردد الإشعاع $nu$ بوحدة $"Hz"$ (علماً أن $nu = c / lambda$).`,
						answer: `1) طيف الإصدار لمصباح الصوديوم منخفض الضغط هو *طيف إصدار متقطع (طيف خطوط)*. لا يتبدد عبر الموشور لأنه ضوء *وحيد اللون* (طول موجة واحد).\n2) $nu = frac(3.0 times 10^8, ${lambdaNm} times 10^(-9)) approx ${freqHz} times 10^14 "Hz"$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: الانكسار والانعكاس الكلي في الليف* (3 نقاط)\nيرد الشعاع من الهواء ($n_0 = 1.00$) على الوجه الأمامي لقلب الليف بزاوية ورود $i_0 = ${iIncAirDeg} degree$.\n1) احسب زاوية الانكسار $r$ عند مدخل القلب.\n2) بيّن هندسياً أن زاوية ورود الشعاع على الجدار الفاصل بين القلب والغمد هي $i_("wall") = 90 degree - r$ واحسب قيمتها.\n3) احسب الزاوية الحدية $i_ell$ للسطح قلب/غمد، واستنتج هل ينحجز الشعاع داخل الليف أم يضيع نحو الغمد.`,
						answer: `1) $1.00 sin ${iIncAirDeg} degree = ${nCore} sin r arrow.r.double sin r = ${roundTo(sinRefrEntry, 4)} arrow.r.double r approx ${rEntryDeg} degree$.\n2) المثلث القائم عند مدخل الليف يعطي: $i_("wall") = 90 degree - r = 90 - ${rEntryDeg} = ${iWallDeg} degree$.\n3) الزاوية الحدية: $sin i_ell = frac(n_2, n_1) = frac(${nClad}, ${nCore}) approx ${sinCrit} arrow.r.double i_ell approx ${iCritDeg} degree$.\nبما أن $n_1 > n_2$ و$i_("wall") = ${iWallDeg} degree > i_ell = ${iCritDeg} degree$، فإن الشعاع يعاني *انعكاساً كلياً* متكرراً وينحجز داخل الليف دون ضياع.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: الربط الكيميائي والفيزيائي الفلكي* (2.5 نقطة)\n1) اكتب التوزيع الإلكتروني لذرة الصوديوم $"Na"$ ($Z=11$)، وحدد شارده المستقرة.\n2) لو ظهر خط أسود في طيف امتصاص نجم بعيد عند $lambda = 589 "nm"$، ماذا تستنتج عن التركيب الكيميائي لغلاف هذا النجم؟`,
						answer: `1) التوزيع الإلكتروني لـ $"Na"$ ($Z=11$): $(K)^2 (L)^8 (M)^1$ ← يفقد إلكتروناً واحداً ليشكل الشاردة ${chemSpecies('Na+').typst}.\n2) ظهور خط امتصاص داكن عند $lambda = 589 "nm"$ يثبت وجود عنصر *الصوديوم* في الغلاف الغازي للنجم لأن ذراته تمتص نفس طول الموجة الذي تصدره وهي مثارة.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`الضوء وحيد اللون لا يتبدد عبر الموشور وتردده $\\nu = c / \\lambda$ (لا تنس $1\\,\\text{nm} = 10^{-9}\\,\\text{m}$).`,
				`عند مدخل الليف العمودي على محوره، الزاوية مع الجدار $i_{\\text{wall}} = 90^\\circ - r$.`,
				`شرط الانعكاس الكلي: $n_1 > n_2$ و$i_{\\text{wall}} > \\arcsin(n_2/n_1)$.`
			],
			solutionStepsAr: [
				`طيف الصوديوم خطي (وحيد اللون عند $\\lambda = 589\\,\\text{nm}$)، وتردده $\\nu \\approx ${freqHz} \\times 10^{14}\\,\\text{Hz}$.`,
				`زاوية الانكسار $r \\approx ${rEntryDeg}^\\circ$ و$i_{\\text{wall}} \\approx ${iWallDeg}^\\circ$.`,
				`الزاوية الحدية $i_{\\ell} \\approx ${iCritDeg}^\\circ < i_{\\text{wall}}$، إذن يحدث انعكاس كلي.`
			],
			finalAnswer: `i_ℓ ≈ ${iCritDeg}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 6 (Integration): Annual Synthesis (1AS -> 2AS Prep)
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationAnnual: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcst_t3_integration_annual',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	isExperimental: true,
	titleAr: 'مسألة شاملة سنوية (التحضير لـ 2AS): كمية المادة، التمديد، وجدول التقدم',
	curriculumLessonId: 'phy_lesson_1as_tcst_t3_integration',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Reaction: CaCO3(s) + 2 H3O+(aq) -> Ca2+(aq) + CO2(g) + 3 H2O(l)
		const mCaCO3 = rng.pick([2.0, 2.5, 3.0, 4.0]); // M(CaCO3) = 100 g/mol -> n0 = 0.02, 0.025, 0.03, 0.04 mol
		const n0CaCO3 = roundTo(mCaCO3 / 100, 3);
		const c0Acid = rng.pick([2.0, 2.5, 4.0]);
		const v1AcidMl = 100; // 0.1 L
		const c1Acid = difficulty === 'easy' ? 0.4 : rng.pick([0.4, 0.5, 0.6]);
		const v0TakenMl = roundTo((c1Acid * v1AcidMl) / c0Acid, 1);
		const n0Acid = roundTo(c1Acid * (v1AcidMl / 1000), 3);

		const ratioCa = n0CaCO3;
		const ratioAcid = roundTo(n0Acid / 2, 4);
		const xMax = Math.min(ratioCa, ratioAcid);
		const limitingTypst = ratioCa < ratioAcid ? 'كربونات الكالسيوم $"CaCO"_3$' : ratioAcid < ratioCa ? 'شوارد الهيدرونيوم $"H"_3 "O"^+$' : 'المزيج ستكيومتري';
		const limitingKatex = ratioCa < ratioAcid ? '$\\ce{CaCO3}$' : ratioAcid < ratioCa ? '$\\ce{H3O+}$' : 'المزيج ستكيومتري';

		const tempK = 298; // 25 °C
		const pPa = 1.0e5;
		const vCo2L = roundTo(((xMax * 8.314 * tempK) / pPa) * 1000, 3);

		const eq = chemEquation(
			[
				{ coeff: 1, formula: 'CaCO3', state: 's' },
				{ coeff: 2, formula: 'H3O+', state: 'aq' }
			],
			[
				{ coeff: 1, formula: 'Ca^2+', state: 'aq' },
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 3, formula: 'H2O', state: 'l' }
			]
		);

		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [
				chemSpecies('CaCO3', 's'),
				chemSpecies('H3O+', 'aq'),
				chemSpecies('Ca^2+', 'aq'),
				chemSpecies('CO2', 'g'),
				chemSpecies('H2O', 'l')
			],
			initial: [
				{ katex: `$${n0CaCO3}$`, typst: `$${n0CaCO3}$` },
				{ katex: `$${n0Acid}$`, typst: `$${n0Acid}$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			],
			intermediate: [
				{ katex: `$${n0CaCO3} - x$`, typst: `$${n0CaCO3} - x$` },
				{ katex: `$${n0Acid} - 2x$`, typst: `$${n0Acid} - 2 x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			],
			final: [
				{ katex: `$${n0CaCO3} - x_{\\max}$`, typst: `$${n0CaCO3} - x_("max")$` },
				{ katex: `$${n0Acid} - 2x_{\\max}$`, typst: `$${n0Acid} - 2 x_("max")$` },
				{ katex: `$x_{\\max}$`, typst: `$x_("max")$` },
				{ katex: `$x_{\\max}$`, typst: `$x_("max")$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			],
			finalAnswers: [
				{ katex: `$${roundTo(n0CaCO3 - xMax, 4)}$`, typst: `$${roundTo(n0CaCO3 - xMax, 4)}$` },
				{ katex: `$${roundTo(n0Acid - 2 * xMax, 4)}$`, typst: `$${roundTo(n0Acid - 2 * xMax, 4)}$` },
				{ katex: `$${xMax}$`, typst: `$${xMax}$` },
				{ katex: `$${xMax}$`, typst: `$${xMax}$` },
				{ katex: `بوفرة`, typst: `بوفرة` }
			]
		});

		const curveSvg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: roundTo(Math.max(ratioCa, ratioAcid) * 1.2, 3),
			yMin: 0,
			yMax: roundTo(vCo2L * 1.25, 2),
			xLabel: 'x (mol)',
			yLabel: 'V(CO₂) L',
			title: 'تطور حجم غاز CO₂ المنطلق بدلالة التقدم x',
			curves: [
				{
					fn: (x) => (x <= xMax ? ((x * 8.314 * tempK) / pPa) * 1000 : vCo2L),
					color: '#2563eb',
					label: 'V(CO₂)'
				}
			],
			dashedGuides: [{ x1: xMax, y1: 0, x2: xMax, y2: vCo2L, color: '#dc2626', label: `x_max=${xMax}`, labelPos: 'right' }],
			points: [{ x: xMax, y: vCo2L, label: `(${xMax}, ${vCo2L})`, color: '#dc2626' }]
		});
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcst_t3_int_ann_${difficulty}_s${seed}`, curveSvg);

		const mcq = buildUniqueMcqOptions(
			`$V(\\ce{CO2}) \\approx ${vCo2L}\\,\\text{L}$`,
			[
				{
					text: `$V(\\ce{CO2}) \\approx ${roundTo(vCo2L * 2, 3)}\\,\\text{L}$`,
					diagnosticFeedback: 'خطأ: ضاعفت قيمة $x_{\\max}$ أو استعملت كمية $\\ce{H3O+}$ دون قسمتها على $2$.'
				},
				{
					text: `$V(\\ce{CO2}) \\approx ${roundTo(vCo2L / 1000, 6)}\\,\\text{L}$`,
					diagnosticFeedback: 'خطأ: هذا الحجم بالمتر المكعب ($\text{m}^3$) وليس باللتر!'
				},
				{
					text: `$V(\\ce{CO2}) \\approx ${roundTo(vCo2L * 0.5, 3)}\\,\\text{L}$`,
					diagnosticFeedback: 'خطأ: راجع قيمة $x_{\\max}$ في جدول التقدم.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في التفاعل ${eq.katex} حيث $x_{\\max} = ${xMax}\\,\\text{mol}$، احسب حجم غاز $\\ce{CO2}$ المنطلق باللتر عند درجة حرارة $25^\\circ\\text{C}$ ($T = 298\\,\\text{K}$) وضغط $P = 1.0 \\times 10^5\\,\\text{Pa}$ ($R = 8.314\\,\\text{SI}$):`,
				questionTextAr: `احسب حجم غاز $\\ce{CO2}$ الناتج باللتر:`,
				imageUrl: svgPath,
				imageCaption: `تطور حجم غاز $\\ce{CO2}$ المنطلق بدلالة التقدم $x$`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `من قانون الغاز المثالي: $V = \\frac{x_{\\max} R T}{P} = \\frac{${xMax} \\times 8.314 \\times 298}{1.0 \\times 10^5} \\approx ${roundTo(vCo2L / 1000, 6)}\\,\\text{m}^3 = ${vCo2L}\\,\\text{L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الإدماجي الثاني — مسألة شاملة تحضيرية لـ 2AS',
				instruction: `لدراسة تفاعل كربونات الكالسيوم ${chemSpecies('CaCO3', 's').typst} ($M = 100 "g/mol"$) مع حمض كلور الماء، نُحضر أولاً محلولاً ممدداً $(S_1)$ حجمه $V_1 = ${v1AcidMl} "mL"$ وتركيزه $C_1 = ${c1Acid} "mol/L"$ انطلاقاً من محلول أم $(S_0)$ تركيزه $C_0 = ${c0Acid} "mol/L"$.\nنعطي: $R = 8.314 "SI"$، $T = 298 "K"$ ($25 degree "C"$)، $P = 1.0 times 10^5 "Pa"$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: `منحنى الحجم الغازي المنطلق بدلالة التقدم x`,
						width: 340
					},
					{
						type: 'text',
						content: `*الجزء الأول: تحضير المحلول بالتمديد* (2.5 نقطة)\n1) احسب الحجم $V_0$ الواجب أخذه من المحلول الأم $(S_0)$ لتحضير $(S_1)$ ومعامل التمديد $F$.\n2) اذكر الزجاجيتين الأساسيتين المستعملتين بدقة لإجراء هذا التمديد.`,
						answer: `1) $C_0 V_0 = C_1 V_1 arrow.r.double V_0 = frac(${c1Acid} times ${v1AcidMl}, ${c0Acid}) = ${v0TakenMl} "mL"$.\nمعامل التمديد: $F = frac(C_0, C_1) = ${roundTo(c0Acid / c1Acid, 2)}$.\n2) ماصة عيارية وحوجلة عيارية سعتها $${v1AcidMl} "mL"$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: الدراسة الكمية وجدول التقدم* (3 نقاط)\nنسكب المحلول $(S_1)$ فوق كتلة $m = ${mCaCO3} "g"$ من ${chemSpecies('CaCO3', 's').typst} وفق المعادلة:\n${eq.typst}\n1) احسب كميتي المادة الابتدائيتين $n_0("CaCO"_3)$ و$n_0("H"_3 "O"^+)$.\n2) أنشئ جدول التقدم، ثم حدد التقدم الأعظمي $x_("max")$ والمتفاعل المحد.`,
						answer: `1) $n_0("CaCO"_3) = frac(${mCaCO3}, 100) = ${n0CaCO3} "mol"$، و$n_0("H"_3 "O"^+) = ${c1Acid} times ${v1AcidMl / 1000} = ${n0Acid} "mol"$.\n2) المقارنة: $frac(n_0("CaCO"_3), 1) = ${ratioCa} "mol"$ و$frac(n_0("H"_3 "O"^+), 2) = ${ratioAcid} "mol"$.\nإذن $x_("max") = ${xMax} "mol"$ والمتفاعل المحد هو *${limitingTypst}* (الجدول أدناه).`,
						mark: '3'
					},
					ice.typstBlock,
					{
						type: 'text',
						content: `*الجزء الثالث: قانون الغاز المثالي واستنتاج البنية* (2.5 نقطة)\n1) احسب الحجم $V_("CO"_2)$ للغاز المنطلق في نهاية التفاعل عند الظروف المخبرية المعطاة.\n2) استناداً إلى مكتسبات الفصل الأول، أعط صيغة جيلسبي لجزيء ${chemSpecies('CO2').typst} وشكله الهندسي.`,
						answer: `1) $V_("CO"_2) = frac(n_f R T, P) = frac(${xMax} times 8.314 times 298, 1.0 times 10^5) approx ${roundTo(vCo2L / 1000, 6)} "m"^3 = ${vCo2L} "L"$.\n2) جزيء ${chemSpecies('CO2').typst} صيغته $"AX"_2$ وشكله الهندسي *خطي* ($180 degree$).`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`قانون التمديد: $C_0 V_0 = C_1 V_1$.`,
				`المتفاعل المحد يوافق القيمة الأصغر بين $n_0(\\ce{CaCO3})/1$ و$n_0(\\ce{H3O+})/2$.`,
				`في قانون الغاز المثالي $V = nRT/P$ النتيجة تكون بالمتر المكعب $\\text{m}^3$ ونضرب في $1000$ للحصول على اللتر.`
			],
			solutionStepsAr: [
				`التمديد: $V_0 = ${v0TakenMl}\\,\\text{mL}$ ومعامل التمديد $F = ${roundTo(c0Acid / c1Acid, 2)}$.`,
				`التقدم الأعظمي $x_{\\max} = ${xMax}\\,\\text{mol}$ والمتفاعل المحد: ${limitingKatex}.`,
				`حجم غاز $\\ce{CO2}$: $V \\approx ${vCo2L}\\,\\text{L}$، وهندسة جزيء $\\ce{CO2}$ خطية ($\\mathrm{AX_2}$).`
			],
			finalAnswer: `V(CO₂) ≈ ${vCo2L} L`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 1AS TCST Physics
// ═══════════════════════════════════════════════════════════════════════════════

export const PHYSICS_TEMPLATES_1AS_TCST_T3: PhysicsParameterizedTemplate[] = [
	tplRefractionTir,
	tplPrismDispersion,
	tplSpectraAstrophysics,
	tplStoichiometryIce,
	tplIntegrationOpticsChem,
	tplIntegrationAnnual
];
