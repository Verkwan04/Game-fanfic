export interface Attributes {
  creativity: number; // 创作力
  legal: number;      // 法律意识
  eq: number;         // 情商
  popularity: number; // 知名度
  stress: number;     // 压力
  money: number;      // 金钱
  trust: number;      // 信任/社交 (New: Tracks depth of relationships in fandom)
}

export interface Choice {
  text: string;
  nextEventId: string;
  effects?: Partial<Attributes>; // Changes to apply
  condition?: (stats: Attributes) => boolean; // Requirement to see this choice
  description?: string; // Hint about what this does
}

export interface GameEvent {
  id: string;
  text: string;
  choices: Choice[];
  imagePrompt?: string; // For potential AI image gen
  isEnding?: boolean;
  endingTitle?: string;
  poem?: string; // Pre-written poem for instant display
}

export interface FateCard {
  id: string;
  title: string;
  poem: string;
  imageUrl: string;
  timestamp: number;
}

export interface GameState {
  currentEventId: string;
  attributes: Attributes;
  history: string[]; // List of event IDs visited
  isGameOver: boolean;
  generatedComments: string | null; // For AI generated flavor text
  isLoadingAI: boolean;
  activeFateCard: FateCard | null; // The card currently being shown at ending
}