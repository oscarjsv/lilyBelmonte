/**
 * Blog Page Functionality
 * Lily Belmonte Website
 */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // BLOG FILTERS
  // ========================================

  const filterPills = document.querySelectorAll(".blog-filter-pill");
  const blogCards = document.querySelectorAll(".blog-card");
  const featuredArticle = document.querySelector(".blog-featured");

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const category = pill.dataset.category;

      // Update active state
      filterPills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      // Filter articles
      if (category === "all") {
        // Show all articles
        blogCards.forEach((card) => {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        });
        if (featuredArticle) {
          featuredArticle.style.display = "grid";
        }
      } else {
        // Filter by category
        blogCards.forEach((card) => {
          const cardCategory = card.dataset.category;
          if (cardCategory === category) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });

        // Handle featured article
        if (featuredArticle) {
          const featuredCategory = featuredArticle.dataset.category;
          if (featuredCategory === category) {
            featuredArticle.style.display = "grid";
          } else {
            featuredArticle.style.display = "none";
          }
        }
      }
    });
  });

  // ========================================
  // NEWSLETTER FORM
  // ========================================

  const newsletterForm = document.querySelector(".blog-newsletter__form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector(
        ".blog-newsletter__input"
      );
      const email = emailInput.value;

      if (email) {
        // Here you would typically send the email to your backend
        alert(
          `¡Gracias por suscribirte! Te enviaremos contenido exclusivo a ${email}`
        );
        emailInput.value = "";
      }
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR BLOG CARDS
  // ========================================

  const blogCardLinks = document.querySelectorAll(
    ".blog-card__link, .blog-featured__cta"
  );

  blogCardLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Here you would navigate to the individual blog post
      console.log("Navigate to blog post...");
    });
  });

  // ========================================
  // PAGINATION
  // ========================================

  const paginationButtons = document.querySelectorAll(
    ".blog-pagination__number, .blog-pagination__btn"
  );

  paginationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("blog-pagination__btn--disabled")) {
        // Remove active state from all numbers
        document.querySelectorAll(".blog-pagination__number").forEach((num) => {
          num.classList.remove("blog-pagination__number--active");
        });

        // Add active state to clicked number
        if (button.classList.contains("blog-pagination__number")) {
          button.classList.add("blog-pagination__number--active");
        }

        // Scroll to top of blog grid
        window.scrollTo({
          top: document.querySelector(".blog-filters").offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================

  const images = document.querySelectorAll(
    ".blog-card__image, .blog-featured__image"
  );

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "1";
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.6s ease";
    imageObserver.observe(img);
  });
});
