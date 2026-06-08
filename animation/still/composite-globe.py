"""
Composites globe-still.svg on top of hero-bg-1920x1080.jpg.
Parses circles + polylines from the SVG and draws them with Pillow.
"""
import re
import numpy as np
from PIL import Image, ImageDraw

# ── Load background ───────────────────────────────────────────────────
bg = Image.open('hero-bg-1920x1080.jpg').convert('RGBA')
W, H = bg.size

# ── Parse SVG ────────────────────────────────────────────────────────
svg = open('globe-still.svg').read()

DOT_COLOR   = (0x8e, 0xd5, 0xff)  # #8ed5ff
LINE_COLOR  = (0x8e, 0xd5, 0xff)
LINE_ALPHA  = 0.28

# ── Draw graticule polylines ──────────────────────────────────────────
# Collect on an RGBA overlay so we can apply uniform opacity
grid_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(grid_layer)

for pts_str in re.findall(r'<polyline points="([^"]+)"', svg):
    raw = pts_str.strip().split()
    pts = []
    for p in raw:
        try:
            x, y = p.split(',')
            pts.append((float(x), float(y)))
        except ValueError:
            continue
    # Clip segments to viewport and draw
    for i in range(len(pts) - 1):
        x0, y0 = pts[i];   x1, y1 = pts[i + 1]
        # Skip segments entirely outside viewport
        if max(x0, x1) < -50 or min(x0, x1) > W + 50: continue
        if max(y0, y1) < -50 or min(y0, y1) > H + 50: continue
        gd.line([(x0, y0), (x1, y1)],
                fill=(*LINE_COLOR, int(255 * LINE_ALPHA)),
                width=1)

bg = Image.alpha_composite(bg, grid_layer)

# ── Draw land dots ────────────────────────────────────────────────────
dot_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
dd = ImageDraw.Draw(dot_layer)

circle_re = re.compile(r'<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" opacity="([\d.]+)"')
for m in circle_re.finditer(svg):
    cx, cy, r, alpha = float(m[1]), float(m[2]), float(m[3]), float(m[4])
    if r < 0.3: continue
    a = int(255 * alpha)
    dd.ellipse(
        [cx - r, cy - r, cx + r, cy + r],
        fill=(*DOT_COLOR, a)
    )

bg = Image.alpha_composite(bg, dot_layer)

# ── Save ──────────────────────────────────────────────────────────────
out = bg.convert('RGB')
out.save('hero-bg-globe-1920x1080.jpg', 'JPEG', quality=95, subsampling=0)
print(f'Saved hero-bg-globe-1920x1080.jpg  ({W}×{H})')
