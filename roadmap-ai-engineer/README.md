# AI Engineer Roadmap — Local Clone

A local, offline-friendly clone of the [roadmap.sh AI Engineer page](https://roadmap.sh/ai-engineer), built with React, Vite, Tailwind CSS, and React Flow.

Roadmap content is bundled from the official open-source [developer-roadmap](https://github.com/kamranahmedse/developer-roadmap) project.

## Features

- Interactive roadmap canvas (pan, zoom, minimap, fit view, fullscreen)
- Clickable topic/subtopic nodes with detail panel
- Local progress tracking (checkbox saved in browser `localStorage`)
- Roadmap, Projects, and AI Tutor tabs
- FAQ accordion and community section
- Dark theme matching roadmap.sh

## Requirements

- Node.js 18+
- npm

## Run locally

```bash
cd roadmap-ai-engineer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Controls

| Action | How |
|--------|-----|
| Pan | Click and drag the canvas |
| Zoom | Scroll wheel or control buttons |
| Fit view | Control button (reset icon) |
| Fullscreen | Control button (maximize icon) |
| Node details | Click a topic or subtopic box |
| Mark progress | Checkbox in the detail panel |
| Tabs | Roadmap / Projects / AI Tutor in the tab bar |

## Limitations

This is a local learning clone, not the full roadmap.sh platform:

- **Personalize** — UI only; no account sync
- **AI Tutor** — placeholder; no LLM backend
- **Projects** — static sample cards
- **Topic pages** — slide-over panel instead of full topic URLs

## License note

Roadmap content belongs to the roadmap.sh community. This project credits the original source and is intended for personal/local use.
