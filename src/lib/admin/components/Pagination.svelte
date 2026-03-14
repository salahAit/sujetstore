<script lang="ts">
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';

	let {
		totalItems,
		pageSize = $bindable(10),
		currentPage = $bindable(1)
	} = $props<{
		totalItems: number;
		pageSize: number;
		currentPage: number;
	}>();

	let totalPages = $derived(Math.ceil(totalItems / pageSize) || 1);

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}
</script>

{#if totalPages > 1}
	<div class="mt-4 flex flex-col gap-4 border-t border-border bg-card px-4 py-4 sm:px-6">
		<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<div class="order-2 sm:order-1 flex flex-col sm:flex-row items-center gap-3">
				<p class="text-sm text-muted-foreground text-center sm:text-right">
					إظهار <span class="font-bold text-foreground">{(currentPage - 1) * pageSize + 1}</span> إلى
					<span class="font-bold text-foreground">{Math.min(currentPage * pageSize, totalItems)}</span> من أصل
					<span class="font-bold text-foreground">{totalItems}</span> نتيجة
				</p>
				
				<div class="flex items-center gap-2">
					<span class="text-xs text-muted-foreground whitespace-nowrap">السطور:</span>
					<select 
						bind:value={pageSize}
						onchange={() => currentPage = 1}
						class="bg-background border border-border rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary"
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>
				</div>
			</div>
			
			<div class="order-1 sm:order-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
				<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm rtl:space-x-reverse w-full sm:w-auto justify-center" aria-label="Pagination">
					<button
						onclick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						class="relative inline-flex items-center rounded-r-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0 disabled:opacity-30 disabled:hover:bg-transparent"
						title="الصفحة السابقة"
					>
						<span class="sr-only">السابق</span>
						<ChevronRight class="h-5 w-5" aria-hidden="true" />
					</button>

					{#each Array(totalPages) as _, i}
						{@const pageNum = i + 1}
						<!-- Dynamic Pagination Logic -->
						{#if pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
							<button
								onclick={() => goToPage(pageNum)}
								class="relative inline-flex items-center px-3 sm:px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 {currentPage === pageNum ? 'z-10 bg-primary text-primary-foreground' : 'text-foreground ring-1 ring-inset ring-border hover:bg-muted'}"
							>
								{pageNum}
							</button>
						{:else if (pageNum === currentPage - 2 && currentPage > 3) || (pageNum === currentPage + 2 && currentPage < totalPages - 2)}
							<span class="relative inline-flex items-center px-2 sm:px-4 py-2 text-sm font-semibold text-muted-foreground ring-1 ring-inset ring-border">...</span>
						{/if}
					{/each}

					<button
						onclick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						class="relative inline-flex items-center rounded-l-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0 disabled:opacity-30 disabled:hover:bg-transparent"
						title="الصفحة التالية"
					>
						<span class="sr-only">التالي</span>
						<ChevronLeft class="h-5 w-5" aria-hidden="true" />
					</button>
				</nav>
			</div>
		</div>
	</div>
{/if}
