import { contentDatabase, contentSchema } from './src/lib/server/db/index';
import { eq } from 'drizzle-orm';

async function test() {
    console.log('Testing metadata fetching...');
    try {
        const levels = await contentDatabase.select().from(contentSchema.educationLevels).all();
        console.log('Levels:', levels.length);
        
        const years = await contentDatabase.select().from(contentSchema.years).all();
        console.log('Years:', years.length);
        
        const subjects = await contentDatabase.select().from(contentSchema.subjects).all();
        console.log('Subjects:', subjects.length);
        
        const trimesters = await contentDatabase.select().from(contentSchema.trimesters).all();
        console.log('Trimesters:', trimesters.length);
        
        const yearSubjects = await contentDatabase
            .select({
                id: contentSchema.yearSubjects.id,
                yearId: contentSchema.yearSubjects.yearId,
                subjectId: contentSchema.yearSubjects.subjectId,
                subjectName: contentSchema.subjects.nameAr
            })
            .from(contentSchema.yearSubjects)
            .leftJoin(contentSchema.subjects, eq(contentSchema.yearSubjects.subjectId, contentSchema.subjects.id))
            .all();
        console.log('YearSubjects:', yearSubjects.length);
        
        console.log('All metadata fetched successfully!');
    } catch (e) {
        console.error('Error fetching metadata:', e);
    }
}

test();
