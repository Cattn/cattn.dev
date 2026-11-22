import { cubicInOut } from 'svelte/easing';

export const TABS = ['home', 'projects', 'blog', 'about'] as const;
export type TabId = (typeof TABS)[number];

export const PAGE_TRANSITION = { duration: 500, easing: cubicInOut };
export const THEME_TRANSITION = { duration: 900, easing: cubicInOut };

export function tabOf(pathname: string): TabId {
	if (pathname.startsWith('/projects')) return 'projects';
	if (pathname.startsWith('/blog')) return 'blog';
	if (pathname.startsWith('/about') || pathname.startsWith('/media')) return 'about';
	return 'home';
}

export function tabDirection(from: TabId, to: TabId): -1 | 0 | 1 {
	const delta = TABS.indexOf(to) - TABS.indexOf(from);
	return delta > 0 ? 1 : delta < 0 ? -1 : 0;
}
