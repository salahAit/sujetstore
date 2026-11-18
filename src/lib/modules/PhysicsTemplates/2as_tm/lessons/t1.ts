import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';
import { wrapPhysicsSvg } from '../../svg-physics';

function svgPulleyRotationDiagram(): string {
	const body = `
  <rect x="8" y="8" width="404" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">بكرة تدور حول محور ثابت (Δ) ترفع أو تسحب كتلة m</text>
  <!-- Pulley wheel -->
  <circle cx="155" cy="86" r="42" fill="#e2e8f0" stroke="#1e293b" stroke-width="2.4"/>
  <circle cx="155" cy="86" r="6" fill="#dc2626"/>
  <text x="155" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Δ (J_Δ)</text>
  <!-- Radius R -->
  <line x1="155" y1="86" x2="197" y2="86" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="176" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">R</text>
  <!-- Rotation arrow -->
  <path d="M 122 60 A 40 40 0 0 1 178 48" fill="none" stroke="#059669" stroke-width="2"/>
  <polygon points="178,44 185,50 176,52" fill="#059669"/>
  <text x="130" y="46" font-size="11.5" font-weight="bold" fill="#059669">ω</text>
  <!-- Hanging mass m -->
  <line x1="197" y1="86" x2="197" y2="152" stroke="#334155" stroke-width="2"/>
  <rect x="179" y="152" width="36" height="28" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="197" y="170" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">m</text>
  <!-- Formulas -->
  <text x="255" y="80" font-size="11.5" font-weight="bold" fill="#0f172a">E_cr = ½ J_Δ ω²</text>
  <text x="255" y="105" font-size="11.5" font-weight="bold" fill="#0f172a">W(M_Δ) = M_Δ · θ</text>
  <text x="255" y="130" font-size="11.5" font-weight="bold" fill="#0f172a">v = R · ω</text>
  <text x="255" y="155" font-size="11.5" font-weight="bold" fill="#dc2626">mgh = ½mv² + ½J_Δω²</text>
  `;
	return wrapPhysicsSvg(420, 220, body);
}

const rotationalLessonTm: PhysicsInteractiveLessonData = {
	id: 'phy_lesson_2as_tm_t1_rotational_work_kinetic_energy',
	slug: 'phy-2as-tm-t1-rotational-work-kinetic-energy',
	grade: '2as_tm',
	yearSubjectId: 713,
	trimesterId: 't1',
	sequenceId: 'seq1',
	sequenceTitleAr: 'الميكانيك والطاقة: الانسحاب والدوران والطاقة الكامنة (الوحدات 1–4)',
	order: 3,
	titleAr: 'العمل والطاقة الحركية (حالة حركة دورانية) — خاص بـ TM و MATH',
	objectives: [
		'تعريف السرعة الزاوية ω وعزم القوة M_Δ وعزم العطالة J_Δ وحساب عمل قوة مطبقة على جسم يدور W = M_Δ·θ',
		'حساب الطاقة الحركية الدورانية E_c = ½J_Δω² والطاقة الحركية الكلية لجسم يدور وينسحب معاً، وتوظيف مبدأ انحفاظ الطاقة في الأنظمة التكنولوجية'
	],
	keywordsAr: ['الحركة الدورانية', 'عزم العطالة J_Δ', 'السرعة الزاوية', 'الطاقة الحركية الدورانية'],
	discover: {
		scenarioAr:
			'في رافعة صناعية (ونش)، تلتف حبال حول أسطوانة متجانسة كتلتها $M = 4\\text{ kg}$ ونصف قطرها $R = 0.2\\text{ m}$ ($J_\\Delta = \\frac{1}{2} M R^2$) قابلة للدوران حول محور أفقي ثابت $(\\Delta)$، وتُعلق في طرف الحبل حمولة كتلتها $m = 2\\text{ kg}$ تنزل من السكون مسافة $h = 2\\text{ m}$.',
		svg: svgPulleyRotationDiagram(),
		steps: [
			{
				promptAr: 'احسب عزم عطالة الأسطوانة $J_\\Delta$ بالنسبة لمحور دورانها $(\\Delta)$.',
				hintAr: 'استعمل عبارة عزم عطالة أسطوانة متجانسة $J_\\Delta = \\frac{1}{2} M R^2$.',
				expectedInput: '0.08 kg·m²',
				revealAr: '$J_\\Delta = \\frac{1}{2} \\times 4 \\times (0.2)^2 = 2 \\times 0.04 = 0.08\\text{ kg}\\cdot\\text{m}^2$.'
			},
			{
				promptAr: 'ما هي العلاقة بين السرعة الخطية $v$ للحمولة والسرعة الزاوية $\\omega$ للأسطوانة عندما لا ينزلق الحبل؟',
				hintAr: 'كل نقطة من محيط الأسطوانة تتحرك بسرعة مماسية تساوي سرعة الحبل.',
				revealAr: '$v = R \\cdot \\omega \\iff \\omega = \\frac{v}{R}$.'
			},
			{
				promptAr: 'اكتب معادلة انحفاظ الطاقة للجملة (أسطوانة + حمولة + أرض) واستنتج السرعة $v$ بعد نزول $h = 2\\text{ m}$ ($g = 10\\text{ m/s}^2$).',
				hintAr: 'يتحول النقص في $E_{pp}$ إلى طاقة حركية انسحابية للحمولة وطاقة حركية دورانية للأسطوانة.',
				revealAr:
					'$m g h = \\frac{1}{2} m v^2 + \\frac{1}{2} J_\\Delta \\omega^2 = \\frac{1}{2}\\left(m + \\frac{J_\\Delta}{R^2}\\right)v^2$.\nبما أن $\\frac{J_\\Delta}{R^2} = \\frac{0.08}{0.04} = 2\\text{ kg}$ نجد: $2 \\times 10 \\times 2 = \\frac{1}{2}(2 + 2)v^2 \\implies 40 = 2v^2 \\implies v = \\sqrt{20} \\approx 4.47\\text{ m/s}$.'
			}
		]
	},
	summary: {
		rulesAr: [
			'**المقادير الحركية والديناميكية للدوران حول محور ثابت $(\\Delta)$**:\n- السرعة الزاوية: $\\omega = \\frac{\\Delta\\theta}{\\Delta t} = 2\\pi N$ (بـ $\\text{rad/s}$، حيث $N$ التواتر بـ $\\text{tr/s}$).\n- عزم قوة ثابتة $\\vec{F}$ ذات ذراع $d$: $\\mathcal{M}_\\Delta(\\vec{F}) = \\pm F \\cdot d$ (بـ $\\text{N}\\cdot\\text{m}$).\n- عمل قوة أو مزدوجة عزمها ثابت خلال دوران زاوي $\\theta$ (بالراديان $\\text{rad}$):\n$$W(\\vec{F}) = \\mathcal{M}_\\Delta \\cdot \\theta$$',
			'**عزم العطالة $J_\\Delta$ والطاقة الحركية الدورانية**:\n- قرص أو أسطوانة متجانسة: $J_\\Delta = \\frac{1}{2}M R^2$؛ ساق متجانسة حول مركزها: $J_\\Delta = \\frac{1}{12}M L^2$؛ حلقة رقيقة: $J_\\Delta = M R^2$.\n- الطاقة الحركية الدورانية:\n$$E_{cr} = \\frac{1}{2} J_\\Delta \\omega^2$$\n- لجسم يتدحرج دون انزلاق (حركة انسحابية + دورانية معاً): $E_{c,\\text{tot}} = \\frac{1}{2}m v^2 + \\frac{1}{2}J_\\Delta \\omega^2$.'
		],
		visualSvg: svgPulleyRotationDiagram(),
		visualCaptionAr: 'تحول الطاقة الكامنة إلى طاقة حركية انسحابية ودورانية في جملة (بكرة + كتلة)',
		examples: [
			{
				problemAr:
					'محرك يطبق مزدوجة عزمها ثابت $\\mathcal{M} = 15\\text{ N}\\cdot\\text{m}$ على عمود دوران ينجز $10$ دورات كاملة. احسب عمل المزدوجة.',
				solutionAr:
					'الزاوية الممسوحة بالراديان: $\\theta = 2\\pi n = 2\\pi \\times 10 = 20\\pi\\text{ rad}$.\nالعمل: $W = \\mathcal{M} \\cdot \\theta = 15 \\times 20\\pi = 300\\pi \\approx 942.5\\text{ J}$.'
			}
		],
		watchOutAr:
			'الزاوية $\\theta$ في قانون عمل المزدوجة $W = \\mathcal{M}_\\Delta \\cdot \\theta$ يجب أن تكون دوماً بوحدة **الراديان ($\\text{rad}$)** (دورة واحدة = $2\\pi\\text{ rad}$)، والسرعة الزاوية $\\omega$ بوحدة $\\text{rad/s}$ (حول من $\\text{tr/min}$ بالقسمة على $60$ والضرب في $2\\pi$).'
	},
	practice: [
		{
			questionAr:
				'قرص متجانس كتلته $M = 2\\text{ kg}$ ونصف قطره $R = 0.5\\text{ m}$ ($J_\\Delta = \\frac{1}{2}M R^2$) يدور بسرعة زاوية $\\omega = 10\\text{ rad/s}$. ما قيمة طاقته الحركية الدورانية؟',
			options: ['$12.5\\text{ J}$', '$25\\text{ J}$', '$50\\text{ J}$', '$2.5\\text{ J}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $J_\\Delta = 0.5 \\times 2 \\times 0.25 = 0.25\\text{ kg}\\cdot\\text{m}^2$ ومنه $E_{cr} = 0.5 \\times 0.25 \\times 100 = 12.5\\text{ J}$.',
				'خطأ تشخيصي: نسيت معامل $\\frac{1}{2}$ في قانون عزم العطالة أو الطاقة الحركية.',
				'خطأ تشخيصي: نسيت معامل $\\frac{1}{2}$ مرتين.',
				'خطأ تشخيصي: نسيت تربيع السرعة الزاوية $\\omega^2$.'
			],
			explanationAr:
				'عزم العطالة $J_\\Delta = \\frac{1}{2}(2)(0.5)^2 = 0.25\\text{ kg}\\cdot\\text{m}^2$، فتكون الطاقة الحركية الدورانية $E_{cr} = \\frac{1}{2}(0.25)(10)^2 = 12.5\\text{ J}$.'
		},
		{
			questionAr:
				'تطبق مزدوجة محركة عزمها $\\mathcal{M} = 5\\text{ N}\\cdot\\text{m}$ على محور دوران ينجز $n = 20$ دورة. ما هو العمل المنجز بوحدة الجول؟',
			options: ['$200\\pi\\text{ J}$', '$100\\text{ J}$', '$100\\pi\\text{ J}$', '$40\\pi\\text{ J}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $\\theta = 2\\pi n = 40\\pi\\text{ rad} \\implies W = 5 \\times 40\\pi = 200\\pi\\text{ J}$.',
				'خطأ تشخيصي: عوضت عدد الدورات $n = 20$ مباشرة بدلاً من الزاوية بالراديان $2\\pi n$.',
				'خطأ تشخيصي: استعملت $\\pi n$ بدلاً من $2\\pi n$.',
				'خطأ تشخيصي: نسيت الضرب في عزم المزدوجة $5$.'
			],
			explanationAr:
				'تحويل الدورات إلى راديان: $\\theta = 2\\pi \\times 20 = 40\\pi\\text{ rad}$، ومنه $W = \\mathcal{M}\\cdot\\theta = 5 \\times 40\\pi = 200\\pi\\text{ J}$.'
		},
		{
			questionAr:
				'يدور محرك كهربائي بتواتر $N = 1500\\text{ tr/min}$. ما قيمة سرعته الزاوية $\\omega$؟',
			options: ['$50\\pi\\text{ rad/s}$', '$1500\\pi\\text{ rad/s}$', '$25\\text{ rad/s}$', '$100\\pi\\text{ rad/s}$'],
			correctIndex: 0,
			diagnosticFeedback: [
				'إجابة صحيحة! $N = 1500/60 = 25\\text{ tr/s} \\implies \\omega = 2\\pi N = 50\\pi\\text{ rad/s}$.',
				'خطأ تشخيصي: نسيت القسمة على $60$ للتحويل من الدقيقة إلى الثانية.',
				'خطأ تشخيصي: هذه قيمة التواتر $f = 25\\text{ Hz}$ وليست السرعة الزاوية $\\omega = 2\\pi f$.',
				'خطأ تشخيصي: ضاعفت القيمة دون مبرر.'
			],
			explanationAr:
				'$\\omega = \\frac{2\\pi N}{60} = \\frac{2\\pi \\times 1500}{60} = 50\\pi\\text{ rad/s}$.'
		}
	]
};

const potentialWithTorsionTm = (() => {
	const base = adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[2], '2as_tm', 't1_potential_energy_mechanical');
	return {
		...base,
		order: 4,
		titleAr: 'الطاقة الكامنة (الثقالية، المرونية، والفتلية) والطاقة الميكانيكية',
		objectives: [
			'حساب الطاقة الكامنة الثقالية E_{pp} = mgz والمرونية E_{pe} = ½kx² والفتلية E_{pt} = ½Cθ²، وتطبيق انحفاظ الطاقة الميكانيكية'
		],
		keywordsAr: ['الطاقة الكامنة', 'الطاقة الكامنة الفتلية', 'الطاقة الميكانيكية'],
		summary: {
			...base.summary,
			rulesAr: [
				...base.summary.rulesAr,
				'**الطاقة الكامنة الفتلية (خاص بنواس الفتل في TM و MATH)**:\nعند فتل سلك مرن ثابته الفتلي $C$ ($\text{N}\\cdot\\text{m/rad}$) بزاوية $\\theta$ ($\text{rad}$) يختزن طاقة كامنة فتلية:\n$$E_{pt} = \\frac{1}{2} C \\theta^2$$'
			]
		}
	};
})();

const internalCitizenshipTm = (() => {
	const base = adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[4], '2as_tm', 't1_internal_energy_citizenship');
	return {
		...base,
		order: 6,
		titleAr: 'الطاقة الداخلية (المسعر الحراري وتغير الحالة) والطاقة والمواطنة',
		objectives: [
			'حساب كمية الحرارة Q = mcΔT و Q = mL في المسعر الحراري وتحديد حرارة التوازن ومناقشة مصادر الطاقة والمردود'
		],
		keywordsAr: ['الطاقة الداخلية', 'المسعر الحراري', 'الحرارة الكامنة', 'الطاقة والمواطنة'],
		summary: {
			...base.summary,
			rulesAr: [
				...base.summary.rulesAr,
				'**الطاقة والمواطنة ومردود التحويل**:\n$$\\eta = \\frac{E_{\\text{مفيدة}}}{E_{\\text{الممتصة}}} < 1$$\nتُسهم الطاقات المتجددة (الشمسية، الهوائية، المائية) في تقليل انبعاثات $\\ce{CO2}$ وتحسين كفاءة الأنظمة التكنولوجية.'
			]
		}
	};
})();

export const PHYSICS_LESSONS_2AS_TM_T1: PhysicsInteractiveLessonData[] = [
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[0], '2as_tm', 't1_qualitative_energy_conservation'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[1], '2as_tm', 't1_work_translational_kinetic_energy'),
	rotationalLessonTm,
	potentialWithTorsionTm,
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[3], '2as_tm', 't1_conductivity_molar_concentration'),
		order: 5
	},
	internalCitizenshipTm
];
