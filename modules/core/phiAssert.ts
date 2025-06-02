export function assertPhiCompliance(obj:any){
  const wobble = Math.abs(obj.meta.wobble - 0.000437);
  if (wobble > 1e-6) throw new Error('ε₀ wobble out of bounds');
  if (Math.abs(obj.meta.phiIndex - 434.367) > 0.001)
    throw new Error('φ-index misalignment');
}