/**
 * Daffin TW - Portfolio JavaScript
 * Modern Interactive Showcase inspired by vannesanth.github.io
 */

(function () {
  'use strict';

  // Global state for lightbox
  let currentProject = null;
  let currentImageIndex = 0;

  // DOM Elements
  const projectsContainer = document.getElementById('projects-container');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalCounter = document.getElementById('modalCounter');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  // Accent color styles for category badges
  const categoryStyles = {
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
  };

  /**
   * Render Featured Projects
   */
  function renderProjects() {
    if (!projectsContainer || !window.PROJECTS) return;

    projectsContainer.innerHTML = window.PROJECTS.map(project => {
      const badgeStyle = categoryStyles[project.accentColor] || categoryStyles.indigo;
      const imagesHtml = project.images.map((img, idx) => `
        <div class="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 cursor-pointer aspect-[16/10]"
             onclick="openGalleryModal(${project.id}, ${idx})">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-sm">
            <i class="fa-solid fa-expand text-base text-indigo-400"></i>
            <span>View Fullscreen</span>
          </div>
        </div>
      `).join('');

      const techBadgesHtml = project.technologies.map(tech => `
        <span class="px-3 py-1 rounded-lg bg-slate-900 text-xs font-medium text-slate-300 border border-slate-800">${tech}</span>
      `).join('');

      const repoButtonHtml = project.repoUrl ? `
        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-indigo-500 text-xs font-semibold hover:text-white transition-all shadow-sm group/btn">
          <i class="fa-brands fa-github text-base text-indigo-400 group-hover/btn:text-white transition-colors"></i>
          <span>View Repository</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 ml-0.5"></i>
        </a>
      ` : `
        <span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/50 border border-slate-800/80 text-slate-500 text-xs font-medium">
          <i class="fa-solid fa-lock text-xs"></i>
          <span>Confidential / Internal Project</span>
        </span>
      `;

      return `
        <article class="glass-card rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-xl border border-slate-800/80 hover:border-indigo-500/40">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Description Column -->
            <div class="lg:col-span-5 space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-semibold ${badgeStyle}">
                <i class="${project.categoryIcon}"></i>
                <span>${project.category}</span>
              </div>
              
              <h3 class="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                ${project.title}
              </h3>

              <div class="text-slate-300 text-sm md:text-base leading-relaxed space-y-2">
                <p class="flex items-start gap-2.5">
                  <i class="fa-solid fa-circle-check text-indigo-400 mt-1 flex-shrink-0 text-sm"></i>
                  <span>${project.description}</span>
                </p>
              </div>

              <!-- Tools / Tags -->
              <div class="pt-2">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tools & Technologies:</p>
                <div class="flex flex-wrap gap-2">
                  ${techBadgesHtml}
                </div>
              </div>

              <!-- Repository Link / Status -->
              <div class="pt-2">
                ${repoButtonHtml}
              </div>
            </div>

            <!-- Screenshots Column (2 Images) -->
            <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${imagesHtml}
            </div>

          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Open Gallery Lightbox Modal
   */
  window.openGalleryModal = function (projectId, imageIndex) {
    const project = (window.PROJECTS || []).find(p => p.id === projectId);
    if (!project || !project.images || !project.images[imageIndex]) return;

    currentProject = project;
    currentImageIndex = imageIndex;
    updateModalContent();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Update content inside modal
   */
  function updateModalContent() {
    if (!currentProject || !currentProject.images) return;
    const imgData = currentProject.images[currentImageIndex];
    modalImg.src = imgData.src;
    modalCaption.textContent = imgData.caption || currentProject.title;
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
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modalImg.src = '';
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
   * Initialize on DOM Load
   */
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });

})();
