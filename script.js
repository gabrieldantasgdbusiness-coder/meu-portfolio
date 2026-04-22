/* Gabriel Dantas — Star Tech Portfolio */

// ── SCROLL REVEAL ──
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


// ── NAV SCROLL EFFECT ──
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 48) {
      nav.style.borderBottomColor = '#2a2a2a';
      nav.style.background = 'rgba(14,14,14,0.97)';
    } else {
      nav.style.borderBottomColor = '#222222';
      nav.style.background = 'rgba(14,14,14,0.88)';
    }
  }, { passive: true });
})();


// ── BURGER MENU ──
(function () {
  const burger = document.getElementById('burger');
  const links  = document.getElementById('nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();


// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ── ACTIVE NAV LINK ──
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.color = '#F5A623';
        }
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
})();
