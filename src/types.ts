import type Plugin from "./main";

export interface Feature {
  id: string;
  name: string;
  description: string;
  load: (plugin: Plugin) => void;
  unload: (plugin: Plugin) => void;
}

export interface Settings {
  enabled: Record<string, boolean>;
  customTitles: Record<string, string>;
  tabColors: Record<string, string>;
}

export const DEFAULT_SETTINGS: Settings = {
  enabled: {},
  customTitles: {},
  tabColors: {},
};
