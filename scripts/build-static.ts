import { exportStaticPublicSite } from '#lib/server/static-exporter';

async function main() {
	console.log('🚀 بدء توليد النسخة الثابتة بدون قاعدة بيانات (Zero-Runtime Static Export)...');
	const result = await exportStaticPublicSite();
	console.log(
		`✅ تم التوليد بنجاح في ${result.outputDir}: ${result.pagesCount} صفحة، ${result.dataFilesCount} ملف بيانات، ${result.assetsCount} ملف وسائط، ${result.searchItemsCount} عنصر بحث.`
	);
	if (result.warnings.length > 0) {
		console.warn('⚠️ تنبيهات التوليد:', result.warnings);
	}
	console.log(`STATIC_EXPORT_JSON:${JSON.stringify(result)}`);
}

main().catch((err) => {
	console.error('❌ فشل التوليد الثابت:', err);
	process.exit(1);
});
