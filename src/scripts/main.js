/* =====================================================
   main.js — Portfolio JavaScript
   ===================================================== */

(function () {
  'use strict';

  /* ==========================================
     GLOBALS & HELPERS
     ========================================== */
  const CONFIG = window.SITE_CONFIG || {};
  const PROJECTS = window.PROJECTS || [];

  function qs(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  function qsa(selector, parent) {
    return Array.from((parent || document).querySelectorAll(selector));
  }

  /* ==========================================
     NAVIGATION
     ========================================== */
  function initNav() {
    const navbar   = qs('#navbar');
    const toggle   = qs('#nav-toggle');
    const links    = qs('#nav-links');
    const navLinks = qsa('.nav-link', links);

    // Hamburger toggle
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') &&
          !navbar.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Active section highlighting
    const sections = qsa('section[id]');

    function updateActiveLink() {
      let current = '';
      const scrollY = window.scrollY;

      sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (scrollY >= top) current = sec.id;
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === '#' + current);
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  /* ==========================================
     PROJECTS — RENDER CARDS
     ========================================== */
  function renderProjects() {
    const grid = qs('#projects-grid');
    if (!grid || !PROJECTS.length) return;

    grid.innerHTML = '';

    PROJECTS.forEach((project) => {
      const numStr = String(project.id).padStart(2, '0');
      const techHTML = project.technologies
        .map(t => `<span class="tech-tag">${escHtml(t)}</span>`)
        .join('');

      const img1 = project.images[0] || '';
      const img2 = project.images[1] || '';

      const card = document.createElement('article');
      card.className = 'project-card reveal';
      card.innerHTML = `
        <span class="project-number">${numStr}</span>
        <h3 class="project-title">${escHtml(project.title)}</h3>
        <p class="project-description">${escHtml(project.description)}</p>
        <div class="project-tech">${techHTML}</div>
        <div class="project-screenshots">
          <div class="screenshot-thumb" role="button" tabindex="0"
               aria-label="View screenshot 1 of ${escHtml(project.title)}"
               data-images='${JSON.stringify(project.images)}'
               data-index="0">
            <img src="${escHtml(img1)}"
                 alt="Screenshot 1 of ${escHtml(project.title)}"
                 loading="lazy">
          </div>
          <div class="screenshot-thumb" role="button" tabindex="0"
               aria-label="View screenshot 2 of ${escHtml(project.title)}"
               data-images='${JSON.stringify(project.images)}'
               data-index="1">
            <img src="${escHtml(img2)}"
                 alt="Screenshot 2 of ${escHtml(project.title)}"
                 loading="lazy">
          </div>
        </div>
        <div class="project-actions">
          <button class="btn btn-ghost btn-view-screenshots"
                  data-images='${JSON.stringify(project.images)}'
                  data-index="0"
                  aria-label="View screenshots for ${escHtml(project.title)}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>
            </svg>
            View Screenshots
          </button>
          <button class="btn btn-outline btn-view-details"
                  data-project-id="${project.id}"
                  aria-label="View details for ${escHtml(project.title)}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            View Details
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach listeners to screenshot thumbs
    qsa('.screenshot-thumb').forEach(thumb => {
      const openLightbox = () => {
        const images = JSON.parse(thumb.dataset.images);
        const index  = parseInt(thumb.dataset.index, 10);
        showLightbox(images, index);
      };
      thumb.addEventListener('click', openLightbox);
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });

    // Attach listeners to "View Screenshots" buttons
    qsa('.btn-view-screenshots').forEach(btn => {
      btn.addEventListener('click', () => {
        const images = JSON.parse(btn.dataset.images);
        showLightbox(images, 0);
      });
    });

    // Attach listeners to "View Details" buttons
    qsa('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const id      = parseInt(btn.dataset.projectId, 10);
        const project = PROJECTS.find(p => p.id === id);
        if (project) showModal(project);
      });
    });
  }

  /* ==========================================
     LIGHTBOX
     ========================================== */
  let lightboxImages = [];
  let lightboxIndex  = 0;

  const lightboxOverlay = qs('#lightbox-overlay');
  const lightboxImg     = qs('#lightbox-img');
  const lightboxCounter = qs('#lightbox-counter');
  const lightboxPrev    = qs('#lightbox-prev');
  const lightboxNext    = qs('#lightbox-next');
  const lightboxClose   = qs('#lightbox-close');

  function showLightbox(images, index) {
    lightboxImages = images;
    lightboxIndex  = index;
    updateLightbox();
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function hideLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const src = lightboxImages[lightboxIndex] || '';
    lightboxImg.src = src;
    lightboxImg.alt = `Screenshot ${lightboxIndex + 1} of ${lightboxImages.length}`;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    }
    if (lightboxPrev) lightboxPrev.disabled = lightboxImages.length <= 1;
    if (lightboxNext) lightboxNext.disabled = lightboxImages.length <= 1;
  }

  function lightboxPrevImg() {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  }

  function lightboxNextImg() {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  }

  function initLightbox() {
    if (!lightboxOverlay) return;

    lightboxClose.addEventListener('click', hideLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevImg);
    if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextImg);

    // Close on overlay click
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) hideLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxOverlay.classList.contains('active')) return;
      if (e.key === 'Escape')      hideLightbox();
      if (e.key === 'ArrowLeft')   lightboxPrevImg();
      if (e.key === 'ArrowRight')  lightboxNextImg();
    });
  }

  /* ==========================================
     PROJECT MODAL
     ========================================== */
  const modalOverlay = qs('#modal-overlay');
  const modalBox     = qs('#modal-box');

  function showModal(project) {
    if (!modalOverlay || !modalBox) return;

    const numStr   = String(project.id).padStart(2, '0');
    const techHTML = project.technologies
      .map(t => `<span class="tech-tag">${escHtml(t)}</span>`)
      .join('');

    const img1 = project.images[0] || '';
    const img2 = project.images[1] || '';

    modalBox.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-number">PROJECT ${numStr}</div>
          <h2 class="modal-title">${escHtml(project.title)}</h2>
        </div>
        <button class="modal-close" id="modal-close-btn" aria-label="Close modal">&#x2715;</button>
      </div>
      <div class="modal-body">
        <div>
          <div class="modal-label">Description</div>
          <p class="modal-desc">${escHtml(project.description)}</p>
        </div>
        <div>
          <div class="modal-label">Technologies</div>
          <div class="modal-tech">${techHTML}</div>
        </div>
        <div>
          <div class="modal-label">Screenshots</div>
          <div class="modal-screenshots">
            <div class="modal-screenshot" role="button" tabindex="0"
                 aria-label="View screenshot 1 in lightbox"
                 data-images='${JSON.stringify(project.images)}' data-index="0">
              <img src="${escHtml(img1)}"
                   alt="Screenshot 1 of ${escHtml(project.title)}"
                   loading="lazy">
            </div>
            <div class="modal-screenshot" role="button" tabindex="0"
                 aria-label="View screenshot 2 in lightbox"
                 data-images='${JSON.stringify(project.images)}' data-index="1">
              <img src="${escHtml(img2)}"
                   alt="Screenshot 2 of ${escHtml(project.title)}"
                   loading="lazy">
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach close listener
    qs('#modal-close-btn', modalBox).addEventListener('click', hideModal);

    // Attach screenshot click listeners inside modal
    qsa('.modal-screenshot', modalBox).forEach(thumb => {
      const open = () => {
        const images = JSON.parse(thumb.dataset.images);
        const index  = parseInt(thumb.dataset.index, 10);
        showLightbox(images, index);
      };
      thumb.addEventListener('click', open);
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    qs('#modal-close-btn', modalBox).focus();
  }

  function hideModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initModal() {
    if (!modalOverlay) return;
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) hideModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        hideModal();
      }
    });
  }

  /* ==========================================
     SCROLL REVEAL
     ========================================== */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    qsa('.reveal').forEach(el => observer.observe(el));
  }

  /* ==========================================
     FOOTER YEAR
     ========================================== */
  function initFooterYear() {
    const el = qs('#footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ==========================================
     CONTACT — hide email if not set
     ========================================== */
  function initContactButtons() {
    const emailBtn = qs('#contact-email-btn');
    if (emailBtn) {
      const email = (CONFIG.email || '').trim();
      if (email) {
        emailBtn.href = `mailto:${email}`;
        emailBtn.style.display = 'inline-flex';
      } else {
        emailBtn.style.display = 'none';
      }
    }
  }

  /* ==========================================
     UTILITY
     ========================================== */
  function escHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ==========================================
     INIT
     ========================================== */
  function init() {
    renderProjects();
    initNav();
    initLightbox();
    initModal();
    initScrollReveal();
    initFooterYear();
    initContactButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
