/* =====================================================================
   Page "article" d'un projet — ATI Ferdinand
   Lit l'identifiant du projet dans l'URL (projet.html?id=xxx),
   affiche l'en-tête depuis projets/projets.js, puis charge et affiche
   le contenu du fichier Markdown projets/contenu/xxx.md
   (Tu n'as pas besoin de toucher à ce fichier.)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    const IMAGE_FALLBACK = 'images/logo_ferdinaelectro.png';

    // Construit le chemin d'une image : lien complet OU fichier du dossier projets/images/
    function cheminImage(image) {
        if (!image) return IMAGE_FALLBACK;
        return /^https?:\/\//.test(image) ? image : 'projets/images/' + image;
    }

    // Récupère l'id demandé dans l'URL (projet.html?id=xxx)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const projets = (typeof PROJETS !== 'undefined') ? PROJETS : [];
    const projet = projets.find(p => p.id === id);

    const article = document.getElementById('article');
    const titleEl = document.getElementById('projectTitle');

    // --- Projet introuvable ---------------------------------------------
    if (!projet) {
        titleEl.textContent = "Projet introuvable";
        article.innerHTML = `
            <p>Désolé, ce projet n'existe pas ou l'adresse est incorrecte.</p>
            <p><a href="index.html#realisations">← Revenir à la liste des projets</a></p>`;
        return;
    }

    // --- En-tête du projet ----------------------------------------------
    document.title = projet.titre + " - ATI Ferdinand";
    titleEl.textContent = projet.titre;

    const meta = document.getElementById('projectMeta');
    if (projet.date) {
        meta.innerHTML = `<span><i class="far fa-calendar"></i> ${projet.date}</span>`;
    }

    document.getElementById('projectTags').innerHTML = (projet.tags || [])
        .map(t => `<span class="project-tag">${t}</span>`)
        .join('');

    // Image de couverture
    const cover = document.getElementById('projectCover');
    cover.innerHTML = `<img src="${cheminImage(projet.image)}" alt="${projet.titre}"
        onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}'">`;

    // Lien externe éventuel (GitHub, vidéo...) en bas de l'article
    if (projet.lien) {
        document.getElementById('articleFooter').innerHTML = `
            <a class="btn btn-outline-dark" href="${projet.lien}" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i> Voir le projet en ligne
            </a>`;
    }

    // --- Chargement du contenu Markdown ---------------------------------
    // Si le site est ouvert en double-clic (protocole file://), le navigateur
    // interdit la lecture des fichiers .md : on prévient l'utilisateur.
    if (window.location.protocol === 'file:') {
        article.innerHTML = messageServeurLocal();
        return;
    }

    const cheminMd = 'projets/contenu/' + encodeURIComponent(projet.id) + '.md';

    fetch(cheminMd)
        .then(reponse => {
            if (!reponse.ok) throw new Error('Fichier introuvable : ' + cheminMd);
            return reponse.text();
        })
        .then(markdown => {
            // Conversion Markdown -> HTML
            article.innerHTML = marked.parse(markdown);

            // Les images écrites simplement (ex : ![](montage.jpg)) pointent
            // automatiquement vers projets/images/
            article.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src') || '';
                if (!/^https?:\/\//.test(src) && !src.startsWith('projets/')) {
                    img.src = cheminImage(src.replace(/^.*[\\/]/, ''));
                }
                img.loading = 'lazy';
            });

            // Les liens externes s'ouvrent dans un nouvel onglet
            article.querySelectorAll('a[href^="http"]').forEach(a => {
                a.target = '_blank';
                a.rel = 'noopener';
            });

            // Coloration syntaxique des blocs de code (C++, etc.)
            if (window.hljs) {
                article.querySelectorAll('pre code').forEach(bloc => hljs.highlightElement(bloc));
            }
        })
        .catch(() => {
            article.innerHTML = `
                <p>Le contenu de ce projet n'a pas encore été rédigé.</p>
                <p style="color:#95a5a6">Pour l'ajouter, crée le fichier
                <code>projets/contenu/${projet.id}.md</code> et écris ton article dedans.</p>`;
        });


    /* ---------------------------------------------------------------
       Éléments d'interface communs (menu mobile, retour en haut, année)
       --------------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const ouvert = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', ouvert);
            navToggle.querySelector('i').className = ouvert ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (backToTop) backToTop.classList.toggle('show', window.pageYOffset > 400);
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    function messageServeurLocal() {
        return `
            <div class="notice">
                <h3><i class="fas fa-info-circle"></i> Presque prêt !</h3>
                <p>Pour lire le contenu détaillé des projets sur ton ordinateur, il faut
                lancer un petit serveur local (le navigateur bloque la lecture des fichiers
                quand on ouvre la page en double-clic).</p>
                <p><strong>C'est très simple :</strong></p>
                <ol>
                    <li>Double-clique sur le fichier <code>demarrer-le-site.sh</code>
                    (ou lance <code>python3 -m http.server</code> dans le dossier du site).</li>
                    <li>Ouvre ton navigateur à l'adresse <code>http://localhost:8000</code></li>
                </ol>
                <p>👉 Une fois ton site publié sur Internet (GitHub Pages...), tout fonctionne
                automatiquement, sans rien faire.</p>
            </div>`;
    }
});
