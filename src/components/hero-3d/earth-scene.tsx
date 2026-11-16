"use client";

import { Canvas } from "@react-three/fiber";
import { Atmosphere } from "./atmosphere";
import { CameraController } from "./camera-controller";
import { CloudLayer } from "./cloud-layer";
import { ORBITS } from "./constants";
import { EarthMesh } from "./earth-mesh";
import { OrbitalPath } from "./orbital-path";
import { Satellite } from "./satellite";
import { SceneLighting } from "./scene-lighting";
import type { Theme } from "@/components/theme/theme";

export type EarthSceneProps = {
  reduced: boolean;
  dpr: number;
  frameloop: "always" | "demand";
  selectedId: string | null;
  onSelect: (id: string) => void;
  theme: Theme;
};

// The 3D scene itself. It is loaded only by EarthStage, and never renders text.
export default function EarthScene({ reduced, dpr, frameloop, selectedId, onSelect, theme }: EarthSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 35 }}
      dpr={dpr}
      frameloop={frameloop}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
    >
      <SceneLighting />
      <CameraController reduced={reduced} />
      <EarthMesh reduced={reduced} theme={theme} />
      <CloudLayer reduced={reduced} />
      <Atmosphere theme={theme} />
      {ORBITS.map((orbit) => (
        <OrbitalPath
          key={`path-${orbit.radius}`}
          radius={orbit.radius}
          tiltX={orbit.tiltX}
          tiltZ={orbit.tiltZ}
        />
      ))}
      {ORBITS.map((orbit) => (
        <Satellite
          key={`craft-${orbit.id}`}
          id={orbit.id}
          selected={selectedId === orbit.id}
          onSelect={onSelect}
          radius={orbit.radius}
          tiltX={orbit.tiltX}
          tiltZ={orbit.tiltZ}
          speed={orbit.speed}
          phase={orbit.phase}
          reduced={reduced}
        />
      ))}
    </Canvas>
  );
}
