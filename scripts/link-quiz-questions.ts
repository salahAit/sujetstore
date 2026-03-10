import { Database } from "bun:sqlite";
const db = new Database("data/content.db");

// Get all new quizzes that have 0 questions linked
const emptyQuizzes = db.query("SELECT q.id, q.slug FROM quizzes q WHERE q.id NOT IN (SELECT DISTINCT quiz_id FROM quiz_questions) ORDER BY q.id").all() as any[];
console.log("Empty quizzes:", emptyQuizzes.map((q: any) => q.slug));

// Get category name -> id mapping
const cats = db.query("SELECT id, name FROM question_categories").all() as any[];
const catMap: Record<string, number[]> = {};
for (const c of cats) {
    if (!catMap[c.name]) catMap[c.name] = [];
    catMap[c.name].push(c.id);
}

// Map quiz slugs to expected categories
const quizCatMapping: Record<string, string[]> = {
    'middle-algebra-quiz': ['الجبر'],
    'middle-physics-quiz': ['الكهرباء'],
    'secondary-analysis-quiz': ['التحليل والدوال'],
    'secondary-mechanics-quiz': ['الميكانيك'],
    'secondary-biology-quiz': ['علم الأحياء'],
    'primary-math-quiz': ['الحساب والعمليات', 'الهندسة'],
};

for (const quiz of emptyQuizzes) {
    const catNames = quizCatMapping[quiz.slug];
    if (!catNames) continue;

    const catIds = catNames.flatMap(n => catMap[n] || []);
    if (catIds.length === 0) continue;

    const placeholders = catIds.map(() => '?').join(',');
    const qs = db.query(`SELECT id FROM questions WHERE category_id IN (${placeholders}) ORDER BY id`).all(...catIds) as any[];

    for (let i = 0; i < qs.length; i++) {
        db.run('INSERT OR IGNORE INTO quiz_questions (quiz_id, question_id, "order", points) VALUES (?, ?, ?, 2)', [quiz.id, qs[i].id, i + 1]);
    }

    db.run("UPDATE quizzes SET question_count = ? WHERE id = ?", [qs.length, quiz.id]);
    console.log(`✅ ${quiz.slug}: linked ${qs.length} questions`);
}

// Final stats
const total = db.query("SELECT COUNT(*) as c FROM quizzes").get() as any;
const links = db.query("SELECT COUNT(*) as c FROM quiz_questions").get() as any;
const qs = db.query("SELECT COUNT(*) as c FROM questions").get() as any;
console.log(`\n🎉 Final: ${total.c} quizzes, ${qs.c} questions, ${links.c} links`);
db.close();
