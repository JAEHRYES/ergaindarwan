
/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════════════ */

// ─── SCROLL REVEAL ────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay
          ? parseInt(el.dataset.delay, 10)
          : 0;

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

// Observe existing and dynamically created reveal elements
function observeRevealElements(root = document) {
  if (root.matches && root.matches('.reveal')) {
    revealObserver.observe(root);
  }

  if (root.querySelectorAll) {
    root.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  }
}

// Initial elements
observeRevealElements();

// Detect elements added later (e.g. photography gallery)
const revealMutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        observeRevealElements(node);
      }
    });
  });
});

revealMutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
});


// ─── HEADER SCROLL SHADOW ─────────────────────────────────────

const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}


// ─── BACK TO TOP BUTTON ───────────────────────────────────────

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ─── CONTACT FORM ─────────────────────────────────────────────

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('.form-btn');
  const successMsg = document.getElementById('formSuccess');

  if (!btn) return;

  btn.innerHTML = '<span>Sending…</span>';
  btn.disabled = true;

  fetch('https://formspree.io/f/xwvyzqzg', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form),
  })
    .then((res) => {
      if (res.ok) {
        form.reset();

        if (successMsg) {
          successMsg.classList.add('show');
          setTimeout(() => {
            successMsg.classList.remove('show');
          }, 5000);
        }
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(() => {
      alert('Network error. Please try again.');
    })
    .finally(() => {
      btn.innerHTML = `
        <span>Send Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      `;
      btn.disabled = false;
    });
}


// ─── PROJECT FILTER ───────────────────────────────────────────

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');

          if (!card.classList.contains('in-view')) {
            setTimeout(() => {
              card.classList.add('in-view');
            }, 80);
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
    const href = anchor.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});


// ─── HERO PARALLAX ────────────────────────────────────────────

const heroBgText = document.querySelector('.hero-bg-text');

if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    heroBgText.style.transform =
      `translate(-50%, calc(-50% + ${scrollY * 0.18}px))`;
  }, { passive: true });
}
