type Universe = {
  meta: {
    phiIndex: number;
    wobble: number;
  };
  description: string;
};
type Universes = Record<string, Universe>;

// Correct JSON import for NodeNext ESM
import universesJson from '../scrolls/universes.json' assert { type: "json" };
const universes = universesJson as Universes;

export interface CommandInput {
  type: 'universe' | 'json' | 'media' | 'vr-scene';
  payload: any;
}

export function loadScrollUniverse(payload: string) {
  return universes[payload] || null;
}

export function loadJSON(payload: any) {
  return payload;
}

export function loadMedia(payload: any) {
  return { status: 'media loaded', payload };
}

export function loadVRScene(payload: any) {
  return { status: 'vr scene loaded', payload };
}