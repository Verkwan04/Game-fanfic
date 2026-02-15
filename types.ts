export interface Attributes {
  creativity: number; // 创作力
  legal: number;      // 法律意识
  eq: number;         // 情商
  popularity: number; // 知名度
  stress: number;     // 压力
  money: number;      // 金钱
  trust: number;      // 信任/社交
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
  isEnding?: boolean;
  endingTitle?: string;
  poem?: string; // Pre-written poem for instant display
  fixedComments?: string[]; // Pre-written comments instead of AI
}

export interface FateCard {
  id: string;
  title: string;
  poem: string;
  timestamp: number;
}

/** 世界类型：二次元=同人创作圈，三次元=追星/偶像圈 */
export type WorldType = '2d' | '3d';

export interface GameState {
  currentEventId: string;
  attributes: Attributes;
  history: string[]; // List of event IDs visited
  isGameOver: boolean;
  activeFateCard: FateCard | null; // The card currently being shown at ending
  /** 开局选择的世界，决定后续事件分支 */
  worldType?: WorldType;
}