# Animation Design DNA

Universal rules for all `anim/` files. Do not break these when editing any animation.

---

## Rendering format

All animations use **Canvas 2D** (`<canvas id="c">`) with a fixed logical coordinate space scaled to the canvas at runtime via `sx`/`sy`. No SVG, no DOM manipulation inside the loop.

```js
const VW = <width>, VH = <height>;
const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
const dpr    = window.devicePixelRatio || 1;
let sx = 1, sy = 1;

function resize() {
  canvas.width  = canvas.clientWidth  * dpr;
  canvas.height = canvas.clientHeight * dpr;
  sx = canvas.width  / VW;
  sy = canvas.height / VH;
}
window.addEventListener('resize', resize);
resize();
```

---

## Color palette

| Token | Hex | RGB | Usage |
|---|---|---|---|
| Primary blue | `#1078f3` | `16,120,243` | Travel color, surge, active state |
| Secondary blue | `#8ed5ff` | `142,213,255` | Base edge gradient |
| Hover tint | `#eef8ff` | `238,248,255` | Node fill on hover |
| Surge tint | `#e6f4ff` | `230,244,255` | Node fill during surge |
| Dot grid | `#d7d7d7` | `215,215,215` | Background grid dots |

---

## No threshold color jumps

Never use `if (value > threshold)` to switch between colors. All transitions must use **continuous interpolation**.

```js
// The canonical lerp helper — use this everywhere
function lerpRGBA(r0,g0,b0,a0, r1,g1,b1,a1, t) {
  return `rgba(${(r0+(r1-r0)*t+.5)|0},${(g0+(g1-g0)*t+.5)|0},${(b0+(b1-b0)*t+.5)|0},${(a0+(a1-a0)*t).toFixed(2)})`;
}
```

---

## Three-stop node color blend

Nodes have three states: **idle → hover → surge (glow)**. Blend them simultaneously — never branch.

```js
const u2 = gl;              // surge contribution
const u1 = hv * (1 - gl);  // hover contribution (dims when surge active)
const u0 = 1 - u1 - u2;    // idle contribution

function b3(r0,g0,b0,a0, r1,g1,b1,a1, r2,g2,b2,a2) {
  return `rgba(
    ${(r0*u0 + r1*u1 + r2*u2 + .5)|0},
    ${(g0*u0 + g1*u1 + g2*u2 + .5)|0},
    ${(b0*u0 + b1*u1 + b2*u2 + .5)|0},
    ${(a0*u0 + a1*u1 + a2*u2).toFixed(2)}
  )`;
}

// Typical values:
// idle:  fill=(255,255,255,1.00)  border-start=(16,120,243,0.70)  ring=(16,120,243,0.60)
// hover: fill=(238,248,255,1.00)  border-start=(16,120,243,0.95)  ring=(16,120,243,0.90)
// surge: fill=(230,244,255,0.90)  border-start=(89,188,255,0.90)  ring=(89,188,255,0.75)
```

---

## Asymmetric glow easing

Node glow (and hover) rises fast and falls slowly so pulses feel deliberate, not flickery.

```js
// dt is in seconds
const kRise = 1 - Math.pow(0.003, dt);  // τ ≈ 200 ms
const kFall = 1 - Math.pow(0.030, dt);  // τ ≈ 600 ms

n.hover += (tgt - n.hover) * (tgt > n.hover ? kRise : kFall);
```

---

## Unified travel color

All animations use `#1078f3` (`16,120,243`) as the single data-in-motion color. Do not introduce per-animation travel colors.

---

## Edge glow — gradient window

The traveling surge is a ±0.20 gradient window along the normalized path position `t`, with edge feathering.

```js
// edgeFade — feather at path start/end
let edgeFade = 1;
if (t < 0.07) edgeFade = t / 0.07;
else if (t > 0.85) edgeFade = Math.max(0, (1 - t) / 0.15);

const opacity = 0.92 * edgeFade;
const start   = Math.max(0, t - 0.20);
const end     = Math.min(1, t + 0.20);

const grad = ctx.createLinearGradient(x0, y0, x1, y1);
grad.addColorStop(0, `rgba(16,120,243,0)`);
if (start > 0.001) grad.addColorStop(start, `rgba(16,120,243,0)`);
grad.addColorStop(Math.min(t, 1), `rgba(16,120,243,${opacity})`);
if (end < 0.999) grad.addColorStop(end, `rgba(16,120,243,0)`);
grad.addColorStop(1, `rgba(16,120,243,0)`);
```

Line widths: **1.2** (base neutral), **3.2** (surge glow).

---

## Node hover — scale + pulse rings

```js
// Scale
ctx.scale(1 + 0.08 * hv, 1 + 0.08 * hv);

// Two expanding pulse rings (shared hoverPulseOffset advances at dt * 0.32 per second)
for (let i = 0; i < 2; i++) {
  const raw = (hoverPulseOffset + i * 0.5) % 1;
  const pr  = baseRadius * (1.15 + raw * 2.0);
  const pa  = (1 - raw) * 0.11 * hv;
  ctx.beginPath();
  ctx.arc(0, 0, pr, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(16,120,243,${pa.toFixed(3)})`;
  ctx.lineWidth = 1.2 * sc;
  ctx.stroke();
}
```

Also pulse the node to `hoverTgt = 1` when a data surge is near its endpoint (within 20% of arc length).

---

## Speed sync

| Animation | Speed |
|---|---|
| `blockchain` | `SCROLL_PPS = 80` px/s scroll; surge screen speed ≈ SCROLL_PPS + 460 ≈ 540 px/s |
| `ai-agent` | `PSPEED = 0.025` per frame (normalized t/frame) |
| `data-flow` | `PSPEED = 0.0095` per frame (normalized t/frame) |

Scale proportionally when changing pace — keep all three feeling visually consistent.

---

## Dot grid

Same implementation across all animations. Pre-compute positions, draw each frame.

```js
// Spacing: 36px (data-flow / ai-agent), TW/22 (blockchain — matches tile width)
// Radial fade from canvas center, maxDist = 800 (or 600 for 675-wide space — same visual radius)
// Dot base radius = 2.25 * (VW / 900) * f * min(sx, sy), opacity = f * 0.9
//   → VW/900 normalizes to the 900-wide reference space so dots are the same
//     physical CSS pixel size regardless of the animation's logical coordinate space.

// Hover proximity scaling (mouse at (mx, my) in logical coords):
if (dist < 130) {
  const u = 1 - dist / 130;
  r       *= (1 + 1.8 * u);
  opacity  = Math.min(1.0, opacity * (1 + 0.5 * u));
}
```

---

## Frame padding

All animations must keep all visual elements within a **48px** border from each edge of the logical coordinate space (left, right, top, bottom). The leftmost node must start exactly 48px from the left; rightmost ends 48px from the right.

---

## Edge fade overlay

All animations use `body::before` and `body::after` pseudo-elements to fade left and right edges to white, covering the 15% of each side.

```css
body::before {
  content: ''; position: absolute;
  top: 0; left: 0; bottom: 0; width: 15%;
  background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);
  pointer-events: none; z-index: 10;
}
body::after {
  content: ''; position: absolute;
  top: 0; right: 0; bottom: 0; width: 15%;
  background: linear-gradient(to left, #fff 0%, rgba(255,255,255,0) 100%);
  pointer-events: none; z-index: 10;
}
```
