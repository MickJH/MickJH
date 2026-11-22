// Renders the favicon set: an "MH" monogram (H in pale blue) on a brand-blue gradient tile:
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

// Diagonal brand-blue gradient, like the site's bright tiles.
const BG = "linear-gradient(135deg, #4f7bff, #2f5bff 55%, #1a2fa8)";
const FG = "#ffffff";
const ACCENT = "#bcd2ff";

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
        backgroundImage: BG,
        borderRadius: rounded ? 14 * s : 0,
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          fontFamily: "Space Grotesk",
          fontSize: 35 * s,
          fontWeight: 700,
          lineHeight: 0.8,
          letterSpacing: -2 * s,
        },
      },
      h("span", { style: { color: FG } }, "M"),
      h("span", { style: { color: ACCENT } }, "H"),
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
