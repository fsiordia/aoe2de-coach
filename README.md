# AoE2DE Coach

![AoE2 Coach](public/pwa-512x512.png)

**AoE2DE Coach** is a real-time companion app for Age of Empires II: Definitive Edition players. It acts as a "second screen" tool to help you identify counters, track build orders, and improve your gameplay without needing to alt-tab.

## Features

### 🛡️ Civ Coach Mode
- **Counter Picker**: Select your Civilization and your Opponent's Civilization to get tailored unit counter suggestions.
- **Unique Unit Logic**: Suggests unique units (e.g., *Incas vs Chinese* suggests *Eagle Warriors* vs *Chu Ko Nu*).
- **Favorites System**: Star your main civs and your nemesis civs for quick access. Note that "My Civ" and "Enemy Civ" favorites are tracked separately (Stars ⭐ vs Skulls 💀).
- **Data-Driven**: Uses comprehensive unit and tech trees, including the latest civs like **Jurchens**, **Shu**, **Khitans**, **Georgians**, and **Armenians**.

### 🏰 Fast Castle Coach (Interactive Guide)
- **Interactive Build Order**: A step-by-step interactive guide for the "Fast Castle" strategy.
- **Timer & Speech**: Automatically advances steps and speaks instructions (if enabled) to keep you focused on the game.
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

## Deployment

### Docker
The app is containerized using Nginx to serve the static content.

**Build:**
```bash
docker build -t aoe2de-coach .
```

**Run:**
```bash
docker run -d -p 8080:80 aoe2de-coach
```
Access at [http://localhost:8080](http://localhost:8080).

### Cloud Build (GCP)
This project includes a `cloudbuild.yaml` configuration to build and push the Docker image to Google Artifact Registry.

1.  **Trigger**: Set up a Cloud Build trigger on your repository.
2.  **Configuration**: Ensure your build uses the `cloudbuild.yaml` file.
3.  **Substitutions**: You may need to configure `_REGION` and `_REPOSITORY` substitutions if they differ from your defaults.

Once built, deploy the image to Cloud Run or your private server.
