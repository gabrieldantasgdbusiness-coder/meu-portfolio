/* ════════════════════════════════════════════
   Gabriel Dantas — Star Tech Portfolio
   ════════════════════════════════════════════ */

/* ── STARFIELD ── */
(function () {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeStar() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.18 + 0.03,
      op:    Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: 220 }, makeStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() / 1000;

    for (const s of stars) {
      const alpha = s.op * (0.6 + 0.4 * Math.sin(t * 1.2 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(175, 215, 255, ${alpha})`;
      ctx.fill();

      s.y += s.speed;
      if (s.y > H + 4) {
        s.y = -4;
        s.x = Math.random() * W;
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();


/* ── BURGER / MOBILE NAV ── */
(function () {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('main-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
})();


/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ── HEADER SCROLL OPACITY ── */
(function () {
  const hd = document.getElementById('site-header');
  if (!hd) return;
  window.addEventListener('scroll', () => {
    hd.style.background = window.scrollY > 50
      ? 'rgba(8,12,24,0.97)'
      : 'rgba(8,12,24,0.82)';
  }, { passive: true });
})();


/* ── ACTIVE NAV LINK on scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('#main-nav a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`#main-nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ── SCROLL REVEAL ── */
(function () {
  const targets = document.querySelectorAll(
    '.srv-card, .sk-card, .proj-card, .num-card, .ct-card, ' +
    '.sobre-body, .sobre-nums, .hero-text, .hero-visual'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
})();
