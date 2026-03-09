<script lang="ts">
	import {
		Backpack,
		BookOpen,
		GraduationCap,
		Calculator,
		PenTool,
		MessageCircle,
		MessageCircleCode,
		Microscope,
		Zap,
		Globe,
		Book,
		Scale,
		Brain,
		Laptop,
		Folder
	} from 'lucide-svelte';

	let {
		name,
		size = 24,
		class: className = ''
	}: { name: string; size?: number; class?: string } = $props();

	const icons: Record<string, any> = {
		Backpack,
		BookOpen,
		GraduationCap,
		Calculator,
		PenTool,
		MessageCircle,
		MessageCircleCode,
		Microscope,
		Zap,
		Globe,
		Book,
		Scale,
		Brain,
		Laptop
	};

	let IconComponent = $derived(icons[name] || Folder);
</script>

<IconComponent {size} class={className} />
