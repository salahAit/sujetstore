<script lang="ts">
	import '../../../app.css';
	let { children } = $props();
</script>

<!-- Full-page layout without admin sidebar -->
<div class="h-screen w-screen overflow-hidden bg-background">
	{@render children()}
</div>
