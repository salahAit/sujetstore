import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';

// ═══════════════════════════════════════════════════════════════════════════════
// Helper to Adapt Shared Parameterized Template for Track 2AS TM
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(
	base: ParameterizedTemplate,
	curriculumLessonId: string
): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(base, '2as_tm');
	return {
		...adapted,
		curriculumLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
			const res = adapted.generate(seed, difficulty);
			return {
				...res,
				grade: '2as_tm'
			};
		}
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2AS TM Stream-Exclusive Template 2: Linear Trig Equation a cos x + b sin x = c
// ═══════════════════════════════════════════════════════════════════════════════

interface TrigLinearConfig {
	a_k: string;
	b_k: string;
	c_k: string;
	a_t: string;
	b_t: string;
	c_t: string;
	R_k: string;
	R_t: string;
	phi_k: string;
	phi_t: string;
	cos_phi_k: string;
	cos_phi_t: string;
	sin_phi_k: string;
	sin_phi_t: string;
	theta_k: string;
	theta_t: string;
	x1_k: string;
	x1_t: string;
	x2_k: string;
	x2_t: string;
	ineq_k: string;
	ineq_t: string;
}

const TRIG_LINEAR_CONFIGS: TrigLinearConfig[] = [
	// 1. sqrt(3) cos x + sin x = sqrt(2)
	{
		a_k: '\\sqrt{3}',
		b_k: '1',
		c_k: '\\sqrt{2}',
		a_t: 'sqrt(3)',
		b_t: '1',
		c_t: 'sqrt(2)',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{\\pi}{6}',
		phi_t: 'frac(pi, 6)',
		cos_phi_k: '\\frac{\\sqrt{3}}{2}',
		cos_phi_t: 'frac(sqrt(3), 2)',
		sin_phi_k: '\\frac{1}{2}',
		sin_phi_t: 'frac(1, 2)',
		theta_k: '\\frac{\\pi}{4}',
		theta_t: 'frac(pi, 4)',
		x1_k: '\\frac{5\\pi}{12}',
		x1_t: 'frac(5 pi, 12)',
		x2_k: '-\\frac{\\pi}{12}',
		x2_t: '-frac(pi, 12)',
		ineq_k: '\\left[-\\frac{\\pi}{12} ; \\frac{5\\pi}{12}\\right]',
		ineq_t: '[-frac(pi, 12), frac(5 pi, 12)]'
	},
	// 2. cos x + sqrt(3) sin x = 1
	{
		a_k: '1',
		b_k: '\\sqrt{3}',
		c_k: '1',
		a_t: '1',
		b_t: 'sqrt(3)',
		c_t: '1',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{\\pi}{3}',
		phi_t: 'frac(pi, 3)',
		cos_phi_k: '\\frac{1}{2}',
		cos_phi_t: 'frac(1, 2)',
		sin_phi_k: '\\frac{\\sqrt{3}}{2}',
		sin_phi_t: 'frac(sqrt(3), 2)',
		theta_k: '\\frac{\\pi}{3}',
		theta_t: 'frac(pi, 3)',
		x1_k: '\\frac{2\\pi}{3}',
		x1_t: 'frac(2 pi, 3)',
		x2_k: '0',
		x2_t: '0',
		ineq_k: '\\left[0 ; \\frac{2\\pi}{3}\\right]',
		ineq_t: '[0, frac(2 pi, 3)]'
	},
	// 3. cos x - sin x = 1
	{
		a_k: '1',
		b_k: '-1',
		c_k: '1',
		a_t: '1',
		b_t: '-1',
		c_t: '1',
		R_k: '\\sqrt{2}',
		R_t: 'sqrt(2)',
		phi_k: '-\\frac{\\pi}{4}',
		phi_t: '-frac(pi, 4)',
		cos_phi_k: '\\frac{\\sqrt{2}}{2}',
		cos_phi_t: 'frac(sqrt(2), 2)',
		sin_phi_k: '-\\frac{\\sqrt{2}}{2}',
		sin_phi_t: '-frac(sqrt(2), 2)',
		theta_k: '\\frac{\\pi}{4}',
		theta_t: 'frac(pi, 4)',
		x1_k: '0',
		x1_t: '0',
		x2_k: '-\\frac{\\pi}{2}',
		x2_t: '-frac(pi, 2)',
		ineq_k: '\\left[-\\frac{\\pi}{2} ; 0\\right]',
		ineq_t: '[-frac(pi, 2), 0]'
	},
	// 4. sqrt(3) cos x - sin x = sqrt(3)
	{
		a_k: '\\sqrt{3}',
		b_k: '-1',
		c_k: '\\sqrt{3}',
		a_t: 'sqrt(3)',
		b_t: '-1',
		c_t: 'sqrt(3)',
		R_k: '2',
		R_t: '2',
		phi_k: '-\\frac{\\pi}{6}',
		phi_t: '-frac(pi, 6)',
		cos_phi_k: '\\frac{\\sqrt{3}}{2}',
		cos_phi_t: 'frac(sqrt(3), 2)',
		sin_phi_k: '-\\frac{1}{2}',
		sin_phi_t: '-frac(1, 2)',
		theta_k: '\\frac{\\pi}{6}',
		theta_t: 'frac(pi, 6)',
		x1_k: '0',
		x1_t: '0',
		x2_k: '-\\frac{\\pi}{3}',
		x2_t: '-frac(pi, 3)',
		ineq_k: '\\left[-\\frac{\\pi}{3} ; 0\\right]',
		ineq_t: '[-frac(pi, 3), 0]'
	},
	// 5. cos x + sin x = 1
	{
		a_k: '1',
		b_k: '1',
		c_k: '1',
		a_t: '1',
		b_t: '1',
		c_t: '1',
		R_k: '\\sqrt{2}',
		R_t: 'sqrt(2)',
		phi_k: '\\frac{\\pi}{4}',
		phi_t: 'frac(pi, 4)',
		cos_phi_k: '\\frac{\\sqrt{2}}{2}',
		cos_phi_t: 'frac(sqrt(2), 2)',
		sin_phi_k: '\\frac{\\sqrt{2}}{2}',
		sin_phi_t: 'frac(sqrt(2), 2)',
		theta_k: '\\frac{\\pi}{4}',
		theta_t: 'frac(pi, 4)',
		x1_k: '\\frac{\\pi}{2}',
		x1_t: 'frac(pi, 2)',
		x2_k: '0',
		x2_t: '0',
		ineq_k: '\\left[0 ; \\frac{\\pi}{2}\\right]',
		ineq_t: '[0, frac(pi, 2)]'
	},
	// 6. -cos x + sqrt(3) sin x = sqrt(2)
	{
		a_k: '-1',
		b_k: '\\sqrt{3}',
		c_k: '\\sqrt{2}',
		a_t: '-1',
		b_t: 'sqrt(3)',
		c_t: 'sqrt(2)',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{2\\pi}{3}',
		phi_t: 'frac(2 pi, 3)',
		cos_phi_k: '-\\frac{1}{2}',
		cos_phi_t: '-frac(1, 2)',
		sin_phi_k: '\\frac{\\sqrt{3}}{2}',
		sin_phi_t: 'frac(sqrt(3), 2)',
		theta_k: '\\frac{\\pi}{4}',
		theta_t: 'frac(pi, 4)',
		x1_k: '\\frac{11\\pi}{12}',
		x1_t: 'frac(11 pi, 12)',
		x2_k: '\\frac{5\\pi}{12}',
		x2_t: 'frac(5 pi, 12)',
		ineq_k: '\\left[\\frac{5\\pi}{12} ; \\frac{11\\pi}{12}\\right]',
		ineq_t: '[frac(5 pi, 12), frac(11 pi, 12)]'
	},
	// 7. -sqrt(3) cos x + sin x = 1
	{
		a_k: '-\\sqrt{3}',
		b_k: '1',
		c_k: '1',
		a_t: '-sqrt(3)',
		b_t: '1',
		c_t: '1',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{5\\pi}{6}',
		phi_t: 'frac(5 pi, 6)',
		cos_phi_k: '-\\frac{\\sqrt{3}}{2}',
		cos_phi_t: '-frac(sqrt(3), 2)',
		sin_phi_k: '\\frac{1}{2}',
		sin_phi_t: 'frac(1, 2)',
		theta_k: '\\frac{\\pi}{3}',
		theta_t: 'frac(pi, 3)',
		x1_k: '\\frac{\\pi}{2}',
		x1_t: 'frac(pi, 2)',
		x2_k: '-\\frac{5\\pi}{6}',
		x2_t: '-frac(5 pi, 6)',
		ineq_k: '\\left[-\\pi ; -\\frac{5\\pi}{6}\\right] \\cup \\left[\\frac{\\pi}{2} ; \\pi\\right]',
		ineq_t: '[-pi, -frac(5 pi, 6)] union [frac(pi, 2), pi]'
	},
	// 8. cos x - sqrt(3) sin x = sqrt(2)
	{
		a_k: '1',
		b_k: '-\\sqrt{3}',
		c_k: '\\sqrt{2}',
		a_t: '1',
		b_t: '-sqrt(3)',
		c_t: 'sqrt(2)',
		R_k: '2',
		R_t: '2',
		phi_k: '-\\frac{\\pi}{3}',
		phi_t: '-frac(pi, 3)',
		cos_phi_k: '\\frac{1}{2}',
		cos_phi_t: 'frac(1, 2)',
		sin_phi_k: '-\\frac{\\sqrt{3}}{2}',
		sin_phi_t: '-frac(sqrt(3), 2)',
		theta_k: '\\frac{\\pi}{4}',
		theta_t: 'frac(pi, 4)',
		x1_k: '-\\frac{\\pi}{12}',
		x1_t: '-frac(pi, 12)',
		x2_k: '-\\frac{7\\pi}{12}',
		x2_t: '-frac(7 pi, 12)',
		ineq_k: '\\left[-\\frac{7\\pi}{12} ; -\\frac{\\pi}{12}\\right]',
		ineq_t: '[-frac(7 pi, 12), -frac(pi, 12)]'
	},
	// 9. sqrt(3) cos x + sin x = 1
	{
		a_k: '\\sqrt{3}',
		b_k: '1',
		c_k: '1',
		a_t: 'sqrt(3)',
		b_t: '1',
		c_t: '1',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{\\pi}{6}',
		phi_t: 'frac(pi, 6)',
		cos_phi_k: '\\frac{\\sqrt{3}}{2}',
		cos_phi_t: 'frac(sqrt(3), 2)',
		sin_phi_k: '\\frac{1}{2}',
		sin_phi_t: 'frac(1, 2)',
		theta_k: '\\frac{\\pi}{3}',
		theta_t: 'frac(pi, 3)',
		x1_k: '\\frac{\\pi}{2}',
		x1_t: 'frac(pi, 2)',
		x2_k: '-\\frac{\\pi}{6}',
		x2_t: '-frac(pi, 6)',
		ineq_k: '\\left[-\\frac{\\pi}{6} ; \\frac{\\pi}{2}\\right]',
		ineq_t: '[-frac(pi, 6), frac(pi, 2)]'
	},
	// 10. cos x + sqrt(3) sin x = sqrt(3)
	{
		a_k: '1',
		b_k: '\\sqrt{3}',
		c_k: '\\sqrt{3}',
		a_t: '1',
		b_t: 'sqrt(3)',
		c_t: 'sqrt(3)',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{\\pi}{3}',
		phi_t: 'frac(pi, 3)',
		cos_phi_k: '\\frac{1}{2}',
		cos_phi_t: 'frac(1, 2)',
		sin_phi_k: '\\frac{\\sqrt{3}}{2}',
		sin_phi_t: 'frac(sqrt(3), 2)',
		theta_k: '\\frac{\\pi}{6}',
		theta_t: 'frac(pi, 6)',
		x1_k: '\\frac{\\pi}{2}',
		x1_t: 'frac(pi, 2)',
		x2_k: '\\frac{\\pi}{6}',
		x2_t: 'frac(pi, 6)',
		ineq_k: '\\left[\\frac{\\pi}{6} ; \\frac{\\pi}{2}\\right]',
		ineq_t: '[frac(pi, 6), frac(pi, 2)]'
	},
	// 11. sqrt(3) cos x + sin x = -sqrt(2)
	{
		a_k: '\\sqrt{3}',
		b_k: '1',
		c_k: '-\\sqrt{2}',
		a_t: 'sqrt(3)',
		b_t: '1',
		c_t: '-sqrt(2)',
		R_k: '2',
		R_t: '2',
		phi_k: '\\frac{\\pi}{6}',
		phi_t: 'frac(pi, 6)',
		cos_phi_k: '\\frac{\\sqrt{3}}{2}',
		cos_phi_t: 'frac(sqrt(3), 2)',
		sin_phi_k: '\\frac{1}{2}',
		sin_phi_t: 'frac(1, 2)',
		theta_k: '\\frac{3\\pi}{4}',
		theta_t: 'frac(3 pi, 4)',
		x1_k: '\\frac{11\\pi}{12}',
		x1_t: 'frac(11 pi, 12)',
		x2_k: '-\\frac{7\\pi}{12}',
		x2_t: '-frac(7 pi, 12)',
		ineq_k: '\\left[-\\frac{7\\pi}{12} ; \\frac{11\\pi}{12}\\right]',
		ineq_t: '[-frac(7 pi, 12), frac(11 pi, 12)]'
	},
	// 12. sqrt(3) cos x - sin x = 1
	{
		a_k: '\\sqrt{3}',
		b_k: '-1',
		c_k: '1',
		a_t: 'sqrt(3)',
		b_t: '-1',
		c_t: '1',
		R_k: '2',
		R_t: '2',
		phi_k: '-\\frac{\\pi}{6}',
		phi_t: '-frac(pi, 6)',
		cos_phi_k: '\\frac{\\sqrt{3}}{2}',
		cos_phi_t: 'frac(sqrt(3), 2)',
		sin_phi_k: '-\\frac{1}{2}',
		sin_phi_t: '-frac(1, 2)',
		theta_k: '\\frac{\\pi}{3}',
		theta_t: 'frac(pi, 3)',
		x1_k: '\\frac{\\pi}{6}',
		x1_t: 'frac(pi, 6)',
		x2_k: '-\\frac{\\pi}{2}',
		x2_t: '-frac(pi, 2)',
		ineq_k: '\\left[-\\frac{\\pi}{2} ; \\frac{\\pi}{6}\\right]',
		ineq_t: '[-frac(pi, 2), frac(pi, 6)]'
	}
];

function fmtTrigLinearKatex(a: string, b: string): string {
	let aPart = '';
	if (a === '1') aPart = '\\cos x';
	else if (a === '-1') aPart = '-\\cos x';
	else aPart = `${a}\\cos x`;

	let bPart = '';
	if (b === '1') bPart = '+ \\sin x';
	else if (b === '-1') bPart = '- \\sin x';
	else if (b.startsWith('-')) bPart = `- ${b.slice(1)}\\sin x`;
	else bPart = `+ ${b}\\sin x`;

	return `${aPart} ${bPart}`;
}

function fmtTrigLinearTypst(a: string, b: string): string {
	let aPart = '';
	if (a === '1') aPart = 'cos(x)';
	else if (a === '-1') aPart = '-cos(x)';
	else aPart = `${a} cos(x)`;

	let bPart = '';
	if (b === '1') bPart = '+ sin(x)';
	else if (b === '-1') bPart = '- sin(x)';
	else if (b.startsWith('-')) bPart = `- ${b.slice(1)} sin(x)`;
	else bPart = `+ ${b} sin(x)`;

	return `${aPart} ${bPart}`;
}

export const tplLinearTrigAcBs: ParameterizedTemplate = {
	id: 'tpl_2as_tm_t2_linear_trig_ac_bs',
	grade: '2as_tm',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'حساب المثلثات: تحويل العبارة a cos x + b sin x وحل المعادلات والمتراجحات',
	curriculumLessonId: 'lesson_2as_tm_t2_trigonometry_transformation_formulas_linear_equations',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let pool: TrigLinearConfig[];
		if (difficulty === 'easy') {
			pool = TRIG_LINEAR_CONFIGS.slice(0, 4);
		} else if (difficulty === 'medium') {
			pool = TRIG_LINEAR_CONFIGS.slice(4, 8);
		} else {
			pool = TRIG_LINEAR_CONFIGS.slice(8, 12);
		}

		const cfg = pool[(seed - 1) % pool.length];
		const exprKatex = fmtTrigLinearKatex(cfg.a_k, cfg.b_k);
		const exprTypst = fmtTrigLinearTypst(cfg.a_t, cfg.b_t);

		const phiArgKatex = cfg.phi_k.startsWith('-')
			? `\\left(x + ${cfg.phi_k.slice(1)}\\right)`
			: `\\left(x - ${cfg.phi_k}\\right)`;
		const phiArgTypst = cfg.phi_t.startsWith('-')
			? `(x + ${cfg.phi_t.slice(1)})`
			: `(x - ${cfg.phi_t})`;

		// MCQ Quiz Question
		const correctOpt = `$E(x) = ${cfg.R_k} \\cos ${phiArgKatex}$`;
		const dist1 = `$E(x) = ${cfg.R_k} \\sin ${phiArgKatex}$`;
		const dist2 = `$E(x) = ${cfg.R_k} \\cos\\left(x + ${cfg.phi_k.startsWith('-') ? cfg.phi_k.slice(1) : cfg.phi_k}\\right)$`;
		const dist3 = `$E(x) = \\cos ${phiArgKatex}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{ text: dist1, diagnosticFeedback: 'انتبه: منشور cos(a - b) = cos a cos b + sin a sin b يطابق الدالة جيب التمام.' },
				{ text: dist2, diagnosticFeedback: 'انتبه لإشارة الزاوية المساعدة داخل دستور الفرق.' },
				{ text: dist3, diagnosticFeedback: 'لا تنس ضرب العبارة في المعامل R = sqrt(a^2 + b^2).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر في المجال $]-\\pi ; \\pi]$ العبارة المثلثية: $E(x) = ${exprKatex}$.\nما هي الصيغة المختصرة للعبارة $E(x)$ باستعمال الزاوية المساعدة؟`,
				questionTextAr: `عيّن الصيغة المختصرة للعبارة المثلثية $E(x)$ باستعمال الزاوية المساعدة:`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `نحسب $R = \\sqrt{a^2 + b^2} = ${cfg.R_k}$.\nنستخرج $R$ عاملاً مشتركاً:\n$E(x) = ${cfg.R_k}\\left(${cfg.cos_phi_k}\\cos x + ${cfg.sin_phi_k}\\sin x\\right) = ${cfg.R_k}\\left(\\cos x \\cos ${cfg.phi_k} + \\sin x \\sin ${cfg.phi_k}\\right) = ${cfg.R_k}\\cos ${phiArgKatex}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر في المجال $]-pi, pi]$ العبارة المثلثية للمتغير $x$: $E(x) = ${exprTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) احسب العدد الحقيقي $R = sqrt(a^2 + b^2)$، ثم عيّن الزاوية المساعدة $phi in ]-pi, pi]$ بحيث:\n$cos(phi) = ${cfg.cos_phi_t}$ و $sin(phi) = ${cfg.sin_phi_t}$.\nاستنتج كتابة العبارة $E(x)$ على الشكل: $E(x) = ${cfg.R_t} cos${phiArgTypst}$.`,
						answer: `1) التحويل باستخدام الزاوية المساعدة:\n- حساب المعامل: $R = sqrt((${cfg.a_t})^2 + (${cfg.b_t})^2) = ${cfg.R_t}$.\n- تعيين الزاوية $phi$: لدينا $cos(phi) = ${cfg.cos_phi_t}$ و $sin(phi) = ${cfg.sin_phi_t}$، ومنه: $phi = ${cfg.phi_t}$.\n- استخراج العامل المشترك:\n$E(x) = ${cfg.R_t} (${cfg.cos_phi_t} cos(x) + ${cfg.sin_phi_t} sin(x)) = ${cfg.R_t} (cos(x) cos(${cfg.phi_t}) + sin(x) sin(${cfg.phi_t}))$.\nباستعمال دستور التحويل $cos(a - b) = cos(a) cos(b) + sin(a) sin(b)$، نجد:\n$E(x) = ${cfg.R_t} cos${phiArgTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) حل في المجال $]-pi, pi]$ المعادلة: $E(x) = ${cfg.c_t}$.`,
						answer: `2) حل المعادلة في $]-pi, pi]$:\n$E(x) = ${cfg.c_t} arrow.r.double ${cfg.R_t} cos${phiArgTypst} = ${cfg.c_t} arrow.r.double cos${phiArgTypst} = frac(${cfg.c_t}, ${cfg.R_t})$.\nبما أن $cos(${cfg.theta_t}) = frac(${cfg.c_t}, ${cfg.R_t})$، فإن:\n$x - (${cfg.phi_t}) = ${cfg.theta_t} + 2 k pi$ أو $x - (${cfg.phi_t}) = -${cfg.theta_t} + 2 k pi$ مع $k in bb(Z)$.\nبالتعويض وقصر الحلول على المجال $]-pi, pi]$:\nالحل الأول: $x_1 = ${cfg.x1_t}$.\nالحل الثاني: $x_2 = ${cfg.x2_t}$.\nإذن مجموعة الحلول هي: $S = {${cfg.x2_t}, ${cfg.x1_t}}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) مثّل صورتي حلول المعادلة على الدائرة المثلثية المرفقة بمعلم متعامد ومتجانس $(O; arrow(i), arrow(j))$.`,
						answer: `3) التمثيل على الدائرة المثلثية:\n- النقطة $M_1$ صورة الزاوية $x_1 = ${cfg.x1_t}$.\n- النقطة $M_2$ صورة الزاوية $x_2 = ${cfg.x2_t}$.\nيتم تعيين النقطتين بدقة على محيط الدائرة المثلثية انطلاقاً من المبدأ $I(1, 0)$ بالاتجاه المباشر.`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: `4) استنتج في المجال $]-pi, pi]$ مجموعة حلول المتراجحة: $E(x) >= ${cfg.c_t}$.`,
						answer: `4) حل المتراجحة $E(x) >= ${cfg.c_t}$:\n- المتراجحة تكافئ: $cos${phiArgTypst} >= frac(${cfg.c_t}, ${cfg.R_t})$.\n- بقراءة القوس الموافق على الدائرة المثلثية الذي تقع فواصل نقطها يمين القيمة $frac(${cfg.c_t}, ${cfg.R_t})$:\nمجموعة الحلول في المجال $]-pi, pi]$ هي:\n$S = ${cfg.ineq_t}$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`لحساب الزاوية المساعدة: عيّن إشارة $\\cos\\varphi$ و $\\sin\\varphi$ لتحديد الربع في الدائرة المثلثية.`,
				`حلول المعادلة $\\cos(X) = \\cos(\\theta)$ هي $X = \\theta + 2k\\pi$ أو $X = -\\theta + 2k\\pi$.`,
				`في المتراجحات المثلثية $\\cos(x - \\varphi) \\ge c/R$، حدد القوس على الدائرة المثلثية ثم انقل الحلول إلى المتغير $x$.`
			],
			solutionStepsAr: [
				`حساب $R = ${cfg.R_k}$ والزاوية المساعدة $\\varphi = ${cfg.phi_k}$ وكتابة $E(x) = ${cfg.R_k}\\cos ${phiArgKatex}$.`,
				`حل المعادلة: استخراج الحلين $x_1 = ${cfg.x1_k}$ و $x_2 = ${cfg.x2_k}$ في $]-\\pi ; \\pi]$.`,
				`التمثيل الهندسي لنقطتي الحل على الدائرة المثلثية.`,
				`حل المتراجحة: قراءة القوس المناسب واستنتاج $S = ${cfg.ineq_k}$.`
			],
			finalAnswer: `E(x) = ${cfg.R_k}\\cos ${phiArgKatex} \\quad ; \\quad S = \\{${cfg.x2_k} ; ${cfg.x1_k}\\}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates for 2AS Technical Mathematics
// Exactly 6 templates matching curriculum sequences and Algerian BAC stream rules
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_TM_T2: ParameterizedTemplate[] = [
	adaptShared(SHARED_TEMPLATES_2AS_T2[0], 'lesson_2as_tm_t2_limits_asymptotes_horizontal_vertical'),
	adaptShared(SHARED_TEMPLATES_2AS_T2[1], 'lesson_2as_tm_t2_limits_indeterminate_forms_oblique_asymptotes'),
	tplLinearTrigAcBs,
	adaptShared(SHARED_TEMPLATES_2AS_T2[3], 'lesson_2as_tm_t2_homothety_properties_geometric_constructions'),
	adaptShared(SHARED_TEMPLATES_2AS_T2[4], 'lesson_2as_tm_t2_scalar_product_definition_analytic_line_circle'),
	adaptShared(SHARED_TEMPLATES_2AS_T2[5], 'lesson_2as_tm_t2_scalar_product_applications_alkashi_median_loci')
];
