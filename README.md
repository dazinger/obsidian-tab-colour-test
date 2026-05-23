# Obsidian Tab Colour Test

> This may allow colours on tabs, but probably not.

A fork of a Claude-assisted repository that attempted to add colours to tabs (among other things which are out of scope of this project) in Obsidian MD.

I am aware that renaming is already a feature; I will remove that from this project at some point.

## Features

| Feature | What it does |
|---|---|
| **Tab rename & colors** | Right-click any tab to rename it or pick a color. |

## Installation

**Community store** (which will likely never get published): search "Obsidian Tab Colour Test".

**Via BRAT** (recommended until it's in the community store):
1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) from the community store and enable it.
2. Open the command palette and run **BRAT: Add a beta plugin for testing**.
3. Paste the repo URL: `https://github.com/dazinger/obsidian-tab-colour-test`
4. Choose the latest version (or leave blank for latest release) and click **Add Plugin**.
5. Go to **Settings → Community plugins** and enable **Obsidian Tab Colour Test**.

BRAT will auto-update the plugin whenever a new release is published.

**Manual (one-liner):** from your vault root, run:

```bash
mkdir -p .obsidian/plugins/obsidian-tab-colour-test && cd $_ && \
  for f in main.js manifest.json styles.css; do \
    curl -LO https://github.com/dazinger/obsidian-tab-colour-test/releases/latest/download/$f; \
  done
```

Then in Obsidian, **Settings → Community plugins**, hit the reload icon, and enable **Obsidian Tab Colour Test**.

**Manual (clone + build):** if you'd rather build from source:

```bash
git clone https://github.com/dazinger/obsidian-tab-colour-test \
  /path/to/vault/.obsidian/plugins/obsidian-tab-colour-test
cd /path/to/vault/.obsidian/plugins/obsidian-tab-colour-test
pnpm install && pnpm build
```

## Development

```bash
pnpm installh
pnpm dev      # watch build into ./main.js
pnpm build    # type-check + minified production build
```

Symlink the repo into your test vault's `.obsidian/plugins/` to test live:

```bash
ln -s "$PWD" /path/to/vault/.obsidian/plugins/obsidian-tab-colour-test
```

## License

MIT
