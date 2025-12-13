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

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll("a");
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
