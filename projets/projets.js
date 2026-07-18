/* =====================================================================
   MES PROJETS  —  C'est ICI que tu ajoutes tes réalisations !
   =====================================================================

   Pour ajouter un projet : copie un bloc { ... } ci-dessous, colle-le,
   puis change les valeurs. Sépare bien chaque projet par une virgule.

   Champs disponibles pour chaque projet :
   ---------------------------------------------------------------------
   id           (obligatoire) : identifiant court, SANS espace ni accent.
                                Il doit être IDENTIQUE au nom du fichier
                                de contenu placé dans "projets/contenu/".
                                Exemple : id "station-meteo"
                                    -> fichier projets/contenu/station-meteo.md
   titre        (obligatoire) : le nom du projet
   description  (obligatoire) : une ou deux phrases pour l'aperçu (la carte)
   image        (obligatoire) : le nom de ton image placée dans
                                le dossier "projets/images/"
                                Exemple : "ma-station-meteo.jpg"
                                (Tu peux aussi mettre un lien internet
                                 complet commençant par http)
   tags         (obligatoire) : une liste de mots-clés entre crochets
                                Exemple : ["ESP32", "IoT", "Capteurs"]
   date         (facultatif)  : la date du projet, ex : "Mars 2025"
   lien         (facultatif)  : un lien externe (GitHub, vidéo...).
                                Laisse "" si tu n'en as pas.
   ---------------------------------------------------------------------

   Le CONTENU COMPLET de l'article se met dans un fichier Markdown :
   projets/contenu/<id>.md   (voir le guide COMMENT-AJOUTER-UN-PROJET.md)
   ===================================================================== */

const PROJETS = [
  {
    id: "surveillance-environnementale",
    titre: "Système de surveillance environnementale",
    description: "Dispositif IoT autonome mesurant la température, l'humidité et la qualité de l'air avec transmission de données en temps réel.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["ESP32", "Capteurs", "IoT"],
    date: "Mars 2025",
    lien: ""
  },
  {
    id: "controleur-moteur",
    titre: "Contrôleur de moteur pas-à-pas",
    description: "Contrôleur haute précision pour moteurs pas-à-pas avec interface utilisateur intuitive et connectivité Bluetooth.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["STM32", "Drivers moteurs", "Bluetooth"],
    date: "Janvier 2025",
    lien: ""
  },
  {
    id: "alimentation-labo",
    titre: "Alimentation de laboratoire programmable",
    description: "Alimentation 0-30V/5A avec contrôle numérique, protection et enregistrement des paramètres.",
    image: "https://images.unsplash.com/photo-1556911220-ef412aeaedc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1228&q=80",
    tags: ["Alimentations", "Microcontrôleurs", "Interface TFT"],
    date: "Novembre 2024",
    lien: ""
  },
  {
    id: "station-meteo",
    titre: "Station météo intelligente",
    description: "Dispositif autonome mesurant les conditions météorologiques avec prédictions locales et historique des données.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Capteurs", "Affichage OLED", "Énergie solaire"],
    date: "Septembre 2024",
    lien: ""
  }
];
