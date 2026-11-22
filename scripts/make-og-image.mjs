// Renders public/og.png (1200×630) with next/og. Run once after changing the text:
//   node scripts/make-og-image.mjs
// (Generated at build time it would need a server route, which a static export with
// cacheComponents doesn't allow.)
import { writeFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const div = (style, ...children) =>
  h("div", { style: { display: "flex", ...style } }, ...children);

const image = new ImageResponse(
  div(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 72,
      background: "#060b1f",
      color: "#eef3ff",
    },
    div(
      {
        alignItems: "flex-end",
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: -3,
      },
      "mjh",
      div({
        width: 16,
        height: 16,
        marginLeft: 6,
        marginBottom: 14,
        background: "#4f7bff",
      }),
    ),
    div(
      { flexDirection: "column", gap: 24 },
      div(
        { fontSize: 30, color: "#8db4ff" },
        "software developer · scrum master",
      ),
      div(
        { fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -4 },
        "Ik bouw software die ",
        h("span", { style: { color: "#4f7bff" } }, "past"),
        ".",
      ),
    ),
    div(
      { justifyContent: "space-between", fontSize: 28 },
      h("span", null, "Mick Holster"),
      h("span", { style: { color: "#a9b6da" } }, "mickholster.nl"),
    ),
  ),
  { width: 1200, height: 630 },
);

await writeFile(
  new URL("../public/og.png", import.meta.url),
  Buffer.from(await image.arrayBuffer()),
);
console.log("wrote public/og.png");
