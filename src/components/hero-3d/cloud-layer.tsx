"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh, ShaderMaterial } from "three";
import { SUN_DIRECTION } from "./constants";
import { cloudFragment, planetVertex } from "./shaders";

// A thin, slightly faster-turning shell of cloud noise above the surface.
export function CloudLayer({ reduced }: { reduced: boolean }) {
  const mesh = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uSunDir: { value: SUN_DIRECTION },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) {
      return;
    }
    mesh.current.rotation.y = clock.elapsedTime * 0.065;
    const material = mesh.current.material as ShaderMaterial;
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={mesh} scale={1.012}>
      <sphereGeometry args={[1, 96, 96]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={planetVertex}
        fragmentShader={cloudFragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
