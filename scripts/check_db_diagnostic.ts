
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './src/lib/server/db/schema-content.ts';

const sqlite = new Database('./data/content.db');
const db = drizzle(sqlite, { schema });

async function checkData() {
    console.log("Checking bank_exercises...");
    const exercises = await db.select().from(schema.bankExercises).limit(5);
    console.log("Found exercises:", JSON.stringify(exercises, null, 2));

    console.log("\nChecking documents...");
    // documents table doesn't have a content column that is easy to check like this, 
    // but we can check if there are any that look like they have the old structure.
    const docs = await db.select().from(schema.documents).limit(2);
    console.log("Found documents sample:", JSON.stringify(docs, null, 2));
}

checkData().catch(console.error);
