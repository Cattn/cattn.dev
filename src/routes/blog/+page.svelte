<script lang="ts">
	import { articlesData, type BlogArticle } from '$lib/blog';
	import Badge from '$lib/components/Badge.svelte';
	import SurfaceCard from '$lib/components/SurfaceCard.svelte';
	import { Button, Chip, ConnectedButtons, Icon } from 'm3-svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly, slide } from 'svelte/transition';

	const searchIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/>'
	};

	const closeIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/>'
	};

	const checkIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/>'
	};

	const tagIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="m21.4 14.25l-7.15 7.15q-.3.3-.675.45t-.75.15t-.75-.15t-.675-.45l-8.825-8.825q-.275-.275-.425-.637T2 11.175V4q0-.825.588-1.412T4 2h7.175q.4 0 .775.163t.65.437l8.8 8.825q.3.3.438.675t.137.75t-.137.738t-.438.662M12.825 20l7.15-7.15L11.15 4H4v7.15zM6.5 8q.625 0 1.063-.437T8 6.5t-.437-1.062T6.5 5t-1.062.438T5 6.5t.438 1.063T6.5 8m5.5 4"/>'
	};

	const chevronDownIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/>'
	};

	const chevronUpIcon = {
		width: 24,
		height: 24,
		body: '<path fill="currentColor" d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z"/>'
	};

	const categoryCounts = new Map<string, number>();
	for (const article of articlesData) {
		if (article.category) {
			categoryCounts.set(article.category, (categoryCounts.get(article.category) ?? 0) + 1);
		}
	}

	const baseCategories: string[] = [
		'All',
		...[...categoryCounts.entries()]
			.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
			.map(([name]) => name)
	];

	const tagCounts = new Map<string, number>();
	for (const article of articlesData) {
		for (const tag of article.tags ?? []) {
			tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
		}
	}

	const allTags: string[] = [...tagCounts.entries()]
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }))
		.map(([name]) => name);

	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let selectedTags: string[] = $state([]);
	let sortOrder: 'newest' | 'oldest' = $state('newest');
	let showTags = $state(false);

	let normalizedQuery = $derived(searchQuery.trim().toLowerCase());

	function matchesSearch(article: BlogArticle, query: string): boolean {
		if (!query) return true;
		return (
			article.title.toLowerCase().includes(query) ||
			article.description.toLowerCase().includes(query) ||
			(article.category?.toLowerCase().includes(query) ?? false) ||
			(article.tags?.some((tag) => tag.toLowerCase().includes(query)) ?? false)
		);
	}

	function matchesTags(article: BlogArticle, tags: string[]): boolean {
		if (tags.length === 0) return true;
		return tags.every((tag) => article.tags?.includes(tag));
	}

	let categoryOptions = $derived.by(() => {
		const matchingSearchAndTags = articlesData.filter(
			(article) => matchesSearch(article, normalizedQuery) && matchesTags(article, selectedTags)
		);
		return baseCategories.map((name) => ({
			name,
			count:
				name === 'All'
					? matchingSearchAndTags.length
					: matchingSearchAndTags.filter((article) => article.category === name).length
		}));
	});

	let filteredArticles = $derived.by(() => {
		const filtered = articlesData.filter(
			(article) =>
				(selectedCategory === 'All' || article.category === selectedCategory) &&
				matchesSearch(article, normalizedQuery) &&
				matchesTags(article, selectedTags)
		);

		return [...filtered].sort((a, b) =>
			sortOrder === 'newest'
				? b.timestamp - a.timestamp || b.id - a.id
				: a.timestamp - b.timestamp || a.id - b.id
		);
	});

	let tagOptions = $derived.by(() =>
		allTags.map((name) => {
			const selected = selectedTags.includes(name);
			const nextTags = selected ? selectedTags : [...selectedTags, name];
			const liveCount = articlesData.filter(
				(article) =>
					(selectedCategory === 'All' || article.category === selectedCategory) &&
					matchesSearch(article, normalizedQuery) &&
					matchesTags(article, nextTags)
			).length;

			return { name, selected, liveCount };
		})
	);

	let hasActiveFilters = $derived(
		normalizedQuery.length > 0 || selectedCategory !== 'All' || selectedTags.length > 0
	);

	onMount(() => {
		document.title = 'Blog - Cattn.dev';
		const params = new URLSearchParams(window.location.search);
		const categoryParam = params.get('category');
		if (categoryParam && baseCategories.includes(categoryParam)) {
			selectedCategory = categoryParam;
		}
		const tagParam = params.get('tag');
		if (tagParam && allTags.includes(tagParam)) {
			selectedTags = [tagParam];
		}
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

	function resetFilters() {
		searchQuery = '';
		selectedCategory = 'All';
		selectedTags = [];
	}
</script>

<section
	class="container mx-auto max-sm:!max-w-none px-4 max-sm:px-4 pt-16 pb-8 max-sm:pt-8 max-sm:pb-5 text-center"
	in:fly={{ y: 50, duration: 500, delay: 200 }}
>
	<h1 class="text-5xl max-sm:text-4xl font-black text-primary">Blog</h1>
	<h2 class="mt-1 text-xl max-sm:text-base font-semibold text-on-surface-variant">
		My thoughts &amp; Updates
	</h2>
</section>

<section
	class="container mx-auto max-sm:!max-w-none px-4 max-sm:px-4 py-2 max-sm:py-0"
	in:fly={{ y: 50, duration: 500, delay: 300 }}
>
	<SurfaceCard variant="low">
		<div class="flex w-full min-w-0 flex-col gap-3 max-sm:p-2">
			<div class="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
				<div
					class="flex h-10 w-full items-center gap-2.5 rounded-full border border-outline-variant bg-surface px-4 transition-colors focus-within:border-primary max-sm:h-11 max-sm:px-3.5 sm:flex-1"
				>
					<Icon
						icon={searchIcon}
						width="1.125rem"
						height="1.125rem"
						class="shrink-0 text-on-surface-variant"
					/>
					<input
						type="search"
						bind:value={searchQuery}
						placeholder="Search posts, topics, or tags..."
						aria-label="Search blog posts"
						class="blog-search min-w-0 w-full bg-transparent text-sm max-sm:text-base text-on-surface placeholder:text-on-surface-variant/75 focus:outline-none"
					/>
					{#if searchQuery}
						<button
							type="button"
							onclick={() => (searchQuery = '')}
							aria-label="Clear search"
							class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
						>
							<Icon icon={closeIcon} width="1rem" height="1rem" />
						</button>
					{/if}
				</div>

				<div class="w-full shrink-0 rounded-full ring-1 ring-outline-variant/60 sm:w-auto">
					<ConnectedButtons>
						<input
							id="blog-sort-newest"
							type="radio"
							name="blog-sort"
							value="newest"
							checked={sortOrder === 'newest'}
							onchange={() => (sortOrder = 'newest')}
						/>
						<Button for="blog-sort-newest" variant="filled" square>Newest</Button>
						<input
							id="blog-sort-oldest"
							type="radio"
							name="blog-sort"
							value="oldest"
							checked={sortOrder === 'oldest'}
							onchange={() => (sortOrder = 'oldest')}
						/>
						<Button for="blog-sort-oldest" variant="filled" square>Oldest</Button>
					</ConnectedButtons>
				</div>
			</div>

			<div
				class="flex w-full min-w-0 flex-wrap items-center justify-between gap-2 max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5"
			>
				<div class="flex min-w-0 flex-wrap items-center gap-2 max-sm:gap-1.5">
					{#each categoryOptions as cat (cat.name)}
						<Chip
							type="button"
							variant="general"
							selected={selectedCategory === cat.name}
							icon={selectedCategory === cat.name ? checkIcon : undefined}
							click={() => (selectedCategory = cat.name)}
						>
							{cat.name}
							<span class="ml-1 text-xs tabular-nums opacity-70">{cat.count}</span>
						</Chip>
					{/each}
				</div>

				<div
					class="min-w-0 max-sm:flex max-sm:items-center max-sm:justify-between max-sm:gap-2 max-sm:border-t max-sm:border-outline-variant/40 max-sm:pt-2.5"
				>
					<Chip
						type="button"
						variant="general"
						icon={tagIcon}
						trailingIcon={showTags ? chevronUpIcon : chevronDownIcon}
						selected={showTags || selectedTags.length > 0}
						click={() => (showTags = !showTags)}
					>
						Tags{selectedTags.length > 0 ? ` (${selectedTags.length})` : ''}
					</Chip>
					{#if !hasActiveFilters}
						<span class="shrink-0 text-xs text-on-surface-variant sm:hidden">
							{filteredArticles.length} {filteredArticles.length === 1 ? 'post' : 'posts'}
						</span>
					{/if}
				</div>
			</div>

			{#if showTags}
				<div
					class="border-t border-outline-variant/60 pt-3"
					transition:slide={{ duration: 200 }}
				>
					<div class="mb-2 flex items-center justify-between gap-2 text-xs text-on-surface-variant">
						<span>Filter by tags (matches all selected)</span>
						{#if selectedTags.length > 0}
							<button
								type="button"
								onclick={clearTags}
								class="cursor-pointer font-medium text-primary hover:underline"
							>
								Clear tags
							</button>
						{/if}
					</div>
					<div class="flex flex-wrap gap-2 max-sm:gap-1.5">
						{#each tagOptions as tag (tag.name)}
							<Chip
								type="button"
								variant="general"
								selected={tag.selected}
								disabled={!tag.selected && tag.liveCount === 0}
								icon={tag.selected ? checkIcon : undefined}
								click={() => toggleTag(tag.name)}
							>
								{tag.name}
								<span class="ml-1 text-xs tabular-nums opacity-70">{tag.liveCount}</span>
							</Chip>
						{/each}
					</div>
				</div>
			{/if}

			{#if hasActiveFilters}
				<div
					class="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/60 pt-2.5 text-xs text-on-surface-variant max-sm:pt-3"
					transition:slide={{ duration: 180 }}
				>
					<div class="flex flex-wrap items-center gap-2">
						<span>
							Showing {filteredArticles.length} of {articlesData.length}
							{articlesData.length === 1 ? 'post' : 'posts'}
						</span>
						{#if !showTags && selectedTags.length > 0}
							{#each selectedTags as tag (tag)}
								<Chip
									type="button"
									variant="input"
									selected
									trailingIcon={closeIcon}
									click={() => toggleTag(tag)}
								>
									{tag}
								</Chip>
							{/each}
						{/if}
					</div>
					<button
						type="button"
						onclick={resetFilters}
						class="cursor-pointer font-medium text-primary hover:underline max-sm:py-1"
					>
						Reset filters
					</button>
				</div>
			{/if}
		</div>
	</SurfaceCard>
</section>

<section
	class="container mx-auto max-sm:!max-w-none mb-10 px-4 max-sm:px-4 py-6 max-sm:pt-4 max-sm:pb-8"
	in:fly={{ y: 50, duration: 500, delay: 400 }}
>
	{#if filteredArticles.length > 0}
		<div
			class="grid grid-cols-1 gap-6 max-sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
			in:fly={{ y: 16, duration: 240 }}
		>
			{#each filteredArticles as article (article.id)}
				<div animate:flip={{ duration: 260 }} in:fly={{ y: 16, duration: 220 }}>
					<SurfaceCard
						variant="low"
						class="group h-full transition-all focus-within:ring-2 focus-within:ring-primary hover:shadow-lg"
					>
						<div class="flex h-full flex-col max-sm:p-2">
							<div class="mb-2 flex items-center justify-between gap-2 text-xs text-on-surface-variant">
								<time datetime={article.isoDate}>{article.formattedDate}</time>
								{#if article.category}
									<span
										class="rounded-full border border-outline-variant/70 px-2 py-0.5 text-[11px] font-medium text-on-surface-variant"
									>
										{article.category}
									</span>
								{/if}
							</div>

							<h3
								class="text-lg font-semibold text-on-surface transition-colors group-hover:text-primary"
							>
								<a
									href={article.link}
									class="after:absolute after:inset-0 after:content-[''] focus:outline-none"
								>
									{article.title}
								</a>
							</h3>

							<p class="mt-2 mb-4 flex-grow text-sm leading-relaxed text-on-surface-variant">
								{article.description}
							</p>

							{#if article.tags && article.tags.length > 0}
								<div class="relative z-10 flex flex-wrap gap-1.5">
									{#each article.tags as tag (tag)}
										{@const isSelected = selectedTags.includes(tag)}
										<button
											type="button"
											onclick={() => toggleTag(tag)}
											aria-pressed={isSelected}
											title={isSelected ? `Remove "${tag}" filter` : `Filter by "${tag}"`}
											class="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
										>
											<Badge
												class={isSelected
													? '!bg-primary !text-on-primary transition-colors'
													: 'transition-colors hover:!bg-primary-container hover:!text-on-primary-container'}
											>
												{tag}
											</Badge>
										</button>
									{/each}
								</div>
							{/if}
						</div>
					</SurfaceCard>
				</div>
			{/each}
		</div>
	{:else}
		<div in:fly={{ y: 16, duration: 240 }}>
			<SurfaceCard variant="low" class="mx-auto max-w-md py-8 text-center">
				<div class="max-sm:px-3 max-sm:py-6">
					<p class="text-base font-semibold text-on-surface">No matching posts</p>
					<p class="mt-1 text-sm text-on-surface-variant">
						Try adjusting your search query, category, or selected tags.
					</p>
					<div class="mt-4 flex justify-center">
						<Button variant="filled" click={resetFilters}>Reset filters</Button>
					</div>
				</div>
			</SurfaceCard>
		</div>
	{/if}
</section>

<style>
	.blog-search::-webkit-search-cancel-button {
		display: none;
	}
</style>
