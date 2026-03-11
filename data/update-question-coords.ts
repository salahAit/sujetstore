import { Database } from "bun:sqlite";
const db = new Database("data/content.db");

// Update Hotspot question (Heart)
const hotspotRecord = db.query("SELECT question_data FROM questions WHERE id = 241").get() as any;
if (hotspotRecord) {
    const data = JSON.parse(hotspotRecord.question_data);
    data.imageUrl = '/images/heart.png';
    // Reposition zones for the new AI heart diagram
    // Let's assume Left Ventricle is roughly in the bottom right area of the organ
    data.zones = [
        { x: 55, y: 70, radius: 15, label: 'البطين الأيسر' },
        { x: 35, y: 70, radius: 15, label: 'البطين الأيمن' }
    ];
    data.correctZone = 0; // Left Ventricle
    db.query("UPDATE questions SET question_data = ? WHERE id = 241").run(JSON.stringify(data));
    console.log("✅ Updated Hotspot (Heart) question");
}

// Update DragToImage question (Cell)
const dragRecord = db.query("SELECT question_data FROM questions WHERE id = 242").get() as any;
if (dragRecord) {
    const data = JSON.parse(dragRecord.question_data);
    data.imageUrl = '/images/cell.png';
    // Reposition targets for the new AI cell diagram
    // Nucleus is usually in the center (50, 50)
    data.targets = [
        { x: 50, y: 50, label: 'النواة' },
        { x: 80, y: 50, label: 'غشاء الخلية' }
    ];
    db.query("UPDATE questions SET question_data = ? WHERE id = 242").run(JSON.stringify(data));
    console.log("✅ Updated DragToImage (Cell) question");
}

console.log("Coord updates complete.");
