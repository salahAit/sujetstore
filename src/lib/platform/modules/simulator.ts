import type { PlatformModuleManifest } from '../types';

export const simulatorModule: PlatformModuleManifest = {
	id: 'simulator',
	version: '5.0.0',
	tier: 'optional',
	category: 'tools',
	nameAr: 'حاسبة المعدل الفصلي والشهادات (BEM/BAC)',
	nameFr: 'Simulateur de Moyenne (BEM / BAC)',
	descriptionAr:
		'أداة تفاعلية لحساب المعدل الفصلي ومعدل شهادتي التعليم المتوسط والبكالوريا وفق المعاملات الرسمية لكل شعبة.',
	icon: 'Calculator',
	routePrefixes: ['/simulator'],
	hardDependencies: ['curriculum-core'],
	softDependencies: [],
	adminNav: [],
	studentNav: [
		{ id: 'student-simulator', labelAr: 'حاسبة المعدل', href: '/simulator', icon: 'Calculator', order: 50 }
	],
	events: {
		publishes: [],
		subscribes: []
	},
	defaultConfig: {
		supportBem: true,
		supportBac: true,
		supportTrimester: true
	},
	ownedTables: []
};
