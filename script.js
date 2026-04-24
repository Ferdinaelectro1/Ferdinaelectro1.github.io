        // Navigation fluide
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
        
        // Formulaire de contact avec envoi réel
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const button = this.querySelector('button');
            
            // On désactive le bouton pour éviter les envois multiples
            button.disabled = true;
            button.innerText = "Envoi en cours...";

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Popup de succès stylée
                    Swal.fire({
                        title: 'Message envoyé !',
                        text: 'Merci Ferdinand, je vous répondrai dès que possible.',
                        icon: 'success',
                        confirmButtonColor: '#007bff', // Ton bleu primaire
                        background: '#ffffff',
                        timer: 3000
                    });
                    contactForm.reset();
                } else {
                    // Popup d'erreur serveur
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une petite panne technique... Réessayez dans un instant.',
                        icon: 'error',
                        confirmButtonColor: '#dc3545'
                    });
                }
            } catch (error) {
                // Popup d'erreur réseau
                Swal.fire({
                    title: 'Connexion perdue',
                    text: 'Vérifiez votre connexion internet avant de renvoyer.',
                    icon: 'warning',
                    confirmButtonColor: '#ffc107'
                });
            } finally {
                button.disabled = false;
                button.innerText = "Envoyer le message";
            }
        });
        
        // Animation au défilement
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });