# KitchenAI

Cook from what you already have. Scan your fridge, freezer and pantry with your phone camera, get recipes ranked by how much of each one you already own, and build a shopping list that automatically includes the staples you've run out of.

## Features

- **Scan** — live camera viewfinder per kitchen zone (Fridge / Freezer / Pantry). A scan is the source of truth for the zone it covered, so items no longer seen are dropped from that zone.
- **Review** — confirm, remove or manually add anything the scan missed before it hits your kitchen inventory.
- **Recipes** — every recipe scored by ingredient match against your inventory, with search and cuisine / meal type / max time filters.
- **Recipe detail & cook mode** — have/need breakdown, one tap to add missing ingredients to the shopping list, and step-by-step cook mode with per-step timers.
- **Shopping list** — grouped by category, with "You may need" suggestions for your regulars. After each scan, regulars that weren't detected are added automatically (toggleable via *Predict items running low* in Profile).
- **Profile** — household size, prep time, cuisines, smart-inventory toggles, saved recipes, my kitchen, cooking history.

State is persisted locally through `src/storage.js` (localStorage), consumed by the `usePersistentState` hook. Swapping in a backend means replacing that one module.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build
```

Camera access requires `localhost` or HTTPS. Without a camera the scan screen falls back to a demo scan.

## Detection

Ingredient detection is currently mocked (`MOCK_DETECTED` in `src/data.js`) — the camera preview is real, the recognition is not yet wired to a vision model. The scan flow returns a list of `{ name, emoji, confidence, qty, category }` items, so a real model can be dropped in behind the same shape.
