"""
fix_r5_labels_v3.py  –  wie fix_r6_grosse_labels.py, aber fuer r5 (Label OBEN).

Strategie (identisch zu r6-Fix):
  1. Bak_s9 laden (189x79, weisser Hintergrund, Label oben)
  2. label_end dynamisch erkennen (Ende des oberen Label-Streifens)
  3. Bounding-Box der nicht-weissen Pixel im Symbol-Bereich (ignoriert dunkle Randpixel)
  4. Symbol auf weissem 189x121-Canvas zentrieren (max. 1.0x Skalierung)
  5. Label-Streifen unten mit dunklem Text
"""
from PIL import Image, ImageDraw, ImageFont
import os

TILE_DIR  = r"C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/quasselkiste/tiles"
FONT_PATH = r"C:\Windows\Fonts\calibrib.ttf"
TW, TH    = 189, 121
LABEL_H   = 22      # unterer Label-Streifen (wie r6)
X_MARGIN  = 3       # Spalten links/rechts ignorieren (dunkle Rand-Pixel)

r5_names = {1:"Apfel", 2:"Saft", 3:"Taxi", 4:"Elefant",
            5:"Sonne", 6:"Geld", 7:"Würfel", 8:"Bad"}

# Schriftgroesse: gleiche Texthoehe wie r6 (~18-19px)
target_h = 18
best_size = 20
for size in range(14, 36):
    font = ImageFont.truetype(FONT_PATH, size)
    bb = font.getbbox("Apfel")
    if bb[3] - bb[1] >= target_h - 1:
        best_size = size
        break
print(f"Font: Calibri Bold {best_size}pt")

for c, name in r5_names.items():
    bak = os.path.join(TILE_DIR, f"tile_r5c{c}.png.bak_s9")
    out = os.path.join(TILE_DIR, f"tile_r5c{c}.png")
    if not os.path.exists(bak):
        print(f"r5c{c}: kein bak_s9"); continue

    orig = Image.open(bak).convert("RGB")
    ow, oh = orig.size   # 189 x 79
    pix    = orig.load()

    # 1. Label-Ende erkennen: erste Zeile nach dem Label-Text, die fast nur weiss ist
    label_end = 18   # sicherer Fallback
    found_label = False
    for y in range(4, 40):
        # nicht-weisse Pixel zaehlen (Schwelle 240 wie r6-Fix)
        colored = sum(1 for x in range(X_MARGIN, ow - X_MARGIN)
                      if not (pix[x, y][0] > 240 and pix[x, y][1] > 240 and pix[x, y][2] > 240))
        if colored > 3:
            found_label = True
        elif found_label and colored < 3:
            label_end = y
            break
    print(f"r5c{c}: label_end={label_end}")

    # 2. Symbol-Bereich: alles unterhalb des Labels
    sym_area = orig.crop((0, label_end, ow, oh))
    sa       = sym_area.load()
    sw0, sh0 = sym_area.size

    # 3. Bounding-Box der nicht-weissen Pixel (Randpixel ignorieren)
    min_x, min_y, max_x, max_y = sw0, sh0, 0, 0
    for y in range(sh0):
        for x in range(X_MARGIN, sw0 - X_MARGIN):
            r, g, b = sa[x, y]
            if not (r > 240 and g > 240 and b > 240):
                if x < min_x: min_x = x
                if y < min_y: min_y = y
                if x > max_x: max_x = x
                if y > max_y: max_y = y

    if max_x <= min_x or max_y <= min_y:
        print(f"  -> kein Symbol gefunden, uebersprungen"); continue

    sym         = sym_area.crop((min_x, min_y, max_x + 1, max_y + 1))
    orig_sw, orig_sh = sym.size

    # 4. Skalieren: verfuegbarer Slot ist (TW-8) x (TH-LABEL_H-4)
    avail_w = TW - 8
    avail_h = TH - LABEL_H - 4
    scale   = min(avail_w / orig_sw, avail_h / orig_sh, 1.0)   # kein Up-Scale
    new_sw  = int(orig_sw * scale)
    new_sh  = int(orig_sh * scale)
    sym_sc  = sym.resize((new_sw, new_sh), Image.LANCZOS)

    # 5. Canvas aufbauen (weiss, wie r6)
    canvas = Image.new("RGB", (TW, TH), (255, 255, 255))
    cx = (TW - new_sw) // 2
    cy = max(2, (avail_h - new_sh) // 2)
    canvas.paste(sym_sc, (cx, cy))

    # 6. Label-Streifen unten
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([0, TH - LABEL_H, TW, TH], fill=(255, 255, 255))
    draw.line([(0, TH - LABEL_H), (TW, TH - LABEL_H)], fill=(200, 200, 200), width=1)

    font = ImageFont.truetype(FONT_PATH, best_size)
    bb   = font.getbbox(name)
    tw_t = bb[2] - bb[0]
    th_t = bb[3] - bb[1]
    lx   = (TW - tw_t) // 2
    ly   = TH - LABEL_H + (LABEL_H - th_t) // 2 - 1
    draw.text((lx, ly), name, fill=(20, 20, 20), font=font)

    canvas.save(out, "PNG")
    print(f"  sym {orig_sw}x{orig_sh} -> {new_sw}x{new_sh} bei ({cx},{cy})  OK")

print("\nFertig. c9/c10 (die/dem) unveraendert.")
