import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { accessSync, constants, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { contentSqlite } from './db';
import {
	normalizeStyleConfig,
	resolveEffectivePrintStyle,
	type TypstStyleConfig
} from './print-style';
import { putMediaObject } from './storage';
import { sanitizeTypstDocument } from './typst';
import { subjectRegistry } from '../kernel';
import type { ExamDifficulty, ExamVariant } from '../kernel/types';
import type { ExamType, TrimesterId } from '../modules/SujetBuilder/types';

export interface BatchRebuildScope {
	all?: boolean;
	language?: 'ar' | 'fr' | 'en' | 'es' | 'de';
	levelId?: string;
	yearId?: string;
	subjectId?: string;
	docType?: string;
	limit?: number;
}

export interface PreviewCompileResult {
	success: boolean;
	svgPages?: string[];
	pdfBase64?: string;
	elapsedMs: number;
	ramDisk: boolean;
	error?: string;
}

export interface RebuildJobState {
	jobId: string;
	status: 'running' | 'done' | 'error';
	scope: BatchRebuildScope;
	workers: number;
	ramRoot: string;
	isRamDisk: boolean;
	totalTargets: number;
	completed: number;
	failed: number;
	pdfsCompiled: number;
	pdfsPerSec: number;
	elapsedMs: number;
	startedAt: string;
	finishedAt: string | null;
	recentLogs: string[];
	error?: string;
}

interface TargetDocumentRow {
	id: number;
	slug: string;
	title: string;
	type: string;
	trimester_id: string | null;
	difficulty: string | null;
	academic_year: string | null;
	pdf_url: string;
	solution_url: string | null;
	has_solution: number | null;
	content: string | null;
	year_id: string;
	subject_id: string;
	stream_id: string | null;
	level_id: string;
}

interface ManifestHint {
	seed: number;
	variant?: ExamVariant;
	difficulty?: ExamDifficulty;
	trimesterId?: TrimesterId;
	docType?: ExamType;
	topicNumber?: 1 | 2;
}

const PROJECT_ROOT = resolve('.');
const SOURCE_TYPST_DIR = join(PROJECT_ROOT, 'src/lib/modules/SujetBuilder/typst');
const SOURCE_FONTS_DIR = join(PROJECT_ROOT, 'static/fonts');
const SOURCE_STATIC_DIR = join(PROJECT_ROOT, 'static');

const MAX_RETAINED_JOBS = 20;
const MAX_JOB_LOGS = 40;
const TYPST_TIMEOUT_MS = 25000;

let _ramRootInfo: { root: string; isRamDisk: boolean } | null = null;
let _ramSyncPromise: Promise<void> | null = null;
let _ramLastSyncAt = 0;
let _manifestIndex: Map<string, ManifestHint> | null = null;

const jobsMap = new Map<string, RebuildJobState>();
const jobPromises = new Map<string, Promise<void>>();

/**
 * Determines whether `/dev/shm` tmpfs RAM disk is writable, falling back to `/tmp` only if unavailable.
 */
export function getRamWorkspaceRoot(): { root: string; isRamDisk: boolean } {
	if (_ramRootInfo) return _ramRootInfo;
	try {
		if (existsSync('/dev/shm')) {
			accessSync('/dev/shm', constants.W_OK | constants.X_OK);
			const root = '/dev/shm/sujetstore-typst-ram';
			mkdirSync(root, { recursive: true });
			_ramRootInfo = { root, isRamDisk: true };
			return _ramRootInfo;
		}
	} catch {
		// Fall through to /tmp
	}
	const fallback = '/tmp/sujetstore-typst-ram';
	mkdirSync(fallback, { recursive: true });
	_ramRootInfo = { root: fallback, isRamDisk: false };
	return _ramRootInfo;
}

async function syncFileIfChanged(src: string, dest: string): Promise<void> {
	const srcStat = await stat(src);
	try {
		const destStat = await stat(dest);
		if (destStat.size === srcStat.size && Math.abs(destStat.mtimeMs - srcStat.mtimeMs) < 5) {
			return;
		}
	} catch {
		// Dest does not exist yet
	}
	await mkdir(dirname(dest), { recursive: true });
	await copyFile(src, dest);
}

async function mirrorDirectory(
	srcDir: string,
	destDir: string,
	filter?: (name: string, isDir: boolean) => boolean
): Promise<void> {
	if (!existsSync(srcDir)) return;
	await mkdir(destDir, { recursive: true });
	const entries = await readdir(srcDir, { withFileTypes: true });
	await Promise.all(
		entries.map(async (entry) => {
			if (filter && !filter(entry.name, entry.isDirectory())) return;
			const srcPath = join(srcDir, entry.name);
			const destPath = join(destDir, entry.name);
			if (entry.isDirectory()) {
				await mirrorDirectory(srcPath, destPath, filter);
			} else if (entry.isFile()) {
				await syncFileIfChanged(srcPath, destPath);
			}
		})
	);
}

const PREVIEW_TYPST_SOURCE = `// Ephemeral In-RAM Print Studio Preview Template (Typst 0.14+)
#let data = json(sys.inputs.at("data-file"))
#let style = data.at("style", default: (:))
#let lang = data.at("language", default: "ar")
#let level = data.at("levelId", default: "moyen")
#let is-rtl = lang == "ar"

#let accent-hex = style.at("accentColor", default: "#064E3B")
#let accent = rgb(accent-hex)
#let accent-soft = accent.lighten(92%)
#let accent-mid = accent.lighten(75%)

#let body-font = if is-rtl {
  (style.at("bodyFont", default: "Arabic Transparent"), "Arabic Transparent", "Noto Naskh Arabic", "STIX Two Math")
} else {
  (style.at("ltrBodyFont", default: "EB Garamond"), "EB Garamond", "Arial", "STIX Two Math")
}

#let heading-font = if is-rtl {
  (style.at("headingFont", default: "Arabic Transparent"), style.at("bodyFont", default: "Arabic Transparent"), "Arabic Transparent", "STIX Two Math")
} else {
  (style.at("ltrHeadingFont", default: "Montserrat"), style.at("ltrBodyFont", default: "EB Garamond"), "Montserrat", "Arial", "STIX Two Math")
}

#let body-size = style.at("bodySizePt", default: 11) * 1pt
#let heading-size = style.at("headingSizePt", default: 13.5) * 1pt
#let table-size = style.at("tableFontSizePt", default: 10) * 1pt
#let line-leading = style.at("lineLeadingEm", default: 0.72) * 1em
#let margin-len = style.at("marginMm", default: 14) * 1mm
#let layout = style.at("headerLayout", default: "classic_ministry")
#let show-logo = style.at("showLogo", default: true)
#let logo-width = style.at("logoWidthMm", default: 16) * 1mm
#let logo-file = data.at("resolvedLogoPath", default: "/static/logo.png")
#let show-qr = style.at("showQr", default: true)
#let qr-url = style.at("qrUrl", default: "https://sujetstore.com")
#let qr-file = "/src/lib/modules/SujetBuilder/typst/common/qrcode.png"
#let show-border = style.at("showBorder", default: false)

#let footer-text = if lang == "fr" {
  style.at("footerFr", default: "SujetStore.com")
} else if lang == "en" {
  style.at("footerEn", default: "SujetStore.com")
} else {
  style.at("footerAr", default: "منصة SujetStore")
}

#let level-label = if lang == "fr" {
  if level == "primaire" { "5ème Année Primaire (5AP)" } else if level == "secondaire" { "3ème Année Secondaire — Sciences Exp." } else { "4ème Année Moyenne (BEM)" }
} else if lang == "en" {
  if level == "primaire" { "5th Year Primary (5AP)" } else if level == "secondaire" { "3rd Year Secondary — Scientific Streams" } else { "4th Year Middle School (BEM)" }
} else {
  if level == "primaire" { "السنة الخامسة ابتدائي" } else if level == "secondaire" { "السنة الثالثة ثانوي — علوم تجريبية" } else { "السنة الرابعة متوسط (BEM)" }
}

#let subject-label = if lang == "fr" {
  "Langue Française"
} else if lang == "en" {
  "English Language"
} else {
  "الرياضيات"
}

#let duration-label = if lang == "fr" {
  if level == "primaire" { "1h 30" } else if level == "secondaire" { "2h 30" } else { "2h 00" }
} else if lang == "en" {
  if level == "primaire" { "1h 30" } else if level == "secondaire" { "2h 30" } else { "2h 00" }
} else {
  if level == "primaire" { "ساعة ونصف" } else if level == "secondaire" { "03 ساعات ونصف" } else { "ساعتان" }
}

#set page(
  paper: "a4",
  margin: (top: margin-len, bottom: margin-len + 7mm, x: margin-len),
  background: if show-border {
    place(center + horizon, rect(
      width: 100% - 12mm,
      height: 100% - 12mm,
      stroke: 0.9pt + accent,
      radius: 4pt
    ))
  } else {
    none
  },
  footer: context [
    #set text(font: body-font, size: calc.max(body-size - 1.5pt, 8.5pt), fill: luma(85), dir: if is-rtl { rtl } else { ltr })
    #line(length: 100%, stroke: 0.6pt + accent-mid)
    #v(-4pt)
    #grid(
      columns: (1fr, auto, 1fr),
      align: horizon,
      align(if is-rtl { right } else { left })[#footer-text],
      align(center)[#text(weight: "bold", fill: accent)[
        #(if is-rtl { [صفحة #counter(page).display() من #counter(page).final().at(0)] } else { [Page #counter(page).display() / #counter(page).final().at(0)] })
      ]],
      align(if is-rtl { left } else { right })[
        #if show-qr [
          #stack(dir: ltr, spacing: 5pt,
            align(horizon)[#text(size: 8pt, fill: accent)[#qr-url]],
            box(width: 18pt, height: 18pt)[#image(qr-file, width: 100%, height: 100%, fit: "contain")]
          )
        ] else [
          #text(size: 8.5pt, fill: accent)[#qr-url]
        ]
      ]
    )
  ]
)

#set text(
  font: body-font,
  lang: lang,
  region: if is-rtl { "dz" } else { none },
  dir: if is-rtl { rtl } else { ltr },
  size: body-size,
  top-edge: "ascender",
  bottom-edge: "descender"
)
#set par(leading: line-leading, justify: true)
#show math.equation: set text(font: ("STIX Two Math", "Arabic Transparent"), dir: ltr)

// ═══════════ HEADER LAYOUTS ═══════════
#if layout == "classic_ministry" [
  #if is-rtl [
    #align(center)[
      #text(font: heading-font, size: heading-size - 0.5pt, weight: "bold")[#style.at("headerArRight", default: "الجمهورية الجزائرية الديمقراطية الشعبية")] \
      #text(font: heading-font, size: body-size, weight: "bold", fill: accent)[#style.at("headerArLeft", default: "منصة SujetStore التعليمية")]
    ]
    #v(4pt)
    #grid(
      columns: (1.2fr, auto, 1.2fr),
      column-gutter: 8pt,
      align: horizon,
      align(right)[#set par(leading: 0.55em)
        #text(font: heading-font, size: body-size, weight: "bold")[اختبار الفصل الثاني] \
        #text(size: body-size - 0.5pt)[المستوى: #level-label]
      ],
      align(center)[
        #if show-logo [
          #image(logo-file, width: logo-width, fit: "contain")
        ]
      ],
      align(left)[#set par(leading: 0.55em)
        #text(font: heading-font, size: body-size, weight: "bold")[السنة الدراسية: 2025 / 2026] \
        #text(size: body-size - 0.5pt)[المدة: #duration-label]
      ]
    )
    #v(5pt)
    #box(width: 100%, stroke: (top: 1.3pt + accent, bottom: 1.3pt + accent), fill: accent-soft, inset: (x: 10pt, y: 7pt))[
      #align(center)[
        #text(font: heading-font, size: heading-size + 1.5pt, weight: "bold", fill: accent)[اختبار نموذجي في مادة: #subject-label]
      ]
    ]
  ] else [
    #let hdr-top = if lang == "fr" { "République Algérienne Démocratique et Populaire" } else { "People's Democratic Republic of Algeria" }
    #let hdr-sub = if lang == "fr" { style.at("headerFrLeft", default: "Plateforme éducative algérienne") } else { style.at("headerEnLeft", default: "Algerian Educational Platform") }
    #align(center)[
      #text(font: heading-font, size: heading-size - 0.5pt, weight: "bold")[#hdr-top] \
      #text(font: heading-font, size: body-size, weight: "bold", fill: accent)[#hdr-sub]
    ]
    #v(4pt)
    #grid(
      columns: (1.2fr, auto, 1.2fr),
      column-gutter: 8pt,
      align: horizon,
      align(left)[#set par(leading: 0.55em)
        #text(font: heading-font, size: body-size, weight: "bold")[#(if lang == "fr" { "Composition du 2ème Trimestre" } else { "Second Term Examination" })] \
        #text(size: body-size - 0.5pt)[#level-label]
      ],
      align(center)[
        #if show-logo [
          #image(logo-file, width: logo-width, fit: "contain")
        ]
      ],
      align(right)[#set par(leading: 0.55em)
        #text(font: heading-font, size: body-size, weight: "bold")[2025 / 2026] \
        #text(size: body-size - 0.5pt)[#(if lang == "fr" { "Durée : " } else { "Duration: " })#duration-label]
      ]
    )
    #v(5pt)
    #box(width: 100%, stroke: (top: 1.3pt + accent, bottom: 1.3pt + accent), fill: accent-soft, inset: (x: 10pt, y: 7pt))[
      #align(center)[
        #text(font: heading-font, size: heading-size + 1.5pt, weight: "bold", fill: accent)[#subject-label]
      ]
    ]
  ]
] else if layout == "modern_sujetstore" [
  #box(
    width: 100%,
    fill: accent-soft,
    stroke: (
      right: if is-rtl { 3.5pt + accent } else { 0.6pt + accent-mid },
      left: if is-rtl { 0.6pt + accent-mid } else { 3.5pt + accent },
      top: 0.6pt + accent-mid,
      bottom: 0.6pt + accent-mid,
    ),
    radius: 6pt,
    inset: (x: 12pt, y: 10pt)
  )[
    #grid(
      columns: if show-logo and show-qr { (auto, 1fr, auto) } else if show-logo or show-qr { (auto, 1fr) } else { (1fr,) },
      column-gutter: 12pt,
      align: horizon,
      ..(
        if show-logo {
          (box(radius: 5pt, fill: white, stroke: 0.5pt + accent-mid, inset: 4pt)[#image(logo-file, width: logo-width, fit: "contain")],)
        } else { () }
      ),
      [
        #set par(leading: 0.55em)
        #text(font: heading-font, size: calc.max(body-size - 1.5pt, 8.5pt), weight: "bold", fill: accent)[
          #(if is-rtl { style.at("headerArLeft", default: "منصة SujetStore التعليمية") } else if lang == "fr" { style.at("headerFrLeft", default: "SujetStore") } else { style.at("headerEnLeft", default: "SujetStore") })
        ] \
        #text(font: heading-font, size: heading-size + 2pt, weight: "bold", fill: luma(20))[
          #(if is-rtl { [اختبار الفصل الثاني — #subject-label] } else if lang == "fr" { [Composition N°2 — #subject-label] } else { [Second Term Exam — #subject-label] })
        ] \
        #text(size: calc.max(body-size - 1pt, 9pt), fill: luma(70))[#level-label  •  #(if is-rtl { [المدة: #duration-label] } else { duration-label })  •  2025/2026]
      ],
      ..(
        if show-qr {
          (align(center)[
            #box(width: 28pt, height: 28pt, fill: white, stroke: 0.5pt + accent-mid, radius: 3pt, inset: 2pt)[#image(qr-file, width: 100%, height: 100%, fit: "contain")] \
            #text(size: 7pt, fill: accent)[#(if is-rtl { "امسح" } else { "Scan" })]
          ],)
        } else { () }
      )
    )
  ]
] else [
  // minimal layout
  #grid(
    columns: (1fr, auto),
    align: horizon,
    [
      #text(font: heading-font, size: heading-size + 1pt, weight: "bold", fill: accent)[
        #(if is-rtl { [#subject-label — #level-label] } else { [#subject-label — #level-label] })
      ] \
      #text(size: calc.max(body-size - 1.5pt, 8.5pt), fill: luma(90))[
        #(if is-rtl { [#style.at("headerArLeft", default: "SujetStore")  |  المدة: #duration-label  |  2025/2026] } else if lang == "fr" { [#style.at("headerFrLeft", default: "SujetStore")  |  Durée : #duration-label  |  2025/2026] } else { [#style.at("headerEnLeft", default: "SujetStore")  |  Duration: #duration-label  |  2025/2026] })
      ]
    ],
    [
      #if show-logo [
        #image(logo-file, width: calc.min(logo-width, 14mm), fit: "contain")
      ]
    ]
  )
  #v(-2pt)
  #line(length: 100%, stroke: 1.2pt + accent)
]

#v(5pt)

#if level == "primaire" and is-rtl [
  #box(width: 100%, stroke: 0.8pt + accent-mid, radius: 4pt, fill: luma(250), inset: (x: 9pt, y: 5pt))[
    #grid(
      columns: (1.6fr, 1fr, 0.9fr),
      gutter: 8pt,
      [#text(font: heading-font, weight: "bold")[الاسم واللقب: ......................]],
      [#text(font: heading-font, weight: "bold")[القسم: ..........]],
      [#text(font: heading-font, weight: "bold")[العلامة: .... / 10]]
    )
  ]
  #v(5pt)
]

// ═══════════ REALISTIC SAMPLE EXAM BODY ═══════════
#if is-rtl [
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[▪ التمرين الأول: (06 نقاط)]
  #v(2pt)
  #block(inset: (right: 10pt))[
    لتكن العبارة الجبرية $A(x)$ المعرّفة على $bb(R)$ كما يلي:
    $ A(x) = (2x - 3)^2 - (x + 1)(2x - 3) $
    + انشر وبسّط العبارة $A(x)$ ثم احسب قيمتها من أجل $x = sqrt(2)$.
    + حلّل العبارة $A(x)$ إلى جداء عاملين من الدرجة الأولى، ثم حل المعادلة $A(x) = 0$.
  ]

  #v(5pt)
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[▪ التمرين الثاني: (06 نقاط)]
  #v(2pt)
  #block(inset: (right: 10pt))[
    يبيّن الجدول المقابل توزيع علامات تلاميذ قسم في مادة الرياضيات خلال الفصل الثاني:
    #v(3pt)
    #set text(size: table-size)
    #table(
      columns: (1.4fr, 1fr, 1fr, 1fr, 1fr),
      align: center + horizon,
      inset: 5pt,
      stroke: 0.6pt + luma(140),
      fill: (x, y) => if y == 0 { accent-soft } else { none },
      text(font: heading-font, weight: "bold", fill: accent)[العلامة],
      text(font: heading-font, weight: "bold")[08],
      text(font: heading-font, weight: "bold")[11],
      text(font: heading-font, weight: "bold")[14],
      text(font: heading-font, weight: "bold")[17],
      text(font: heading-font, weight: "bold")[التكرار],
      [6], [10], [9], [5],
      text(font: heading-font, weight: "bold")[التواتر (%)],
      [20%], [33.3%], [30%], [16.7%]
    )
    #v(3pt)
    #set text(size: body-size)
    + احسب الوسط الحسابي المتوازن والوسيط لهذه السلسلة الإحصائية.
    + ما هي النسبة المئوية للتلاميذ الذين تحصلوا على علامة تفوق أو تساوي $14$؟
  ]

  #v(5pt)
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[▪ الوضعية الإدماجية: (08 نقاط)]
  #v(2pt)
  #block(inset: (right: 10pt))[
    يريد مدير مؤسسة تربوية تهيئة قاعة مطالعة مستطيلة الشكل طولها $12 "m"$ وعرضها $8 "m"$.
    اقترحت مقاولة تسعيرتين لتبليط الأرضية وتجهيز الرفوف. ساعد المدير في اختيار العرض الأنسب مع التبرير الحسابي.
  ]

  #v(1fr)
  #align(center)[#text(font: heading-font, weight: "bold", fill: accent)[انتهى الموضوع — بالتوفيق]]
] else if lang == "fr" [
  #box(width: 100%, stroke: 0.6pt + accent-mid, fill: luma(252), radius: 4pt, inset: 10pt)[
    #text(font: heading-font, size: heading-size - 0.5pt, weight: "bold", fill: accent)[Texte support : L'énergie solaire en Algérie]
    #v(3pt)
    Grâce à un ensoleillement exceptionnel dépassant 3 000 heures par an, l'Algérie dispose d'un potentiel considérable pour développer les énergies renouvelables. Les centrales photovoltaïques installées dans les Hauts Plateaux et le Sud contribuent durablement à la transition écologique et à la protection de l'environnement.
  ]

  #v(8pt)
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[I. Compréhension de l'écrit (13 pts)]
  #v(3pt)
  + Quel est le thème principal abordé dans ce texte ? Justifiez votre réponse.
  + Complétez le tableau récapitulatif ci-dessous à partir du texte :
  #v(4pt)
  #block[
    #set text(size: table-size)
    #table(
      columns: (1.3fr, 1.3fr, 1.2fr),
      align: left + horizon,
      inset: 6pt,
      stroke: 0.6pt + luma(140),
      fill: (x, y) => if y == 0 { accent-soft } else { none },
      text(font: heading-font, weight: "bold", fill: accent)[Source d'énergie],
      text(font: heading-font, weight: "bold", fill: accent)[Régions citées],
      text(font: heading-font, weight: "bold", fill: accent)[Avantage écologique],
      [Énergie solaire], [Hauts Plateaux et Sud], [Transition durable]
    )
  ]
  #v(6pt)
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[II. Production écrite (07 pts)]
  #v(3pt)
  Rédigez un paragraphe argumentatif de 8 à 10 lignes expliquant l'importance des énergies propres pour l'avenir des générations futures.

  #v(1fr)
  #align(center)[#text(font: heading-font, weight: "bold", fill: accent)[Fin du sujet — Bon courage]]
] else [
  #box(width: 100%, stroke: 0.6pt + accent-mid, fill: luma(252), radius: 4pt, inset: 10pt)[
    #text(font: heading-font, size: heading-size - 0.5pt, weight: "bold", fill: accent)[Reading Passage: Digital Learning in Modern Classrooms]
    #v(3pt)
    Over the past decade, digital libraries and interactive study platforms have transformed how Algerian students prepare for national exams. By combining structured practice papers with instant feedback, learners build stronger analytical habits and manage examination time effectively.
  ]

  #v(8pt)
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[Part One: Reading Comprehension & Mastery of Language (14 pts)]
  #v(3pt)
  + Read the text carefully and say whether the statements are *True* or *False*.
  + Complete the following summary table with information from the passage:
  #v(4pt)
  #block[
    #set text(size: table-size)
    #table(
      columns: (1.2fr, 1.4fr, 1.2fr),
      align: left + horizon,
      inset: 6pt,
      stroke: 0.6pt + luma(140),
      fill: (x, y) => if y == 0 { accent-soft } else { none },
      text(font: heading-font, weight: "bold", fill: accent)[Learning Tool],
      text(font: heading-font, weight: "bold", fill: accent)[Key Benefit],
      text(font: heading-font, weight: "bold", fill: accent)[Target Skill],
      [Practice Papers], [Structured exam readiness], [Time management]
    )
  ]
  #v(6pt)
  #text(font: heading-font, size: heading-size, weight: "bold", fill: accent)[Part Two: Written Expression (06 pts)]
  #v(3pt)
  Write a short composition (80–100 words) explaining how technology helps students succeed in their studies while staying focused.

  #v(1fr)
  #align(center)[#text(font: heading-font, weight: "bold", fill: accent)[End of Paper — Good Luck]]
]
`;

/**
 * Mirrors fonts, Typst templates, and print logos into `/dev/shm/sujetstore-typst-ram`
 * so all compilation reads/writes stay 100% in RAM tmpfs.
 */
export async function syncRamWorkspace(force = false): Promise<{ root: string; isRamDisk: boolean }> {
	const info = getRamWorkspaceRoot();
	const now = Date.now();
	if (!force && _ramLastSyncAt > 0 && now - _ramLastSyncAt < 30_000) {
		return info;
	}
	if (_ramSyncPromise && !force) {
		await _ramSyncPromise;
		return info;
	}

	const work = (async () => {
		const fontsDest = join(info.root, 'fonts');
		const wsRoot = join(info.root, 'workspace');
		const typstDest = join(wsRoot, 'src/lib/modules/SujetBuilder/typst');
		const staticDest = join(wsRoot, 'static');
		const jobsDir = join(wsRoot, 'jobs');
		const outDir = join(wsRoot, 'out');

		await Promise.all([
			mkdir(fontsDest, { recursive: true }),
			mkdir(typstDest, { recursive: true }),
			mkdir(staticDest, { recursive: true }),
			mkdir(jobsDir, { recursive: true }),
			mkdir(outDir, { recursive: true })
		]);

		// Mirror fonts into RAM
		await mirrorDirectory(SOURCE_FONTS_DIR, fontsDest, (name, isDir) => {
			if (isDir) return false;
			const ext = extname(name).toLowerCase();
			return ext === '.ttf' || ext === '.otf';
		});

		// Mirror Typst templates & common assets (~180KB) into RAM, excluding stray temp files
		await mirrorDirectory(SOURCE_TYPST_DIR, typstDest, (name, isDir) => {
			if (isDir) return true;
			if (name.startsWith('.tmp-') || name.startsWith('.ram-') || name.endsWith('.pdf')) return false;
			return true;
		});

		// Mirror root logo* files and static/images (including static/images/print) into RAM
		if (existsSync(SOURCE_STATIC_DIR)) {
			const staticEntries = await readdir(SOURCE_STATIC_DIR, { withFileTypes: true });
			await Promise.all(
				staticEntries.map(async (entry) => {
					if (entry.isFile() && entry.name.toLowerCase().startsWith('logo')) {
						await syncFileIfChanged(
							join(SOURCE_STATIC_DIR, entry.name),
							join(staticDest, entry.name)
						);
					}
				})
			);
			const srcImagesDir = join(SOURCE_STATIC_DIR, 'images');
			if (existsSync(srcImagesDir)) {
				await mirrorDirectory(srcImagesDir, join(staticDest, 'images'));
			}
		}

		// Stage preview.typ inside RAM workspace
		const previewTypPath = join(wsRoot, 'preview.typ');
		let needsWrite = true;
		if (existsSync(previewTypPath)) {
			try {
				const existing = await readFile(previewTypPath, 'utf-8');
				if (existing === PREVIEW_TYPST_SOURCE) needsWrite = false;
			} catch {
				needsWrite = true;
			}
		}
		if (needsWrite) {
			await writeFile(previewTypPath, PREVIEW_TYPST_SOURCE, 'utf-8');
		}

		_ramLastSyncAt = Date.now();
	})();

	_ramSyncPromise = work;
	try {
		await work;
	} finally {
		if (_ramSyncPromise === work) _ramSyncPromise = null;
	}

	return info;
}

function runTypstProcess(args: string[], cwd: string): Promise<{ success: boolean; error?: string }> {
	return new Promise((resolvePromise) => {
		const proc = spawn('typst', args, {
			cwd,
			timeout: TYPST_TIMEOUT_MS,
			stdio: ['ignore', 'pipe', 'pipe']
		});
		let stderr = '';
		proc.stderr.on('data', (chunk) => {
			stderr += chunk.toString();
		});
		proc.on('close', (code) => {
			if (code === 0) {
				resolvePromise({ success: true });
			} else {
				resolvePromise({
					success: false,
					error: stderr.trim() || `Typst exited with code ${code}`
				});
			}
		});
		proc.on('error', (err) => {
			resolvePromise({ success: false, error: `Failed to spawn typst: ${err.message}` });
		});
	});
}

async function resolvePreviewLogoInRam(wsRoot: string, logoPath: string): Promise<string> {
	const cleaned = (logoPath || '/logo.png').replace(/^\/+/, '');
	if (cleaned && !cleaned.includes('..') && !cleaned.includes('\\')) {
		const ramCandidate = join(wsRoot, 'static', cleaned);
		if (existsSync(ramCandidate)) {
			return `/static/${cleaned}`;
		}
		const srcCandidate = join(SOURCE_STATIC_DIR, cleaned);
		if (existsSync(srcCandidate)) {
			await syncFileIfChanged(srcCandidate, ramCandidate);
			return `/static/${cleaned}`;
		}
	}
	return '/static/logo.png';
}

/**
 * Compiles a realistic 1-page sample exam using the draft TypstStyleConfig directly in `/dev/shm` RAM
 * into SVG page(s) (and optionally base64 PDF) in < 400ms.
 */
export async function compilePreviewInRam(opts: {
	style: TypstStyleConfig;
	language: 'ar' | 'fr' | 'en' | 'es' | 'de';
	levelId: string;
	includePdf?: boolean;
}): Promise<PreviewCompileResult> {
	const t0 = performance.now();
	const ram = await syncRamWorkspace();
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');
	const jobsDir = join(wsRoot, 'jobs');

	const style = normalizeStyleConfig(opts.style);
	const language: 'ar' | 'fr' | 'en' | 'es' | 'de' =
		opts.language === 'fr' || opts.language === 'en' || opts.language === 'es' || opts.language === 'de'
			? opts.language
			: 'ar';
	const levelId =
		opts.levelId === 'primaire' || opts.levelId === 'secondaire' ? opts.levelId : 'moyen';

	const runId = randomUUID().slice(0, 12);
	const dataFileName = `prev-${runId}.json`;
	const dataFilePath = join(jobsDir, dataFileName);
	const svgPattern = join(jobsDir, `prev-${runId}-{p}.svg`);
	const pdfPath = join(jobsDir, `prev-${runId}.pdf`);

	const resolvedLogoPath = await resolvePreviewLogoInRam(wsRoot, style.logoPath);

	await writeFile(
		dataFilePath,
		JSON.stringify({
			style,
			language,
			levelId,
			resolvedLogoPath
		}),
		'utf-8'
	);

	try {
		const svgRes = await runTypstProcess(
			[
				'compile',
				'preview.typ',
				svgPattern,
				'--format',
				'svg',
				'--root',
				wsRoot,
				'--font-path',
				fontsDir,
				'--input',
				`data-file=jobs/${dataFileName}`
			],
			wsRoot
		);

		if (!svgRes.success) {
			return {
				success: false,
				elapsedMs: Math.round(performance.now() - t0),
				ramDisk: ram.isRamDisk,
				error: svgRes.error
			};
		}

		const jobEntries = await readdir(jobsDir);
		const prefix = `prev-${runId}-`;
		const pageFiles = jobEntries
			.filter((f) => f.startsWith(prefix) && f.endsWith('.svg'))
			.sort((a, b) => {
				const na = Number(a.slice(prefix.length, -4)) || 0;
				const nb = Number(b.slice(prefix.length, -4)) || 0;
				return na - nb;
			});

		const svgPages = await Promise.all(
			pageFiles.map((f) => readFile(join(jobsDir, f), 'utf-8'))
		);

		let pdfBase64: string | undefined;
		if (opts.includePdf) {
			const pdfRes = await runTypstProcess(
				[
					'compile',
					'preview.typ',
					pdfPath,
					'--root',
					wsRoot,
					'--font-path',
					fontsDir,
					'--input',
					`data-file=jobs/${dataFileName}`
				],
				wsRoot
			);
			if (pdfRes.success && existsSync(pdfPath)) {
				const pdfBuf = await readFile(pdfPath);
				pdfBase64 = pdfBuf.toString('base64');
			}
		}

		return {
			success: true,
			svgPages,
			pdfBase64,
			elapsedMs: Math.round(performance.now() - t0),
			ramDisk: ram.isRamDisk
		};
	} finally {
		const cleanupTargets: Promise<void>[] = [
			rm(dataFilePath, { force: true }).catch(() => {}),
			rm(pdfPath, { force: true }).catch(() => {})
		];
		try {
			const entries = await readdir(jobsDir);
			const prefix = `prev-${runId}-`;
			for (const entry of entries) {
				if (entry.startsWith(prefix)) {
					cleanupTargets.push(rm(join(jobsDir, entry), { force: true }).catch(() => {}));
				}
			}
		} catch {
			// Ignore cleanup listing errors
		}
		await Promise.all(cleanupTargets);
	}
}

function getManifestIndex(): Map<string, ManifestHint> {
	if (_manifestIndex) return _manifestIndex;
	const map = new Map<string, ManifestHint>();
	const pipelineDir = join(PROJECT_ROOT, 'pipeline');

	if (existsSync(pipelineDir)) {
		try {
			const subDirs = readdirSync(pipelineDir);
			for (const dir of subDirs) {
				if (!dir.startsWith('generated_exams')) continue;
				const fullDir = join(pipelineDir, dir);
				try {
					if (!statSync(fullDir).isDirectory()) continue;
					const files = readdirSync(fullDir);
					for (const file of files) {
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
					// Skip malformed/unreadable manifest
				}
			}
		} catch {
			// Ignore
		}
	}

	_manifestIndex = map;
	return map;
}

export function detectDocumentLanguage(subjectId: string): 'ar' | 'fr' | 'en' | 'es' | 'de' {
	const id = (subjectId || '').toUpperCase();
	if (id.startsWith('ENG') || id.startsWith('LANG')) return 'en';
	if (id.startsWith('FRE')) return 'fr';
	if (id === 'LAN-SPA' || id.startsWith('SPA')) return 'es';
	if (id === 'LAN-GER' || id.startsWith('GER') || id.startsWith('DEU')) return 'de';
	return 'ar';
}

function buildScopeWhereClause(scope: BatchRebuildScope): { sql: string; params: Array<string | number> } {
	const clauses: string[] = [
		'd.is_published = 1',
		"d.type IN ('exam', 'test')",
		'd.pdf_url IS NOT NULL',
		"length(trim(d.pdf_url)) > 4"
	];
	const params: Array<string | number> = [];

	if (!scope.all) {
		if (scope.language === 'en') {
			clauses.push("(ys.subject_id LIKE 'ENG%' OR ys.subject_id LIKE 'LANG%')");
		} else if (scope.language === 'fr') {
			clauses.push("ys.subject_id LIKE 'FRE%'");
		} else if (scope.language === 'es') {
			clauses.push("ys.subject_id = 'LAN-SPA'");
		} else if (scope.language === 'de') {
			clauses.push("ys.subject_id = 'LAN-GER'");
		} else if (scope.language === 'ar') {
			clauses.push(
				"(ys.subject_id NOT LIKE 'ENG%' AND ys.subject_id NOT LIKE 'LANG%' AND ys.subject_id NOT LIKE 'FRE%' AND ys.subject_id != 'LAN-SPA' AND ys.subject_id != 'LAN-GER')"
			);
		}
		if (scope.levelId) {
			clauses.push('y.level_id = ?');
			params.push(scope.levelId);
		}
		if (scope.yearId) {
			clauses.push('ys.year_id = ?');
			params.push(scope.yearId);
		}
		if (scope.subjectId) {
			clauses.push('ys.subject_id = ?');
			params.push(scope.subjectId);
		}
		if (scope.docType && (scope.docType === 'exam' || scope.docType === 'test')) {
			clauses.push('d.type = ?');
			params.push(scope.docType);
		}
	}

	return { sql: clauses.join(' AND '), params };
}

export function countRebuildTargets(scope: BatchRebuildScope = {}): number {
	const { sql, params } = buildScopeWhereClause(scope);
	const row = contentSqlite
		.query(
			`SELECT COUNT(*) AS cnt
			 FROM documents d
			 JOIN year_subjects ys ON ys.id = d.year_subject_id
			 JOIN years y ON y.id = ys.year_id
			 WHERE ${sql}`
		)
		.get(...params) as { cnt: number } | null;

	const count = row?.cnt ?? 0;
	if (scope.limit && scope.limit > 0) {
		return Math.min(count, Math.floor(scope.limit));
	}
	return count;
}

function queryRebuildTargets(scope: BatchRebuildScope): TargetDocumentRow[] {
	const { sql, params } = buildScopeWhereClause(scope);
	let limitSql = '';
	if (scope.limit && scope.limit > 0) {
		limitSql = ' LIMIT ?';
		params.push(Math.floor(scope.limit));
	}

	return contentSqlite
		.query(
			`SELECT d.id, d.slug, d.title, d.type, d.trimester_id, d.difficulty,
			        d.academic_year, d.pdf_url, d.solution_url, d.has_solution, d.content,
			        ys.year_id, ys.subject_id, ys.stream_id,
			        y.level_id
			 FROM documents d
			 JOIN year_subjects ys ON ys.id = d.year_subject_id
			 JOIN years y ON y.id = ys.year_id
			 WHERE ${sql}
			 ORDER BY d.id ASC${limitSql}`
		)
		.all(...params) as TargetDocumentRow[];
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

function inferTemplateIdForStoredDoc(
	doc: TargetDocumentRow,
	language: 'ar' | 'fr' | 'en' | 'es' | 'de'
): string {
	if (language === 'en') return 'english/exam';
	if (language === 'fr') return 'french/exam';
	if (language === 'es') {
		return doc.slug.toLowerCase().includes('bac') ? 'spanish/bac_official' : 'spanish/secondary';
	}
	if (language === 'de') {
		return doc.slug.toLowerCase().includes('bac') ? 'german/bac_official' : 'german/secondary';
	}
	if (doc.slug.toLowerCase().includes('bac')) return 'secondary/bac_official';
	if (doc.level_id === 'secondaire') return 'secondary/lycee_exam';
	return 'middle/exam';
}

async function assembleTargetExam(
	doc: TargetDocumentRow,
	language: 'ar' | 'fr' | 'en' | 'es' | 'de',
	manifests: Map<string, ManifestHint>
): Promise<{ examDoc: Record<string, any>; templateId: string } | null> {
	// 1. Direct stored JSON exam content
	if (doc.content && doc.content.trim().startsWith('{')) {
		try {
			const parsed = JSON.parse(doc.content) as Record<string, any>;
			if (Array.isArray(parsed.exercises) || Array.isArray(parsed.topics)) {
				return {
					examDoc: parsed,
					templateId: inferTemplateIdForStoredDoc(doc, language)
				};
			}
		} catch {
			// Fall through to kernel assembler
		}
	}

	// 2. Re-assemble via SubjectRegistry (using exact manifest seed/variant if available)
	const hint = manifests.get(doc.slug);
	const docType: ExamType = hint?.docType ?? (doc.type === 'test' ? 'test' : 'exam');
	const trimesterId: TrimesterId =
		hint?.trimesterId ??
		(doc.trimester_id === 't1' || doc.trimester_id === 't2' || doc.trimester_id === 't3'
			? doc.trimester_id
			: 't1');
	const variant: ExamVariant = hint?.variant ?? inferVariantFromSlug(doc.slug, docType);
	const difficulty: ExamDifficulty = hint?.difficulty ?? inferDifficulty(doc.difficulty, doc.slug);
	const seed = hint?.seed ?? deriveSeedFromSlug(doc.slug);

	const assembled = await subjectRegistry.assembleForYearSubject(
		doc.year_id,
		doc.subject_id,
		doc.stream_id,
		{
			trimesterId,
			seed,
			docType,
			variant,
			difficulty,
			academicYear: doc.academic_year || '2025/2026',
			topicNumber: hint?.topicNumber
		}
	);

	if (!assembled) return null;

	return {
		examDoc: assembled.paper.examDoc as unknown as Record<string, any>,
		templateId: assembled.paper.templateId
	};
}

function quoteLegacyMathOpsInProse(text: string): string {
	return text.replace(/\$([^$]+)\$/g, (_m, inner: string) => {
		const fixed = inner.replace(/(?<!")\b(PGCD|PPCM|pgcd|ppcm|Card|card)\b(?!")/g, '"$1"');
		return `$${fixed}$`;
	});
}

function fixLegacyMathOpsInDoc(doc: Record<string, any>): void {
	const patchBlock = (block: any) => {
		if (!block || typeof block !== 'object') return;
		if (block.type === 'math' && typeof block.content === 'string') {
			block.content = block.content.replace(/(?<!")\b(PGCD|PPCM|pgcd|ppcm|Card|card)\b(?!")/g, '"$1"');
		} else {
			if (typeof block.content === 'string') block.content = quoteLegacyMathOpsInProse(block.content);
			if (typeof block.answer === 'string') block.answer = quoteLegacyMathOpsInProse(block.answer);
		}
		if (Array.isArray(block.children)) {
			for (const c of block.children) patchBlock(c);
		}
	};
	if (Array.isArray(doc.exercises)) {
		for (const ex of doc.exercises) {
			if (typeof ex?.instruction === 'string') {
				ex.instruction = quoteLegacyMathOpsInProse(ex.instruction);
			}
			const blocks = ex?.blocks || ex?.content || [];
			if (Array.isArray(blocks)) {
				for (const b of blocks) patchBlock(b);
			}
		}
	}
}

/**
 * Ensures any `/data/...` or `/static/...` image paths referenced inside an examDoc
 * are copied into `<RAM_ROOT>/workspace` before Typst compiles with `--root <RAM_ROOT>/workspace`.
 */
export async function stageReferencedImagesInRam(wsRoot: string, examDoc: Record<string, any>): Promise<void> {
	const paths = new Set<string>();
	const scanBlock = (block: any) => {
		if (!block || typeof block !== 'object') return;
		if (typeof block.src === 'string') paths.add(block.src);
		if (Array.isArray(block.items)) {
			for (const it of block.items) {
				if (typeof it?.src === 'string') paths.add(it.src);
			}
		}
		if (Array.isArray(block.children)) {
			for (const child of block.children) scanBlock(child);
		}
	};

	if (Array.isArray(examDoc.exercises)) {
		for (const ex of examDoc.exercises) {
			const blocks = ex?.blocks || ex?.content || [];
			if (Array.isArray(blocks)) {
				for (const b of blocks) scanBlock(b);
			}
		}
	}

	for (const rawPath of paths) {
		if (!rawPath.startsWith('/data/') && !rawPath.startsWith('/static/')) continue;
		const rel = rawPath.slice(1);
		if (rel.includes('..') || rel.includes('\\')) continue;
		const srcFile = join(PROJECT_ROOT, rel);
		const destFile = join(wsRoot, rel);
		if (existsSync(srcFile)) {
			await syncFileIfChanged(srcFile, destFile);
		}
	}
}

async function compileDocumentInRam(options: {
	wsRoot: string;
	fontsDir: string;
	examDoc: Record<string, any>;
	templateId: string;
	isSolution: boolean;
}): Promise<{ success: boolean; bytes?: Buffer; error?: string }> {
	const { wsRoot, fontsDir, examDoc, templateId, isSolution } = options;
	const typstRoot = join(wsRoot, 'src/lib/modules/SujetBuilder/typst');
	const outDir = join(wsRoot, 'out');
	const runId = randomUUID();
	const relDataFile = `.ram-${runId}.json`;
	const dataFilePath = join(typstRoot, relDataFile);
	const outPdfPath = join(outDir, `${runId}.pdf`);

	await writeFile(dataFilePath, JSON.stringify(examDoc), 'utf-8');

	try {
		const res = await runTypstProcess(
			[
				'compile',
				'main.typ',
				outPdfPath,
				'--root',
				wsRoot,
				'--font-path',
				fontsDir,
				'--input',
				`template-id=${templateId}`,
				'--input',
				`data-file=${relDataFile}`,
				'--input',
				`is-solution=${isSolution}`
			],
			typstRoot
		);

		if (!res.success) {
			return { success: false, error: res.error };
		}

		const bytes = await readFile(outPdfPath);
		if (bytes.length < 16 || bytes.subarray(0, 5).toString('ascii') !== '%PDF-') {
			return { success: false, error: 'Invalid PDF output header' };
		}
		return { success: true, bytes };
	} finally {
		await Promise.all([
			rm(dataFilePath, { force: true }).catch(() => {}),
			rm(outPdfPath, { force: true }).catch(() => {})
		]);
	}
}

function appendJobLog(job: RebuildJobState, line: string): void {
	const stamp = new Date().toISOString().slice(11, 19);
	job.recentLogs.push(`[${stamp}] ${line}`);
	if (job.recentLogs.length > MAX_JOB_LOGS) {
		job.recentLogs.splice(0, job.recentLogs.length - MAX_JOB_LOGS);
	}
}

function pruneOldJobs(): void {
	if (jobsMap.size <= MAX_RETAINED_JOBS) return;
	const keys = Array.from(jobsMap.keys());
	const toRemove = keys.length - MAX_RETAINED_JOBS;
	for (let i = 0; i < toRemove; i++) {
		const k = keys[i];
		const st = jobsMap.get(k);
		if (st && st.status !== 'running') {
			jobsMap.delete(k);
			jobPromises.delete(k);
		}
	}
}

async function runBatchRebuildJob(job: RebuildJobState, targets: TargetDocumentRow[]): Promise<void> {
	const t0 = performance.now();
	try {
		const ram = await syncRamWorkspace();
		const wsRoot = join(ram.root, 'workspace');
		const fontsDir = join(ram.root, 'fonts');
		const manifests = getManifestIndex();

		appendJobLog(
			job,
			`بدء إعادة البناء في ${ram.root} (${ram.isRamDisk ? 'RAM tmpfs' : 'disk fallback'}) لـ ${targets.length} موضوع بـ ${job.workers} نواة`
		);

		if (targets.length === 0) {
			job.status = 'done';
			job.elapsedMs = Math.round(performance.now() - t0);
			job.finishedAt = new Date().toISOString();
			appendJobLog(job, 'لا توجد مواضيع مطابقة لهذا النطاق.');
			return;
		}

		const updateDocMetaStmt = contentSqlite.query(
			`UPDATE documents SET file_size = ?, updated_at = datetime('now') WHERE id = ?`
		);

		let cursor = 0;

		const workerFn = async () => {
			while (true) {
				const idx = cursor++;
				if (idx >= targets.length) return;
				const doc = targets[idx];

				try {
					const language = detectDocumentLanguage(doc.subject_id);
					const resolvedStyle = resolveEffectivePrintStyle({
						language,
						levelId: doc.level_id,
						yearId: doc.year_id,
						subjectId: doc.subject_id,
						docType: doc.type
					});

					const assembled = await assembleTargetExam(doc, language, manifests);
					if (!assembled) {
						throw new Error(`No kernel assembler matched (${doc.year_id}/${doc.subject_id})`);
					}

					const styledDoc = sanitizeTypstDocument({
						...assembled.examDoc,
						metadata: {
							...(assembled.examDoc.metadata || {}),
							font: language === 'ar' ? resolvedStyle.bodyFont : resolvedStyle.ltrBodyFont
						},
						style: resolvedStyle
					});
					fixLegacyMathOpsInDoc(styledDoc);

					await stageReferencedImagesInRam(wsRoot, styledDoc);

					const subCompile = await compileDocumentInRam({
						wsRoot,
						fontsDir,
						examDoc: styledDoc,
						templateId: assembled.templateId,
						isSolution: false
					});

					if (!subCompile.success || !subCompile.bytes) {
						throw new Error(subCompile.error || 'Subject PDF compile failed');
					}

					await putMediaObject(doc.pdf_url, subCompile.bytes, 'application/pdf');
					job.pdfsCompiled++;

					if (doc.solution_url && doc.solution_url !== doc.pdf_url) {
						const solCompile = await compileDocumentInRam({
							wsRoot,
							fontsDir,
							examDoc: styledDoc,
							templateId: assembled.templateId,
							isSolution: true
						});
						if (!solCompile.success || !solCompile.bytes) {
							throw new Error(solCompile.error || 'Solution PDF compile failed');
						}
						await putMediaObject(doc.solution_url, solCompile.bytes, 'application/pdf');
						job.pdfsCompiled++;
					}

					try {
						updateDocMetaStmt.run(subCompile.bytes.length, doc.id);
					} catch {
						// Non-fatal metadata update failure
					}

					job.completed++;
					const elapsedMs = Math.max(1, performance.now() - t0);
					job.elapsedMs = Math.round(elapsedMs);
					job.pdfsPerSec = Math.round((job.pdfsCompiled / (elapsedMs / 1000)) * 10) / 10;

					if (job.completed <= 5 || job.completed % 10 === 0 || job.completed === targets.length) {
						appendJobLog(
							job,
							`✓ ${doc.slug} (${(subCompile.bytes.length / 1024).toFixed(0)} KB) — ${job.completed}/${targets.length}`
						);
					}
				} catch (err: any) {
					job.failed++;
					const elapsedMs = Math.max(1, performance.now() - t0);
					job.elapsedMs = Math.round(elapsedMs);
					job.pdfsPerSec = Math.round((job.pdfsCompiled / (elapsedMs / 1000)) * 10) / 10;
					appendJobLog(job, `✗ ${doc.slug}: ${err?.message || String(err)}`);
				}
			}
		};

		const poolSize = Math.min(job.workers, targets.length);
		await Promise.all(Array.from({ length: poolSize }, () => workerFn()));

		const totalElapsed = Math.max(1, performance.now() - t0);
		job.elapsedMs = Math.round(totalElapsed);
		job.pdfsPerSec = Math.round((job.pdfsCompiled / (totalElapsed / 1000)) * 10) / 10;
		job.finishedAt = new Date().toISOString();
		job.status = job.failed > 0 && job.completed === 0 ? 'error' : 'done';
		appendJobLog(
			job,
			`اكتملت العملية: ${job.completed} موضوع بنجاح، ${job.failed} فشل، ${job.pdfsCompiled} ملف PDF بمعدل ${job.pdfsPerSec} PDF/ث`
		);
	} catch (err: any) {
		job.status = 'error';
		job.error = err?.message || String(err);
		job.elapsedMs = Math.round(performance.now() - t0);
		job.finishedAt = new Date().toISOString();
		appendJobLog(job, `خطأ فادح: ${job.error}`);
	}
}

/**
 * Starts an asynchronous multi-core in-RAM (`/dev/shm`) parallel Typst batch rebuild job.
 * Clamps `workers` to `1..12` (defaults to `10` on this 14-vCPU server).
 */
export function startScopedBatchRebuild(opts: {
	scope: BatchRebuildScope;
	workers?: number;
}): { jobId: string; totalTargets: number; workers: number } {
	const rawWorkers = typeof opts.workers === 'number' && Number.isFinite(opts.workers) ? opts.workers : 10;
	const workers = Math.max(1, Math.min(12, Math.floor(rawWorkers)));
	const scope: BatchRebuildScope = opts.scope || { all: true };
	const targets = queryRebuildTargets(scope);
	const ramInfo = getRamWorkspaceRoot();
	const jobId = `rb-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`;

	const job: RebuildJobState = {
		jobId,
		status: 'running',
		scope,
		workers,
		ramRoot: ramInfo.root,
		isRamDisk: ramInfo.isRamDisk,
		totalTargets: targets.length,
		completed: 0,
		failed: 0,
		pdfsCompiled: 0,
		pdfsPerSec: 0,
		elapsedMs: 0,
		startedAt: new Date().toISOString(),
		finishedAt: null,
		recentLogs: []
	};

	jobsMap.set(jobId, job);
	pruneOldJobs();

	const promise = runBatchRebuildJob(job, targets);
	jobPromises.set(jobId, promise);

	return {
		jobId,
		totalTargets: targets.length,
		workers
	};
}

export function getRebuildJobStatus(jobId: string): RebuildJobState | null {
	const job = jobsMap.get(jobId);
	if (!job) return null;
	if (job.status === 'running') {
		const startedMs = Date.parse(job.startedAt);
		if (Number.isFinite(startedMs)) {
			const elapsed = Math.max(1, Date.now() - startedMs);
			return {
				...job,
				elapsedMs: elapsed,
				pdfsPerSec: Math.round((job.pdfsCompiled / (elapsed / 1000)) * 10) / 10,
				recentLogs: [...job.recentLogs]
			};
		}
	}
	return { ...job, recentLogs: [...job.recentLogs] };
}

export function listRecentRebuildJobs(): RebuildJobState[] {
	return Array.from(jobsMap.values())
		.sort((a, b) => b.startedAt.localeCompare(a.startedAt))
		.map((j) => getRebuildJobStatus(j.jobId) || j);
}

/**
 * Awaits completion of a running rebuild job (useful for scripts & automated verification).
 */
export async function waitForRebuildJob(jobId: string): Promise<RebuildJobState | null> {
	const p = jobPromises.get(jobId);
	if (p) await p;
	return getRebuildJobStatus(jobId);
}
