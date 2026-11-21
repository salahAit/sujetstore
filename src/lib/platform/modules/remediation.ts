import type { PlatformModuleManifest } from '../types';

export const remediationModule: PlatformModuleManifest = {
	id: 'remediation',
	version: '5.0.0',
	tier: 'optional',
	category: 'learning',
	nameAr: 'دفتر الأخطاء والمعالجة البيداغوجية',
	nameFr: 'Carnet d’Erreurs & Remédiation',
	descriptionAr:
		'تسجيل تلقائي للأسئلة الخاطئة في التمارين والفيديوهات التفاعلية، واقتراح جلسات مراجعة موجّهة حتى إتقانها وحلها.',
	icon: 'BookMarked',
	routePrefixes: ['/student/mistakes', '/api/student/mistakes'],
	hardDependencies: ['users-billing', 'quiz-engine'],
	softDependencies: ['video-studio'],
	adminNav: [],
	studentNav: [
		{
			id: 'student-mistakes',
			labelAr: 'دفتر الأخطاء',
			href: '/student/mistakes',
			icon: 'BookMarked',
			order: 20,
			badgeKey: 'unresolvedMistakesCount'
		}
	],
	events: {
		publishes: [],
		subscribes: ['quiz.submitted', 'video.cue_answered']
	},
	defaultConfig: {
		autoResolveOnCorrect: true,
		maxDailyRemediationItems: 25
	},
	ownedTables: ['user_mistakes']
};
