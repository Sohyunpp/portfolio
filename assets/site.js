// Highlights the current section in the project table of contents.
(function(){
  var links=[].slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if(!links.length||!('IntersectionObserver' in window))return;
  var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  var visible={};
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){visible[e.target.id]=e.isIntersecting;});
    var ids=Object.keys(map), current=null;
    for(var i=0;i<ids.length;i++){if(visible[ids[i]]){current=ids[i];break;}}
    if(!current)return;
    links.forEach(function(a){a.classList.toggle('active',a===map[current]);});
  },{rootMargin:'-90px 0px -55% 0px'});
  Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el);});
  links[0].classList.add('active');
})();
