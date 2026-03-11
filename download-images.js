import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    console.log("Downloading heart image...");
    await page.goto('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Diagram_of_the_human_heart_%28cropped%29.svg/512px-Diagram_of_the_human_heart_%28cropped%29.svg.png');
    let buffer = await page.locator('img').screenshot();
    fs.writeFileSync('static/images/heart.png', buffer);

    console.log("Downloading cell image...");
    await page.goto('https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Animal_cell_structure_en.svg/512px-Animal_cell_structure_en.svg.png');
    buffer = await page.locator('img').screenshot();
    fs.writeFileSync('static/images/cell.png', buffer);

    await browser.close();
    console.log("Images downloaded successfully");
})();
