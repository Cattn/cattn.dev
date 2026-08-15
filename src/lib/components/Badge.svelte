<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<span
	class="inline-flex items-center rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-medium text-on-secondary-container {className}"
>
	{@render children?.()}
</span>
