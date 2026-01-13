<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
  
</script>

<div class="supersm:ml-6 not-supersm:ml-0">
<Navbar />
{@render children?.()}
</div>

