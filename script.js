/* ═══════════════════════════════════════════════════════════════════
   ABHAV RAJIT NAIR — PORTFOLIO SCRIPT
   Interactions: Preloader · Cursor · Scroll · Timeline · Gallery · Form
═══════════════════════════════════════════════════════════════════ */

"use strict";

/* ─────────────────────────────────────────
   UTILITY
───────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/* ─────────────────────────────────────────
   PRELOADER
───────────────────────────────────────── */
(function initPreloader() {
  const preloader = qs('#preloader');
  const sealRing  = qs('.seal-ring');
  const sealRingI = qs('.seal-ring-inner');
  const sealText  = qs('.seal-text');
  const sealSub   = qs('.seal-subtext');
  const chars     = qsa('.pre-char');
  if (!preloader) return;

  document.body.classList.add('loading');

  // Animate SVG seal
  const tl = [
    () => { if (sealRing)  { sealRing.style.transition  = 'stroke-dashoffset 0.8s ease'; sealRing.style.strokeDashoffset  = '0'; } },
    () => { if (sealRingI) { sealRingI.style.transition = 'stroke-dashoffset 0.6s ease'; sealRingI.style.strokeDashoffset = '0'; } },
    () => { [sealText, sealSub].forEach(el => { if (el) { el.style.transition = 'opacity 0.5s ease'; el.style.opacity = '1'; } }); },
    () => {
      chars.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        }, i * 60);
      });
    },
    () => {
      setTimeout(() => {
        preloader.classList.add('done');
        document.body.classList.remove('loading');
        initSplitHeroReveal();
        initCounters();
      }, 400);
    }
  ];

  let t = 0;
  [100, 200, 500, 900, 1800].forEach((delay, i) => setTimeout(tl[i], delay + t));
})();

/* ─────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────── */
(function initCursor() {
  const dot  = qs('#cursor-dot');
  const ring = qs('#cursor-ring');
  if (!dot || !ring) return;

  // Only on devices with fine pointer
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mx = -100, my = -100, rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (!raf) raf = requestAnimationFrame(animateRing);
  });

  function animateRing() {
    raf = null;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    if (Math.abs(mx - rx) > 0.5 || Math.abs(my - ry) > 0.5) {
      raf = requestAnimationFrame(animateRing);
    }
  }

  // Cursor state changes
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  const hoverEls = 'a, button, .gallery-item, .skill-chip, .rail-dot, .glass-card, input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ─────────────────────────────────────────
   MAGNETIC BUTTONS
───────────────────────────────────────── */
function initMagneticButtons() {
  qsa('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.3;
      const dy     = (e.clientY - cy) * 0.3;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ─────────────────────────────────────────
   SPOTLIGHT CARD EFFECT
───────────────────────────────────────── */
function initSpotlightCards() {
  qsa('.spotlight-card').forEach(card => {
    const spotlight = qs('.card-spotlight', card);
    if (!spotlight) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.left = x + 'px';
      spotlight.style.top  = y + 'px';
    });
  });
}

/* ─────────────────────────────────────────
   HERO SPLIT TEXT REVEAL
───────────────────────────────────────── */
function initSplitHeroReveal() {
  const chars = qsa('.split-char');
  chars.forEach((c, i) => {
    setTimeout(() => {
      c.style.transition = `opacity 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)`;
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, i * 55);
  });

  // Fade-in hero elements
  const reveals = qsa('.hero-content .reveal-fade, .hero-content .reveal-up');
  reveals.forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400 + i * 150);
  });
}

/* ─────────────────────────────────────────
   NAVBAR — HIDE ON SCROLL DOWN
───────────────────────────────────────── */
(function initNavbar() {
  const navbar   = qs('#navbar');
  const toggle   = qs('#nav-toggle');
  const navLinks = qs('#nav-links');
  if (!navbar) return;

  let lastY = 0, ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 20);
        navbar.classList.toggle('hidden',   y > 200 && y > lastY + 30);
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  qsa('.nav-link, a[href^="#"]', navLinks).forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────── */
function initScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = clamp((window.scrollY / max) * 100, 0, 100) + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────
   SIDE RAIL NAV
───────────────────────────────────────── */
function initSideRail() {
  const dots    = qsa('.rail-dot');
  const fill    = qs('#rail-fill');
  const sections = dots.map(d => qs('#' + d.dataset.section)).filter(Boolean);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = qs('#' + dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  function update() {
    const y = window.scrollY + window.innerHeight * 0.4;
    let activeIdx = 0;
    sections.forEach((sec, i) => {
      if (sec && y >= sec.offsetTop) activeIdx = i;
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));

    if (fill && dots.length > 1) {
      const pct = (activeIdx / (dots.length - 1)) * 100;
      fill.style.height = pct + '%';
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─────────────────────────────────────────
   TIMELINE SCROLL-SYNCED SPINE FILL
───────────────────────────────────────── */
function initTimelineFill() {
  const spine = qs('#timeline-fill');
  const timeline = qs('#experience-timeline');
  if (!spine || !timeline) return;

  window.addEventListener('scroll', () => {
    const rect   = timeline.getBoundingClientRect();
    const wh     = window.innerHeight;
    const start  = rect.top  + window.scrollY - wh * 0.5;
    const end    = rect.bottom + window.scrollY - wh * 0.5;
    const scrolled = window.scrollY;
    const pct = clamp((scrolled - start) / (end - start) * 100, 0, 100);
    spine.style.height = pct + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────
   SCRAMBLE-STYLE STAT COUNTERS
───────────────────────────────────────── */
function initCounters() {
  const counters = qsa('[data-target]');
  const CHARS = '0123456789';

  function scramble(el, target, duration = 1200) {
    const start = performance.now();
    let raf;

    function tick(now) {
      const elapsed = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic

      if (progress < 1) {
        // Show scramble character most of the time, final digit at end
        const current = Math.floor(eased * target);
        const scrambleChar = progress < 0.8
          ? CHARS[Math.floor(Math.random() * CHARS.length)]
          : String(current);
        el.textContent = scrambleChar;
        raf = requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        cancelAnimationFrame(raf);
      }
    }
    raf = requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        scramble(el, parseInt(el.dataset.target, 10));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
───────────────────────────────────────── */
function initScrollReveal() {
  const els = qsa('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => {
    // Skip hero elements — handled by preloader callback
    if (!el.closest('.section-hero')) obs.observe(el);
  });
}

/* ─────────────────────────────────────────
   NETWORK CANVAS (HERO BG)
───────────────────────────────────────── */
function initNetworkCanvas() {
  const canvas = qs('#network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], animId;
  const COUNT = 60;
  const DIST  = 130;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - d / DIST)})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  createNodes();
  draw();

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas);

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
}

/* ─────────────────────────────────────────
   PHOTO GALLERY + LIGHTBOX
───────────────────────────────────────── */
function initGallery() {
  const gallery   = qs('#photo-gallery');
  const lightbox  = qs('#lightbox');
  const lbImg     = qs('#lightbox-img');
  const lbCaption = qs('#lightbox-caption');
  const lbClose   = qs('#lightbox-close');
  const lbPrev    = qs('#lightbox-prev');
  const lbNext    = qs('#lightbox-next');
  if (!gallery || !lightbox) return;

  const items = qsa('.gallery-item', gallery);
  let current = 0;

  function openLightbox(idx) {
    current = idx;
    const item = items[idx];
    const img = qs('img', item);
    if (!img || item.classList.contains('gallery-placeholder')) return;
    lbImg.src     = img.src;
    lbImg.alt     = img.alt;
    lbCaption.textContent = item.dataset.caption || img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbImg.focus?.();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    let next = current + dir;
    const validItems = items.filter(it => !it.classList.contains('gallery-placeholder'));
    const allIdxs = items.reduce((acc, it, i) => {
      if (!it.classList.contains('gallery-placeholder')) acc.push(i);
      return acc;
    }, []);
    const pos = allIdxs.indexOf(current);
    const newPos = (pos + dir + allIdxs.length) % allIdxs.length;
    openLightbox(allIdxs[newPos]);
  }

  items.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => navigate(-1));
  lbNext?.addEventListener('click', () => navigate(+1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(+1);
  });
}

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function initContactForm() {
  const form    = qs('#contact-form');
  if (!form) return;
  const btn     = qs('#submit-btn', form);
  const success = qs('#form-success', form);

  function validate() {
    let ok = true;
    const fields = [
      { id: 'name',    errId: 'error-name',    msg: 'Please enter your name.' },
      { id: 'email',   errId: 'error-email',   msg: 'Please enter a valid email.', type: 'email' },
      { id: 'subject', errId: 'error-subject', msg: 'Please enter a subject.' },
      { id: 'message', errId: 'error-message', msg: 'Please write a message.' }
    ];
    fields.forEach(({ id, errId, msg, type }) => {
      const input = qs('#' + id, form);
      const errEl = qs('#' + errId, form);
      const val   = input?.value.trim();
      let fieldOk = !!val;
      if (type === 'email' && val) fieldOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      input?.classList.toggle('error', !fieldOk);
      if (errEl) errEl.textContent = fieldOk ? '' : msg;
      if (!fieldOk) ok = false;
    });
    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    btn.disabled = true;
    const btnText = qs('.btn-text', btn);
    const btnIcon = qs('.btn-icon', btn);
    if (btnText) btnText.textContent = 'Sending…';
    if (btnIcon) btnIcon.className = 'fas fa-spinner fa-spin btn-icon';

    // Simulate async send — wire to your backend/EmailJS/Formspree here
    await new Promise(r => setTimeout(r, 1800));

    btn.disabled = false;
    if (btnText) btnText.textContent = 'Send Message';
    if (btnIcon) btnIcon.className = 'fas fa-paper-plane btn-icon';

    form.reset();
    success?.classList.add('visible');
    setTimeout(() => success?.classList.remove('visible'), 5000);
  });

  // Clear errors on input
  qsa('input, textarea', form).forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errEl = qs('#error-' + input.id, form);
      if (errEl) errEl.textContent = '';
    });
  });
}

/* ─────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────── */
function initBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─────────────────────────────────────────
   PORTRAIT TILT (on hover)
───────────────────────────────────────── */
function initPortraitTilt() {
  const portrait = qs('#hero-portrait');
  if (!portrait) return;
  portrait.addEventListener('mousemove', (e) => {
    const rect = portrait.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rx   = ((e.clientY - cy) / rect.height) * -12;
    const ry   = ((e.clientX - cx) / rect.width)  *  12;
    portrait.style.transform = `translateY(-40%) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  portrait.addEventListener('mouseleave', () => {
    portrait.style.transform = 'translateY(-40%)';
  });
}

/* ─────────────────────────────────────────
   SMOOTH ANCHOR SCROLLING
───────────────────────────────────────── */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = qs(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─────────────────────────────────────────
   IMAGE HELPER — portrait placeholder
───────────────────────────────────────── */
function initPortraitPlaceholder() {
  const img         = qs('#portrait-img');
  const placeholder = qs('#portrait-placeholder');
  if (!img || !placeholder) return;
  // Already handled by onerror in HTML; ensure placeholder visible if no src
  if (!img.src || img.src === window.location.href) {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  }
}

/* ─────────────────────────────────────────
   ACTIVE NAV LINK on scroll
───────────────────────────────────────── */
function initActiveNavLinks() {
  const sections = qsa('section[id]');
  const links    = qsa('.nav-link');

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    let active = '';
    sections.forEach(s => { if (y >= s.offsetTop) active = s.id; });
    links.forEach(l => {
      const href = l.getAttribute('href');
      l.classList.toggle('active', href === '#' + active);
    });
  }, { passive: true });
}

/* ─────────────────────────────────────────
   INIT ALL
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initSideRail();
  initMagneticButtons();
  initSpotlightCards();
  initScrollReveal();
  initTimelineFill();
  initNetworkCanvas();
  initGallery();
  initContactForm();
  initBackToTop();
  initPortraitTilt();
  initSmoothScroll();
  initPortraitPlaceholder();
  initActiveNavLinks();
});

// Ensure counters fire on window load too (in case preloader is instant)
window.addEventListener('load', () => {
  if (!qs('#preloader.done')) return; // handled by preloader
  initSplitHeroReveal();
  initCounters();
});
