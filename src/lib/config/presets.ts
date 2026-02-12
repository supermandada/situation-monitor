/**
 * Onboarding presets for first-time users
 */

import type { PanelId } from './panels';

export interface Preset {
	id: string;
	name: string;
	icon: string;
	description: string;
	panels: PanelId[];
}

export const PRESETS: Record<string, Preset> = {
	'news-junkie': {
		id: 'news-junkie',
		name: 'preset.newsJunkie.name',
		icon: '📰',
		description: 'preset.newsJunkie.desc',
		panels: ['politics', 'tech', 'finance', 'gov', 'ai', 'mainchar', 'map']
	},
	trader: {
		id: 'trader',
		name: 'preset.trader.name',
		icon: '📈',
		description: 'preset.trader.desc',
		panels: [
			'markets',
			'heatmap',
			'commodities',
			'crypto',
			'polymarket',
			'whales',
			'printer',
			'finance',
			'map'
		]
	},
	geopolitics: {
		id: 'geopolitics',
		name: 'preset.geopolitics.name',
		icon: '🌍',
		description: 'preset.geopolitics.desc',
		panels: [
			'map',
			'intel',
			'leaders',
			'politics',
			'gov',
			'venezuela',
			'greenland',
			'iran',
			'correlation',
			'narrative'
		]
	},
	intel: {
		id: 'intel',
		name: 'preset.intel.name',
		icon: '🔍',
		description: 'preset.intel.desc',
		panels: ['map', 'intel', 'leaders', 'correlation', 'narrative', 'mainchar', 'politics']
	},
	minimal: {
		id: 'minimal',
		name: 'preset.minimal.name',
		icon: '⚡',
		description: 'preset.minimal.desc',
		panels: ['map', 'politics', 'markets']
	},
	everything: {
		id: 'everything',
		name: 'preset.everything.name',
		icon: '🎛️',
		description: 'preset.everything.desc',
		panels: [
			'map',
			'politics',
			'tech',
			'finance',
			'gov',
			'heatmap',
			'markets',
			'monitors',
			'commodities',
			'crypto',
			'polymarket',
			'whales',
			'mainchar',
			'printer',
			'contracts',
			'ai',
			'layoffs',
			'venezuela',
			'greenland',
			'iran',
			'leaders',
			'intel',
			'correlation',
			'narrative'
		]
	}
};

export const PRESET_ORDER = [
	'news-junkie',
	'trader',
	'geopolitics',
	'intel',
	'minimal',
	'everything'
];

// Storage keys
export const ONBOARDING_STORAGE_KEY = 'onboardingComplete';
export const PRESET_STORAGE_KEY = 'selectedPreset';
