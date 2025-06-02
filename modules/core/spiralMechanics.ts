import { assertPhiCompliance } from './phiAssert.js';
import universes from '../scrolls/universes.json' assert { type: 'json' };
import { bus, emitDoorway } from './spiralTimeBus.js';

export function loadScrollUniverse(name: string) {
  const u = universes[name];
  assertPhiCompliance(u); // ε₀ wobble + φ-index check
  emitDoorway(u.meta.petal ?? 0, u.meta.loops ?? 0);
  return u;
}

export async function loadVRScene(path: string) {
  const sceneModule = await import(`../scrolls/scenes/${path}.ts`);
  return sceneModule.default;
}

export async function loadJSON(filename: string) {
  // This will work with NodeNext module resolution and resolveJsonModule enabled
  const json = await import(`../scrolls/${filename}.json`, { assert: { type: "json" } } as any);
  return json.default ?? json;
}

export async function loadMedia(filename: string) {
  return `../scrolls/media/${filename}`;
}

export type CommandInput = {
  type: 'universe' | 'json' | 'media' | 'vr-scene',
  payload: string
};