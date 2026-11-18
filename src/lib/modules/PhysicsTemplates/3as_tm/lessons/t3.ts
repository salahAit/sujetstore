import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	svgCircuitDiagram,
	svgPhysicsCurvePlot,
	wrapPhysicsSvg
} from '../../svg-physics';
import { SHARED_PHYSICS_LESSONS_3AS_T3 } from '../../secondary_shared_3as/lessons/t3';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom Crisp SVGs for PHY-MTM Exclusive Units (Galvanic Cells + Unit 7)
// ═══════════════════════════════════════════════════════════════════════════════

const eqDaniell = chemEquation(
	[
		{ formula: 'Zn', state: 's' },
		{ formula: 'Cu^2+', state: 'aq' }
	],
	[
		{ formula: 'Zn^2+', state: 'aq' },
		{ formula: 'Cu', state: 's' }
	],
	{ reversible: true }
);

const iceDaniell = buildIceTable({
	equation: eqDaniell,
	speciesHeaders: [
		chemSpecies('Zn'),
		chemSpecies('Cu^2+'),
		chemSpecies('Zn^2+'),
		chemSpecies('Cu')
	],
	initial: [
		{ katex: '$n_0(\\ce{Zn})$', typst: '$n_0("Zn")$' },
		{ katex: '$C_2 V_2$', typst: '$C_2 V_2$' },
		{ katex: '$C_1 V_1$', typst: '$C_1 V_1$' },
		{ katex: '$n_0(\\ce{Cu})$', typst: '$n_0("Cu")$' }
	],
	intermediate: [
		{ katex: '$n_0(\\ce{Zn}) - x$', typst: '$n_0("Zn") - x$' },
		{ katex: '$C_2 V_2 - x$', typst: '$C_2 V_2 - x$' },
		{ katex: '$C_1 V_1 + x$', typst: '$C_1 V_1 + x$' },
		{ katex: '$n_0(\\ce{Cu}) + x$', typst: '$n_0("Cu") + x$' }
	],
	final: [
		{ katex: '$n_0(\\ce{Zn}) - x_f$', typst: '$n_0("Zn") - x_f$' },
		{ katex: '$C_2 V_2 - x_f$', typst: '$C_2 V_2 - x_f$' },
		{ katex: '$C_1 V_1 + x_f$', typst: '$C_1 V_1 + x_f$' },
		{ katex: '$n_0(\\ce{Cu}) + x_f$', typst: '$n_0("Cu") + x_f$' }
	]
});

export const svgGalvanicCellDaniell = wrapPhysicsSvg(
	440,
	225,
	`<rect x="8" y="8" width="424" height="209" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>` +
		`<text x="220" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">العمود الكهربائي (Zn / Zn²⁺ || Cu²⁺ / Cu) والجسر الملحي</text>` +
		`<defs><marker id="eCellArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker>` +
		`<marker id="iCellArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/></marker></defs>` +
		// Left beaker ZnSO4
		`<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="48,100 48,195 162,195 162,100"/>` +
		`<rect x="49" y="130" width="112" height="64" fill="#e2e8f0"/>` +
		`<text x="105" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">Zn²⁺ + SO₄²⁻</text>` +
		// Right beaker CuSO4
		`<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="278,100 278,195 392,195 392,100"/>` +
		`<rect x="279" y="130" width="112" height="64" fill="#bfdbfe"/>` +
		`<text x="335" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">Cu²⁺ + SO₄²⁻</text>` +
		// Zn electrode (-)
		`<rect x="70" y="82" width="14" height="86" fill="#94a3b8" stroke="#334155" stroke-width="1.4"/>` +
		`<text x="77" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">Zn (−) مصعد</text>` +
		// Cu electrode (+)
		`<rect x="356" y="82" width="14" height="86" fill="#d97706" stroke="#78350f" stroke-width="1.4"/>` +
		`<text x="363" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">Cu (+) مهبط</text>` +
		// Salt bridge
		`<path d="M 134,155 L 134,104 L 306,104 L 306,155" fill="none" stroke="#059669" stroke-width="10" stroke-linecap="round" opacity="0.35"/>` +
		`<path d="M 134,155 L 134,104 L 306,104 L 306,155" fill="none" stroke="#047857" stroke-width="1.6"/>` +
		`<text x="220" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#065f46">جسر ملحي (K⁺ + NO₃⁻)</text>` +
		// External circuit with R and Ammeter
		`<polyline fill="none" stroke="#0f172a" stroke-width="1.7" points="77,82 77,46 363,46 363,82"/>` +
		`<rect x="195" y="38" width="50" height="16" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
		`<text x="220" y="50" text-anchor="middle" font-size="10.5" font-weight="bold">R</text>` +
		`<circle cx="136" cy="46" r="11" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
		`<text x="136" y="50" text-anchor="middle" font-size="11" font-weight="bold">A</text>` +
		// Electron flow e- (Zn -> Cu) and Current I (Cu -> Zn)
		`<line x1="160" y1="36" x2="186" y2="36" stroke="#dc2626" stroke-width="1.8" marker-end="url(#eCellArr)"/>` +
		`<text x="173" y="31" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">e⁻</text>` +
		`<line x1="286" y1="58" x2="258" y2="58" stroke="#2563eb" stroke-width="1.8" marker-end="url(#iCellArr)"/>` +
		`<text x="272" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">I</text>`
);

export const svgSpringPendulumHorizontal = wrapPhysicsSvg(
	440,
	210,
	`<rect x="8" y="8" width="424" height="194" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>` +
		`<text x="220" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">النواس المرن الأفقي الحر: x'' + (k/m)x = 0</text>` +
		`<defs><marker id="spArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker>` +
		`<marker id="axSpArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f172a"/></marker></defs>` +
		// Wall & Frictionless table
		`<rect x="34" y="54" width="12" height="80" fill="#475569"/>` +
		`<line x1="34" y1="134" x2="396" y2="134" stroke="#0f172a" stroke-width="2"/>` +
		// Spring coils from x=46 to x=260
		`<polyline fill="none" stroke="#1e3a8a" stroke-width="2" points="46,108 66,108 76,94 92,122 108,94 124,122 140,94 156,122 172,94 188,122 204,94 218,108 246,108"/>` +
		`<text x="145" y="84" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">ثابت المرونة k</text>` +
		// Mass m displaced at x > 0
		`<rect x="246" y="86" width="54" height="47" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>` +
		`<text x="273" y="114" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">m</text>` +
		// Equilibrium marker O at x=210
		`<line x1="210" y1="60" x2="210" y2="162" stroke="#059669" stroke-width="1.4" stroke-dasharray="4,3"/>` +
		`<text x="210" y="176" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">O (x=0)</text>` +
		`<line x1="273" y1="133" x2="273" y2="162" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3,2"/>` +
		`<text x="273" y="176" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">x &gt; 0</text>` +
		// Restoring force T = -kx pointing left
		`<line x1="246" y1="108" x2="196" y2="108" stroke="#dc2626" stroke-width="2.2" marker-end="url(#spArr)"/>` +
		`<text x="220" y="128" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">T = −kx</text>` +
		// x-axis at bottom
		`<line x1="60" y1="158" x2="390" y2="158" stroke="#0f172a" stroke-width="1.5" marker-end="url(#axSpArr)"/>` +
		`<text x="394" y="162" font-size="11" font-weight="bold">x</text>` +
		`<rect x="315" y="48" width="108" height="58" rx="5" fill="#ffffff" stroke="#94a3b8"/>` +
		`<text x="369" y="68" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">T₀ = 2π√(m/k)</text>` +
		`<text x="369" y="88" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#059669">E_m = ½kX_m²</text>`
);

export const svgRlcDampedCurve = svgPhysicsCurvePlot({
	title: 'نظام الاهتزاز شبه الدوري للدارة (R, L, C): u_C(t)',
	xMin: 0,
	xMax: 24,
	yMin: -6,
	yMax: 6,
	xStep: 4,
	yStep: 2,
	xLabel: 't (ms)',
	yLabel: 'u_C (V)',
	curves: [
		{
			fn: (t) => 5 * Math.exp(-0.11 * t) * Math.cos((2 * Math.PI * t) / 4),
			color: '#2563eb',
			label: 'u_C(t) شبه دوري'
		},
		{
			fn: (t) => 5 * Math.exp(-0.11 * t),
			color: '#dc2626',
			dashed: true,
			label: 'الغلاف الأسي'
		},
		{
			fn: (t) => -5 * Math.exp(-0.11 * t),
			color: '#dc2626',
			dashed: true
		}
	],
	dashedGuides: [
		{ x1: 0, y1: 5, x2: 4, y2: 5, color: '#059669', label: 'T ≈ T₀ = 4 ms', labelPos: 'top' },
		{ x1: 4, y1: 0, x2: 4, y2: 3.22, color: '#059669' }
	],
	points: [
		{ x: 0, y: 5, label: 'E = 5 V', color: '#dc2626' },
		{ x: 4, y: 3.22, label: 't = T', color: '#059669' }
	]
});

/**
 * Builds the 5 curriculum-mapped T3 lessons for 3AS TM & 3AS MATH
 * (including Galvanic cells + Unit 7 Mechanical & RLC Oscillations).
 */
export function buildMtmPhysicsLessonsT3(
	targetGrade: '3as_tm' | '3as_math'
): PhysicsInteractiveLessonData[] {
	const trackTag = targetGrade.replace('_', '-');
	const isMathStream = targetGrade === '3as_math';

	// 1. Merged Nuclear Lesson
	const nuc1 = adaptPhysicsLessonForTrack(
		SHARED_PHYSICS_LESSONS_3AS_T3[0],
		targetGrade,
		't3_nuclear_radioactivity_energy'
	);
	const nuc2 = adaptPhysicsLessonForTrack(SHARED_PHYSICS_LESSONS_3AS_T3[1], targetGrade);
	const nuclearMerged: PhysicsInteractiveLessonData = {
		...nuc1,
		slug: `phy-${trackTag}-t3-nuclear-radioactivity-energy`,
		sequenceId: 'seq6',
		sequenceTitleAr: 'الوحدتان 5 و 6: التحولات النووية ومراقبة تطور جملة كيميائية (الأعمدة والأسترة)',
		order: 1,
		titleAr: 'التحولات النووية: النشاط الإشعاعي، التناقص، طاقة الربط والانشطار والاندماج',
		objectives: [
			'تطبيق قانوني صودي، قانون التناقص الإشعاعي $N(t) = N_0 e^{-\\lambda t}$، والتأريخ بالكربون 14',
			'حساب طاقة الربط $E_\\ell$ والطاقة المحررة $E_{\\text{lib}}$ في تفاعلات الانشطار والاندماج النووي'
		],
		keywordsAr: ['التحولات النووية', 'التناقص الإشعاعي', 'طاقة الربط', 'الانشطار والاندماج'],
		discover: {
			...nuc1.discover,
			steps: [...nuc1.discover.steps.slice(0, 2), ...nuc2.discover.steps.slice(0, 2)]
		},
		summary: {
			rulesAr: [...nuc1.summary.rulesAr, ...nuc2.summary.rulesAr],
			visualSvg: nuc2.summary.visualSvg,
			visualCaptionAr: nuc2.summary.visualCaptionAr,
			examples: [...nuc1.summary.examples, ...nuc2.summary.examples],
			watchOutAr: `${nuc1.summary.watchOutAr ?? ''} ${nuc2.summary.watchOutAr ?? ''}`.trim()
		},
		practice: [...nuc1.practice.slice(0, 2), ...nuc2.practice.slice(0, 2)]
	};

	// 2. Galvanic Cells + Esterification Lesson (Unit 6 PHY-MTM)
	const estShared = adaptPhysicsLessonForTrack(SHARED_PHYSICS_LESSONS_3AS_T3[2], targetGrade);
	const cellsAndEsterLesson: PhysicsInteractiveLessonData = {
		id: `phy_lesson_${targetGrade}_t3_cells_esterification_monitoring`,
		slug: `phy-${trackTag}-t3-cells-esterification-monitoring`,
		grade: targetGrade,
		yearSubjectId: nuc1.yearSubjectId,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'الوحدتان 5 و 6: التحولات النووية ومراقبة تطور جملة كيميائية (الأعمدة والأسترة)',
		order: 2,
		titleAr: 'التطور التلقائي، الأعمدة الكهربائية، وتفاعلات الأسترة وإماهة الأستر',
		objectives: [
			'توقع جهة التطور التلقائي، ودراسة العمود الكهربائي (الأقطاب، الجسر الملحي، القوة المحركة الكهربائية، كمية الكهرباء $Q = I\\cdot\\Delta t$)',
			'كتابة معادلة الأسترة وإماهة الأستر ومراقبة السرعة والمردود (كلور الأسيل، التصبن)'
		],
		keywordsAr: ['الأعمدة الكهربائية', 'التطور التلقائي', 'الأسترة', 'التصبن', 'كلور الأسيل'],
		discover: {
			scenarioAr:
				`ننجز عمود دانيال المكون من نصف عمود الزنك ($\\ce{Zn(s)} / \\ce{Zn^2+(aq)}$) ونصف عمود النحاس ($\\ce{Cu(s)} / \\ce{Cu^2+(aq)}$) موصولين بجسر ملحي من نترات البوتاسيوم $(\\ce{K+ + NO3-})$. ننمذج التحول بالمعادلة: ${eqDaniell.katex} (ثابت التوازن $K = 10^{37}$ عند $25^\\circ\\text{C}$). عند غلق الدارة على مقاومة، يسري تيار شدته الثابتة $I = 0.20\\text{ A}$ لمدة $\\Delta t = 1930\\text{ s}$. ($F = 96\\,500\\text{ C/mol}$، $M(\\ce{Cu}) = 63.5\\text{ g/mol}$).`,
			svg: svgGalvanicCellDaniell,
			steps: [
				{
					promptAr:
						'إذا كانت التراكيز الابتدائية $[\\ce{Zn^2+}]_0 = [\\ce{Cu^2+}]_0 = 0.1\\text{ mol/L}$، احسب $Q_{r,i}$ وقارنه بـ $K$ لتحديد جهة التطور التلقائي وقطبية العمود (المصعد $-$ والمهبط $+$).',
					hintAr: '$Q_{r,i} = \\frac{[\\ce{Zn^2+}]_0}{[\\ce{Cu^2+}]_0}$ (الأجسام الصلبة لا تدخل في $Q_r$).',
					expectedInput: '1',
					revealAr:
						'$Q_{r,i} = \\frac{0.1}{0.1} = 1 \\ll K = 10^{37}$. يتطور العمود في الجهة المباشرة: يتأكسد الزنك عند **المصعد (القطب السالب $-$)** $\\ce{Zn -> Zn^2+ + 2e-}$، وتُرجع شوارد $\\ce{Cu^2+}$ عند **المهبط (القطب الموجب $+$)** $\\ce{Cu^2+ + 2e- -> Cu}$.'
				},
				{
					promptAr:
						'ما دور الجسر الملحي في هذا العمود الكهربائي، وما الرمز الاصطلاحي للعمود؟',
					hintAr: 'يغلق الدارة داخلياً بهجرة الشوارد مع الحفاظ على التعادل الكهربائي.',
					expectedInput: 'التعادل الكهربائي',
					revealAr:
						'يؤمّن الجسر الملحي غلق الدارة داخلياً والحفاظ على **التعادل الكهربائي** في نصفي العمود (تنتقل الكاتيونات $\\ce{K+}$ نحو المهبط والأنيونات $\\ce{NO3-}$ نحو المصعد). الرمز الاصطلاحي: $\\ominus\\,\\ce{Zn(s) | Zn^2+(aq) || Cu^2+(aq) | Cu(s)}\\,\\oplus$.'
				},
				{
					promptAr:
						'احسب كمية الكهرباء المنتجة $Q = I\\Delta t$ بالكولوم، ثم استنتج كتلة النحاس المترسبة على المهبط $\\Delta m(\\ce{Cu})$ بالغرام.',
					hintAr: '$Q = n(e^-) F = 2 x F$ ومنه $n(\\ce{Cu}) = x = \\frac{Q}{2 F}$.',
					expectedInput: '0.127',
					revealAr:
						'$Q = 0.20 \\times 1930 = 386\\text{ C}$. عدد مولات الإلكترونات $n(e^-) = \\frac{386}{96500} = 4\\times 10^{-3}\\text{ mol}$، ومنه $x = 2\\times 10^{-3}\\text{ mol}$ و $\\Delta m(\\ce{Cu}) = 2\\times 10^{-3} \\times 63.5 = 0.127\\text{ g}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**العمود الكهربائي (خاص بـ TM و MATH)**: جملة كيميائية في حالة غير توازن ($Q_{r,i} \\neq K$) تتطور تلقائياً منتجةً تياراً كهربائياً. القطب السالب ($-$) هو **المصعد** (أكسدة)، والقطب الموجب ($+$) هو **المهبط** (إرجاع).',
				'**جدول تقدم عمود دانيال**:\n\n' + iceDaniell.markdownTable,
				'**كمية الكهرباء والحصيلة المادية**: $Q = I\\cdot\\Delta t = n(e^-)\\cdot F$ حيث $F = N_A \\cdot e \\approx 96\\,500\\text{ C/mol}$ (ثابت فاراداي). عندما يُستهلك العمود تماماً يبلغ التقدم $x_f = x_{\\max}$ (إذ $K \\gg 10^4$) وتكون السعة العظمى $Q_{\\max} = n_{\\max}(e^-) F$.',
				...estShared.summary.rulesAr
			],
			visualSvg: svgGalvanicCellDaniell,
			visualCaptionAr: 'بنية العمود الكهربائي دانيال وحركة الإلكترونات والشوارد عبر الجسر الملحي',
			examples: [
				{
					problemAr:
						'عمود $\\ominus\\,\\ce{Fe(s) | Fe^2+(aq) || Ag+(aq) | Ag(s)}\\,\\oplus$ يغذي دارة بتيار $I = 0.10\\text{ A}$ لمدة $965\\text{ s}$. احسب الزيادة في كتلة مسرى الفضة ($M(\\ce{Ag}) = 108\\text{ g/mol}$).',
					solutionAr:
						'$Q = 0.10 \\times 965 = 96.5\\text{ C} \\implies n(e^-) = \\frac{96.5}{96500} = 10^{-3}\\text{ mol}$. حسب نصف المعادلة $\\ce{Ag+ + e- -> Ag}$: $n(\\ce{Ag}) = n(e^-) = 10^{-3}\\text{ mol} \\implies \\Delta m(\\ce{Ag}) = 0.108\\text{ g}$.'
				},
				...estShared.summary.examples
			],
			watchOutAr:
				'في العمود الكهربائي تتحرك الإلكترونات في السلك الخارجي من القطب السالب (المصعد) إلى القطب الموجب (المهبط)، بينما يتحرك التيار الاصطلاحي $I$ من $+$ إلى $-$، وتهاجر الشوارد الموجبة داخل الجسر الملحي نحو المهبط ($+$)!'
		},
		practice: [
			{
				questionAr: 'في عمود كهربائي، التفاعل الذي يحدث على مستوى القطب السالب (المصعد) هو دوماً:',
				options: ['أكسدة (فقدان إلكترونات)', 'إرجاع (اكتساب إلكترونات)', 'تبادل بروتونات', 'أسترة'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الإرجاع يحدث عند القطب الموجب (المهبط).',
					'الأعمدة تعتمد على تفاعلات أكسدة-إرجاع وليس حمض-أساس.',
					'الأسترة تفاعل عضوي لا ينتج تياراً.'
				],
				explanationAr:
					'المصعد (القطب السالب في العمود) هو مقر الأكسدة حيث تتراكم الإلكترونات وتغادر نحو الدارة الخارجية.'
			},
			{
				questionAr:
					'عمود نحاس-فضة يغذي مقاومة بتيار ثابت $I = 0.5\\text{ A}$ لمدة $1930\\text{ s}$. كمية مادة الإلكترونات المتبادلة هي ($F = 96500\\text{ C/mol}$):',
				options: ['0.01 mol', '0.02 mol', '0.005 mol', '0.1 mol'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تحقق من القسمة $Q/F = 965 / 96500$.',
					'قسمت على $2$ دون مبرر؛ $n(e^-) = Q/F$.',
					'أخطأت في الفاصلة العشرية.'
				],
				explanationAr:
					'$Q = 0.5 \\times 1930 = 965\\text{ C} \\implies n(e^-) = \\frac{965}{96500} = 0.01\\text{ mol}$.'
			},
			...estShared.practice.slice(0, 2)
		]
	};

	// 3. Unit 7 Exclusive: Mechanical Oscillations (Spring, Compound, Simple Pendulums)
	const mechOscLesson: PhysicsInteractiveLessonData = {
		id: `phy_lesson_${targetGrade}_t3_mechanical_oscillations_pendulums`,
		slug: `phy-${trackTag}-t3-mechanical-oscillations-pendulums`,
		grade: targetGrade,
		yearSubjectId: nuc1.yearSubjectId,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'الوحدة 7: التطورات المهتزة (الاهتزازات الميكانيكية والكهربائية RLC) — خاص بـ TM و MATH',
		order: 3,
		titleAr: 'الاهتزازات الميكانيكية الحرة والمغذاة (النواس المرن، الثقلي، والبسيط)',
		objectives: [
			'إعداد وحل المعادلة التفاضلية للنواس المرن الأفقي $x\'\' + \\frac{k}{m}x = 0$ واستنتاج عبارة الدور الخاص $T_0 = 2\\pi\\sqrt{\\frac{m}{k}}$',
			'دراسة النواس الثقلي والنواس البسيط، تمييز الدور وشبه الدور والتخامد وتغذية الاهتزازات بتعويض التخامد'
		],
		keywordsAr: ['النواس المرن', 'النواس الثقلي', 'النواس البسيط', 'الدور الخاص', 'شبه الدور', 'التخامد'],
		discover: {
			scenarioAr:
				'نثبت جسماً صلباً كتلته $m = 200\\text{ g}$ بطرف نابض مرن أفقي حلقاته غير متلاصقة ثابت مرونته $k = 20\\text{ N/m}$ على طاولة هوائية (دون احتكاك). نزيح الجسم عن موضع توازنه $O$ بمقدار $X_m = 4\\text{ cm}$ في الاتجاه الموجب ونتركه بدون سرعة ابتدائية عند $t = 0$.',
			svg: svgSpringPendulumHorizontal,
			steps: [
				{
					promptAr:
						'بتطبيق القانون الثاني لنيوتن على محور أفقي $(Ox)$ موجه، اكتب المعادلة التفاضلية لحركة الجسم.',
					hintAr: 'تؤثر على الجسم قوى $\\vec{P}$ و $\\vec{R}_N$ (عموديتان على $Ox$) وقوة الارجاع $\\vec{T} = -k x \\vec{i}$.',
					expectedInput: "x'' + (k/m)x = 0",
					revealAr:
						'$-k x = m \\frac{d^2 x}{dt^2} \\implies \\ddot{x} + \\frac{k}{m} x = 0$ (أي $\\ddot{x} + \\omega_0^2 x = 0$ حيث $\\omega_0 = \\sqrt{\\frac{k}{m}}$).'
				},
				{
					promptAr:
						'احسب النبض الخاص $\\omega_0$ والدور الخاص $T_0$ للنواس المرن (بوحدة $\\text{rad/s}$ و $\\text{s}$، مع $\\pi \\approx 3.14$).',
					hintAr: '$\\omega_0 = \\sqrt{\\frac{20}{0.2}}$ و $T_0 = \\frac{2\\pi}{\\omega_0}$.',
					expectedInput: '10',
					revealAr:
						'$\\omega_0 = \\sqrt{\\frac{20}{0.2}} = \\sqrt{100} = 10\\text{ rad/s}$، والدور الخاص $T_0 = \\frac{2\\pi}{10} \\approx 0.628\\text{ s}$.'
				},
				{
					promptAr:
						'حدّد السعة $X_m$ والطور الابتدائي $\\varphi$ في الحل $x(t) = X_m \\cos(\\omega_0 t + \\varphi)$، ثم احسب الطاقة الميكانيكية الكلية $E_m$ بوحدة $\\text{mJ}$.',
					hintAr: 'عند $t=0$: $x(0) = X_m$ و $v(0) = 0$؛ $E_m = \\frac{1}{2} k X_m^2$.',
					expectedInput: '16',
					revealAr:
						'من الشروط الابتدائية $\\cos\\varphi = 1 \\implies \\varphi = 0$، إذن $x(t) = 0.04\\cos(10 t)\\text{ (m)}$. والطاقة الميكانيكية المحفوظة $E_m = \\frac{1}{2} \\times 20 \\times (0.04)^2 = 0.016\\text{ J} = 16\\text{ mJ}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**النواس المرن الأفقي الحر غير المتخامد**: $\\ddot{x} + \\omega_0^2 x = 0$ مع $\\omega_0 = \\sqrt{\\frac{k}{m}}$ و $T_0 = 2\\pi\\sqrt{\\frac{m}{k}}$ (الدور الخاص مستقل عن السعة $X_m$ — تساوي الأدوار).',
				'**الحل الجيبي والطاقة الميكانيكية**: $x(t) = X_m\\cos(\\omega_0 t + \\varphi)$، والسرعة $v(t) = -\\omega_0 X_m\\sin(\\omega_0 t + \\varphi)$. الطاقة الميكانيكية ثابتة: $E_m = \\frac{1}{2}m v^2 + \\frac{1}{2}k x^2 = \\frac{1}{2}k X_m^2 = \\frac{1}{2}m v_{\\max}^2$.' +
					(isMathStream
						? ' (تحليلياً: $\\frac{dE_m}{dt} = m\\dot{x}\\ddot{x} + k x\\dot{x} = \\dot{x}(m\\ddot{x} + kx) = 0$).'
						: ''),
				'**النواس الثقلي والنواس البسيط (في السعات الصغيرة $\\theta_m < 10^\\circ$)**: المعادلة $\\ddot{\\theta} + \\frac{m g d}{J_\\Delta}\\theta = 0 \\implies T_0 = 2\\pi\\sqrt{\\frac{J_\\Delta}{m g d}}$. وللنواس البسيط ($J_\\Delta = m\\ell^2, d = \\ell$): $T_0 = 2\\pi\\sqrt{\\frac{\\ell}{g}}$.',
				'**التخامد والتغذية**: عند وجود احتكاك مائع $f = -\\lambda v$ تصبح المعادلة $\\ddot{x} + \\frac{\\lambda}{m}\\dot{x} + \\frac{k}{m}x = 0$ وتتناقص السعة أسياً؛ وتُغذى الاهتزازات بتعويض الطاقة الضائعة بمغذي ميكانيكي.'
			],
			visualSvg: svgSpringPendulumHorizontal,
			visualCaptionAr: 'تمثيل النواس المرن الأفقي وقوة الإرجاع $\\vec{T} = -kx\\vec{i}$',
			examples: [
				{
					problemAr:
						'نواس بسيط طوله $\\ell = 1.0\\text{ m}$ في مكان حيث $g = 9.81\\text{ m/s}^2$. احسب دوره الخاص $T_0$ للسعات الصغيرة.',
					solutionAr:
						'$T_0 = 2\\pi\\sqrt{\\frac{\\ell}{g}} = 2\\pi\\sqrt{\\frac{1.0}{9.81}} \\approx 2.01\\text{ s}$ (يسمى نواساً ثوانياً لأن نصف دوره ثانية واحدة).'
				}
			],
			watchOutAr:
				'في النواس المرن الشاقولي، يتغير موضع التوازن السكوني بمقدار استطالة $x_0 = \\frac{mg}{k}$، لكن المعادلة التفاضلية بدلالة الاستطالة عن موضع التوازن تبقى متطابقة $\\ddot{x} + \\frac{k}{m}x = 0$ بنفس الدور الخاص $T_0 = 2\\pi\\sqrt{\\frac{m}{k}}$!'
		},
		practice: [
			{
				questionAr:
					'إذا ضاعفنا كتلة الجسم المعلق بنواس مرن $4$ مرات مع إبقاء ثابت المرونة $k$ ثابتاً، فإن الدور الخاص $T_0$:',
				options: ['يتضاعف مرتين', 'يتضاعف 4 مرات', 'ينقص إلى النصف', 'يبقى ثابتاً'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$T_0$ يتناسب مع $\\sqrt{m}$ وليس $m$.',
					'زيادة الكتلة تزيد القصور الذاتي فيكبر الدور.',
					'يتعلق $T_0$ بالكتلة $m$ وثابت المرونة $k$.'
				],
				explanationAr:
					'$T_0\' = 2\\pi\\sqrt{\\frac{4m}{k}} = 2 \\times 2\\pi\\sqrt{\\frac{m}{k}} = 2 T_0$.'
			},
			{
				questionAr: 'عند مرور النواس المرن الأفقي الحر غير المتخامد بموضع التوازن ($x = 0$)، تكون:',
				options: [
					'الطاقة الحركية أعظمية والطاقة الكامنة المرونية معدومة',
					'الطاقة الكامنة المرونية أعظمية والطاقة الحركية معدومة',
					'الطاقتان الحركية والمرونية متساويتان',
					'الطاقة الميكانيكية معدومة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'هذا يحدث عند السعة القصوى $x = \\pm X_m$.',
					'يتساوى مقدارهما عند $x = \\pm X_m/\\sqrt{2}$.',
					'الطاقة الميكانيكية محفوظة وثابتة غير معدومة.'
				],
				explanationAr:
					'عند $x=0$ يكون $E_{pe} = \\frac{1}{2}k(0)^2 = 0$ فتتحول كل الطاقة الميكانيكية إلى طاقة حركية $E_c = \\frac{1}{2}mv_{\\max}^2$.'
			},
			{
				questionAr: 'في النواس البسيط عند السعات الصغيرة، يتعلق الدور الخاص $T_0 = 2\\pi\\sqrt{\\frac{\\ell}{g}}$ بـ:',
				options: [
					'طول الخيط $\\ell$ وتسارع الجاذبية $g$ فقط',
					'كتلة الكرية $m$ فقط',
					'السعة الزاوية $\\theta_m$',
					'كتلة الكرية وطول الخيط معاً'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تختزل الكتلة $m$ من معادلة النواس البسيط.',
					'الدور الخاص مستقل عن السعة الصغيرة.',
					'الكتلة لا تدخل في $T_0 = 2\\pi\\sqrt{\\ell/g}$.'
				],
				explanationAr:
					'من القانون الثاني للتحريك الدوراني تختزل الكتلة $m$ فيبقى $T_0 = 2\\pi\\sqrt{\\frac{\\ell}{g}}$.'
			},
			{
				questionAr:
					'نواس مرن أفقي ($k = 40\\text{ N/m}$) طاقته الميكانيكية الكلية $E_m = 20\\text{ mJ}$. سعة الاهتزاز $X_m$ تساوي:',
				options: ['3.16 cm', '1.0 cm', '10 cm', '2.0 cm'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'نسيت أخذ الجذر التربيعي لـ $X_m^2 = 10^{-3}\\text{ m}^2$.',
					'تحقق من التحويل من $\\text{mJ}$ إلى $\\text{J}$ ($20\\text{ mJ} = 0.02\\text{ J}$).',
					'راجع $X_m = \\sqrt{2 E_m / k}$.'
				],
				explanationAr:
					'$X_m = \\sqrt{\\frac{2 E_m}{k}} = \\sqrt{\\frac{2 \\times 0.02}{40}} = \\sqrt{0.001} \\approx 0.0316\\text{ m} = 3.16\\text{ cm}$.'
			}
		]
	};

	// 4. Unit 7 Exclusive: Electrical RLC Oscillations + Mechanical-Electrical Analogy
	const rlcOscLesson: PhysicsInteractiveLessonData = {
		id: `phy_lesson_${targetGrade}_t3_rlc_electrical_oscillations`,
		slug: `phy-${trackTag}-t3-rlc-electrical-oscillations`,
		grade: targetGrade,
		yearSubjectId: nuc1.yearSubjectId,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'الوحدة 7: التطورات المهتزة (الاهتزازات الميكانيكية والكهربائية RLC) — خاص بـ TM و MATH',
		order: 4,
		titleAr: 'الاهتزازات الكهربائية (الدارة RLC الحرة، المغذاة، القسرية) والتطابق ميكانيك-كهرباء',
		objectives: [
			'كتابة المعادلة التفاضلية لتفريغ مكثفة في وشيعة $(R, L, C)$ وتمييز الأنظمة الثلاثة (الدوري، شبه الدوري، اللادوري) وحلها في حالة إهمال التخامد $T_0 = 2\\pi\\sqrt{LC}$',
			'دراسة تغذية الاهتزازات الكهربائية والاهتزازات القسرية وحالة التجاوب وعامل الجودة $Q$، وتوظيف التطابق ميكانيك-كهرباء'
		],
		keywordsAr: ['الدارة RLC', 'الأنظمة المهتزة', 'التجاوب الكهربائي', 'عامل الجودة', 'التطابق ميكانيك-كهرباء'],
		discover: {
			scenarioAr:
				'نشحن مكثفة سعتها $C = 4\\text{ }\\mu\\text{F}$ تحت توتر $E = 5\\text{ V}$ (البادلة في الوضع 1)، ثم نؤرجح البادلة عند $t = 0$ إلى الوضع 2 لتفريغها في وشيعة $(L = 0.10\\text{ H}, r = 10\\text{ }\\Omega)$ موصولة مع مقاومة خارجية $R$. يظهر راسم الاهتزاز المنحنى المرفق لتطور $u_C(t)$.',
			svg: svgCircuitDiagram({ kind: 'rlc', labels: { e: 'E = 5 V', c: 'C = 4 μF', r: 'R', l: '(L, r)', switchLabel: 'K' } }),
			steps: [
				{
					promptAr:
						'بتطبيق قانون جمع التوترات في حلقة التفريغ (الوضع 2)، اكتب المعادلة التفاضلية التي يحققها التوتر $u_C(t)$ بدلالة $R_t = R + r$ و $L$ و $C$.',
					hintAr: '$u_R + u_b + u_C = 0$ مع $i = C \\frac{du_C}{dt}$ و $u_b = L \\frac{di}{dt} + r i$.',
					expectedInput: 'd2u_C/dt2 + (R_t/L)du_C/dt + u_C/(LC) = 0',
					revealAr:
						'$L C \\frac{d^2 u_C}{dt^2} + R_t C \\frac{du_C}{dt} + u_C = 0 \\implies \\frac{d^2 u_C}{dt^2} + \\frac{R_t}{L}\\frac{du_C}{dt} + \\frac{1}{LC}u_C = 0$ (وبالمثل للشحنة $q$: $\\ddot{q} + \\frac{R_t}{L}\\dot{q} + \\frac{1}{LC}q = 0$).'
				},
				{
					promptAr:
						'احسب الدور الخاص $T_0 = 2\\pi\\sqrt{LC}$ (بالميليثانية $\\text{ms}$، $\\pi \\approx 3.16$ أو $\\pi^2 \\approx 10$) وقارنه مع شبه الدور في المنحنى المتخامد.',
					hintAr: '$T_0 = 2\\pi\\sqrt{0.10 \\times 4\\times 10^{-6}}$.',
					expectedInput: '4',
					revealAr:
						'$T_0 = 2\\pi\\sqrt{4\\times 10^{-7}} = 4\\pi\\times 10^{-3.5} \\approx 3.97\\text{ ms} \\approx 4\\text{ ms}$. في التخامد الضعيف يكون شبه الدور $T \\approx T_0$.'
				},
				{
					promptAr:
						'كيف تتناقص الطاقة الكلية $E_t = \\frac{1}{2}C u_C^2 + \\frac{1}{2}L i^2$ في الدارة $RLC$ الحقيقية، وكيف تُحفظ في نظام مغذى؟',
					hintAr: 'احسب $\\frac{dE_t}{dt}$ باستخدام المعادلة التفاضلية.',
					expectedInput: '-R_t i^2',
					revealAr:
						'$\\frac{dE_t}{dt} = -R_t i^2 \\le 0$: تتبدد الطاقة تدريجياً بفعل جول في المقاومة الكلية $R_t$. لتغذية الدارة نوصل مضخماً عملياً يتصرف كمقاومة سالبة $-R_0 = -R_t$ لتعويض الطاقة الضائعة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الأنظمة الثلاثة في الدارة $(R, L, C)$ الحرة**: (1) **دوري** ($R_t = 0$): $u_C(t) = E\\cos(\\omega_0 t)$ بدور خاص $T_0 = 2\\pi\\sqrt{LC}$؛ (2) **شبه دوري** ($R_t$ صغيرة): تناقص أسي للسعة بشبه دور $T \\approx T_0$؛ (3) **لادوري** ($R_t > 2\\sqrt{L/C}$): عودة إلى الصفر دون تذبذب (حرج عند $R_c = 2\\sqrt{L/C}$).',
				'**التغذية والاهتزازات القسرية والتجاوب**: تُغذى الدارة بمضخم عملياتي يولد توتراً متناسباً مع التيار $u_g = R_0 i$ حيث $R_0 = R_t$. في النظام القسري الجيبي بتردد $f$، يحدث **التجاوب الكهربائي** لشدة التيار عندما $f = f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$ ($I_{\\max} = \\frac{U}{R_t}$)، ويُعرّف الشريط النافذ بـ $\\Delta f = f_2 - f_1 = \\frac{R_t}{2\\pi L}$ وعامل الجودة بـ $Q = \\frac{f_0}{\\Delta f} = \\frac{1}{R_t}\\sqrt{\\frac{L}{C}}$.',
				'**التطابق ميكانيك — كهرباء (النواس المرن $\\leftrightarrow$ الدارة RLC)**:\n\n' +
					'| المقدار الميكانيكي | المقدار الكهربائي الموافق |\n| :--- | :--- |\n| الفاصلة $x$ | الشحنة $q$ |\n| السرعة $v = \\dot{x}$ | شدة التيار $i = \\dot{q}$ |\n| الكتلة $m$ | الذاتية $L$ |\n| ثابت المرونة $k$ | مقلوب السعة $\\frac{1}{C}$ |\n| معامل الاحتكاك $\\lambda$ | المقاومة الكلية $R_t$ |\n| الطاقة الحركية $\\frac{1}{2}mv^2$ | الطاقة المغناطيسية $\\frac{1}{2}Li^2$ |\n| الطاقة المرونية $\\frac{1}{2}kx^2$ | الطاقة الكهربائية $\\frac{1}{2}\\frac{q^2}{C}$ |'
			],
			visualSvg: svgRlcDampedCurve,
			visualCaptionAr: 'الاهتزاز شبه الدوري للتوتر $u_C(t)$ وتناقص السعة تحت الغلاف الأسي',
			examples: [
				{
					problemAr:
						'دارة $RLC$ مثالية ($R_t = 0$) سعتها $C = 10\\text{ }\\mu\\text{F}$ وذاتيتها $L = 0.1\\text{ H}$، شُحنت المكثفة تحت $E = 12\\text{ V}$. احسب شدة التيار العظمى $I_m$ في الدارة.',
					solutionAr:
						'بانحفاظ الطاقة الكلية: $\\frac{1}{2} L I_m^2 = \\frac{1}{2} C E^2 \\implies I_m = E\\sqrt{\\frac{C}{L}} = 12\\sqrt{\\frac{10^{-5}}{0.1}} = 12 \\times 10^{-2} = 0.12\\text{ A}$.'
				}
			],
			watchOutAr:
				'في الدارة $RLC$ المغذاة أو المثالية، تبلغ الطاقة الكهربائية في المكثفة قيمتها العظمى عندما ينعدم التيار ($i = 0$)، وتبلغ الطاقة المغناطيسية في الوشيعة قيمتها العظمى عندما ينعدم التوتر $u_C = 0$!'
		},
		practice: [
			{
				questionAr: 'في التطابق ميكانيك-كهرباء بين النواس المرن والدارة $(R,L,C)$، يوافق ثابت المرونة $k$ المقدار:',
				options: ['$\\frac{1}{C}$ (مقلوب السعة)', '$C$ (السعة)', '$L$ (الذاتية)', '$R_t$ (المقاومة)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'انتبه إلى شكل المعادلتين: $\\ddot{x} + \\frac{k}{m}x = 0$ و $\\ddot{q} + \\frac{1}{LC}q = 0$.',
					'$L$ توافق الكتلة $m$.',
					'$R_t$ توافق معامل الاحتكاك $\\lambda$.'
				],
				explanationAr:
					'من مطابقة $\\frac{k}{m} \\leftrightarrow \\frac{1}{LC}$ مع $m \\leftrightarrow L$ نجد $k \\leftrightarrow \\frac{1}{C}$.'
			},
			{
				questionAr:
					'عند زيادة المقاومة الكلية $R_t$ في دارة $(R, L, C)$ حرة متخامدة حتى تتجاوز $R_c = 2\\sqrt{L/C}$، يصبح نظام التفريغ:',
				options: ['لادورياً (دون تذبذبات)', 'شبه دوري', 'دورياً غير متخامد', 'قسرِيّاً متجاوباً'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'النظام شبه الدوري يحدث من أجل مقاومات صغيرة $R_t < 2\\sqrt{L/C}$.',
					'النظام الدوري يتحقق فقط عند $R_t = 0$.',
					'النظام القسري يتطلب مولداً متناوباً خارجياً.'
				],
				explanationAr:
					'كلما كبرت $R_t$ اشتد التخامد حتى يختفي التذبذب تماماً ويدخل النظام في الطور اللادوري (أو الحرج عند المساواة).'
			},
			{
				questionAr:
					'تردد التجاوب لدارة $RLC$ قسرية ذاتيتها $L = 0.25\\text{ H}$ وسعتها $C = 10\\text{ }\\mu\\text{F}$ يساوي تقريباً ($\\pi \\approx 3.14$):',
				options: ['100.7 Hz', '50.3 Hz', '318 Hz', '632 Hz'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'نسيت الضرب أو أخطأت في الجذر $\\sqrt{2.5\\times 10^{-6}}$.',
					'تلك قيمة $\\omega_0 / 2$ تقريباً.',
					'تلك قيمة النبض $\\omega_0 = 2\\pi f_0$.'
				],
				explanationAr:
					'$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{0.25 \\times 10^{-5}}} \\approx 100.7\\text{ Hz}$.'
			},
			{
				questionAr:
					'في دارة $(L, C)$ مثالية، إذا كانت الطاقة الكلية $E_t = 2.0\\text{ mJ}$ وعند لحظة معينة تكون $u_C = \\frac{E}{2}$، فإن الطاقة المغناطيسية في الوشيعة تساوي:',
				options: ['1.5 mJ', '0.5 mJ', '1.0 mJ', '2.0 mJ'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$0.5\\text{ mJ}$ هي الطاقة الكهربائية $E_C = \\frac{1}{4}E_t$ في المكثفة وليس المغناطيسية.',
					'الطاقة تتناسب مع $u_C^2$ وليس $u_C$.',
					'تكون $E_L = 2.0\\text{ mJ}$ عندما $u_C = 0$.'
				],
				explanationAr:
					'عند $u_C = E/2$ تكون $E_C = \\frac{1}{4} E_t = 0.5\\text{ mJ}$، وبانحفاظ الطاقة $E_L = E_t - E_C = 1.5\\text{ mJ}$.'
			}
		]
	};

	// 5. Integration Lesson (ONEC 4+4+6+6 format for 3AS TM / MATH)
	const integShared = adaptPhysicsLessonForTrack(SHARED_PHYSICS_LESSONS_3AS_T3[3], targetGrade);
	const mtmIntegration: PhysicsInteractiveLessonData = {
		...integShared,
		slug: `phy-${trackTag}-t3-integration`,
		sequenceId: 'seq8',
		sequenceTitleAr: `إدماج وحصيلة التحضير للبكالوريا (${targetGrade === '3as_tm' ? '3AS TM' : '3AS MATH'})`,
		order: 5,
		titleAr:
			targetGrade === '3as_tm'
				? 'إدماج وحصيلة والتحضير الشامل لبكالوريا شعبة تقني رياضي (3AS TM)'
				: 'إدماج وحصيلة والتحضير الشامل لبكالوريا شعبة رياضيات (3AS MATH)',
		objectives: [
			'حل مواضيع بكالوريا كاملة ($4\\text{ سا و }30\\text{ د}$) بالهيكلة الرسمية لـ ONEC: الجزء الأول ($14\\text{ نقطة} = 4 + 4 + 6$) والجزء الثاني ($6\\text{ نقاط}$ تمرين تجريبي)',
			'دمج الوحدات 1–7 بما فيها الاهتزازات الميكانيكية والكهربائية $RLC$ والأعمدة الكهربائية مع الالتزام الصارم بسلم التنقيط والوحدات الدولية'
		],
		keywordsAr: [
			targetGrade === '3as_tm' ? 'بكالوريا تقني رياضي' : 'بكالوريا رياضيات',
			'هيكلة ONEC 4+4+6+6',
			'الاهتزازات RLC',
			'التمرين التجريبي'
		],
		summary: {
			...integShared.summary,
			rulesAr: [
				`**الهيكلة الرسمية لبكالوريا ${targetGrade === '3as_tm' ? 'تقني رياضي (معامل 5)' : 'رياضيات (معامل 6)'}**: المدة $4\\text{ سا و }30\\text{ د}$، موضوعان اختياريان؛ الجزء الأول ($14$ نقطة: ثلاثة تمارين مستقلة $4 + 4 + 6$ نقاط)، والجزء الثاني ($6$ نقاط: التمرين التجريبي).`,
				...integShared.summary.rulesAr
			]
		}
	};

	return [nuclearMerged, cellsAndEsterLesson, mechOscLesson, rlcOscLesson, mtmIntegration];
}

/**
 * 3AS TM (Technique Mathématique — تقني رياضي) Interactive Lessons — Trimester 3
 * Grade: '3as_tm' | YearSubjectId: 726 | Stream: TM | Coefficient: 5
 */
export const PHYSICS_LESSONS_3AS_TM_T3: PhysicsInteractiveLessonData[] =
	buildMtmPhysicsLessonsT3('3as_tm');
