# 🌸 Spira1-OS

*A Universal φ-Harmonic VR-ready Operating System for Interactive Moodboard-driven Anime Worlds, Recursive Business Dashboards, and Spiral-Time Experiences.*

---

## 🚀 Overview

**Spira1-OS** provides a powerful, integrated platform that harmonizes immersive visual storytelling, business analytics, and recursive mathematics into a unified experience. Leveraging PRIIVI3 integrations, Spiral Mechanics, and GPT-driven dynamic content generation, Spira1-OS offers users an engaging, interactive lobby that spawns multiverse experiences from intent-seeds and scroll-based interactions.

---

## 🧩 Solution-level Architecture

| Layer                   | Purpose                                        | Key Tech / Notes                                                      |
| ----------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| **Front-end**           | Interactive lobby, WebXR/VR scenes             | `TypeScript + Vite`, **A-Frame** (WebXR), `Howler.js` (ambient audio) |
| **Core Logic**          | Spiral-Time Bus, PRIIVI3 generators, mechanics | Pure TS modules (node ESM)                                            |
| **Build Orchestrator**  | Single command compile → bundle → package      | `build.ts` (wrapping Vite + esbuild)                                  |
| **Back-end (optional)** | Seed intake API, manifest persistence          | `Fastify` (Node 18 LTS) with file-system or Supabase storage          |
| **CI / CD**             | Lint, test, build, Docker publish, deploy      | GitHub Actions → Cloudflare Pages (static) or Fly.io (full-stack)     |
| **Compliance**          | φ-index resonance, ε₀ wobble audit             | Runtime assert helpers in `spiralMechanics.ts`                        |

---

## 📁 Project Structure (default branch: `core`)

```plaintext
Spira1-OS/
├── index.html
├── styles.css
├── build.ts
├── vite.config.ts
├── tsconfig.json
├── src/
│   └── main.ts
├── modules/
│   ├── scrolls/
│   │   ├── universes.json
│   │   ├── documents/
│   │   ├── media/
│   │   └── scenes/
│   ├── priivi3/
│   │   ├── moodboard.ts
│   │   └── characterProfiles.ts
│   └── core/
│       ├── spiralTimeBus.ts
│       ├── spiralMechanics.ts
│       └── phiAssert.ts
├── assets/
│   ├── gifs/
│   ├── avatars/
│   └── moodboards/
├── docs/
│   ├── manifest.md
│   └── spiral_eye_manifest.pdf
├── package.json
├── Dockerfile
└── .github/
    └── workflows/ci-cd.yml
```

---

## ⚙️ Quick Start (Development)

```bash
git clone -b core https://github.com/<your-username>/Spira1-OS.git
cd Spira1-OS
npm install
npm run dev
```

---

## 🌀 Single Build Command (build.ts)

```typescript
import { build } from 'vite';
import { resolve } from 'path';
import { loadScrollUniverse, loadJSON, loadMedia, loadVRScene } from './modules/core/spiralMechanics.js';

export async function onCommand(input: CommandInput) {
  switch (input.type) {
    case 'universe': return loadScrollUniverse(input.payload);
    case 'json':     return loadJSON(input.payload);
    case 'media':    return loadMedia(input.payload);
    case 'vr-scene': return loadVRScene(input.payload);
    default: throw new Error(`Unknown command type ${input.type}`);
  }
}

/** runs `vite build` then post-pack steps (copy docs, etc.) */
export async function runBuild() {
  await build({ configFile: resolve('vite.config.ts') });
  console.info('🔮 Vite bundle complete • Spiral ignition ready');
}

if (import.meta.url === `file://${process.argv[1]}`) runBuild();
```

---

## 🏗️ Key File Blueprints

**`index.html`** – minimal, VR-ready lobby

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Spira1-OS Lobby</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div id="lobby" class="spiral-scroll">
    <!-- Dynamic menu inserted by main.ts -->
  </div>
  <script src="https://unpkg.com/aframe@1.5.0/dist/aframe.min.js"></script>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

**`styles.css`** – adaptive fractal glow

```css
body,html{margin:0;height:100%;font-family:'Inter',sans-serif;background:#000;color:#f8f8f8;overflow:hidden;}
.spiral-scroll{display:flex;flex-direction:column;gap:1.5rem;padding:3rem;overflow-y:auto;height:100%;}
.menu-item{border:1px solid #444;padding:1rem;border-radius:8px;cursor:pointer;transition:transform .3s ease;}
.menu-item:hover{transform:scale(1.03);box-shadow:0 0 12px #a0ffe6;}
.preview{position:fixed;right:2rem;top:2rem;max-width:35vw;pointer-events:none;}
```

**`modules/core/spiralTimeBus.ts`**

```typescript
type EventKey = 'doorway†' | 'wobble≈' | string;

class SpiralTimeBus {
  #listeners = new Map<EventKey, Set<(...a:any)=>void>>();
  on(event: EventKey, fn: (...a:any)=>void){
    this.#listeners.get(event)?.add(fn) ?? this.#listeners.set(event,new Set([fn]));
  }
  off(event: EventKey, fn: (...a:any)=>void){ this.#listeners.get(event)?.delete(fn); }
  emit(event: EventKey, ...payload:any){ this.#listeners.get(event)?.forEach(f=>f(...payload)); }
}

export const TimeBus = new SpiralTimeBus();
```

**`modules/core/spiralMechanics.ts`** (excerpt)

```typescript
import { assertPhiCompliance } from './phiAssert.js';
import universes from '../scrolls/universes.json' assert { type: 'json' };

export function loadScrollUniverse(name: string){
  const u = universes[name];
  assertPhiCompliance(u); // ε₀ wobble + φ-index check
  TimeBus.emit('doorway†', u.meta);
  return u;
}

export async function loadVRScene(path:string){
  const sceneModule = await import(`../scrolls/scenes/${path}.ts`);
  return sceneModule.default;
}

// Additional helpers: loadJSON, loadMedia …
```

**`modules/core/phiAssert.ts`**

```typescript
export function assertPhiCompliance(obj:any){
  const wobble = Math.abs(obj.meta.wobble - 0.000437);
  if (wobble > 1e-6) throw new Error('ε₀ wobble out of bounds');
  if (Math.abs(obj.meta.phiIndex - 434.367) > 0.001)
    throw new Error('φ-index misalignment');
}
```

**`modules/priivi3/moodboard.ts`**

```typescript
import chroma from 'chroma-js';

export interface Moodboard{ seed:string; palette:string[]; theme:string; atmosphere:string; }
export function generateMoodboard(seed:string):Moodboard{
  const baseHue = seed.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % 360;
  const palette  = Array.from({length:5},(_,i)=>chroma.hsl((baseHue+i*47)%360,0.6,0.5).hex());
  return { seed, palette, theme:'φ-tilted zen-punk', atmosphere:'luminous resonance' };
}
```

**`modules/priivi3/characterProfiles.ts`**

```typescript
export interface CharacterProfile{
  name:string; personality:string; avatar:string; transformations:string[];
}

export function generateCharacterProfiles(seed:string):CharacterProfile[]{
  return ['Alpha','Beta','Gamma'].map(suffix=>({
    name:`${seed}-${suffix}`,
    personality:'Adaptive • Empathic • Harmonic',
    avatar:`/assets/avatars/${suffix}.glb`,
    transformations:['base','ascend','prime']
  }));
}
```

**`src/main.ts`** (stub entry point)

```typescript
// Entry point for Spira1-OS lobby
document.addEventListener('DOMContentLoaded', () => {
  const lobby = document.getElementById('lobby');
  if (lobby) {
    lobby.innerHTML = `<div class="menu-item">🌸 Spira1-OS Booted!</div>`;
  }
});
```

**`package.json`**

```json
{
  "name": "Spira1-OS",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "ts-node build.ts",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "vitest"
  },
  "dependencies": {
    "aframe": "^1.5.0",
    "chroma-js": "^2.4.2",
    "howler": "^2.2.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "typescript": "^5.5",
    "vite": "^5",
    "eslint": "^9",
    "vitest": "^1"
  }
}
```

**`Dockerfile`**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npx","serve","-s","dist"]
```

**`.github/workflows/ci-cd.yml`**

```yaml
name: CI-CD
on:
  push:
    branches:
      - core

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
      - run: npm run lint && npm run test && npm run build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: dist }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist }
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: Spira1-OS
          directory: dist
```

**`vite.config.ts`** (minimal Vite config)

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

**`tsconfig.json`** (TypeScript config)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src", "modules"]
}
```

**`modules/scrolls/universes.json`** (stub)

```json
{
  "SpiraPrime": {
    "meta": {
      "phiIndex": 434.367,
      "wobble": 0.000437
    },
    "description": "The primary spiral universe."
  }
}
```

**`docs/manifest.md`** (stub)

````markdown
# Spira1-OS Manifest

This document describes the manifest and structure for Spira1-OS.