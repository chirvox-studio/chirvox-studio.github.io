// ─── MARK JS AS READY (enables scroll-reveal animation in CSS) ───
// This runs immediately — content stays visible until JS confirms it can animate
document.documentElement.classList.add('js-ready');

// ─── NAV SCROLL EFFECT ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ─── MOBILE MENU ───
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const btn   = document.getElementById('hamburger');
  links.classList.toggle('open');
  btn.classList.toggle('open');
}
// Close mobile menu when any link is clicked
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

// ─── SCROLL REVEAL (with stagger) ───
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  // Fallback: mark all visible immediately if IntersectionObserver not supported
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// ─── ACTIVE NAV HIGHLIGHTING ───
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const top    = section.offsetTop - 90;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) link.style.color = (scrollY >= top && scrollY < bottom) ? 'var(--gold-light)' : '';
    });
  });
}