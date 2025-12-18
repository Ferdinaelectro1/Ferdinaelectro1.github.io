// Effets visuels simples
function fadeIn(el, ms=300){
  el.style.opacity = 0;
  el.style.transition = `opacity ${ms}ms ease-out`;
  requestAnimationFrame(()=>el.style.opacity = 1);
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.project-card').forEach(el=>fadeIn(el,400));
});
