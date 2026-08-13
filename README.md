# AoE2DE Coach

![AoE2 Coach](public/pwa-512x512.png)

**AoE2DE Coach** is a real-time companion app for Age of Empires II: Definitive Edition players. It acts as a "second screen" tool to help you identify counters, follow build orders, and improve your gameplay without needing to alt-tab.

## Features

### 🛡️ Civ Coach Mode
- **Counter Picker**: Select your Civilization and your Opponent's Civilization to get tailored unit counter suggestions.
- **Key Threats by Archetype**: Enemy threats are derived from structured civ archetypes (cavalry, archers, monks, siege, elephants, eagles, gunpowder, camels...), not just unique units.
- **Strategy Notes**: Every unit includes a composition tip (e.g. how to actually deal with Rams or Paladins), not just a unit-vs-unit list.
- **Unique Unit Logic**: Suggests unique units (e.g. *Incas vs Chinese* suggests *Eagle Warriors* vs *Chu Ko Nu*).
- **Build Order Recommender**: Based on your civ and the enemy civ, the app suggests the best game plan (Scout Rush, Archer Rush, Fast Castle...) with the reasons why, and jumps straight into the interactive guide.
- **Favorites System**: Star your main civs and your nemesis civs for quick access. "My Civ" and "Enemy Civ" favorites are tracked separately (Stars ⭐ vs Skulls 💀).
- **Data-Driven**: Uses comprehensive unit and tech trees, including the latest civs like **Jurchens**, **Shu**, **Khitans**, **Georgians**, and **Armenians**.

### 🏰 Interactive Build Order Coach
- **Five Build Orders**: Standard Fast Castle, Baidot Fast Castle, Scout Rush (21 pop), Archer Rush (22 pop) and Drush → Fast Castle.
- **Step-by-Step Guide**: Advance steps with a tap or the Space bar while the timer tracks your pace.
- **Villager Tracker**: Visual cues for where to assign your villagers (Wood, Food, Gold, Stone) at every step.
- **Adaptive Layout**: Optimized for PC (Vertical) and Mobile (Landscape side-by-side or Portrait).

### 📱 Progressive Web App (PWA)
- **Installable**: Install this app on your phone or desktop for an app-like experience.
- **Offline First**: Works completely offline once loaded.
- **Offline Updates**: Use the "Check for Updates" button to fetch the latest data from the server and save it to your device's storage, ensuring you're always up to date even without a full app update.

## Tech Stack
- **Frontend**: React, Vite
- **Styling**: TailwindCSS
- **State Management**: React Hooks & LocalStorage
- **Testing**: Vitest
- **Deployment**: Docker, Nginx

## Running Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/aoe2de-coach.git
    cd aoe2de-coach
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing & Data Validation

```bash
npm test              # Vitest: game logic + data integrity tests
npm run validate-data # Structural validation of civs.json / units.json
```

The test suite covers the counter engine (`findCounters`), the threat detector (`getKeyThreats`), the build order recommender, and the integrity of the bundled JSON data (no broken unit references, upgrade chains, or missing images).

## Data Maintenance

- `src/data/units.json` and `src/data/civs.json` are the source of truth. **Keep `public/data/*.json` in sync** (the "Check for Updates" button serves those copies to installed PWAs).
- `scripts/scrape-wiki.js` can enrich unit data from the AoE wiki (counters, images, links).
- Unit icons in `public/images/units/` come from the game via the [aoe2techtree](https://github.com/SiegeEngineers/aoe2techtree) project.

## Deployment

### Docker
The app is containerized using Nginx (listening on port 8080) to serve the static content.

**Build:**
```bash
docker build -t aoe2de-coach .
```

**Run:**
```bash
docker run -d -p 8080:8080 aoe2de-coach
```
Access at [http://localhost:8080](http://localhost:8080).

### Cloud Build (GCP)
This project includes a `cloudbuild.yaml` configuration to build and push the Docker image to Google Artifact Registry, and deploy it to Cloud Run.

1.  **Trigger**: Set up a Cloud Build trigger on your repository.
2.  **Configuration**: Ensure your build uses the `cloudbuild.yaml` file.
3.  **Substitutions**: You may need to configure `_REGION` and `_REPOSITORY` substitutions if they differ from your defaults.

---
Age of Empires II DE © Microsoft Corporation. AoE2DE Coach was created under Microsoft's Game Content Usage Rules.
