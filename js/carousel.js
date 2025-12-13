// Carousel functionality for product showcase

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector(".carousel__track");
    this.items = Array.from(element.querySelectorAll(".carousel__item"));
    this.dotsContainer = element.querySelector(".carousel__controls");

    this.currentIndex = 0;
    this.itemWidth = 0;

    this.init();
  }

  init() {
    this.createDots();
    this.setupEventListeners();
    this.updateCarousel();

    // Auto-update on resize
    window.addEventListener("resize", () => this.updateCarousel());
  }

  createDots() {
    if (!this.dotsContainer) return;

    this.items.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel__dot");
      if (index === 0) dot.classList.add("carousel__dot--active");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });

    this.dots = Array.from(
      this.dotsContainer.querySelectorAll(".carousel__dot")
    );
  }

  setupEventListeners() {
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", () => {
      if (!isDragging) return;
      const diff = startX - currentX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }

      isDragging = false;
    });

    // Scroll snap detection
    this.track.addEventListener("scroll", () => {
      const scrollLeft = this.track.scrollLeft;
      const itemWidth = this.items[0].offsetWidth + 32; // Including gap
      const newIndex = Math.round(scrollLeft / itemWidth);

      if (newIndex !== this.currentIndex) {
        this.currentIndex = newIndex;
        this.updateDots();
      }
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  next() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const itemWidth = this.items[0].offsetWidth + 32; // Including gap
    this.track.scrollTo({
      left: itemWidth * this.currentIndex,
      behavior: "smooth",
    });
    this.updateDots();
  }

  updateDots() {
    if (!this.dots) return;

    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add("carousel__dot--active");
      } else {
        dot.classList.remove("carousel__dot--active");
      }
    });
  }
}

// Initialize all carousels on page load
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => new Carousel(carousel));
});

export default Carousel;
