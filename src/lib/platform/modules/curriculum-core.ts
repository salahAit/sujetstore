import type { PlatformModuleManifest } from '../types';

export const curriculumCoreModule: PlatformModuleManifest = {
	id: 'curriculum-core',
	version: '5.0.0',
	tier: 'core',
	category: 'core',
	nameAr: 'النواة التعليمية والمنهاج',
	nameFr: 'Noyau Pédagogique & Programme',
	descriptionAr:
		'الهيكل الأساسي للمنهاج الجزائري: المراحل التعليمية، السنوات، الشعب، المواد، الوثائق، التحكم في الظهور، وقفل الموقع.',
	icon: 'GraduationCap',
	routePrefixes: [
		'/admin/levels',
		'/admin/years',
		'/admin/streams',
		'/admin/subjects',
		'/admin/documents',
		'/admin/visibility',
		'/admin/site-lock',
		'/documents'
	],
	hardDependencies: [],
	softDependencies: [],
	adminNav: [
		{ id: 'admin-home', labelAr: 'الرئيسية', href: '/admin', icon: 'LayoutDashboard', order: 1, exact: true },
		{ id: 'admin-site-lock', labelAr: 'قفل الموقع والحماية', href: '/admin/site-lock', icon: 'Lock', order: 5 },
		{ id: 'admin-visibility', labelAr: 'التحكم في الظهور والنشر', href: '/admin/visibility', icon: 'Eye', order: 10 },
		{ id: 'admin-levels', labelAr: 'المراحل التعليمية', href: '/admin/levels', icon: 'GraduationCap', order: 15 },
		{ id: 'admin-years', labelAr: 'المستويات الدراسية', href: '/admin/years', icon: 'CalendarDays', order: 20 },
		{ id: 'admin-streams', labelAr: 'الشعب الدراسية', href: '/admin/streams', icon: 'BookOpen', order: 25 },
		{ id: 'admin-subjects', labelAr: 'المواد الدراسية', href: '/admin/subjects', icon: 'BookOpen', order: 30 },
		{ id: 'admin-documents', labelAr: 'الوثائق المرفوعة', href: '/admin/documents', icon: 'FileText', order: 70 }
	],
	studentNav: [
		{ id: 'student-home', labelAr: 'لوحتي', href: '/student', icon: 'LayoutDashboard', order: 1, exact: true }
	],
	events: {
		publishes: ['document.downloaded'],
		subscribes: []
	},
	defaultConfig: {
		defaultAccessTier: 'public',
		enableStaticExport: true
	},
	ownedTables: [
		'education_levels',
		'years',
		'streams',
		'level_streams',
		'subjects',
		'stream_subjects',
		'year_subjects',
		'trimesters',
		'documents',
		'site_settings'
	]
};
