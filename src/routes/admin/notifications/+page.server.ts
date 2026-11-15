import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentSqlite, usersDatabase, userSchema } from '#lib/server/db';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const notifications = await usersDatabase
		.select()
		.from(userSchema.notifications)
		.orderBy(desc(userSchema.notifications.id))
		.limit(50);

	const documents = contentSqlite
		.query('SELECT id, title_ar, title FROM documents WHERE is_published = 1 ORDER BY id DESC LIMIT 50')
		.all();

	return {
		notifications,
		documents
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const fd = await request.formData();
		const title = ((fd.get('title') as string | null) || '').trim();
		const body = ((fd.get('body') as string | null) || '').trim() || null;
		const typeRaw = (fd.get('type') as string | null) || 'announcement';
		const type = ['new_doc', 'announcement', 'update'].includes(typeRaw)
			? (typeRaw as 'new_doc' | 'announcement' | 'update')
			: 'announcement';
		const docIdRaw = Number(fd.get('documentId') || 0);

		if (title.length < 3) {
			return fail(400, { error: 'عنوان الإشعار مطلوب (3 أحرف على الأقل)' });
		}

		await usersDatabase.insert(userSchema.notifications).values({
			title,
			body,
			type,
			documentId: docIdRaw > 0 ? docIdRaw : null
		});

		return { created: true };
	},

	delete: async ({ request, locals }) => {
		if (locals.user?.role === 'editor') {
			return fail(403, { error: 'المحرّر لا يملك صلاحية حذف الإشعارات' });
		}
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'معرف الإشعار مفقود' });
		await usersDatabase.delete(userSchema.notifications).where(eq(userSchema.notifications.id, id));
		return { deleted: true };
	}
};
