<script lang="ts">
	import SurfaceCard from '$lib/components/SurfaceCard.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	onMount(() => {
		document.title = 'Media - Cattn.dev';
	});
	let VRCmedia = [
		{
			image: 'https://play.maple.music/SMS/uploads/FBT_IMG_1.png',
			alt: 'Image in VRChat using FBT',
			desc: 'failed pose... [Japan Shrine]'
		},
		{
			image: 'https://play.maple.music/SMS/uploads/VR_NOFBT_1.png',
			alt: 'Image in VRChat showing me',
			desc: 'nice framing [Japan Shrine]'
		},
		{
			image: 'https://play.maple.music/SMS/uploads/VR_1.png',
			alt: 'Image in VRChat',
			desc: 'beautiful scenery [Japan Shrine]'
		}
	];

	let otherMedia = [
		{
			image:
				'https://play.maple.music/SMS/uploads/cattn.dev/PXL_20250601_032330795.RAW-01.MP.COVER.jpg',
			alt: 'Image of Kendrick Lamar Concert',
			desc: 'GNX tour 2025 [Las Vegas, NV]'
		},
		{
			image: 'https://play.maple.music/SMS/uploads/cattn.dev/IMG_20250411_191413_HDR.jpg',
			alt: 'boston port',
			desc: 'the port [Boston, MA]'
		},
		{
			image:
				'https://play.maple.music/SMS/uploads/cattn.dev/PXL_20240221_014637354.LONG_EXPOSURE-01.COVER.jpg',
			alt: 'view of las vegas',
			desc: 'the view... [Las Vegas, NV]'
		}
	];
</script>

<section class="container mx-auto max-sm:!max-w-none px-4 max-sm:px-4 pt-16 pb-8 text-center" in:fly={{ y: 50, duration: 500, delay: 200 }}>
	<h1 class="text-5xl font-black text-primary">Media</h1>
	<h2 class="mt-1 text-xl font-semibold text-on-surface-variant">Assorted Photos</h2>
</section>

<section class="container mx-auto max-sm:!max-w-none mb-10 px-4 max-sm:px-4 py-6" in:fly={{ y: 50, duration: 500, delay: 400 }}>
	<div class="mb-6 text-center sm:text-left">
		<h2 class="text-3xl font-black text-primary">VRChat</h2>
		<p class="text-lg font-semibold text-on-surface-variant">Some Cool Photos</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each VRCmedia as item (item.image)}
			<SurfaceCard class="overflow-hidden transition-all hover:shadow-lg">
				<div class="-m-4 mb-0 flex aspect-video items-center justify-center bg-surface-container-high max-sm:-m-2">
					<a href={item.image} target="_blank" rel="noopener noreferrer" class="block h-full w-full">
						<img
							alt={item.alt}
							src={item.image}
							class="h-full w-full object-contain transition-transform hover:scale-105"
						/>
					</a>
				</div>
				<div class="pt-3">
					<p class="w-full truncate text-center text-sm text-on-surface-variant" title={item.desc}>
						{item.desc}
					</p>
				</div>
			</SurfaceCard>
		{/each}
	</div>

	<div class="mt-5 mb-6 text-center sm:text-left">
		<h2 class="text-3xl font-black text-primary">Other Photos</h2>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each otherMedia as item (item.image)}
			<SurfaceCard class="overflow-hidden transition-all hover:shadow-lg">
				<div class="-m-4 mb-0 flex aspect-video items-center justify-center bg-surface-container-high max-sm:-m-2">
					<a href={item.image} target="_blank" rel="noopener noreferrer" class="block h-full w-full">
						<img
							alt={item.alt}
							src={item.image}
							class="h-full w-full object-contain transition-transform hover:scale-105"
						/>
					</a>
				</div>
				<div class="pt-3">
					<p class="w-full truncate text-center text-sm text-on-surface-variant" title={item.desc}>
						{item.desc}
					</p>
				</div>
			</SurfaceCard>
		{/each}
	</div>
</section>
