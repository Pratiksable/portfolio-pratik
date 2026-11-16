import { Quaternion, Vector3 } from "three";
import type { Theme } from "@/components/theme/theme";

// The point on the Earth directly under the sun right now, from the UTC time:
// latitude from the day of the year, longitude from the hour of the day.
export function subsolarPoint(now: Date): { latDeg: number; lonDeg: number } {
  const startOfYear = Date.UTC(now.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear) / 86_400_000);
  const latDeg = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);

  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
  let lonDeg = (12 - utcHours) * 15;
  if (lonDeg > 180) lonDeg -= 360;
  if (lonDeg < -180) lonDeg += 360;

  return { latDeg, lonDeg };
}

// A direction on the sphere in the same coordinate convention as three.js's
// SphereGeometry, so the texture's longitudes line up with the point.
function directionOf(latDeg: number, lonDeg: number): Vector3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return new Vector3(Math.cos(lat) * Math.cos(lon), Math.sin(lat), -Math.cos(lat) * Math.sin(lon));
}

// Light mode turns the sunlit side to the viewer. Dark mode turns the side in
// darkness to the viewer. The camera looks along -z, so +z is "towards me".
export function orientationFor(theme: Theme, now: Date): Quaternion {
  const { latDeg, lonDeg } = subsolarPoint(now);
  const subsolar = directionOf(latDeg, lonDeg);
  const from = theme === "light" ? subsolar : subsolar.clone().negate();
  return new Quaternion().setFromUnitVectors(from.normalize(), new Vector3(0, 0, 1));
}
