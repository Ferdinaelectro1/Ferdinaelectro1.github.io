# 🚀 Comment ajouter un nouveau projet sur mon site

Bonne nouvelle : tu n'as **qu'un seul fichier** à modifier et **un dossier** où déposer tes images.
Pas besoin de toucher au reste du site, tout se met à jour tout seul. 🎉

---

## 📁 Où se trouvent les projets ?

Tout est dans le dossier **`projets/`** :

```
projets/
├── projets.js                     ← LA LISTE de tes projets (à modifier)
├── images/                        ← TES IMAGES de projets (à remplir)
└── COMMENT-AJOUTER-UN-PROJET.md   ← ce guide
```

---

## ✅ Ajouter un projet en 3 étapes

### Étape 1 — Dépose ton image
Mets la photo de ton projet dans le dossier **`projets/images/`**.

Exemple : `projets/images/station-meteo.jpg`

> 💡 Conseils : utilise des images `.jpg`, `.png` ou `.webp`, de préférence en format
> paysage (ex. 800×600). Évite les noms avec des espaces ou des accents
> (écris `station-meteo.jpg` plutôt que `Station Météo.jpg`).

### Étape 2 — Ajoute la fiche du projet
Ouvre le fichier **`projets/projets.js`** et copie/colle ce modèle **à l'intérieur des crochets `[ ]`**,
sans oublier la **virgule** entre chaque projet :

```js
{
  titre: "Nom de mon projet",
  description: "Une ou deux phrases pour décrire ce que fait le projet.",
  image: "station-meteo.jpg",
  tags: ["ESP32", "Capteurs", "IoT"],
  lien: ""
}
```

### Étape 3 — Enregistre et ouvre `index.html`
C'est tout ! Ton projet apparaît automatiquement dans la section **Réalisations**,
et son ou ses tags s'ajoutent tout seuls dans les **boutons de filtre**. ✨

---

## 🧩 Explication de chaque champ

| Champ         | Obligatoire | À quoi ça sert |
|---------------|:-----------:|----------------|
| `titre`       | ✅ | Le nom affiché du projet |
| `description` | ✅ | Le petit texte de présentation |
| `image`       | ✅ | Le **nom du fichier** placé dans `projets/images/` (ex : `"robot.jpg"`). Tu peux aussi mettre un lien internet complet commençant par `http`. |
| `tags`        | ✅ | Les mots-clés, entre crochets et séparés par des virgules. Ils servent aussi de filtres. |
| `lien`        | ❌ | Un lien vers le projet (GitHub, vidéo YouTube, article...). Mets `""` si tu n'en as pas. |

---

## 🖼️ Exemple complet

```js
const PROJETS = [
  {
    titre: "Robot suiveur de ligne",
    description: "Petit robot autonome qui suit une ligne noire grâce à des capteurs infrarouges.",
    image: "robot-suiveur.jpg",
    tags: ["Arduino", "Robotique", "Capteurs"],
    lien: "https://github.com/Ferdinaelectro1/robot-suiveur"
  },
  {
    titre: "Station météo intelligente",
    description: "Mesure la température, l'humidité et la pression avec affichage OLED.",
    image: "station-meteo.jpg",
    tags: ["ESP32", "Capteurs"],
    lien: ""
  }
];
```

---

## ⚠️ Erreurs fréquentes à éviter

- ❌ **Oublier la virgule** entre deux projets → le site ne s'affiche plus.
- ❌ **Oublier les guillemets** `"..."` autour du texte.
- ❌ **Mauvais nom d'image** : le nom dans `projets.js` doit être **exactement** le même
  que le fichier dans `projets/images/` (attention aux majuscules).
- ✅ Si une image ne s'affiche pas, un logo par défaut apparaît à la place :
  vérifie alors le nom du fichier.

Bon courage, et amuse-toi bien à remplir ton portfolio ! 💪
