import type { PlatformModuleManifest } from '../types';

export const sujetBuilderModule: PlatformModuleManifest = {
	id: 'sujet-builder',
	version: '5.0.0',
	tier: 'essential',
	category: 'authoring',
	nameAr: 'منشئ المواضيع وبنك التمارين المطبوعة',
	nameFr: 'Créateur de Sujets & Banque d’Exercices',
	descriptionAr:
		'محرر المواضيع والامتحانات الرسمية (SujetBuilder)، بنك التمارين المطبوعة القابلة لإعادة الاستخدام، وأرشيف المواضيع المنشأة.',
	icon: 'FilePlus2',
	routePrefixes: [
		'/admin/sujet-builder',
		'/admin/sujet-bank',
		'/admin/exercises',
		'/api/sujet-builder'
	],
	hardDependencies: ['curriculum-core'],
	softDependencies: ['print-studio'],
	adminNav: [
		{ id: 'admin-sujet-builder', labelAr: 'منشئ المواضيع', href: '/admin/sujet-builder', icon: 'FilePlus2', order: 35 },
		{ id: 'admin-exercises', labelAr: 'بنك التمارين المطبوعة', href: '/admin/exercises', icon: 'FileText', order: 55 },
		{ id: 'admin-sujet-bank', labelAr: 'بنك المواضيع المنشأة', href: '/admin/sujet-bank', icon: 'FilePlus2', order: 60 }
	],
	studentNav: [],
	events: {
		publishes: [],
		subscribes: []
	},
	defaultConfig: {
		autoArchiveGeneratedSujets: true
	},
	ownedTables: ['bank_exercises']
};
