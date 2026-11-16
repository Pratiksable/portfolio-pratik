// True when the browser can create a WebGL context. Checked once, in the
// browser, before any 3D scene is mounted.
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
