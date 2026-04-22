/* G&D Tech — Star Tech Portfolio */

// ===== STARFIELD =====
(function () {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 200;
    const stars = Array.from({ length: STAR_COUNT }, () => createStar());

    function createStar() {
        return {
            x:       Math.random() * canvas.width,
            y:       Math.random() * canvas.height,
            r:       Math.random() * 1.4 + 0.3,
            speed:   Math.random() * 0.25 + 0.04,
            opacity: Math.random() * 0.65 + 0.25,
            phase:   Math.random() * Math.PI * 2,
        };
    }

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const t = Date.now() / 1000;

        stars.forEach(s => {
            const op = s.opacity * (0.65 + 0.35 * Math.sin(t * 1.4 + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 215, 255, ${op})`;
            ctx.fill();

            s.y += s.speed;
            if (s.y > canvas.height + 4) {
                s.y = -4;
                s.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(tick);
    }
    tick();
})();

// ===== MOBILE NAV TOGGLE =====
(function () {
    const toggle = document.getElementById('navToggle');
    const nav    = document.querySelector('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (nav.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.querySelector('i').className = 'fas fa-bars';
        });
    });
})();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== HEADER SCROLL SHADOW =====
(function () {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.background = 'rgba(5, 8, 15, 0.96)';
        } else {
            header.style.background = 'rgba(5, 8, 15, 0.80)';
        }
    }, { passive: true });
})();

// ===== SCROLL REVEAL (fade-in on scroll) =====
(function () {
    const items = document.querySelectorAll(
        '.servico-card, .skill-card, .project-card, .stat-card, .contact-card'
    );

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        obs.observe(el);
    });
})();
