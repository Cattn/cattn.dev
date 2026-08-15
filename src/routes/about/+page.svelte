<script lang="ts">
	import { page } from '$app/state';
	import SurfaceCard from '$lib/components/SurfaceCard.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let mediaPath = page.url.origin + '/media/';
	onMount(() => {
		document.title = 'About - Cattn.dev';
	});
	let socials = [
		{ icon: 'fa-solid fa-image', name: 'Media', link: mediaPath },
		{ icon: 'fa-brands fa-github', name: 'GitHub', link: 'https://github.com/Cattn' },
		{
			icon: 'fa-brands fa-discord',
			name: 'Discord',
			link: 'https://discord.com/users/523927057722376204'
		},
		{ icon: 'fa-brands fa-twitch', name: 'Twitch', link: 'https://www.twitch.tv/cattn_' },
		{ icon: 'fa-brands fa-youtube', name: 'Youtube', link: 'https://www.youtube.com/@cattn' },
		{ icon: 'fa-brands fa-steam', name: 'Steam', link: 'https://steamcommunity.com/id/cattn/' },
		{
			icon: 'fa-brands fa-spotify',
			name: 'Spotify',
			link: 'https://open.spotify.com/user/1q9jqzkqmtqitlg498o29ui6d?si=709c6bbb565c4ff8'
		},
		{ icon: 'fa-regular fa-keyboard', name: 'Monkeytype', link: 'https://monkeytype.com/profile/Cattn' },
		{ icon: 'fa-solid fa-globe', name: 'mathstudy.dev', link: 'https://mathstudy.dev/' },
		{ icon: 'fa-solid fa-music', name: 'Stats.fm', link: 'https://stats.fm/catt' }
	];
</script>

<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly={{ y: 50, duration: 500, delay: 200 }}>
	<h1 class="text-5xl font-black text-primary">Extras</h1>
	<h2 class="mt-1 text-xl font-semibold text-on-surface-variant">Socials & More</h2>
</section>

<section class="container mx-auto mb-10 px-4 py-6" in:fly={{ y: 50, duration: 500, delay: 400 }}>
	<div class="mb-6 text-center sm:text-left">
		<h2 class="text-3xl font-black text-primary">Socials</h2>
		<p class="text-lg font-semibold text-on-surface-variant">Where to find me</p>
	</div>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each socials as social (social.name)}
			<a href={social.link} target="_blank" rel="noopener noreferrer" class="group block">
				<SurfaceCard class="h-full transition-all group-hover:shadow-lg">
					<div class="flex items-center justify-center gap-3">
						<i
							class={`${social.icon} fa-lg w-5 text-center text-on-surface-variant transition-colors group-hover:text-primary`}
						></i>
						<span
							class="text-sm font-medium text-on-surface transition-colors group-hover:text-primary"
						>
							{social.name}
						</span>
					</div>
				</SurfaceCard>
			</a>
		{/each}
	</div>
</section>
