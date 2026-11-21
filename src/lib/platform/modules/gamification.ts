import type { PlatformModuleManifest } from '../types';

export const gamificationModule: PlatformModuleManifest = {
	id: 'gamification',
	version: '5.0.0',
	tier: 'optional',
	category: 'engagement',
	nameAr: 'التحفيز والنقاط والشارات (XP)',
	nameFr: 'Gamification, Points XP & Badges',
	descriptionAr:
		'منح نقاط الخبرة (XP)، تتبع سلسلة الأيام المتتالية (Streaks)، وفتح الشارات والإنجازات تلقائياً عند إتمام التمارين والفيديوهات.',
	icon: 'Trophy',
	routePrefixes: ['/achievements', '/api/gamification'],
	hardDependencies: ['users-billing'],
	softDependencies: ['quiz-engine', 'video-studio'],
	adminNav: [],
	studentNav: [
		{ id: 'student-achievements', labelAr: 'الإنجازات والشارات', href: '/achievements', icon: 'Trophy', order: 60 }
	],
	events: {
		publishes: [],
		subscribes: ['quiz.submitted', 'video.cue_answered']
	},
	defaultConfig: {
		quizBaseXp: 10,
		perfectScoreBonusXp: 15,
		videoCueCorrectXp: 5
	},
	ownedTables: ['badge_definitions', 'user_badges', 'user_points']
};
