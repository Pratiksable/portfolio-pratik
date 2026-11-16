"use client";

import { useMemo } from "react";
import { BufferGeometry, Line, LineBasicMaterial, Float32BufferAttribute } from "three";

// A thin, faint orbit line. Drawn as geometry, not as a texture or sprite, so
// it stays crisp at every size.
export function OrbitalPath({
  radius,
  tiltX,
  tiltZ,
}: {
  radius: number;
  tiltX: number;
  tiltZ: number;
}) {
  const line = useMemo(() => {
    const segments = 160;
    const points: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      points.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
    const material = new LineBasicMaterial({
      color: "#8fb3cc",
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    return new Line(geometry, material);
  }, [radius]);

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <primitive object={line} />
    </group>
  );
}
