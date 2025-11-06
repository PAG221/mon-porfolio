// mobile menu
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuButton.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

// dark mode (localStorage)
const darkModeToggle = document.getElementById('darkModeToggle');
const darkIcon = document.getElementById('darkIcon');
const root = document.documentElement;

function enableDark(){
  root.style.setProperty('--bg','#0f1724');
  root.style.setProperty('--card','#111827');
  root.style.setProperty('--text','#f8fafc');
  root.style.setProperty('--muted','#cbd5e1');
  darkIcon.textContent = '🌞';
  localStorage.setItem('darkMode','enabled');
}
function disableDark(){
  root.style.setProperty('--bg','#f7f7fb');
  root.style.setProperty('--card','#fff');
  root.style.setProperty('--text','#1e1e2a');
  root.style.setProperty('--muted','#6b6b79');
  darkIcon.textContent = '🌙';
  localStorage.setItem('darkMode','disabled');
}
if(localStorage.getItem('darkMode')==='enabled'){
  enableDark();
} else if(localStorage.getItem('darkMode')==='disabled'){
  disableDark();
} else {
  // respect prefered scheme
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    enableDark();
  } else {
    disableDark();
  }
}
darkModeToggle.addEventListener('click', ()=>{
  if(localStorage.getItem('darkMode')==='enabled') disableDark(); else enableDark();
});

// smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      const offset = 72; // header space
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({top, behavior:'smooth'});
      // hide mobile menu after click
      if(!mobileMenu.classList.contains('hidden')){
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// simple intersection fade-in
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.section, .hero, .card').forEach(el=>{
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'all 600ms ease-out';
  io.observe(el);
});

// contact form (mock send)
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const spinner = document.getElementById('spinner');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

contactForm.addEventListener('submit', e=>{
  e.preventDefault();
  submitBtn.disabled = true;
  spinner.classList.remove('hidden');

  setTimeout(()=>{
    spinner.classList.add('hidden');
    submitBtn.disabled = false;
    formSuccess.classList.remove('hidden');
    formError.classList.add('hidden');
    contactForm.reset();
    setTimeout(()=> formSuccess.classList.add('hidden'), 4500);
  }, 1400);
});
