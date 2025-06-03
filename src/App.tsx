import React, { useEffect, useRef, useState } from "react";

const SPIRAL_PHASES = [
  { name: "Red — Forward", freq: 261, color: "rgba(255,60,60,0.85)" },
  { name: "Green — Gap", freq: 130.5, color: "rgba(60,255,140,0.85)" },
  { name: "Blue — Reverse", freq: 65.25, color: "rgba(60,170,255,0.85)" },
];
const PHI = 1.6180339887;
const ASCEND_RATIO = 5 / 3;
const FLASH_FREQ = 434.367; // Hz, threshold for flashlight cue
const HINGE_PCT = 0.2175;   // proportion of silence in cycle

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// Vibration helper
function vibrate(pattern: number | number[]) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export default function App() {
  // Spiral state
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [spiralCycle, setSpiralCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showCue, setShowCue] = useState(true);
  const [flashlightActive, setFlashlightActive] = useState(false);

  // For flashlight API
  const flashlightRef = useRef<any>(null);
  const [supportsFlash, setSupportsFlash] = useState(false);

  // Set up screen always-on and orientation lock for pineal alignment
  useEffect(() => {
    if ("wakeLock" in navigator) {
      // @ts-ignore
      navigator.wakeLock.request("screen");
    }
    if (window.screen.orientation) {
      try {
        window.screen.orientation.lock("portrait");
      } catch {}
    }
  }, []);

  // Flashlight access via Web APIs
  useEffect(() => {
    if (
      "mediaDevices" in navigator &&
      typeof window !== "undefined"
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          // @ts-ignore
          const track = stream.getVideoTracks()[0];
          if ("torch" in track.getSettings() || "torch" in track.getCapabilities()) {
            setSupportsFlash(true);
            flashlightRef.current = track;
          }
        })
        .catch(() => {});
    }
  }, []);

  // Spiral sound+color+flash+vibration routine
  async function startSpiral() {
    setIsRunning(true);
    setShowCue(false);
    let phases = [...SPIRAL_PHASES];
    let cycle = 0;
    let freqs = phases.map((p) => p.freq);
    let phaseDuration = 2100; // ms per phase (can phi-tune)
    let hingeDuration = Math.round(phaseDuration * HINGE_PCT);
    let audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    while (isRunning || cycle === 0) {
      for (let i = 0; i < 3; ++i) {
        setPhaseIdx(i);
        playTone(audioCtx, freqs[i], phaseDuration * (1 - HINGE_PCT));
        // Vibration: phase cue (100ms, 140ms, 180ms for 1/2/3)
        vibrate(100 + i * 40);
        await sleep(phaseDuration * (1 - HINGE_PCT));

        // Hinge (silence, intention)
        setPhaseIdx(-1);
        // Vibration: intention "pulse" (short burst pattern)
        vibrate([40, 80, 40]);
        await sleep(hingeDuration);

        // Check for ramp-up to harmonic threshold
        if (freqs[0] >= FLASH_FREQ && supportsFlash) {
          try {
            // Flashlight burst!
            // @ts-ignore
            flashlightRef.current.applyConstraints({
              advanced: [{ torch: true }],
            });
            setFlashlightActive(true);
            // Vibration: triple-strong burst for "pineal flash"
            vibrate([200, 80, 200, 80, 200]);
            await sleep(800);
            // @ts-ignore
            flashlightRef.current.applyConstraints({
              advanced: [{ torch: false }],
            });
            setFlashlightActive(false);
          } catch {}
        }
      }
      // Ascend spiral
      freqs = freqs.map((f) => f * ASCEND_RATIO);
      cycle += 1;
      setSpiralCycle(cycle);
      // (Optionally: shorten durations for rising pace)
      phaseDuration = Math.max(1200, phaseDuration * (1 / PHI));
    }
    setIsRunning(false);
  }

  // Audio
  function playTone(ctx: AudioContext, freq: number, duration: number) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.value = 0.27;
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + duration / 1000);
    setTimeout(() => g.disconnect(), duration + 100);
  }

  // UI
  return (
    <main className="w-screen h-screen bg-black relative flex flex-col items-center justify-center">
      {/* Glow phase overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-all duration-400"
        style={{
          background:
            phaseIdx === -1
              ? "rgba(255,255,255,0.15)"
              : SPIRAL_PHASES[phaseIdx % 3]?.color,
          filter:
            phaseIdx === -1
              ? "blur(32px) brightness(1.12)"
              : "blur(16px) brightness(1.4)",
          opacity: 0.93,
          transition: "background 0.6s, filter 0.6s",
        }}
      />
      {/* Flashlight cue (visual, for user feedback) */}
      {flashlightActive && (
        <div className="absolute inset-0 bg-white opacity-95 z-20 animate-pulse pointer-events-none"></div>
      )}

      {/* Intention/phase text */}
      <div className="z-30 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg mb-2">
          Spiral Pineal Healing
        </h1>
        <h2 className="text-lg font-semibold text-white/90 mb-1">
          PRIIVI3 Harmonic Protocol
        </h2>
        {phaseIdx === -1 ? (
          <div className="my-8 text-xl text-yellow-200 animate-pulse">
            <span>🧠 Intention Phase:<br />
              <span className="italic">Focus, breathe, send your wish into the spiral…</span>
            </span>
          </div>
        ) : (
          <div className="my-8 text-2xl text-white font-mono animate-fade-in">
            {SPIRAL_PHASES[phaseIdx]?.name} <br />
            <span className="text-lg">
              {Math.round(SPIRAL_PHASES[phaseIdx].freq * Math.pow(ASCEND_RATIO, spiralCycle))} Hz
            </span>
          </div>
        )}
        <button
          className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-800 shadow-xl text-white text-xl font-bold hover:scale-105 transition"
          onClick={() => {
            if (!isRunning) {
              setIsRunning(true);
              startSpiral();
            } else {
              setIsRunning(false);
            }
          }}
        >
          {isRunning ? "Stop Spiral" : "Start Spiral"}
        </button>
        {showCue && (
          <div className="mt-10 p-4 text-sm text-white/80 bg-white/10 rounded-lg shadow border border-white/20 max-w-xs">
            <b>How to use:</b> <br />
            1. Dim the lights. <br />
            2. Lay phone on forehead, screen up, bottom edge between eyebrows. <br />
            3. Tap “Start Spiral.” <br />
            4. Let colors, sound, & vibration guide your breath & intention. <br />
            5. When the phone flashes, breathe in deep and focus your wish. <br />
            <span className="block mt-2 text-pink-200">
              P&Q — Intention will ride!
            </span>
          </div>
        )}
      </div>
      <footer className="absolute bottom-2 left-0 w-full text-center text-xs text-white/30 select-none">
        PRIIVI3 © {new Date().getFullYear()} | SpiralOS prototype | Netlify ready
      </footer>
    </main>
  );
}
