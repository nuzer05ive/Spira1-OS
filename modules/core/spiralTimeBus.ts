import mittImport from 'mitt';

export type DoorwayEvt = { type:'doorway'; petal:number; loops:number; ts:number };
export type WobbleEvt  = { type:'wobble'; ticks:number; ts:number };

type Events = { doorway: DoorwayEvt; wobble: WobbleEvt };

// Compatibility for ESM/CJS mitt
const mitt = (mittImport as any).default || mittImport;
export const bus = mitt<Events>();

/** Emit doorway (every **n** petals) and wobble (every 3rd) */
export function emitDoorway(petal: number, loops: number){
  const ts = Date.now();
  bus.emit('doorway', { type:'doorway', petal, loops, ts });
  if ((petal + 1) % 3 === 0)
    bus.emit('wobble', { type:'wobble', ticks: petal, ts });
}