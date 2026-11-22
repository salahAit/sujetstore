// ============================================================================
// Server-Side ExamDocument -> WebExamPayload Serializer & Resolver
// Converts any SujetStore ExamDocument (generated or Official BAC) into a tiny
// (~2.5 KB gzipped) structured WebExamPayload for SmartExamReader.svelte,
// with /dev/shm RAM caching (< 0.3 ms warm hits).
// ============================================================================

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { contentSqlite } from './db';
import { subjectRegistry } from '../kernel';
import type { ExamDifficulty, ExamVariant } from '../kernel/types';
import type { ExamType, TrimesterId } from '../modules/SujetBuilder/types';
import { typstMathToKatex, typstProseToWebMarkdown } from './typst-math-to-katex';
import type {
	WebBlock,
	WebExamMetadata,
	WebExamPayload,
	WebExercise,
	WebLegendItem,
	WebPin,
	WebTableCell
} from '../types/web-exam';

const PROJECT_ROOT = resolve('.');
const WEB_EXAM_RAM_DIR = existsSync('/dev/shm')
	? '/dev/shm/sujetstore-web-exams'
	: '/tmp/sujetstore-web-exams';

interface ManifestHint {
	seed: number;
	variant?: ExamVariant;
	difficulty?: ExamDifficulty;
	trimesterId?: TrimesterId;
	docType?: ExamType;
	topicNumber?: 1 | 2;
}

let _manifestCache: Map<string, ManifestHint> | null = null;

function getManifestMap(): Map<string, ManifestHint> {
	if (_manifestCache) return _manifestCache;
	const map = new Map<string, ManifestHint>();
	const pipelineDir = join(PROJECT_ROOT, 'pipeline');
	if (existsSync(pipelineDir)) {
		try {
			for (const dir of readdirSync(pipelineDir)) {
				if (!dir.startsWith('generated_exams')) continue;
				const fullDir = join(pipelineDir, dir);
				try {
					if (!statSync(fullDir).isDirectory()) continue;
					for (const file of readdirSync(fullDir)) {
						if (!file.endsWith('.json') || !file.includes('manifest')) continue;
						const parsed = JSON.parse(readFileSync(join(fullDir, file), 'utf-8')) as {
							items?: Array<{
								slug?: string;
								seed?: number;
								variant?: ExamVariant;
								difficulty?: ExamDifficulty;
								trimesterId?: TrimesterId;
								docType?: ExamType;
								topicNumber?: 1 | 2;
							}>;
						};
						if (!Array.isArray(parsed.items)) continue;
						for (const item of parsed.items) {
							if (!item.slug || typeof item.seed !== 'number') continue;
							map.set(item.slug, {
								seed: item.seed,
								variant: item.variant,
								difficulty: item.difficulty,
								trimesterId: item.trimesterId,
								docType: item.docType,
								topicNumber: item.topicNumber
							});
						}
					}
				} catch {
					// Ignore single directory errors
				}
			}
		} catch {
			// Ignore
		}
	}
	_manifestCache = map;
	return map;
}

function deriveSeedFromSlug(slug: string): number {
	const hash = createHash('sha256').update(slug).digest();
	return (hash.readUInt32BE(0) % 90000) + 1000;
}

function inferVariantFromSlug(slug: string, docType: ExamType): ExamVariant {
	const lower = slug.toLowerCase();
	if (lower.includes('bac')) return 'bac_mock';
	if (lower.includes('bem')) return 'bem_mock';
	if (lower.includes('competency')) return 'competency_eval';
	if (lower.includes('cinq')) return 'cinq_mock';
	if (docType === 'test' || lower.includes('test')) return 'supervised_test';
	return 'trimester_exam';
}

function inferDifficulty(raw: string | null, slug: string): ExamDifficulty {
	if (raw === 'easy' || raw === 'medium' || raw === 'hard') return raw;
	if (slug.endsWith('-1')) return 'easy';
	if (slug.endsWith('-3')) return 'hard';
	return 'medium';
}

function detectLanguage(subjectId?: string): 'ar' | 'fr' | 'en' | 'es' {
	const s = (subjectId || '').toUpperCase();
	if (s.startsWith('ENG') || s.startsWith('LANG')) return 'en';
	if (s.startsWith('FRE')) return 'fr';
	if (s === 'LAN-SPA' || s.startsWith('SPA')) return 'es';
	return 'ar';
}

function normalizeWebImageSrc(rawSrc: string): {
	src: string;
	title?: string;
	pins: WebPin[];
	legend: WebLegendItem[];
} {
	let base = rawSrc.trim();
	let title: string | undefined;
	let pins: WebPin[] = [];
	let legend: WebLegendItem[] = [];

	const hashIdx = base.indexOf('#fig=');
	if (hashIdx >= 0) {
		const rawMeta = base.slice(hashIdx + 5);
		base = base.slice(0, hashIdx);
		try {
			const parsed = JSON.parse(decodeURIComponent(rawMeta)) as {
				title?: string;
				pins?: Array<{ num?: string | number; xPct?: number; yPct?: number; color?: string }>;
				legend?: Array<{ num?: string | number; label?: string }>;
			};
			if (parsed.title) title = typstProseToWebMarkdown(parsed.title);
			if (Array.isArray(parsed.pins)) {
				pins = parsed.pins
					.filter((p) => p && Number.isFinite(p.xPct) && Number.isFinite(p.yPct))
					.map((p) => ({
						num: String(p.num ?? ''),
						xPct: Number(p.xPct),
						yPct: Number(p.yPct),
						color: p.color || '#1d4ed8'
					}));
			}
			if (Array.isArray(parsed.legend)) {
				legend = parsed.legend
					.filter((it) => it && it.label)
					.map((it) => ({
						num: String(it.num ?? ''),
						label: typstProseToWebMarkdown(String(it.label))
					}));
			}
		} catch {
			// Ignore malformed fragment
		}
	}

	// Unwrap internal `/data/media/` or `/static/` prefixes back to clean public web URLs
	if (base.startsWith('/data/media/')) {
		base = '/' + base.slice('/data/media/'.length);
	} else if (base.startsWith('/static/')) {
		base = '/' + base.slice('/static/'.length);
	}

	// Prefer lightweight WebP for Nano Banana illustrations on mobile 4G
	base = base.replace(/^(\/documents\/illustrations\/.+)\.jpg$/i, '$1.webp');

	return { src: base, title, pins, legend };
}

function unescapeTypstString(s: string): string {
	return s
		.replace(/\\"/g, '"')
		.replace(/\\([#$<>@])/g, '$1')
		.replace(/\\\/\\\//g, '//')
		.replace(/\\\\/g, '\\');
}

function extractQuotedField(raw: string, fieldName: string): string {
	const re = new RegExp(`${fieldName}\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`, 's');
	const m = raw.match(re);
	return m ? unescapeTypstString(m[1]) : '';
}

function extractVocabPairs(raw: string): Array<{ word: string; meaning: string }> {
	const m = raw.match(/vocabulary\s*:\s*\(([\s\S]*?)\)\s*(?:,|\))/);
	if (!m || !m[1].trim()) return [];
	const pairs: Array<{ word: string; meaning: string }> = [];
	const pairRe = /\(\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*\)/g;
	for (const pm of m[1].matchAll(pairRe)) {
		pairs.push({
			word: unescapeTypstString(pm[1]),
			meaning: unescapeTypstString(pm[2])
		});
	}
	return pairs;
}

function parseFallbackTypstRaw(
	rawContent: string,
	lang: 'ar' | 'fr' | 'en' | 'es',
	answer?: string,
	mark?: string
): WebBlock {
	const trimmed = rawContent.trim();

	// 1. #quran-box(...)
	if (trimmed.includes('#quran-box(')) {
		return {
			type: 'quran_box',
			label: extractQuotedField(trimmed, 'label') || 'قال الله تعالى:',
			verses: extractQuotedField(trimmed, 'verses'),
			surah: extractQuotedField(trimmed, 'surah'),
			ayahRange: extractQuotedField(trimmed, 'ayah-range') || undefined,
			vocabulary: extractVocabPairs(trimmed),
			answer: answer ? typstProseToWebMarkdown(answer) : undefined,
			mark
		};
	}

	// 2. #hadith-box(...)
	if (trimmed.includes('#hadith-box(')) {
		return {
			type: 'hadith_box',
			label: extractQuotedField(trimmed, 'label') || 'السند النبوي الشريف:',
			narrator: extractQuotedField(trimmed, 'narrator'),
			text: extractQuotedField(trimmed, 'text-body') || extractQuotedField(trimmed, 'text'),
			source: extractQuotedField(trimmed, 'source'),
			vocabulary: extractVocabPairs(trimmed),
			answer: answer ? typstProseToWebMarkdown(answer) : undefined,
			mark
		};
	}

	// 3. #render-arabic-poem(...)
	if (trimmed.includes('#render-arabic-poem(')) {
		const titleMatch = trimmed.match(/#align\(center\)\[#text\([^)]*\)\[([^\]]+)\]\]/);
		const attrMatch = trimmed.match(/\[—\s*([^\]]+)\]\s*\]/);
		const numbered = !/numbered\s*:\s*false/.test(trimmed);
		const verses: Array<[string, string]> = [];
		const versesMatch = trimmed.match(/verses\s*:\s*\(([\s\S]*)\)\s*\)/);
		if (versesMatch) {
			// Each verse is `(((w1), (w2),), ((w3), (w4),))`
			const hemistichTupleRe = /\(\s*((?:\(\s*"(?:\\.|[^"\\])*"\s*,\s*"(?:\\.|[^"\\])*"\s*,\s*"(?:normal|ul|paren)"\s*\)\s*,?\s*)+)\)/g;
			const hemistichs: string[] = [];
			for (const hm of versesMatch[1].matchAll(hemistichTupleRe)) {
				const words: string[] = [];
				const wordRe = /\(\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*,\s*"(normal|ul|paren)"\s*\)/g;
				for (const wm of hm[1].matchAll(wordRe)) {
					const fullWord = unescapeTypstString(wm[1]) + unescapeTypstString(wm[2]);
					const style = wm[3];
					if (style === 'ul') words.push(`[[${fullWord}]]`);
					else if (style === 'paren') words.push(`((${fullWord}))`);
					else words.push(fullWord);
				}
				if (words.length > 0) hemistichs.push(words.join(' '));
			}
			for (let i = 0; i + 1 < hemistichs.length; i += 2) {
				verses.push([hemistichs[i], hemistichs[i + 1]]);
			}
		}
		const vocab: Array<{ word: string; meaning: string }> = [];
		const vocabLineMatch = trimmed.match(/#strong\[شرح المفردات:\]\s*([^\]]+)\]/);
		if (vocabLineMatch) {
			for (const piece of vocabLineMatch[1].split('—')) {
				const kv = piece.match(/#strong\[([^\]]+)\]\s*:\s*(.+)$/);
				if (kv) vocab.push({ word: unescapeTypstString(kv[1].trim()), meaning: unescapeTypstString(kv[2].trim()) });
			}
		}
		return {
			type: 'arabic_poem',
			title: titleMatch ? unescapeTypstString(titleMatch[1]) : undefined,
			numbered,
			verses,
			source: attrMatch ? unescapeTypstString(attrMatch[1]) : undefined,
			vocabulary: vocab
		};
	}

	// 4. #block[...] prose passage box (Arabic / Islamic / French / English)
	if (trimmed.startsWith('#block(')) {
		const openBracket = trimmed.indexOf('[\n');
		const inner = openBracket >= 0 ? trimmed.slice(openBracket + 2, trimmed.lastIndexOf(']')).trim() : trimmed;
		let rest = inner;

		let title: string | undefined;
		const t1 = rest.match(/^#align\(center\)\[#text\([^)]*\)\[([^\]]+)\]\]\s*(?:#v\([^)]*\))?\s*/);
		const t2 = rest.match(/^#text\([^)]*weight:\s*"bold"[^)]*\)\[([^\]]+)\]\s*(?:#v\([^)]*\))?\s*/);
		if (t1) {
			title = unescapeTypstString(t1[1]);
			rest = rest.slice(t1[0].length);
		} else if (t2) {
			title = unescapeTypstString(t2[1]);
			rest = rest.slice(t2[0].length);
		}

		const vocab: Array<{ word: string; meaning: string }> = [];
		const vocabIdx = rest.search(/#line\(length:\s*100%/);
		if (vocabIdx >= 0) {
			const vocabTail = rest.slice(vocabIdx);
			rest = rest.slice(0, vocabIdx).trim();
			const vRe = /#strong\[([^\]]+)\]\s*:\s*([^|—\]\n]+)/g;
			for (const vm of vocabTail.matchAll(vRe)) {
				const w = unescapeTypstString(vm[1].trim());
				if (w === 'شرح المفردات:' || w === 'Lexique :' || w === 'Glossary:' || w === 'Glosario :') continue;
				vocab.push({ word: w, meaning: unescapeTypstString(vm[2].trim()) });
			}
		}

		let source: string | undefined;
		const srcMatch = rest.match(/(?:#v\([^)]*\)\s*)?#align\((?:left|right)\)\[#text\([^)]*\)\[—\s*([^\]]+)\]\]\s*$/);
		if (srcMatch) {
			source = unescapeTypstString(srcMatch[1]);
			rest = rest.slice(0, srcMatch.index).trim();
		}

		const paragraphs = rest
			.split(/\n\s*\n/)
			.map((p) =>
				typstProseToWebMarkdown(
					p
						.replace(/^#h\([^)]*\);?\s*/, '')
						.replace(/^#strong\[\(§\d+\)\]\s*/, '')
						.trim()
				)
			)
			.filter(Boolean);

		return {
			type: 'passage_box',
			lang,
			title,
			paragraphs,
			numberedParagraphs: /#strong\[\(§1\)\]/.test(inner),
			source,
			vocabulary: vocab
		};
	}

	// Generic fallback: strip remaining Typst directives into clean prose
	return {
		type: 'text',
		content: typstProseToWebMarkdown(trimmed.replace(/#[a-zA-Z-]+\([^)]*\);?/g, '')),
		answer: answer ? typstProseToWebMarkdown(answer) : undefined,
		mark
	};
}

function serializeTableCell(cell: any): WebTableCell {
	if (typeof cell === 'string') {
		return { content: typstProseToWebMarkdown(cell) };
	}
	if (cell && typeof cell === 'object') {
		return {
			content: typstProseToWebMarkdown(String(cell.content ?? '')),
			answer: cell.answer !== undefined && cell.answer !== '' ? typstProseToWebMarkdown(String(cell.answer)) : undefined,
			mark: cell.mark !== undefined && cell.mark !== '' ? String(cell.mark) : undefined,
			colspan: typeof cell.colspan === 'number' ? cell.colspan : undefined,
			rowspan: typeof cell.rowspan === 'number' ? cell.rowspan : undefined,
			bold: Boolean(cell.bold)
		};
	}
	return { content: '' };
}

function serializeBlock(block: any, lang: 'ar' | 'fr' | 'en' | 'es'): WebBlock | null {
	if (!block || typeof block !== 'object') return null;
	const mark = block.mark !== undefined && block.mark !== '' ? String(block.mark) : undefined;

	switch (block.type) {
		case 'text':
			return {
				type: 'text',
				content: typstProseToWebMarkdown(block.content),
				answer: block.answer ? typstProseToWebMarkdown(block.answer) : undefined,
				mark
			};

		case 'math':
			return {
				type: 'math',
				latex: typstMathToKatex(String(block.content ?? '')),
				display: Boolean(block.display ?? true)
			};

		case 'table': {
			const headers = Array.isArray(block.headers) ? block.headers.map(serializeTableCell) : [];
			let rows: WebTableCell[][] = [];
			if (Array.isArray(block.rows) && block.rows.length > 0) {
				rows = block.rows.map((r: any) => (Array.isArray(r) ? r.map(serializeTableCell) : []));
			} else if (Array.isArray(block.cells) && block.cells.length > 0) {
				const colCount = Math.max(1, headers.length);
				for (let i = 0; i < block.cells.length; i += colCount) {
					rows.push(block.cells.slice(i, i + colCount).map(serializeTableCell));
				}
			}
			return {
				type: 'table',
				headers,
				rows,
				align: block.align
			};
		}

		case 'true_false':
			return {
				type: 'true_false',
				items: Array.isArray(block.items)
					? block.items.map((it: any) => ({
							q: typstProseToWebMarkdown(String(it?.q ?? '')),
							a: typstProseToWebMarkdown(String(it?.a ?? '')),
							c: it?.c ? typstProseToWebMarkdown(String(it.c)) : undefined,
							mark: it?.mark !== undefined && it?.mark !== '' ? String(it.mark) : undefined
						}))
					: []
			};

		case 'multiple_choice':
			return {
				type: 'multiple_choice',
				groups: Array.isArray(block.groups)
					? block.groups.map((g: any) => ({
							header: typstProseToWebMarkdown(String(g?.header ?? '')),
							options: Array.isArray(g?.options)
								? g.options.map((o: any) => typstProseToWebMarkdown(String(o ?? '')))
								: [],
							correct: typstProseToWebMarkdown(String(g?.correct ?? '')),
							mark: g?.mark !== undefined && g?.mark !== '' ? String(g.mark) : undefined
						}))
					: []
			};

		case 'diagram_flow':
			return {
				type: 'diagram_flow',
				flow: [
					typstProseToWebMarkdown(String(block.flow?.[0] ?? '')),
					typstProseToWebMarkdown(String(block.flow?.[1] ?? '')),
					typstProseToWebMarkdown(String(block.flow?.[2] ?? ''))
				],
				mark
			};

		case 'labeling':
			return {
				type: 'labeling',
				labels: Array.isArray(block.labels)
					? block.labels.map((l: any) => typstProseToWebMarkdown(String(l ?? '')))
					: [],
				mark
			};

		case 'image': {
			if (!block.src) return null;
			const imgInfo = normalizeWebImageSrc(String(block.src));
			return {
				type: 'figure',
				src: imgInfo.src,
				title: imgInfo.title,
				caption: block.caption ? typstProseToWebMarkdown(String(block.caption)) : undefined,
				pins: imgInfo.pins,
				legend: imgInfo.legend,
				legendMode: 'labeled'
			};
		}

		case 'illustrated_figure': {
			if (!block.src) return null;
			const imgInfo = normalizeWebImageSrc(String(block.src));
			const pins: WebPin[] = Array.isArray(block.pins)
				? block.pins.map((p: any) => ({
						num: String(p.num ?? ''),
						xPct: Number(p.xPct ?? 50),
						yPct: Number(p.yPct ?? 50),
						color: p.color || '#1d4ed8'
					}))
				: imgInfo.pins;
			const legend: WebLegendItem[] = Array.isArray(block.legend)
				? block.legend.map((it: any) => ({
						num: String(it.num ?? ''),
						label: typstProseToWebMarkdown(String(it.label ?? '')),
						mark: it.mark !== undefined && it.mark !== '' ? String(it.mark) : undefined
					}))
				: imgInfo.legend;
			return {
				type: 'figure',
				src: imgInfo.src,
				title: block.title ? typstProseToWebMarkdown(String(block.title)) : imgInfo.title,
				caption: block.caption ? typstProseToWebMarkdown(String(block.caption)) : undefined,
				pins,
				legend,
				legendMode: block.legendMode === 'quiz' ? 'quiz' : 'labeled'
			};
		}

		case 'image_grid':
			return {
				type: 'image_grid',
				columns: Number(block.columns || 3),
				items: Array.isArray(block.items)
					? block.items.map((it: any) => ({
							src: normalizeWebImageSrc(String(it?.src ?? '')).src,
							label: typstProseToWebMarkdown(String(it?.label ?? '')),
							answer: it?.answer ? typstProseToWebMarkdown(String(it.answer)) : undefined,
							mark: it?.mark !== undefined && it?.mark !== '' ? String(it.mark) : undefined
						}))
					: []
			};

		case 'columns': {
			const children = Array.isArray(block.children)
				? (block.children.map((c: any) => serializeBlock(c, lang)).filter(Boolean) as WebBlock[])
				: [];
			return children.length > 0 ? { type: 'columns', widths: block.widths, children } : null;
		}

		case 'typst_raw': {
			const wm = block.webMeta;
			if (wm && typeof wm === 'object') {
				if (wm.kind === 'quran_box') {
					return {
						type: 'quran_box',
						label: String(wm.label || 'قال الله تعالى:'),
						verses: String(wm.verses || ''),
						surah: String(wm.surah || ''),
						ayahRange: wm.ayahRange ? String(wm.ayahRange) : undefined,
						vocabulary: Array.isArray(wm.vocabulary) ? wm.vocabulary : [],
						answer: block.answer ? typstProseToWebMarkdown(String(block.answer)) : undefined,
						mark
					};
				}
				if (wm.kind === 'hadith_box') {
					return {
						type: 'hadith_box',
						label: String(wm.label || 'السند النبوي الشريف:'),
						narrator: String(wm.narrator || ''),
						text: String(wm.text || ''),
						source: String(wm.source || ''),
						vocabulary: Array.isArray(wm.vocabulary) ? wm.vocabulary : [],
						answer: block.answer ? typstProseToWebMarkdown(String(block.answer)) : undefined,
						mark
					};
				}
				if (wm.kind === 'arabic_poem') {
					return {
						type: 'arabic_poem',
						title: wm.title ? String(wm.title) : undefined,
						numbered: Boolean(wm.numbered ?? true),
						verses: Array.isArray(wm.verses)
							? wm.verses.map((v: [string, string]) => [
									typstProseToWebMarkdown(v[0]),
									typstProseToWebMarkdown(v[1])
								])
							: [],
						author: wm.author ? String(wm.author) : undefined,
						source: wm.source ? String(wm.source) : undefined,
						vocabulary: Array.isArray(wm.vocabulary) ? wm.vocabulary : []
					};
				}
				if (wm.kind === 'passage_box') {
					const rawVocab = wm.vocabulary || wm.glossary || [];
					return {
						type: 'passage_box',
						lang: wm.lang || lang,
						title: wm.title ? typstProseToWebMarkdown(String(wm.title)) : undefined,
						paragraphs: Array.isArray(wm.paragraphs)
							? wm.paragraphs.map((p: string) => typstProseToWebMarkdown(p))
							: [],
						numberedParagraphs: Boolean(wm.numberedParagraphs),
						author: wm.author ? String(wm.author) : undefined,
						source: wm.source ? String(wm.source) : undefined,
						vocabulary: Array.isArray(rawVocab)
							? rawVocab.map((v: any) => ({
									word: String(v.word ?? v.term ?? ''),
									meaning: String(v.meaning ?? '')
								}))
							: []
					};
				}
			}
			return parseFallbackTypstRaw(String(block.content ?? ''), lang, block.answer, mark);
		}

		default:
			return null;
	}
}

function blockHasSolution(b: WebBlock): boolean {
	switch (b.type) {
		case 'text':
		case 'quran_box':
		case 'hadith_box':
			return Boolean(b.answer && b.answer.trim() !== '');
		case 'table':
			return b.rows.some((r) => r.some((c) => Boolean(c.answer && c.answer.trim() !== '')));
		case 'true_false':
			return b.items.some((it) => Boolean(it.a && it.a.trim() !== ''));
		case 'multiple_choice':
			return b.groups.some((g) => Boolean(g.correct && g.correct.trim() !== ''));
		case 'image_grid':
			return b.items.some((it) => Boolean(it.answer && it.answer.trim() !== ''));
		case 'figure':
			return b.legendMode === 'quiz' && b.legend.length > 0;
		case 'columns':
			return b.children.some(blockHasSolution);
		default:
			return false;
	}
}

const AR_ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن'];

/**
 * Converts a raw SujetBuilder `ExamDocument` into a ready-to-render `WebExamPayload`.
 */
export function serializeExamForWeb(examDoc: Record<string, any>): WebExamPayload {
	const meta = examDoc?.metadata || {};
	const lang = detectLanguage(meta.subjectId);
	const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';
	const docType: 'exam' | 'test' = meta.docType === 'test' ? 'test' : 'exam';

	const defaultTitle =
		lang === 'fr'
			? docType === 'test'
				? `Devoir surveillé — ${meta.trimesterName || '1er Trimestre'}`
				: `Composition — ${meta.trimesterName || '1er Trimestre'}`
			: lang === 'en'
				? docType === 'test'
					? `Supervised Test — ${meta.trimesterName || 'First Term'}`
					: `Term Exam — ${meta.trimesterName || 'First Term'}`
				: lang === 'es'
					? docType === 'test'
						? `Prueba vigilada — ${meta.trimesterName || '1er Trimestre'}`
						: `Examen trimestral — ${meta.trimesterName || '1er Trimestre'}`
					: docType === 'test'
						? `فرض محروس في مادة ${meta.subjectName || ''}`
						: `اختبار في مادة ${meta.subjectName || ''}`;

	const rawExercises = Array.isArray(examDoc?.exercises) ? examDoc.exercises : [];
	let totalPoints = 0;

	const exercises: WebExercise[] = rawExercises.map((ex: any, idx: number) => {
		const ptsNum = Number(String(ex?.points ?? '0').replace(',', '.'));
		if (Number.isFinite(ptsNum)) totalPoints += ptsNum;

		const customTitle = typeof ex?.customTitle === 'string' && ex.customTitle.trim() !== '' ? ex.customTitle.trim() : '';
		const heading = customTitle
			? typstProseToWebMarkdown(customTitle)
			: lang === 'fr'
				? `Exercice ${idx + 1}`
				: lang === 'en'
					? `Task ${idx + 1}`
					: lang === 'es'
						? `Parte ${idx + 1}`
						: `التمرين ${ex?.num || AR_ORDINALS[idx] || idx + 1}`;

		const rawBlocks = ex?.blocks || ex?.content || [];
		const blocks: WebBlock[] = Array.isArray(rawBlocks)
			? (rawBlocks.map((b: any) => serializeBlock(b, lang)).filter(Boolean) as WebBlock[])
			: [];

		return {
			index: idx + 1,
			heading,
			points: String(ex?.points ?? ''),
			instruction: ex?.instruction ? typstProseToWebMarkdown(String(ex.instruction)) : undefined,
			blocks,
			hasSolution: blocks.some(blockHasSolution)
		};
	});

	const webMeta: WebExamMetadata = {
		dir,
		lang,
		levelId: String(meta.levelId || ''),
		yearId: String(meta.yearId || ''),
		yearName: String(meta.yearName || ''),
		streamName: meta.streamName ? String(meta.streamName) : undefined,
		subjectId: String(meta.subjectId || ''),
		subjectName: String(meta.subjectName || ''),
		trimesterName: String(meta.trimesterName || ''),
		docType,
		docTitle: String(meta.customDocTitle || defaultTitle),
		academicYear: String(meta.academicYear || '2025 / 2026'),
		duration: String(meta.duration || ''),
		coefficient: typeof meta.coefficient === 'number' ? meta.coefficient : undefined,
		examSessionAr: meta.examSessionAr ? String(meta.examSessionAr) : undefined,
		topicNumber: typeof meta.topicNumber === 'number' ? meta.topicNumber : undefined,
		totalPoints: Math.round(totalPoints * 100) / 100 || (meta.levelId === 'primaire' ? 10 : 20)
	};

	return {
		version: 1,
		metadata: webMeta,
		exercises,
		hasAnySolution: exercises.some((e) => e.hasSolution)
	};
}

interface StoredDocLookupRow {
	id: number;
	slug: string;
	type: string;
	trimester_id: string | null;
	difficulty: string | null;
	academic_year: string | null;
	content: string | null;
	updated_at: string | null;
	year_id: string;
	subject_id: string;
	stream_id: string | null;
}

/**
 * Resolves a stored `documents.id` into a serialized `WebExamPayload` (cached in `/dev/shm` RAM).
 * Returns `null` only for external uploaded scanned PDFs without structured ExamDocument source.
 */
export async function resolveWebExamByDocId(docId: number): Promise<WebExamPayload | null> {
	const row = contentSqlite
		.query(
			`SELECT d.id, d.slug, d.type, d.trimester_id, d.difficulty, d.academic_year,
			        d.content, d.updated_at,
			        ys.year_id, ys.subject_id, ys.stream_id
			 FROM documents d
			 JOIN year_subjects ys ON ys.id = d.year_subject_id
			 WHERE d.id = ?
			 LIMIT 1`
		)
		.get(docId) as StoredDocLookupRow | null;

	if (!row || (row.type !== 'exam' && row.type !== 'test')) {
		return null;
	}

	const cacheHash = createHash('sha256')
		.update(`v1:${row.id}:${row.slug}:${row.updated_at || ''}`)
		.digest('hex')
		.slice(0, 24);
	const cacheFile = join(WEB_EXAM_RAM_DIR, `${cacheHash}.json`);

	if (existsSync(cacheFile)) {
		try {
			return JSON.parse(await readFile(cacheFile, 'utf-8')) as WebExamPayload;
		} catch {
			// Recompute if corrupted
		}
	}

	let examDoc: Record<string, any> | null = null;

	// 1. Stored structured ExamDocument JSON (includes all 114 Official BAC papers!)
	if (row.content && row.content.trim().startsWith('{')) {
		try {
			const parsed = JSON.parse(row.content) as Record<string, any>;
			if (Array.isArray(parsed.exercises)) {
				examDoc = parsed;
			}
		} catch {
			// Fall through to kernel assembler
		}
	}

	// 2. Deterministic Kernel Assembler (all 1,946 generated exams & tests)
	if (!examDoc) {
		const manifests = getManifestMap();
		const hint = manifests.get(row.slug);
		const docType: ExamType = hint?.docType ?? (row.type === 'test' ? 'test' : 'exam');
		const trimesterId: TrimesterId =
			hint?.trimesterId ??
			(row.trimester_id === 't1' || row.trimester_id === 't2' || row.trimester_id === 't3'
				? row.trimester_id
				: 't1');
		const variant: ExamVariant = hint?.variant ?? inferVariantFromSlug(row.slug, docType);
		const difficulty: ExamDifficulty = hint?.difficulty ?? inferDifficulty(row.difficulty, row.slug);
		const seed = hint?.seed ?? deriveSeedFromSlug(row.slug);

		const assembled = await subjectRegistry.assembleForYearSubject(
			row.year_id,
			row.subject_id,
			row.stream_id,
			{
				trimesterId,
				seed,
				docType,
				variant,
				difficulty,
				academicYear: row.academic_year || '2025/2026',
				topicNumber: hint?.topicNumber
			}
		);
		if (assembled?.paper?.examDoc) {
			examDoc = assembled.paper.examDoc as unknown as Record<string, any>;
		}
	}

	if (!examDoc) return null;

	const payload = serializeExamForWeb(examDoc);

	try {
		if (!existsSync(WEB_EXAM_RAM_DIR)) {
			mkdirSync(WEB_EXAM_RAM_DIR, { recursive: true });
		}
		await writeFile(cacheFile, JSON.stringify(payload), 'utf-8');
	} catch {
		// Non-fatal cache write failure
	}

	return payload;
}
