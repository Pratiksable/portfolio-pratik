import { SUN_DIRECTION } from "./constants";

// One warm key light for the spacecraft and a low ambient fill. The Earth's
// own shader uses the same sun direction, so every lit surface agrees.
export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight
        position={[SUN_DIRECTION.x * 10, SUN_DIRECTION.y * 10, SUN_DIRECTION.z * 10]}
        intensity={2.2}
        color="#fff4e6"
      />
    </>
  );
}
