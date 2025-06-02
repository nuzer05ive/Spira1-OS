type Universe = {
  meta: {
    phiIndex: number;
    wobble: number;
  };
  description: string;
};
type Universes = Record<string, Universe>;

// TypeScript 5.5+: use `with { type: "json" }` for JSON imports
import universesJson from '../scrolls/universes.json' with { type: "json" };
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