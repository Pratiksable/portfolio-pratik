// Procedural planet shaders. The Earth is generated on the GPU from 3D noise,
// so no image files are needed and no third-party texture licence applies.
// Continents are an approximation for atmosphere, not geographic data.

export const noiseGlsl = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    f += a * snoise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return f;
}
`;

export const planetVertex = /* glsl */ `
varying vec3 vObj;
varying vec3 vWorldN;
varying vec3 vWorldPos;

void main() {
  vObj = normalize(position);
  vWorldN = mat3(modelMatrix) * normal;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const cloudFragment = /* glsl */ `
uniform vec3 uSunDir;
uniform float uTime;
varying vec3 vObj;
varying vec3 vWorldN;

${noiseGlsl}

void main() {
  // Domain-warped noise gives wispy, folded cloud edges rather than blobs.
  vec3 p = vObj * 3.4 + vec3(uTime * 0.02, 0.0, 0.0);
  float warp = fbm(p * 0.7 + 4.2);
  float c = fbm(p + warp * 0.9);
  float cover = smoothstep(-0.05, 0.35, fbm(vObj * 1.3 + uTime * 0.01));
  float alpha = smoothstep(0.02, 0.4, c) * cover * 0.7;
  float diff = max(dot(normalize(vWorldN), uSunDir), 0.0);
  vec3 col = vec3(0.95, 0.96, 0.98) * (0.06 + 0.94 * diff);
  gl_FragColor = vec4(col, alpha);
}
`;

export const atmosphereVertex = /* glsl */ `
varying vec3 vWorldN;
varying vec3 vWorldPos;

void main() {
  vWorldN = mat3(modelMatrix) * normal;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const atmosphereFragment = /* glsl */ `
uniform vec3 uTint;
uniform vec3 uSunDir;
uniform vec3 uCamPos;
varying vec3 vWorldN;
varying vec3 vWorldPos;

void main() {
  vec3 N = normalize(vWorldN);
  vec3 V = normalize(uCamPos - vWorldPos);
  float rim = pow(clamp(1.0 - abs(dot(N, V)), 0.0, 1.0), 3.6);
  float day = smoothstep(-0.3, 0.5, dot(N, uSunDir));
  vec3 col = uTint * (0.2 + 0.8 * day);
  gl_FragColor = vec4(col, rim * 0.55);
}
`;

// The Earth's surface is sampled from images. Land and ocean come from the
// day texture, the sea's specular glint from its blue-over-red colour, and the
// night-side lights from the night texture.
export const earthVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldN;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vWorldN = mat3(modelMatrix) * normal;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const earthFragment = /* glsl */ `
uniform vec3 uSunDir;
uniform vec3 uCamPos;
uniform sampler2D uDay;
uniform sampler2D uNight;
varying vec2 vUv;
varying vec3 vWorldN;
varying vec3 vWorldPos;

void main() {
  vec3 day = texture2D(uDay, vUv).rgb;
  vec3 night = texture2D(uNight, vUv).rgb;

  vec3 N = normalize(vWorldN);
  vec3 V = normalize(uCamPos - vWorldPos);
  float ndl = dot(N, uSunDir);
  float diff = max(ndl, 0.0);
  float dayMix = smoothstep(-0.12, 0.25, ndl);

  float ocean = clamp((day.b - day.r) * 3.0, 0.0, 1.0);
  vec3 H = normalize(uSunDir + V);
  float spec = pow(max(dot(N, H), 0.0), 80.0) * ocean * 0.45;

  vec3 lit = day * (0.06 + 0.94 * diff) + spec * diff;
  vec3 col = lit + night * (1.0 - dayMix) * 1.1;

  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  col += vec3(0.25, 0.55, 0.9) * fres * 0.3 * dayMix;

  gl_FragColor = vec4(col, 1.0);
}
`;
