"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ORBITS } from "./constants";
import { SceneErrorBoundary } from "./error-boundary";
import { SceneFallback } from "./scene-fallback";
import { supportsWebGL } from "./webgl";
import { currentTheme, subscribeTheme, type Theme } from "@/components/theme/theme";

// The 3D scene is loaded only in the browser, after the page's text has
// rendered. The reserved box keeps the layout still while it loads.
const EarthScene = dynamic(() => import("./earth-scene"), {
  ssr: false,
  loading: () => <div className="aspect-square w-full" />,
});

// Browser-only facts, read through useSyncExternalStore. The server snapshot
// supplies safe defaults, so nothing needs setState inside an effect.
const noopSubscribe = () => () => {};

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readPixelRatio() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
}

// Owns the decisions about the scene: whether WebGL exists, reduced motion,
// pixel-ratio limits, and whether the scene is on screen. It also holds which
// satellite is selected, so the scene and the legend stay in step.
export function EarthStage() {
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = ORBITS.find((orbit) => orbit.id === selectedId) ?? null;

  const webgl = useSyncExternalStore(noopSubscribe, supportsWebGL, () => null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);
  const dpr = useSyncExternalStore(noopSubscribe, readPixelRatio, () => 1);
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "light" as Theme);

  useEffect(() => {
    const element = frame.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      return;
    }
    let pending = 0;
    function update() {
      pending = 0;
      if (frame.current) {
        const offset = Math.min(window.scrollY, 1200) * -0.06;
        frame.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    }
    function onScroll() {
      if (!pending) {
        pending = window.requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (pending) {
        window.cancelAnimationFrame(pending);
      }
    };
  }, [reduced]);

  const frameloop = visible && !reduced ? "always" : "demand";
  const fallback = <SceneFallback />;
  const toggle = (id: string) => setSelectedId((current) => (current === id ? null : id));

  return (
    <div className="space-y-8">
      <div
        ref={frame}
        aria-hidden="true"
        className="relative mx-auto aspect-square w-full"
        style={{
          WebkitMaskImage: "radial-gradient(closest-side, #000 92%, transparent 100%)",
          maskImage: "radial-gradient(closest-side, #000 92%, transparent 100%)",
        }}
      >
        {webgl === false ? (
          fallback
        ) : (
          <SceneErrorBoundary fallback={fallback}>
            <Suspense fallback={null}>
              <EarthScene
                reduced={reduced}
                dpr={dpr}
                frameloop={frameloop}
                selectedId={selectedId}
                onSelect={toggle}
                theme={theme}
              />
            </Suspense>
          </SceneErrorBoundary>
        )}
      </div>

      <div className="max-w-md">
        <ul className="flex flex-wrap gap-2" aria-label="Satellites in the scene">
          {ORBITS.map((orbit) => {
            const pressed = selectedId === orbit.id;
            return (
              <li key={orbit.id}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => toggle(orbit.id)}
                  className={`min-h-11 rounded-md border px-4 text-sm ${
                    pressed ? "border-accent text-text" : "border-border text-text-muted hover:text-text"
                  }`}
                >
                  {orbit.label} satellite
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="mt-4 min-h-20">
          {selected ? (
            <>
              <p className="text-sm text-text-muted">{selected.summary}</p>
              <p className="mt-2 text-xs text-text-muted">Illustrative orbit, not live telemetry.</p>
            </>
          ) : (
            <p className="text-sm text-text-muted">
              Select a satellite to see the layer it represents. Its orbit is illustrative, not live
              telemetry.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
