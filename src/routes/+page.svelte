<script lang="ts">
	import { Button } from 'm3-svelte';
	import SurfaceCard from '$lib/components/SurfaceCard.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	type SkillItem = { name: string; icon?: string };
	type SkillGroup = { title: string; items: SkillItem[] };

	let skillGroups: SkillGroup[] = [
		{
			title: 'Languages',
			items: [
				{ icon: 'fa-brands fa-js', name: 'JavaScript' },
				{ icon: 'fa-solid fa-code', name: 'TypeScript' },
				{ icon: 'fa-brands fa-python', name: 'Python' },
				{ icon: 'fa-brands fa-html5', name: 'HTML' },
				{ icon: 'fa-brands fa-css3-alt', name: 'CSS' },
				{ icon: 'fa-brands fa-java', name: 'Java' },
				{ icon: 'fa-solid fa-code', name: 'C#' },
				{ icon: 'fa-solid fa-code', name: 'C++' }
			]
		},
		{
			title: 'Web',
			items: [
				{ name: 'SvelteKit' },
				{ name: 'Svelte' },
				{ name: 'React' },
				{ name: 'Astro' },
				{ name: 'Tailwind' },
				{ name: 'Vite' },
				{ name: 'Node.js' },
				{ name: 'Express.js' },
				{ name: 'Electron' },
				{ name: 'Aframe.js' },
				{ name: 'Tauri' }
			]
		},
		{
			title: 'Tools',
			items: [{ icon: 'fa-brands fa-git-alt', name: 'Git' }]
		},
		{
			title: 'Game Dev',
			items: [
				{ icon: 'fa-brands fa-unity', name: 'Unity' },
				{ icon: 'fa-solid fa-code', name: 'Godot' },
				{ icon: 'fa-solid fa-code', name: 'Unreal Engine' }
			]
		}
	];

	let projects = [
		{
			title: 'SMS',
			description:
				'Upload, share, and manage your files quickly. Supports file expiration, quick filters, and previews!',
			link: 'https://github.com/Cattn/SMS',
			badges: ['Complete']
		},
		{
			title: 'Maple',
			description:
				'A local-library first music platform. A new way to organize and enjoy your music. Optional account and social features.',
			link: 'https://github.com/Cattn/Maple',
			badges: ['Active', 'In Progress']
		},
		{
			title: 'Cattn.dev',
			description: 'This website!',
			link: 'https://github.com/Cattn/cattn.dev',
			badges: ['Complete']
		},
		{
			title: 'senseshift-face-pcb',
			description: 'A custom pcb that fits the X6 Facial Haptic Interface',
			link: 'https://github.com/Cattn/senseshift-face-pcb',
			badges: ['Complete']
		}
	];

	let albums = [
		{ title: 'To Pimp A Butterfly', image: 'tpab.webp' },
		{ title: 'Atavista', image: 'atavista.webp' },
		{ title: 'brat', image: 'brat.webp' },
		{ title: 'Californication', image: 'cali.webp' },
		{ title: 'Cyberpunk 2077: Radio, Vol. 2', image: 'cp277.webp' },
		{ title: 'Damn.', image: 'damn.webp' },
		{ title: 'By the Way', image: 'dontstop.webp' },
		{ title: 'Evil Empire', image: 'evilem.webp' },
		{ title: 'good kid, m.A.A.d city', image: 'gkmc.webp' },
		{ title: 'Guts', image: 'guts.webp' },
		{ title: 'Mr. Morale & The Big Steppers', image: 'mmatbs.webp' },
		{ title: 'Rage Against The Machine', image: 'ratm.webp' },
		{ title: 'The Slow Rush', image: 'tsr.webp' },
		{ title: 'untitled unmastered.', image: 'unti.webp' }
	];

	let artists = [
		{ title: 'Rage Against The Machine', image: 'ratmartist.webp' },
		{ title: 'Kendrick Lamar', image: 'kendrick.webp' },
		{ title: 'Childish Gambino', image: 'gambino.webp' },
		{ title: 'George Clinton', image: 'clinton.webp' },
		{ title: 'Metro Boomin', image: 'metro.webp' },
		{ title: 'Tyler, the Creator', image: 'tyler.webp' },
		{ title: 'Nine Inch Nails', image: 'nin.webp' },
		{ title: 'Slipknot', image: 'slipknot.webp' },
		{ title: 'Thundercat', image: 'thundercat.webp' },
		{ title: 'Olivida Rodrigo', image: 'livia.webp' },
		{ title: 'Limp Bizkit', image: 'limpbizkit.webp' },
		{ title: 'Korn', image: 'korn.webp' },
		{ title: 'Red Hot Chili Peppers', image: 'rhcp.webp' }
	];

	onMount(() => {
		document.title = 'Home - Cattn.dev';
	});
</script>

<section class="container mx-auto px-4 py-16 text-center" in:fly={{ y: 50, duration: 500, delay: 200 }}>
	<h1 class="text-5xl font-black text-primary">Cattn</h1>
	<h2 class="mt-1 text-xl font-semibold text-on-surface-variant">aka Logan</h2>
	<div class="mt-8 flex flex-col items-center justify-center gap-8 lg:flex-row">
		<img src="/images/cat.jpg" alt="cat" class="h-40 w-40 rounded-full shadow-lg" />
		<p class="max-w-xl text-lg leading-relaxed text-on-surface">
			Hi! I'm Logan, aka Cattn. I am a fullstack developer, linux user, and love to create things. I
			mostly create front-ends and toy around with games! I also love VR, and have built my own
			FBT/Slime Trackers. I'm also interested in electronics as a hobby.
		</p>
	</div>
</section>

<section class="container mx-auto px-4 py-10" in:fly={{ y: 50, duration: 500, delay: 400 }}>
	<h2 class="mb-6 text-center text-3xl font-black text-primary lg:text-left">Featured Projects</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each projects as project (project.title)}
			<SurfaceCard variant="low" compact class="text-center transition-all hover:shadow-lg">
				<Button variant="text" href={project.link} target="_blank" rel="noopener noreferrer">
					<span class="text-xl font-bold">{project.title}</span>
				</Button>
				<p class="mt-2 text-on-surface-variant">{project.description}</p>
			</SurfaceCard>
		{/each}
	</div>
</section>

<section class="container mx-auto px-4 py-10" in:fly={{ y: 50, duration: 500, delay: 500 }}>
	<h2 class="mb-6 text-center text-3xl font-black text-on-surface lg:text-left">Things I know</h2>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		{#each skillGroups as group (group.title)}
			<SurfaceCard class="transition-all hover:shadow-lg">
				<h3 class="mb-4 text-xl font-bold text-on-surface">{group.title}</h3>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each group.items as item (item.name)}
						<div
							class="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-high px-3 py-2"
						>
							{#if item.icon}
								<i class={`${item.icon} text-on-surface-variant`}></i>
							{/if}
							<span class="text-sm font-semibold text-on-surface">{item.name}</span>
						</div>
					{/each}
				</div>
			</SurfaceCard>
		{/each}
	</div>
</section>

<section class="container mx-auto px-4 py-10" in:fly={{ y: 50, duration: 500, delay: 700 }}>
	<h2 class="mb-6 text-center text-3xl font-black text-on-surface lg:text-left">Favorite Albums</h2>
	<div class="rounded-2xl border border-outline-variant p-6">
		<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{#each albums as album (album.title)}
				<SurfaceCard class="overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
					<div class="-mx-4 -mt-4 aspect-square">
						<img
							src="/images/albums/{album.image}"
							alt={album.title}
							class="h-full w-full object-cover"
						/>
					</div>
					<h3 class="mt-3 w-full truncate text-center text-sm font-semibold text-on-surface">
						{album.title}
					</h3>
				</SurfaceCard>
			{/each}
		</div>
	</div>
</section>

<section class="container mx-auto mb-10 px-4 py-10" in:fly={{ y: 50, duration: 500, delay: 800 }}>
	<h2 class="mb-6 text-center text-3xl font-black text-on-surface lg:text-left">Favorite Artists</h2>
	<div class="rounded-2xl border border-outline-variant p-6">
		<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{#each artists as artist (artist.title)}
				<div class="group flex flex-col items-center transition-all hover:scale-105">
					<img
						src="/images/artists/{artist.image}"
						alt={artist.title}
						class="h-32 w-32 rounded-full border-2 border-transparent object-cover shadow-lg group-hover:border-primary md:h-40 md:w-40"
					/>
					<h3 class="mt-3 w-full truncate text-center text-sm font-semibold text-on-surface">
						{artist.title}
					</h3>
				</div>
			{/each}
		</div>
	</div>
</section>
