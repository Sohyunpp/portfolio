document.addEventListener('DOMContentLoaded', function () {
 const group=document.querySelector('.project-filters');
 const cards=[...document.querySelectorAll('#projects .project-card')];
 const status=document.getElementById('filter-status');
 if(!group||cards.length===0)return;
 function show(filter){
  let count=0;
  cards.forEach(card=>{let active=filter==='all'||(card.dataset.capabilities||'').split(/\s+/).includes(filter);card.hidden=!active;if(active)count++;});
  group.querySelectorAll('button[data-filter]').forEach(b=>{const isActive=b.dataset.filter===filter;b.classList.toggle('is-active',isActive);b.setAttribute('aria-pressed',String(isActive));});
  if(status){const btn=group.querySelector('button[data-filter="'+filter+'"]');status.textContent=(filter==='all'?'전체 프로젝트':(btn?.dataset.label||'선택한 역량'))+' '+count+'개 표시';}
 }
 group.addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(b&&group.contains(b))show(b.dataset.filter);});
 show('all');
});