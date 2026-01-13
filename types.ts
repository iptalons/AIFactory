export interface DayPlan {
  id: number;
  range: string;
  title: string;
  activities: string[];
}

export interface Phase {
  id: number;
  title: string;
  sinhalaTitle: string;
  description: string;
  days: DayPlan[];
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  CURRICULUM = 'curriculum',
  AI_TOOLS = 'ai_tools',
  RESOURCES = 'resources',
  SETTINGS = 'settings'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}