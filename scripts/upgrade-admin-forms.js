import fs from 'fs';
import path from 'path';

function getAllPages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllPages(filePath, fileList);
  } else if (filePath.endsWith('.svelte')) {
    fileList.push(filePath);
  }
}
  return fileList;
}

const svelteFiles = getAllPages('src/routes/admin');
let updatedCount = 0;

for (const file of svelteFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Upgrade Inputs
  // e.g. class="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-right text-sm outline-none focus:border-purple-500"
  content = content.replace(/border-white\/10 bg-black\/20([a-zA-Z0-9\-\s]*)text-white/g, 'bg-background border-input text-foreground$1focus:ring-ring');
  content = content.replace(/bg-black\/20/g, 'bg-background');
  content = content.replace(/bg-black\/80/g, 'bg-background/80');
  content = content.replace(/bg-[#0a0f1c]/g, 'bg-background');

  // Upgrade borders & cards
  content = content.replace(/border-white\/10/g, 'border-border');
  content = content.replace(/border-white\/20/g, 'border-border');
  content = content.replace(/bg-white\/5/g, 'bg-card text-card-foreground shadow-sm');
  content = content.replace(/bg-white\/10/g, 'bg-muted');

  // Text colors
  content = content.replace(/text-white\/70/g, 'text-foreground/80');
  content = content.replace(/text-white\/50/g, 'text-muted-foreground');
  content = content.replace(/ text-white/g, ' text-foreground');
  content = content.replace(/text-white /g, 'text-foreground ');
  content = content.replace(/"text-white"/g, '"text-foreground"');

  // Specific focus rings
  content = content.replace(/focus:border-(purple|blue|emerald|red)-500/g, 'focus:border-primary focus:ring-1 focus:ring-primary');
  content = content.replace(/focus:ring-(purple|blue|emerald|red)-500/g, 'focus:ring-primary');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated forms in: ${file}`);
    updatedCount++;
  }
}

console.log(`Finished updating forms in ${updatedCount} files.`);
