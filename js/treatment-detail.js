// Treatment Detail Pages - Interactive Features
// Lily Belmonte

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const wasOpen = item.classList.contains("is-open");

      // Close all FAQs
      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("is-open");
      });

      // Toggle current if it wasn't open
      if (!wasOpen) {
        item.classList.add("is-open");
      }
    });
  });
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgress() {
  // Create progress bar
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.style.width = "0%";
  document.body.appendChild(progress);

  // Update on scroll
  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;
    const percentage = (scrollTop / trackLength) * 100;

    progress.style.width = `${Math.min(percentage, 100)}%`;
  });
}

// ========================================
// SMOOTH SCROLL TO ANCHORS
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop =
          target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ========================================
// STICKY CTA VISIBILITY
// ========================================
function initStickyCTA() {
  const cta = document.querySelector(".sticky-cta");
  if (!cta) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = currentScroll / (documentHeight - windowHeight);

    // Show after scrolling 50%
    if (scrollPercentage > 0.5) {
      cta.classList.add("is-visible");
    } else {
      cta.classList.remove("is-visible");
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// INIT ALL
// ========================================
function initTreatmentDetail() {
  initFAQ();
  initScrollProgress();
  initSmoothScroll();
  initStickyCTA();

  console.log("✨ Treatment detail page initialized");
}

// Auto-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTreatmentDetail);
} else {
  initTreatmentDetail();
}

// Export for manual init if needed
window.initTreatmentDetail = initTreatmentDetail;
