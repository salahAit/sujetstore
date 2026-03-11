const fs = require('fs');
const files = [
  'src/routes/admin/levels/+page.svelte',
  'src/routes/admin/years/+page.svelte',
  'src/routes/admin/subjects/+page.svelte'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Backdrop
  content = content.replace(/bg-black\/80/g, 'bg-background/80');
  
  // Modal Container
  content = content.replace(/glass-card max-h-\[90vh\] w-full max-w-lg overflow-y-auto rounded-2xl border border-white\/10 p-6 shadow-2xl/g, 
    'bg-card text-card-foreground border-border max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6 shadow-2xl');

  // Close text
  content = content.replace(/text-white\/50 hover:text-white/g, 'text-muted-foreground hover:text-foreground');
  
  // Inputs (Text)
  content = content.replace(/border-white\/10 bg-black\/20 px-3 py-2 text-white/g, 'bg-background border-input text-foreground px-3 py-2');
  
  // Inputs (Slug)
  content = content.replace(/border-white\/10 bg-black\/20 px-3 py-2 text-blue-400/g, 'bg-background border-input text-blue-500 px-3 py-2');

  // Select Options styling
  content = content.replace(/\[&>option\]:bg-\[#0a0f1c\]/g, '[&>option]:bg-background');

  // Cancel buttons
  content = content.replace(/border-white\/10 bg-white\/5/g, 'border-border bg-secondary text-secondary-foreground');
  content = content.replace(/hover:bg-white\/10/g, 'hover:bg-secondary/80');
  
  // Title colors
  content = content.replace(/text-blue-400/g, 'text-primary');

  fs.writeFileSync(file, content);
});
console.log('Admin modals fixed!');
