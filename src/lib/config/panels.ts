/**
 * Panel configuration
 */

export interface PanelConfig {
	name: string;
	priority: 1 | 2 | 3;
}

export type PanelId =
	| 'map'
	| 'politics'
	| 'tech'
	| 'finance'
	| 'gov'
	| 'heatmap'
	| 'markets'
	| 'monitors'
	| 'commodities'
	| 'crypto'
	| 'polymarket'
	| 'whales'
	| 'mainchar'
	| 'printer'
	| 'contracts'
	| 'ai'
	| 'layoffs'
	| 'venezuela'
	| 'greenland'
	| 'iran'
	| 'leaders'
	| 'intel'
	| 'correlation'
	| 'narrative'
	| 'fed';

export const PANELS: Record<PanelId, PanelConfig> = {
	map: { name: 'panelConfig.map', priority: 1 },
	politics: { name: 'panelConfig.politics', priority: 1 },
	tech: { name: 'panelConfig.tech', priority: 1 },
	finance: { name: 'panelConfig.finance', priority: 1 },
	gov: { name: 'panelConfig.gov', priority: 2 },
	heatmap: { name: 'panelConfig.heatmap', priority: 1 },
	markets: { name: 'panelConfig.markets', priority: 1 },
	monitors: { name: 'panelConfig.monitors', priority: 1 },
	commodities: { name: 'panelConfig.commodities', priority: 2 },
	crypto: { name: 'panelConfig.crypto', priority: 2 },
	polymarket: { name: 'panelConfig.polymarket', priority: 2 },
	whales: { name: 'panelConfig.whales', priority: 3 },
	mainchar: { name: 'panelConfig.mainchar', priority: 2 },
	printer: { name: 'panelConfig.printer', priority: 2 },
	contracts: { name: 'panelConfig.contracts', priority: 3 },
	ai: { name: 'panelConfig.ai', priority: 3 },
	layoffs: { name: 'panelConfig.layoffs', priority: 3 },
	venezuela: { name: 'panelConfig.venezuela', priority: 2 },
	greenland: { name: 'panelConfig.greenland', priority: 2 },
	iran: { name: 'panelConfig.iran', priority: 2 },
	leaders: { name: 'panelConfig.leaders', priority: 1 },
	intel: { name: 'panelConfig.intel', priority: 2 },
	correlation: { name: 'panelConfig.correlation', priority: 1 },
	narrative: { name: 'panelConfig.narrative', priority: 1 },
	fed: { name: 'panelConfig.fed', priority: 1 }
};

export const NON_DRAGGABLE_PANELS: PanelId[] = ['map'];

export const MAP_ZOOM_MIN = 1;
export const MAP_ZOOM_MAX = 4;
export const MAP_ZOOM_STEP = 0.5;
