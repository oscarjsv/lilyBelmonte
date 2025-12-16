// Treatment Pages - Premium Interactions
// Lily Belmonte Editorial Vogue Experience

// ========================================
// PARALLAX HERO EFFECT
// ========================================
function initHeroParallax() {
  const hero = document.querySelector(".page-header");
  if (!hero) return;

  let scrollY = 0;
  let ticking = false;

  function updateParallax() {
    const heroImage = hero.querySelector(".page-header__image");
    if (heroImage) {
      heroImage.style.transform = `scale(1.08) translateY(${scrollY * 0.5}px)`;
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    scrollY = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// ========================================
// CATEGORY FILTERS
// ========================================
function initFilters() {
  const filters = document.querySelectorAll(".filter-pill");
  const cards = document.querySelectorAll(".treatment-card");

  if (!filters.length || !cards.length) return;

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.category;

      // Update active state
      filters.forEach((f) => f.classList.remove("is-active"));
      filter.classList.add("is-active");

      // Filter cards with animation
      cards.forEach((card, index) => {
        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
          card.style.display = "";
          card.style.animation = `fadeInUp 0.6s var(--ease-out-expo) ${
            index * 0.05
          }s backwards`;
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ========================================
// STICKY CTA (Mobile)
// ========================================
function initStickyCTA() {
  const stickyCTA = document.querySelector(".sticky-cta");
  if (!stickyCTA) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Show when scrolled down 300px
    if (currentScroll > 300 && currentScroll > lastScroll) {
      stickyCTA.classList.add("is-visible");
    } else if (currentScroll < lastScroll) {
      stickyCTA.classList.remove("is-visible");
    }

    lastScroll = currentScroll;
  });

  // Click handler
  const button = stickyCTA.querySelector(".sticky-cta__button");
  if (button) {
    button.addEventListener("click", () => {
      window.location.href = "../pages/contacto.html";
    });
  }
}

// ========================================
// TREATMENT MODAL
// ========================================
function initModals() {
  const cards = document.querySelectorAll(".treatment-card--premium");
  if (!cards.length) return;

  cards.forEach((card) => {
    const cta = card.querySelector(".treatment-card__cta");
    if (!cta) return;

    cta.addEventListener("click", (e) => {
      e.stopPropagation();
      const treatmentName = card.querySelector(
        ".treatment-card__title"
      ).textContent;
      const treatmentDesc = card.querySelector(
        ".treatment-card__description"
      ).textContent;

      showTreatmentModal({
        name: treatmentName,
        description: treatmentDesc,
        image: card.style.backgroundImage,
      });
    });
  });
}

function showTreatmentModal(treatment) {
  // Create modal if it doesn't exist
  let modal = document.getElementById("treatment-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "treatment-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal__content">
        <div class="modal__header">
          <h3 style="font-family: var(--font-primary); font-size: 1.5rem; color: var(--color-negro);">${treatment.name}</h3>
          <button class="modal__close" aria-label="Cerrar">×</button>
        </div>
        <div class="modal__body">
          <div style="margin-bottom: var(--spacing-lg);">
            <div style="width: 100%; height: 300px; background-size: cover; background-position: center; border-radius: var(--radius-lg); background-image: ${treatment.image};"></div>
          </div>
          <p style="font-size: 1.125rem; line-height: 1.8; color: var(--color-taupe); margin-bottom: var(--spacing-xl);">${treatment.description}</p>
          
          <div style="background: var(--color-cream); padding: var(--spacing-lg); border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg);">
            <h4 style="font-family: var(--font-primary); font-size: 1.25rem; margin-bottom: var(--spacing-md); color: var(--color-negro);">Beneficios Principales</h4>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: var(--spacing-sm) 0; color: var(--color-taupe);">✓ Resultados visibles desde la primera sesión</li>
              <li style="padding: var(--spacing-sm) 0; color: var(--color-taupe);">✓ Procedimiento rápido y cómodo</li>
              <li style="padding: var(--spacing-sm) 0; color: var(--color-taupe);">✓ Sin tiempo de recuperación</li>
              <li style="padding: var(--spacing-sm) 0; color: var(--color-taupe);">✓ Técnica profesional certificada</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="../pages/contacto.html" class="cta-button" style="text-decoration: none; display: inline-block;">Agenda tu Consulta Gratuita</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal handlers
    const closeBtn = modal.querySelector(".modal__close");
    closeBtn.addEventListener("click", () => closeModal(modal));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal(modal);
      }
    });
  } else {
    // Update existing modal content
    modal.querySelector(".modal__header h3").textContent = treatment.name;
    modal.querySelector(".modal__body p").textContent = treatment.description;
    modal.querySelector(
      ".modal__body > div:first-child > div"
    ).style.backgroundImage = treatment.image;
  }

  // Show modal
  setTimeout(() => {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }, 10);
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
  const cards = document.querySelectorAll(".treatment-card--premium");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

// ========================================
// SMOOTH SCROLL TO SECTION
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ========================================
// TREATMENT COMPARISON (Future feature)
// ========================================
function initComparison() {
  // Placeholder for future implementation
  const compareButtons = document.querySelectorAll("[data-compare]");
  if (!compareButtons.length) return;

  // TODO: Implement treatment comparison modal
  console.log("Comparison feature: Coming soon");
}

// ========================================
// INIT ALL
// ========================================
function initTreatmentPage() {
  // Check if we're on a treatment LISTING page (not detail page)
  const isTreatmentListingPage =
    document.querySelector(".page-header--enhanced") ||
    document.querySelector(".treatment-grid--enhanced");

  // Don't run on detail pages
  const isDetailPage = document.querySelector(".treatment-hero");

  if (!isTreatmentListingPage || isDetailPage) return;

  // Initialize all features
  initHeroParallax();
  initFilters();
  initStickyCTA();
  // initModals(); // DISABLED: All cards now link directly to detail pages
  initScrollReveal();
  initSmoothScroll();

  console.log("✨ Premium treatment page initialized");
}

// Auto-init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTreatmentPage);
} else {
  initTreatmentPage();
}

// Export for manual initialization if needed
window.initTreatmentPage = initTreatmentPage;
