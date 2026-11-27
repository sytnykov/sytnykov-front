/**
 * Prepares static, resized copies of every picture in public/images for the
 * next/image loader (src/lib/images/loader.ts):
 *
 *   public/_opt/images/<name>-<width>.webp   what the page links to
 *   public/_opt/images/<name>-<width>.avif   served instead of the .webp to
 *                                            browsers that accept AVIF
 *                                            (rewrite in next.config.ts)
 *
 * Runs by itself before `next build` and `next dev` (see next.config.ts).
 * Encoded files are kept in .next/cache, which Vercel restores between
 * builds, so only new or changed pictures are encoded again.
 *
 * Manual run: node scripts/optimize-images.mjs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

// AVIF 55 / effort 3 is what Next's own optimiser produced at quality 75
const FORMATS = {
  webp: image => image.webp({ quality: 78, effort: 5 }),
  avif: image => image.avif({ quality: 55, effort: 3 }),
};
const SETTINGS = "webp78e5|avif55e3";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "public/images");
const outDir = path.join(root, "public/_opt/images");
const cacheDir = path.join(root, ".next/cache/opt-images");
const sizes = JSON.parse(
  fs.readFileSync(path.join(root, "src/lib/images/sizes.json"), "utf8")
);
const WIDTHS = [...sizes.imageSizes, ...sizes.deviceSizes];

const walk = dir =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
      })
    : [];

const sources = walk(sourceDir).filter(f => /\.(webp|png|jpe?g)$/i.test(f));
const expected = new Set();
const started = Date.now();
let encoded = 0;

fs.mkdirSync(cacheDir, { recursive: true });

const optimise = async file => {
  const data = fs.readFileSync(file);
  const hash = crypto
    .createHash("sha1")
    .update(data)
    .update(SETTINGS)
    .digest("hex");
  const rel = path.relative(sourceDir, file).replace(/\.\w+$/, "");
  const base = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(base), { recursive: true });

  let natural = 0;
  for (const width of WIDTHS) {
    for (const [format, encode] of Object.entries(FORMATS)) {
      const target = `${base}-${width}.${format}`;
      expected.add(target);

      // never upscale: every width above the original shares one file
      natural ||= (await sharp(data).metadata()).width || 0;
      const real = Math.min(width, natural);
      const cached = path.join(cacheDir, `${hash}-${real}.${format}`);
      if (!fs.existsSync(cached)) {
        const image = sharp(data);
        if (real < natural) image.resize({ width: real });
        const temp = `${cached}.${process.pid}.tmp`;
        await encode(image).toFile(temp);
        fs.renameSync(temp, cached);
        encoded += 1;
      }
      if (
        !fs.existsSync(target) ||
        fs.statSync(target).size !== fs.statSync(cached).size
      ) {
        fs.copyFileSync(cached, target);
      }
    }
  }
};

const queue = [...sources];
await Promise.all(
  Array.from({ length: Math.max(2, os.availableParallelism()) }, async () => {
    for (let file = queue.pop(); file; file = queue.pop()) await optimise(file);
  })
);

// copies of pictures that no longer exist
for (const file of walk(outDir)) {
  if (!expected.has(file)) fs.rmSync(file, { force: true });
}

console.log(
  `images: ${sources.length} pictures, ${encoded} files encoded in ${((Date.now() - started) / 1000).toFixed(1)}s`
);
