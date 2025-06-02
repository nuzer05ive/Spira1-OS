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