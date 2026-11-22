import { Hct, SchemeVibrant, argbFromHex } from '@ktibow/material-color-utilities-nightly';
import { colors } from 'm3-svelte';

export function schemeVars(seed: string, dark: boolean): string {
	const scheme = new SchemeVibrant(Hct.fromInt(argbFromHex(seed)), dark, 0);
	return colors
		.map((color) => {
			const argb = color.getArgb(scheme);
			return `--m3-scheme-${color.name.replaceAll('_', '-')}: ${(argb >> 16) & 255} ${(argb >> 8) & 255} ${argb & 255};`;
		})
		.join(' ');
}

const STATE_CLASSES = {
	hover: 'split-hover',
	active: 'split-active',
	focus: 'split-focus',
	focusVisible: 'split-focus-visible',
	focusWithin: 'split-focus-within'
};
const STATE_SELECTOR = Object.values(STATE_CLASSES)
	.map((c) => `.${c}`)
	.join(', ');

const PSEUDO_REWRITES: [RegExp, string][] = [
	[/:focus-visible/g, `.${STATE_CLASSES.focusVisible}`],
	[/:focus-within/g, `.${STATE_CLASSES.focusWithin}`],
	[/:focus(?![\w-])/g, `.${STATE_CLASSES.focus}`],
	[/:hover/g, `.${STATE_CLASSES.hover}`],
	[/:active/g, `.${STATE_CLASSES.active}`]
];
const HAS_STATE_PSEUDO = /:(hover|active|focus)/;

type RuleContainer = { cssRules: CSSRuleList; insertRule(rule: string, index?: number): number };

function mirrorStateRules(container: RuleContainer) {
	const rules = container.cssRules;
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (rule instanceof CSSStyleRule && HAS_STATE_PSEUDO.test(rule.selectorText)) {
			let text = rule.cssText;
			for (const [pattern, replacement] of PSEUDO_REWRITES)
				text = text.replace(pattern, replacement);
			try {
				container.insertRule(text, i + 1);
				i++;
				continue;
			} catch {}
		}
		if ('cssRules' in rule && 'insertRule' in rule)
			mirrorStateRules(rule as unknown as RuleContainer);
	}
}

const processedSheets = new WeakSet<CSSStyleSheet>();

function processStylesheets() {
	for (const sheet of document.styleSheets) {
		if (processedSheets.has(sheet)) continue;
		try {
			void sheet.cssRules;
		} catch {
			continue;
		}
		processedSheets.add(sheet);
		mirrorStateRules(sheet);
	}
}

export type HalfPlane = { top: number; bottom: number; keep: 'left' | 'right'; shift?: number };
export type SplitRegion = { mirror: HTMLElement; selection?: HTMLElement; planes: HalfPlane[] };

type Point = [number, number];

export function createSplitMirror(source: HTMLElement, getRegions: () => SplitRegion[]) {
	const mirrors = new Set<HTMLElement>();
	let frame = 0;
	let animationFrame = 0;
	let hovered: Element | null = null;
	let pressed: Element | null = null;
	let focused: Element | null = null;
	const animationCopies = new WeakMap<Animation, Map<HTMLElement, Animation>>();

	const pathOf = (node: Node): number[] | null => {
		const path: number[] = [];
		let current: Node = node;
		while (current !== source) {
			const parent = current.parentNode;
			if (!parent) return null;
			path.push(Array.prototype.indexOf.call(parent.childNodes, current));
			current = parent;
		}
		return path.reverse();
	};

	const follow = <T extends Node>(mirror: HTMLElement, path: number[] | null): T | null => {
		if (!path) return null;
		let current: Node = mirror;
		for (const index of path) {
			const next = current.childNodes[index];
			if (!next) return null;
			current = next;
		}
		return current as T;
	};

	const counterpart = <T extends Node>(mirror: HTMLElement, node: T): T | null =>
		follow<T>(mirror, pathOf(node));

	const mirrorIds = new WeakMap<HTMLElement, number>();
	let nextMirrorId = 0;
	const suffixOf = (mirror: HTMLElement) => {
		if (!mirrorIds.has(mirror)) mirrorIds.set(mirror, ++nextMirrorId);
		return `--split-mirror-${mirrorIds.get(mirror)}`;
	};

	const syncField = (original: Element | undefined, clone: Element | undefined, suffix: string) => {
		if (!original || !clone) return;
		const name = original.getAttribute('name');
		if (name) clone.setAttribute('name', `${name}${suffix}`);
		if (original instanceof HTMLInputElement && clone instanceof HTMLInputElement) {
			clone.checked = original.checked;
			clone.value = original.value;
		} else if (original instanceof HTMLTextAreaElement && clone instanceof HTMLTextAreaElement) {
			clone.value = original.value;
		} else if (original instanceof HTMLSelectElement && clone instanceof HTMLSelectElement) {
			clone.selectedIndex = original.selectedIndex;
		}
	};

	const prepareClone = (original: Node, clone: Node, suffix: string) => {
		if (!(original instanceof Element) || !(clone instanceof Element)) return;
		const fields = 'input, textarea, select';
		const originals = [
			...(original.matches(fields) ? [original] : []),
			...original.querySelectorAll(fields)
		];
		const clones = [...(clone.matches(fields) ? [clone] : []), ...clone.querySelectorAll(fields)];
		originals.forEach((field, i) => syncField(field, clones[i], suffix));
		for (const media of [
			...(clone.matches('video, audio') ? [clone] : []),
			...clone.querySelectorAll('video, audio')
		]) {
			(media as HTMLMediaElement).muted = true;
			media.removeAttribute('autoplay');
		}
	};

	const cloneInto = (target: Node, original: Node, mirror: HTMLElement) => {
		const suffix = suffixOf(mirror);
		const clones = Array.from(original.childNodes, (child) => {
			const clone = child.cloneNode(true);
			prepareClone(child, clone, suffix);
			return clone;
		});
		(target as Element).replaceChildren(...clones);
	};

	const syncAllFields = () => {
		const fields = [...source.querySelectorAll('input, textarea, select')];
		if (!fields.length) return;
		const paths = fields.map((field) => pathOf(field));
		for (const mirror of mirrors) {
			const suffix = suffixOf(mirror);
			fields.forEach((field, i) =>
				syncField(field, follow<Element>(mirror, paths[i]) ?? undefined, suffix)
			);
		}
	};

	const chain = (start: Element | null) => {
		const paths: number[][] = [];
		for (let el = start; el && el !== source && source.contains(el); el = el.parentElement) {
			const path = pathOf(el);
			if (path) paths.push(path);
		}
		return paths;
	};

	const applyState = () => {
		const hoverPaths = chain(hovered);
		const activePaths = chain(pressed);
		const focusInside = focused && source.contains(focused) ? focused : null;
		const focusPath = focusInside ? pathOf(focusInside) : null;
		const focusVisible = !!focusInside?.matches(':focus-visible');
		const focusWithinPaths = chain(focusInside);
		for (const mirror of mirrors) {
			for (const el of mirror.querySelectorAll(STATE_SELECTOR)) {
				el.classList.remove(...Object.values(STATE_CLASSES));
			}
			const mark = (paths: number[][], className: string) => {
				for (const path of paths) follow<Element>(mirror, path)?.classList.add(className);
			};
			mark(hoverPaths, STATE_CLASSES.hover);
			mark(activePaths, STATE_CLASSES.active);
			mark(focusWithinPaths, STATE_CLASSES.focusWithin);
			const copy = follow<Element>(mirror, focusPath);
			copy?.classList.add(STATE_CLASSES.focus);
			if (focusVisible) copy?.classList.add(STATE_CLASSES.focusVisible);
		}
	};

	const handleMutations = (records: MutationRecord[]) => {
		const childTargets = new Set<Node>();
		for (const r of records) if (r.type === 'childList') childTargets.add(r.target);
		const roots = [...childTargets].filter((node) => {
			for (let p = node.parentNode; p; p = p.parentNode) if (childTargets.has(p)) return false;
			return node === source || source.contains(node);
		});
		const covered = (node: Node) => {
			for (let p: Node | null = node; p; p = p.parentNode) if (childTargets.has(p)) return true;
			return false;
		};
		const rootPaths = roots.map((node) => ({ node, path: pathOf(node) }));
		const edits = records
			.filter(
				(r) =>
					r.type !== 'childList' &&
					source.contains(r.target) &&
					!covered(r.target.parentNode ?? r.target)
			)
			.map((r) => ({ record: r, path: pathOf(r.target) }));

		for (const mirror of mirrors) {
			try {
				for (const { node, path } of rootPaths) {
					const copy = node === source ? mirror : follow(mirror, path);
					if (!copy) throw new Error('out of sync');
					cloneInto(copy, node, mirror);
				}
				for (const { record, path } of edits) {
					const copy = follow<Node>(mirror, path);
					if (!copy) throw new Error('out of sync');
					if (record.type === 'characterData') {
						copy.textContent = record.target.textContent;
					} else if (record.type === 'attributes' && record.attributeName) {
						const value = (record.target as Element).getAttribute(record.attributeName);
						const el = copy as Element;
						if (record.attributeName === 'name' && value) {
							el.setAttribute('name', `${value}${suffixOf(mirror)}`);
						} else if (value === null) {
							el.removeAttribute(record.attributeName);
						} else {
							el.setAttribute(record.attributeName, value);
						}
					}
				}
			} catch {
				cloneInto(mirror, source, mirror);
			}
		}
		syncAllFields();
		applyState();
		paint();
		scheduleAnimationSync();
	};

	const syncAnimations = () => {
		for (const animation of source.getAnimations({ subtree: true })) {
			if (animation instanceof CSSAnimation || animation instanceof CSSTransition) continue;
			const effect = animation.effect;
			if (!(effect instanceof KeyframeEffect) || !effect.target) continue;
			if (!source.contains(effect.target)) continue;
			let copies = animationCopies.get(animation);
			if (!copies) {
				copies = new Map();
				animationCopies.set(animation, copies);
			}
			const path = pathOf(effect.target);
			for (const mirror of mirrors) {
				let copy = copies.get(mirror);
				const copyTarget = copy?.effect instanceof KeyframeEffect ? copy.effect.target : null;
				if (!copy || !copyTarget?.isConnected || !mirror.contains(copyTarget)) {
					const target = follow<Element>(mirror, path);
					if (!target) continue;
					copy = target.animate(effect.getKeyframes(), effect.getTiming());
					copies.set(mirror, copy);
				}
				copy.currentTime = animation.currentTime;
				if (animation.playState === 'paused') copy.pause();
			}
		}
	};

	const scheduleAnimationSync = () => {
		syncAnimations();
		cancelAnimationFrame(animationFrame);
		animationFrame = requestAnimationFrame(() => {
			syncAnimations();
			animationFrame = requestAnimationFrame(() => {
				animationFrame = 0;
				syncAnimations();
			});
		});
	};

	const selectionBoxes = (origin: DOMRect) => {
		const boxes: { x0: number; y0: number; x1: number; y1: number }[] = [];
		const selection = document.getSelection();
		for (let i = 0; selection && i < selection.rangeCount; i++) {
			const range = selection.getRangeAt(i);
			if (range.collapsed || !range.intersectsNode(source)) continue;
			const scoped = range.cloneRange();
			if (!source.contains(scoped.startContainer)) scoped.setStart(source, 0);
			if (!source.contains(scoped.endContainer)) scoped.setEnd(source, source.childNodes.length);
			const ancestor = scoped.commonAncestorContainer;
			const texts: Text[] = [];
			if (ancestor instanceof Text) texts.push(ancestor);
			else {
				const walker = document.createTreeWalker(ancestor, NodeFilter.SHOW_TEXT);
				for (let node = walker.nextNode(); node; node = walker.nextNode()) {
					if (scoped.intersectsNode(node)) texts.push(node as Text);
				}
			}
			for (const text of texts) {
				if (!text.data.trim() || !text.parentElement) continue;
				const part = document.createRange();
				part.selectNodeContents(text);
				if (text === scoped.startContainer) part.setStart(text, scoped.startOffset);
				if (text === scoped.endContainer) part.setEnd(text, scoped.endOffset);
				const style = getComputedStyle(text.parentElement);
				const lineHeight =
					style.lineHeight === 'normal'
						? parseFloat(style.fontSize) * 1.2
						: parseFloat(style.lineHeight);
				for (const rect of part.getClientRects()) {
					if (!rect.width) continue;
					const y = rect.top + rect.height / 2 - lineHeight / 2 - origin.top;
					boxes.push({
						x0: Math.floor(rect.left - origin.left),
						y0: Math.floor(y),
						x1: Math.ceil(rect.right - origin.left),
						y1: Math.ceil(y + lineHeight)
					});
				}
			}
		}
		return boxes;
	};

	const paint = () => {
		cancelAnimationFrame(frame);
		frame = 0;
		const origin = source.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const clipBy = (polygon: Point[], plane: HalfPlane): Point[] => {
			const sign = plane.keep === 'right' ? 1 : -1;
			const lineX = (y: number) =>
				vw * (plane.top + ((plane.bottom - plane.top) * (y + origin.top)) / vh) +
				(plane.shift ?? 0) -
				origin.left;
			const side = ([x, y]: Point) => sign * (x - lineX(y));
			const result: Point[] = [];
			for (let k = 0; k < polygon.length; k++) {
				const a = polygon[k];
				const b = polygon[(k + 1) % polygon.length];
				const da = side(a);
				const db = side(b);
				if (da >= 0) result.push(a);
				if (da >= 0 !== db >= 0) {
					const t = da / (da - db);
					result.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
				}
			}
			return result;
		};
		const clip = (polygon: Point[], planes: HalfPlane[]) =>
			planes.reduce((poly, plane) => (poly.length ? clipBy(poly, plane) : poly), polygon);
		const toPath = (poly: Point[]) => `M${poly.map(([x, y]) => `${x} ${y}`).join('L')}Z`;

		const page: Point[] = [
			[0, 0],
			[origin.width, 0],
			[origin.width, origin.height],
			[0, origin.height]
		];
		let boxes: ReturnType<typeof selectionBoxes> | null = null;

		for (const region of getRegions()) {
			if (!mirrors.has(region.mirror)) continue;
			const polygon = clip(page, region.planes);
			region.mirror.style.clipPath =
				polygon.length >= 3
					? `polygon(${polygon.map(([x, y]) => `${x}px ${y}px`).join(', ')})`
					: 'polygon(0px 0px, 0px 0px, 0px 0px)';
			if (!region.selection) continue;
			boxes ??= selectionBoxes(origin);
			const d = boxes
				.map(({ x0, y0, x1, y1 }) => {
					const box: Point[] = [
						[x0, y0],
						[x1, y0],
						[x1, y1],
						[x0, y1]
					];
					return clip(box, region.planes);
				})
				.filter((poly) => poly.length >= 3)
				.map(toPath)
				.join('');
			let path = region.selection.querySelector('path');
			if (!path) {
				const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				svg.append(path);
				region.selection.replaceChildren(svg);
			}
			if (path.getAttribute('d') !== d) path.setAttribute('d', d);
		}
	};

	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(paint);
	};

	const onPointerOver = (e: PointerEvent) => {
		hovered = e.target instanceof Element && source.contains(e.target) ? e.target : null;
		applyState();
	};
	const onPointerOut = (e: PointerEvent) => {
		if (!e.relatedTarget) {
			hovered = null;
			applyState();
		}
	};
	const onPointerDown = (e: PointerEvent) => {
		pressed = e.target instanceof Element && source.contains(e.target) ? e.target : null;
		applyState();
	};
	const onPointerUp = () => {
		pressed = null;
		applyState();
	};
	const onFocusChange = () => {
		focused = document.activeElement;
		applyState();
	};
	const onFieldChange = (e: Event) => {
		const target = e.target as Element;
		if (!source.contains(target)) return;
		if (
			target instanceof HTMLInputElement &&
			(target.type === 'radio' || target.type === 'checkbox')
		) {
			syncAllFields();
			return;
		}
		for (const mirror of mirrors) {
			syncField(target, counterpart(mirror, target) ?? undefined, suffixOf(mirror));
		}
	};
	const onScroll = (e: Event) => {
		const target = e.target;
		if (target instanceof Element && source.contains(target)) {
			for (const mirror of mirrors) {
				const copy = counterpart(mirror, target);
				if (copy) {
					copy.scrollTop = target.scrollTop;
					copy.scrollLeft = target.scrollLeft;
				}
			}
		}
		schedule();
	};

	processStylesheets();
	const headObserver = new MutationObserver(processStylesheets);
	headObserver.observe(document.head, { childList: true, subtree: true, characterData: true });
	const onSheetLoad = (e: Event) => {
		if (e.target instanceof HTMLLinkElement) processStylesheets();
	};
	document.addEventListener('load', onSheetLoad, true);

	const observer = new MutationObserver(handleMutations);
	observer.observe(source, {
		subtree: true,
		childList: true,
		attributes: true,
		characterData: true
	});

	document.addEventListener('pointerover', onPointerOver, true);
	document.addEventListener('pointerout', onPointerOut, true);
	document.addEventListener('pointerdown', onPointerDown, true);
	document.addEventListener('pointerup', onPointerUp, true);
	document.addEventListener('pointercancel', onPointerUp, true);
	document.addEventListener('focusin', onFocusChange, true);
	document.addEventListener('focusout', onFocusChange, true);
	document.addEventListener('input', onFieldChange, true);
	document.addEventListener('change', onFieldChange, true);
	document.addEventListener('scroll', onScroll, { capture: true, passive: true });
	document.addEventListener('selectionchange', paint);
	window.addEventListener('resize', schedule);
	const resizer = new ResizeObserver(schedule);
	resizer.observe(source);

	return {
		addMirror(mirror: HTMLElement) {
			const pending = observer.takeRecords();
			if (pending.length) handleMutations(pending);
			mirrors.add(mirror);
			cloneInto(mirror, source, mirror);
			applyState();
			scheduleAnimationSync();
			paint();
		},
		removeMirror(mirror: HTMLElement) {
			mirrors.delete(mirror);
			mirror.style.clipPath = 'polygon(0px 0px, 0px 0px, 0px 0px)';
			mirror.replaceChildren();
		},
		update: schedule,
		paintNow: paint,
		syncFields: syncAllFields,
		destroy() {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(animationFrame);
			observer.disconnect();
			headObserver.disconnect();
			resizer.disconnect();
			document.removeEventListener('load', onSheetLoad, true);
			document.removeEventListener('pointerover', onPointerOver, true);
			document.removeEventListener('pointerout', onPointerOut, true);
			document.removeEventListener('pointerdown', onPointerDown, true);
			document.removeEventListener('pointerup', onPointerUp, true);
			document.removeEventListener('pointercancel', onPointerUp, true);
			document.removeEventListener('focusin', onFocusChange, true);
			document.removeEventListener('focusout', onFocusChange, true);
			document.removeEventListener('input', onFieldChange, true);
			document.removeEventListener('change', onFieldChange, true);
			document.removeEventListener('scroll', onScroll, true);
			document.removeEventListener('selectionchange', paint);
			window.removeEventListener('resize', schedule);
			for (const mirror of mirrors) mirror.replaceChildren();
			mirrors.clear();
		}
	};
}
