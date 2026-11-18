import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_PHYSICS_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';

/**
 * Helper that builds the 4 curriculum-mapped T2 lessons for 3AS TM & 3AS MATH
 * by adapting shared Units 2, 3, and merging the 2 Unit 4 lessons into `t2_ph_acids_bases_titration`.
 */
export function buildMtmPhysicsLessonsT2(
	targetGrade: '3as_tm' | '3as_math'
): PhysicsInteractiveLessonData[] {
	const core = SHARED_PHYSICS_LESSONS_3AS_T2.slice(0, 3).map((lesson) => {
		const adapted = adaptPhysicsLessonForTrack(lesson, targetGrade);
		return {
			...adapted,
			slug: adapted.slug.replace(
				new RegExp(`^phy-${targetGrade.replace('_', '-')}-phy-3as-shared-`),
				`phy-${targetGrade.replace('_', '-')}-`
			)
		};
	});

	const eqBase = adaptPhysicsLessonForTrack(
		SHARED_PHYSICS_LESSONS_3AS_T2[3],
		targetGrade,
		't2_ph_acids_bases_titration'
	);
	const titBase = adaptPhysicsLessonForTrack(SHARED_PHYSICS_LESSONS_3AS_T2[4], targetGrade);

	const combinedUnit4: PhysicsInteractiveLessonData = {
		...eqBase,
		slug: `phy-${targetGrade.replace('_', '-')}-t2-ph-acids-bases-titration`,
		order: 4,
		titleAr: 'الـ pH، الأحماض والأسس، ثابت التوازن K، والمعايرة الـ pH-مترية',
		objectives: [
			'حساب الـ pH ونسبة التقدم النهائي $\\tau_f$ وكسر التفاعل $Q_r$ وثابت التوازن $K$ وثابت الحموضة $pK_a$',
			'تفسير منحنيات المعايرة الـ pH-مترية وتعيين نقطة التكافؤ ونقطة نصف التكافؤ ($pH = pK_a$)'
		],
		keywordsAr: ['الـ pH', 'نسبة التقدم النهائي', 'ثابت التوازن K', 'المعايرة الـ pH-مترية'],
		discover: {
			...titBase.discover,
			steps: [...eqBase.discover.steps.slice(0, 2), ...titBase.discover.steps.slice(0, 2)]
		},
		summary: {
			rulesAr: [...eqBase.summary.rulesAr, ...titBase.summary.rulesAr],
			visualSvg: titBase.summary.visualSvg,
			visualCaptionAr: titBase.summary.visualCaptionAr,
			examples: [...eqBase.summary.examples, ...titBase.summary.examples],
			watchOutAr: `${eqBase.summary.watchOutAr ?? ''} ${titBase.summary.watchOutAr ?? ''}`.trim()
		},
		practice: [...eqBase.practice.slice(0, 2), ...titBase.practice.slice(0, 2)]
	};

	return [...core, combinedUnit4];
}

/**
 * 3AS TM (Technique Mathématique — تقني رياضي) Interactive Lessons — Trimester 2
 * Grade: '3as_tm' | YearSubjectId: 726 | Stream: TM | Coefficient: 5
 */
export const PHYSICS_LESSONS_3AS_TM_T2: PhysicsInteractiveLessonData[] =
	buildMtmPhysicsLessonsT2('3as_tm');
