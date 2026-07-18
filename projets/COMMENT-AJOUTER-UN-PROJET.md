# 🚀 Comment ajouter un nouveau projet sur mon site

Chaque projet a maintenant **deux parties** :

1. **L'aperçu** : la petite carte affichée sur la page d'accueil (section *Réalisations*).
2. **La page complète** : un vrai article détaillé qui s'ouvre quand on clique sur la carte.

Bonne nouvelle : tu n'as **pas besoin de coder**. Tu écris juste :
- une petite **fiche** dans `projets/projets.js` (pour l'aperçu)
- un **fichier texte** en Markdown dans `projets/contenu/` (pour l'article complet)

---

## 📁 Organisation des fichiers

```
projets/
├── projets.js                      ← la LISTE (aperçu) de tes projets
├── contenu/                        ← un fichier .md par projet (l'article complet)
│   ├── station-meteo.md
│   └── robot-suiveur.md
├── images/                         ← toutes tes images
└── COMMENT-AJOUTER-UN-PROJET.md    ← ce guide
```

> 🔑 **La règle importante** : l'`id` d'un projet dans `projets.js` doit être
> **exactement** le même que le nom de son fichier dans `contenu/`.
> Exemple : `id: "robot-suiveur"`  →  fichier `projets/contenu/robot-suiveur.md`

---

## ✅ Ajouter un projet en 3 étapes

### Étape 1 — Ajoute la fiche d'aperçu
Ouvre **`projets/projets.js`** et colle ce modèle entre les crochets `[ ]`
(n'oublie pas la **virgule** entre chaque projet) :

```js
{
  id: "robot-suiveur",
  titre: "Robot suiveur de ligne",
  description: "Petit robot autonome qui suit une ligne noire.",
  image: "robot-suiveur.jpg",
  tags: ["Arduino", "Robotique"],
  date: "Mai 2025",
  lien: ""
}
```

### Étape 2 — Écris l'article complet
Crée un nouveau fichier dans **`projets/contenu/`** portant le **même nom que l'`id`**,
avec l'extension `.md`. Exemple : `projets/contenu/robot-suiveur.md`

Écris dedans comme dans un document normal (voir le mémo Markdown plus bas).

### Étape 3 — Dépose tes images
Mets tes images dans **`projets/images/`**, puis utilise-les :
- dans la fiche (`image: "robot-suiveur.jpg"`)
- dans l'article : `![Mon robot](robot-suiveur.jpg)`

C'est fini ! La carte apparaît sur l'accueil, et au clic on arrive sur ton article. 🎉

---

## ✍️ Mémo Markdown (le contenu de l'article)

Le Markdown, c'est du texte normal avec quelques symboles pour la mise en forme :

```markdown
## Un grand titre
### Un sous-titre

Un paragraphe normal. On peut mettre des mots en **gras** ou en *italique*.

- Un élément de liste
- Un autre élément

1. Étape numérotée
2. Deuxième étape

![Texte décrivant l'image](mon-image.jpg)

[Un lien vers un site](https://exemple.com)

> Une citation ou une remarque mise en valeur.
```

### 💻 Afficher du code (spécial toi 😉)

Entoure ton code de trois accents graves ` ``` ` avec le langage :

````markdown
```cpp
void setup() {
    Serial.begin(115200);
}
```
````

Le code C++ sera affiché avec des couleurs, comme dans un éditeur.

### 📊 Un tableau

```markdown
| Composant | Rôle              |
|-----------|-------------------|
| ESP32     | Microcontrôleur   |
| DHT22     | Capteur           |
```

---

## 👀 Comment voir mon site sur mon ordinateur

Les pages complètes lisent des fichiers `.md`. Pour des raisons de sécurité, le navigateur
**bloque cette lecture** quand on ouvre la page en double-cliquant dessus.
Il faut donc lancer un petit **serveur local** (une seule fois, ça reste ouvert) :

**Le plus simple :**
1. Double-clique sur le fichier **`demarrer-le-site.sh`** (à la racine du site)
   → il ouvre ton navigateur tout seul sur `http://localhost:8000`

**Ou en ligne de commande**, dans le dossier du site :
```bash
python3 -m http.server 8000
```
puis ouvre `http://localhost:8000` dans ton navigateur.

**Ou dans VS Code** : installe l'extension *Live Server*, puis clic droit sur
`index.html` → *Open with Live Server*.

> 🌍 Une fois ton site publié en ligne (GitHub Pages...), **tout fonctionne
> automatiquement**, tu n'as plus besoin du serveur local.

---

## ⚠️ Erreurs fréquentes à éviter

- ❌ **`id` différent du nom du fichier `.md`** → l'article ne se charge pas.
- ❌ **Oublier la virgule** entre deux projets dans `projets.js` → le site s'affiche mal.
- ❌ **Oublier les guillemets** `"..."` autour du texte dans `projets.js`.
- ❌ **Mauvais nom d'image** (attention aux majuscules et aux accents).
- ✅ Utilise des noms de fichiers simples : `robot-suiveur.jpg` plutôt que `Robot Suiveur.jpg`.

Bon courage, et amuse-toi bien à remplir ton portfolio ! 💪
