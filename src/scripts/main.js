/**
 * Daffin Tanjiro Widison - Portfolio JavaScript
 * Modern Interactive Showcase inspired by vannesanth.github.io
 */

(function () {
  'use strict';

  // Global state for lightbox
  let currentProject = null;
  let currentImageIndex = 0;

  // DOM Elements
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalCounter = document.getElementById('modalCounter');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  /**
   * Open Gallery Lightbox Modal
   */
  window.openGalleryModal = function (projectId, imageIndex) {
    const project = (window.PROJECTS || []).find(p => p.id === projectId);
    if (!project || !project.images || !project.images[imageIndex]) return;

    currentProject = project;
    currentImageIndex = imageIndex;
    updateModalContent();

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    document.body.style.overflow = 'hidden';
  };

  /**
   * Update content inside modal
   */
  function updateModalContent() {
    if (!currentProject || !currentProject.images) return;
    const imgData = currentProject.images[currentImageIndex];
    if (modalImg) modalImg.src = imgData.src;
    if (modalCaption) modalCaption.textContent = imgData.caption || currentProject.title;
    if (modalCounter) {
      modalCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;
    }
  }

  /**
   * Navigate Gallery (Previous / Next)
   */
  window.navigateGallery = function (direction) {
    if (!currentProject || !currentProject.images) return;
    const total = currentProject.images.length;
    currentImageIndex = (currentImageIndex + direction + total) % total;
    updateModalContent();
  };

  /**
   * Close Gallery Lightbox Modal
   */
  window.closeGalleryModal = function (e) {
    if (e && e.target !== modal && !e.target.closest('#modalCloseBtn')) return;
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    if (modalImg) modalImg.src = '';
    currentProject = null;
    document.body.style.overflow = 'auto';
  };

  /**
   * Mobile menu toggle
   */
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /**
   * Keyboard Navigation
   */
  document.addEventListener('keydown', function (e) {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        window.closeGalleryModal();
      } else if (e.key === 'ArrowLeft') {
        window.navigateGallery(-1);
      } else if (e.key === 'ArrowRight') {
        window.navigateGallery(1);
      }
    }
  });

  /**
   * Initialize safe DOM operations
   */
  function init() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
