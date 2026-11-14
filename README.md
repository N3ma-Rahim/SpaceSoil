# SpaceSoil

*A new perspective on the ground beneath us.* By **Plot Twist**, NASA Space Apps 2026, challenge "Field Shift: Adapting Farms with NASA Data".

SpaceSoil is an agricultural decision-support prototype: farm onboarding and profile, dashboard, a playable Phaser 3 farming simulation, strategy comparison, a climate-based demo community, missions, Science & Data, and a four-chapter interactive story ("Spot the plot twist before it happens.").

## Run locally (Windows, macOS, Linux)

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173). Other commands:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build
```

No API keys or environment variables are needed (see `.env.example`).

## Project structure

```
index.html              HTML shell (app pages + game container)
src/main.js             Loads Phaser from npm and runs the files in src/legacy/
src/styles.css          All styles (app shell, story, game HUD)
src/legacy/
  01-data.js              Crops, weather, missions, constants
  02-state.js             Game state, localStorage persistence, growth stages
  03-simulation.js        Daily simulation step, time advance, mission check
  04-actions.js           Plant / water / harvest actions and particle effects
  05-hud.js               Farm advisor, game HUD, inventory, modals
  06-crop-sprites.js      Procedural crop drawing (5 crops x 5 stages)
  07-phaser-scene.js      Phaser game, farm world, weather overlays
  08-app-state.js         Farm profile and community stores (localStorage)
  09-reference-data.js    Demo locations, climate groups, demo community posts
  10-farm-and-strategy.js Climate profile, profile-based farm, strategy comparison engine
  11-shell-onboarding.js  App shell, navigation, onboarding, community actions
  12-pages.js             Dashboard, My Farm, Strategies, Community, Missions, Science, Settings
  13-story.js             Story scenes, story cards, "Choose Your Ending", Our Story page
  14-boot.js              Click delegation and app start
```

## Architecture and limitations (please read)

- **This is a migration of a single-file prototype, not a React/TypeScript app.** The original specification asked for React + TypeScript + Vite + Phaser. The working prototype was built as one HTML file with plain JavaScript and DOM-rendered pages. It was split into feature files and wrapped in a Vite project **without changing behaviour**.
- The files in `src/legacy/` share one global scope (they are concatenated in numeric order and run as one script) and the generated HTML uses inline `onclick` handlers. Do not reorder or rename the numbered files without updating the order. Phaser comes from npm (`phaser@3.80.1`) instead of a CDN.
- Suggested next steps: convert files to ES modules with explicit exports, replace inline handlers with event listeners, then port pages to React and the state to TypeScript types.
- **Data honesty:** no NASA APIs and no map service are connected. Regional temperatures are demo values, all crop/soil numbers are simulated, and the community is a local demo (sample posts are not real farmers; likes, comments and posts stay in your browser). The farm profile and the experimental game state are stored separately in `localStorage` (`ss_profile`, `spacesoil`, `ss_comm`).
- Strategy comparison and scores are transparent prototype calculations, not agricultural predictions.
- Not yet implemented: real map and boundary drawing, live NASA data, accounts/backend, dark theme for the app pages, touch drag-and-drop for seeds (tapping works).
