import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type ObsidianTabColoursTestPlugin from "./main";
import { FEATURES } from "./main";

export class SettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private readonly plugin: Plugin,
  ) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("p", {
      text: "A fork of a Claude-assisted repository that attempted to add colours to tabs (among other things which are out of scope of this project) in Obsidian MD.",
    });

    for (const feature of FEATURES) {
      const setting = new Setting(containerEl).setName(feature.name).setDesc(feature.description);

      setting.addToggle((toggle) =>
        toggle.setValue(this.plugin.isFeatureEnabled(feature.id)).onChange(async (value) => {
          await this.plugin.setFeatureEnabled(feature.id, value);
          new Notice(`${feature.name}: ${value ? "enabled" : "disabled"}. Reload plugin to apply.`);
        }),
      );

    new Setting(containerEl)
      .setName("Apply changes")
      .setDesc("Reloads the plugin so enable/disable toggles take effect.")
      .addButton((btn) =>
        btn.setButtonText("Reload plugin").setCta().onClick(async () => {
          await this.plugin.reloadSelf();
        }),
      );
  }
}
