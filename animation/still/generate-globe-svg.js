// Generates a static SVG of the hero-3.html globe scene at 1920×1080.
// Run: node generate-globe-svg.js > globe-still.svg
// Mirror of the exact projection math from hero-3.html.
const fs = require('fs');

// ── Viewport ─────────────────────────────────────────────────────────
const W = 1920, H = 1080;
const FOV = 38;
const fovR = FOV * Math.PI / 180;
const R = 100, gR = R * 1.001;
const aspect = W / H;

// ── Camera / globe placement (mirrors resize() at W=1920 H=1080) ─────
const ARC_SPAN = 1.6;
const desiredRadiusPx = W * ARC_SPAN / 2; // 1536
let camZ = R * (H / 2) / (Math.tan(fovR / 2) * desiredRadiusPx);
if (camZ < R * 1.15) camZ = R * 1.15;
const halfH = camZ * Math.tan(fovR / 2);
const globeY = (halfH - 2 * halfH * 0.10) - R; // TOP_MARGIN = 0.10

// ── Quaternion helpers ────────────────────────────────────────────────
const qFromAA = (ax, ay, az, a) => { const s = Math.sin(a/2); return [Math.cos(a/2), ax*s, ay*s, az*s]; };
const qMul = ([aw,ax,ay,az],[bw,bx,by,bz]) => [
  aw*bw-ax*bx-ay*by-az*bz, aw*bx+ax*bw+ay*bz-az*by,
  aw*by-ax*bz+ay*bw+az*bx, aw*bz+ax*by-ay*bx+az*bw
];
const qApply = ([w,x,y,z],[vx,vy,vz]) => {
  const tx=2*(y*vz-z*vy), ty=2*(z*vx-x*vz), tz=2*(x*vy-y*vx);
  return [vx+w*tx+y*tz-z*ty, vy+w*ty+z*tx-x*tz, vz+w*tz+x*ty-y*tx];
};
const qConj = ([w,x,y,z]) => [w,-x,-y,-z];

// ── Globe orientation (mirrors hero-3.html exactly) ───────────────────
// globe.quaternion = qOrient × qSpin  where
// qOrient = qX(0.20) × qZ(-π/2+0.25)  (premultiply = left-multiply)
const qOrient = qMul(qFromAA(1,0,0,0.20), qFromAA(0,0,1,-Math.PI/2+0.25));

// ── Parse LAND array from hero-3.html ────────────────────────────────
const src = fs.readFileSync(__dirname + '/hero-3.html', 'utf8');
const m   = src.match(/const LAND = \[([\s\S]*?)\];/);
if (!m) { process.stderr.write('Could not find LAND array\n'); process.exit(1); }
const LAND = JSON.parse('[' + m[1].replace(/\s+/g,'') + ']');
const landVecs = [];
for (let i = 0; i < LAND.length; i += 3) landVecs.push([LAND[i], LAND[i+1], LAND[i+2]]);

// ── computeInitialSpin(0.44) — same logic as hero-3.html ─────────────
// Build a lat/lon occupancy grid from the LAND unit vectors.
const NLAT=90, NLON=180;
const grid = new Uint8Array(NLAT*NLON);
for (const [x,y,z] of landVecs) {
  const lat = Math.asin(Math.max(-1,Math.min(1,y)));
  const th  = Math.atan2(z,-x);
  const la  = Math.min(NLAT-1,Math.max(0,Math.floor((lat+Math.PI/2)/Math.PI*NLAT)));
  const lo  = Math.min(NLON-1,Math.max(0,Math.floor((th+Math.PI)/(2*Math.PI)*NLON)));
  grid[la*NLON+lo]=1;
}
function isLand([x,y,z]) {
  const lat=Math.asin(Math.max(-1,Math.min(1,y))), th=Math.atan2(z,-x);
  const la=Math.min(NLAT-1,Math.max(0,Math.floor((lat+Math.PI/2)/Math.PI*NLAT)));
  const lo=Math.min(NLON-1,Math.max(0,Math.floor((th+Math.PI)/(2*Math.PI)*NLON)));
  return grid[la*NLON+lo]===1;
}

// Cast 17×17 rays through the viewport, intersect front-facing globe, check land.
function landRatioAtSpin(s) {
  const qGlobe = qMul(qOrient, qFromAA(0,1,0,-s));
  const qGlobeInv = qConj(qGlobe);
  let land=0, total=0;
  for (let iy=0;iy<=16;iy++) for (let ix=0;ix<=16;ix++) {
    const ndcX=-0.95+ix/16*1.9, ndcY=-0.95+iy/16*1.9;
    const dx=ndcX*Math.tan(fovR/2)*aspect, dy=ndcY*Math.tan(fovR/2), dz=-1;
    // Ray from camera (0,0,camZ) through globe sphere at (0,globeY,0)
    const ox=0, oy=-globeY, oz=camZ; // translate to globe-centered
    const a=dx*dx+dy*dy+dz*dz, b=2*(ox*dx+oy*dy+oz*dz), c=ox*ox+oy*oy+oz*oz-R*R;
    const disc=b*b-4*a*c; if(disc<0) continue;
    const t=(-b-Math.sqrt(disc))/(2*a); if(t<0) continue;
    const hx=ox+t*dx, hy=oy+t*dy, hz=oz+t*dz;
    const len=Math.sqrt(hx*hx+hy*hy+hz*hz);
    const bd=qApply(qGlobeInv,[hx/len,hy/len,hz/len]);
    // front-facing only (dot with camera direction > 0)
    const worldNorm=qApply(qGlobe,[hx/len,hy/len,hz/len]);
    if(worldNorm[2]<=0) continue;
    total++; if(isLand(bd)) land++;
  }
  return total>0 ? land/total : 0;
}

let bestSpin=0, bestErr=1e9;
for (let k=0;k<120;k++) {
  const s=k/120*Math.PI*2;
  const err=Math.abs(landRatioAtSpin(s)-0.44);
  if(err<bestErr) { bestErr=err; bestSpin=s; }
}
const spin = bestSpin;
const qGlobe = qMul(qOrient, qFromAA(0,1,0,-spin));

// ── Projection helpers ────────────────────────────────────────────────
// Project world-space point to SVG pixel coords.
// Returns null if behind camera or back-facing (for dots).
function project([wx,wy,wz]) {
  const d = camZ - wz; // depth from camera (positive = in front)
  if (d <= 0) return null;
  const scale = 1 / (d * Math.tan(fovR/2));
  const ndcX = wx * scale / aspect;
  const ndcY = wy * scale;
  return [(ndcX*0.5+0.5)*W, (-ndcY*0.5+0.5)*H, d];
}

// Globe-local dot → world pos
function dotWorld(localUnit, scale=R) {
  const r = qApply(qGlobe, localUnit.map(v=>v*scale));
  return [r[0], r[1]+globeY, r[2]];
}

// Globe-local unit → world normal z (for back-face cull)
function rimZ(localUnit) { return qApply(qGlobe, localUnit)[2]; }

// ── Dot size hash (mirrors hero-3.html) ──────────────────────────────
function dotSize([x,y,z]) {
  const h = Math.abs(Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453)%1;
  return 0.45 + Math.pow(h,0.55)*1.45; // 0.45–1.9
}

// ── SVG generation ────────────────────────────────────────────────────
const uSize = 2.6; // matches hero-3 at DPR=1
const lines = [];

lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);

// ── Graticule (lon lines every 20°, lat lines every 20°) ─────────────
lines.push(`<g stroke="#8ed5ff" stroke-opacity="0.28" stroke-width="0.6" fill="none" stroke-linecap="round">`);

// Longitude meridians
for (let lon=-180; lon<180; lon+=20) {
  const pts = [];
  for (let lat=-90; lat<=90; lat+=3) {
    const phi=(90-lat)*Math.PI/180, th=(lon+180)*Math.PI/180;
    const lv=[-Math.sin(phi)*Math.cos(th)*gR/R, Math.cos(phi)*gR/R, Math.sin(phi)*Math.sin(th)*gR/R];
    const rim=rimZ(lv);
    const wp=dotWorld(lv, gR);
    const sp=project(wp);
    if (!sp || rim<0.02) { if(pts.length>1) lines.push(`<polyline points="${pts.join(' ')}"/>`); pts.length=0; continue; }
    pts.push(`${sp[0].toFixed(1)},${sp[1].toFixed(1)}`);
  }
  if(pts.length>1) lines.push(`<polyline points="${pts.join(' ')}"/>`);
}

// Latitude parallels
for (let lat=-80; lat<=80; lat+=20) {
  const rad=gR*Math.cos(lat*Math.PI/180), yL=gR*Math.sin(lat*Math.PI/180);
  const pts=[];
  for (let i=0; i<=96; i++) {
    const a=i/96*Math.PI*2;
    const localPt=[Math.cos(a)*rad, yL, Math.sin(a)*rad];
    const r=qApply(qGlobe, localPt);
    const worldPt=[r[0], r[1]+globeY, r[2]];
    const rimN=qApply(qGlobe,[Math.cos(a)*rad/gR, yL/gR, Math.sin(a)*rad/gR]);
    const sp=project(worldPt);
    if(!sp||rimN[2]<0.02) { if(pts.length>1) lines.push(`<polyline points="${pts.join(' ')}"/>`); pts.length=0; continue; }
    pts.push(`${sp[0].toFixed(1)},${sp[1].toFixed(1)}`);
  }
  if(pts.length>1) lines.push(`<polyline points="${pts.join(' ')}"/>`);
}
lines.push(`</g>`);

// ── Land dots ─────────────────────────────────────────────────────────
// Collect all visible dots, sort back-to-front so larger/closer dots paint last.
const dots = [];
for (const v of landVecs) {
  const rim = rimZ(v);
  if (rim < 0.02) continue;
  const wp  = dotWorld(v);
  const sp  = project(wp);
  if (!sp) continue;
  const [px,py,depth] = sp;
  if (px<-10||px>W+10||py<-10||py>H+10) continue;
  // Perspective-correct screen radius (gl_PointSize / 2)
  const perspFactor = camZ / depth;
  const aSize = dotSize(v);
  const r = (uSize * aSize * perspFactor) / 2;
  // Feathered opacity at rim edge (mirrors fragment shader)
  const rimAlpha = Math.min(1, Math.max(0, (rim - 0.02) / 0.35));
  // Screen-bottom fade (screenY < -0.9 fades out)
  const ndcY = -(py/H*2-1);
  const yAlpha = Math.min(1, Math.max(0, (ndcY+0.9)/0.8));
  const alpha = rimAlpha * yAlpha * 0.9;
  dots.push({ px, py, r, depth, alpha });
}
// Sort back-to-front (larger depth = farther back)
dots.sort((a,b) => b.depth - a.depth);

lines.push(`<g fill="#8ed5ff">`);
for (const { px, py, r, alpha } of dots) {
  if (r < 0.1) continue;
  lines.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(2)}" opacity="${alpha.toFixed(3)}"/>`);
}
lines.push(`</g>`);
lines.push(`</svg>`);

process.stdout.write(lines.join('\n') + '\n');
process.stderr.write(`Done — ${dots.length} dots, spin=${spin.toFixed(3)} rad, camZ=${camZ.toFixed(1)}\n`);
