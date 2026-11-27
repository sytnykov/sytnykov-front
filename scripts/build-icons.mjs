/**
 * Builds the favicon set from one drawing of the logo mark (scales on a pen
 * nib standing on a book). Run: node scripts/build-icons.mjs
 *
 * The mark is drawn twice: "full" for 48 px and up, "small" with heavier
 * lines for the 16 and 32 px layers, where 1-unit strings would vanish.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const NAVY = "#091129";
const WHITE = "#ffffff";

/** Left half of the mark in a 100×100 box; the right half is its mirror. */
const half = small => {
  const s = small ? 3.4 : 1.7; // string width
  const pan = small
    ? "M0 43H27A13.5 9.5 0 0 1 0 43Z"
    : "M1 43.5H26A12.5 7.5 0 0 1 1 43.5Z";
  const beam = small
    ? "M50 13.5C43 13.5 39 10.5 31 10.5 23 10.5 19 15 9 15.5L11 21.5C20 21.5 24 17.5 31 17.5 38 17.5 41 21 50 23Z"
    : "M50 15C44 15 40 12 32 12 24 12 19.5 16.6 10.5 17L8 14.6 9.6 20.2C19 20.4 24.5 16.4 32 16.4 39 16.4 42 20 50 22.5Z";
  const strings = small
    ? `<path d="M12.5 19 2.5 43M14.5 19 24.5 43" fill="none" stroke="${WHITE}" stroke-width="${s}" stroke-linecap="round"/>`
    : `<path d="M12.6 19.5 2.6 43.5M14.4 19.5 24.4 43.5M13.5 20V43.5" fill="none" stroke="${WHITE}" stroke-width="${s}" stroke-linecap="round"/>`;
  return `<path d="${beam}"/>${strings}<path d="${pan}"/>`;
};

const centre = small => {
  // finial, shaft, collar, nib, book
  const finial =
    "M50 2.5C51.6 6.5 54.6 8.2 54.6 11.6A4.6 4.6 0 0 1 45.4 11.6C45.4 8.2 48.4 6.5 50 2.5Z";
  const shaft = small ? "M45.6 14H54.4L55 56H45Z" : "M46.6 14H53.4L54 57H46Z";
  const collar = small
    ? "M43 55.5H57V60.5H43Z"
    : "M44 56.5H56V58.6H44ZM45 59.6H55V61.4H45Z";
  const nib = small
    ? "M44 60.5H56L59 70 50 87 41 70Z"
    : "M45.4 61.4H54.6L58 70.5 50.7 86.5V75.4A2.5 2.5 0 1 0 49.3 75.4V86.5L42 70.5Z";
  const book = small
    ? "M20 86H76A6.5 6.5 0 0 1 76 99H20L23.5 92.5Z"
    : "M22 87.5H75A5.75 5.75 0 0 1 75 99H22L25 93.25Z";
  return `<path d="${finial}"/><path d="${shaft}"/><path d="${collar}"/><path d="${nib}"/><path d="${book}"/>`;
};

const mark = small =>
  `<g fill="${WHITE}">${centre(small)}${half(small)}<g transform="matrix(-1 0 0 1 100 0)">${half(small)}</g></g>`;

/**
 * @param size   canvas in px
 * @param share  part of the canvas the mark takes (0–1)
 * @param radius corner radius as a share of the canvas (0 = full-bleed square)
 */
const svg = ({
  size = 64,
  share = 0.7,
  radius = 0.22,
  small = false,
  pretty = false,
}) => {
  const k = (size * share) / 100;
  const offset = (size * (1 - share)) / 2;
  const r = +(size * radius).toFixed(2);
  const nl = pretty ? "\n  " : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">` +
    `${nl}<rect width="${size}" height="${size}" rx="${r}" fill="${NAVY}"/>` +
    `${nl}<g transform="translate(${+offset.toFixed(3)} ${+offset.toFixed(3)}) scale(${+k.toFixed(4)})">${mark(small)}</g>` +
    `${pretty ? "\n" : ""}</svg>${pretty ? "\n" : ""}`
  );
};

/** 16 px layer, drawn on the pixel grid so the shaft, beam and book stay crisp. */
const tiny =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">` +
  `<rect width="16" height="16" rx="3" fill="${NAVY}"/>` +
  `<g fill="${WHITE}">` +
  `<path d="M7 2h2v8L8 11.5 7 10Z"/>` + // shaft and nib
  `<path d="M2 3h12v1H2Z"/>` + // beam
  `<path d="M1 7h5v1a2.5 2 0 0 1-5 0ZM10 7h5v1a2.5 2 0 0 1-5 0Z"/>` + // pans
  `<path d="M4 12h8v2H4Z"/>` + // book
  `</g>` +
  `<path d="M3.5 4 1.6 7M3.5 4 5.4 7M12.5 4 10.6 7M12.5 4 14.4 7" fill="none" stroke="${WHITE}" stroke-width=".7"/>` +
  `</svg>`;

const png = (options, px) =>
  sharp(Buffer.from(svg({ ...options, size: px })))
    .png({ compressionLevel: 9 })
    .toBuffer();

/** ICO container with PNG layers (read by every current browser and by Google). */
const ico = layers => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(layers.length, 4);
  let offset = 6 + 16 * layers.length;
  const entries = layers.map(({ px, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(px, 0);
    e.writeUInt8(px, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...layers.map(l => l.data)]);
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "src/app");
const pub = path.join(root, "public/icons");
fs.mkdirSync(pub, { recursive: true });
const write = (file, data) => {
  fs.writeFileSync(file, data);
  console.log(path.relative(root, file), data.length);
};

const tile = { share: 0.72, radius: 0.22 };

write(path.join(app, "icon.svg"), svg({ ...tile, size: 64, pretty: true }));
write(
  path.join(app, "favicon.ico"),
  // the 48 px layer goes first: Next reads the size for <link sizes> from it
  ico([
    { px: 48, data: await png(tile, 48) },
    { px: 32, data: await png({ ...tile, share: 0.76, small: true }, 32) },
    {
      px: 16,
      data: await sharp(Buffer.from(tiny))
        .png({ compressionLevel: 9 })
        .toBuffer(),
    },
  ])
);
// Google Search wants a square icon whose side is a multiple of 48 px
write(path.join(app, "icon1.png"), await png(tile, 48));
write(path.join(app, "icon2.png"), await png(tile, 96));
write(path.join(app, "icon3.png"), await png(tile, 192));
// iOS rounds the corners itself: solid square, no transparency
write(
  path.join(app, "apple-icon.png"),
  await png({ share: 0.64, radius: 0 }, 180)
);
write(path.join(pub, "icon-192.png"), await png(tile, 192));
write(path.join(pub, "icon-512.png"), await png(tile, 512));
// maskable: full-bleed ground, the mark inside the central safe circle (80%)
write(
  path.join(pub, "icon-maskable-512.png"),
  await png({ share: 0.54, radius: 0 }, 512)
);
