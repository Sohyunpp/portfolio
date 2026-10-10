document.addEventListener('DOMContentLoaded',function(){
  var group=document.querySelector('.project-filters');
  var cards=[].slice.call(document.querySelectorAll('#projects .project-card'));
  var status=document.querySelector('#filter-status');
  if(!group||!cards.length)return;
  group.addEventListener('click',function(event){
    var button=event.target.closest('button[data-filter]');
    if(!button||!group.contains(button))return;
    var selected=button.dataset.filter,count=0;
    cards.forEach(function(card){
      var show=selected==='all'||(card.dataset.capabilities||'').split(/\s+/).indexOf(selected)>-1;
      card.hidden=!show;if(show)count++;
    });
    group.querySelectorAll('button[data-filter]').forEach(function(item){
      var active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));
    });
    if(status)status.textContent=selected==='all'?'전체 프로젝트 '+count+'개 표시':(button.dataset.label||'')+' 관련 프로젝트 '+count+'개 표시';
  });
});
