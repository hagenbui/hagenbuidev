#!/usr/bin/env python3
"""Regenerates sections/animation-data.js from the animation/ folder.
Run: python generate-animation-data.py (from the var-lp/ directory)
"""
import json, os

def safe_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    return json.dumps(content).replace('</', '<\\/')

base = os.path.dirname(os.path.abspath(__file__))
anim_dir = os.path.join(base, '..', 'animation')
out_path = os.path.join(base, 'sections', 'animation-data.js')

with open(out_path, 'w', encoding='utf-8') as out:
    out.write('// AUTO-GENERATED — run generate-animation-data.py to update\n')
    out.write(f'var ANIM1_HTML = {safe_json(os.path.join(anim_dir, "section1-anim1.html"))};\n')
    out.write(f'var ANIM2_HTML = {safe_json(os.path.join(anim_dir, "section1-anim2.html"))};\n')
    out.write(f'var ANIM3_HTML = {safe_json(os.path.join(anim_dir, "section1-anim3.html"))};\n')
    out.write(f'var GLOBE_HTML = {safe_json(os.path.join(anim_dir, "varmeta-globe-embed.html"))};\n')

print(f"Written: {out_path}")
print(f"Size: {os.path.getsize(out_path):,} bytes")
