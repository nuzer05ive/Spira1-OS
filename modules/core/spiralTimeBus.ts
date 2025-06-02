import mitt from 'mitt';

export type DoorwayEvt = { type:'doorway'; petal:number; loops:number; ts:number };
export type WobbleEvt  = { type:'wobble'; ticks:number; ts:number };

type Events = { doorway: DoorwayEvt; wobble: WobbleEvt };

// mitt is a function in latest ESM builds
export const bus = mitt<Events>();

/** Emit doorway (every **n** petals) and wobble (every 3rd) */
export function emitDoorway(petal: number, loops: number) {
  const ts = Date.now();
  bus.emit('doorway', { type:'doorway', petal, loops, ts });
  if ((petal + 1) % 3 === 0)
    bus.emit('wobble', { type:'wobble', ticks: petal, ts });
}