<script lang="ts">
	import { 
		Bold, Italic, Code, Image as ImageIcon, 
		FunctionSquare, FileCode2, Loader2
	} from 'lucide-svelte';

	let { value = $bindable(), placeholder = 'أدخل النص هنا...', minHeight = 'min-h-[120px]' } = $props();

	let fileInput: HTMLInputElement;
	let isUploading = $state(false);
	let editorRef: HTMLTextAreaElement;

	function insertTextAtCursor(textToInsert: string, cursorOffset = 0) {
		if (!editorRef) return;
		const start = editorRef.selectionStart;
		const end = editorRef.selectionEnd;
		
		const currentVal = value || '';
		const before = currentVal.substring(0, start);
		const after = currentVal.substring(end);
		
		value = before + textToInsert + after;
		
		// Set cursor position back focus
		setTimeout(() => {
			editorRef.focus();
			editorRef.setSelectionRange(start + cursorOffset, start + cursorOffset);
		}, 0);
	}

	function insertBold() {
		insertTextAtCursor('**نص عريض**', 2);
	}

	function insertItalic() {
		insertTextAtCursor('_نص مائل_', 1);
	}

	function insertCode() {
		insertTextAtCursor('`كود برمجي`', 1);
	}

	function insertMathInline() {
		insertTextAtCursor('$ x^2 $', 2);
	}

	function insertMathBlock() {
		insertTextAtCursor('\n$$\n\\frac{a}{b}\n$$\n', 4);
	}

	async function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		isUploading = true;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/admin/upload-image', {
				method: 'POST',
				body: formData
			});
			if (!res.ok) throw new Error('فشل الرفع');
			
			const data = await res.json();
			insertTextAtCursor(`![صورة](${data.url})`, 8);
		} catch (error) {
			console.error(error);
			alert('حدث خطأ أثناء رفع الصورة');
		} finally {
			isUploading = false;
			if (fileInput) fileInput.value = '';
		}
	}
</script>

<div class="flex flex-col rounded-xl border border-border bg-background shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all">
	<!-- Toolbar -->
	<div class="flex flex-wrap items-center gap-1 border-b border-border bg-muted/20 p-2">
		<button type="button" onclick={insertBold} class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="عريض">
			<Bold size={16} />
		</button>
		<button type="button" onclick={insertItalic} class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="مائل">
			<Italic size={16} />
		</button>
		<div class="h-4 w-px bg-border mx-1"></div>
		<button type="button" onclick={insertCode} class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="كود">
			<Code size={16} />
		</button>
		<div class="h-4 w-px bg-border mx-1"></div>
		<button type="button" onclick={insertMathInline} class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="معادلة رياضية (سطرية)">
			<FunctionSquare size={16} />
		</button>
		<button type="button" onclick={insertMathBlock} class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="معادلة رياضية (كتلة)">
			<FileCode2 size={16} />
		</button>
		<div class="h-4 w-px bg-border mx-1"></div>
		
		<button type="button" onclick={() => fileInput.click()} disabled={isUploading} class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50" title="إدراج صورة">
			{#if isUploading}
				<Loader2 size={16} class="animate-spin text-primary" />
			{:else}
				<ImageIcon size={16} />
			{/if}
		</button>
		<input type="file" accept="image/*" class="hidden" bind:this={fileInput} onchange={handleImageUpload} />
	</div>

	<!-- Text Area -->
	<textarea
		bind:this={editorRef}
		bind:value
		{placeholder}
		dir="auto"
		class="w-full resize-y bg-transparent p-4 text-sm font-medium outline-none {minHeight}"
	></textarea>
</div>
