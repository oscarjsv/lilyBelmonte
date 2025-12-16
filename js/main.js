// Main JavaScript - Vanilla JS (No Modules)

// Mobile menu toggle
const initMobileMenu = () => {
  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("nav--open");
      menuToggle.classList.toggle("menu-toggle--active");
    });

    // Mobile submenu toggle - must be registered BEFORE general link handlers
    const submenuLinks = nav.querySelectorAll(".nav__link--has-submenu");
    console.log(`Found ${submenuLinks.length} submenu links`);

    submenuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Only prevent default on mobile when menu is open
        if (window.innerWidth <= 767 && nav.classList.contains("nav--open")) {
          e.preventDefault();
          e.stopPropagation(); // Important: prevents event from reaching other handlers

          const parentItem = link.closest(".nav__item");
          const wasActive = parentItem.classList.contains("nav__item--active");

          // Close all other dropdowns
          nav.querySelectorAll(".nav__item--active").forEach((item) => {
            if (item !== parentItem) {
              item.classList.remove("nav__item--active");
            }
          });

          // Toggle current dropdown
          parentItem.classList.toggle("nav__item--active");

          console.log(`Submenu toggled: ${wasActive ? "closed" : "opened"}`);
        }
      });
    });

    // Close menu when clicking on a link (but NOT submenu toggle links)
    const navLinks = nav.querySelectorAll("a:not(.nav__link--has-submenu)");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        menuToggle.classList.remove("menu-toggle--active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("nav--open");
        menuToggle.classList.remove("menu-toggle--active");
      }
    });
  }
};

// Form validation (for contact forms)
const initFormValidation = () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (isValid) {
        // Submit form or show success message
        console.log("Form is valid, ready to submit");
        // form.submit();
      }
    });
  });
};

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dra. Lily Website - Initialized");

  // Initialize mobile menu
  initMobileMenu();

  // Initialize form validation
  initFormValidation();

  // Log successful initialization
  console.log("✓ Mobile menu initialized");
});
