<script lang="ts">
	import { hdrifyBackgroundHex, hdrifyHex, setHdrEnabled, isHdrEnabled } from '@cattn/hdr';
	let color = $state('#ff006f');
	let enabled = $state(true);
	function toggleHDR() {
		enabled = !enabled;
		setHdrEnabled(enabled);
	}
</script>

<div class="flex flex-col items-center justify-center">
    <button class="text-sm font-bold border border-border rounded-md px-2 py-1 mb-1" onclick={toggleHDR}>Toggle HDR</button>
	<h2 class="text-2xl font-bold m-0" {@attach hdrifyBackgroundHex(color)}>The background is in HDR!!</h2>
	<h2 class="text-2xl font-bold" {@attach hdrifyHex(color)}>The color is in HDR!!</h2>
</div>