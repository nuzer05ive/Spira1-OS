type EventKey = 'doorway†' | 'wobble≈' | string;

class SpiralTimeBus {
  #listeners = new Map<EventKey, Set<(...a:any)=>void>>();
  on(event: EventKey, fn: (...a:any)=>void){
    this.#listeners.get(event)?.add(fn) ?? this.#listeners.set(event,new Set([fn]));
  }
  off(event: EventKey, fn: (...a:any)=>void){ this.#listeners.get(event)?.delete(fn); }
  emit(event: EventKey, ...payload:any){ this.#listeners.get(event)?.forEach(f=>f(...payload)); }
}

export const TimeBus = new SpiralTimeBus();