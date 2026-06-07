// Main JS for portfolio interactions and animations
// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function(){
  AOS.init({duration:700, once:true, offset:80});
});

// Hide loader after window loads
window.addEventListener('load', function(){
  const loader = document.getElementById('loader');
  if(loader){
    loader.style.transition = 'opacity .4s ease';
    loader.style.opacity = '0';
    setTimeout(()=> loader.remove(), 500);
  }
});

// Smooth scroll and active nav highlighting using IntersectionObserver
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

const obsOptions = {root:null, rootMargin:'-40% 0px -40% 0px', threshold:0};
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
    }
  });
}, obsOptions);
sections.forEach(s=> observer.observe(s));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1 && document.querySelector(href)){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Scroll-to-top removed per user request (page ends at Contact)

// Reveal animations for elements with [data-reveal]
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target) }
  });
},{threshold:0.08});
revealEls.forEach(el=> revealObserver.observe(el));

// Small accessibility: close navbar collapse on link click (mobile)
document.querySelectorAll('.navbar-collapse .nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const bsCollapse = document.querySelector('.navbar-collapse');
    if(bsCollapse.classList.contains('show')){
      const collapse = bootstrap.Collapse.getInstance(bsCollapse) || new bootstrap.Collapse(bsCollapse);
      collapse.hide();
    }
  });
});

// End of file
