<script lang="ts">
	import markdownit from 'markdown-it';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge'; 
	import { Button } from '$lib/components/ui/button'; 
	import articles from '../../articles.json';
	import type { Component } from 'svelte';

	interface Props {
		data: any;
	}

	type ContentPart = 
		| { key: string; type: 'html'; html: string }
		| { key: string; type: 'component'; component: Component; props: Record<string, any> };

	let { data }: Props = $props();

	const article = articles.find((article) => article.link === $page.url.pathname);

	let htmlContent = $state("<p>Loading Article...</p>");
	let contentParts: ContentPart[] = $state([{ key: 'h0', type: 'html', html: "<p>Loading Article...</p>" }]);

	const libComponents = import.meta.glob('/src/lib/*.svelte');
	const componentCache = new Map();
	const componentTagRe = /<([A-Z][\w]*)\b([^>]*)\/>/g;
	const placeholderRe = /<!--__SVELTE_COMPONENT_(\d+)__-->/g;

	onMount(() => {
		loadArticle();
		if (article) {
			document.title = `${article.title} - Blog - Cattn.dev`;
		}
	});

	function setHtml(html: string) {
		htmlContent = html;
		contentParts = [{ key: 'h0', type: 'html', html }];
	}

	function parseProps(attrString: string) {
		const props: Record<string, any> = {};
		const re = /([A-Za-z_][\w-]*)(?:=(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
		let match;
		while ((match = re.exec(attrString))) {
			const key = match[1];
			const raw = match[2] ?? match[3] ?? match[4];
			if (raw === undefined) {
				props[key] = true;
				continue;
			}
			if (raw === 'true') props[key] = true;
			else if (raw === 'false') props[key] = false;
			else if (raw !== '' && !Number.isNaN(Number(raw))) props[key] = Number(raw);
			else props[key] = raw;
		}
		return props;
	}

	function tokenizeComponents(mdText: string) {
		const requests: Array<{ name: string; props: Record<string, any> }> = [];
		let inCodeBlock = false;
		let idx = 0;
		const lines = mdText.split('\n');

		const processedLines = lines.map((line) => {
			const trimmed = line.trimStart();
			if (trimmed.startsWith('```')) {
				inCodeBlock = !inCodeBlock;
				return line;
			}
			if (inCodeBlock) return line;

			return line.replace(componentTagRe, (_full, name, attrs) => {
				const token = `<!--__SVELTE_COMPONENT_${idx}__-->`;
				requests.push({ name, props: parseProps(attrs ?? '') });
				idx += 1;
				return token;
			});
		});

		return { md: processedLines.join('\n'), requests };
	}

	async function loadLibComponent(name: string): Promise<Component | null> {
		if (componentCache.has(name)) return componentCache.get(name);
		const path = `/src/lib/${name}.svelte`;
		const loader = libComponents[path];
		if (!loader) return null;
		try {
			const mod = await loader() as { default?: Component };
			const cmp = mod?.default ?? null;
			componentCache.set(name, cmp);
			return cmp;
		} catch {
			return null;
		}
	}

	async function toParts(renderedHtml: string, requests: Array<{ name: string; props: Record<string, any> }>): Promise<ContentPart[]> {
		const parts: ContentPart[] = [];
		let partIdx = 0;
		let lastIndex = 0;
		let match;
		while ((match = placeholderRe.exec(renderedHtml))) {
			const start = match.index;
			const end = match.index + match[0].length;
			const before = renderedHtml.slice(lastIndex, start);
			if (before) parts.push({ key: `h${partIdx++}`, type: 'html', html: before });

			const reqIdx = Number(match[1]);
			const req = requests[reqIdx];
			if (!req) {
				parts.push({ key: `h${partIdx++}`, type: 'html', html: `<p>Unknown component.</p>` });
			} else {
				const component = await loadLibComponent(req.name);
				if (component) parts.push({ key: `c${partIdx++}`, type: 'component', component, props: req.props });
				else parts.push({ key: `h${partIdx++}`, type: 'html', html: `<p>Component not found: ${req.name}</p>` });
			}

			lastIndex = end;
		}

		const after = renderedHtml.slice(lastIndex);
		if (after) parts.push({ key: `h${partIdx++}`, type: 'html', html: after });
		if (!parts.length) parts.push({ key: 'h0', type: 'html', html: renderedHtml });
		return parts;
	}

	async function renderMarkdown(mdText: string) {
		const md = markdownit({ html: true, linkify: true, typographer: true });
		const { md: processedMd, requests } = tokenizeComponents(mdText);
		const rendered = md.render(processedMd);
		htmlContent = rendered;
		contentParts = await toParts(rendered, requests);
	}

	async function loadArticle() {
		try {
			const res = await fetch(`/articles/${data.slug}.md`);
			if (!res.ok) {
				if (res.status === 404) {
					setHtml("<p>Article Not Found.</p>");
				} else {
					setHtml(`<p>Error loading article: ${res.statusText}</p>`);
				}
				return;
			}
			const mdContent = await res.text();
			await renderMarkdown(mdContent);
		} catch (error) {
			console.error("Failed to load article:", error);
			setHtml("<p>Error loading article.</p>");
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
			{#each contentParts as part (part.key)}
				{#if part.type === 'html'}
					{@html part.html}
				{:else if part.type === 'component'}
					{@const Comp = part.component}
					<Comp {...part.props} />
				{/if}
			{/each}
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
