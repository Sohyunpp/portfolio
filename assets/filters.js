
document.addEventListener('DOMContentLoaded',function(){
 const cards=Array.from(document.querySelectorAll('#projects .project-card'));
 const group=document.querySelector('.project-filters'),status=document.getElementById('filter-status'),toggle=document.getElementById('project-toggle');
 let selected='all',expanded=false;
 function renderCards(){
   let count=0;
   cards.forEach(card=>{
     const match=selected==='all'||(card.dataset.capabilities||'').split(/\s+/).includes(selected);
     const show=match&&(selected!=='all'||expanded||card.dataset.featured==='true');
     card.hidden=!show; if(show)count++;
   });
   if(toggle){toggle.hidden=selected!=='all';toggle.textContent=expanded?'대표 6개만 보기':'전체 9개 프로젝트 보기';toggle.setAttribute('aria-expanded',String(expanded));}
   if(status){const b=group&&group.querySelector('[data-filter="'+selected+'"]');
     status.textContent=selected==='all'?(expanded?'전체 프로젝트 9개 표시':'대표 프로젝트 6개 표시 (전체 9개)'):((b&&b.dataset.label)||'선택한 역량')+' 관련 프로젝트 '+count+'개 표시';
   }
 }
 if(group&&cards.length){
   group.addEventListener('click',event=>{
     const b=event.target.closest('button[data-filter]'); if(!b||!group.contains(b))return;
     selected=b.dataset.filter;
     group.querySelectorAll('button[data-filter]').forEach(x=>{const on=x===b;x.classList.toggle('is-active',on);x.setAttribute('aria-pressed',String(on));});
     renderCards();
   });
   if(toggle)toggle.addEventListener('click',()=>{expanded=!expanded;renderCards();});
   renderCards();
 }
 const pub=document.getElementById('publications'), pubToggle=document.getElementById('publication-toggle');
 if(pub&&pubToggle){
   const items=Array.from(pub.querySelectorAll('.publication-list li'));
   const lists=pub.querySelectorAll('.publication-list'),heads=pub.querySelectorAll('.publication-group-heading');
   let full=false;
   function renderPubs(){
     items.forEach(item=>{item.hidden=!full&&item.dataset.featured!=='true'});
     if(lists[1])lists[1].hidden=!full;
     if(heads[1])heads[1].hidden=!full;
     if(heads[0]){let t=heads[0].lastChild;if(t&&t.nodeType===3)t.textContent=full?'국제학술논문 5편':'주요 국제학술논문 3편';}
     pubToggle.textContent=full?'대표 논문 3편만 보기':'전체 논문 15편 보기';
     pubToggle.setAttribute('aria-expanded',String(full));
   }
   pubToggle.addEventListener('click',()=>{full=!full;renderPubs();});
   renderPubs();
 }
});