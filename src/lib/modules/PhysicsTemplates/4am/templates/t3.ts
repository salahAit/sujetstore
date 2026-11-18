import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	savePhysicsSvgAsset,
	svgArchimedesBeaker,
	wrapPhysicsSvg
} from '../../svg-physics';

function buildThreeForcesGridSvg(opts: {
	pLabel: string;
	fLabel: string;
	tLabel: string;
	scaleLabel: string;
	pCm: number;
	fCm: number;
	tCm: number;
}): string {
	let body = '';
	body += `<defs><marker id="tf3R" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker><marker id="tf3B" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker><marker id="tf3G" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker></defs>`;
	// Left panel: physical setup (ball held by vertical string + horizontal spring/string or two perpendicular forces)
	body += `<rect x="8" y="8" width="175" height="194" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="95" y="26" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">توازن الكرية (3 قوى)</text>`;
	body += `<line x1="36" y1="42" x2="146" y2="42" stroke="#334155" stroke-width="2.5"/>`;
	// Slanted string from (118, 42) to (82, 110)
	body += `<line x1="118" y1="42" x2="82" y2="110" stroke="#475569" stroke-width="1.8"/>`;
	// Horizontal string from (22, 110) to (82, 110)
	body += `<line x1="22" y1="110" x2="82" y2="110" stroke="#475569" stroke-width="1.8"/>`;
	body += `<line x1="22" y1="86" x2="22" y2="134" stroke="#334155" stroke-width="2.5"/>`;
	body += `<circle cx="82" cy="110" r="14" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>`;
	body += `<text x="82" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">S</text>`;
	body += `<line x1="82" y1="110" x2="82" y2="164" stroke="#dc2626" stroke-width="2" marker-end="url(#tf3R)"/>`;
	body += `<text x="90" y="162" font-size="10.5" font-weight="bold" fill="#dc2626">P</text>`;
	body += `<line x1="82" y1="110" x2="36" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#tf3B)"/>`;
	body += `<text x="48" y="102" font-size="10.5" font-weight="bold" fill="#2563eb">F</text>`;
	body += `<line x1="82" y1="110" x2="108" y2="61" stroke="#059669" stroke-width="2" marker-end="url(#tf3G)"/>`;
	body += `<text x="114" y="72" font-size="10.5" font-weight="bold" fill="#059669">T</text>`;
	body += `<text x="95" y="190" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">${opts.scaleLabel}</text>`;

	// Right panel: Closed force triangle on grid (3-4-5 right triangle)
	body += `<rect x="193" y="8" width="169" height="194" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>`;
	body += `<text x="277" y="26" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">مضلع القوى المغلق</text>`;
	// Grid
	for (let gx = 212; gx <= 344; gx += 22) {
		body += `<line x1="${gx}" y1="42" x2="${gx}" y2="174" stroke="#bbf7d0" stroke-width="0.9"/>`;
	}
	for (let gy = 42; gy <= 174; gy += 22) {
		body += `<line x1="212" y1="${gy}" x2="344" y2="${gy}" stroke="#bbf7d0" stroke-width="0.9"/>`;
	}
	// Triangle vertices: A(300, 52) -> B(300, 140) [4 units down = P] -> C(234, 140) [3 units left = F] -> A(300, 52) [5 units = T]
	const ax = 300;
	const ay = 52;
	const bx = 300;
	const by = 140;
	const cx = 234;
	const cy = 140;
	body += `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by - 2}" stroke="#dc2626" stroke-width="2.2" marker-end="url(#tf3R)"/>`;
	body += `<text x="${ax + 6}" y="${(ay + by) / 2}" font-size="10" font-weight="bold" fill="#dc2626">P (${opts.pCm}cm)</text>`;
	body += `<line x1="${bx}" y1="${by}" x2="${cx + 2}" y2="${cy}" stroke="#2563eb" stroke-width="2.2" marker-end="url(#tf3B)"/>`;
	body += `<text x="${(bx + cx) / 2}" y="${by + 14}" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">F (${opts.fCm}cm)</text>`;
	body += `<line x1="${cx}" y1="${cy}" x2="${ax - 2}" y2="${ay + 2}" stroke="#059669" stroke-width="2.2" marker-end="url(#tf3G)"/>`;
	body += `<text x="256" y="92" text-anchor="end" font-size="10" font-weight="bold" fill="#059669">T (${opts.tCm}cm)</text>`;
	body += `<text x="277" y="190" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#166534">${opts.pLabel} | ${opts.fLabel} | ${opts.tLabel}</text>`;

	return wrapPhysicsSvg(370, 210, body);
}

function buildTriangulationSvg(opts: {
	dLabel: string;
	hLabel: string;
	bigDLabel: string;
	bigHLabel: string;
}): string {
	let body = '';
	body += `<rect x="8" y="8" width="344" height="194" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>`;
	body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e40af">التثليث وتقدير ارتفاع جسم بعيد</text>`;
	// Eye O
	body += `<circle cx="42" cy="158" r="4" fill="#0f172a"/>`;
	body += `<text x="30" y="162" font-size="11" font-weight="bold" fill="#0f172a">O</text>`;
	// Ground
	body += `<line x1="42" y1="158" x2="316" y2="158" stroke="#334155" stroke-width="1.8"/>`;
	// Small ruler h
	body += `<line x1="120" y1="158" x2="120" y2="120" stroke="#16a34a" stroke-width="2.5"/>`;
	body += `<text x="128" y="143" font-size="10.5" font-weight="bold" fill="#15803d">${opts.hLabel}</text>`;
	// Tall object H
	body += `<line x1="300" y1="158" x2="300" y2="52" stroke="#dc2626" stroke-width="3"/>`;
	body += `<text x="308" y="108" font-size="11" font-weight="bold" fill="#dc2626">${opts.bigHLabel}</text>`;
	// Sight line
	body += `<line x1="42" y1="158" x2="300" y2="52" stroke="#2563eb" stroke-width="1.6" stroke-dasharray="5,3"/>`;
	body += `<path d="M 74 158 A 32 32 0 0 0 70 146" fill="none" stroke="#dc2626" stroke-width="1.8"/>`;
	body += `<text x="79" y="150" font-size="11" font-weight="bold" fill="#dc2626">α</text>`;
	// Distance labels
	body += `<text x="81" y="174" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">${opts.dLabel}</text>`;
	body += `<text x="171" y="191" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">${opts.bigDLabel}</text>`;

	return wrapPhysicsSvg(360, 210, body);
}

function buildMirrorReflectionSvg(opts: {
	givenAngleText: string;
	isSurfaceAngle: boolean;
	rotationDeg?: number;
}): string {
	let body = '';
	body += `<defs><marker id="mArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker></defs>`;
	body += `<rect x="8" y="8" width="344" height="194" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>`;
	body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#854d0e">الانعكاس على المرآة المستوية</text>`;
	// Mirror
	body += `<line x1="60" y1="156" x2="300" y2="156" stroke="#0f172a" stroke-width="2.6"/>`;
	for (let hx = 66; hx < 300; hx += 12) {
		body += `<line x1="${hx}" y1="156" x2="${hx - 6}" y2="165" stroke="#64748b" stroke-width="1.3"/>`;
	}
	// Normal
	body += `<line x1="180" y1="156" x2="180" y2="48" stroke="#475569" stroke-width="1.4" stroke-dasharray="5,3"/>`;
	body += `<text x="180" y="42" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">N (الناظم)</text>`;
	// Rays
	body += `<line x1="94" y1="68" x2="180" y2="156" stroke="#dc2626" stroke-width="2.2" marker-end="url(#mArr)"/>`;
	body += `<line x1="180" y1="156" x2="266" y2="68" stroke="#dc2626" stroke-width="2.2" marker-end="url(#mArr)"/>`;
	body += `<text x="108" y="76" font-size="10.5" font-weight="bold" fill="#dc2626">شعاع وارد</text>`;
	body += `<text x="252" y="76" text-anchor="end" font-size="10.5" font-weight="bold" fill="#dc2626">شعاع منعكس</text>`;
	if (opts.isSurfaceAngle) {
		body += `<path d="M 142 156 A 38 38 0 0 1 154 129" fill="none" stroke="#2563eb" stroke-width="1.8"/>`;
		body += `<text x="132" y="143" text-anchor="end" font-size="10.5" font-weight="bold" fill="#2563eb">${opts.givenAngleText}</text>`;
	} else {
		body += `<path d="M 156 131 A 34 34 0 0 1 180 122" fill="none" stroke="#2563eb" stroke-width="1.8"/>`;
		body += `<text x="163" y="114" text-anchor="end" font-size="10.5" font-weight="bold" fill="#2563eb">i = ${opts.givenAngleText}</text>`;
	}
	body += `<path d="M 180 122 A 34 34 0 0 1 204 131" fill="none" stroke="#16a34a" stroke-width="1.8"/>`;
	body += `<text x="198" y="114" font-size="10.5" font-weight="bold" fill="#16a34a">r = ?</text>`;
	if (opts.rotationDeg) {
		body += `<text x="180" y="186" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#854d0e">تُدار المرآة بزاوية α = ${opts.rotationDeg}°</text>`;
	} else {
		body += `<text x="180" y="186" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#854d0e">قانون الانعكاس: i = r</text>`;
	}
	return wrapPhysicsSvg(360, 210, body);
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. Three-Force Equilibrium (Graphical Polygon Method — NO sin/cos) (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const threeForcesEquilibriumTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t3_three_forces_equilibrium',
	grade: '4am',
	trimesterId: 't3',
	domain: 'mechanics',
	titleAr: 'توازن جسم صلب خاضع لثلاث قوى غير متوازية (الطريقة البيانية)',
	curriculumLessonId: 'phy_lesson_4am_t3_three_forces_equilibrium_vector_analysis',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scalePerCm = difficulty === 'easy' ? rng.pick([2, 3, 4]) : rng.pick([2.5, 5, 6, 8]);
		// Classic 3-4-5 closed force triangle on grid: F=3cm, P=4cm, T=5cm (or scaled)
		const fCm = 3;
		const pCm = 4;
		const tCm = 5;
		const fVal = roundTo(fCm * scalePerCm, 2);
		const pVal = roundTo(pCm * scalePerCm, 2);
		const tVal = roundTo(tCm * scalePerCm, 2);

		const svg = buildThreeForcesGridSvg({
			pLabel: `P = ${pVal} N`,
			fLabel: `F = ${fVal} N`,
			tLabel: `T = ?`,
			scaleLabel: `السلم: 1 cm → ${scalePerCm} N`,
			pCm,
			fCm,
			tCm
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t3_3f_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$T = ${tVal}\\text{ N}$ (طول الوتر $5\\text{ cm}$ في مضلع القوى المغلق)`,
			[
				{
					text: `$T = ${roundTo(pVal + fVal, 2)}\\text{ N}$`,
					diagnosticFeedback: 'في المجموع الشعاعي لقوى غير متوازية لا نجمع الشدات جبرياً، بل نغلق مضلع القوى بيانياً!'
				},
				{
					text: `$T = ${roundTo(pVal - fVal, 2)}\\text{ N}$`,
					diagnosticFeedback: 'طرح الشدتين يصلح فقط لقوتين متعاكستين على نفس الحامل.'
				},
				{
					text: `$T = ${tCm}\\text{ N}$`,
					diagnosticFeedback: `$${tCm}\\text{ cm}$ هو طول الشعاع على الشبكة؛ اضرب في السلم ($1\\text{ cm} \\rightarrow ${scalePerCm}\\text{ N}$) للحصول على الشدة بالنيوتن.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `كرية متوازنة تحت تأثير ثلاث قوى غير متوازية $\\vec{P}, \\vec{F}, \\vec{T}$ وفق مضلع القوى المغلق المبيّن في الشبكة (السلم: $1\\text{ cm} \\rightarrow ${scalePerCm}\\text{ N}$). ما شدة توتر الخيط $T$؟`,
				questionTextAr: `من مضلع القوى المغلق (السلم $1\\text{ cm} \\rightarrow ${scalePerCm}\\text{ N}$)، استنتج شدة $T$:`,
				imageUrl,
				imageCaption: 'مضلع القوى المغلق للكرية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `من مضلع القوى المغلق على الشبكة، طول شعاع $\\vec{T}$ (الوتر) يساوي $5\\text{ cm}$، وبضربه في السلم نجد $T = 5 \\times ${scalePerCm} = ${tVal}\\text{ N}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `كرية معدنية $(S)$ شدة ثقلها $P = ${pVal} " N"$ معلقة بخيط مائل ومشدودة أفقياً بنابض، فتتوازن تحت تأثير ثلاث قوى غير متوازية كما يوضّح الشكل ومضلع القوى على الشبكة بالسلم $1 " cm" arrow.r ${scalePerCm} " N"$:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احصِ القوى الثلاث المؤثرة على الكرية $(S)$ وصنّفها إلى أفعال تلامسية وأفعال بعدية.`,
								answer: `1) القوى المؤثرة: ثقل الكرية $arrow(P)$ (فعل بعدي)، قوة شد النابض الأفقية $arrow(F)$ (فعل تلامسي موضعي)، وتوتر الخيط المائل $arrow(T)$ (فعل تلامسي موضعي).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'التركيب ومضلع القوى المغلق'
							}
						]
					},
					{
						type: 'text',
						content: `2) اذكر شرطي توازن الجسم الصلب $(S)$ الخاضع لهذه القوى الثلاث غير المتوازية.`,
						answer: `2) - تقع القوى الثلاث في نفس المستوي وتتلاقى حواملها في نقطة واحدة.\n- مجموعها الشعاعي معدوم: $arrow(P) + arrow(F) + arrow(T) = arrow(0)$ (مضلع القوى مغلق).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بالاعتماد على مضلع القوى المغلق المرسوم على الشبكة، حدّد طول شعاع القوة $arrow(F)$ بالسنتيمتر واستنتج شدتها $F$، ثم استنتج طول شعاع $arrow(T)$ وشدته $T$ (دون إسقاط مثلثي).`,
						answer: `3) من الشبكة: طول $arrow(F)$ هو $${fCm} " cm"$، ومنه $F = ${fCm} times ${scalePerCm} = ${fVal} " N"$.\n\nفي مثلث القوى القائم والمغلق: طول الوتر $arrow(T)$ هو $sqrt(${fCm}^2 + ${pCm}^2) = ${tCm} " cm"$، ومنه شدة توتر الخيط $T = ${tCm} times ${scalePerCm} = ${tVal} " N"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اشرح كيف نعيّن محصلة القوتين $arrow(P)$ و$arrow(F)$ بيانياً باستعمال قاعدة متوازي الأضلاع وما علاقتها بالقوة الثالثة $arrow(T)$.`,
						answer: `4) ننشئ متوازي الأضلاع (مستطيل) على الشعاعين $arrow(P)$ و$arrow(F)$ من نفس المبدأ؛ فيكون قطره هو المحصلة $arrow(R) = arrow(P) + arrow(F)$، وتكون مساوية في الشدة لـ $arrow(T)$ ومعاكسة لها في الجهة على نفس الحامل ($arrow(R) + arrow(T) = arrow(0)$).`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'شرطا توازن 3 قوى غير متوازية: تلاقي الحوامل في نقطة واحدة + مضلع قوى مغلق.',
				'استعمل السلم $1\\text{ cm} \\rightarrow ' + scalePerCm + '\\text{ N}$ لتحويل أطوال أضلاع المثلث المغلق إلى شدات بالنيوتن.',
				'محصلة قوتين $\\vec{P} + \\vec{F}$ تعاكس القوة الثالثة $\\vec{T}$ وتساويها شدة.'
			],
			solutionStepsAr: [
				'القوى: $P$ بعدي، و$F$ و$T$ تلامسيان.',
				'الشرطان: تلاقي الحوامل ومضلع قوى مغلق ($\\vec{P}+\\vec{F}+\\vec{T}=\\vec{0}$).',
				`بيانياً بالسلم: $F = ${fVal}\\text{ N}$ وطول $T$ يساوي $5\\text{ cm}$ أي $T = ${tVal}\\text{ N}$.`,
				'محصلة $\\vec{P}$ و$\\vec{F}$ بمتوازي الأضلاع هي $-\\vec{T}$.'
			],
			finalAnswer: `T = ${tVal} N`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. Archimedes' Buoyancy (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const archimedesBuoyancyTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t3_archimedes_buoyancy',
	grade: '4am',
	trimesterId: 't3',
	domain: 'mechanics',
	titleAr: 'دافعة أرخميدس في السوائل وتوازن الأجسام المغمورة',
	curriculumLessonId: 'phy_lesson_4am_t3_archimedes_buoyancy',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const gVal = 10;
		const rhoWater = 1000;
		const volCm3 = rng.pick([200, 300, 400, 500]);
		const volM3 = roundTo(volCm3 / 1_000_000, 6);
		const faWater = roundTo(rhoWater * volM3 * gVal, 2); // 2, 3, 4, 5 N
		const solidDens = difficulty === 'easy' ? 2.5 : rng.pick([2.2, 2.5, 2.7, 3.0]);
		const massKg = roundTo((solidDens * volCm3) / 1000, 3);
		const pReal = roundTo(massKg * gVal, 2);
		const pApp = roundTo(pReal - faWater, 2);
		const rhoSalt = 1200;
		const faSalt = roundTo(rhoSalt * volM3 * gVal, 2);

		const svg = svgArchimedesBeaker({ liquidLabel: 'ماء عذب' });
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t3_arch_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$F_A = ${faWater}\\text{ N}$ و $V = ${volCm3}\\text{ cm}^3$`,
			[
				{
					text: `$F_A = ${roundTo(pReal + pApp, 2)}\\text{ N}$ و $V = ${volCm3}\\text{ cm}^3$`,
					diagnosticFeedback: 'دافعة أرخميدس هي الفرق $F_A = P - P_{\\text{app}}$ وليس المجموع!'
				},
				{
					text: `$F_A = ${pApp}\\text{ N}$ و $V = ${roundTo((pApp / (rhoWater * gVal)) * 1_000_000, 0)}\\text{ cm}^3$`,
					diagnosticFeedback: `$${pApp}\\text{ N}$ هو الثقل الظاهري $P_{\\text{app}}$ وليس دافعة أرخميدس.`
				},
				{
					text: `$F_A = ${faWater}\\text{ N}$ و $V = ${roundTo(volCm3 / 10, 1)}\\text{ cm}^3$`,
					diagnosticFeedback: 'تحقق من تحويل الحجم من $\\text{m}^3$ إلى $\\text{cm}^3$: $1\\text{ m}^3 = 10^6\\text{ cm}^3$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `جسم صلب ثقله في الهواء $P = ${pReal}\\text{ N}$ وثقله الظاهري وهو مغمور كلياً في الماء العذب ($\\rho = 1000\\text{ kg/m}^3$, $g = 10\\text{ N/kg}$) هو $P_{\\text{app}} = ${pApp}\\text{ N}$. ما شدة دافعة أرخميدس $F_A$ وحجم الجسم $V$؟`,
				questionTextAr: `$P = ${pReal}\\text{ N}$ و$P_{\\text{app}} = ${pApp}\\text{ N}$ في الماء العذب. احسب $F_A$ و $V$:`,
				imageUrl,
				imageCaption: 'قياس دافعة أرخميدس بالربيعة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$F_A = P - P_{\\text{app}} = ${pReal} - ${pApp} = ${faWater}\\text{ N}$، ومنه $V = \\frac{F_A}{\\rho \\cdot g} = \\frac{${faWater}}{1000 \\times 10} = ${volM3}\\text{ m}^3 = ${volCm3}\\text{ cm}^3$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `علّقنا جسماً صلباً $(S)$ متجانساً بطرف ربيعة، فأشارت في الهواء إلى القيمة $P = ${pReal} " N"$، وعند غمره كلياً في وعاء به ماء عذب ($rho_"ماء" = 1000 " kg/m"^3$، $g = 10 " N/kg"$) أشارت الربيعة إلى $P_"app" = ${pApp} " N"$:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) ماذا تمثّل القيمتان $P$ و$P_"app"$؟ ولماذا نقصت قراءة الربيعة عند الغمر؟`,
								answer: `1) $P$ هو الثقل الحقيقي للجسم في الهواء، و$P_"app"$ هو ثقله الظاهري في الماء. نقصت قراءة الربيعة لأن الماء يؤثر على الجسم بقوة شاقولية نحو الأعلى تسمى دافعة أرخميدس $arrow(F)_A$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'غمر الجسم في الماء العذب'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب شدة دافعة أرخميدس $F_A$ ثم اذكر خصائص شعاعها الأربع.`,
						answer: `2) $F_A = P - P_"app" = ${pReal} - ${pApp} = ${faWater} " N"$.\n\nالخصائص: المبدأ مركز ثقل السائل المزاح (ينطبق على $G$)، الحامل شاقولي، الجهة نحو الأعلى، والشدة $${faWater} " N"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج حجم الجسم الصلب $V$ بالـ $"m"^3$ ثم بالـ $"cm"^3$، واحسب كتلته الحجمية $rho_S$.`,
						answer: `3) الجسم مغمور كلياً لذا $V = V_"مزاح" = frac(F_A, rho_"ماء" times g) = frac(${faWater}, 1000 times 10) = ${volM3} " m"^3 = ${volCm3} " cm"^3$.\n\nكتلة الجسم: $m = frac(P, g) = ${massKg} " kg"$، ومنه $rho_S = frac(m, V) = ${roundTo(massKg / volM3, 0)} " kg/m"^3$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) نعيد غمر الجسم كلياً في ماء مالح كتلته الحجمية $rho' = 1200 " kg/m"^3$. احسب الشدة الجديدة لدافعة أرخميدس $F'_A$ وماذا تستنتج؟`,
						answer: `4) $F'_A = rho' times V times g = 1200 times ${volM3} times 10 = ${faSalt} " N"$. نستنتج أن شدة دافعة أرخميدس تزداد بزيادة الكتلة الحجمية للسائل.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'دافعة أرخميدس تحسب من الفرق: $F_A = P - P_{\\text{app}}$.',
				'الحجم المغمور يساوي حجم السائل المزاح: $V = \\frac{F_A}{\\rho \\cdot g}$ بوحدة $\\text{m}^3$.',
				'كلما زادت الكتلة الحجمية للسائل زادت شدة دافعة أرخميدس.'
			],
			solutionStepsAr: [
				'نقصان قراءة الربيعة ناتج عن دافعة أرخميدس الموجهة للأعلى.',
				`$F_A = ${pReal} - ${pApp} = ${faWater}\\text{ N}$.`,
				`$V = ${volM3}\\text{ m}^3 = ${volCm3}\\text{ cm}^3$ و$\\rho_S = ${roundTo(massKg / volM3, 0)}\\text{ kg/m}^3$.`,
				`في الماء المالح: $F'_A = ${faSalt}\\text{ N}$ (تزداد بزيادة $\\rho$).`
			],
			finalAnswer: `FA = ${faWater} N, V = ${volCm3} cm³`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. Viewing Angle & Triangulation (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const triangulationPerspectiveTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t3_triangulation_perspective',
	grade: '4am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'زاوية النظر وتقدير أبعاد ومواضع الأجسام بطريقة التثليث',
	curriculumLessonId: 'phy_lesson_4am_t3_perspective_triangulation_plane_mirror',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const objName = rng.pick(['مئذنة مسجد', 'برج مراقبة', 'شجرة نخيل', 'عمود هوائي']);
		const hCm = rng.pick([15, 20, 25, 30]);
		const dCm = rng.pick([50, 60, 75, 100]);
		const bigDM = difficulty === 'easy' ? 60 : rng.pick([80, 100, 120, 150]);
		const bigHM = roundTo((bigDM * hCm) / dCm, 2);
		const alphaRad = roundTo(hCm / dCm, 3);
		const alphaDeg = roundTo((alphaRad * 180) / Math.PI, 1);

		const svg = buildTriangulationSvg({
			dLabel: `d = ${dCm} cm`,
			hLabel: `h = ${hCm} cm`,
			bigDLabel: `D = ${bigDM} m`,
			bigHLabel: `H = ?`
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t3_tri_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$H = ${bigHM}\\text{ m}$`,
			[
				{
					text: `$H = ${roundTo((bigDM * dCm) / hCm, 2)}\\text{ m}$`,
					diagnosticFeedback: 'قلبت النسبة! التناسب الصحيح هو $\\frac{H}{D} = \\frac{h}{d}$ ومنه $H = D \\times \\frac{h}{d}$.'
				},
				{
					text: `$H = ${roundTo(bigHM * 100, 0)}\\text{ m}$`,
					diagnosticFeedback: 'النسبة $\\frac{h}{d}$ بدون وحدة لأن كلاهما بالسنتيمتر، لذا يخرج $H$ مباشرة بالمتر مثل $D$.'
				},
				{
					text: `$H = ${roundTo(bigHM / 2, 2)}\\text{ m}$`,
					diagnosticFeedback: 'راجع عملية الضرب والقسمة في التناسب.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يقدّر تلميذ ارتفاع **${objName}** يبعد عنه مسافة $D = ${bigDM}\\text{ m}$ باستعمال مسطرة طولها $h = ${hCm}\\text{ cm}$ على بعد $d = ${dCm}\\text{ cm}$ من عينه حتى تحجب الجسم تماماً. ما ارتفاع الـ${objName} $H$؟`,
				questionTextAr: `تثليث: $D = ${bigDM}\\text{ m}$، $h = ${hCm}\\text{ cm}$، $d = ${dCm}\\text{ cm}$. احسب $H$:`,
				imageUrl,
				imageCaption: 'مخطط طريقة التثليث',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `حسب طريقة التثليث: $\\frac{H}{D} = \\frac{h}{d} \\Rightarrow H = ${bigDM} \\times \\frac{${hCm}}{${dCm}} = ${bigHM}\\text{ m}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `أراد تلميذ تقدير ارتفاع (${objName}) يبعد عن موقع رصده مسافة $D = ${bigDM} " m"$، فاستعمل مسطرة شاقولية طولها $h = ${hCm} " cm"$ ووضعها على بعد $d = ${dCm} " cm"$ من عينه $O$ حتى حجبت الـ${objName} تماماً كما يوضح الشكل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) عرّف زاوية النظر $alpha$ (القطر الظاهري)، وكيف تتغير عندما يقترب الملاحظ من الجسم؟`,
								answer: `1) زاوية النظر هي الزاوية المحصورة بين الشعاعين الضوئيين الآتيين من طرفي الجسم إلى عين الملاحظ. تزداد هذه الزاوية كلما اقترب الملاحظ من الجسم فيبدو أكبر حجماً.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مبدأ طريقة التثليث'
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب علاقة التثليث (تشابه المثلثين) التي تربط $H$ و$D$ و$h$ و$d$، ثم احسب ارتفاع الـ${objName} $H$ بالمتر.`,
						answer: `2) العلاقة: $frac(H, D) = frac(h, d)$، ومنه $H = D times frac(h, d) = ${bigDM} times frac(${hCm}, ${dCm}) = ${bigHM} " m"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب زاوية النظر $alpha$ بالراديان باستعمال التقريب $tan alpha approx alpha("rad") approx frac(h, d)$، ثم حوّلها إلى الدرجات (نأخذ $pi approx 3.14$).`,
						answer: `3) بالراديان: $alpha approx frac(${hCm}, ${dCm}) = ${alphaRad} " rad"$.\n\nبالدرجات: $alpha(°) = ${alphaRad} times frac(180, 3.14) approx ${alphaDeg}°$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) لو ابتعد الملاحظ ليصبح على مسافة $D' = ${bigDM * 2} " m"$، فما طول المسطرة $h'$ اللازم لحجب نفس الـ${objName} على نفس البعد $d = ${dCm} " cm"$ عن العين؟`,
						answer: `4) بتضاعف المسافة $D'$ تنقص زاوية النظر إلى النصف، ومنه: $h' = d times frac(H, D') = ${dCm} times frac(${bigHM}, ${bigDM * 2}) = ${roundTo(hCm / 2, 1)} " cm"$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'زاوية النظر تزداد بالاقتراب وتنقص بالابتعاد.',
				'استعمل تناسب التثليث: $\\frac{H}{D} = \\frac{h}{d}$.',
				'تذكّر التحويل: $180^\\circ = \\pi\\text{ rad}$.'
			],
			solutionStepsAr: [
				'زاوية النظر هي الزاوية بين الشعاعين الصادرين من طرفي الجسم نحو العين، وتكبر بالاقتراب.',
				`$H = ${bigDM} \\times \\frac{${hCm}}{${dCm}} = ${bigHM}\\text{ m}$.`,
				`$\\alpha \\approx ${alphaRad}\\text{ rad} \\approx ${alphaDeg}^\\circ$.`,
				`عند مضاعفة البعد يصبح $h' = ${roundTo(hCm / 2, 1)}\\text{ cm}$.`
			],
			finalAnswer: `H = ${bigHM} m`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. Plane Mirror Reflection & Rotating Mirror (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const planeMirrorReflectionTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t3_plane_mirror_reflection',
	grade: '4am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'قانونا الانعكاس والمرآة المستوية والدوارة',
	curriculumLessonId: 'phy_lesson_4am_t3_perspective_triangulation_plane_mirror',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isSurfaceAngle = difficulty !== 'easy' && seed % 2 === 1;
		const givenAngle = isSurfaceAngle ? rng.pick([25, 30, 35, 40]) : rng.pick([35, 40, 50, 55]);
		const incidenceI = isSurfaceAngle ? 90 - givenAngle : givenAngle;
		const reflectionR = incidenceI;
		const rotAlpha = rng.pick([8, 10, 12, 15]);
		const rayTurn = 2 * rotAlpha;
		const totalBetweenRays = incidenceI + reflectionR;

		const svg = buildMirrorReflectionSvg({
			givenAngleText: `${givenAngle}°`,
			isSurfaceAngle,
			rotationDeg: rotAlpha
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t3_mir_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$r = ${reflectionR}^\\circ$ ويدور الشعاع المنعكس بـ $${rayTurn}^\\circ$`,
			[
				{
					text: `$r = ${isSurfaceAngle ? givenAngle : 90 - givenAngle}^\\circ$ ويدور الشعاع المنعكس بـ $${rayTurn}^\\circ$`,
					diagnosticFeedback: isSurfaceAngle
						? `انتبه! $${givenAngle}^\\circ$ هي الزاوية مع **سطح المرآة**؛ زاوية الورود هي $i = 90^\\circ - ${givenAngle}^\\circ = ${incidenceI}^\\circ$.`
						: 'زاوية الانعكاس تساوي زاوية الورود المقاسة مع الناظم مباشرة ($r = i$).'
				},
				{
					text: `$r = ${reflectionR}^\\circ$ ويدور الشعاع المنعكس بـ $${rotAlpha}^\\circ$`,
					diagnosticFeedback: 'عندما تدور المرآة بزاوية $\\alpha$ يدور الشعاع المنعكس بـ **ضعف** الزاوية ($2\\alpha$).'
				},
				{
					text: `$r = ${totalBetweenRays}^\\circ$ ويدور الشعاع المنعكس بـ $${roundTo(rotAlpha / 2, 1)}^\\circ$`,
					diagnosticFeedback: `$${totalBetweenRays}^\\circ$ هي الزاوية الكلية بين الشعاعين الوارد والمنعكس، وليست زاوية الانعكاس.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: isSurfaceAngle
					? `يسقط شعاع ضوئي على مرآة مستوية بزاوية $${givenAngle}^\\circ$ مع **سطح المرآة**، ثم تُدار المرآة بزاوية $\\alpha = ${rotAlpha}^\\circ$ مع ثبات الشعاع الوارد. ما قيمة زاوية الانعكاس $r$ وبكم يدور الشعاع المنعكس؟`
					: `يسقط شعاع ضوئي على مرآة مستوية بزاوية ورود $i = ${givenAngle}^\\circ$ مع **الناظم**، ثم تُدار المرآة بزاوية $\\alpha = ${rotAlpha}^\\circ$ مع ثبات الشعاع الوارد. ما قيمة $r$ وبكم يدور الشعاع المنعكس؟`,
				questionTextAr: `ما زاوية الانعكاس $r$ وزاوية دوران الشعاع المنعكس عند دوران المرآة بـ $${rotAlpha}^\\circ$؟`,
				imageUrl,
				imageCaption: 'شعاع وارد ومنعكس على مرآة مستوية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${isSurfaceAngle ? `زاوية الورود $i = 90^\\circ - ${givenAngle}^\\circ = ${incidenceI}^\\circ$` : `زاوية الورود $i = ${incidenceI}^\\circ$`}، ومنه $r = i = ${reflectionR}^\\circ$. وعند دوران المرآة بزاوية $\\alpha = ${rotAlpha}^\\circ$ يدور المنعكس بـ $2\\alpha = ${rayTurn}^\\circ$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `نسلّط شعاعاً ضوئياً رفيعاً نحو مرآة مستوية أفقية في نقطة الورود $I$ بحيث يصنع زاوية $${givenAngle}°$ مع ${isSurfaceAngle ? 'سطح المرآة' : 'الناظم $N$'} كما يظهر في الشكل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) اذكر نص قانوني الانعكاس في الضوء.`,
								answer: `1) القانون الأول: الشعاع الوارد والشعاع المنعكس والناظم تقع في مستوٍ واحد.\n\nالقانون الثاني: زاوية الورود تساوي زاوية الانعكاس ($i = r$).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'ظاهرة الانعكاس على المرآة'
							}
						]
					},
					{
						type: 'text',
						content: `2) عيّن قيمة زاوية الورود $i$ وزاوية الانعكاس $r$، ثم احسب الزاوية المحصورة بين الشعاع الوارد والشعاع المنعكس.`,
						answer: `2) ${isSurfaceAngle ? `زاوية الورود: $i = 90° - ${givenAngle}° = ${incidenceI}°$.` : `زاوية الورود معطاة: $i = ${incidenceI}°$.`}\n\nزاوية الانعكاس: $r = i = ${reflectionR}°$.\n\nالزاوية بين الوارد والمنعكس: $i + r = ${totalBetweenRays}°$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) مع بقاء الشعاع الوارد ثابتاً، نُدير المرآة المستوية حول محور في مستويها بزاوية $alpha = ${rotAlpha}°$. بكم درجة يدور الشعاع المنعكس؟`,
						answer: `3) يدور الشعاع المنعكس بضعف زاوية دوران المرآة في نفس الجهة: $theta = 2 alpha = 2 times ${rotAlpha}° = ${rayTurn}°$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر ثلاث خصائص لصورة جسم حقيقي $A B$ موضوع أمام هذه المرآة المستوية.`,
						answer: `4) الصورة افتراضية (وهمية)، مساوية لطول الجسم ($A'B' = A B$)، ومتناظرة معه بالنسبة لمستوي المرآة (معكوسة الجوانب).`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'الزاوية مع الناظم هي المتممة للزاوية مع سطح المرآة ($i = 90^\\circ - \\beta$).',
				'تذكّر القانون الثاني للانعكاس: $i = r$.',
				'دوران المرآة بـ $\\alpha$ يسبب دوران الشعاع المنعكس بـ $2\\alpha$.'
			],
			solutionStepsAr: [
				'قانونا الانعكاس: المستوي الواحد و$i = r$.',
				`$i = ${incidenceI}^\\circ$ و$r = ${reflectionR}^\\circ$ والزاوية بينهما $${totalBetweenRays}^\\circ$.`,
				`دوران الشعاع المنعكس: $\\theta = 2\\alpha = ${rayTurn}^\\circ$.`,
				'الصورة افتراضية، متقايسة، ومتناظرة مع الجسم بالنسبة للمرآة.'
			],
			finalAnswer: `r = ${reflectionR}°, Δθ = ${rayTurn}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. Integration 1: Cargo Ship & Archimedes' Thrust (8 pts)
// ═══════════════════════════════════════════════════════════════════════════
const integrationCargoShipTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t3_integration_cargo_ship_archimedes',
	grade: '4am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: توازن سفينة شحن ودافعة أرخميدس بين النهر والبحر (BEM)',
	curriculumLessonId: 'phy_lesson_4am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const gVal = 10;
		const rhoFresh = 1000;
		const rhoSea = 1030;
		const hullVol = rng.pick([40, 50, 60]); // m³
		// Choose submerged volume in sea cleanly (multiple of 10 m³) so mass = rhoSea * vSubSea
		const vSubSea = hullVol === 40 ? 20 : hullVol === 50 ? 25 : 30;
		const massShip = rhoSea * vSubSea; // kg (e.g. 20600 kg)
		const weightN = massShip * gVal;
		const vSubFresh = roundTo(weightN / (rhoFresh * gVal), 2); // e.g. 20.6 m³
		const maxLoadMassSea = rhoSea * hullVol - massShip;
		const scaleN = roundTo(weightN / 4, 0);

		const svg = svgArchimedesBeaker({ liquidLabel: 'ماء البحر (ρ₂ = 1030)' });
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t3_int1_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تبقى $F_A = ${weightN}\\text{ N}$ ثابتة، وينقص حجم الجزء المغمور من $${vSubFresh}\\text{ m}^3$ إلى $${vSubSea}\\text{ m}^3$`,
			[
				{
					text: `تزداد $F_A$ في البحر، ويزداد حجم الجزء المغمور من $${vSubFresh}\\text{ m}^3$ إلى $${hullVol}\\text{ m}^3$`,
					diagnosticFeedback: 'بما أن السفينة طافية ومتوازنة في الحالتين فإن $F_A = P$ لا تتغير؛ وزيادة كثافة البحر تقلل حجم الغمر.'
				},
				{
					text: `تنقص $F_A$ في البحر، فتغوص السفينة أعمق`,
					diagnosticFeedback: 'كثافة ماء البحر أكبر من الماء العذب، لذا توفر نفس الدافعة بحجم مغمور أصغر.'
				},
				{
					text: `تبقى $F_A$ والحجم المغمور ثابتين دون تغير`,
					diagnosticFeedback: 'من $F_A = \\rho \\cdot V_i \\cdot g$، تغيّر $\\rho$ مع ثبات $F_A$ يغيّر $V_i$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `انتقل قارب نقل كتلته $m = ${massShip}\\text{ kg}$ من نهر عذب ($\\rho_1 = 1000\\text{ kg/m}^3$) إلى البحر ($\\rho_2 = 1030\\text{ kg/m}^3$) حيث $g = 10\\text{ N/kg}$. ماذا يحدث لدافعة أرخميدس وحجم الجزء المغمور؟`,
				questionTextAr: `انتقال قارب كتلته $${massShip}\\text{ kg}$ من ماء عذب إلى ماء البحر:`,
				imageUrl,
				imageCaption: 'طفو القارب وتوازنه',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `القارب طافٍ متوازن في السائلين أي $F_A = P = ${weightN}\\text{ N}$. في النهر $V_1 = ${vSubFresh}\\text{ m}^3$ وفي البحر $V_2 = ${vSubSea}\\text{ m}^3$ (يقل الغمر).`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `أبحر قارب شحن صغير حجم هيكله الكلي $V = ${hullVol} " m"^3$ وكتلته الإجمالية $m = ${massShip} " kg"$ من مصب نهر عذب ($rho_1 = 1000 " kg/m"^3$) متجهاً نحو مياه البحر ($rho_2 = 1030 " kg/m"^3$). نأخذ $g = 10 " N/kg"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب شدة ثقل القارب $P$، واستنتج شدة دافعة أرخميدس $F_A$ المطبقة عليه عند طفوه وتوازنه، مع ذكر شرطي التوازن.`,
								answer: `1) $P = m times g = ${massShip} times 10 = ${weightN} " N"$.\n\nبما أن القارب طافٍ ومتوازن تحت تأثير قوتين ($arrow(P)$ و$arrow(F)_A$), فإن لهما نفس الحامل الشاقولي، ونفس الشدة ($F_A = P = ${weightN} " N"$), وجهتين متعاكستين ($arrow(P) + arrow(F)_A = arrow(0)$).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: القوى المؤثرة على جسم طافٍ'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب طول كل من الشعاعين $arrow(P)$ و$arrow(F)_A$ لتمثيلهما بسلم الرسم $1 " cm" arrow.r ${scaleN} " N"$.`,
						answer: `2) طول كل شعاع هو $L = frac(${weightN}, ${scaleN}) = 4 " cm"$ ($arrow(P)$ نحو الأسفل من $G$، و$arrow(F)_A$ نحو الأعلى من مركز الجزء المغمور).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب حجم الجزء المغمور من القارب في ماء النهر ($V_1$) ثم في ماء البحر ($V_2$). لماذا يرتفع خط الماء على هيكل القارب عندما يغادر البحر ويدخل النهر؟`,
						answer: `3) في النهر: $V_1 = frac(F_A, rho_1 times g) = frac(${weightN}, 1000 times 10) = ${vSubFresh} " m"^3$.\n\nفي البحر: $V_2 = frac(F_A, rho_2 times g) = frac(${weightN}, 1030 times 10) = ${vSubSea} " m"^3$.\n\nيرتفع خط الماء (يغوص القارب أعمق) في النهر لأن الكتلة الحجمية للماء العذب أصغر من ماء البحر، فيحتاج القارب إلى إزاحة حجم أكبر للحصول على نفس الدافعة $F_A = P$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4) ما أقصى كتلة بضائع إضافية يمكن شحنها على القارب وهو في البحر قبل أن ينغمر هيكله كلياً ($V = ${hullVol} " m"^3$)؟`,
						answer: `4) أقصى دافعة في البحر عند الانغمار الكلي: $F_(A,"max") = rho_2 times V times g = 1030 times ${hullVol} times 10 = ${rhoSea * hullVol * gVal} " N"$.\n\nأقصى كتلة كلية مسموحة: $m_"max" = frac(F_(A,"max"), g) = ${rhoSea * hullVol} " kg"$.\n\nأقصى كتلة بضائع إضافية: $Delta m = ${rhoSea * hullVol} - ${massShip} = ${maxLoadMassSea} " kg"$.`,
						mark: '2'
					}
				]
			},
			hints: [
				'عند الطفو والتوازن: $F_A = P = m \\cdot g$.',
				'احسب الحجم المغمور بالعلاقة $V_i = \\frac{F_A}{\\rho \\cdot g}$ لكل من النهر والبحر.',
				'أقصى حمولة تقابل انغمار كامل حجم الهيكل $V = ' + hullVol + '\\text{ m}^3$.'
			],
			solutionStepsAr: [
				`$P = F_A = ${weightN}\\text{ N}$، شرطا التوازن لقوتين.`,
				'طول كل شعاع بالسلم هو $4\\text{ cm}$.',
				`$V_1 = ${vSubFresh}\\text{ m}^3$ في النهر و$V_2 = ${vSubSea}\\text{ m}^3$ في البحر.`,
				`الكتلة الإضافية القصوى في البحر: $${maxLoadMassSea}\\text{ kg}$.`
			],
			finalAnswer: `Δm_max = ${maxLoadMassSea} kg`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 6. Integration 2: Lighthouse Triangulation & Mirror Optics (8 pts)
// ═══════════════════════════════════════════════════════════════════════════
const integrationMirrorTriangulationTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t3_integration_mirror_triangulation',
	grade: '4am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الرؤية بمرآة مستوية وطريقة التثليث (BEM)',
	curriculumLessonId: 'phy_lesson_4am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const towerH = rng.pick([24, 30, 36]);
		const rulerH = 20; // cm
		const eyeDistD = 50; // cm
		const towerDistD = roundTo((towerH * eyeDistD) / rulerH, 0); // e.g. 60, 75, 90 m
		const betaSurface = rng.pick([30, 35, 40]);
		const angleI = 90 - betaSurface;
		const rotAlpha = rng.pick([6, 8, 10]);
		const reflectedTurn = 2 * rotAlpha;

		const svg = buildTriangulationSvg({
			dLabel: `d = ${eyeDistD} cm`,
			hLabel: `h = ${rulerH} cm`,
			bigDLabel: `D = ?`,
			bigHLabel: `H = ${towerH} m`
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t3_int2_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$D = ${towerDistD}\\text{ m}$ و $r = ${angleI}^\\circ$ ويدور المنعكس بـ $${reflectedTurn}^\\circ$`,
			[
				{
					text: `$D = ${towerDistD}\\text{ m}$ و $r = ${betaSurface}^\\circ$ ويدور المنعكس بـ $${rotAlpha}^\\circ$`,
					diagnosticFeedback: 'زاوية الانعكاس تقاس مع الناظم ($90^\\circ - ' + betaSurface + '^\\circ$) ودوران المنعكس ضعف دوران المرآة.'
				},
				{
					text: `$D = ${roundTo((towerH * rulerH) / eyeDistD, 1)}\\text{ m}$ و $r = ${angleI}^\\circ$ ويدور المنعكس بـ $${reflectedTurn}^\\circ$`,
					diagnosticFeedback: 'في التثليث $D = H \\times \\frac{d}{h}$ وليس $H \\times \\frac{h}{d}$.'
				},
				{
					text: `$D = ${towerDistD}\\text{ m}$ و $r = ${angleI}^\\circ$ ويدور المنعكس بـ $${rotAlpha}^\\circ$`,
					diagnosticFeedback: 'تذكّر: دوران المرآة بـ $\\alpha$ يجعل الشعاع المنعكس يدور بـ $2\\alpha$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `منارة ارتفاعها $H = ${towerH}\\text{ m}$ حُجبت بمسطرة ($h = ${rulerH}\\text{ cm}$) على بعد $d = ${eyeDistD}\\text{ cm}$ من العين. وفي مرآة مستوية يسقط شعاع بزاوية $${betaSurface}^\\circ$ مع سطحها ثم تدور المرآة بـ $${rotAlpha}^\\circ$. ما بعد المنارة $D$ وزاوية الانعكاس $r$ ودوران المنعكس؟`,
				questionTextAr: `منارة ($H = ${towerH}\\text{ m}$، $h = ${rulerH}\\text{ cm}$، $d = ${eyeDistD}\\text{ cm}$) ومرآة تدور بـ $${rotAlpha}^\\circ$:`,
				imageUrl,
				imageCaption: 'تقدير بعد المنارة بالتثليث',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$D = H \\times \\frac{d}{h} = ${towerH} \\times \\frac{${eyeDistD}}{${rulerH}} = ${towerDistD}\\text{ m}$، و$r = i = 90^\\circ - ${betaSurface}^\\circ = ${angleI}^\\circ$، ودوران المنعكس $2\\alpha = ${reflectedTurn}^\\circ$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `أثناء رحلة بحرية على قارب، أراد البحار تحديد بعده عن منارة ميناء ارتفاعها المعلوم $H = ${towerH} " m"$ دون استعمال جهاز تحديد المواقع، كما أراد توجيه إشارة ضوئية نحو الشاطئ باستعمال مرآة مستوية:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) الجزء الأول (التثليث وزاوية النظر): حمل البحار مسطرة شاقولية طولها $h = ${rulerH} " cm"$ على بعد $d = ${eyeDistD} " cm"$ من عينه فحجبت المنارة تماماً. احسب مسافة القارب $D$ عن المنارة بالمتر.`,
								answer: `1) حسب التثليث: $frac(H, D) = frac(h, d)$، ومنه $D = H times frac(d, h) = ${towerH} times frac(${eyeDistD}, ${rulerH}) = ${towerDistD} " m"$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: تقدير بعد المنارة'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب زاوية النظر $alpha$ التي يرى بها البحار المنارة بالراديان، وبماذا تنصحه ليزيد من دقة التقدير لو اقترب القارب؟`,
						answer: `2) $alpha("rad") approx frac(H, D) = frac(${towerH}, ${towerDistD}) = ${roundTo(towerH / towerDistD, 2)} " rad"$. كلما اقترب القارب تزداد زاوية النظر $alpha$ وتبدو المنارة أكبر.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) الجزء الثاني (المرآة المستوية): يسقط شعاع ضوئي من مصباح القارب على مرآة مستوية بزاوية $${betaSurface}°$ مع سطح المرآة. احسب زاوية الورود $i$ وزاوية الانعكاس $r$ مع رسم تخطيطي مسمى للناظم والزاويتين.`,
						answer: `3) الناظم عمودي على سطح المرآة ($90°$)، إذن $i = 90° - ${betaSurface}° = ${angleI}°$، وحسب قانون الانعكاس الثاني فإن $r = i = ${angleI}°$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) لتوجيه الشعاع المنعكس نحو نقطة محددة على الشاطئ، أدار البحار المرآة بزاوية $alpha = ${rotAlpha}°$ مع ثبات الشعاع الوارد. بكم درجة يدور الشعاع المنعكس؟ وما خصائص صورة المصباح المتشكلة خلف المرآة؟`,
						answer: `4) يدور الشعاع المنعكس بزاوية $theta = 2 alpha = 2 times ${rotAlpha}° = ${reflectedTurn}°$.\n\nخصائص صورة المصباح في المرآة المستوية: افتراضية، متناظرة مع المصباح بالنسبة لمستوي المرآة، ومساوية له في الأبعاد.`,
						mark: '2'
					}
				]
			},
			hints: [
				'استعمل التناسب $\\frac{H}{D} = \\frac{h}{d}$ لإيجاد البعد $D$.',
				'احسب $i = 90^\\circ - \\beta$ عندما تعطى الزاوية مع سطح المرآة.',
				'تذكّر قاعدة المرآة الدوارة: $\\theta_{\\text{منعكس}} = 2\\alpha_{\\text{مرآة}}$.'
			],
			solutionStepsAr: [
				`$D = ${towerDistD}\\text{ m}$.`,
				`$\\alpha \\approx ${roundTo(towerH / towerDistD, 2)}\\text{ rad}$.`,
				`$i = r = ${angleI}^\\circ$.`,
				`يدور الشعاع المنعكس بزاوية $${reflectedTurn}^\\circ$، والصورة افتراضية متناظرة.`
			],
			finalAnswer: `D = ${towerDistD} m, r = ${angleI}°`
		};
	}
};

export const PHYSICS_TEMPLATES_4AM_T3: PhysicsParameterizedTemplate[] = [
	threeForcesEquilibriumTemplate,
	archimedesBuoyancyTemplate,
	triangulationPerspectiveTemplate,
	planeMirrorReflectionTemplate,
	integrationCargoShipTemplate,
	integrationMirrorTriangulationTemplate
];
