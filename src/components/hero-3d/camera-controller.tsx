"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

// Gentle parallax: the camera drifts a few hundredths of a unit towards the
// pointer and always looks at the planet. The Earth itself is not turned by
// the pointer. Disabled entirely under reduced motion.
export function CameraController({ reduced }: { reduced: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) {
      return;
    }
    function onMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame(({ camera }) => {
    if (!reduced) {
      const targetX = pointer.current.x * 0.18;
      const targetY = -pointer.current.y * 0.1;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}
