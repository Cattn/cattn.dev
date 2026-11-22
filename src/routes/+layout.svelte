<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import SplitTheme from '$lib/components/SplitTheme.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { PAGE_TRANSITION, tabDirection, tabOf } from '$lib/tabs';
	import '../app.css';
	import '../main.css';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
	import { HDRRouter } from '@cattn/hdr';

	let inX = $state(0);
	let outX = $state(0);
	let duration = $state(0);

	beforeNavigate(({ from, to }) => {
		const fromTab = tabOf(from?.url.pathname ?? page.url.pathname);
		const toTab = tabOf(to?.url.pathname ?? page.url.pathname);
		const direction = tabDirection(fromTab, toTab);
		const distance = window.innerWidth;
		inX = direction * distance;
		outX = -direction * distance;
		duration = direction ? PAGE_TRANSITION.duration : 0;
	});

	/** @param {HTMLElement} node */
	function revealContent(node) {
		if (!duration) return;
		const finishInner = () => {
			for (const animation of node.getAnimations({ subtree: true })) {
				if (animation instanceof CSSTransition || animation instanceof CSSAnimation) continue;
				if (animation.effect instanceof KeyframeEffect && animation.effect.target !== node) {
					animation.finish();
				}
			}
		};
		finishInner();
		requestAnimationFrame(() => {
			finishInner();
			requestAnimationFrame(finishInner);
		});
	}
</script>

<SplitTheme>
	<div class="supersm:ml-6 not-supersm:ml-0">
		<Navbar />
		<div class="page-stack">
			{#key page.url.pathname}
				<div
					class="page"
					data-tab={tabOf(page.url.pathname)}
					in:fly={{ x: inX, opacity: 1, duration, easing: PAGE_TRANSITION.easing }}
					out:fly={{ x: outX, opacity: 1, duration, easing: PAGE_TRANSITION.easing }}
					onintrostart={(event) => revealContent(event.currentTarget)}
				>
					{@render children?.()}
				</div>
			{/key}
		</div>
	</div>
</SplitTheme>

<HDRRouter />

<style>
	.page-stack {
		display: grid;
		overflow-x: clip;
	}

	.page {
		grid-area: 1 / 1;
		min-width: 0;
	}
</style>
