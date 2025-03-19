<script>
	import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';  

    $: time = {
        "/": 3000,
        "/projects": 2500,
        "/blog": 900,
        "/about": 1300,
        "/blog/article/site-creation": 1000,
        "/media": 1
    }[$page.url.pathname] || 4000;
</script>

{#if !$page.url.pathname.includes("/blog/article")}
{#key $page.url.pathname}
<div class="supersm:ml-6 not-supersm:ml-0" in:slide={{ duration: time, delay: 100}}>
<Navbar />
<slot></slot>
</div>
{/key}
{:else}
<div class="supersm:ml-6 not-supersm:ml-0">
<Navbar />
<slot></slot>
</div>
{/if}

