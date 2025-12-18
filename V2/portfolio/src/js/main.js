// JS global
document.addEventListener('DOMContentLoaded', ()=>{
  const y = new Date().getFullYear();
  const el = document.getElementById('year') || document.getElementById('copyright-year');
  if(el) el.textContent = y;

  // Exemple: prévenir la soumission du formulaire de contact (no backend)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Formulaire envoyé (simulé).');
      form.reset();
    });
  }
});
