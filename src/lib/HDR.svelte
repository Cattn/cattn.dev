<script lang="ts">
	import { Button } from 'm3-svelte';
	import { hdrifyBackgroundHex, hdrifyHex, setHdrEnabled } from '@cattn/hdr';
	let color = $state('#ff006f');
	let enabled = $state(true);
</script>

<div class="flex flex-col items-center justify-center">
	<input
		id="hdr-toggle"
		type="checkbox"
		class="sr-only"
		checked={enabled}
		onchange={(e) => {
			enabled = e.currentTarget.checked;
			setHdrEnabled(enabled);
		}}
	/>
	<Button for="hdr-toggle" variant="outlined">Toggle HDR</Button>
	<h2 class="m-0 text-2xl font-bold" {@attach hdrifyBackgroundHex(color)}>The background is in HDR!!</h2>
	<h2 class="text-2xl font-bold" {@attach hdrifyHex(color)}>The color is in HDR!!</h2>
</div>
