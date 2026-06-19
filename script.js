/**
 * =====================================================
 *  ASTROLOGER DURGA DEVI — Main Script  (FIXED v2)
 *  Vedic Temple Design | Sacred & Spiritual Theme
 * =====================================================
 *
 *  FIXES IN THIS VERSION
 *  ─────────────────────
 *  [FIX-1] AOS.init wrapped in try-catch so a CDN failure
 *          can never freeze the whole script.
 *          Added window 'load' AOS.refresh() so positions
 *          are recalculated after images / web-fonts land.
 *          Added 2-second safety-net: any [data-aos] element
 *          still invisible after 2 s is force-revealed.
 *  [FIX-2] All four Owl Carousel inits guarded behind a
 *          typeof $ / $.fn.owlCarousel check.
 *  [FIX-3] Card-tilt mouseleave: transition is now set
 *          BEFORE clearing the transform (not after), so
 *          the card actually eases back smoothly.
 *  [FIX-4] Scroll-progress-bar: guard against divide-by-zero
 *          on very short pages (total === 0).
 * =====================================================
 */

(function () {
  'use strict';

  /* =====================================================
     UTILITY HELPERS
     ===================================================== */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on  = (el, ev, fn, opts)    => el && el.addEventListener(ev, fn, opts);

  /* =====================================================
     1. AOS — ANIMATE ON SCROLL
     [FIX-1] try-catch + window.load refresh + 2 s safety net
     ===================================================== */
  try {
    AOS.init({
      duration : 750,
      easing   : 'ease-in-out',
      once     : true,
      mirror   : false,
      offset   : 0,          /* 0 = trigger the moment element enters viewport */
    });
  } catch (e) {
    /* AOS JS failed to load or threw — reveal all data-aos elements immediately */
    console.warn('[AOS] Init failed – force-revealing all animated elements.', e);
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.style.opacity    = '1';
      el.style.transform  = 'none';
      el.style.transition = 'none';
    });
  }

  /* Recalculate element offsets once all images + fonts have settled */
  window.addEventListener('load', function () {
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
  });

  /*
   * Safety net: if any [data-aos] element still lacks the .aos-animate
   * class after 2 s on the page, AOS silently missed it — force-reveal it.
   * (Does NOT affect elements below-the-fold that the user hasn't reached yet;
   *  those legitimately have no .aos-animate and will animate on scroll.)
   */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('[data-aos]').forEach(function (el) {
        if (!el.classList.contains('aos-animate')) {
          const rect = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom >= 0;
          if (inView) {
            /* Only force-reveal elements currently visible in the viewport */
            el.style.opacity    = '1';
            el.style.transform  = 'none';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          }
        }
      });
    }, 2000);
  });

  /* =====================================================
     2. OWL CAROUSEL — HERO CARDS
     [FIX-2] Defensive typeof guards around all carousels
     ===================================================== */
  if (typeof $ !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {

    $('.herotestimonials').owlCarousel({
      loop               : true,
      margin             : 22,
      nav                : true,
      dots               : true,
      autoplay           : true,
      autoplayTimeout    : 4200,
      autoplayHoverPause : true,
      smartSpeed         : 750,
      navText            : [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>',
      ],
      responsive : {
        0    : { items: 1 },
        576  : { items: 1 },
        768  : { items: 2 },
        1200 : { items: 3 },
      },
    });

    /* =====================================================
       3. OWL CAROUSEL — FEATURES
       ===================================================== */
    $('.features-carousel').owlCarousel({
      loop               : true,
      margin             : 22,
      nav                : true,
      dots               : true,
      autoplay           : true,
      autoplayTimeout    : 3600,
      autoplayHoverPause : true,
      smartSpeed         : 650,
      navText            : [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>',
      ],
      responsive : {
        0    : { items: 1 },
        576  : { items: 2 },
        992  : { items: 3 },
        1280 : { items: 4 },
      },
    });

    /* =====================================================
       4. OWL CAROUSEL — MORE SECTION
       ===================================================== */
    $('.more-carousel').owlCarousel({
      loop               : true,
      margin             : 22,
      nav                : false,
      dots               : true,
      autoplay           : true,
      autoplayTimeout    : 3200,
      autoplayHoverPause : true,
      smartSpeed         : 600,
      responsive : {
        0    : { items: 1 },
        576  : { items: 2 },
        992  : { items: 3 },
        1280 : { items: 4 },
      },
    });

    /* =====================================================
       5. OWL CAROUSEL — TESTIMONIALS
       ===================================================== */
    $('.testimonial-carousel').owlCarousel({
      loop               : true,
      margin             : 22,
      nav                : true,
      dots               : true,
      autoplay           : true,
      autoplayTimeout    : 4000,
      autoplayHoverPause : true,
      smartSpeed         : 700,
      navText            : [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>',
      ],
      responsive : {
        0    : { items: 1 },
        576  : { items: 2 },
        992  : { items: 3 },
      },
    });

  } else {
    console.warn('[Owl Carousel] jQuery or Owl Carousel is not loaded — carousels skipped.');
  }

  /* =====================================================
     6. POOJA VIDEOS — PLAY / PAUSE TOGGLE
     ===================================================== */
  qsa('.pooja-video-wrapper').forEach(wrapper => {
    const video = qs('.pooja-video', wrapper);
    const btn   = qs('.video-play-btn', wrapper);
    if (!video || !btn) return;

    const resetBtn = () => { btn.textContent = '▶'; btn.style.opacity = '1'; };
    const setPlay  = () => { btn.textContent = '⏸'; btn.style.opacity = '0.55'; };

    on(btn, 'click', () => {
      if (video.paused) {
        /* Pause every other video first */
        qsa('.pooja-video').forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
            const b = qs('.video-play-btn', v.closest('.pooja-video-wrapper'));
            if (b) { b.textContent = '▶'; b.style.opacity = '1'; }
          }
        });
        video.play().then(setPlay).catch(resetBtn);
      } else {
        video.pause();
        resetBtn();
      }
    });

    on(video, 'ended', resetBtn);
    on(video, 'pause', resetBtn);
    on(video, 'play',  setPlay);
  });

  /* Auto-pause when out of viewport */
  if ('IntersectionObserver' in window) {
    const vidObs = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting && !target.paused) {
          target.pause();
          const b = qs('.video-play-btn', target.closest('.pooja-video-wrapper'));
          if (b) { b.textContent = '▶'; b.style.opacity = '1'; }
        }
      });
    }, { threshold: 0.15 });

    qsa('.pooja-video').forEach(v => vidObs.observe(v));
  }

  /* =====================================================
     7. IMAGE LIGHTBOX
     ===================================================== */
  const lightbox    = qs('#image-lightbox');
  const lightboxImg = qs('#lightbox-img');

  const openLightbox = src => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
  };

  qsa('.pooja-img').forEach(img => on(img, 'click', () => openLightbox(img.src)));
  on(lightbox,  'click',   closeLightbox);
  on(document,  'keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* =====================================================
     8. SCROLL-TO-TOP BUTTON
     ===================================================== */
  const scrollTop = qs('#scroll-top');

  on(window, 'scroll', () => {
    if (!scrollTop) return;
    scrollTop.classList.toggle('active', window.scrollY > 450);
  }, { passive: true });

  on(scrollTop, 'click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =====================================================
     9. SMOOTH ANCHOR SCROLLING
     ===================================================== */
  const navbar = qs('.simple-navbar');

  qsa('a[href^="#"]').forEach(anchor => {
    on(anchor, 'click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = qs(id);
      if (!target) return;
      e.preventDefault();
      const offset = (navbar ? navbar.offsetHeight : 0) + 16;
      window.scrollTo({
        top      : target.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior : 'smooth',
      });
    });
  });

  /* =====================================================
     10. NAVBAR — SCROLL DEPTH SHADOW
     ===================================================== */
  on(window, 'scroll', () => {
    if (!navbar) return;
    navbar.style.boxShadow = window.scrollY > 80
      ? '0 8px 36px rgba(0,0,0,0.6)'
      : '0 4px 20px rgba(0,0,0,0.38)';
  }, { passive: true });

  /* =====================================================
     11. COUNTER ANIMATION — "MORE" SECTION NUMBERS
     ===================================================== */
  const animateCounter = el => {
    const raw    = el.textContent.trim();
    const suffix = raw.replace(/[\d,]/g, '');
    const target = parseInt(raw.replace(/\D/g, ''), 10);
    if (isNaN(target)) return;

    const duration = 1800;
    const start    = performance.now();
    const easeOut  = t => 1 - Math.pow(1 - t, 3);

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target).toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          animateCounter(target);
          counterObs.unobserve(target);
        }
      });
    }, { threshold: 0.6 });

    qsa('.more-content h5').forEach(h => counterObs.observe(h));
  }

  /* =====================================================
     12. GOLD SPARKLE PARTICLES — HERO SECTION
     ===================================================== */
  (function initSparkles() {
    const hero = qs('#hero');
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const TOTAL   = 28;
    const symbols = ['✦', '✧', '⋆', '✺', '❋', '✵'];

    for (let i = 0; i < TOTAL; i++) {
      const span       = document.createElement('span');
      span.className   = 'hero-sparkle';
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      Object.assign(span.style, {
        position      : 'absolute',
        left          : `${Math.random() * 100}%`,
        bottom        : '-1.5rem',
        fontSize      : `${0.55 + Math.random() * 0.85}rem`,
        color         : 'var(--c-gold-light)',
        opacity       : 0.18 + Math.random() * 0.45,
        pointerEvents : 'none',
        userSelect    : 'none',
        zIndex        : '1',
        animation     : `sparkle-rise ${5 + Math.random() * 7}s ${Math.random() * 8}s ease-in infinite`,
        willChange    : 'transform, opacity',
        textShadow    : '0 0 8px rgba(255,215,0,0.7)',
      });

      hero.appendChild(span);
    }

    if (!qs('#sparkle-style')) {
      const s = document.createElement('style');
      s.id = 'sparkle-style';
      s.textContent = `
        @keyframes sparkle-rise {
          0%   { transform: translateY(0)   rotate(0deg)   scale(1);    opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.35; }
          100% { transform: translateY(-110vh) rotate(360deg) scale(0.4); opacity: 0; }
        }
      `;
      document.head.appendChild(s);
    }
  })();

  /* =====================================================
     13. LAZY-LOAD IMAGES
     ===================================================== */
  if ('loading' in HTMLImageElement.prototype) {
    qsa('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
  } else if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          if (target.dataset.src) target.src = target.dataset.src;
          imgObs.unobserve(target);
        }
      });
    }, { rootMargin: '200px 0px' });

    qsa('img[loading="lazy"]').forEach(img => imgObs.observe(img));
  }

  /* =====================================================
     14. FIXED CONTACT BUTTONS — HIDE ON FOOTER OVERLAP
     ===================================================== */
  const cfButtons = qs('#contact-fixed');
  const footer    = qs('#footer');

  if (cfButtons && footer) {
    const cfObs = new IntersectionObserver(([entry]) => {
      cfButtons.style.opacity       = entry.isIntersecting ? '0' : '1';
      cfButtons.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.1 });

    cfObs.observe(footer);
  }

  /* =====================================================
     15. FOOTER ACTIVE-LINK HIGHLIGHT
     ===================================================== */
  const sections    = qsa('section[id], div[id]');
  const footerLinks = qsa('#footer .footer-links a[href^="#"]');

  if (footerLinks.length && sections.length) {
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        footerLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${target.id}` ? 'var(--c-gold)' : '';
        });
      });
    }, { threshold: 0.35 });

    sections.forEach(s => secObs.observe(s));
  }

  /* =====================================================
     16. ABOUT SECTION — TYPING TAGLINE EFFECT
     ===================================================== */
  (function typingTagline() {
    const lead = qs('#about .content .lead');
    if (!lead) return;

    const phrases = [
      'astrology is a powerful and sacred tool for understanding karma, destiny, and life purpose.',
      'each birth chart holds the map to your soul\'s true journey.',
      'planetary wisdom can light the path through love, work, and family challenges.',
      'spiritual guidance aligned with the stars brings clarity and inner peace.',
    ];

    const prefix  = 'She believes ';
    let pIdx = 0, cIdx = 0, deleting = false;

    const type = () => {
      const full    = phrases[pIdx];
      const visible = deleting ? full.substring(0, cIdx--) : full.substring(0, cIdx++);

      lead.innerHTML = `${prefix}<em>${visible}</em><span class="typing-cursor">|</span>`;

      let wait = deleting ? 35 : 55;

      if (!deleting && cIdx > full.length) {
        wait     = 2400;
        deleting = true;
      } else if (deleting && cIdx < 0) {
        deleting = false;
        pIdx     = (pIdx + 1) % phrases.length;
        cIdx     = 0;
        wait     = 400;
      }

      setTimeout(type, wait);
    };

    if (!qs('#typing-style')) {
      const s = document.createElement('style');
      s.id = 'typing-style';
      s.textContent = `
        .typing-cursor {
          display: inline-block;
          color: var(--c-saffron);
          font-weight: 400;
          animation: cursor-blink 0.7s step-end infinite;
          margin-left: 1px;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        #about .content .lead em {
          font-style: normal;
          color: var(--c-maroon);
          font-weight: 600;
        }
      `;
      document.head.appendChild(s);
    }

    if ('IntersectionObserver' in window) {
      const aboutObs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { type(); aboutObs.disconnect(); }
      }, { threshold: 0.4 });
      const aboutSec = qs('#about');
      if (aboutSec) aboutObs.observe(aboutSec);
    } else {
      type();
    }
  })();

  /* =====================================================
     17. CARD TILT — SUBTLE 3-D HOVER
     [FIX-3] transition set BEFORE transform reset in mouseleave
     ===================================================== */
  qsa('.member-card, .feature-card, .service-card').forEach(card => {
    on(card, 'mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 7;
      const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 7;
      card.style.transform = `perspective(700px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-5px)`;
    });

    on(card, 'mouseleave', () => {
      /* [FIX-3] transition MUST be applied before clearing the transform
         so the browser eases back smoothly instead of snapping */
      card.style.transition = 'transform 0.45s ease';
      card.style.transform  = '';
    });
  });

  /* =====================================================
     18. CALL BTN — RIPPLE EFFECT ON CLICK
     ===================================================== */
  qsa('.call-btn, .cta-btn, .btn-join').forEach(btn => {
    on(btn, 'click', function (e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 1.6;

      Object.assign(ripple.style, {
        position      : 'absolute',
        width         : `${size}px`,
        height        : `${size}px`,
        left          : `${e.clientX - rect.left - size / 2}px`,
        top           : `${e.clientY - rect.top  - size / 2}px`,
        background    : 'rgba(255,255,255,0.28)',
        borderRadius  : '50%',
        transform     : 'scale(0)',
        animation     : 'ripple-burst 0.6s linear',
        pointerEvents : 'none',
      });

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  if (!qs('#ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple-burst { to { transform: scale(1); opacity: 0; } }`;
    document.head.appendChild(s);
  }

  /* =====================================================
     19. WHATSAPP STICKY — LABEL CYCLE
     ===================================================== */
  (function waLabelCycle() {
    const waBtn = qs('.cf-wa .cf-text');
    if (!waBtn) return;
    const labels = ['WhatsApp', 'Chat Now', 'Free Advice', 'Talk to Devi'];
    let idx = 0;

    setInterval(() => {
      idx = (idx + 1) % labels.length;
      waBtn.style.transition = 'opacity 0.35s';
      waBtn.style.opacity    = '0';
      setTimeout(() => {
        waBtn.textContent   = labels[idx];
        waBtn.style.opacity = '1';
      }, 360);
    }, 3500);
  })();

  /* =====================================================
     20. SCROLL PROGRESS BAR
     [FIX-4] guard against divide-by-zero on short pages
     ===================================================== */
  (function scrollProgressBar() {
    const bar = document.createElement('div');
    Object.assign(bar.style, {
      position      : 'fixed',
      top           : '0',
      left          : '0',
      width         : '0%',
      height        : '3px',
      background    : 'linear-gradient(90deg, var(--c-gold), var(--c-saffron), var(--c-gold))',
      zIndex        : '9999',
      transition    : 'width 0.1s linear',
      pointerEvents : 'none',
    });
    document.body.prepend(bar);

    on(window, 'scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      /* [FIX-4] avoid NaN when total is 0 */
      bar.style.width = total > 0
        ? `${Math.min((scrolled / total) * 100, 100)}%`
        : '0%';
    }, { passive: true });
  })();

})();

/**
 * =====================================================
 *  NEW SECTIONS — JavaScript
 *
 *  HOW TO ADD THIS:
 *  In your HTML, paste this ONE line right after your
 *  existing <script src="script.js"></script> tag:
 *
 *     <script src="new-sections.js"></script>
 *
 *  Covers:
 *    1. FAQ accordion (smooth height animation)
 *    2. Lead capture form (validates + opens WhatsApp)
 * =====================================================
 */

(function () {
  'use strict';

  /* =====================================================
     1. FAQ ACCORDION
     ===================================================== */

  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn    = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    var inner  = item.querySelector('.faq-a-inner');

    if (!btn || !answer || !inner) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      /* ── Close every other open item first ── */
      faqItems.forEach(function (other) {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.height = '0';
        }
      });

      /* ── Toggle the clicked item ── */
      if (isOpen) {
        /* Closing */
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.height = '0';
      } else {
        /* Opening — read the real content height first */
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.height = inner.scrollHeight + 'px';
      }
    });
  });


  /* =====================================================
     2. LEAD CAPTURE FORM — WhatsApp submit
     ===================================================== */

  var submitBtn = document.getElementById('cf-submit-btn');
  var successEl = document.getElementById('cf-success');
  var errorEl   = document.getElementById('cf-error');

  if (!submitBtn) return; /* form not on this page — bail */

  submitBtn.addEventListener('click', function () {

    /* ── Read values ── */
    var nameVal    = (document.getElementById('cf-name').value    || '').trim();
    var phoneVal   = (document.getElementById('cf-phone').value   || '').trim();
    var problemVal = (document.getElementById('cf-problem').value || '').trim();
    var msgVal     = (document.getElementById('cf-message').value || '').trim();

    /* ── Hide previous feedback ── */
    successEl.style.display = 'none';
    errorEl.style.display   = 'none';

    /* ── Validate ── */
    var digits = phoneVal.replace(/\D/g, '');
    if (!nameVal || digits.length < 10) {
      errorEl.style.display = 'block';
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* ── Build WhatsApp pre-filled message ── */
    var waText  = 'Namaste Durga Devi Ji \uD83D\uDE4F\n\n';
    waText += 'Name:    ' + nameVal  + '\n';
    waText += 'Phone:   ' + phoneVal + '\n';
    if (problemVal) { waText += 'Concern: ' + problemVal + '\n'; }
    if (msgVal)     { waText += 'Message: ' + msgVal     + '\n'; }
    waText += '\nKindly guide me. \uD83D\uDE4F';

    var waURL = 'https://wa.me/919216413727?text=' + encodeURIComponent(waText);

    /* ── Fire Google Ads conversion (if available) ── */
    if (typeof gtag_report_conversion === 'function') {
      gtag_report_conversion(waURL);
    }

    /* ── Open WhatsApp ── */
    window.open(waURL, '_blank', 'noopener,noreferrer');

    /* ── Show success & reset form ── */
    successEl.style.display = 'block';
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    document.getElementById('cf-name').value    = '';
    document.getElementById('cf-phone').value   = '';
    document.getElementById('cf-problem').value = '';
    document.getElementById('cf-message').value = '';
  });

  /* ── Clear error message as soon as user starts typing ── */
  ['cf-name', 'cf-phone'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        if (errorEl) errorEl.style.display = 'none';
      });
    }
  });

})();