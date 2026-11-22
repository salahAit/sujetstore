import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface SubjectBuildDef {
	id: string;
	entry: string;
	statsModule: string;
	tracksKey: string;
	lessonsKey: string;
	templatesKey: string;
}

const ALL_SUBJECTS: readonly SubjectBuildDef[] = [
	{
		id: 'math',
		entry: 'src/lib/kernel/entries/math.ts',
		statsModule: 'src/lib/modules/MathTemplates/index.ts',
		tracksKey: 'GRADE_METADATA',
		lessonsKey: 'ALL_LESSONS',
		templatesKey: 'ALL_TEMPLATES'
	},
	{
		id: 'physics',
		entry: 'src/lib/kernel/entries/physics.ts',
		statsModule: 'src/lib/modules/PhysicsTemplates/index.ts',
		tracksKey: 'PHYSICS_GRADE_METADATA',
		lessonsKey: 'ALL_PHYSICS_LESSONS',
		templatesKey: 'ALL_PHYSICS_TEMPLATES'
	},
	{
		id: 'sciences',
		entry: 'src/lib/kernel/entries/sciences.ts',
		statsModule: 'src/lib/modules/SciencesTemplates/index.ts',
		tracksKey: 'SCIENCES_GRADE_METADATA',
		lessonsKey: 'ALL_SCIENCES_LESSONS',
		templatesKey: 'ALL_SCIENCES_TEMPLATES'
	},
	{
		id: 'arabic',
		entry: 'src/lib/kernel/entries/arabic.ts',
		statsModule: 'src/lib/modules/ArabicTemplates/index.ts',
		tracksKey: 'ALL_ARABIC_TRACK_IDS',
		lessonsKey: 'ALL_ARABIC_LESSONS',
		templatesKey: 'ALL_ARABIC_TEMPLATES'
	},
	{
		id: 'english',
		entry: 'src/lib/kernel/entries/english.ts',
		statsModule: 'src/lib/modules/EnglishTemplates/index.ts',
		tracksKey: 'ALL_ENGLISH_TRACK_IDS',
		lessonsKey: 'ALL_ENGLISH_LESSONS',
		templatesKey: 'ALL_ENGLISH_TEMPLATES'
	},
	{
		id: 'french',
		entry: 'src/lib/kernel/entries/french.ts',
		statsModule: 'src/lib/modules/FrenchTemplates/index.ts',
		tracksKey: 'ALL_FRENCH_TRACK_IDS',
		lessonsKey: 'ALL_FRENCH_LESSONS',
		templatesKey: 'ALL_FRENCH_TEMPLATES'
	},
	{
		id: 'islamic',
		entry: 'src/lib/kernel/entries/islamic.ts',
		statsModule: 'src/lib/modules/IslamicTemplates/index.ts',
		tracksKey: 'ALL_ISLAMIC_TRACK_IDS',
		lessonsKey: 'ALL_ISLAMIC_LESSONS',
		templatesKey: 'ALL_ISLAMIC_TEMPLATES'
	},
	{
		id: 'history',
		entry: 'src/lib/kernel/entries/history.ts',
		statsModule: 'src/lib/modules/HistoryGeoTemplates/index.ts',
		tracksKey: 'ALL_HISTORY_TRACK_IDS',
		lessonsKey: 'ALL_HISTORY_LESSONS',
		templatesKey: 'ALL_HISTORY_TEMPLATES'
	},
	{
		id: 'spanish',
		entry: 'src/lib/kernel/entries/spanish.ts',
		statsModule: 'src/lib/modules/SpanishTemplates/index.ts',
		tracksKey: 'ALL_SPANISH_TRACK_IDS',
		lessonsKey: 'ALL_SPANISH_LESSONS',
		templatesKey: 'ALL_SPANISH_TEMPLATES'
	},
	{
		id: 'german',
		entry: 'src/lib/kernel/entries/german.ts',
		statsModule: 'src/lib/modules/GermanTemplates/index.ts',
		tracksKey: 'ALL_GERMAN_TRACK_IDS',
		lessonsKey: 'ALL_GERMAN_LESSONS',
		templatesKey: 'ALL_GERMAN_TEMPLATES'
	},
	{
		id: 'italian',
		entry: 'src/lib/kernel/entries/italian.ts',
		statsModule: 'src/lib/modules/ItalianTemplates/index.ts',
		tracksKey: 'ALL_ITALIAN_TRACK_IDS',
		lessonsKey: 'ALL_ITALIAN_LESSONS',
		templatesKey: 'ALL_ITALIAN_TEMPLATES'
	}
];

const OUT_DIR = resolve('plugins/subjects');
const MANIFEST_PATH = resolve(OUT_DIR, 'manifest.json');

interface ManifestEntry {
	id: string;
	tracks: number;
	lessons: number;
	templates: number;
	sizeBytes: number;
	builtAt: string;
	elapsedMs: number;
}

async function buildOne(def: SubjectBuildDef, includeStats: boolean): Promise<ManifestEntry> {
	const t0 = performance.now();
	const res = await Bun.build({
		entrypoints: [resolve(def.entry)],
		outdir: OUT_DIR,
		naming: `${def.id}.js`,
		target: 'bun',
		format: 'esm',
		minify: true,
		sourcemap: 'none',
		external: ['bun', 'bun:sqlite']
	});

	if (!res.success) {
		const msgs = res.logs.map((l) => l.message).join('\n');
		throw new Error(`Failed building subject plugin "${def.id}":\n${msgs}`);
	}

	const outPath = resolve(OUT_DIR, `${def.id}.js`);
	const sizeBytes = statSync(outPath).size;

	let tracks = 0;
	let lessons = 0;
	let templates = 0;

	if (includeStats) {
		const mod = (await import(resolve(def.statsModule))) as Record<string, any>;
		const tracksVal = mod[def.tracksKey];
		tracks = Array.isArray(tracksVal) ? tracksVal.length : Object.keys(tracksVal || {}).length;
		lessons = Array.isArray(mod[def.lessonsKey]) ? mod[def.lessonsKey].length : 0;
		templates = Array.isArray(mod[def.templatesKey]) ? mod[def.templatesKey].length : 0;
	}

	const elapsedMs = Math.round(performance.now() - t0);
	return {
		id: def.id,
		tracks,
		lessons,
		templates,
		sizeBytes,
		builtAt: new Date().toISOString(),
		elapsedMs
	};
}

async function main() {
	const tTotal = performance.now();
	const cliArgs = process.argv.slice(2).filter((a) => !a.startsWith('-'));
	const skipStats = process.argv.includes('--fast');

	const targets =
		cliArgs.length > 0
			? ALL_SUBJECTS.filter((s) => cliArgs.includes(s.id))
			: [...ALL_SUBJECTS];

	if (targets.length === 0) {
		throw new Error(
			`Unknown subject(s): ${cliArgs.join(', ')}. Valid: ${ALL_SUBJECTS.map((s) => s.id).join(', ')}`
		);
	}

	mkdirSync(OUT_DIR, { recursive: true });

	let existingSubjects: Record<string, ManifestEntry> = {};
	if (existsSync(MANIFEST_PATH)) {
		try {
			const prev = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) as {
				subjects?: Record<string, ManifestEntry>;
			};
			existingSubjects = prev.subjects || {};
		} catch {}
	}

	const built = await Promise.all(targets.map((def) => buildOne(def, !skipStats)));

	for (const entry of built) {
		if (skipStats && existingSubjects[entry.id]) {
			entry.tracks = existingSubjects[entry.id].tracks;
			entry.lessons = existingSubjects[entry.id].lessons;
			entry.templates = existingSubjects[entry.id].templates;
		}
		existingSubjects[entry.id] = entry;
		console.log(
			`  ✓ plugins/subjects/${entry.id}.js (${(entry.sizeBytes / 1024 / 1024).toFixed(2)} MB) built in ${entry.elapsedMs}ms`
		);
	}

	writeFileSync(
		MANIFEST_PATH,
		JSON.stringify(
			{
				updatedAt: new Date().toISOString(),
				subjects: existingSubjects
			},
			null,
			2
		),
		'utf-8'
	);

	const totalMs = Math.round(performance.now() - tTotal);
	const totalMb = (
		built.reduce((acc, e) => acc + e.sizeBytes, 0) /
		1024 /
		1024
	).toFixed(2);
	console.log(
		`[build-subject-plugins] Built ${built.length} plugin(s) (${totalMb} MB templates-only, 0 lessons) in ${totalMs}ms`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
