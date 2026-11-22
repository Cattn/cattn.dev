<script lang="ts">
	import { onMount, tick, untrack, type Snippet } from 'svelte';
	import { page } from '$app/state';
	import { createSplitMirror, schemeVars, type SplitRegion } from '$lib/splitTheme';
	import { THEME_TRANSITION, tabDirection, tabOf, type TabId } from '$lib/tabs';

	let { children }: { children: Snippet } = $props();

	const SEEDS: Record<TabId, string> = {
		home: '#06677f',
		projects: '#6a1b9a',
		blog: '#0870b9',
		about: '#c2185b'
	};
	const DIAGONAL = { top: 1, bottom: 0 };

	let baseTab = $state<TabId>(tabOf(page.url.pathname));
	let nextTab = $state<TabId | null>(null);
	let mounted = $state(false);
	let source: HTMLDivElement | undefined = $state();
	let nextMirror: HTMLDivElement | undefined = $state();
	let nextSelection: HTMLDivElement | undefined = $state();
	let edgeLine: SVGLineElement | undefined = $state();
	let painter: ReturnType<typeof createSplitMirror> | undefined;

	let progress = 0;
	let direction: 1 | -1 = 1;
	let nextActive = false;
	let wipeFrame = 0;
	let wipeElapsed = 0;
	let wipeLast: number | null = null;
	const MAX_FRAME_STEP = 1000 / 45;

	const themeRule = (selector: string, seed: string) =>
		`${selector} { ${schemeVars(seed, false)} } .dark ${selector} { ${schemeVars(seed, true)} }`;

	let themeCss = $derived(
		[
			themeRule('.theme-current', SEEDS[baseTab]),
			themeRule('.theme-next', SEEDS[nextTab ?? baseTab])
		].join(' ')
	);

	function edgeOffset() {
		const low = Math.min(DIAGONAL.top, DIAGONAL.bottom);
		const high = Math.max(DIAGONAL.top, DIAGONAL.bottom);
		const from = direction === 1 ? 1 - low : -high;
		const to = direction === 1 ? -high : 1 - low;
		return from + (to - from) * progress;
	}

	function placeEdge() {
		if (!edgeLine) return;
		if (!nextActive) {
			edgeLine.style.visibility = 'hidden';
			return;
		}
		const offset = edgeOffset();
		edgeLine.setAttribute('x1', `${(DIAGONAL.top + offset) * 100}%`);
		edgeLine.setAttribute('x2', `${(DIAGONAL.bottom + offset) * 100}%`);
		edgeLine.style.visibility = 'visible';
	}

	function regions(): SplitRegion[] {
		if (!nextActive || !nextMirror) return [];
		const forward = direction === 1;
		const offset = edgeOffset();
		return [
			{
				mirror: nextMirror,
				selection: nextSelection,
				planes: [
					{
						top: DIAGONAL.top + offset,
						bottom: DIAGONAL.bottom + offset,
						keep: forward ? 'right' : 'left'
					}
				]
			}
		];
	}

	async function finishWipe() {
		cancelAnimationFrame(wipeFrame);
		wipeFrame = 0;
		if (!nextTab) return;
		const root = source?.parentElement;
		root?.classList.add('split-swapping');
		baseTab = nextTab;
		nextTab = null;
		progress = 0;
		if (nextActive && nextMirror) painter?.removeMirror(nextMirror);
		nextActive = false;
		placeEdge();
		await tick();
		painter?.paintNow();
		void root?.offsetHeight;
		root?.classList.remove('split-swapping');
	}

	function stepWipe(now: number) {
		wipeFrame = 0;
		if (!nextTab) return;
		if (wipeLast !== null) wipeElapsed += Math.min(now - wipeLast, MAX_FRAME_STEP);
		wipeLast = now;
		const linear = Math.min(1, wipeElapsed / THEME_TRANSITION.duration);
		progress = THEME_TRANSITION.easing(linear);
		painter?.paintNow();
		placeEdge();
		if (linear < 1) wipeFrame = requestAnimationFrame(stepWipe);
		else finishWipe();
	}

	async function startWipe(tab: TabId, towards: 1 | -1) {
		await finishWipe();
		if (tab === baseTab) return;
		nextTab = tab;
		direction = towards;
		progress = 0;
		await tick();
		if (!painter || !nextMirror || nextTab !== tab) return;
		painter.addMirror(nextMirror);
		nextActive = true;
		placeEdge();
		wipeElapsed = 0;
		wipeLast = null;
		painter.paintNow();
		wipeFrame = requestAnimationFrame(stepWipe);
	}

	$effect(() => {
		const tab = tabOf(page.url.pathname);
		untrack(() => {
			if (!mounted) {
				baseTab = tab;
				return;
			}
			const from = nextTab ?? baseTab;
			if (tab === from) return;
			startWipe(tab, (tabDirection(from, tab) || 1) as 1 | -1);
		});
	});

	onMount(() => {
		painter = createSplitMirror(source!, regions);
		mounted = true;

		return () => {
			cancelAnimationFrame(wipeFrame);
			painter?.destroy();
		};
	});
</script>

<svelte:head>
	{@html `<style>${themeCss}</style>`}
</svelte:head>

<div class="split-root">
	<div class="split-layer theme-current" bind:this={source}>
		{@render children()}
	</div>
	<div
		class="split-layer split-mirror theme-next"
		bind:this={nextMirror}
		inert
		aria-hidden="true"
	></div>
	<div class="split-selection theme-next" bind:this={nextSelection} aria-hidden="true"></div>
</div>

<svg class="split-edge theme-next" aria-hidden="true">
	<line bind:this={edgeLine} x1="0" y1="0" x2="0" y2="100%" style="visibility: hidden" />
</svg>

<style>
	.split-root {
		position: relative;
	}

	.split-root:global(.split-swapping) :global(*),
	.split-root:global(.split-swapping) :global(*::before),
	.split-root:global(.split-swapping) :global(*::after) {
		transition: none !important;
	}

	.split-layer {
		min-height: 100vh;
		isolation: isolate;
		background-color: rgb(var(--m3-scheme-background));
		color: rgb(var(--m3-scheme-on-surface));
	}

	.split-mirror {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		clip-path: inset(0 0 0 100%);
	}

	.theme-current :global(::selection) {
		background-color: rgb(var(--m3-scheme-primary) / 0.35);
	}

	.split-selection {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		opacity: 0.35;
	}

	.split-selection :global(svg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.split-selection :global(path) {
		fill: rgb(var(--m3-scheme-primary));
	}

	.split-mirror :global(:where(.split-focus-visible)) {
		outline: auto 1px;
	}

	.split-edge {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
		pointer-events: none;
		z-index: 55;
	}

	.split-edge line {
		stroke: rgb(var(--m3-scheme-primary));
		stroke-width: 2;
		stroke-linecap: round;
	}
</style>
