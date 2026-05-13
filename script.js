/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════════════ */

// ─── SCROLL REVEAL ────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

        setTimeout(() => {
          el.classList.add('in-view');
        }, delay);

        revealObserver.unobserve(el);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));


// ─── HEADER SCROLL SHADOW ─────────────────────────────────────
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


// ─── BACK TO TOP BUTTON ───────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ─── CONTACT FORM ─────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.form-btn');
  const successMsg = document.getElementById('formSuccess');

  btn.innerHTML = '<span>Sending…</span>';
  btn.disabled = true;

  fetch('https://formspree.io/f/xwvyzqzg', {  // ← paste your endpoint here
    method:  'POST',
    headers: { 'Accept': 'application/json' },
    body:    new FormData(form),
  })
  .then(res => {
    if (res.ok) {
      form.reset();
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    } else {
      alert('Something went wrong. Please try again.');
    }
  })
  .catch(() => alert('Network error. Please try again.'))
  .finally(() => {
    btn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    btn.disabled = false;
  });
}


// ─── PROJECT FILTER (projects.html) ──────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal if not already visible
          if (!card.classList.contains('in-view')) {
            setTimeout(() => card.classList.add('in-view'), 80);
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


// ─── SMOOTH ANCHOR SCROLLING ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── HERO PARALLAX (subtle) ───────────────────────────────────
const heroBgText = document.querySelector('.hero-bg-text');

if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.18}px))`;
  }, { passive: true });
}
