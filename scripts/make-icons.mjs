// Renders the favicon set from the "mjh" logo mark (an "m" plus the blue square):
//   src/app/icon.png (512), src/app/apple-icon.png (180), src/app/favicon.ico (16/32/48)
// Run once after changing the design:
//   node scripts/make-icons.mjs
import { writeFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

// Space Grotesk Bold, the site's display font (Google Fonts serves TTF to a bare user agent).
const css = await (
  await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700")
).text();
const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)[1];
const fontData = await (await fetch(fontUrl)).arrayBuffer();
const fonts = [
  { name: "Space Grotesk", data: fontData, weight: 700, style: "normal" },
];

const BG = "#060b1f";
const FG = "#eef3ff";
const BRAND = "#4f7bff";

/** One icon at `size` px; proportions scale so small sizes stay crisp. */
function icon(size, { rounded = true } = {}) {
  const s = size / 64;
  return h(
    "div",
    {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        borderRadius: rounded ? 14 * s : 0,
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "flex-end" } },
      h(
        "div",
        {
          style: {
            display: "flex",
            color: FG,
            fontFamily: "Space Grotesk",
            fontSize: 46 * s,
            fontWeight: 700,
            lineHeight: 0.8,
          },
        },
        "m",
      ),
      h("div", {
        style: {
          display: "flex",
          width: 9 * s,
          height: 9 * s,
          marginLeft: 2.5 * s,
          marginBottom: 2.2 * s,
          background: BRAND,
          borderRadius: 1.5 * s,
        },
      }),
    ),
  );
}

async function png(size, opts) {
  const res = new ImageResponse(icon(size, opts), {
    width: size,
    height: size,
    fonts,
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
