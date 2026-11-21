import type { PlatformModuleManifest } from '../types';

export const usersBillingModule: PlatformModuleManifest = {
	id: 'users-billing',
	version: '5.0.0',
	tier: 'core',
	category: 'commerce',
	nameAr: 'الحسابات والاشتراكات والفوترة',
	nameFr: 'Comptes, Abonnements & Facturation',
	descriptionAr:
		'إدارة المستخدمين والجلسات والصلاحيات، أكواد التفعيل (القسائم)، الدفع عبر Chargily / CCP، وسجل الإشعارات.',
	icon: 'Users',
	routePrefixes: [
		'/auth',
		'/student/activate',
		'/admin/users',
		'/admin/vouchers',
		'/admin/notifications',
		'/api/payments'
	],
	hardDependencies: [],
	softDependencies: ['curriculum-core'],
	adminNav: [
		{ id: 'admin-vouchers', labelAr: 'أكواد التفعيل والاشتراكات', href: '/admin/vouchers', icon: 'Ticket', order: 80 },
		{ id: 'admin-notifications', labelAr: 'الإشعارات العامة', href: '/admin/notifications', icon: 'Bell', order: 85 },
		{
			id: 'admin-users',
			labelAr: 'المستخدمون والصلاحيات',
			href: '/admin/users',
			icon: 'Users',
			order: 90,
			allowedRoles: ['superadmin']
		},
		{
			id: 'admin-modules',
			labelAr: 'إدارة وحدات المنصة',
			href: '/admin/modules',
			icon: 'Blocks',
			order: 95,
			allowedRoles: ['superadmin', 'admin']
		}
	],
	studentNav: [
		{ id: 'student-activate', labelAr: 'الاشتراك والقسائم', href: '/student/activate', icon: 'CreditCard', order: 40 }
	],
	events: {
		publishes: ['subscription.activated'],
		subscribes: []
	},
	defaultConfig: {
		allowPublicRegistration: true,
		defaultPlanDays: 30
	},
	ownedTables: [
		'users',
		'sessions',
		'voucher_codes',
		'voucher_redemptions',
		'payment_orders',
		'billing_audit_logs',
		'notifications'
	]
};
