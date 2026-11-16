// A quiet backdrop for the hero. In daylight it carries a warm sun with soft
// rays; at night it is a starfield with a cool glow. Two tilted orbit rings
// frame the planet in both. It is decorative and carries no information. The
// stars come from a seeded generator, so the server and the browser draw the
// same field and nothing shifts on hydration.

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const random = seeded(20261116);
const stars = Array.from({ length: 170 }, () => ({
  x: random() * 100,
  y: random() * 100,
  r: 0.05 + random() * 0.12,
  o: 0.1 + random() * 0.32,
}));

export function SpaceBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "2.5rem 2.5rem",
          WebkitMaskImage: "radial-gradient(ellipse at 72% 50%, #000 0%, transparent 65%)",
          maskImage: "radial-gradient(ellipse at 72% 50%, #000 0%, transparent 65%)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: "var(--star-strength)" }}
      >
        {stars.map((star, index) => (
          <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="var(--text)" opacity={star.o} />
        ))}
      </svg>

      <div
        className="absolute left-[72%] top-1/2 aspect-square w-[92vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 62%)" }}
      />

      {/* Morning sun and rays, placed where the sun falls on the planet. */}
      <div
        className="absolute left-[92%] top-[8%] aspect-square w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: "var(--sun-strength)",
          background:
            "radial-gradient(circle, rgb(255 244 214 / 0.95) 0%, rgb(255 214 150 / 0.5) 14%, rgb(255 200 140 / 0.14) 36%, transparent 60%)",
        }}
      />
      <div
        className="absolute left-[92%] top-[8%] aspect-square w-[150vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: "var(--sun-strength)",
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgb(255 236 190 / 0.07) 0deg 4deg, transparent 4deg 15deg)",
          WebkitMaskImage: "radial-gradient(circle, #000 0%, transparent 55%)",
          maskImage: "radial-gradient(circle, #000 0%, transparent 55%)",
        }}
      />

      <div
        className="absolute left-[72%] top-1/2 aspect-square w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-text/10"
        style={{ transform: "translate(-50%, -50%) rotate(-18deg) scaleY(0.34)" }}
      />
      <div
        className="absolute left-[72%] top-1/2 aspect-square w-[104vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-text/[0.06]"
        style={{ transform: "translate(-50%, -50%) rotate(24deg) scaleY(0.26)" }}
      />
    </div>
  );
}
