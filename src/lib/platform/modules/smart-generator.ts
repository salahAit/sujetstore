import type { PlatformModuleManifest } from '../types';

export const smartGeneratorModule: PlatformModuleManifest = {
	id: 'smart-generator',
	version: '5.0.0',
	tier: 'optional',
	category: 'learning',
	nameAr: 'المولّد الذكي للتمارين والمواضيع',
	nameFr: 'Générateur Intelligent d’Exercices',
	descriptionAr:
		'توليد سلاسل تدريبية ومواضيع مخصّصة حسب المادة والفصل ومستوى الصعوبة للتلاميذ مع إمكانية التصدير للطباعة.',
	icon: 'Sparkles',
	routePrefixes: ['/student/generator', '/api/generator'],
	hardDependencies: ['curriculum-core', 'quiz-engine'],
	softDependencies: ['remediation'],
	adminNav: [],
	studentNav: [
		{ id: 'student-generator', labelAr: 'المولّد الذكي', href: '/student/generator', icon: 'Sparkles', order: 30 }
	],
	events: {
		publishes: [],
		subscribes: []
	},
	defaultConfig: {
		maxQuestionsPerSheet: 20,
		premiumOnlyFullExam: false
	},
	ownedTables: []
};
