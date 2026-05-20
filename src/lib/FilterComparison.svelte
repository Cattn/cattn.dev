<script lang="ts">
	type Track = {
		id: number;
		title: string;
		artist: string;
		album: string;
		year: number;
		duration: number;
	};

	type BenchmarkResult = {
		searchOldMs: number;
		searchNewMs: number;
		size: number;
		rounds: number;
	};

	const sizePresets = [
		{ label: 'Small', value: 300 },
		{ label: 'Medium', value: 700 },
		{ label: 'Large', value: 1200 }
	];

	let selectedSize = $state(sizePresets[1].value);
	let rounds = $state(22);
	let running = $state(false);
	let result = $state<BenchmarkResult | null>(null);

	let searchOldWidth = $derived.by(() => {
		if (!result) return 0;
		const max = Math.max(result.searchOldMs, result.searchNewMs);
		return max === 0 ? 0 : (result.searchOldMs / max) * 100;
	});

	let searchNewWidth = $derived.by(() => {
		if (!result) return 0;
		const max = Math.max(result.searchOldMs, result.searchNewMs);
		return max === 0 ? 0 : (result.searchNewMs / max) * 100;
	});

	let searchSpeedup = $derived.by(() => {
		if (!result) return 0;
		if (result.searchNewMs <= 0) return Number.POSITIVE_INFINITY;
		return result.searchOldMs / result.searchNewMs;
	});

	function formatMs(ms: number): string {
		if (ms <= 0.005) return '<0.01';
		return ms.toFixed(2);
	}

	function formatSpeedup(value: number): string {
		if (!Number.isFinite(value)) return 'Instant';
		if (value <= 0) return 'N/A';
		return `${value.toFixed(2)}x faster`;
	}

	const artists = [
		'Kendrick Lamar',
		'Red Hot Chili Peppers',
		'Childish Gambino',
		'Rage Against The Machine',
		'Olivia Rodrigo',
		'Thundercat',
		'Tyler, the Creator',
		'Nine Inch Nails'
	];

	const albums = [
		'To Pimp A Butterfly',
		'Atavista',
		'Californication',
		'Evil Empire',
		'good kid, m.A.A.d city',
		'GUTS',
		'The Slow Rush',
		'DAMN.'
	];

	const titleWords = [
		'Sky',
		'Pulse',
		'Mirror',
		'System',
		'Future',
		'Noise',
		'Street',
		'Dream',
		'Neon',
		'Static'
	];

	function makeDataset(size: number): Track[] {
		const data: Track[] = [];
		for (let i = 0; i < size; i += 1) {
			const wordA = titleWords[i % titleWords.length];
			const wordB = titleWords[(i * 3) % titleWords.length];
			const artist = artists[(i * 5) % artists.length];
			const album = albums[(i * 7) % albums.length];
			data.push({
				id: i + 1,
				title: `${wordA} ${wordB} ${i + 1}`,
				artist,
				album,
				year: 1988 + (i % 38),
				duration: 120 + ((i * 17) % 320)
			});
		}
		return data;
	}

	function runOldTopBarSearch(tracks: Track[], query: string): number {
		const normalized = query.toLowerCase();
		const songs = [...tracks].sort((a, b) => a.title.localeCompare(b.title));
		const albumsList = [...new Set(tracks.map((track) => track.album))]
			.sort((a, b) => a.localeCompare(b))
			.map((name, idx) => ({ id: idx + 1, name }));
		const artistsList = [...new Set(tracks.map((track) => track.artist))]
			.sort((a, b) => a.localeCompare(b))
			.map((name, idx) => ({ id: idx + 1, name }));
		const playlists = [
			{ id: 1, name: 'Favorites' },
			{ id: 2, name: 'Late Night' },
			{ id: 3, name: 'Gym Mix' },
			{ id: 4, name: 'Coding' }
		];

		let count = 0;

		for (const track of songs) {
			const cleaned = track.title.replace(/["[\]]/g, '').toLowerCase();
			if (cleaned.includes(normalized)) count += 1;
		}
		for (const album of albumsList) {
			const cleaned = album.name.replace(/["[\]]/g, '').toLowerCase();
			if (cleaned.includes(normalized)) count += 1;
		}
		for (const artist of artistsList) {
			const cleaned = artist.name.replace(/["[\]]/g, '').toLowerCase();
			if (cleaned.includes(normalized)) count += 1;
		}
		for (const playlist of playlists) {
			const cleaned = playlist.name.replace(/["[\]]/g, '').toLowerCase();
			if (cleaned.includes(normalized)) count += 1;
		}

		return count;
	}

	type SearchItem = { text: string };

	function buildSearchIndex(tracks: Track[]): SearchItem[] {
		const albumsSeen: Record<string, boolean> = {};
		const artistsSeen: Record<string, boolean> = {};
		const indexed: SearchItem[] = [];

		for (const track of tracks) {
			indexed.push({ text: track.title.toLowerCase() });
			if (!albumsSeen[track.album]) {
				albumsSeen[track.album] = true;
				indexed.push({ text: track.album.toLowerCase() });
			}
			if (!artistsSeen[track.artist]) {
				artistsSeen[track.artist] = true;
				indexed.push({ text: track.artist.toLowerCase() });
			}
		}

		indexed.push({ text: 'favorites' });
		indexed.push({ text: 'late night' });
		indexed.push({ text: 'gym mix' });
		indexed.push({ text: 'coding' });

		return indexed;
	}

	function runNewIndexedSearch(index: SearchItem[], query: string): number {
		const normalized = query.toLowerCase();
		let count = 0;
		for (const item of index) {
			if (item.text.includes(normalized)) count += 1;
		}
		return count;
	}

	function benchmarkSearch(tracks: Track[]): { oldMs: number; newMs: number } {
		const queries = ['ke', 'ra', 'cali', 'damn', 'mix', 'night', 'sky'];
		const index = buildSearchIndex(tracks);
		let oldTotalMs = 0;
		let newTotalMs = 0;
		let sink = 0;

		for (let i = 0; i < rounds; i += 1) {
			const query = queries[i % queries.length];

			let start = performance.now();
			sink += runOldTopBarSearch(tracks, query);
			oldTotalMs += performance.now() - start;

			start = performance.now();
			sink += runNewIndexedSearch(index, query);
			newTotalMs += performance.now() - start;
		}

		if (sink === -1) {
			return { oldMs: 0, newMs: 0 };
		}

		return {
			oldMs: oldTotalMs / rounds,
			newMs: newTotalMs / rounds
		};
	}

	async function runBenchmark() {
		running = true;
		await Promise.resolve();
		const tracks = makeDataset(selectedSize);
		const searchResults = benchmarkSearch(tracks);
		result = {
			searchOldMs: searchResults.oldMs,
			searchNewMs: searchResults.newMs,
			size: selectedSize,
			rounds
		};
		running = false;
	}
</script>

<div class="my-6 rounded-lg border border-border bg-card text-card-foreground shadow-sm">
	<div class="space-y-4 px-4 py-4">
		<div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
			<div class="flex flex-wrap items-center gap-2">
				{#each sizePresets as preset (preset.value)}
					<button
						type="button"
						class={[
							'rounded-md border px-2 py-1 text-xs font-semibold transition-colors',
							selectedSize === preset.value
								? 'border-primary bg-primary text-primary-foreground'
								: 'border-border bg-background text-muted-foreground hover:text-foreground'
						]}
						onclick={() => {
							selectedSize = preset.value;
						}}
					>
						{preset.label} ({preset.value.toLocaleString()})
					</button>
				{/each}
			</div>

			<button
				type="button"
				class="w-full rounded-md border border-border bg-background px-3 py-1 text-xs font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto"
				onclick={runBenchmark}
				disabled={running}
			>
				{running ? 'Running...' : 'Run benchmark'}
			</button>
		</div>

		{#if result}
			<div class="rounded-md border border-border bg-background p-3">
				<div class="flex items-center justify-between">
					<p class="text-sm font-semibold">{formatSpeedup(searchSpeedup)}</p>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<div>
						<p class="text-xs uppercase tracking-wide text-muted-foreground">Old Search</p>
						<p class="mt-1 text-lg font-bold">{formatMs(result.searchOldMs)} ms</p>
						<div class="mt-2 h-2 w-full rounded-full bg-muted">
							<div
								class="h-full rounded-full bg-amber-400 transition-all duration-300"
								style={`width: ${searchOldWidth}%`}
							></div>
						</div>
					</div>
					<div>
						<p class="text-xs uppercase tracking-wide text-muted-foreground">New (properly) indexed search</p>
						<p class="mt-1 text-lg font-bold">{formatMs(result.searchNewMs)} ms</p>
						<div class="mt-2 h-2 w-full rounded-full bg-muted">
							<div
								class="h-full rounded-full bg-emerald-400 transition-all duration-300"
								style={`width: ${searchNewWidth}%`}
							></div>
						</div>
					</div>
				</div>
			</div>

			
		{:else}
			<p class="text-sm text-muted-foreground">
				Choose a sample library size and run the benchmark to see the difference!
			</p>
		{/if}
	</div>
</div>
