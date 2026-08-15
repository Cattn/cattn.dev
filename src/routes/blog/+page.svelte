<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import SurfaceCard from '$lib/components/SurfaceCard.svelte';
	import { Button, Chip } from 'm3-svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import articlesJsonData from './articles.json';

	interface Article {
		title: string;
		description: string;
		link: string;
		date: string;
		id: number;
		tags?: string[];
	}

	const articlesData: Article[] = articlesJsonData
		.filter((article: Article) => article.tags && article.tags.length > 0)
		.sort((a, b) => b.id - a.id);

	let allTags = [...new Set(articlesData.flatMap((article) => article.tags || []))];
	let selectedTags: string[] = $state([]);

	let filteredArticles = $derived(
		selectedTags.length === 0
			? articlesData
			: articlesData.filter(
					(article: Article) => article.tags && article.tags.some((tag) => selectedTags.includes(tag))
				)
	);

	onMount(() => {
		document.title = 'Blog - Cattn.dev';
	});

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function clearTags() {
		selectedTags = [];
	}
</script>

<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly={{ y: 50, duration: 500, delay: 200 }}>
	<h1 class="text-5xl font-black text-primary">Blog</h1>
	<h2 class="mt-1 text-xl font-semibold text-on-surface-variant">My thoughts &amp; Updates</h2>
</section>

<section class="container mx-auto px-4 py-4 text-center" in:fly={{ y: 50, duration: 500, delay: 300 }}>
	<div class="flex flex-wrap items-center justify-center gap-2">
		<Button variant={selectedTags.length === 0 ? 'filled' : 'outlined'} click={clearTags}>
			All
		</Button>
		{#each allTags as tag (tag)}
			<Chip variant="general" selected={selectedTags.includes(tag)} click={() => toggleTag(tag)}>
				{tag}
			</Chip>
		{/each}
	</div>
</section>

<section class="container mx-auto mb-10 px-4 py-6">
	{#if filteredArticles.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredArticles as article (article.id)}
				<div in:fly={{ y: 20, duration: 300, delay: 100 }}>
					<a href={article.link} class="group block h-full">
						<SurfaceCard class="h-full transition-all group-hover:shadow-lg">
							<div class="flex h-full flex-col">
								<h3 class="text-lg font-semibold text-on-surface transition-colors group-hover:text-primary">
									{article.title}
								</h3>
								<p class="mt-1 text-sm text-on-surface-variant">{article.date}</p>
								<p class="mt-3 mb-3 flex-grow text-sm text-on-surface-variant">
									{article.description}
								</p>
								<div class="flex flex-wrap gap-1">
									{#each article.tags || [] as tag (tag)}
										<Badge>{tag}</Badge>
									{/each}
								</div>
							</div>
						</SurfaceCard>
					</a>
				</div>
			{/each}
		</div>
	{:else}
		<div class="py-10 text-center text-on-surface-variant" in:fly={{ y: 20, duration: 300 }}>
			No articles found for the selected tags: {selectedTags.join(', ')}
		</div>
	{/if}
</section>
