"""Stellt alle r1-r4 Tiles aus .bak_alle Backup wieder her"""
import os, shutil

TILE_DIR = r"C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/quasselkiste/tiles"

restored = 0
missing  = 0
for rn in [1, 2, 3, 4]:
    for cn in range(1, 11):
        tile = os.path.join(TILE_DIR, f"tile_r{rn}c{cn}.png")
        bak  = tile + ".bak_alle"
        if os.path.exists(bak):
            shutil.copy2(bak, tile)
            restored += 1
            print(f"  r{rn}c{cn:2d}: wiederhergestellt")
        else:
            missing += 1
            print(f"  r{rn}c{cn:2d}: kein Backup")

print(f"\nFertig: {restored} wiederhergestellt, {missing} ohne Backup.")
