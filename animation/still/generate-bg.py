"""
Renders the hero-section.html background gradient to a 1920×1080 PNG.

CSS source:
  radial-gradient(120% 100% at 50% 0%,
    #1567e0 0%, #267ce8 18.75%, #3792f0 37.5%,
    #59bcff 75%, #83cdff 81.25%, #ace2ff 87.5%,
    #d6eeff 93.75%, #ffffff 100%)
"""
import numpy as np
from PIL import Image

W, H = 1920, 1080

# Ellipse radii (CSS percentages are relative to full gradient-box dimension)
cx, cy = W * 0.5, 0.0   # center at "50% 0%"
rx = W * 1.20            # 120% of width
ry = H * 1.00            # 100% of height

# Colour stops: (t, r, g, b)  — t in [0, 1]
STOPS = [
    (0.0000, 0x15, 0x67, 0xe0),
    (0.1875, 0x26, 0x7c, 0xe8),
    (0.3750, 0x37, 0x92, 0xf0),
    (0.7500, 0x59, 0xbc, 0xff),
    (0.8125, 0x83, 0xcd, 0xff),
    (0.8750, 0xac, 0xe2, 0xff),
    (0.9375, 0xd6, 0xee, 0xff),
    (1.0000, 0xff, 0xff, 0xff),
]

def sample(t):
    """Interpolate colour stops at normalised distance t."""
    t = max(0.0, min(1.0, t))
    for i in range(len(STOPS) - 1):
        t0, *c0 = STOPS[i]
        t1, *c1 = STOPS[i + 1]
        if t <= t1:
            f = (t - t0) / (t1 - t0)
            return tuple(int(a + f * (b - a)) for a, b in zip(c0, c1))
    return STOPS[-1][1:]

# Build pixel grid
xs = np.arange(W, dtype=np.float32)
ys = np.arange(H, dtype=np.float32)
xx, yy = np.meshgrid(xs, ys)

# Normalised ellipse distance for every pixel
t_grid = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)

# Map t → RGB using vectorised piecewise-linear interpolation
def make_channel(ch_idx):
    vals = np.empty((H, W), dtype=np.float32)
    for i in range(len(STOPS) - 1):
        t0 = STOPS[i][0];    c0 = STOPS[i][ch_idx + 1]
        t1 = STOPS[i+1][0];  c1 = STOPS[i+1][ch_idx + 1]
        mask = (t_grid >= t0) & (t_grid <= t1)
        f = np.where(mask, (t_grid - t0) / (t1 - t0), 0.0)
        vals = np.where(mask, c0 + f * (c1 - c0), vals)
    # clamp beyond last stop
    vals = np.where(t_grid > STOPS[-1][0], STOPS[-1][ch_idx + 1], vals)
    return np.clip(vals, 0, 255).astype(np.uint8)

r = make_channel(0)
g = make_channel(1)
b = make_channel(2)

img = Image.fromarray(np.stack([r, g, b], axis=2), 'RGB')
out = 'hero-bg-1920x1080.jpg'
img.save(out, 'JPEG', quality=95, subsampling=0)
print(f'Saved {out}')
