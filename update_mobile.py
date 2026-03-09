with open('src/routes/[level]/[year]/[subject]/+page.svelte', 'r') as f:
    content = f.read()

# 1. Tabs 
content = content.replace(
    '<div class="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">',
    '<div class="mb-6 flex gap-2 overflow-x-auto border-b border-white/10 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-8 sm:flex-wrap [&::-webkit-scrollbar]:hidden">'
)

content = content.replace(
    'class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all {activeTrimesterTab ===',
    'class="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all {activeTrimesterTab ==='
)

# 2. Row card
content = content.replace(
r"""<div
class="glass-card group flex flex-col justify-between gap-4 border-r-4 p-4 transition-all duration-300 hover:bg-white/5 sm:flex-row sm:items-center""" ,
r"""<div
class="glass-card group flex flex-col justify-between gap-3 border-r-4 p-3 transition-all duration-300 hover:bg-white/5 sm:flex-row sm:items-center sm:gap-4 sm:p-4"""
)

content = content.replace(
r"""<div class="flex min-w-0 flex-1 items-center gap-4">""",
r"""<div class="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">"""
)

# 3. Titles
content = content.replace(
r"""<div class="mb-1.5 flex flex-wrap items-center gap-2">
<h3 class="truncate text-base font-bold sm:text-lg">""",
r"""<div class="mb-1.5 flex flex-wrap items-start gap-2 sm:items-center">
<h3 class="text-sm font-bold leading-snug sm:truncate sm:text-lg">"""
)

# 4. Buttons area
content = content.replace(
r"""<div
class="mx-auto flex w-full shrink-0 flex-col items-center gap-2 border-t border-white/5 pt-3 sm:ms-4 sm:w-auto sm:flex-row sm:border-t-0 sm:pt-0"
>
<button
onclick={(e) => {
e.preventDefault();
openDoc(doc, 'exam');
}}
class="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 sm:w-auto sm:py-2""" ,
r"""<div
class="mx-auto flex w-full shrink-0 items-center gap-2 border-t border-white/5 pt-3 sm:ms-4 sm:w-auto sm:flex-row sm:border-t-0 sm:pt-0"
>
<button
onclick={(e) => {
e.preventDefault();
openDoc(doc, 'exam');
}}
class="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 sm:flex-none sm:py-2"""
)

content = content.replace(
r"""<button
onclick={(e) => {
e.preventDefault();
openDoc(doc, 'solution');
}}
class="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 sm:w-auto sm:py-2""",
r"""<button
onclick={(e) => {
e.preventDefault();
openDoc(doc, 'solution');
}}
class="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 sm:flex-none sm:py-2"""
)


with open('src/routes/[level]/[year]/[subject]/+page.svelte', 'w') as f:
    f.write(content)
