/**
 * سكريبت البيانات الأولية - المنهج الجزائري
 * نظام أكواد الامتحانات (Exam Code System)
 * bun run scripts/seed-education.ts
 */
import { Database } from 'bun:sqlite';

const db = new Database('data/content.db');

// Enable WAL mode
db.exec('PRAGMA journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS education_levels (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS years (
    id TEXT PRIMARY KEY,
    level_id TEXT NOT NULL REFERENCES education_levels(id),
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    "order" INTEGER NOT NULL DEFAULT 0,
    stream TEXT
  );

  CREATE TABLE IF NOT EXISTS streams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS level_streams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year_id TEXT NOT NULL REFERENCES years(id),
    stream_id TEXT NOT NULL REFERENCES streams(id)
  );

  CREATE TABLE IF NOT EXISTS subjects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    exam_group TEXT,
    icon TEXT,
    color TEXT
  );

  CREATE TABLE IF NOT EXISTS stream_subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stream_id TEXT NOT NULL REFERENCES streams(id),
    subject_id TEXT NOT NULL REFERENCES subjects(id),
    year_id TEXT REFERENCES years(id),
    coefficient INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS year_subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year_id TEXT NOT NULL REFERENCES years(id),
    subject_id TEXT NOT NULL REFERENCES subjects(id),
    stream_id TEXT REFERENCES streams(id),
    coefficient INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS trimesters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year_subject_id INTEGER NOT NULL REFERENCES year_subjects(id),
    trimester_id TEXT REFERENCES trimesters(id),
    title TEXT NOT NULL,
    title_ar TEXT,
    slug TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('exam', 'test', 'lesson', 'summary', 'exercise', 'solution')),
    content TEXT,
    pdf_url TEXT,
    solution_url TEXT,
    file_size INTEGER,
    source TEXT,
    academic_year TEXT,
    has_solution INTEGER DEFAULT 0,
    difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
    download_count INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT
  );
`);

// ============================================
// 1. المراحل التعليمية
// ============================================
const levels = [
	{
		id: 'primaire',
		name: 'التعليم الابتدائي',
		name_ar: 'التعليم الابتدائي',
		name_fr: 'Enseignement Primaire',
		slug: 'primaire',
		description: 'المرحلة الابتدائية من السنة الأولى إلى السنة الخامسة',
		icon: 'Backpack',
		color: '#10b981',
		order: 1
	},
	{
		id: 'moyen',
		name: 'التعليم المتوسط',
		name_ar: 'التعليم المتوسط',
		name_fr: 'Enseignement Moyen',
		slug: 'moyen',
		description: 'المرحلة المتوسطة من السنة الأولى إلى السنة الرابعة',
		icon: 'BookOpen',
		color: '#3b82f6',
		order: 2
	},
	{
		id: 'secondaire',
		name: 'التعليم الثانوي',
		name_ar: 'التعليم الثانوي',
		name_fr: 'Enseignement Secondaire',
		slug: 'secondaire',
		description: 'المرحلة الثانوية من السنة الأولى إلى السنة الثالثة',
		icon: 'GraduationCap',
		color: '#8b5cf6',
		order: 3
	}
];

// ============================================
// 2. السنوات الدراسية (with codes P1-S3)
// ============================================
const yearsData = [
	// ابتدائي P1-P5
	{ id: '1ap', level_id: 'primaire', name: 'السنة الأولى ابتدائي', name_ar: 'السنة الأولى ابتدائي', name_fr: '1ère Année Primaire', slug: '1ap', order: 1, code: 'P1' },
	{ id: '2ap', level_id: 'primaire', name: 'السنة الثانية ابتدائي', name_ar: 'السنة الثانية ابتدائي', name_fr: '2ème Année Primaire', slug: '2ap', order: 2, code: 'P2' },
	{ id: '3ap', level_id: 'primaire', name: 'السنة الثالثة ابتدائي', name_ar: 'السنة الثالثة ابتدائي', name_fr: '3ème Année Primaire', slug: '3ap', order: 3, code: 'P3' },
	{ id: '4ap', level_id: 'primaire', name: 'السنة الرابعة ابتدائي', name_ar: 'السنة الرابعة ابتدائي', name_fr: '4ème Année Primaire', slug: '4ap', order: 4, code: 'P4' },
	{ id: '5ap', level_id: 'primaire', name: 'السنة الخامسة ابتدائي', name_ar: 'السنة الخامسة ابتدائي', name_fr: '5ème Année Primaire', slug: '5ap', order: 5, code: 'P5' },
	// متوسط M1-M4
	{ id: '1am', level_id: 'moyen', name: 'السنة الأولى متوسط', name_ar: 'السنة الأولى متوسط', name_fr: '1ère Année Moyenne', slug: '1am', order: 1, code: 'M1' },
	{ id: '2am', level_id: 'moyen', name: 'السنة الثانية متوسط', name_ar: 'السنة الثانية متوسط', name_fr: '2ème Année Moyenne', slug: '2am', order: 2, code: 'M2' },
	{ id: '3am', level_id: 'moyen', name: 'السنة الثالثة متوسط', name_ar: 'السنة الثالثة متوسط', name_fr: '3ème Année Moyenne', slug: '3am', order: 3, code: 'M3' },
	{ id: '4am', level_id: 'moyen', name: 'السنة الرابعة متوسط', name_ar: 'السنة الرابعة متوسط (BEM)', name_fr: '4ème Année Moyenne', slug: '4am', order: 4, code: 'M4' },
	// ثانوي S1-S3
	{ id: '1as', level_id: 'secondaire', name: 'السنة الأولى ثانوي', name_ar: 'السنة الأولى ثانوي', name_fr: '1ère Année Secondaire', slug: '1as', order: 1, code: 'S1' },
	{ id: '2as', level_id: 'secondaire', name: 'السنة الثانية ثانوي', name_ar: 'السنة الثانية ثانوي', name_fr: '2ème Année Secondaire', slug: '2as', order: 2, code: 'S2' },
	{ id: '3as', level_id: 'secondaire', name: 'السنة الثالثة ثانوي', name_ar: 'السنة الثالثة ثانوي (BAC)', name_fr: '3ème Année Secondaire', slug: '3as', order: 3, code: 'S3' },
];

// ============================================
// 3. الشعب والجذوع (Streams)
// ============================================
const streamsData = [
	{ id: 'GEN',  name: 'General', name_ar: 'تعليم عام', name_fr: 'Général', order: 0 },
	{ id: 'TCST', name: 'Science & Technology', name_ar: 'جذع مشترك علوم وتكنولوجيا', name_fr: 'Tronc Commun Sciences et Technologie', order: 1 },
	{ id: 'TCL',  name: 'Literature', name_ar: 'جذع مشترك آداب', name_fr: 'Tronc Commun Lettres', order: 2 },
	{ id: 'SE',   name: 'Experimental Sciences', name_ar: 'علوم تجريبية', name_fr: 'Sciences Expérimentales', order: 3 },
	{ id: 'MATH', name: 'Mathematics', name_ar: 'رياضيات', name_fr: 'Mathématiques', order: 4 },
	{ id: 'TM',   name: 'Technical Mathematics', name_ar: 'تقني رياضي', name_fr: 'Technique Mathématique', order: 5 },
	{ id: 'GE',   name: 'Management & Economics', name_ar: 'تسيير واقتصاد', name_fr: 'Gestion et Économie', order: 6 },
	{ id: 'LP',   name: 'Literature & Philosophy', name_ar: 'آداب وفلسفة', name_fr: 'Lettres et Philosophie', order: 7 },
	{ id: 'LE',   name: 'Foreign Languages', name_ar: 'لغات أجنبية', name_fr: 'Langues Étrangères', order: 8 },
];

// ============================================
// 4. ربط الشعب بالمستويات (Level-Stream)
// ============================================
const levelStreamsMap: Record<string, string[]> = {
	// الابتدائي والمتوسط: تعليم عام فقط
	'1ap': ['GEN'], '2ap': ['GEN'], '3ap': ['GEN'], '4ap': ['GEN'], '5ap': ['GEN'],
	'1am': ['GEN'], '2am': ['GEN'], '3am': ['GEN'], '4am': ['GEN'],
	// سنة أولى ثانوي: جذعان مشتركان
	'1as': ['TCST', 'TCL'],
	// سنة ثانية وثالثة ثانوي: جميع التخصصات
	'2as': ['SE', 'MATH', 'TM', 'GE', 'LP', 'LE'],
	'3as': ['SE', 'MATH', 'TM', 'GE', 'LP', 'LE'],
};

// ============================================
// 5. المواد ـ أكواد الامتحانات (Exam Code Subjects)
// ============================================
const subjectsData = [
	// --- مواد الابتدائي/المتوسط (لاحقة -B) ---
	{ id: 'ARB-B',  name: 'Arabic', name_ar: 'اللغة العربية', name_fr: 'Langue Arabe', slug: 'arb-b', exam_group: 'arabic', icon: 'PenTool', color: '#10b981' },
	{ id: 'MAT-B',  name: 'Mathematics', name_ar: 'الرياضيات', name_fr: 'Mathématiques', slug: 'mat-b', exam_group: 'math', icon: 'Calculator', color: '#ef4444' },
	{ id: 'FRE-B',  name: 'French', name_ar: 'اللغة الفرنسية', name_fr: 'Langue Française', slug: 'fre-b', exam_group: 'french', icon: 'MessageCircle', color: '#3b82f6' },
	{ id: 'ENG-B',  name: 'English', name_ar: 'اللغة الإنجليزية', name_fr: 'Langue Anglaise', slug: 'eng-b', exam_group: 'english', icon: 'MessageCircleCode', color: '#6366f1' },
	{ id: 'SCI-B',  name: 'Natural Sciences', name_ar: 'علوم الطبيعة والحياة', name_fr: 'Sciences Naturelles', slug: 'sci-b', exam_group: 'science', icon: 'Microscope', color: '#22c55e' },
	{ id: 'PHY-B',  name: 'Physics & Technology', name_ar: 'العلوم الفيزيائية والتكنولوجيا', name_fr: 'Sciences Physiques et Technologie', slug: 'phy-b', exam_group: 'physics', icon: 'Zap', color: '#f59e0b' },
	{ id: 'ISL-B',  name: 'Islamic Education', name_ar: 'التربية الإسلامية', name_fr: 'Éducation Islamique', slug: 'isl-b', exam_group: 'islamic', icon: 'Book', color: '#059669' },
	{ id: 'HIS-B',  name: 'History & Geography', name_ar: 'التاريخ والجغرافيا', name_fr: 'Histoire-Géographie', slug: 'his-b', exam_group: 'history', icon: 'Globe', color: '#8b5cf6' },
	{ id: 'CIV-B',  name: 'Civic Education', name_ar: 'التربية المدنية', name_fr: 'Éducation Civique', slug: 'civ-b', exam_group: 'civic', icon: 'Scale', color: '#0891b2' },
	{ id: 'AMZ-B',  name: 'Amazigh', name_ar: 'اللغة الأمازيغية', name_fr: 'Langue Amazighe', slug: 'amz-b', exam_group: 'amazigh', icon: 'Languages', color: '#d97706' },

	// --- مواد الثانوي: اللغة العربية ---
	{ id: 'ARB-SCI', name: 'Arabic (Scientific)', name_ar: 'اللغة العربية (العلمي)', name_fr: 'Arabe (Scientifique)', slug: 'arb-sci', exam_group: 'arabic', icon: 'PenTool', color: '#10b981' },
	{ id: 'ARB-LP',  name: 'Arabic (Literature)', name_ar: 'اللغة العربية (آداب)', name_fr: 'Arabe (Lettres)', slug: 'arb-lp', exam_group: 'arabic', icon: 'PenTool', color: '#10b981' },
	{ id: 'ARB-LE',  name: 'Arabic (Languages)', name_ar: 'اللغة العربية (لغات)', name_fr: 'Arabe (Langues)', slug: 'arb-le', exam_group: 'arabic', icon: 'PenTool', color: '#10b981' },

	// --- مواد الثانوي: الرياضيات ---
	{ id: 'MAT-SE',   name: 'Mathematics (SE)', name_ar: 'الرياضيات (علوم تجريبية)', name_fr: 'Mathématiques (SE)', slug: 'mat-se', exam_group: 'math', icon: 'Calculator', color: '#ef4444' },
	{ id: 'MAT-MATH', name: 'Mathematics (Math)', name_ar: 'الرياضيات (رياضيات)', name_fr: 'Mathématiques (Math)', slug: 'mat-math', exam_group: 'math', icon: 'Calculator', color: '#ef4444' },
	{ id: 'MAT-TM',   name: 'Mathematics (TM)', name_ar: 'الرياضيات (تقني رياضي)', name_fr: 'Mathématiques (TM)', slug: 'mat-tm', exam_group: 'math', icon: 'Calculator', color: '#ef4444' },
	{ id: 'MAT-GE',   name: 'Mathematics (GE)', name_ar: 'الرياضيات (تسيير)', name_fr: 'Mathématiques (GE)', slug: 'mat-ge', exam_group: 'math', icon: 'Calculator', color: '#ef4444' },
	{ id: 'MAT-LIT',  name: 'Mathematics (Literary)', name_ar: 'الرياضيات (أدبي)', name_fr: 'Mathématiques (Littéraire)', slug: 'mat-lit', exam_group: 'math', icon: 'Calculator', color: '#ef4444' },

	// --- مواد الثانوي: الفيزياء ---
	{ id: 'PHY-SE',  name: 'Physics (SE)', name_ar: 'العلوم الفيزيائية (علوم تجريبية)', name_fr: 'Physique (SE)', slug: 'phy-se', exam_group: 'physics', icon: 'Zap', color: '#f59e0b' },
	{ id: 'PHY-MTM', name: 'Physics (Math/TM)', name_ar: 'العلوم الفيزيائية (رياضي/تقني)', name_fr: 'Physique (Math/TM)', slug: 'phy-mtm', exam_group: 'physics', icon: 'Zap', color: '#f59e0b' },

	// --- مواد الثانوي: العلوم الطبيعية ---
	{ id: 'SCI-SE',   name: 'Natural Sciences (SE)', name_ar: 'العلوم الطبيعية (علوم تجريبية)', name_fr: 'Sciences Naturelles (SE)', slug: 'sci-se', exam_group: 'science', icon: 'Microscope', color: '#22c55e' },
	{ id: 'SCI-MATH', name: 'Natural Sciences (Math)', name_ar: 'العلوم الطبيعية (رياضيات)', name_fr: 'Sciences Naturelles (Math)', slug: 'sci-math', exam_group: 'science', icon: 'Microscope', color: '#22c55e' },

	// --- مواد الثانوي: تاريخ وجغرافيا ---
	{ id: 'HIS-SCI', name: 'History (Scientific)', name_ar: 'التاريخ والجغرافيا (العلمي)', name_fr: 'Histoire-Géo (Scientifique)', slug: 'his-sci', exam_group: 'history', icon: 'Globe', color: '#8b5cf6' },
	{ id: 'HIS-GE',  name: 'History (GE)', name_ar: 'التاريخ والجغرافيا (تسيير)', name_fr: 'Histoire-Géo (GE)', slug: 'his-ge', exam_group: 'history', icon: 'Globe', color: '#8b5cf6' },
	{ id: 'HIS-LP',  name: 'History (LP)', name_ar: 'التاريخ والجغرافيا (آداب)', name_fr: 'Histoire-Géo (LP)', slug: 'his-lp', exam_group: 'history', icon: 'Globe', color: '#8b5cf6' },
	{ id: 'HIS-LE',  name: 'History (LE)', name_ar: 'التاريخ والجغرافيا (لغات)', name_fr: 'Histoire-Géo (LE)', slug: 'his-le', exam_group: 'history', icon: 'Globe', color: '#8b5cf6' },

	// --- مواد الثانوي: اللغات الأجنبية (فرنسية/إنجليزية) ---
	{ id: 'FRE-SEC', name: 'French', name_ar: 'اللغة الفرنسية', name_fr: 'Langue Française', slug: 'fre-sec', exam_group: 'french', icon: 'MessageCircle', color: '#3b82f6' },
	{ id: 'ENG-SEC', name: 'English', name_ar: 'اللغة الإنجليزية', name_fr: 'Langue Anglaise', slug: 'eng-sec', exam_group: 'english', icon: 'MessageCircleCode', color: '#6366f1' },
	{ id: 'LANG-SCI', name: 'Languages (Scientific)', name_ar: 'اللغات الأجنبية (العلمي)', name_fr: 'Langues (Scientifique)', slug: 'lang-sci', exam_group: 'languages', icon: 'MessageCircle', color: '#3b82f6' },
	{ id: 'LANG-LP',  name: 'Languages (LP)', name_ar: 'اللغات الأجنبية (آداب)', name_fr: 'Langues (LP)', slug: 'lang-lp', exam_group: 'languages', icon: 'MessageCircle', color: '#3b82f6' },
	{ id: 'LANG-LE',  name: 'Languages (LE)', name_ar: 'اللغات الأجنبية (لغات)', name_fr: 'Langues (LE)', slug: 'lang-le', exam_group: 'languages', icon: 'MessageCircle', color: '#3b82f6' },

	// --- مواد الثانوي: الفلسفة ---
	{ id: 'PHI-SCI', name: 'Philosophy (Scientific)', name_ar: 'الفلسفة (العلمي)', name_fr: 'Philosophie (Scientifique)', slug: 'phi-sci', exam_group: 'philosophy', icon: 'Brain', color: '#7c3aed' },
	{ id: 'PHI-GE',  name: 'Philosophy (GE)', name_ar: 'الفلسفة (تسيير)', name_fr: 'Philosophie (GE)', slug: 'phi-ge', exam_group: 'philosophy', icon: 'Brain', color: '#7c3aed' },
	{ id: 'PHI-LP',  name: 'Philosophy (LP)', name_ar: 'الفلسفة (آداب)', name_fr: 'Philosophie (LP)', slug: 'phi-lp', exam_group: 'philosophy', icon: 'Brain', color: '#7c3aed' },
	{ id: 'PHI-LE',  name: 'Philosophy (LE)', name_ar: 'الفلسفة (لغات)', name_fr: 'Philosophie (LE)', slug: 'phi-le', exam_group: 'philosophy', icon: 'Brain', color: '#7c3aed' },

	// --- مواد موحدة لجميع الشعب ---
	{ id: 'ISL-ALL', name: 'Islamic Education (All)', name_ar: 'التربية الإسلامية', name_fr: 'Éducation Islamique', slug: 'isl-all', exam_group: 'islamic', icon: 'Book', color: '#059669' },
	{ id: 'AMZ-ALL', name: 'Amazigh (All)', name_ar: 'اللغة الأمازيغية', name_fr: 'Langue Amazighe', slug: 'amz-all', exam_group: 'amazigh', icon: 'Languages', color: '#d97706' },

	// --- مواد التخصص الدقيق: تقني رياضي ---
	{ id: 'TECH-CIV', name: 'Civil Engineering', name_ar: 'تكنولوجيا (هندسة مدنية)', name_fr: 'Technologie (Génie Civil)', slug: 'tech-civ', exam_group: 'technology', icon: 'Building2', color: '#78716c' },
	{ id: 'TECH-MEC', name: 'Mechanical Engineering', name_ar: 'تكنولوجيا (هندسة ميكانيكية)', name_fr: 'Technologie (Génie Mécanique)', slug: 'tech-mec', exam_group: 'technology', icon: 'Wrench', color: '#78716c' },
	{ id: 'TECH-ELE', name: 'Electrical Engineering', name_ar: 'تكنولوجيا (هندسة كهربائية)', name_fr: 'Technologie (Génie Électrique)', slug: 'tech-ele', exam_group: 'technology', icon: 'PlugZap', color: '#78716c' },
	{ id: 'TECH-PRO', name: 'Process Engineering', name_ar: 'تكنولوجيا (هندسة الطرائق)', name_fr: 'Technologie (Génie des Procédés)', slug: 'tech-pro', exam_group: 'technology', icon: 'FlaskConical', color: '#78716c' },

	// --- مواد التخصص الدقيق: تسيير واقتصاد ---
	{ id: 'ACC-FIN', name: 'Accounting & Finance', name_ar: 'التسيير المحاسبي والمالي', name_fr: 'Comptabilité et Finance', slug: 'acc-fin', exam_group: 'management', icon: 'Receipt', color: '#0d9488' },
	{ id: 'ECO-MAN', name: 'Economics & Management', name_ar: 'الاقتصاد والمناجمنت', name_fr: 'Économie et Management', slug: 'eco-man', exam_group: 'management', icon: 'TrendingUp', color: '#0d9488' },
	{ id: 'LAW',     name: 'Law', name_ar: 'القانون', name_fr: 'Droit', slug: 'law', exam_group: 'management', icon: 'Gavel', color: '#0d9488' },

	// --- مواد التخصص الدقيق: لغات أجنبية ---
	{ id: 'LAN-SPA', name: 'Spanish', name_ar: 'اللغة الإسبانية', name_fr: 'Langue Espagnole', slug: 'lan-spa', exam_group: 'third_language', icon: 'Languages', color: '#dc2626' },
	{ id: 'LAN-GER', name: 'German', name_ar: 'اللغة الألمانية', name_fr: 'Langue Allemande', slug: 'lan-ger', exam_group: 'third_language', icon: 'Languages', color: '#dc2626' },
	{ id: 'LAN-ITA', name: 'Italian', name_ar: 'اللغة الإيطالية', name_fr: 'Langue Italienne', slug: 'lan-ita', exam_group: 'third_language', icon: 'Languages', color: '#dc2626' },
];

// ============================================
// 6. الفصول الدراسية
// ============================================
const trimestersData = [
	{ id: 't1', name: 'الفصل الأول', name_ar: 'الفصل الأول', name_fr: '1er Trimestre', order: 1 },
	{ id: 't2', name: 'الفصل الثاني', name_ar: 'الفصل الثاني', name_fr: '2ème Trimestre', order: 2 },
	{ id: 't3', name: 'الفصل الثالث', name_ar: 'الفصل الثالث', name_fr: '3ème Trimestre', order: 3 }
];

// ============================================
// 7. ربط المواد بالشعب (القاعدة الذهبية)
//    stream → [subject exam codes]
// ============================================
type StreamSubjectEntry = { stream: string; subjects: string[]; years?: string[] };

const streamSubjectsMap: StreamSubjectEntry[] = [
	// الابتدائي (GEN): مواد -B
	{ stream: 'GEN', subjects: ['ARB-B', 'MAT-B', 'FRE-B', 'ISL-B', 'CIV-B'], years: ['1ap', '2ap'] },
	{ stream: 'GEN', subjects: ['ARB-B', 'MAT-B', 'FRE-B', 'ISL-B', 'CIV-B', 'SCI-B', 'HIS-B'], years: ['3ap'] },
	{ stream: 'GEN', subjects: ['ARB-B', 'MAT-B', 'FRE-B', 'ISL-B', 'CIV-B', 'SCI-B', 'HIS-B', 'AMZ-B'], years: ['4ap', '5ap'] },

	// المتوسط (GEN): مواد -B مع إضافة فيزياء وإنجليزية وأمازيغية
	{ stream: 'GEN', subjects: ['ARB-B', 'MAT-B', 'FRE-B', 'ENG-B', 'SCI-B', 'PHY-B', 'ISL-B', 'HIS-B', 'CIV-B', 'AMZ-B'], years: ['1am', '2am', '3am', '4am'] },

	// سنة أولى ثانوي: جذع مشترك علوم وتكنولوجيا
	{ stream: 'TCST', subjects: ['ARB-SCI', 'MAT-SE', 'PHY-SE', 'SCI-SE', 'FRE-SEC', 'ENG-SEC', 'HIS-SCI', 'ISL-ALL', 'PHI-SCI', 'AMZ-ALL'], years: ['1as'] },
	// سنة أولى ثانوي: جذع مشترك آداب
	{ stream: 'TCL', subjects: ['ARB-LP', 'MAT-LIT', 'FRE-SEC', 'ENG-SEC', 'HIS-LP', 'ISL-ALL', 'PHI-LP', 'AMZ-ALL'], years: ['1as'] },

	// علوم تجريبية (S2, S3)
	{ stream: 'SE', subjects: ['ARB-SCI', 'MAT-SE', 'PHY-SE', 'SCI-SE', 'FRE-SEC', 'ENG-SEC', 'HIS-SCI', 'ISL-ALL', 'PHI-SCI', 'AMZ-ALL'], years: ['2as', '3as'] },
	// رياضيات (S2, S3)
	{ stream: 'MATH', subjects: ['ARB-SCI', 'MAT-MATH', 'PHY-MTM', 'SCI-MATH', 'FRE-SEC', 'ENG-SEC', 'HIS-SCI', 'ISL-ALL', 'PHI-SCI', 'AMZ-ALL'], years: ['2as', '3as'] },
	// تقني رياضي (S2, S3)
	{ stream: 'TM', subjects: ['ARB-SCI', 'MAT-TM', 'PHY-MTM', 'FRE-SEC', 'ENG-SEC', 'HIS-SCI', 'ISL-ALL', 'PHI-SCI', 'TECH-CIV', 'TECH-MEC', 'TECH-ELE', 'TECH-PRO', 'AMZ-ALL'], years: ['2as', '3as'] },
	// تسيير واقتصاد (S2, S3)
	{ stream: 'GE', subjects: ['ARB-SCI', 'MAT-GE', 'FRE-SEC', 'ENG-SEC', 'HIS-GE', 'ISL-ALL', 'PHI-GE', 'ACC-FIN', 'ECO-MAN', 'LAW', 'AMZ-ALL'], years: ['2as', '3as'] },
	// آداب وفلسفة (S2, S3)
	{ stream: 'LP', subjects: ['ARB-LP', 'MAT-LIT', 'FRE-SEC', 'ENG-SEC', 'HIS-LP', 'ISL-ALL', 'PHI-LP', 'AMZ-ALL'], years: ['2as', '3as'] },
	// لغات أجنبية (S2, S3)
	{ stream: 'LE', subjects: ['ARB-LE', 'MAT-LIT', 'FRE-SEC', 'ENG-SEC', 'HIS-LE', 'ISL-ALL', 'PHI-LE', 'LAN-SPA', 'LAN-GER', 'LAN-ITA', 'AMZ-ALL'], years: ['2as', '3as'] },
];

// ============================================
// SEED EXECUTION
// ============================================

console.log('🌱 بدء ملء قاعدة البيانات بنظام أكواد الامتحانات...\n');

// Clear existing data (order matters for FK constraints)
db.exec('DELETE FROM documents');
db.exec('DELETE FROM year_subjects');
db.exec('DELETE FROM stream_subjects');
db.exec('DELETE FROM level_streams');
db.exec('DELETE FROM trimesters');
db.exec('DELETE FROM subjects');
db.exec('DELETE FROM streams');
db.exec('DELETE FROM years');
db.exec('DELETE FROM education_levels');

// 1. Insert levels
const insertLevel = db.prepare(
	'INSERT INTO education_levels (id, name, name_ar, name_fr, slug, description, icon, color, "order") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
for (const l of levels) {
	insertLevel.run(l.id, l.name, l.name_ar, l.name_fr, l.slug, l.description, l.icon, l.color, l.order);
}
console.log(`✅ ${levels.length} مراحل تعليمية`);

// 2. Insert years
const insertYear = db.prepare(
	'INSERT INTO years (id, level_id, name, name_ar, name_fr, slug, "order") VALUES (?, ?, ?, ?, ?, ?, ?)'
);
for (const y of yearsData) {
	insertYear.run(y.id, y.level_id, y.name, y.name_ar, y.name_fr, y.slug, y.order);
}
console.log(`✅ ${yearsData.length} سنة دراسية`);

// 3. Insert streams
const insertStream = db.prepare(
	'INSERT INTO streams (id, name, name_ar, name_fr, "order") VALUES (?, ?, ?, ?, ?)'
);
for (const s of streamsData) {
	insertStream.run(s.id, s.name, s.name_ar, s.name_fr, s.order);
}
console.log(`✅ ${streamsData.length} شعبة/جذع`);

// 4. Insert level_streams
const insertLS = db.prepare('INSERT INTO level_streams (year_id, stream_id) VALUES (?, ?)');
let lsCount = 0;
for (const [yearId, streamIds] of Object.entries(levelStreamsMap)) {
	for (const sid of streamIds) {
		insertLS.run(yearId, sid);
		lsCount++;
	}
}
console.log(`✅ ${lsCount} ربط مستوى-شعبة`);

// 5. Insert subjects
const insertSubject = db.prepare(
	'INSERT INTO subjects (id, name, name_ar, name_fr, slug, exam_group, icon, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);
for (const s of subjectsData) {
	insertSubject.run(s.id, s.name, s.name_ar, s.name_fr, s.slug, s.exam_group, s.icon, s.color);
}
console.log(`✅ ${subjectsData.length} مادة (كود امتحان)`);

// 6. Insert trimesters
const insertTrimester = db.prepare(
	'INSERT INTO trimesters (id, name, name_ar, name_fr, "order") VALUES (?, ?, ?, ?, ?)'
);
for (const t of trimestersData) {
	insertTrimester.run(t.id, t.name, t.name_ar, t.name_fr, t.order);
}
console.log(`✅ ${trimestersData.length} فصول دراسية`);

// 7. Insert stream_subjects + auto-populate year_subjects (compatibility layer)
const insertSS = db.prepare(
	'INSERT INTO stream_subjects (stream_id, subject_id, year_id, "order") VALUES (?, ?, ?, ?)'
);
const insertYS = db.prepare(
	'INSERT INTO year_subjects (year_id, subject_id, stream_id, "order") VALUES (?, ?, ?, ?)'
);
let ssCount = 0;
let ysCount = 0;
for (const entry of streamSubjectsMap) {
	const targetYears = entry.years || [];
	for (const yearId of targetYears) {
		for (let i = 0; i < entry.subjects.length; i++) {
			const subjectId = entry.subjects[i];
			// Insert into stream_subjects
			insertSS.run(entry.stream, subjectId, yearId, i + 1);
			ssCount++;
			// Auto-populate year_subjects (compatibility)
			insertYS.run(yearId, subjectId, entry.stream, i + 1);
			ysCount++;
		}
	}
}
console.log(`✅ ${ssCount} ربط شعبة-مادة (stream_subjects)`);
console.log(`✅ ${ysCount} ربط سنة-مادة (year_subjects - توافق)`);

console.log('\n🎉 تم ملء قاعدة البيانات بنظام أكواد الامتحانات بنجاح!');
console.log('📋 ملخص النظام:');
console.log(`   - ${levels.length} أطوار تعليمية`);
console.log(`   - ${yearsData.length} مستوى دراسي (P1-S3)`);
console.log(`   - ${streamsData.length} شعبة/جذع`);
console.log(`   - ${subjectsData.length} كود امتحان`);

db.close();
