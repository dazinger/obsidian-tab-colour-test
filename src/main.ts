import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, type Feature, type Settings } from "./types";
import { findConflictingPlugin, warnConflict } from "./conflicts";
import { SettingTab } from "./settings";
import { tabColorsRename } from "./features/tabColorsRename";

export const FEATURES: Feature[] = [
  tabColorsRename
];

export default class ObsidianTabColourTestPlugin extends Plugin {
  settings!: Settings;
  private loadedFeatures: Feature[] = [];

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => this.loadFeatures());
  }

  onunload() {
    this.unloadFeatures();
  }

  private loadFeatures(): void {
    for (const feature of FEATURES) {
      if (!this.isFeatureEnabled(feature.id)) continue;
      feature.load(this);
      this.loadedFeatures.push(feature);
    }
  }

  private unloadFeatures(): void {
    for (const feature of this.loadedFeatures) feature.unload(this);
    this.loadedFeatures = [];
  }

  isFeatureEnabled(id: string): boolean {
    return this.settings.enabled[id] ?? true;
  }

  async setFeatureEnabled(id: string, enabled: boolean): Promise<void> {
    this.settings.enabled[id] = enabled;
    await this.saveSettings();
  }

  async reloadSelf(): Promise<void> {
    const manifestId = this.manifest.id;
    const appPlugins = (this.app as unknown as {
      plugins: { disablePlugin(id: string): Promise<void>; enablePlugin(id: string): Promise<void> };
    }).plugins;
    await appPlugins.disablePlugin(manifestId);
    await appPlugins.enablePlugin(manifestId);
  }

  async loadSettings(): Promise<void> {
    const raw = (await this.loadData()) as Partial<Settings> | null;
    this.settings = { ...DEFAULT_SETTINGS, ...(raw ?? {}) };
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
