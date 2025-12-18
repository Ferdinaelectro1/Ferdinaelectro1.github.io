// Gestion des projets : charge src/data/projects.json et injecte des cartes
async function loadProjects(){
  try{
    const resp = await fetch('../src/data/projects.json');
    const data = await resp.json();
    const list = document.getElementById('projects-list') || document.getElementById('featured-cards');
    if(!list) return;
    list.innerHTML = '';
    data.projects.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `\n        <h3>${p.title}</h3>\n        <p>${p.short}</p>\n        <a href="../public/project-detail.html?id=${p.id}">Voir</a>\n      `;
      list.appendChild(card);
    });
  }catch(err){
    console.error('Impossible de charger les projets',err);
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
