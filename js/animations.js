// Scroll animations and micro-interactions

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".service-card, .product-card, .dr-lily__image-wrapper, .section__header"
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
};

// Add animation class
const style = document.createElement("style");
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

// Lazy load images
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Parallax effect for hero
const parallaxHero = () => {
  const hero = document.querySelector(".hero__background");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  });
};

// Service card hover effect enhancement
const enhanceServiceCards = () => {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });
};

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  smoothScroll();
  lazyLoadImages();
  parallaxHero();
  enhanceServiceCards();
});

// Export for use in other modules
export { animateOnScroll, smoothScroll, lazyLoadImages, parallaxHero };
