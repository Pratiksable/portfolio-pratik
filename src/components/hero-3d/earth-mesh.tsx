"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Quaternion, TextureLoader, Vector3, type Mesh, type Texture } from "three";
import type { Theme } from "@/components/theme/theme";
import { SUN_DIRECTION } from "./constants";
import { earthFragment, earthVertex } from "./shaders";
import { orientationFor } from "./orientation";

// Images served from public/textures/earth. See CREDITS.md in that folder for
// their source, which has not yet been verified.
const DAY_TEXTURE = "/textures/earth/day.jpg";
const NIGHT_TEXTURE = "/textures/earth/night.jpg";

// The planet. It is turned so that the side in daylight (light mode) or the
// side in darkness (dark mode) faces the viewer, using the real sun position.
// It eases into place rather than snapping, and never spins with a fake clock.
export function EarthMesh({ reduced, theme }: { reduced: boolean; theme: Theme }) {
  const mesh = useRef<Mesh>(null);
  const target = useRef(new Quaternion());
  const [day, night] = useLoader(TextureLoader, [DAY_TEXTURE, NIGHT_TEXTURE]) as [Texture, Texture];
  const gl = useThree((state) => state.gl);

  // Sharpen the surface at grazing angles near the limb, where plain filtering
  // turns the continents to mush. Set once per texture, never per frame.
  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    for (const texture of [day, night]) {
      texture.anisotropy = maxAnisotropy;
      texture.needsUpdate = true;
    }
  }, [day, night, gl]);

  // Work out the orientation for the current theme and the current time. The
  // time is read here, in an effect, never during render.
  useEffect(() => {
    target.current = orientationFor(theme, new Date());
    if (reduced && mesh.current) {
      mesh.current.quaternion.copy(target.current);
    }
  }, [theme, reduced]);

  const uniforms = useMemo(
    () => ({
      uSunDir: { value: SUN_DIRECTION },
      uCamPos: { value: new Vector3() },
      uDay: { value: day },
      uNight: { value: night },
    }),
    [day, night],
  );

  useFrame(({ camera }) => {
    if (!mesh.current) {
      return;
    }
    if (!reduced) {
      mesh.current.quaternion.slerp(target.current, 0.06);
    }
    uniforms.uCamPos.value.copy(camera.position);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={earthVertex}
        fragmentShader={earthFragment}
      />
    </mesh>
  );
}
