import 'aframe'; // Ensure aframe is installed

const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio

function spiralPetalPositions(count: number) {
  const petals: string[] = [];
  for (let i = 0; i < count; i++) {
    // Example spiral math: golden angle
    const angle = i * (2 * Math.PI / PHI); // φ-spiral increment
    const radius = 3 + 0.2 * i;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle) - 4;
    const color = `hsl(${(i * 360 / count)}, 70%, 60%)`;
    petals.push(`<a-sphere position="${x.toFixed(2)} 1 ${z.toFixed(2)}" radius="0.25" color="${color}" ></a-sphere>`);
  }
  return petals.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  const lobby = document.getElementById('lobby');
  if (lobby) {
    lobby.innerHTML = `
      <div class="menu-item">🌸 Spira1-OS Booted! VR Spiral (φ-generated):</div>
      <a-scene embedded>
        ${spiralPetalPositions(21)}
        <a-plane position="0 0 -4" rotation="-90 0 0" width="12" height="12" color="#7BC8A4"></a-plane>
        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    `;
  }
});