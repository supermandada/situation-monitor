import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Lang = 'en' | 'zh';

const STORAGE_KEY = 'situation-monitor:lang';

function getInitialLang(): Lang {
	if (!browser) return 'en';
	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === 'en' || saved === 'zh') return saved;
	// Default to English (unless user explicitly chose a language before)
	return 'en';
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

// Keep this flat for now. Keys are stable string IDs.
const dict: Record<Lang, Record<string, string>> = {
	en: {
		'app.title': 'Situation Monitor',
		'app.description': 'Real-time global situation monitoring dashboard',

		'header.lastUpdated': 'Last updated: {time}',
		'header.neverRefreshed': 'Never refreshed',
		'header.refreshing': 'Refreshing...',
		'header.settings': 'Settings',
		'header.language': 'Language',

		'panel.politics': 'Politics',
		'panel.tech': 'Tech',
		'panel.finance': 'Finance',
		'panel.gov': 'Government',
		'panel.ai': 'AI',
		'panel.markets': 'Markets',
		'panel.heatmap': 'Sector Heatmap',
		'panel.commodities': 'Commodities',
		'panel.crypto': 'Crypto',
		'panel.mainchar': 'Main Character',
		'panel.correlation': 'Pattern Analysis',
		'panel.narrative': 'Narrative Tracker',
		'panel.intel': 'Intel Feed',
		'panel.fed': 'Federal Reserve',
		'panel.leaders': 'World Leaders',
		'panel.whales': 'Whale Watch',
		'panel.polymarket': 'Polymarket',
		'panel.contracts': 'Gov Contracts',
		'panel.layoffs': 'Layoffs Tracker',
		'panel.printer': 'Money Printer',
		'panel.monitors': 'Custom Monitors',

		'modal.settings.title': 'Settings',
		'modal.settings.enabledPanels': 'Enabled Panels',
		'modal.settings.enabledPanelsDesc': 'Toggle panels on/off to customize your dashboard',
		'modal.settings.dashboard': 'Dashboard',
		'modal.settings.reconfigure': 'Reconfigure Dashboard',
		'modal.settings.reconfigureHint': 'Choose a preset profile for your panels',
		'modal.settings.reset': 'Reset All Settings',

		'modal.onboarding.skip': 'Skip onboarding',
		'modal.onboarding.welcome': 'Welcome to Situation Monitor',
		'modal.onboarding.subtitle': 'Choose a dashboard configuration to get started',
		'modal.onboarding.panelsCount': '{n} panels',
		'modal.onboarding.hint': 'You can change this later in Settings',

		'modal.monitor.create': 'Create Monitor',
		'modal.monitor.edit': 'Edit Monitor',
		'modal.monitor.name': 'Name',
		'modal.monitor.namePlaceholder': 'e.g., Ukraine Crisis',
		'modal.monitor.keywords': 'Keywords (comma separated)',
		'modal.monitor.keywordsPlaceholder': 'e.g., ukraine, zelensky, kyiv',
		'modal.monitor.keywordsHint': 'News matching any of these keywords will appear in your monitor',
		'modal.monitor.enabled': 'Enabled',
		'modal.monitor.delete': 'Delete',
		'modal.monitor.cancel': 'Cancel',
		'modal.monitor.save': 'Save Changes',
		'modal.monitor.createBtn': 'Create Monitor',
		'modal.monitor.errName': 'Name is required',
		'modal.monitor.errKeywords': 'At least one keyword is required',
		'modal.monitor.errMax': 'Maximum number of monitors reached (20)',

		'fed.noApiKey': 'Add VITE_FRED_API_KEY for economic indicators',
		'fed.speechesVideo': 'Speeches & Video',
		'fed.liveBroadcast': 'Live Broadcast',
		'fed.noNews': 'No Fed news available',
		'common.since': 'Since {year}',
		'common.noData': 'No data available',

		'situation.venezuela.title': 'Venezuela Watch',
		'situation.venezuela.subtitle': 'Humanitarian crisis monitoring',
		'situation.greenland.title': 'Greenland Watch',
		'situation.greenland.subtitle': 'Arctic geopolitics monitoring',
		'situation.iran.title': 'Iran Crisis',
		'situation.iran.subtitle': 'Revolution protests, regime instability & nuclear program'
	},
	zh: {
		'app.title': '态势监控台',
		'app.description': '实时全球新闻、市场与地缘事件监控面板',

		'header.lastUpdated': '最近更新：{time}',
		'header.neverRefreshed': '从未刷新',
		'header.refreshing': '刷新中…',
		'header.settings': '设置',
		'header.language': '语言',

		'panel.politics': '政治',
		'panel.tech': '科技',
		'panel.finance': '金融',
		'panel.gov': '政府',
		'panel.ai': 'AI',
		'panel.markets': '市场',
		'panel.heatmap': '板块热力图',
		'panel.commodities': '大宗商品',
		'panel.crypto': '加密',
		'panel.mainchar': '主角分析',
		'panel.correlation': '模式分析',
		'panel.narrative': '叙事追踪',
		'panel.intel': '情报流',
		'panel.fed': '美联储',
		'panel.leaders': '世界领导人',
		'panel.whales': '鲸鱼监控',
		'panel.polymarket': 'Polymarket',
		'panel.contracts': '政府合同',
		'panel.layoffs': '裁员追踪',
		'panel.printer': '印钞机',
		'panel.monitors': '自定义监控',

		'modal.settings.title': '设置',
		'modal.settings.enabledPanels': '启用面板',
		'modal.settings.enabledPanelsDesc': '开关面板来自定义你的仪表盘',
		'modal.settings.dashboard': '仪表盘',
		'modal.settings.reconfigure': '重新配置仪表盘',
		'modal.settings.reconfigureHint': '选择一个面板预设',
		'modal.settings.reset': '重置所有设置',

		'modal.onboarding.skip': '跳过引导',
		'modal.onboarding.welcome': '欢迎使用态势监控台',
		'modal.onboarding.subtitle': '选择一个仪表盘配置开始使用',
		'modal.onboarding.panelsCount': '{n} 个面板',
		'modal.onboarding.hint': '之后你可以在设置里修改',

		'modal.monitor.create': '创建监控',
		'modal.monitor.edit': '编辑监控',
		'modal.monitor.name': '名称',
		'modal.monitor.namePlaceholder': '例如：乌克兰危机',
		'modal.monitor.keywords': '关键词（逗号分隔）',
		'modal.monitor.keywordsPlaceholder': '例如：ukraine, zelensky, kyiv',
		'modal.monitor.keywordsHint': '匹配任意关键词的新闻会出现在你的监控里',
		'modal.monitor.enabled': '启用',
		'modal.monitor.delete': '删除',
		'modal.monitor.cancel': '取消',
		'modal.monitor.save': '保存修改',
		'modal.monitor.createBtn': '创建监控',
		'modal.monitor.errName': '名称不能为空',
		'modal.monitor.errKeywords': '至少需要一个关键词',
		'modal.monitor.errMax': '监控数量已达上限（20）',

		'fed.noApiKey': '添加 VITE_FRED_API_KEY 以展示经济指标',
		'fed.speechesVideo': '讲话与视频',
		'fed.liveBroadcast': '直播',
		'fed.noNews': '暂无美联储新闻',
		'common.since': '任职自 {year}',
		'common.noData': '暂无数据',

		'situation.venezuela.title': '委内瑞拉观察',
		'situation.venezuela.subtitle': '人道主义危机监控',
		'situation.greenland.title': '格陵兰观察',
		'situation.greenland.subtitle': '北极地缘政治监控',
		'situation.iran.title': '伊朗危机',
		'situation.iran.subtitle': '抗议、政权不稳与核计划监控'
	}
};

export function t(key: string, params?: Record<string, string | number>): string {
	let current: Lang = 'en';
	lang.subscribe((l) => (current = l))();

	let template = dict[current][key] ?? dict.en[key] ?? key;
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
