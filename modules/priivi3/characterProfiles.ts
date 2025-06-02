export interface CharacterProfile{
  name:string; personality:string; avatar:string; transformations:string[];
}

export function generateCharacterProfiles(seed:string):CharacterProfile[]{
  return ['Alpha','Beta','Gamma'].map(suffix=>({
    name:`${seed}-${suffix}`,
    personality:'Adaptive • Empathic • Harmonic',
    avatar:`/assets/avatars/${suffix}.glb`,
    transformations:['base','ascend','prime']
  }));
}