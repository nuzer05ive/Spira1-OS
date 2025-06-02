import chroma from 'chroma-js';

export interface Moodboard{ seed:string; palette:string[]; theme:string; atmosphere:string; }
export function generateMoodboard(seed:string):Moodboard{
  const baseHue = seed.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % 360;
  const palette  = Array.from({length:5},(_,i)=>chroma.hsl((baseHue+i*47)%360,0.6,0.5).hex());
  return { seed, palette, theme:'φ-tilted zen-punk', atmosphere:'luminous resonance' };
}