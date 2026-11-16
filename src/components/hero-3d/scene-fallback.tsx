import Image from "next/image";

// The non-WebGL version of the hero visual: the same Earth image, shown flat.
// It needs no script and no graphics acceleration, so it appears whenever the
// 3D scene cannot run. It is decorative, so its alt text is empty.
export function SceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border border-border/60"
    >
      <Image
        src="/textures/earth/day.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 34rem, 100vw"
        className="object-cover"
      />
    </div>
  );
}
