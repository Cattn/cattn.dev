import articlesJsonData from '../routes/blog/articles.json';

export interface RawArticle {
	title: string;
	description: string;
	link: string;
	date: string;
	id: number;
	category?: string;
	tags?: string[];
}

export interface BlogArticle extends RawArticle {
	slug: string;
	timestamp: number;
	formattedDate: string;
	isoDate: string;
}

export function parseArticleDate(dateStr: string): number {
	const parts = dateStr.split('/').map(Number);
	if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
		const [month, day, year] = parts;
		return new Date(year, month - 1, day).getTime();
	}
	const parsed = Date.parse(dateStr);
	return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatArticleDate(dateStr: string): string {
	const ts = parseArticleDate(dateStr);
	if (!ts) return dateStr;
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(new Date(ts));
}

export function formatIsoDate(ts: number, fallback: string): string {
	if (!ts) return fallback;
	const d = new Date(ts);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function estimateReadingTime(markdown: string): number {
	const plainText = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`~|-]/g, ' ')
		.trim();

	if (!plainText) return 1;
	const words = plainText.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

function extractSlug(link: string): string {
	return link.replace(/\/+$/, '').split('/').pop() ?? '';
}

export const articlesData: BlogArticle[] = (articlesJsonData as RawArticle[])
	.map((article) => {
		const timestamp = parseArticleDate(article.date);
		return {
			...article,
			slug: extractSlug(article.link),
			timestamp,
			formattedDate: formatArticleDate(article.date),
			isoDate: formatIsoDate(timestamp, article.date)
		};
	})
	.sort((a, b) => b.timestamp - a.timestamp || b.id - a.id);

export function getArticleBySlug(slug: string): BlogArticle | undefined {
	return articlesData.find(
		(article) => article.slug === slug || article.link === `/blog/article/${slug}`
	);
}

export function getAdjacentArticles(slug: string): {
	older: BlogArticle | null;
	newer: BlogArticle | null;
} {
	const index = articlesData.findIndex(
		(article) => article.slug === slug || article.link === `/blog/article/${slug}`
	);
	if (index === -1) return { older: null, newer: null };
	return {
		newer: index > 0 ? articlesData[index - 1] : null,
		older: index < articlesData.length - 1 ? articlesData[index + 1] : null
	};
}
