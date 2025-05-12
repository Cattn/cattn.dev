<script lang="ts">
// @ts-nocheck 
	import markdownit from 'markdown-it'
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge'; 
	import { Button } from '$lib/components/ui/button'; 
	import articles from '../../articles.json';

	export let data; 

	const article = articles.find((article) => article.link === $page.url.pathname);

	let htmlContent = "<p>Loading Article...</p>";

	onMount(() => {
		loadArticle();
		if (article) {
			document.title = `${article.title} - Blog - Cattn.dev`;
		}
	});

	async function loadArticle() {
		try {
			const res = await fetch(`/articles/${data.slug}.md`);
			if (!res.ok) {
				if (res.status === 404) {
					htmlContent = "<p>Article Not Found.</p>";
				} else {
					htmlContent = `<p>Error loading article: ${res.statusText}</p>`;
				}
				return;
			}
			const mdContent = await res.text();
			const md = markdownit({ html: true, linkify: true, typographer: true });
			htmlContent = md.render(mdContent);
		} catch (error) {
			console.error("Failed to load article:", error);
			htmlContent = "<p>Error loading article.</p>";
		}
	}

</script>

{#if article}
	<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{article.title}</h1>
		<p class="mt-2 text-xl text-muted-foreground">{article.description}</p>
		<div class="mt-4 flex items-center justify-center space-x-4">
            <div class="flex items-center justify-center gap-4">
                <Button href="/blog" variant="outline" size="sm">
                    &larr; Back to Blog
                </Button>
                <span class="text-sm text-muted-foreground">{article.date}</span>
                {#if article.tags && article.tags.length}
                    <div class="flex flex-wrap gap-2">
                        {#each article.tags as tag (tag)}
                            <Badge variant="secondary">{tag}</Badge>
                        {/each}
                    </div>
                {/if}
            </div>
		</div>
	</section>

	
	<section class="container mx-auto px-4 py-6 mb-10 max-w-3xl" in:fly="{{ y: 50, duration: 500, delay: 400 }}">
		<div class="prose prose-invert max-w-none">
			{@html htmlContent}
		</div>
	</section>

{:else if htmlContent.includes('Loading')}
	<div class="container mx-auto px-4 py-16 text-center">
		<p>{@html htmlContent}</p> 
	</div>
{:else}
	<div class="container mx-auto px-4 py-16 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl text-destructive">Article Not Found</h1>
		<p class="mt-2 text-xl text-muted-foreground">The requested article could not be loaded.</p>
		{@html htmlContent}
		<Button href="/blog" class="mt-6">Back to Blog</Button>
	</div>
{/if}
