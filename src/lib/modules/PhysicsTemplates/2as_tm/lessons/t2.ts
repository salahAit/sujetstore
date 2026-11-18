import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T2 } from '../../secondary_shared_2as/lessons/t2';
import { svgOscilloscopeTrace, svgPhysicsCurvePlot, wrapPhysicsSvg } from '../../svg-physics';

function svgFaradayFluxDiagram(): string {
	const body = `
  <rect x="8" y="8" width="404" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">التحريض الكهرومغناطيسي: Φ = N·B·S·cos(α) و e = -ΔΦ/Δt</text>
  <!-- Coil -->
  <ellipse cx="145" cy="112" rx="28" ry="52" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="145" y="182" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">وشيعة (N لفة، مساحة S)</text>
  <!-- Normal vector n -->
  <defs>
    <marker id="fArrN" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker>
    <marker id="fArrB" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
  </defs>
  <line x1="145" y1="112" x2="245" y2="112" stroke="#059669" stroke-width="2" marker-end="url(#fArrN)"/>
  <text x="242" y="128" font-size="11.5" font-weight="bold" fill="#059669">n (الناظم)</text>
  <!-- B vector tilted -->
  <line x1="145" y1="112" x2="232" y2="62" stroke="#dc2626" stroke-width="2.2" marker-end="url(#fArrB)"/>
  <text x="236" y="64" font-size="12" font-weight="bold" fill="#dc2626">B</text>
  <text x="195" y="96" font-size="11.5" font-weight="bold" fill="#dc2626">α</text>
  <!-- Magnet -->
  <rect x="26" y="96" width="56" height="32" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>
  <text x="41" y="116" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">S</text>
  <text x="68" y="116" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">N</text>
  <text x="330" y="102" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">قانون فاراداي:</text>
  <text x="330" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">e = -ΔΦ / Δt</text>
  <text x="330" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">i = |e| / R</text>
  `;
	return wrapPhysicsSvg(420, 220, body);
}

function svgRectificationFilteringCurve(): string {
	return svgPhysicsCurvePlot({
		xMin: 0,
		xMax: 20,
		yMin: 0,
		yMax: 12,
		xStep: 5,
		yStep: 3,
		xLabel: 't (ms)',
		yLabel: 'u_s (V)',
		title: 'التقويم ثنائي النوبة والترشيح بالمكثفة (فوق دارة الحمل)',
		curves: [
			{
				fn: (t) => 10 * Math.abs(Math.sin((Math.PI * t) / 10)),
				color: '#94a3b8',
				dashed: true,
				label: 'مقوم غير مرشح'
			},
			{
				fn: (t) => {
					const mod = t % 10;
					const sine = 10 * Math.abs(Math.sin((Math.PI * t) / 10));
					const decay = 10 * Math.exp(-(mod - 5) / 22);
					return mod >= 5 ? Math.max(sine, decay) : Math.max(sine, 10 * Math.exp(-(mod + 5) / 22));
				},
				color: '#2563eb',
				label: 'مقوم مرشح بالمكثفة'
			}
		]
	});
}

const titrationTm = (() => {
	const base = adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[0], '2as_tm', 't2_acid_base_redox_titration');
	return {
		...base,
		order: 1,
		titleAr: 'تعيين كمية المادة بواسطة المعايرة (حمض-أساس وأكسدة-إرجاع)',
		objectives: [
			'موازنة تفاعلات حمض-أساس (برونشتد) وأكسدة-إرجاع في وسط حمضي',
			'إنجاز المعايرة اللونية والناقلية وتعيين نقطة التكافؤ واستغلال جدول التقدم'
		],
		keywordsAr: ['المعايرة', 'حمض-أساس', 'أكسدة-إرجاع', 'نقطة التكافؤ'],
		summary: {
			...base.summary,
			rulesAr: [
				...base.summary.rulesAr,
				'**المعايرة بالأكسدة-إرجاع**:\n- المؤكسد يكتسب إلكترونات ($\\text{Ox} + n e^- = \\text{Red}$) والمرجع يفقدها.\n- عند التكافؤ لتفاعل $a\\,\\text{Ox}_1 + b\\,\\text{Red}_2 \\rightarrow \\dots$: $\\frac{C_1 V_1}{a} = \\frac{C_2 V_{2E}}{b}$.'
			]
		}
	};
})();

const magneticLaplaceTm = (() => {
	const base = adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[2], '2as_tm', 't2_magnetic_field_laplace');
	return {
		...base,
		order: 2,
		sequenceId: 'seq3',
		sequenceTitleAr: 'المعايرة الكيميائية والمغناطيسية والتحريض (الوحدات 8–11)',
		titleAr: 'الحقل المغناطيسي ومقاربة الأفعال المتبادلة الكهرومغناطيسية (قوة لابلاص)',
		objectives: [
			'حساب شدة الحقل المغناطيسي المتولد عن تيارات وتراكبها (B = B_1 + B_2)',
			'تطبيق قوة لابلاص F = I·L·B·sinα وتفسير مبدأ المحركات الكهربائية'
		],
		keywordsAr: ['الحقل المغناطيسي', 'قوة لابلاص', 'تراكب الحقول'],
		summary: {
			...base.summary,
			rulesAr: [
				...base.summary.rulesAr,
				'**قوة لابلاص الكهرومغناطيسية**:\n$$F = I \\cdot L \\cdot B \\cdot \\sin\\alpha$$\nتُحدد جهتها بقاعدة اليد اليمنى وهي المسؤولة عن دوران المحرك الكهربائي ذي التيار المستمر.'
			]
		}
	};
})();

const faradayInductionTm: PhysicsInteractiveLessonData = {
	id: 'phy_lesson_2as_tm_t2_electromagnetic_induction_faraday',
	slug: 'phy-2as-tm-t2-electromagnetic-induction-faraday',
	grade: '2as_tm',
	yearSubjectId: 713,
	trimesterId: 't2',
	sequenceId: 'seq3',
	sequenceTitleAr: 'المعايرة الكيميائية والمغناطيسية والتحريض (الوحدات 8–11)',
	order: 3,
	titleAr: 'التحريض الكهرومغناطيسي (قانون فاراداي وقانون لنز) — خاص بـ TM و MATH',
	objectives: [
		'حساب التدفق المغناطيسي Φ = N·B·S·cosα ووحدته الويبر (Wb) وربطه بظاهرة التحريض الكهرومغناطيسي',
		'تطبيق قانون فاراداي e = -ΔΦ/Δt وقانون لنز لتحديد جهة التيار المتحرض والقوة المحركة الكهربائية التحريضية'
	],
	keywordsAr: ['التحريض الكهرومغناطيسي', 'التدفق المغناطيسي', 'قانون فاراداي', 'قانون لنز'],
	discover: {
		scenarioAr:
			'وشيعة مسطحة تحتوي على $N = 200$ لفة، مساحة كل لفة $S = 50\\text{ cm}^2$، موضوعة داخل حقل مغناطيسي منتظم عمودي على مستوي اللفات ($\\alpha = 0^\\circ$). يتناقص الحقل خطياً من $B_1 = 0.4\\text{ T}$ إلى $B_2 = 0\\text{ T}$ خلال مدة $\\Delta t = 0.1\\text{ s}$.',
		svg: svgFaradayFluxDiagram(),
		steps: [
			{
				promptAr: 'احسب التدفق المغناطيسي الابتدائي $\\Phi_1$ عبر الوشيعة بوحدة الويبر ($\\text{Wb}$).',
				hintAr: 'حول المساحة $S = 50\\text{ cm}^2 = 5 \\times 10^{-3}\\text{ m}^2$ واستعمل $\\Phi = N \\cdot B \\cdot S \\cdot \\cos(0^\\circ)$.',
				expectedInput: '0.4 Wb',
				revealAr: '$\\Phi_1 = 200 \\times 0.4 \\times 5 \\times 10^{-3} \\times 1 = 0.4\\text{ Wb}$.'
			},
			{
				promptAr: 'احسب القوة المحركة الكهربائية التحريضية المتوسطة $e$ بتطبيق قانون فاراداي.',
				hintAr: '$e = -\\frac{\\Delta\\Phi}{\\Delta t} = -\\frac{\\Phi_2 - \\Phi_1}{\\Delta t}$.',
				expectedInput: '4 V',
				revealAr: '$e = -\\frac{0 - 0.4}{0.1} = +4\\text{ V}$.'
			},
			{
				promptAr: 'إذا أُغلقت الوشيعة على مقاومة كلية $R = 8\\,\\Omega$، فما شدة التيار المتحرض $i$ وما جهته حسب قانون لنز؟',
				hintAr: '$i = |e|/R$، ويعاكس التيار المتحرض السبب الذي أدى إلى حدوثه (نقصان التدفق).',
				revealAr:
					'$i = \\frac{4}{8} = 0.5\\text{ A}$. حسب قانون لنز يولد التيار المتحرض حقلاً مغناطيسياً $\\vec{B}_{\\text{ind}}$ في نفس جهة $\\vec{B}$ لمقاومة نقصان التدفق.'
			}
		]
	},
	summary: {
		rulesAr: [
			'**التدفق المغناطيسي $\\Phi$**:\n$$\\Phi = N \\cdot B \\cdot S \\cdot \\cos\\alpha$$\nحيث $\\alpha$ الزاوية بين الناظم $\\vec{n}$ على مستوي اللفة وشعاع الحقل $\\vec{B}$، ووحدة $\\Phi$ هي **الويبر ($\\text{Wb}$)**.',
			'**قانون فاراداي وقانون لنز**:\n- كل تغير في التدفق المغناطيسي $\\Delta\\Phi$ خلال مدة $\\Delta t$ يولد قوة محركة كهربائية تحريضية متوسطة:\n$$e = -\\frac{\\Delta\\Phi}{\\Delta t}$$\n- **قانون لنز**: جهة التيار المتحرض تكون بحيث يعاكس بأفعاله المغناطيسية السبب الذي أدى إلى حدوثه (تزايد أو تناقص التدفق).'
		],
		visualSvg: svgFaradayFluxDiagram(),
		visualCaptionAr: 'عناصر حساب التدفق المغناطيسي وقانون فاراداي للتحريض الكهرومغناطيسي',
		examples: [
			{
				problemAr:
					'وشيعة مساحتها $S = 0.02\\text{ m}^2$ وعدد لفاتها $N = 100$ تدور من الوضع $\\alpha = 0^\\circ$ إلى $\\alpha = 90^\\circ$ داخل حقل $B = 0.5\\text{ T}$ خلال $\\Delta t = 0.05\\text{ s}$. احسب $e$.',
				solutionAr:
					'$\\Phi_1 = 100 \\times 0.5 \\times 0.02 = 1\\text{ Wb}$ و $\\Phi_2 = 0$. إذن $e = -\\frac{0 - 1}{0.05} = +20\\text{ V}$.'
			}
		],
		watchOutAr:
			'الزاوية $\\alpha$ في $\\Phi = N B S \\cos\\alpha$ هي الزاوية بين الحقل $\\vec{B}$ و**الناظم $\\vec{n}$** على سطح الوشيعة (وليس مستوي الوشيعة نفسها)!'
	},
	practice: [
		{
			questionAr:
				'إطار مساحته $S = 100\\text{ cm}^2$ مكون من $N = 50$ لفة، عمودي على حقل $B = 0.2\\text{ T}$ ($\\alpha = 0^\\circ$). ما قيمة التدفق المغناطيسي عبره؟',
			options: ['$0.1\\text{ Wb}$', '$1000\\text{ Wb}$', '$1\\text{ Wb}$', '$0.01\\text{ Wb}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $S = 0.01\\text{ m}^2 \\implies \\Phi = 50 \\times 0.2 \\times 0.01 = 0.1\\text{ Wb}$.',
				'خطأ تشخيصي: نسيت تحويل المساحة من $\\text{cm}^2$ إلى $\\text{m}^2$ ($1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$).',
				'خطأ تشخيصي: خطأ في الأس عند التحويل.',
				'خطأ تشخيصي: أخطأت في الجداء.'
			],
			explanationAr:
				'نحول المساحة $S = 100 \\times 10^{-4} = 0.01\\text{ m}^2$، فتكون $\\Phi = 50 \\times 0.2 \\times 0.01 = 0.1\\text{ Wb}$.'
		},
		{
			questionAr:
				'يتغير التدفق المغناطيسي عبر وشيعة من $0.6\\text{ Wb}$ إلى $0.1\\text{ Wb}$ خلال مدة $\\Delta t = 0.05\\text{ s}$. ما القوة المحركة التحريضية المتوسطة $e$؟',
			options: ['$+10\\text{ V}$', '$-10\\text{ V}$', '$+0.025\\text{ V}$', '$+12\\text{ V}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $e = -\\frac{0.1 - 0.6}{0.05} = -\\frac{-0.5}{0.05} = +10\\text{ V}$.',
				'خطأ تشخيصي: نسيت إشارة السالب في قانون فاراداي $e = -\\Delta\\Phi/\\Delta t$.',
				'خطأ تشخيصي: ضربت $\\Delta\\Phi$ في $\\Delta t$ بدلاً من القسمة.',
				'خطأ تشخيصي: استخدمت $\\Phi_1 = 0.6$ بدلاً من $\\Delta\\Phi = -0.5$.'
			],
			explanationAr:
				'بتطبيق قانون فاراداي: $e = -\\frac{\\Phi_2 - \\Phi_1}{\\Delta t} = -\\frac{0.1 - 0.6}{0.05} = +10\\text{ V}$.'
		},
		{
			questionAr:
				'عند تقريب القطب الشمالي لمغناطيس من وجه وشيعة مغلقة، أي قطب يتشكل على هذا الوجه حسب قانون لنز؟',
			options: [
				'قطب شمالي $N$ للتنافر ومقاومة الاقتراب',
				'قطب جنوبي $S$ لجذب المغناطيس',
				'لا يتشكل أي قطب مغناطيسي',
				'ينعدم التيار المتحرض فوراً'
			],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! وفق قانون لنز يقاوم التيار المتحرض السبب (اقتراب القطب الشمالي) بتوليد قطب شمالي مماثل يدفعه.',
				'خطأ تشخيصي: القطب الجنوبي سيجذب المغناطيس ويزيد سرعة الاقتراب وهذا يناقض مبدأ لنز وانحفاظ الطاقة.',
				'خطأ تشخيصي: مرور التيار المتحرض يحول الوشيعة إلى مغناطيس.',
				'خطأ تشخيصي: يستمر التيار طوال مدة تغير التدفق.'
			],
			explanationAr:
				'حسب قانون لنز، يعاكس التيار المتحرض تقريب القطب الشمالي بتوليد وجه شمالي مقابل له ليدفعه.'
		}
	]
};

const acTransformersTm: PhysicsInteractiveLessonData = {
	id: 'phy_lesson_2as_tm_t2_ac_voltages_transformers',
	slug: 'phy-2as-tm-t2-ac-voltages-transformers',
	grade: '2as_tm',
	yearSubjectId: 713,
	trimesterId: 't2',
	sequenceId: 'seq4',
	sequenceTitleAr: 'التيار المتناوب والمحول والتقويم (الوحدات 12–17) — خاص بـ TM و MATH',
	order: 4,
	titleAr: 'التوترات والتيارات المتناوبة الجيبية والمحول الكهربائي — خاص بـ TM و MATH',
	objectives: [
		'استخراج الدور T والتواتر f والتوتر الأعظمي U_max والمنتج U_eff = U_max/√2 من راسم الاهتزاز المهبطي',
		'فهم مبدأ عمل المحول الكهربائي وتطبيق علاقة التحويل U_2/U_1 = I_1/I_2 = N_2/N_1 في المحولات المثالية'
	],
	keywordsAr: ['التيار المتناوب', 'التوتر المنتج', 'المحول الكهربائي', 'نسبة التحويل', 'راسم الاهتزاز المهبطي'],
	discover: {
		scenarioAr:
			'نعاين التوتر الثانوي لمحول مثالي على شاشة راسم الاهتزاز المهبطي المضبوط على الحساسية الشاقولية $S_v = 5\\text{ V/div}$ والحساسية الأفقية $S_h = 5\\text{ ms/div}$، فنلاحظ موجة جيبية سعتها $y_{\\max} = 3\\text{ div}$ ودورها $x_T = 4\\text{ div}$.',
		svg: svgOscilloscopeTrace({
			amplitudeDivs: 3,
			periodDivs: 4,
			svLabel: 'Sv = 5 V/div',
			shLabel: 'Sh = 5 ms/div'
		}),
		steps: [
			{
				promptAr: 'احسب التوتر الأعظمي $U_{2\\max}$ والتوتر المنتج $U_{2\\text{eff}}$.',
				hintAr: '$U_{\\max} = S_v \\cdot y_{\\max}$ و $U_{\\text{eff}} = U_{\\max}/\\sqrt{2}$.',
				expectedInput: '15 V و 10.61 V',
				revealAr:
					'$U_{2\\max} = 5 \\times 3 = 15\\text{ V}$، ومنه $U_{2\\text{eff}} = \\frac{15}{\\sqrt{2}} \\approx 10.61\\text{ V}$.'
			},
			{
				promptAr: 'احسب الدور $T$ والتواتر $f$ لهذا التوتر المتناوب.',
				hintAr: '$T = S_h \\cdot x_T$ بوحدة الثانية، و $f = 1/T$.',
				expectedInput: '20 ms و 50 Hz',
				revealAr:
					'$T = 5 \\times 4 = 20\\text{ ms} = 0.02\\text{ s}$، ومنه $f = \\frac{1}{0.02} = 50\\text{ Hz}$.'
			},
			{
				promptAr: 'إذا كان توتر الملف الأولي $U_1 = 220\\text{ V}$ وعدد لفاته $N_1 = 1100$ لفة، فكم عدد لفات الثانوي $N_2$ للحصول على $U_2 = 11\\text{ V}$؟',
				hintAr: 'في المحول المثالي: $\\frac{U_2}{U_1} = \\frac{N_2}{N_1} = m$.',
				expectedInput: '55 لفة',
				revealAr:
					'$N_2 = N_1 \\cdot \\frac{U_2}{U_1} = 1100 \\times \\frac{11}{220} = 55$ لفة (محول خافض للتوتر).'
			}
		]
	},
	summary: {
		rulesAr: [
			'**خصائص التوتر المتناوب الجيبي**:\n$$u(t) = U_{\\max} \\sin(\\omega t)$$\n- التوتر الأعظمي: $U_{\\max} = S_v \\cdot y_{\\max}$، والتوتر المنتج (الفعال الذي يقيسه الفولطمتر): $U_{\\text{eff}} = \\frac{U_{\\max}}{\\sqrt{2}}$.\n- الدور: $T = S_h \\cdot x_T$ (بـ $\\text{s}$)، التواتر: $f = \\frac{1}{T}$ (بـ $\\text{Hz}$)، والنبض: $\\omega = 2\\pi f = \\frac{2\\pi}{T}$.',
			'**المحول الكهربائي المثالي ($\\eta = 1$)**:\n$$m = \\frac{N_2}{N_1} = \\frac{U_2}{U_1} = \\frac{I_1}{I_2}$$\n- إذا كان $m > 1$: محول رافع للتوتر (خافض للتيار).\n- إذا كان $m < 1$: محول خافض للتوتر (رافع للتيار).'
		],
		visualSvg: svgOscilloscopeTrace({
			amplitudeDivs: 3,
			periodDivs: 4,
			svLabel: 'Sv = 5 V/div',
			shLabel: 'Sh = 5 ms/div'
		}),
		visualCaptionAr: 'استخراج التوتر الأعظمي والدور من شاشة راسم الاهتزاز المهبطي',
		examples: [
			{
				problemAr:
					'محول مثالي نسبة تحويله $m = 0.1$ يشتغل أوليه تحت $U_1 = 220\\text{ V}$ ويغذي ثانويه مقاومة تسحب تياراً $I_2 = 2\\text{ A}$. احسب $U_2$ و $I_1$.',
				solutionAr:
					'$U_2 = m \\cdot U_1 = 0.1 \\times 220 = 22\\text{ V}$، و $I_1 = m \\cdot I_2 = 0.1 \\times 2 = 0.2\\text{ A}$.'
			}
		],
		watchOutAr:
			'يشتغل المحول الكهربائي **بالتيار المتناوب فقط** (بسبب التحريض المتبادل وتغير التدفق)، ولا يعمل أبداً بتيار مستمر ثابت لأن $\\Delta\\Phi = 0$!'
	},
	practice: [
		{
			questionAr:
				'توتر متناوب جيبي توتره الأعظمي $U_{\\max} = 24\\sqrt{2}\\text{ V}$ ودوره $T = 10\\text{ ms}$. ما قيمتا توتره المنتج $U_{\\text{eff}}$ وتواتره $f$؟',
			options: [
				'$U_{\\text{eff}} = 24\\text{ V}$ و $f = 100\\text{ Hz}$',
				'$U_{\\text{eff}} = 48\\text{ V}$ و $f = 50\\text{ Hz}$',
				'$U_{\\text{eff}} = 24\\text{ V}$ و $f = 0.1\\text{ Hz}$',
				'$U_{\\text{eff}} = 12\\text{ V}$ و $f = 100\\text{ Hz}$'
			],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $U_{\\text{eff}} = \\frac{24\\sqrt{2}}{\\sqrt{2}} = 24\\text{ V}$ و $f = \\frac{1}{0.01} = 100\\text{ Hz}$.',
				'خطأ تشخيصي: ضربت في $\\sqrt{2}$ بدلاً من القسمة عليها.',
				'خطأ تشخيصي: نسيت تحويل الدور $T = 10\\text{ ms}$ إلى الثانية ($0.01\\text{ s}$).',
				'خطأ تشخيصي: قسمت على $2$ بدلاً من $\\sqrt{2}$.'
			],
			explanationAr:
				'$U_{\\text{eff}} = U_{\\max}/\\sqrt{2} = 24\\text{ V}$، و $T = 0.01\\text{ s} \\implies f = 1/0.01 = 100\\text{ Hz}$.'
		},
		{
			questionAr:
				'محول مثالي عدد لفات أوليه $N_1 = 500$ ولفات ثانويه $N_2 = 100$، يُغذى أوليه بتوتر $U_1 = 230\\text{ V}$. ما توتره الثانوي $U_2$؟',
			options: ['$46\\text{ V}$', '$1150\\text{ V}$', '$23\\text{ V}$', '$115\\text{ V}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $U_2 = U_1 \\cdot \\frac{N_2}{N_1} = 230 \\times \\frac{100}{500} = 46\\text{ V}$.',
				'خطأ تشخيصي: قلبت نسبة التحويل ($N_1 / N_2$ بدلاً من $N_2 / N_1$).',
				'خطأ تشخيصي: قسمت على $10$ بدلاً من $5$.',
				'خطأ تشخيصي: قسمت على $2$ بدلاً من $5$.'
			],
			explanationAr:
				'من علاقة المحول المثالي $\\frac{U_2}{U_1} = \\frac{N_2}{N_1} \\implies U_2 = 230 \\times \\frac{100}{500} = 46\\text{ V}$.'
		},
		{
			questionAr:
				'في المحول الكهربائي المثالي الخافض للتوتر ($m = N_2/N_1 < 1$)، كيف تكون شدة التيار في الثانوي $I_2$ مقارنة بالأولي $I_1$؟',
			options: ['$I_2 > I_1$', '$I_2 < I_1$', '$I_2 = I_1$', '$I_2 = 0$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! لانحفاظ الاستطاعة ($U_1 I_1 = U_2 I_2$)، انخفاض التوتر في الثانوي يرافقه ارتفاع الشدة $I_2 > I_1$.',
				'خطأ تشخيصي: الشدة تتناسب عكسياً مع التوتر في المحول المثالي.',
				'خطأ تشخيصي: لا تتساوى الشدتان إلا إذا كانت نسبة التحويل $m = 1$.',
				'خطأ تشخيصي: يسري تيار في الثانوي بمجرد غلق دارة الحمل.'
			],
			explanationAr:
				'بما أن المحول مثالي ($P_1 = P_2 \\implies U_1 I_1 = U_2 I_2$) فإن خفض التوتر ($U_2 < U_1$) يعني رفع التيار ($I_2 > I_1$).'
		}
	]
};

const acDcRectificationTm: PhysicsInteractiveLessonData = {
	id: 'phy_lesson_2as_tm_t2_ac_dc_rectification',
	slug: 'phy-2as-tm-t2-ac-dc-rectification',
	grade: '2as_tm',
	yearSubjectId: 713,
	trimesterId: 't2',
	sequenceId: 'seq4',
	sequenceTitleAr: 'التيار المتناوب والمحول والتقويم (الوحدات 12–17) — خاص بـ TM و MATH',
	order: 5,
	titleAr: 'تقويم توتر متناوب والتمييز بين AC و DC والكهرباء اليومية — خاص بـ TM و MATH',
	objectives: [
		'تحليل دارة التقويم أحادي النوبة وثنائي النوبة باستعمال الصمامات الثنائية (الديود) وجسر غريتس',
		'تفسير دور المكثفة في ترشيح التوتر المقوم والتمييز التجريبي بين التيار المتناوب والمستمر'
	],
	keywordsAr: ['تقويم التوتر المتناوب', 'الصمام الثنائي', 'جسر التقويم', 'الترشيح بالمكثفة', 'التيار المستمر'],
	discover: {
		scenarioAr:
			'لتحويل التوتر المتناوب الجيبي القادم من ثانوي محول ($U_{\\max} = 10\\text{ V}, T = 20\\text{ ms}$) إلى توتر مستمر لتشغيل جهاز إلكتروني، نمرره عبر جسر تقويم غريتس ($4$ صمامات ثنائية مثالية) ثم نوصل مكثفة على التفرع مع مقاومة الحمل.',
		svg: svgRectificationFilteringCurve(),
		steps: [
			{
				promptAr: 'ما هو دور الصمام الثنائي (الديود) في دارة التقويم؟',
				hintAr: 'الصمام عنصر ثنائي القطب لا يمرر التيار إلا في اتجاه واحد.',
				revealAr:
					'يمرر الصمام الثنائي المثالي التيار عندما يكون مستقطباً في الاتجاه المباشر (المصعد موجب بالنسبة للمهبط) ويمنع مروره في الاتجاه المعاكس.'
			},
			{
				promptAr: 'ما الفرق بين التقويم أحادي النوبة والتقويم ثنائي النوبة (جسر غريتس)؟',
				hintAr: 'تابع النوبات السالبة من الإشارة المتناوبة.',
				revealAr:
					'أحادي النوبة يحذف النوبة السالبة ($u_s = 0$ لنصف الدور)، بينما ثنائي النوبة يقلب النوبة السالبة إلى موجبة فيتضاعف تواتر النبضات ($T\' = T/2 = 10\\text{ ms}$).'
			},
			{
				promptAr: 'ما دور المكثفة الموصولة على التفرع مع المقاومة؟',
				hintAr: 'تُشحن المكثفة عند تزايد التوتر وتُفرغ ببطء عند تناقصه.',
				revealAr:
					'تقوم المكثفة **بترشيح (تمليس)** التوتر المقوم فتقلل التموجات وتجعله شبه مستمر قريب من $U_{\\max}$.'
			}
		]
	},
	summary: {
		rulesAr: [
			'**مراحل تحويل التيار المتناوب $\\text{AC}$ إلى تيار مستمر $\\text{DC}$ (التغذية المستمرة)**:\n1. **الخفض (Transformateur)**: خفض التوتر المتناوب $220\\text{ V}$ إلى قيمة منخفضة مناسبة.\n2. **التقويم (Redressement)**:\n   - أحادي النوبة (صمام واحد): يسمح بمرور النوبة الموجبة فقط ($f_{\\text{مقوم}} = f$).\n   - ثنائي النوبة (جسر غريتس من $4$ صمامات): يحول النوبتين إلى إشارات موجبة ($f_{\\text{مقوم}} = 2f$).\n3. **الترشيح (Filtrage)**: بمكثفة موصولة على التفرع لتقليل التموج ($\\Delta U$).'
		],
		visualSvg: svgRectificationFilteringCurve(),
		visualCaptionAr: 'منحنى التقويم ثنائي النوبة قبل الترشيح (متقطع) وبعد الترشيح بالمكثفة (متصل)',
		examples: [
			{
				problemAr:
					'نطبق توتراً متناوباً تواتره $f = 50\\text{ Hz}$ على مدخل جسر غريتس. ما هو دور وتواتر التوتر المقوم ثنائي النوبة؟',
				solutionAr:
					'دور التوتر المتناوب $T = 1/50 = 20\\text{ ms}$. في التقويم ثنائي النوبة يتكرر الشكل كل نصف دور، أي $T\' = T/2 = 10\\text{ ms}$ و $f\' = 2f = 100\\text{ Hz}$.'
			}
		],
		watchOutAr:
			'في التقويم أحادي النوبة يضيع نصف الطاقة الكهربائية في النوبة السالبة ويكون التموج كبيراً، لذا يُفضل تقنياً جسر غريتس ثنائي النوبة مع مكثفة ذات سعة كافية للترشيح.'
	},
	practice: [
		{
			questionAr:
				'كم صماماً ثنائياً (ديود) يُستعمل في جسر غريتس للتقويم ثنائي النوبة؟',
			options: ['$4$ صمامات ثنائية', 'صمام ثنائي واحد', 'صمامان اثنان فقط', '$6$ صمامات ثنائية'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! يتكون جسر غريتس من 4 صمامات ثنائية تعمل بالتناوب مثنى مثنى.',
				'خطأ تشخيصي: صمام واحد ينجز تقويماً أحادي النوبة فقط.',
				'خطأ تشخيصي: صمامان يتطلبان محولاً بنقطة وسطى وليس جسر غريتس.',
				'خطأ تشخيصي: 6 صمامات تُستعمل في التقويم ثلاثي الأطوار.'
			],
			explanationAr:
				'جسر غريتس القياسي للتقويم ثنائي النوبة يتكون من 4 صمامات ثنائية.'
		},
		{
			questionAr:
				'ما هي الوظيفة الأساسية للمكثفة الموصولة على التفرع عند مخرج جسر التقويم؟',
			options: [
				'ترشيح التوتر المقوم وتقليل تموجه ليقارب التوتر المستمر',
				'رفع توتر الشبكة من $12\\text{ V}$ إلى $220\\text{ V}$',
				'عكس النوبة الموجبة إلى نوبة سالبة',
				'إلغاء التوتر الكهربائي كلياً'
			],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! تشحن المكثفة حتى القيمة العظمى ثم تفرغ ببطء في الحمل لتمليس التوتر.',
				'خطأ تشخيصي: رفع وخفض التوتر من مهام المحول الكهربائي.',
				'خطأ تشخيصي: الصمامات هي التي تقوّم النوبات.',
				'خطأ تشخيصي: المكثفة تحفظ التوتر مرتفعاً قرب القيمة العظمى.'
			],
			explanationAr:
				'تقوم المكثفة بترشيح (تمليس) الإشارة المقومة بتخزين الشحنة وتفريغها تدريجياً لتقليل التموج.'
		},
		{
			questionAr:
				'إذا كان توتر الدخل المتناوب تواتره $f = 50\\text{ Hz}$، فما هو تواتر التموجات الناتجة عن جسر تقويم ثنائي النوبة (بدون مكثفة)؟',
			options: ['$100\\text{ Hz}$', '$50\\text{ Hz}$', '$25\\text{ Hz}$', '$200\\text{ Hz}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! التقويم ثنائي النوبة يقلب النوبة السالبة فيتكرر النبض مرتين في كل دور: $f\' = 2f = 100\\text{ Hz}$.',
				'خطأ تشخيصي: $50\\text{ Hz}$ هو تواتر التقويم أحادي النوبة.',
				'خطأ تشخيصي: قسمت على 2 بدلاً من الضرب في 2.',
				'خطأ تشخيصي: يتضاعف التواتر مرتين فقط وليس 4 مرات.'
			],
			explanationAr:
				'بما أن النوبة السالبة تنقلب إلى موجبة، يصبح الدور الجديد $T\' = T/2$ ومنه $f\' = 2f = 100\\text{ Hz}$.'
		}
	]
};

export const PHYSICS_LESSONS_2AS_TM_T2: PhysicsInteractiveLessonData[] = [
	titrationTm,
	magneticLaplaceTm,
	faradayInductionTm,
	acTransformersTm,
	acDcRectificationTm
];
