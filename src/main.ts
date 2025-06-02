// Entry point for Spira1-OS lobby with A-Frame VR scene!
import 'aframe';

document.addEventListener('DOMContentLoaded', () => {
  const lobby = document.getElementById('lobby');
  if (lobby) {
    lobby.innerHTML = `
      <div class="menu-item">🌸 Spira1-OS Booted! Enter the VR World below:</div>
      <a-scene embedded>
        <a-box position="0 1 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        <a-sphere position="2 1 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder position="-2 0.75 -4" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="8" height="8" color="#7BC8A4"></a-plane>
        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    `;
  }
});