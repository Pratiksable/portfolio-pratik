import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

// The portrait slot. If public/about/portrait.jpg exists it is shown; otherwise
// a visible placeholder marks the gap. No image is invented.
export function Portrait() {
  const file = path.join(process.cwd(), "public", "about", "portrait.jpg");
  const available = fs.existsSync(file);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-border bg-surface-raised">
      {available ? (
        <Image
          src="/about/portrait.jpg"
          alt="Pratik Sable"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-text-muted">
          <p className="font-medium text-text">Portrait</p>
          <p className="text-sm">Add a photo at public/about/portrait.jpg</p>
        </div>
      )}
    </div>
  );
}
