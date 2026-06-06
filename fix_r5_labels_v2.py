"""
fix_r5_labels_v2.py
r5 c1-c8: Legt Label an den UNTEREN Rand.
Hintergrund = dunkles Navy aus Original-Tile (kein weisser Kasten).
Symbol aus bak_s9 (189x79) ohne oberes Label-Strip skaliert auf neue Kachelflaeche.
c9/c10 (die/dem): unveraendert lassen.
"""
from PIL import Image, ImageDraw, ImageFont
import numpy as np, os

TILE_DIR   = r"C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/quasselkiste/tiles"
FONT_PATH  = r"C:/Windows/Fonts/calibrib.ttf"
TW, TH     = 189, 121
LABEL_H    = 23        # Hoehe des Label-Streifens unten
LABEL_TOP  = 18        # Hoehe des Original-NuVoice-Label-Strips oben (wird entfernt)

names = {1:"Apfel", 2:"Saft", 3:"Taxi", 4:"Elefant",
         5:"Sonne", 6:"Geld", 7:"Würfel", 8:"Bad"}

for c, name in names.items():
    bak = os.path.join(TILE_DIR, f"tile_r5c{c}.png.bak_s9")
    out = os.path.join(TILE_DIR, f"tile_r5c{c}.png")

    if not os.path.exists(bak):
        print(f"r5c{c}: kein bak_s9 – uebersprungen"); continue

    orig = Image.open(bak).convert("RGB")
    ow, oh = orig.size                        # 189 x 79
    arr    = np.array(orig)

    # Symbol-Bereich: oberes Label-Strip abschneiden (y=0..17 = Rand + Labeltext)
    sym = orig.crop((0, LABEL_TOP, ow, oh))  # 189 x 61
    sw, sh = sym.size

    # Symbol auf verfuegbaren Slot skalieren (189 x 98)
    slot_h = TH - LABEL_H                    # 98 px
    scale  = min(TW / sw, slot_h / sh)
    nw     = min(TW,    int(sw * scale))
    nh     = min(slot_h, int(sh * scale))
    sym_sc = sym.resize((nw, nh), Image.LANCZOS)

    # Leinwand: weiss (wie Original-Tile-Hintergrund)
    canvas = Image.new("RGB", (TW, TH), (255, 255, 255))

    # Symbol oben zentriert einfuegen
    xo = (TW - nw) // 2
    yo = (slot_h - nh) // 2
    canvas.paste(sym_sc, (xo, yo))

    # Label-Bereich unten
    draw = ImageDraw.Draw(canvas)
    # Trennlinie (hellgrau)
    sep_y = TH - LABEL_H
    draw.line([(0, sep_y), (TW, sep_y)], fill=(180, 180, 180), width=1)

    # Dunkler Text (wie r6-Tiles)
    font = ImageFont.truetype(FONT_PATH, 17)
    bb   = font.getbbox(name)
    tw_t = bb[2] - bb[0]
    th_t = bb[3] - bb[1]
    tx   = (TW - tw_t) // 2 - bb[0]
    ty   = sep_y + (LABEL_H - th_t) // 2 - bb[1]
    draw.text((tx, ty), name, font=font, fill=(17, 17, 17))

    canvas.save(out)
    print(f"r5c{c:2d} ({name:<8}): weiss  sym {sw}x{sh} -> {nw}x{nh}  scale={scale:.2f}")

print("\nFertig. c9/c10 (die/dem) unveraendert.")
