import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgSpace3DScene } from '../../svg-secondary';
import { SHARED_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

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
// 2AS TM Stream-Exclusive Template 3: Surfaces of Revolution & Planar Sections
// ═══════════════════════════════════════════════════════════════════════════════

interface RevolutionConfig {
	solidType: 'cone' | 'cylinder' | 'sphere';
	title: string;
	x0: number;
	y0: number;
	z0: number;
	R: number; // or radius of cylinder/sphere
	h: number; // cutting height
	rSection: number;
	volTypst: string;
	volKatex: string;
	xCut?: number;
}

const REVOLUTION_CONFIGS: RevolutionConfig[] = [
	// 1. Cone of revolution apex O(0, 0, 0)
	{
		solidType: 'cone',
		title: 'مخروط دوراني رأسه المبدأ O',
		x0: 0,
		y0: 0,
		z0: 0,
		R: 3,
		h: 3,
		rSection: 3,
		volTypst: '9 pi',
		volKatex: '9\\pi'
	},
	// 2. Cylinder of revolution axis passing through (1, 1, 0)
	{
		solidType: 'cylinder',
		title: 'أسطوانة دورانية محورها يوازي (Oz)',
		x0: 1,
		y0: 1,
		z0: 0,
		R: 3,
		h: 4,
		rSection: 3,
		volTypst: '36 pi',
		volKatex: '36\\pi',
		xCut: 3
	},
	// 3. Cone of revolution apex S(1, 2, 1)
	{
		solidType: 'cone',
		title: 'مخروط دوراني رأسه S(1, 2, 1)',
		x0: 1,
		y0: 2,
		z0: 1,
		R: 3,
		h: 4,
		rSection: 3,
		volTypst: '9 pi',
		volKatex: '9\\pi'
	},
	// 4. Sphere center Omega(2, 2, 2), radius 5
	{
		solidType: 'sphere',
		title: 'سطح كرة مركزه Ω(2, 2, 2)',
		x0: 2,
		y0: 2,
		z0: 2,
		R: 5,
		h: 5,
		rSection: 4,
		volTypst: 'frac(500, 3) pi',
		volKatex: '\\frac{500}{3}\\pi'
	},
	// 5. Cylinder of revolution axis passing through (2, 1, 0)
	{
		solidType: 'cylinder',
		title: 'أسطوانة دورانية نصف قطرها R = 2',
		x0: 2,
		y0: 1,
		z0: 0,
		R: 2,
		h: 5,
		rSection: 2,
		volTypst: '20 pi',
		volKatex: '20\\pi',
		xCut: 3
	},
	// 6. Cone of revolution apex S(0, 0, 1)
	{
		solidType: 'cone',
		title: 'مخروط دوراني رأسه S(0, 0, 1)',
		x0: 0,
		y0: 0,
		z0: 1,
		R: 4,
		h: 5,
		rSection: 4,
		volTypst: 'frac(64, 3) pi',
		volKatex: '\\frac{64}{3}\\pi'
	},
	// 7. Sphere center Omega(1, 1, 3), radius 5
	{
		solidType: 'sphere',
		title: 'سطح كرة نصف قطره R = 5',
		x0: 1,
		y0: 1,
		z0: 3,
		R: 5,
		h: 6,
		rSection: 4,
		volTypst: 'frac(500, 3) pi',
		volKatex: '\\frac{500}{3}\\pi'
	},
	// 8. Cylinder of revolution axis passing through (0, 2, 0)
	{
		solidType: 'cylinder',
		title: 'أسطوانة دورانية نصف قطرها R = 4',
		x0: 0,
		y0: 2,
		z0: 0,
		R: 4,
		h: 3,
		rSection: 4,
		volTypst: '48 pi',
		volKatex: '48\\pi',
		xCut: 2
	},
	// 9. Cone of revolution apex S(2, 1, 0)
	{
		solidType: 'cone',
		title: 'مخروط دوراني رأسه S(2, 1, 0)',
		x0: 2,
		y0: 1,
		z0: 0,
		R: 2,
		h: 2,
		rSection: 2,
		volTypst: 'frac(8, 3) pi',
		volKatex: '\\frac{8}{3}\\pi'
	},
	// 10. Sphere center Omega(0, 0, 2), radius 5
	{
		solidType: 'sphere',
		title: 'سطح كرة مركزه Ω(0, 0, 2)',
		x0: 0,
		y0: 0,
		z0: 2,
		R: 5,
		h: -1,
		rSection: 4,
		volTypst: 'frac(500, 3) pi',
		volKatex: '\\frac{500}{3}\\pi'
	},
	// 11. Cylinder of revolution axis passing through (1, 0, 0)
	{
		solidType: 'cylinder',
		title: 'أسطوانة دورانية محورها يوازي (Oz)',
		x0: 1,
		y0: 0,
		z0: 0,
		R: 3,
		h: 6,
		rSection: 3,
		volTypst: '54 pi',
		volKatex: '54\\pi',
		xCut: 2
	},
	// 12. Cone of revolution apex S(1, 1, 0)
	{
		solidType: 'cone',
		title: 'مخروط دوراني نصف زاوية رأسه 45 درجة',
		x0: 1,
		y0: 1,
		z0: 0,
		R: 3,
		h: 3,
		rSection: 3,
		volTypst: '9 pi',
		volKatex: '9\\pi'
	}
];

function fmtSphereEqTypst(x0: number, y0: number, z0: number, R: number): string {
	const xTerm = x0 === 0 ? 'x^2' : `(x - ${x0})^2`;
	const yTerm = y0 === 0 ? 'y^2' : `(y - ${y0})^2`;
	const zTerm = z0 === 0 ? 'z^2' : `(z - ${z0})^2`;
	return `${xTerm} + ${yTerm} + ${zTerm} = ${R * R}`;
}

function fmtSphereEqKatex(x0: number, y0: number, z0: number, R: number): string {
	const xTerm = x0 === 0 ? 'x^2' : `(x - ${x0})^2`;
	const yTerm = y0 === 0 ? 'y^2' : `(y - ${y0})^2`;
	const zTerm = z0 === 0 ? 'z^2' : `(z - ${z0})^2`;
	return `${xTerm} + ${yTerm} + ${zTerm} = ${R * R}`;
}

function fmtCylinderEqTypst(x0: number, y0: number, R: number): string {
	const xTerm = x0 === 0 ? 'x^2' : `(x - ${x0})^2`;
	const yTerm = y0 === 0 ? 'y^2' : `(y - ${y0})^2`;
	return `${xTerm} + ${yTerm} = ${R * R}`;
}

function fmtCylinderEqKatex(x0: number, y0: number, R: number): string {
	const xTerm = x0 === 0 ? 'x^2' : `(x - ${x0})^2`;
	const yTerm = y0 === 0 ? 'y^2' : `(y - ${y0})^2`;
	return `${xTerm} + ${yTerm} = ${R * R}`;
}

function fmtConeEqTypst(x0: number, y0: number, z0: number): string {
	const xTerm = x0 === 0 ? 'x^2' : `(x - ${x0})^2`;
	const yTerm = y0 === 0 ? 'y^2' : `(y - ${y0})^2`;
	const zTerm = z0 === 0 ? 'z^2' : `(z - ${z0})^2`;
	return `${xTerm} + ${yTerm} - ${zTerm} = 0`;
}

function fmtConeEqKatex(x0: number, y0: number, z0: number): string {
	const xTerm = x0 === 0 ? 'x^2' : `(x - ${x0})^2`;
	const yTerm = y0 === 0 ? 'y^2' : `(y - ${y0})^2`;
	const zTerm = z0 === 0 ? 'z^2' : `(z - ${z0})^2`;
	return `${xTerm} + ${yTerm} - ${zTerm} = 0`;
}

export const tplSurfacesOfRevolution: ParameterizedTemplate = {
	id: 'tpl_2as_tm_t3_surfaces_of_revolution',
	grade: '2as_tm',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الهندسة في الفضاء: سطوح مجسمات الدوران والمقاطع المستوية للمجسمات',
	curriculumLessonId:
		'lesson_2as_tm_t3_analytic_space_geometry_planes_lines_surfaces_of_revolution',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let pool: RevolutionConfig[];
		if (difficulty === 'easy') {
			pool = REVOLUTION_CONFIGS.slice(0, 4);
		} else if (difficulty === 'medium') {
			pool = REVOLUTION_CONFIGS.slice(4, 8);
		} else {
			pool = REVOLUTION_CONFIGS.slice(8, 12);
		}

		const cfg = pool[(seed - 1) % pool.length];
		const { solidType, x0, y0, z0, R, h, rSection, volTypst, volKatex } = cfg;

		let eqTypst = '';
		let eqKatex = '';
		let solidNameAr = '';
		let ptLabel = '';

		if (solidType === 'cone') {
			eqTypst = fmtConeEqTypst(x0, y0, z0);
			eqKatex = fmtConeEqKatex(x0, y0, z0);
			solidNameAr = 'المخروط الدوراني $(\\Gamma)$';
			ptLabel = `S(${x0},${y0},${z0})`;
		} else if (solidType === 'cylinder') {
			eqTypst = fmtCylinderEqTypst(x0, y0, R);
			eqKatex = fmtCylinderEqKatex(x0, y0, R);
			solidNameAr = 'الأسطوانة الدورانية $(\\mathcal{C})$';
			ptLabel = `Ω(${x0},${y0},0)`;
		} else {
			eqTypst = fmtSphereEqTypst(x0, y0, z0, R);
			eqKatex = fmtSphereEqKatex(x0, y0, z0, R);
			solidNameAr = 'سطح الكرة $(\\mathcal{S})$';
			ptLabel = `Ω(${x0},${y0},${z0})`;
		}

		// 3D Space Scene SVG
		const sceneSvg = svgSpace3DScene({
			points: [
				{ x: x0, y: y0, z: z0, label: ptLabel, color: '#dc2626' },
				{ x: x0, y: y0, z: h, label: `H(${x0},${y0},${h})`, color: '#15803d' },
				{ x: x0 + rSection, y: y0, z: h, label: 'M', color: '#2563eb' }
			],
			showPlanePatch: true,
			planeLabel: `(P): z = ${h}`,
			normalVector: { x: 0, y: 0, z: 1, label: 'k' }
		});
		const sceneUrl = saveSvgAsset(`2as_tm_t3_rev_${difficulty}_s${seed}`, sceneSvg);

		// MCQ Quiz Question
		const correctOpt = `دائرة مركزها $H(${x0} ; ${y0} ; ${h})$ ونصف قطرها $r = ${rSection}$`;
		const dist1 = `مستقيمان متوازيان في المستوي $(P)$`;
		const dist2 = `دائرة مركزها $H(${x0} ; ${y0} ; ${h})$ ونصف قطرها $r = ${rSection + 1}$`;
		const dist3 = `نقطة وحيدة $H(${x0} ; ${y0} ; ${h})$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{ text: dist1, diagnosticFeedback: 'المقطع بمستو أفقي عمودي على محور الدوران يعطي دوائر وليس مستقيمات.' },
				{ text: dist2, diagnosticFeedback: 'تحقق من حساب نصف قطر الدائرة بالتعويض المباشر لـ z = h في معادلة السطح.' },
				{ text: dist3, diagnosticFeedback: 'المقطع نقطة وحيدة فقط إذا كان المستوي يمر برأس المخروط z = z0.' }
			],
			rng
		);

		// Exercise Content Blocks
		const blocks: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أ) اكتب المعادلة الديكارتية لسطح مجسم الدوران في المعلم المتعامد والمتجانس $(O; arrow(i), arrow(j), arrow(k))$.\nب) بيّن أن النقطة $M_0(${x0 + rSection}, ${y0}, ${h})$ تنتمي إلى السطح.`,
				answer: `1) أ) المعادلة الديكارتية:\nالمعادلة الديكارتية لسطح مجسم الدوران هي:\n$${eqTypst}$.\n\nب) التحقق من انتماء النقطة $M_0(${x0 + rSection}, ${y0}, ${h})$:\nبالتعويض المباشر لإحداثيات النقطة في طرفي المعادلة، نجد المساواة محققة تماماً، إذن $M_0$ تنتمي إلى السطح.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) نعتبر المستوي $(P)$ ذا المعادلة: $z = ${h}$.\nعيّن طبيعة المقطع المستوي للسطح بالمستوي $(P)$ وحدد عناصره الهندسية المميزة (المركز ونصف القطر).`,
				answer: `2) تعيين المقطع المستوي بالمستوي $(P): z = ${h}$:\n- بالتعويض بقيمة $z = ${h}$ في معادلة السطح، نحصل في المستوي $(P)$ على معادلة من الشكل:\n$(x - ${x0})^2 + (y - ${y0})^2 = ${rSection * rSection}$.\n- هذه المعادلة تمثل دائرة في المستوي $(P)$:\n  * مركزها هو المسقط العمودي: $H(${x0}, ${y0}, ${h})$.\n  * نصف قطرها هو: $r = sqrt(${rSection * rSection}) = ${rSection}$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) أ) نعتبر مكعباً $A B C D E F G H$ طول ضلعه $a = 4$. عيّن طبيعة مقطع المكعب بالمستوي المار من منتصفات أحرفه الثلاثة المنطلقة من نفس الرأس.\nب) احسب حجم المجسم الناتج عن سطح الدوران المحصور بين المستويين $z = ${z0}$ و $z = ${h}$.`,
				answer: `3) أ) مقطع المكعب:\nالمستوي المار من منتصفات ثلاثة أحرف تلتقي في رأس واحد يقطع الأوجه المجاورة في قطع مستقيمة متقايسة طول كل منها $frac(a sqrt(2), 2) = 2 sqrt(2)$. إذن طبيعة المقطع هي مثلث متقايس الأضلاع.\n\nب) حساب الحجم المحصور:\nالقيمة الدقيقة للحجم هي: $V = ${volTypst}$ وحدة حجم.`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$، نعتبر ${solidNameAr} ذي المعادلة الديكارتية:\n$$${eqKatex}$$\nما هي طبيعة المقطع المستوي لهذا السطح بالمستوي الأفقي $(P): z = ${h}$؟`,
				questionTextAr: `عيّن طبيعة المقطع المستوي بالمستوي $(P): z = ${h}$:`,
				imageUrl: sceneUrl,
				imageCaption: `تمثيل مجسم الدوران والمستوي القاطع (P): z = ${h}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بالتعويض $z = ${h}$ في معادلة السطح نجد:\n$(x - ${x0})^2 + (y - ${y0})^2 = ${rSection * rSection}$.\nوهي معادلة دائرة مركزها النقطة $H(${x0} ; ${y0} ; ${h})$ ونصف قطرها $r = \\sqrt{${rSection * rSection}} = ${rSection}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j), arrow(k))$، نعتبر سطح مجسم الدوران ذا المعادلة الديكارتية: $${eqTypst}$.`,
				content: blocks
			},
			hints: [
				`المقطع المستوي لمجسم دوران حول المحور $(Oz)$ بمستو أفقي $z = h$ هو دوماً دائرة مركزها يقع على محور الدوران.`,
				`لحساب نصف قطر دائرة المقطع، عوّض $z = h$ في المعادلة الديكارتية واستخرج الطرف الأيمن $r^2$.`,
				`المقطع المستوي لمكعب بمستو يمر من منتصفات ثلاثة أحرف تلتقي في رأس هو مثلث متقايس الأضلاع.`
			],
			solutionStepsAr: [
				`كتابة المعادلة الديكارتية للسطح $${eqKatex}$ والتحقق من انتماء النقطة $M_0$.`,
				`تعيين المقطع بالمستوي $z = ${h}$: دائرة مركزها $H(${x0} ; ${y0} ; ${h})$ ونصف قطرها $r = ${rSection}$.`,
				`المقطع المستوي للمكعب: إثبات أنه مثلث متقايس الأضلاع وحساب الحجم $V = ${volKatex}$.`
			],
			finalAnswer: `H(${x0} ; ${y0} ; ${h}) \\quad ; \\quad r = ${rSection} \\quad ; \\quad V = ${volKatex}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 2AS Technical Mathematics
// Exactly 6 templates matching curriculum sequences and Algerian BAC stream rules
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_TM_T3: ParameterizedTemplate[] = [
	adaptShared(SHARED_TEMPLATES_2AS_T3[0], 'lesson_2as_tm_t3_numerical_sequences_generation_monotonicity'),
	adaptShared(SHARED_TEMPLATES_2AS_T3[1], 'lesson_2as_tm_t3_arithmetic_sequences_properties_sum'),
	adaptShared(SHARED_TEMPLATES_2AS_T3[2], 'lesson_2as_tm_t3_geometric_sequences_properties_sum_convergence'),
	adaptShared(SHARED_TEMPLATES_2AS_T3[3], 'lesson_2as_tm_t3_space_geometry_plane_sections_cube_tetrahedron_vectors'),
	tplSurfacesOfRevolution,
	adaptShared(SHARED_TEMPLATES_2AS_T3[5], 'lesson_2as_tm_t3_analytic_space_geometry_planes_lines_surfaces_of_revolution')
];
