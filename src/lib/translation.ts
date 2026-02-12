import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { lang, type Lang } from '$lib/i18n';

// Client-side translation queue + localStorage cache.
// Translates EN -> zh when lang === 'zh'.

const STORAGE_KEY = 'situation-monitor:translations:zh';

type Cache = Record<string, string>;

function loadCache(): Cache {
	if (!browser) return {};
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		return JSON.parse(raw) as Cache;
	} catch {
		return {};
	}
}

function saveCache(cache: Cache) {
	if (!browser) return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
	} catch {
		// ignore
	}
}

let cache: Cache = loadCache();
let dirty = false;
let flushTimer: any = null;

function markDirty() {
	dirty = true;
	if (!flushTimer) {
		flushTimer = setTimeout(() => {
			flushTimer = null;
			if (dirty) {
				dirty = false;
				saveCache(cache);
			}
		}, 500);
	}
}

const inFlight = new Map<string, Promise<string>>();
let queue = new Set<string>();
let queueTimer: any = null;

function scheduleFlush() {
	if (queueTimer) return;
	queueTimer = setTimeout(() => {
		queueTimer = null;
		void flushQueue();
	}, 60);
}

async function flushQueue() {
	const toSend = Array.from(queue).slice(0, 20);
	toSend.forEach((t) => queue.delete(t));
	if (toSend.length === 0) return;

	const r = await fetch('/api/translate', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ targetLang: 'zh', texts: toSend })
	});

	if (!r.ok) {
		// fail: resolve with original text
		toSend.forEach((src) => {
			cache[src] = src;
		});
		markDirty();
		return;
	}

	const data = (await r.json()) as { translations?: string[] };
	const translations = Array.isArray(data.translations) ? data.translations : [];

	for (let i = 0; i < toSend.length; i++) {
		const src = toSend[i];
		const out = (translations[i] ?? '').trim();
		cache[src] = out || src;
	}
	markDirty();
}

export async function translateText(text: string): Promise<string> {
	const currentLang: Lang = get(lang);
	if (currentLang !== 'zh') return text;

	const src = (text || '').trim();
	if (!src) return src;
	// If it already contains CJK, skip translation.
	if (/\p{Script=Han}/u.test(src)) return src;

	if (cache[src]) return cache[src];

	const existing = inFlight.get(src);
	if (existing) return existing;

	const p = (async () => {
		queue.add(src);
		scheduleFlush();

		// Poll cache until populated (best-effort)
		for (let i = 0; i < 50; i++) {
			await new Promise((r) => setTimeout(r, 80));
			if (cache[src]) return cache[src];
		}
		return src;
	})().finally(() => {
		inFlight.delete(src);
	});

	inFlight.set(src, p);
	return p;
}
