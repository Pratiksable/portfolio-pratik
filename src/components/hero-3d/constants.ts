import { Vector3 } from "three";
import { systemNodes } from "@/content/skills";

// Direction towards the sun, in world space. Shared by every lit surface so
// the day and night sides agree across the Earth, clouds, and atmosphere.
export const SUN_DIRECTION = new Vector3(0.8, 0.35, 0.5).normalize();

// Each satellite stands for one layer of a system. Its name and description
// come from the same content as the homepage, so the scene and the page agree.
// The orbits are illustrative geometry, not live satellite telemetry.
const layer = (id: string) => systemNodes.find((node) => node.id === id);

export const ORBITS = [
  {
    id: "interface",
    label: layer("interface")?.label ?? "Interface",
    summary: layer("interface")?.summary ?? "",
    radius: 1.42,
    tiltX: 0.35,
    tiltZ: 0.2,
    speed: 0.22,
    phase: 0.0,
  },
  {
    id: "service",
    label: layer("service")?.label ?? "Service",
    summary: layer("service")?.summary ?? "",
    radius: 1.6,
    tiltX: -0.55,
    tiltZ: -0.35,
    speed: 0.14,
    phase: 2.1,
  },
] as const;
