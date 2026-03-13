import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function main() {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await context.newPage();

	const outDir = path.resolve(import.meta.dir, '../book/images');
	if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

	console.log('Logging in...');
	await page.goto('http://localhost:5173/admin/login');
	await page.fill('#username', 'admin');
	await page.fill('#password', 'admin1234');
	await page.click('button[type="submit"]');
	await page.waitForTimeout(2000); // Wait for redirect and session

	console.log('Capturing Question Bank...');
	await page.goto('http://localhost:5173/admin/question-bank');
	await page.waitForTimeout(2000); // Wait for data and stats
	await page.screenshot({ path: path.join(outDir, 'question-bank.png'), fullPage: true });

	console.log('Capturing Preview Modal...');
	const previewBtn = page.locator('button[title="معاينة"]').first();
	if (await previewBtn.isVisible()) {
		await previewBtn.click();
		await page.waitForTimeout(1000); // wait for modal animation
		await page.screenshot({ path: path.join(outDir, 'preview-modal.png') });
		// close preview
		await page.keyboard.press('Escape');
		await page.waitForTimeout(500);
	}

	console.log('Capturing Quizzes List...');
	await page.goto('http://localhost:5173/admin/quizzes');
	await page.waitForTimeout(2000);
	await page.screenshot({ path: path.join(outDir, 'quizzes.png'), fullPage: true });

	console.log('Capturing Quiz Builder...');
	const builderLink = page.locator('a[title="بناء الأسئلة"]').first();
	if (await builderLink.isVisible()) {
		await builderLink.click();
		await page.waitForTimeout(2000);
		await page.screenshot({ path: path.join(outDir, 'quiz-builder.png'), fullPage: true });
	} else {
        // Fallback to a known quiz ID if available
        await page.goto('http://localhost:5173/admin/quizzes/1/builder');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(outDir, 'quiz-builder.png'), fullPage: true });
    }

	await browser.close();
	console.log('Done screenshots!');
}

main().catch(console.error);
