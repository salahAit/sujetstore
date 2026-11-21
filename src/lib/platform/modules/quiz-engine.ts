import type { PlatformModuleManifest } from '../types';

export const quizEngineModule: PlatformModuleManifest = {
	id: 'quiz-engine',
	version: '5.0.0',
	tier: 'essential',
	category: 'assessment',
	nameAr: 'محرك التمارين التفاعلية وبنك الأسئلة',
	nameFr: 'Moteur de Quiz & Banque de Questions',
	descriptionAr:
		'منظومة الاختبارات التفاعلية (14 نمط سؤال مع تصحيح آلي خادمي ودعم KaTeX)، بنك الأسئلة الشجري، وتحليلات الأداء.',
	icon: 'Brain',
	routePrefixes: [
		'/quizzes',
		'/admin/quizzes',
		'/admin/question-bank',
		'/admin/quiz-analytics',
		'/api/quizzes'
	],
	hardDependencies: ['curriculum-core'],
	softDependencies: ['gamification', 'remediation'],
	adminNav: [
		{ id: 'admin-quizzes', labelAr: 'التمارين التفاعلية', href: '/admin/quizzes', icon: 'Brain', order: 40 },
		{ id: 'admin-question-bank', labelAr: 'بنك الأسئلة التفاعلية', href: '/admin/question-bank', icon: 'Database', order: 45 },
		{ id: 'admin-quiz-analytics', labelAr: 'إحصائيات التمارين', href: '/admin/quiz-analytics', icon: 'BarChart3', order: 65 }
	],
	studentNav: [],
	events: {
		publishes: ['quiz.submitted'],
		subscribes: []
	},
	defaultConfig: {
		defaultPassingScore: 60,
		serverSideGradingOnly: true
	},
	ownedTables: ['quizzes', 'question_categories', 'questions', 'quiz_questions', 'quiz_attempts', 'attempt_answers']
};
