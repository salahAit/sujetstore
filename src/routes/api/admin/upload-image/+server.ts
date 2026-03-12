import { json, error } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'static', 'uploads', 'images');
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST({ request }) {
    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
        await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !(file instanceof File)) {
        return json({ error: 'لم يتم تحديد ملف' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return json({ error: 'نوع الملف غير مدعوم. الأنواع المسموحة: PNG, JPEG, WebP, GIF, SVG' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
        return json({ error: 'حجم الملف يتجاوز 5 ميجابايت' }, { status: 400 });
    }

    const ext = path.extname(file.name) || '.png';
    const uniqueName = `${randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/images/${uniqueName}`;

    return json({ url: publicUrl, filename: file.name, size: file.size });
}
