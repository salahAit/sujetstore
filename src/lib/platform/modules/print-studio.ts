import type { PlatformModuleManifest } from '../types';

export const printStudioModule: PlatformModuleManifest = {
	id: 'print-studio',
	version: '5.0.0',
	tier: 'optional',
	category: 'authoring',
	nameAr: 'استوديو الطباعة المركزية (Typst)',
	nameFr: 'Studio d’Impression Typst',
	descriptionAr:
		'محرك توليد ملفات PDF عالية الدقة باستخدام Typst مع قوالب التنسيق المركزية والهوية البصرية الرسمية والعلامات المائية.',
	icon: 'Printer',
	routePrefixes: ['/admin/print-studio', '/api/generate-pdf', '/generated'],
	hardDependencies: ['curriculum-core'],
	softDependencies: ['sujet-builder'],
	adminNav: [
		{ id: 'admin-print-studio', labelAr: 'استوديو الطباعة (Typst)', href: '/admin/print-studio', icon: 'Printer', order: 52 }
	],
	studentNav: [],
	events: {
		publishes: [],
		subscribes: []
	},
	defaultConfig: {
		defaultPaper: 'a4',
		watermarkEnabled: true,
		qrVerification: true
	},
	ownedTables: ['typst_style_profiles']
};
