"""
Crops individual brand logos from public/images/partner-logos.png
and saves them to public/images/logos/
"""
from PIL import Image
import os

SRC  = "public/images/partner-logos.png"
DEST = "public/images/logos"
os.makedirs(DEST, exist_ok=True)

img = Image.open(SRC)
W, H = img.size
print(f"Image size: {W} x {H}")

# --- Detected crop boxes (x1, y1, x2, y2) relative to 1024x1024 image
# Adjust fine-tune by inspecting pixel positions if needed
logos = [
    ("suzuki",      (  52, 380, 180, 640)),
    ("honda",       ( 175, 370, 328, 640)),
    ("hyundai",     ( 325, 380, 458, 640)),
    ("lamborghini", ( 445, 300, 605, 660)),  # taller – includes full shield
    ("audi",        ( 600, 390, 740, 620)),
    ("mahindra",    ( 738, 390, 878, 620)),
    ("tata",        ( 875, 370, 990, 630)),
]

# Scale factors if image is not 1024×1024
sx = W / 1024
sy = H / 1024

for name, (x1, y1, x2, y2) in logos:
    box = (int(x1*sx), int(y1*sy), int(x2*sx), int(y2*sy))
    crop = img.crop(box)
    # Remove whitespace – crop to bounding box of non-white pixels
    try:
        bg   = Image.new(crop.mode, crop.size, (255, 255, 255, 0) if crop.mode == "RGBA" else (255, 255, 255))
        diff = Image.new("L", crop.size)
        pixels = crop.load()
        dpx    = diff.load()
        for y in range(crop.height):
            for x in range(crop.width):
                px = pixels[x, y]
                if isinstance(px, int):
                    dpx[x, y] = abs(px - 255)
                else:
                    r, g, b = px[0], px[1], px[2]
                    dpx[x, y] = max(abs(r-255), abs(g-255), abs(b-255))
        bb = diff.getbbox()
        if bb:
            pad = 12
            bb = (max(0, bb[0]-pad), max(0, bb[1]-pad),
                  min(crop.width, bb[2]+pad), min(crop.height, bb[3]+pad))
            crop = crop.crop(bb)
    except Exception as e:
        print(f"  trim error for {name}: {e}")

    out = os.path.join(DEST, f"{name}.png")
    crop.save(out, "PNG")
    print(f"  Saved {out}  ({crop.size})")

print("Done!")
