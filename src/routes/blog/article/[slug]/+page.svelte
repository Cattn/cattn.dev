<script lang="ts">
	import { estimateReadingTime, getAdjacentArticles, getArticleBySlug } from '$lib/blog';
	import Badge from '$lib/components/Badge.svelte';
	import SurfaceCard from '$lib/components/SurfaceCard.svelte';
	import { Button, Icon } from 'm3-svelte';
	import markdownit from 'markdown-it';
	import type { Component } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	type ParsedPart =
		| { key: string; type: 'html'; html: string }
		| { key: string; type: 'component'; name: string; props: Record<string, unknown> };

	const arrowBackIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"/>'
	};

	const arrowForwardIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"/>'
	};

	const arrowUpIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"/>'
	};

	let { data }: { data: PageData } = $props();

	let article = $derived(getArticleBySlug(data.slug));
	let adjacent = $derived(getAdjacentArticles(data.slug));
	let readingTime = $derived(data.markdown ? estimateReadingTime(data.markdown) : null);

	const md = markdownit({ html: true, linkify: true, typographer: true });
	const libComponents = import.meta.glob('/src/lib/*.svelte');
	const requestedComponents = new Set<string>();
	let loadedComponents = $state<Record<string, Component | null>>({});

	function parseProps(attrString: string): Record<string, unknown> {
		const props: Record<string, unknown> = {};
		const re = /([A-Za-z_][\w-]*)(?:=(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
		let match: RegExpExecArray | null;
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
		const requests: Array<{ name: string; props: Record<string, unknown> }> = [];
		const componentTagRe = /<([A-Z][\w]*)\b([^>]*)\/>/g;
		let inCodeBlock = false;
		let idx = 0;

		const processedLines = mdText.split('\n').map((line) => {
			const trimmed = line.trimStart();
			if (trimmed.startsWith('```')) {
				inCodeBlock = !inCodeBlock;
				return line;
			}
			if (inCodeBlock) return line;

			return line.replace(componentTagRe, (_full, name: string, attrs: string) => {
				const token = `<!--__SVELTE_COMPONENT_${idx}__-->`;
				requests.push({ name, props: parseProps(attrs ?? '') });
				idx += 1;
				return token;
			});
		});

		return { md: processedLines.join('\n'), requests };
	}

	async function loadLibComponent(name: string): Promise<Component | null> {
		const path = `/src/lib/${name}.svelte`;
		const loader = libComponents[path];
		if (!loader) return null;
		try {
			const mod = (await loader()) as { default?: Component };
			return mod?.default ?? null;
		} catch {
			return null;
		}
	}

	let parsedParts = $derived.by((): ParsedPart[] => {
		if (!data.markdown) return [];

		const { md: processedMd, requests } = tokenizeComponents(data.markdown);
		const renderedHtml = md.render(processedMd);
		const placeholderRe = /<!--__SVELTE_COMPONENT_(\d+)__-->/g;
		const parts: ParsedPart[] = [];
		let partIdx = 0;
		let lastIndex = 0;
		let match: RegExpExecArray | null;

		while ((match = placeholderRe.exec(renderedHtml))) {
			const start = match.index;
			const end = match.index + match[0].length;
			const before = renderedHtml.slice(lastIndex, start);
			if (before) parts.push({ key: `h${partIdx++}`, type: 'html', html: before });

			const req = requests[Number(match[1])];
			if (req) {
				parts.push({ key: `c${partIdx++}`, type: 'component', name: req.name, props: req.props });
			} else {
				parts.push({ key: `h${partIdx++}`, type: 'html', html: '<p>Unknown component.</p>' });
			}

			lastIndex = end;
		}

		const after = renderedHtml.slice(lastIndex);
		if (after) parts.push({ key: `h${partIdx++}`, type: 'html', html: after });
		if (!parts.length) parts.push({ key: 'h0', type: 'html', html: renderedHtml });

		return parts;
	});

	$effect(() => {
		document.title = article
			? `${article.title} - Blog - Cattn.dev`
			: 'Article Not Found - Blog - Cattn.dev';
	});

	$effect(() => {
		for (const part of parsedParts) {
			if (part.type !== 'component' || requestedComponents.has(part.name)) continue;
			requestedComponents.add(part.name);
			void loadLibComponent(part.name).then((cmp) => {
				loadedComponents = { ...loadedComponents, [part.name]: cmp };
			});
		}
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#key data.slug}
	{#if article}
		<article class="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:pt-12">
			<div class="-ml-3" in:fly|global={{ y: 24, duration: 400, delay: 120 }}>
				<Button href="/blog" variant="text" iconType="left">
					<Icon icon={arrowBackIcon} />
					Back to Blog
				</Button>
			</div>

			<header
				class="mt-4 border-b border-outline-variant/60 pb-8"
				in:fly|global={{ y: 40, duration: 500, delay: 200 }}
			>
				<div class="flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
					{#if article.category}
						<a
							href={`/blog?category=${encodeURIComponent(article.category)}`}
							class="rounded-full border border-outline-variant/70 bg-surface-container-low px-2.5 py-0.5 text-xs font-medium text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
						>
							{article.category}
						</a>
						<span aria-hidden="true">&middot;</span>
					{/if}
					<time datetime={article.isoDate}>{article.formattedDate}</time>
					{#if readingTime}
						<span aria-hidden="true">&middot;</span>
						<span>{readingTime} min read</span>
					{/if}
				</div>

				<h1
					class="mt-4 text-3xl leading-[1.15] font-black tracking-tight text-on-surface sm:text-4xl lg:text-5xl"
				>
					{article.title}
				</h1>

				<p class="mt-3 text-lg leading-relaxed text-on-surface-variant sm:text-xl">
					{article.description}
				</p>

				{#if article.tags && article.tags.length > 0}
					<div class="mt-5 flex flex-wrap gap-1.5">
						{#each article.tags as tag (tag)}
							<a
								href={`/blog?tag=${encodeURIComponent(tag)}`}
								class="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
								title={`View posts tagged "${tag}"`}
							>
								<Badge
									class="transition-colors hover:!bg-primary-container hover:!text-on-primary-container"
								>
									{tag}
								</Badge>
							</a>
						{/each}
					</div>
				{/if}
			</header>

			<section class="mt-8" in:fly|global={{ y: 40, duration: 500, delay: 320 }}>
				{#if data.errorMessage}
					<SurfaceCard variant="low" class="py-8 text-center">
						<div class="max-sm:px-3 max-sm:py-6">
							<p class="text-base font-semibold text-error">{data.errorMessage}</p>
							<p class="mt-1 text-sm text-on-surface-variant">
								Could not load the content for this post.
							</p>
							<div class="mt-4 flex justify-center">
								<Button href="/blog" variant="filled">Back to Blog</Button>
							</div>
						</div>
					</SurfaceCard>
				{:else}
					<div class="article-prose prose max-w-none">
						{#each parsedParts as part (part.key)}
							{#if part.type === 'html'}
								{@html part.html}
							{:else if part.type === 'component'}
								{@const Comp = loadedComponents[part.name]}
								{#if Comp}
									<div class="not-prose my-6">
										<Comp {...part.props} />
									</div>
								{:else if part.name in loadedComponents}
									<p class="text-sm text-on-surface-variant">
										Component not found: {part.name}
									</p>
								{/if}
							{/if}
						{/each}
					</div>
				{/if}
			</section>

			<footer
				class="mt-14 border-t border-outline-variant/60 pt-8 max-sm:mt-10 max-sm:pt-6"
				in:fly|global={{ y: 40, duration: 500, delay: 420 }}
			>
				{#if adjacent.older || adjacent.newer}
					<nav
						aria-label="Adjacent blog posts"
						class="grid grid-cols-1 gap-4 max-sm:gap-3 sm:grid-cols-2"
					>
						{#if adjacent.older}
							<a href={adjacent.older.link} class="group block h-full">
								<SurfaceCard
									variant="low"
									class="h-full transition-all group-hover:shadow-lg"
								>
									<div class="flex h-full flex-col max-sm:p-2">
										<span
											class="inline-flex items-center gap-1 text-xs font-medium text-on-surface-variant"
										>
											<Icon icon={arrowBackIcon} width="0.9rem" height="0.9rem" />
											Older post
										</span>
										<p
											class="mt-1.5 font-semibold text-on-surface transition-colors group-hover:text-primary"
										>
											{adjacent.older.title}
										</p>
										<span class="mt-1 text-xs text-on-surface-variant">
											{adjacent.older.formattedDate}
										</span>
									</div>
								</SurfaceCard>
							</a>
						{/if}

						{#if adjacent.newer}
							<a
								href={adjacent.newer.link}
								class={[
									'group block h-full',
									!adjacent.older && 'sm:col-start-2'
								]}
							>
								<SurfaceCard
									variant="low"
									class="h-full transition-all group-hover:shadow-lg sm:text-right"
								>
									<div class="flex h-full flex-col max-sm:p-2">
										<span
											class="inline-flex items-center gap-1 text-xs font-medium text-on-surface-variant sm:justify-end"
										>
											Newer post
											<Icon icon={arrowForwardIcon} width="0.9rem" height="0.9rem" />
										</span>
										<p
											class="mt-1.5 font-semibold text-on-surface transition-colors group-hover:text-primary"
										>
											{adjacent.newer.title}
										</p>
										<span class="mt-1 text-xs text-on-surface-variant">
											{adjacent.newer.formattedDate}
										</span>
									</div>
								</SurfaceCard>
							</a>
						{/if}
					</nav>
				{/if}

				<div class="mt-6 flex flex-wrap items-center justify-between gap-3">
					<Button href="/blog" variant="outlined" iconType="left">
						<Icon icon={arrowBackIcon} />
						All Posts
					</Button>
					<Button variant="text" iconType="left" click={scrollToTop}>
						<Icon icon={arrowUpIcon} />
						Back to top
					</Button>
				</div>
			</footer>
		</article>
	{:else}
		<section
			class="mx-auto max-w-xl px-4 py-20 text-center"
			in:fly|global={{ y: 40, duration: 500, delay: 200 }}
		>
			<SurfaceCard variant="low" class="py-10">
				<div class="max-sm:px-3 max-sm:py-6">
					<h1 class="text-3xl font-black tracking-tight text-error sm:text-4xl">
						Article Not Found
					</h1>
					<p class="mt-2 text-base text-on-surface-variant">
						{data.errorMessage ?? 'The requested article could not be loaded.'}
					</p>
					<div class="mt-6 flex justify-center">
						<Button href="/blog" variant="filled">Back to Blog</Button>
					</div>
				</div>
			</SurfaceCard>
		</section>
	{/if}
{/key}

<style>
	.article-prose :global(h1) {
		font-size: 1.5rem;
		line-height: 1.25;
		font-weight: 800;
		letter-spacing: -0.02em;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	.article-prose :global(h2) {
		font-size: 1.25rem;
		line-height: 1.3;
		font-weight: 700;
		letter-spacing: -0.015em;
		margin-top: 1.75rem;
		margin-bottom: 0.6rem;
	}

	.article-prose :global(h3) {
		font-size: 1.125rem;
		line-height: 1.35;
		font-weight: 700;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.article-prose :global(h4) {
		font-size: 1rem;
		line-height: 1.4;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.4rem;
	}

	@media (min-width: 640px) {
		.article-prose :global(h1) {
			font-size: 1.75rem;
		}

		.article-prose :global(h2) {
			font-size: 1.375rem;
		}
	}

	.article-prose > :global(:first-child) {
		margin-top: 0;
	}

	.article-prose :global(img) {
		border-radius: var(--m3-util-rounding-medium);
		max-width: 100%;
		height: auto;
		margin-inline: auto;
	}

	.article-prose :global(blockquote) {
		background-color: rgb(var(--m3-scheme-surface-container-low));
		border-left-width: 3px;
		border-left-color: rgb(var(--m3-scheme-primary));
		border-radius: 0 var(--m3-util-rounding-small) var(--m3-util-rounding-small) 0;
		padding: 0.75rem 1.125rem;
		font-style: normal;
	}

	.article-prose :global(blockquote p) {
		margin-block: 0.25rem;
	}

	.article-prose :global(blockquote p:first-of-type::before),
	.article-prose :global(blockquote p:last-of-type::after) {
		content: none;
	}

	.article-prose :global(:not(pre) > code) {
		background-color: rgb(var(--m3-scheme-surface-container-high));
		padding: 0.15em 0.4em;
		border-radius: 0.375rem;
		font-weight: 500;
	}

	.article-prose :global(:not(pre) > code::before),
	.article-prose :global(:not(pre) > code::after) {
		content: none;
	}

	.article-prose :global(hr) {
		border-color: rgb(var(--m3-scheme-outline-variant) / 0.6);
		margin-block: 2rem;
	}

	.article-prose :global(sub) {
		display: block;
		text-align: center;
		margin-top: -0.75rem;
		margin-bottom: 1.5rem;
		font-size: 0.85em;
		color: rgb(var(--m3-scheme-on-surface-variant));
	}

	.article-prose :global(table) {
		display: block;
		overflow-x: auto;
	}

	.article-prose :global(table img) {
		margin-block: 0.25rem;
	}

	.article-prose :global(a) {
		text-underline-offset: 3px;
		text-decoration-color: rgb(var(--m3-scheme-primary) / 0.45);
		transition: text-decoration-color 150ms ease;
	}

	.article-prose :global(a:hover) {
		text-decoration-color: rgb(var(--m3-scheme-primary));
	}
</style>
