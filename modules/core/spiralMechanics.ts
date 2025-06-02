import { assertPhiCompliance } from './phiAssert.js';
import universes from '../scrolls/universes.json' assert { type: 'json' };
import { bus, emitDoorway } from './spiralTimeBus.js';

/**
 * Loads a scroll universe by name and checks phi compliance.
 */
export function loadScrollUniverse(name: string) {
  const u = universes[name];
  assertPhiCompliance(u); // ε₀ wobble + φ-index check
  emitDoorway(u.meta.petal ?? 0, u.meta.loops ?? 0);
  return u;
}

/** Dynamically loads a VR scene module. */
export async function loadVRScene(path: string) {
  const sceneModule = await import(`../scrolls/scenes/${path}.ts`);
  return sceneModule.default;
}

/** Loads a JSON file from scrolls/ folder. */
export async function loadJSON(filename: string) {
  // Import assertion required for JSON
  const json = await import(`../scrolls/${filename}.json`, { assert: { type: "json" } } as any);
  return json.default ?? json;
}

/** Loads a media asset from scrolls/media folder. */
export async function loadMedia(filename: string) {
  // Adjust path/logic as needed for your project
  return `../scrolls/media/${filename}`;
}

// If you have a CommandInput type, export it or define it in a types.ts file
export type CommandInput = {
  type: 'universe' | 'json' | 'media' | 'vr-scene',
  payload: string
};