/* =====================================================================
   Logique du site — ATI Ferdinand
   (Tu n'as normalement pas besoin de toucher à ce fichier.
    Pour ajouter un projet, modifie plutôt : projets/projets.js)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------------------
       1) AFFICHAGE DES PROJETS (depuis projets/projets.js)
       --------------------------------------------------------------- */
    const grid = document.getElementById('projectsGrid');
    const filterBar = document.getElementById('projectsFilter');
    // Image affichée si celle d'un projet est introuvable
    const IMAGE_FALLBACK = 'images/logo_ferdinaelectro.png';

    // Construit le chemin d'une image : lien complet OU fichier du dossier projets/images/
    function cheminImage(image) {
        if (!image) return IMAGE_FALLBACK;
        return /^https?:\/\//.test(image) ? image : 'projets/images/' + image;
    }

    // Crée la carte HTML d'un projet
    function creerCarte(projet) {
        const card = document.createElement('article');
        card.className = 'project-card reveal';
        card.dataset.tags = (projet.tags || []).join('|').toLowerCase();

        const tagsHTML = (projet.tags || [])
            .map(t => `<span class="project-tag">${t}</span>`)
            .join('');

        const lienHTML = projet.lien
            ? `<a class="project-link" href="${projet.lien}" target="_blank" rel="noopener">
                   Voir le projet <i class="fas fa-arrow-right"></i>
               </a>`
            : '';

        card.innerHTML = `
            <div class="project-img">
                <img src="${cheminImage(projet.image)}" alt="${projet.titre || 'Projet'}"
                     loading="lazy" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}'">
            </div>
            <div class="project-info">
                <h3>${projet.titre || 'Projet sans titre'}</h3>
                <p>${projet.description || ''}</p>
                <div class="project-tags">${tagsHTML}</div>
                ${lienHTML}
            </div>`;
        return card;
    }

    // Affiche tous les projets
    function afficherProjets(liste) {
        if (!grid) return;
        grid.innerHTML = '';

        if (!Array.isArray(liste) || liste.length === 0) {
            grid.innerHTML = `<p class="projects-empty">Aucun projet à afficher pour le moment.</p>`;
            return;
        }
        liste.forEach(projet => grid.appendChild(creerCarte(projet)));
        observerReveal(); // (ré)active les animations sur les nouvelles cartes
    }

    // Construit la barre de filtres à partir de tous les tags existants
    function construireFiltres(liste) {
        if (!filterBar || !Array.isArray(liste) || liste.length === 0) return;

        const tags = new Set();
        liste.forEach(p => (p.tags || []).forEach(t => tags.add(t)));

        const boutons = ['Tous', ...Array.from(tags).sort((a, b) => a.localeCompare(b, 'fr'))];
        filterBar.innerHTML = boutons
            .map((t, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${i === 0 ? 'tous' : t.toLowerCase()}">${t}</button>`)
            .join('');

        filterBar.addEventListener('click', function (e) {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtre = btn.dataset.filter;
            grid.querySelectorAll('.project-card').forEach(card => {
                const match = filtre === 'tous' || card.dataset.tags.split('|').includes(filtre);
                card.style.display = match ? '' : 'none';
            });
        });
    }

    // On récupère les projets définis dans projets/projets.js
    const projets = (typeof PROJETS !== 'undefined') ? PROJETS : [];
    afficherProjets(projets);
    construireFiltres(projets);


    /* ---------------------------------------------------------------
       2) MENU MOBILE (bouton hamburger)
       --------------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const ouvert = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', ouvert);
            navToggle.querySelector('i').className = ouvert ? 'fas fa-times' : 'fas fa-bars';
        });
        // On referme le menu quand on clique sur un lien
        navLinks.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.querySelector('i').className = 'fas fa-bars';
            })
        );
    }


    /* ---------------------------------------------------------------
       3) NAVIGATION FLUIDE (défilement doux vers les sections)
       --------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        });
    });


    /* ---------------------------------------------------------------
       4) FORMULAIRE DE CONTACT (envoi via Formspree)
       --------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const button = this.querySelector('button');
            const labelBtn = button.innerText;

            button.disabled = true;
            button.innerText = 'Envoi en cours...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Message envoyé !',
                        text: 'Merci Mr/Mme, Ferdinand vous répondra dès que possible.',
                        icon: 'success',
                        confirmButtonColor: '#3498db',
                        background: '#ffffff',
                        timer: 3000
                    });
                    contactForm.reset();
                } else {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une petite panne technique... Réessayez dans un instant.',
                        icon: 'error',
                        confirmButtonColor: '#e74c3c'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Connexion perdue',
                    text: 'Vérifiez votre connexion internet avant de renvoyer.',
                    icon: 'warning',
                    confirmButtonColor: '#f39c12'
                });
            } finally {
                button.disabled = false;
                button.innerText = labelBtn;
            }
        });
    }


    /* ---------------------------------------------------------------
       5) LIEN ACTIF DANS LE MENU + BOUTON RETOUR EN HAUT
       --------------------------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.nav-links a');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        // Lien actif selon la section visible
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= (section.offsetTop - 120)) {
                current = section.getAttribute('id');
            }
        });
        menuLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });

        // Affichage du bouton retour en haut
        if (backToTop) {
            backToTop.classList.toggle('show', window.pageYOffset > 400);
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
        );
    }


    /* ---------------------------------------------------------------
       6) ANIMATIONS AU DÉFILEMENT (apparition en fondu)
       --------------------------------------------------------------- */
    function observerReveal() {
        const elements = document.querySelectorAll('.reveal:not(.visible)');
        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        elements.forEach(el => observer.observe(el));
    }
    observerReveal();

    // Année automatique dans le footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
