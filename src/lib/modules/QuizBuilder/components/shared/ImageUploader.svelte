<script lang="ts">
	import { UploadCloud, Image as ImageIcon, X, Loader2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	let { imageUrl = $bindable(), label = 'صورة', placeholder = 'اختر صورة أو اسحبها هنا' } = $props();

	let fileInput = $state<HTMLInputElement | null>(null);
	let isDragging = $state(false);
	let isUploading = $state(false);
	let errorMessage = $state('');

	const dispatch = createEventDispatcher<{
		change: { url: string };
	}>();

	async function handleUpload(file: File) {
		if (!file) return;

		// Validation
		if (!file.type.startsWith('image/')) {
			errorMessage = 'يجب أن يكون الملف صورة (png, jpg, webp, gif, svg)';
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			errorMessage = 'حجم الصورة يجب أن لا يتجاوز 5 ميجابايت';
			return;
		}

		errorMessage = '';
		isUploading = true;

		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/admin/upload-image', {
				method: 'POST',
				body: formData
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || 'فشل في رفع الصورة');
			}

			const data = await res.json();
			imageUrl = data.url;
			dispatch('change', { url: data.url });
		} catch (error: any) {
			errorMessage = error.message;
		} finally {
			isUploading = false;
			// Reset file input so same file can be selected again if needed
			if (fileInput) fileInput.value = '';
		}
	}

	function onFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			handleUpload(target.files[0]);
		}
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function onDragLeave(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
			handleUpload(e.dataTransfer.files[0]);
		}
	}

	function removeImage() {
		imageUrl = '';
		errorMessage = '';
		dispatch('change', { url: '' });
	}
</script>

<div class="space-y-2">
	{#if label}
		<span class="block text-sm font-semibold text-muted-foreground">{label}</span>
	{/if}

	{#if imageUrl}
		<!-- Preview State -->
		<div class="group relative overflow-hidden rounded-xl border border-border bg-muted/30">
			<img src={imageUrl} alt="Preview" class="max-h-64 mx-auto w-auto object-contain" />
			<div
				class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<button
					type="button"
					onclick={removeImage}
					class="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 font-semibold text-destructive-foreground shadow-sm transition-transform hover:scale-105"
				>
					<X size={18} />
					إزالة الصورة
				</button>
			</div>
		</div>
	{:else}
		<!-- Upload State -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors
				{isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}
				{isUploading ? 'pointer-events-none opacity-50' : ''}"
			onclick={() => fileInput?.click()}
			ondragover={onDragOver}
			ondragleave={onDragLeave}
			ondrop={onDrop}
		>
			<input
				type="file"
				accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
				class="hidden"
				bind:this={fileInput}
				onchange={onFileSelect}
			/>

			{#if isUploading}
				<Loader2 size={32} class="animate-spin text-primary" />
				<p class="text-sm font-medium text-muted-foreground">جاري الرفع...</p>
			{:else}
				<div class="rounded-full bg-primary/10 p-3 text-primary">
					<UploadCloud size={24} />
				</div>
				<p class="text-sm font-semibold text-foreground">{placeholder}</p>
				<p class="text-xs text-muted-foreground">الحد الأقصى 5 ميجابايت (PNG, JPG, WebP)</p>
			{/if}
		</div>
	{/if}

	{#if errorMessage}
		<p class="text-sm text-destructive">{errorMessage}</p>
	{/if}
</div>
