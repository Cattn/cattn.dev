<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	let {
		variant = 'filled',
		compact = false,
		class: className,
		children,
		...rest
	}: {
		variant?: 'filled' | 'outlined' | 'elevated' | 'low';
		compact?: boolean;
		class?: ClassValue;
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={['surface-card', variant, compact && 'compact', 'max-sm:!p-2', className]} {...rest}>
	{@render children()}
</div>

<style>
	.surface-card {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 1rem;
		border: none;
		border-radius: var(--m3-util-rounding-medium);
		background-color: rgb(var(--m3-scheme-surface));
		color: rgb(var(--m3-scheme-on-surface));
	}

	.filled {
		background-color: rgb(var(--m3-scheme-surface-container-highest));
	}

	.outlined {
		border: solid 1px rgb(var(--m3-scheme-outline-variant));
	}

	.elevated {
		background-color: rgb(var(--m3-scheme-surface-container-low));
		box-shadow: var(--m3-util-elevation-1);
	}

	.low {
		background-color: rgb(var(--m3-scheme-surface-container-low));
	}

	.compact {
		padding: 0.5rem 1rem 1rem 0.75rem;
	}
</style>
