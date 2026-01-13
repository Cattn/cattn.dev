<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import articlesJsonData from './articles.json';
	import { cn } from '$lib/utils';

	interface Article {
		title: string;
		description: string;
		link: string;
		date: string;
		id: number;
		tags?: string[]; 
	}

	const articlesData: Article[] = articlesJsonData.filter((article: Article) => article.tags && article.tags.length > 0).sort((a, b) => b.id - a.id);

	let allTags = ['All', ...new Set(articlesData.flatMap(article => article.tags || []))];
	let selectedTag = writable('All');
	let filteredArticles: Article[] = $state([]); 

	run(() => {
		if ($selectedTag === 'All') {
			filteredArticles = articlesData as Article[]; 
		} else {
			filteredArticles = articlesData.filter((article: Article) => 
				article.tags && article.tags.includes($selectedTag)
			);
		}
		tick();
	});

	onMount(() => {
		document.title = "Blog - Cattn.dev";
	});

	function selectTag(tag: string) {
		selectedTag.set(tag);
	}

</script>

<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
	<h1 class="text-5xl font-black text-accent-blue">Blog</h1>
	<h2 class="mt-1 text-xl font-semibold text-muted-foreground">My thoughts &amp; Updates</h2>
</section>

<section class="container mx-auto px-4 py-4 text-center" in:fly="{{ y: 50, duration: 500, delay: 300 }}">
	<div class="flex flex-wrap justify-center gap-2">
		{#each allTags as tag (tag)}
			<Button 
				variant={$selectedTag === tag ? 'secondary' : 'outline'}
				on:click={() => selectTag(tag)}
				class={cn(
					'transition-all',
					$selectedTag === tag
						? 'bg-accent-blue text-accent-blue-foreground hover:bg-accent-blue/90'
						: 'hover:bg-accent-blue/10 hover:text-accent-blue'
				)}
			>
				{tag}
			</Button>
		{/each}
	</div>
</section>

<section class="container mx-auto px-4 py-6 mb-10">
	{#if filteredArticles.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredArticles as article (article.id)}
				<div in:fly="{{ y: 20, duration: 300, delay: 100 }}">
					<a href={article.link} class="block h-full group">
						<Card.Root class="h-full flex flex-col transition-all group-hover:shadow-lg group-hover:border-accent-blue/50">
							<Card.Header>
								<Card.Title class="text-lg group-hover:text-accent-blue transition-colors">{article.title}</Card.Title>
								<Card.Description>{article.date}</Card.Description>
							</Card.Header>
							<Card.Content class="flex-grow">
								<p class="text-sm text-muted-foreground mb-3">{article.description}</p>
								<div class="flex flex-wrap gap-1">
									{#each article.tags || [] as tag (tag)}
										<Badge variant="secondary">{tag}</Badge>
									{/each}
								</div>
							</Card.Content>
						</Card.Root>
					</a>
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-center py-10 text-muted-foreground" in:fly="{{ y: 20, duration: 300 }}">
			No articles found for the selected tag: {$selectedTag}
		</div>
	{/if}
</section>