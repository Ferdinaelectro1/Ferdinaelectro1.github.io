#!/usr/bin/env bash
# =====================================================================
#  Démarre le site en local pour le prévisualiser (avec les pages projet).
#  Utilisation :
#     - Double-clique sur ce fichier (choisis "Exécuter"),
#       OU dans un terminal :  ./demarrer-le-site.sh
# =====================================================================

# On se place dans le dossier du script (le dossier du site)
cd "$(dirname "$0")" || exit 1

PORT=8000
URL="http://localhost:$PORT"

echo "======================================================"
echo "  Site en cours de démarrage..."
echo "  Ouvre ton navigateur à l'adresse : $URL"
echo "  (Pour arrêter le serveur : appuie sur Ctrl + C)"
echo "======================================================"

# On tente d'ouvrir le navigateur automatiquement (Linux / macOS)
( sleep 1
  if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"
  elif command -v open     >/dev/null 2>&1; then open "$URL"
  fi ) &

# On lance le petit serveur web intégré à Python
if command -v python3 >/dev/null 2>&1; then
    python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
    python -m http.server "$PORT"
else
    echo "Python n'est pas installé. Installe-le, ou utilise l'extension"
    echo "'Live Server' dans VS Code pour lancer le site."
    read -r -p "Appuie sur Entrée pour fermer..."
fi
