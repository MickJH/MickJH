// Renders the favicon set: a terminal prompt ">_" (white chevron, brand-blue cursor)
// on the dark tile:
//   src/app/icon.png (512), src/app/apple-icon.png (180), src/app/favicon.ico (16/32/48)
// Run once after changing the design:
//   node scripts/make-icons.mjs
import { writeFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const BG = "#060b1f";
const FG = "#eef3ff";
const BRAND = "#4f7bff";

/** One icon at `size` px, drawn as SVG on a 64-unit grid so every size stays sharp. */
function icon(size, { rounded = true } = {}) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
        background: BG,
        borderRadius: rounded ? size * 0.22 : 0,
      },
    },
    h(
      "svg",
      { width: size, height: size, viewBox: "0 0 64 64" },
      h("polyline", {
        points: "17,21 29,32 17,43",
        fill: "none",
        stroke: FG,
        strokeWidth: 6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      h("rect", { x: 33, y: 39, width: 15, height: 6, rx: 1.5, fill: BRAND }),
    ),
  );
}

async function png(size, opts) {
  const res = new ImageResponse(icon(size, opts), {
    width: size,
    height: size,
  });
  return Buffer.from(await res.arrayBuffer());
}

/** Packs PNG images into a .ico container (PNG-in-ICO, supported by all current browsers). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await writeFile(
  new URL("../src/app/icon.png", import.meta.url),
  await png(512),
);
// iOS rounds the corners itself, so the apple icon is a full square.
await writeFile(
  new URL("../src/app/apple-icon.png", import.meta.url),
  await png(180, { rounded: false }),
);
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map(async (size) => ({ size, data: await png(size) })),
);
await writeFile(
  new URL("../src/app/favicon.ico", import.meta.url),
  ico(images),
);
console.log("Wrote icon.png, apple-icon.png and favicon.ico");
