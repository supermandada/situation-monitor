import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Lang = 'en' | 'zh';

const STORAGE_KEY = 'situation-monitor:lang';

function getInitialLang(): Lang {
	if (!browser) return 'en';
	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === 'en' || saved === 'zh') return saved;
	// Simple heuristic: default to Chinese when the browser language is zh*
	const nav = (navigator.language || '').toLowerCase();
	return nav.startsWith('zh') ? 'zh' : 'en';
}

export const lang = writable<Lang>(getInitialLang());

if (browser) {
	lang.subscribe((l) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, l);
		} catch {
			// ignore
		}
	});
}

const dict = {
	en: {
		lastUpdated: 'Last updated: {time}',
		neverRefreshed: 'Never refreshed',
		refreshing: 'Refreshing...',
		settings: 'Settings',
		language: 'Language'
	},
	zh: {
		lastUpdated: '最近更新：{time}',
		neverRefreshed: '从未刷新',
		refreshing: '刷新中…',
		settings: '设置',
		language: '语言'
	}
} as const;

export type I18nKey = keyof (typeof dict)['en'];

export function t(key: I18nKey, params?: Record<string, string | number>): string {
	// NOTE: This is a tiny i18n helper, not a full framework.
	let current: Lang = 'en';
	// subscribe once (store is synchronous) — safe for this small helper
	lang.subscribe((l) => (current = l))();

	let template: string = (dict[current][key] ?? dict.en[key] ?? String(key)) as string;
	if (params) {
		for (const [k, v] of Object.entries(params)) {
			template = template.replaceAll(`{${k}}`, String(v));
		}
	}
	return template;
}

export function toggleLang(): void {
	lang.update((l) => (l === 'en' ? 'zh' : 'en'));
}

export function localeForLang(l: Lang): string {
	return l === 'zh' ? 'zh-CN' : 'en-US';
}
