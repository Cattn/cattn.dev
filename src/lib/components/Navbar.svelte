<script lang="ts">
	import { Button, ConnectedButtons } from 'm3-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const navItems = [
		{ name: 'Home', value: 'home', href: '/' },
		{ name: 'Projects', value: 'projects', href: '/projects' },
		{ name: 'Blog', value: 'blog', href: '/blog' },
		{ name: 'Extras', value: 'about', href: '/about' }
	];

	let currentTab = $derived.by(() => {
		const path = page.url.pathname;
		if (path === '/') return 'home';
		if (path.startsWith('/projects')) return 'projects';
		if (path.startsWith('/blog')) return 'blog';
		if (path.startsWith('/about') || path.startsWith('/media')) return 'about';
		return 'home';
	});
	let selected = $derived(currentTab);

	function navigate(item: (typeof navItems)[number]) {
		selected = item.value;
		goto(item.href);
	}
</script>

<nav
	class="sticky top-0 z-50 flex w-full justify-center bg-surface/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-surface/60"
>
	<ConnectedButtons>
		{#each navItems as item (item.value)}
			<input
				id="nav-{item.value}"
				type="radio"
				name="site-nav"
				value={item.value}
				checked={selected === item.value}
				onchange={() => navigate(item)}
			/>
			<Button for={`nav-${item.value}`} variant="filled" square>
				{item.name}
			</Button>
		{/each}
	</ConnectedButtons>
</nav>
