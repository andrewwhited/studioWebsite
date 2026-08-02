// Phase 1 of the 2016 essay port: the original artwork is SVG, which Sanity's
// image pipeline cannot transform — every figure and the share card depend on
// `urlFor().width().format()`. So the SVGs are rendered to PNG here, once,
// and the PNGs are what get uploaded.
//
// Two things happen on the way:
//
//   Backgrounds are extended rather than cropped. The drawings are square and
//   the reading column is wide, so a square figure eats an enormous amount of
//   vertical space. Every SVG carries its own flat full-bleed background rect,
//   which means the canvas can simply be widened in that same colour — the
//   drawing keeps its size and the block gets shorter. Nothing is cropped.
//
//   The colour is sampled from the rendered corner pixel rather than parsed
//   out of the markup. Some of these files set no `fill` on their background
//   rect at all and rely on black defaulting in, so reading the attribute
//   would come back empty on exactly the files that need it most.
//
// Writes to a scratch directory for review. Uploading is a separate step.

import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(HERE, '../../site/public/thoughts/user-testing-vs-user-teaching')

// The migration scripts live here, but `sharp` is a dependency of the site.
// Resolved against the site's package rather than added to this one — it is
// needed for this port and nothing else.
const require = createRequire(path.join(HERE, '../../site/package.json'))
const sharp = require('sharp')
const OUT = process.argv[2]
if (!OUT) {
  console.error('usage: node render-user-testing-assets.mjs <output-dir>')
  process.exit(1)
}

// 16:9 for the figures that sit on the measure — the shallowest ratio that
// still gives a square drawing room to breathe. The hero is 5:2 to match the
// band it renders into, so the crop has nothing left to take.
const MEASURE_RATIO = 16 / 9
const HERO_RATIO = 5 / 2
const OUT_W = 2400

// Already wide enough to carry themselves — these two ran full-bleed in the
// original and still do, so they keep their own proportions.
const KEEP_RATIO = new Set(['6.svg', '11.svg'])

const SVGS = [
  '1.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg',
  '8.svg', '9.svg', '10.svg', '11.svg', '12.svg', '13.svg',
]

// The two iOS screenshots are photographs, not drawings: no background of
// their own, and a dark UI that would float on the essay's light surface.
// They get the ground the original laid behind them.
//
// Both are 204×360, and the figure is a comparison, so they are composited
// into one frame rather than left as a pair — two portrait images side by
// side fill a 16:9 block that a single one would leave mostly empty.
//
// Held to 2× their native height. Fitting one to the frame the way the
// drawings are fitted would upscale a 360px screenshot to 1350, and no amount
// of interpolation puts back detail a 2016 screenshot never had.
const SCREENSHOTS = {
  files: ['call-screen-beta4.jpg', 'call-screen-beta5.jpg'],
  out: 'call-screen-beta4-beta5.png',
  bg: '#1C1C1E',
  scale: 2,
  gap: 80,
}

function hex(r, g, b) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

// Top-left pixel of the rendered image. Every one of these drawings sits well
// inside its frame, so the corner is background by construction.
async function cornerColour(buf) {
  const {data} = await sharp(buf).extract({left: 0, top: 0, width: 1, height: 1}).raw().toBuffer({resolveWithObject: true})
  return {r: data[0], g: data[1], b: data[2]}
}

async function renderSvg(file) {
  const base = path.join(SRC, file)
  // Rendered tall first, then widened — scaling by height keeps the drawing
  // the same physical size whatever ratio the canvas ends up being.
  const natural = await sharp(base, {density: 400}).png().toBuffer()
  const meta = await sharp(natural).metadata()

  const target = file === '1.svg' ? HERO_RATIO : MEASURE_RATIO
  const keep = KEEP_RATIO.has(file)

  if (keep) {
    const out = await sharp(natural).resize({width: OUT_W}).png({compressionLevel: 9}).toBuffer()
    return {file, buf: out, bg: null, ratio: (meta.width / meta.height).toFixed(2)}
  }

  const bg = await cornerColour(natural)
  const outH = Math.round(OUT_W / target)
  // The drawing is scaled to fit inside the target box, then centred on a
  // canvas of its own background colour. `contain` does both in one pass.
  const out = await sharp(natural)
    .resize({
      width: OUT_W,
      height: outH,
      fit: 'contain',
      background: {...bg, alpha: 1},
    })
    .flatten({background: bg})
    .png({compressionLevel: 9})
    .toBuffer()

  return {file, buf: out, bg: hex(bg.r, bg.g, bg.b), ratio: (OUT_W / outH).toFixed(2)}
}

async function renderScreenshots({files, out: name, bg, scale, gap}) {
  const shots = await Promise.all(
    files.map(async (f) => {
      const src = sharp(path.join(SRC, f))
      const m = await src.metadata()
      return sharp(await src.toBuffer())
        .resize({width: m.width * scale, height: m.height * scale, kernel: 'lanczos3'})
        .toBuffer()
    }),
  )
  const metas = await Promise.all(shots.map((s) => sharp(s).metadata()))
  const contentW = metas.reduce((a, m) => a + m.width, 0) + gap * (shots.length - 1)
  const contentH = Math.max(...metas.map((m) => m.height))

  // Frame sized off the content, then squared up to 16:9 — the pair sets the
  // scale here, not the other way round.
  const outH = contentH + 120
  const outW = Math.round(outH * MEASURE_RATIO)

  let x = Math.round((outW - contentW) / 2)
  const composites = shots.map((buf, i) => {
    const left = x
    x += metas[i].width + gap
    return {input: buf, left, top: Math.round((outH - metas[i].height) / 2)}
  })

  const buf = await sharp({create: {width: outW, height: outH, channels: 3, background: bg}})
    .composite(composites)
    .png({compressionLevel: 9})
    .toBuffer()

  return {file: name, buf, bg, ratio: (outW / outH).toFixed(2)}
}

async function main() {
  await mkdir(OUT, {recursive: true})

  const results = []
  for (const f of SVGS) results.push(await renderSvg(f))
  results.push(await renderScreenshots(SCREENSHOTS))

  for (const r of results) {
    const name = r.file.replace(/\.(svg|jpg)$/, '.png')
    await writeFile(path.join(OUT, name), r.buf)
    const meta = await sharp(r.buf).metadata()
    console.log(
      name.padEnd(24),
      `${meta.width}×${meta.height}`.padEnd(12),
      `${r.ratio}:1`.padEnd(8),
      r.bg ?? '(unpadded)',
      `${Math.round(r.buf.length / 1024)}KB`,
    )
  }

  // Contact sheet — the whole set at a glance, which is the only way to judge
  // whether twelve figures in one column is too many.
  const THUMB_W = 600
  const COLS = 3
  const thumbs = await Promise.all(
    results.map(async (r) => {
      const t = await sharp(r.buf).resize({width: THUMB_W}).toBuffer()
      const m = await sharp(t).metadata()
      return {buf: t, h: m.height}
    }),
  )
  const rows = Math.ceil(thumbs.length / COLS)
  const rowH = []
  for (let i = 0; i < rows; i++) {
    rowH.push(Math.max(...thumbs.slice(i * COLS, i * COLS + COLS).map((t) => t.h)))
  }
  const GAP = 16
  const sheetW = COLS * THUMB_W + (COLS + 1) * GAP
  const sheetH = rowH.reduce((a, b) => a + b + GAP, GAP)
  let y = GAP
  const composites = []
  thumbs.forEach((t, i) => {
    const col = i % COLS
    if (col === 0 && i > 0) y += rowH[Math.floor(i / COLS) - 1] + GAP
    composites.push({input: t.buf, left: GAP + col * (THUMB_W + GAP), top: y})
  })
  await sharp({
    create: {width: sheetW, height: sheetH, channels: 3, background: '#F6F6F2'},
  })
    .composite(composites)
    .png()
    .toFile(path.join(OUT, '_contact-sheet.png'))

  console.log('\ncontact sheet →', path.join(OUT, '_contact-sheet.png'))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
