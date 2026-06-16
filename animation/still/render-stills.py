import subprocess
import time
import os
from PIL import Image

# Start local server in the animation directory
server_process = subprocess.Popen(["python3", "-m", "http.server", "8080"], cwd="/Users/HagenBui/Coding/hagenbuidev/animation")
time.sleep(2)

try:
    chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    
    anims = [
        ("homepage/ai-agent.html", "section1-anim1-640x428"),
        ("homepage/data-flow.html", "section1-anim2-640x428"),
        ("homepage/blockchain.html", "section1-anim3-640x428"),
        ("about/about-hero.html", "about-hero-640x428"),
        ("about/about-hero-right.html", "about-hero-right-640x428"),
        ("about/dual-expert.html", "about-dual-expert-640x428"),
        ("about/orbital-delivery.html", "about-orbital-delivery-640x428"),
        ("about/why-choose-layer-1s.html", "about-why-choose-layer1s-640x428"),
    ]
    
    for anim_file, name in anims:
        url = f"http://localhost:8080/{anim_file}"
        png_path = f"/Users/HagenBui/Coding/hagenbuidev/animation/still/{name}.png"
        jpg_path = f"/Users/HagenBui/Coding/hagenbuidev/animation/still/{name}.jpg"
        
        # Run Google Chrome in headless mode to capture screenshot at 2x retina scale
        cmd = [
            chrome_path,
            "--headless",
            "--disable-gpu",
            f"--screenshot={png_path}",
            "--window-size=640,428",
            "--force-device-scale-factor=2",
            "--virtual-time-budget=3000",
            url
        ]
        print(f"Capturing {anim_file}...")
        subprocess.run(cmd, check=True)
        
        # Convert PNG to high-quality JPEG
        if os.path.exists(png_path):
            img = Image.open(png_path)
            # Composite transparency over solid white background
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                img = background
            else:
                img = img.convert('RGB')
            img.save(jpg_path, 'JPEG', quality=95, subsampling=0)
            print(f"Saved {jpg_path} ({img.width}x{img.height})")
            os.remove(png_path)
        else:
            print(f"Failed to capture PNG for {anim_file}")

finally:
    server_process.terminate()
    server_process.wait()
    print("Server stopped.")
