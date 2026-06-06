"""Stellt r5-Tiles aus .bak_s9 (NuVoice-Original 189x79px) wieder her"""
import os, shutil

TILE_DIR = r"C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/quasselkiste/tiles"

for c in range(1, 11):
    tile = os.path.join(TILE_DIR, f"tile_r5c{c}.png")
    bak  = tile + ".bak_s9"
    if os.path.exists(bak):
        shutil.copy2(bak, tile)
        from PIL import Image
        img = Image.open(tile)
        print(f"  r5c{c:2d}: wiederhergestellt ({img.width}x{img.height})")
    else:
        print(f"  r5c{c:2d}: kein bak_s9")
print("Fertig.")
