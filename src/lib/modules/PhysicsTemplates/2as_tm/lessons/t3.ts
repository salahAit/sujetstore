import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T3 } from '../../secondary_shared_2as/lessons/t3';

const organicCombinedTm = (() => {
	const base = adaptPhysicsLessonForTrack(
		SHARED_LESSONS_2AS_T3[0],
		'2as_tm',
		't3_organic_hydrocarbons_functional'
	);
	return {
		...base,
		order: 1,
		sequenceId: 'seq5',
		sequenceTitleAr: 'مدخل إلى الكيمياء العضوية (الوحدة 18)',
		titleAr: 'الفحوم الهيدروجينية والزمر الوظيفية الأكسجينية والتسمية',
		objectives: [
			'تسمية الألكانات والألسنات والألسينات والكحولات والألدهيدات والكيتونات والأحماض الكربوكسيلية والإسترات وكتابة المتماكبات'
		],
		keywordsAr: ['الكيمياء العضوية', 'الفحوم الهيدروجينية', 'الزمر الأكسجينية', 'IUPAC'],
		summary: {
			...base.summary,
			rulesAr: [
				...base.summary.rulesAr,
				'**الزمر الوظيفية الأكسجينية الأساسية**:\n- الكحولات ($\\ce{R-OH}$، -ول)؛ الألدهيدات ($\\ce{R-CHO}$، -ال)؛ الكيتونات ($\\ce{R1-CO-R2}$، -ون)؛ الأحماض الكربوكسيلية ($\\ce{R-COOH}$، -ويك)؛ الإسترات ($\\ce{R1-COO-R2}$، ألكانوات الألكيل).'
			]
		}
	};
})();

const thinLensesCombinedTm = (() => {
	const base = adaptPhysicsLessonForTrack(
		SHARED_LESSONS_2AS_T3[3],
		'2as_tm',
		't3_thin_lenses_formula'
	);
	return {
		...base,
		order: 2,
		sequenceId: 'seq6',
		sequenceTitleAr: 'العدسات الرقيقة والأجهزة البصرية (الوحدات 19–22) والإدماج',
		titleAr: 'العدسات الرقيقة، الإنشاء الهندسي، علاقة التوافق والأجهزة البصرية',
		objectives: [
			"تعيين صورة جسم هندسياً وتحليلياً بتطبيق علاقة التوافق 1/OA' - 1/OA = 1/f' والتكبير γ ودراسة العين والأجهزة البصرية"
		],
		keywordsAr: ['العدسات الرقيقة', 'علاقة التوافق', 'التكبير', 'الأجهزة البصرية'],
		summary: {
			...base.summary,
			rulesAr: [
				'**العدسة المجمعة والمفرقة والكسيرة**: $C = \\frac{1}{f\'}$ (بالديوبتري $\\delta$ عند قياس $f\'$ بالمتر).',
				...base.summary.rulesAr
			]
		}
	};
})();

const integrationTm = (() => {
	const base = adaptPhysicsLessonForTrack(
		SHARED_LESSONS_2AS_T3[4],
		'2as_tm',
		't3_integration'
	);
	return {
		...base,
		order: 3,
		titleAr: 'إدماج وحصيلة السنة الثانية ثانوي (2AS TM) والتحضير لـ 3AS',
		objectives: [
			'حل مواضيع اختبار شاملة بمقاييس شعبة تقني رياضي تدمج الطاقة الدورانية والتحريض والتيار المتناوب والعدسات والمعايرة'
		],
		keywordsAr: ['إدماج', 'اختبار 2AS TM', 'الحركة الدورانية', 'التحريض الكهرومغناطيسي']
	};
})();

export const PHYSICS_LESSONS_2AS_TM_T3: PhysicsInteractiveLessonData[] = [
	organicCombinedTm,
	thinLensesCombinedTm,
	integrationTm
];
