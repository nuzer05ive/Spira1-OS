import universes from '../scrolls/universes.json';

export interface CommandInput {
  type: 'universe' | 'json' | 'media' | 'vr-scene';
  payload: any;
}

export function loadScrollUniverse(payload: any) {
  // Return the requested universe, or null if not found
  return universes[payload] || null;
}

export function loadJSON(payload: any) {
  // Just returns the provided payload
  return payload;
}

export function loadMedia(payload: any) {
  // Placeholder for media loading logic
  return { status: 'media loaded', payload };
}

export function loadVRScene(payload: any) {
  // Placeholder for VR scene logic
  return { status: 'vr scene loaded', payload };
}