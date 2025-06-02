import { assertPhiCompliance } from './phiAssert.js';
import universes from '../scrolls/universes.json' assert { type: 'json' };
import { bus, emitDoorway } from './spiralTimeBus.js';

export function loadScrollUniverse(name: string){
  const u = universes[name];
  assertPhiCompliance(u); // ε₀ wobble + φ-index check
  emitDoorway(u.meta.petal ?? 0, u.meta.loops ?? 0);
  return u;
}

export async function loadVRScene(path:string){
  const sceneModule = await import(`../scrolls/scenes/${path}.ts`);
  return sceneModule.default;
}

// Additional helpers: loadJSON, loadMedia …