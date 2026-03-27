/**
 * TypstWasmEngine — Client-side Typst compilation using WASM
 * Compiles Typst documents to SVG/PDF directly in the browser.
 * All templates are inlined into a single document to avoid import/access issues.
 */

let engine: any = null;
let initialized = false;
let initializing = false;
let templateFilesLoaded = false;
let isCompiling = false;

// Cached template contents (inlined into the main document)
let cachedTypFiles: Record<string, string> = {};
let cachedBinaryFiles: Record<string, string> = {};

export interface CompileResult {
	success: boolean;
	svgPages?: string[];
	pdfData?: Uint8Array;
	error?: string;
}

/**
 * Initialize the Typst WASM engine (lazy, only once)
 */
export async function initTypstEngine(): Promise<void> {
	if (initialized) return;
	if (initializing) {
		// Wait for existing initialization
		while (initializing) await new Promise((r) => setTimeout(r, 100));
		return;
	}
	initializing = true;

	try {
		const { $typst } = await import('@myriaddreamin/typst.ts');

		$typst.setCompilerInitOptions({
			getModule: () => '/wasm/typst_ts_web_compiler_bg.wasm'
		});

		$typst.setRendererInitOptions({
			getModule: () => '/wasm/typst_ts_renderer_bg.wasm'
		});

		engine = $typst;
		initialized = true;
		console.log('[TypstWASM] Engine initialized');
	} catch (err) {
		console.error('[TypstWASM] Init failed:', err);
		throw err;
	} finally {
		initializing = false;
	}
}

/**
 * Load template files from server and cache them.
 */
export async function loadTemplateFiles(): Promise<void> {
	if (templateFilesLoaded) return;

	// Try IndexedDB cache first
	const cached = await loadFromCache();
	if (cached) {
		cachedTypFiles = cached.typFiles;
		cachedBinaryFiles = cached.binaryFiles;
		console.log('[TypstWASM] Templates loaded from cache');
	} else {
		const res = await fetch('/api/sujet-builder/typst-files');
		const data = await res.json();
		if (!data.success) throw new Error(data.error || 'Failed to load templates');

		cachedTypFiles = data.typFiles;
		cachedBinaryFiles = data.binaryFiles;

		await saveToCache({ typFiles: cachedTypFiles, binaryFiles: cachedBinaryFiles });
		console.log('[TypstWASM] Templates fetched and cached');
	}

	templateFilesLoaded = true;
}

/**
 * Build a self-contained Typst document by inlining all templates.
 * This avoids #import statements which the WASM compiler can't resolve.
 */
/**
 * Prepare the WASM shadow filesystem by mapping all cached files.
 * For the active template, we dynamically inject the JSON data and isSolution flag.
 * Returns the mainFilePath to execute.
 */
async function prepareShadowFileSystem(documentData: any, isSolution: boolean, templateId: string): Promise<string> {
	if (!engine) throw new Error('Engine not initialized');

	// 1. Map binary files (images, etc)
	for (const [path, base64] of Object.entries(cachedBinaryFiles)) {
		try {
			const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
			engine.mapShadow(`/${path}`, binary);
			const filename = path.split('/').pop();
			if (filename) engine.mapShadow(`/${filename}`, binary);
		} catch (e) {
			console.warn(`[TypstWASM] Failed to map binary file: ${path}`, e);
		}
	}

	// 2. Map Typst files
	for (const [path, content] of Object.entries(cachedTypFiles)) {
		let finalContent = content;
		
		// If this is the active template, inject the data natively
		if (path === `templates/${templateId}.typ`) {
			const jsonStr = JSON.stringify({ metadata: documentData.metadata, exercises: documentData.exercises });
			const escapedJson = jsonStr.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
			
			finalContent = finalContent.replace(
				/sys\.inputs\.at\("data"(?:,\s*default:\s*"\{?\}?")?\)/g,
				`"${escapedJson}"`
			);

			finalContent = `#let is-solution = ${isSolution}\n${finalContent}`;
		}

		try {
			const bytes = new TextEncoder().encode(finalContent);
			engine.mapShadow(`/${path}`, bytes);
		} catch (e) {
			console.warn(`[TypstWASM] Failed to map typ file: ${path}`, e);
		}
	}

	return `/templates/${templateId}.typ`;
}

/**
 * Compile a Typst document to SVG pages
 */
export async function compileToSvg(
	documentData: any,
	isSolution: boolean = false
): Promise<CompileResult> {
	if (isCompiling) {
		return { success: false, error: 'جاري الترجمة بالفعل...' };
	}

	isCompiling = true;

	try {
		await initTypstEngine();
		await loadTemplateFiles();

		try {
			engine.resetShadow();
		} catch {}

		const mainFilePath = await prepareShadowFileSystem(documentData, isSolution, 'middle/exam');

		console.log('[TypstWASM] Compiling SVG...');
		const svgStr: string = await engine.svg({ mainFilePath });

		const svgPages = [svgStr];

		console.log('[TypstWASM] SVG compiled successfully');
		return { success: true, svgPages };
	} catch (err: any) {
		const errMsg = typeof err === 'string' ? err : err?.message || String(err);
		console.error('[TypstWASM] Compilation error:', errMsg);
		return { success: false, error: errMsg };
	} finally {
		isCompiling = false;
	}
}

/**
 * Render directly to a DOM container (faster, incremental updates)
 */
export async function renderToDom(
	container: HTMLElement,
	documentData: any,
	isSolution: boolean = false,
	scale: number = 2.0
): Promise<CompileResult> {
	if (isCompiling) {
		return { success: false, error: 'جاري الترجمة بالفعل...' };
	}

	isCompiling = true;

	try {
		await initTypstEngine();
		await loadTemplateFiles();

		try {
			engine.resetShadow();
		} catch {}

		const mainFilePath = await prepareShadowFileSystem(documentData, isSolution, 'middle/exam');

		console.log('[TypstWASM] Rendering to DOM...');
		
		await engine.canvas(container, { 
			mainFilePath,
			pixelPerPt: scale * 2.5,
			backgroundColor: '#ffffff'
		});

		console.log('[TypstWASM] Canvas rendered successfully');
		return { success: true };
	} catch (err: any) {
		const errMsg = typeof err === 'string' ? err : err?.message || String(err);
		console.error('[TypstWASM] Render error:', errMsg);
		return { success: false, error: errMsg };
	} finally {
		isCompiling = false;
	}
}

/**
 * Compile to PDF (for download/print)
 */
export async function compileToPdf(
	documentData: any,
	isSolution: boolean = false,
	templateId: string = 'middle/exam'
): Promise<CompileResult> {
	if (isCompiling) {
		return { success: false, error: 'جاري الترجمة بالفعل...' };
	}

	isCompiling = true;

	try {
		await initTypstEngine();
		await loadTemplateFiles();

		try {
			engine.resetShadow();
		} catch {}

		const mainFilePath = await prepareShadowFileSystem(documentData, isSolution, templateId);

		const pdfData: Uint8Array = await engine.pdf({ mainFilePath });
		return { success: true, pdfData };
	} catch (err: any) {
		return { success: false, error: err?.message || String(err) };
	} finally {
		isCompiling = false;
	}
}

export function isEngineReady(): boolean {
	return initialized && templateFilesLoaded;
}

// ── IndexedDB Cache ──

const DB_NAME = 'typst-wasm-cache';
const DB_VERSION = 3; // Bumped to clear stale cache
const STORE_NAME = 'templates';

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			const db = request.result;
			// Delete old store if exists, create fresh
			if (db.objectStoreNames.contains(STORE_NAME)) {
				db.deleteObjectStore(STORE_NAME);
			}
			db.createObjectStore(STORE_NAME);
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function saveToCache(data: {
	typFiles: Record<string, string>;
	binaryFiles: Record<string, string>;
}): Promise<void> {
	try {
		const db = await openDB();
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		store.put(data, 'templateData');
		store.put(Date.now(), 'lastUpdated');
	} catch {}
}

async function loadFromCache(): Promise<{
	typFiles: Record<string, string>;
	binaryFiles: Record<string, string>;
} | null> {
	try {
		const db = await openDB();
		const tx = db.transaction(STORE_NAME, 'readonly');
		const store = tx.objectStore(STORE_NAME);
		return new Promise((resolve) => {
			const request = store.get('templateData');
			request.onsuccess = () => resolve(request.result || null);
			request.onerror = () => resolve(null);
		});
	} catch {
		return null;
	}
}

export async function clearCache(): Promise<void> {
	try {
		const db = await openDB();
		const tx = db.transaction(STORE_NAME, 'readwrite');
		tx.objectStore(STORE_NAME).clear();
		templateFilesLoaded = false;
	} catch {}
}
