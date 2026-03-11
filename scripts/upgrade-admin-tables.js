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

  // Table Wrapper
  content = content.replace(/class="glass-card overflow-hidden rounded-2xl border border-white\/10"/g, 
    'class="bg-card text-card-foreground border-border overflow-hidden rounded-2xl border shadow-sm"');
  
  content = content.replace(/class="glass-card overflow-hidden rounded-2xl border border-black\/5 dark:border-white\/10"/g, 
    'class="bg-card text-card-foreground border-border overflow-hidden rounded-2xl border shadow-sm"');

  // Thead
  content = content.replace(/<thead class="border-b border-white\/10 bg-white\/5 text-xs text-white\/50">/g, 
    '<thead class="border-b border-border bg-muted/50 text-xs text-muted-foreground">');

  content = content.replace(/<thead class="text-muted-foreground border-b border-black\/5 bg-black\/5 text-xs dark:border-white\/10 dark:bg-white\/5">/g, 
    '<thead class="border-b border-border bg-muted/50 text-xs text-muted-foreground">');

  // Tbody
  content = content.replace(/<tbody class="divide-y divide-white\/10">/g, 
    '<tbody class="divide-y divide-border">');

  content = content.replace(/<tbody class="divide-y divide-black\/5 dark:divide-white\/10">/g, 
    '<tbody class="divide-y divide-border">');

  // Tr (inside tbody usually has hover:bg-white/5)
  content = content.replace(/<tr class="transition-colors hover:bg-white\/5">/g, 
    '<tr class="transition-colors hover:bg-muted/50">');
  
  content = content.replace(/<tr class="transition-colors hover:bg-black\/5 dark:hover:bg-white\/5">/g, 
    '<tr class="transition-colors hover:bg-muted/50">');
  
  // Specific fix for text-white/70 or text-white/50 in td
  content = content.replace(/text-white\/70/g, 'text-foreground/80');
  content = content.replace(/text-white\/50/g, 'text-muted-foreground');

  // Buttons in table: edit, delete, external link, view
  // Replacing `text-blue-400 hover:text-blue-300` variants
  content = content.replace(/text-blue-400 transition-colors hover:text-blue-300/g, 'text-primary transition-colors hover:text-primary/80');
  content = content.replace(/text-emerald-400 transition-colors hover:text-emerald-300/g, 'text-emerald-600 dark:text-emerald-400 transition-colors hover:opacity-80');
  content = content.replace(/text-red-400 transition-colors hover:text-red-300/g, 'text-red-600 dark:text-red-400 transition-colors hover:opacity-80');
  
  // Empty states
  content = content.replace(/colspan="([0-9]+)" class="px-6 py-8 text-center text-white\/50"/g, 'colspan="$1" class="px-6 py-8 text-center text-muted-foreground"');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated tables in: ${file}`);
    updatedCount++;
  }
}

console.log(`Finished updating tables in ${updatedCount} files.`);
