"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BackSide, Vector3, type Mesh, type ShaderMaterial } from "three";
import type { Theme } from "@/components/theme/theme";
import { SUN_DIRECTION } from "./constants";
import { atmosphereFragment, atmosphereVertex } from "./shaders";

// Morning light is a clear blue-white haze; night is a deeper, dimmer blue.
const TINT: Record<Theme, [number, number, number]> = {
  light: [0.72, 0.84, 1.0],
  dark: [0.32, 0.46, 0.9],
};

// A soft halo just outside the surface. It is drawn from inside the shell, so
// the glow is strongest at the limb and fades towards the centre of the disc.
export function Atmosphere({ theme }: { theme: Theme }) {
  const mesh = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uSunDir: { value: SUN_DIRECTION },
      uCamPos: { value: new Vector3() },
      uTint: { value: new Vector3(...TINT.light) },
    }),
    [],
  );

  // Tint follows the theme; written once per change, never per frame.
  useEffect(() => {
    if (mesh.current) {
      (mesh.current.material as ShaderMaterial).uniforms.uTint.value.set(...TINT[theme]);
    }
  }, [theme]);

  useFrame(({ camera }) => {
    uniforms.uCamPos.value.copy(camera.position);
  });

  return (
    <mesh ref={mesh} scale={1.075}>
      <sphereGeometry args={[1, 160, 160]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
        side={BackSide}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}
