// Filtrage simple par tag (ex: électronique, C++)
function applyFilter(tag){
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(c=>{
    if(!tag || c.textContent.toLowerCase().includes(tag.toLowerCase())) c.style.display='block';
    else c.style.display='none';
  });
}

// Exemple d'utilisation: applyFilter('C++')
