"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

// A small spacecraft: a metal body with two solar panels. It travels along its
// orbit at a constant rate. Selecting it lights the body; the description is
// shown in the legend beside the scene, outside the canvas.
export function Satellite({
  id,
  radius,
  tiltX,
  tiltZ,
  speed,
  phase,
  reduced,
  selected,
  onSelect,
}: {
  id: string;
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  phase: number;
  reduced: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const craft = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!craft.current) {
      return;
    }
    const angle = phase + (reduced ? 0 : clock.elapsedTime * speed);
    craft.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    craft.current.rotation.y = -angle + Math.PI / 2;
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <group ref={craft}>
        <mesh
          onClick={(event) => {
            event.stopPropagation();
            onSelect(id);
          }}
        >
          <boxGeometry args={[0.05, 0.05, 0.08]} />
          <meshStandardMaterial
            color="#b9c3cc"
            metalness={0.7}
            roughness={0.35}
            emissive="#5ccfc4"
            emissiveIntensity={selected ? 0.7 : 0}
          />
        </mesh>
        <mesh position={[-0.1, 0, 0]}>
          <boxGeometry args={[0.16, 0.003, 0.055]} />
          <meshStandardMaterial color="#1c2d4a" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.16, 0.003, 0.055]} />
          <meshStandardMaterial color="#1c2d4a" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
