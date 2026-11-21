import type { PlatformModuleManifest } from '../types';

export const lessonEditorModule: PlatformModuleManifest = {
	id: 'lesson-editor',
	version: '5.0.0',
	tier: 'optional',
	category: 'authoring',
	nameAr: 'محرر الدروس التفاعلية',
	nameFr: 'Éditeur de Leçons Interactives',
	descriptionAr:
		'بناء وعرض الدروس التفاعلية المنظمة (استكشف، القواعد والملخص، وتدرب) مع دعم المعادلات الرياضية KaTeX والربط مع الفيديوهات.',
	icon: 'BookOpenCheck',
	routePrefixes: ['/admin/lessons', '/api/admin/lessons'],
	hardDependencies: ['curriculum-core'],
	softDependencies: ['quiz-engine', 'video-studio'],
	adminNav: [
		{ id: 'admin-lessons', labelAr: 'الدروس التفاعلية', href: '/admin/lessons', icon: 'BookOpen', order: 50 }
	],
	studentNav: [],
	events: {
		publishes: [],
		subscribes: []
	},
	defaultConfig: {
		enableKatex: true,
		interactiveStepsDefault: true
	},
	ownedTables: []
};
