import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	let markdown: string | null = null;
	let errorStatus: number | null = null;
	let errorMessage: string | null = null;

	try {
		const res = await fetch(`/articles/${params.slug}.md`);
		if (res.ok) {
			markdown = await res.text();
		} else {
			errorStatus = res.status;
			errorMessage =
				res.status === 404 ? 'Article Not Found.' : `Error loading article: ${res.statusText}`;
		}
	} catch {
		errorMessage = 'Error loading article.';
	}

	return {
		slug: params.slug,
		markdown,
		errorStatus,
		errorMessage
	};
};
