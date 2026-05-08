"""
Exécute ce script Python dans le dossier de ton projet.
Il corrige l'ordre avant/après dans le comparateur.
"""

# ── styles.css ─────────────────────────────────────────────────────────────
with open('styles.css', 'r') as f:
    css = f.read()

# Le fond (.ba-before) sera visible en permanence → on y met l'image APRÈS
# L'overlay (.ba-after) grandit depuis la gauche → on y met l'image AVANT
# Il suffit d'échanger les class-names dans le CSS en renommant les règles.
# Plus simple : on échange juste les noms dans les règles background-image.

# Trouver les deux blocs
import re

# Extraire le contenu de .ba-before et .ba-after
ba_before = re.search(r'\.ba-before \{[^}]+\}', css)
ba_after  = re.search(r'\.ba-after \{[^}]+\}',  css)

if ba_before and ba_after:
    before_content = ba_before.group()
    after_content  = ba_after.group()
    
    # Extraire juste la valeur background-image de chacun
    before_bg = re.search(r'background-image:\s*([^;]+);', before_content).group(1).strip()
    after_bg  = re.search(r'background-image:\s*([^;]+);', after_content).group(1).strip()
    
    # Échanger : .ba-before reçoit l'image d'après, .ba-after reçoit l'image d'avant
    new_before = before_content.replace(before_bg, after_bg)
    new_after  = after_content.replace(after_bg,  before_bg)
    
    css = css.replace(before_content, new_before)
    css = css.replace(after_content,  new_after)
    
    with open('styles.css', 'w') as f:
        f.write(css)
    print("✅ styles.css corrigé — avant à gauche, après à droite.")
else:
    print("❌ Blocs .ba-before / .ba-after introuvables.")
