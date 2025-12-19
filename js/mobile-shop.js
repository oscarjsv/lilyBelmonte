// Skin Point Mobile Shop UX - Interactive Functionality
// Ready for WooCommerce integration

// ===== STATE MANAGEMENT =====
const mobileShop = {
  activeFilters: {
    categories: [],
    maxPrice: 2000,
  },
  sortBy: "default",
};

// ===== SEARCH FUNCTIONALITY =====
const productSearch = document.getElementById("productSearch");
const clearSearchBtn = document.getElementById("clearSearch");

if (productSearch) {
  productSearch.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    // Show/hide clear button
    clearSearchBtn.classList.toggle("active", query.length > 0);

    // Filter products
    searchProducts(query);
  });
}

if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    productSearch.value = "";
    clearSearchBtn.classList.remove("active");
    searchProducts("");
  });
}

function searchProducts(query) {
  const products = document.querySelectorAll(".sp-product");
  let visibleCount = 0;

  products.forEach((product) => {
    const title =
      product.querySelector(".sp-product__title")?.textContent.toLowerCase() ||
      "";
    const category =
      product
        .querySelector(".sp-product__category")
        ?.textContent.toLowerCase() || "";

    const matches =
      query === "" || title.includes(query) || category.includes(query);
    product.style.display = matches ? "" : "none";

    if (matches) visibleCount++;
  });

  updateProductCount(visibleCount);
}

// ===== FILTER DRAWER =====
const filterDrawer = document.getElementById("filterDrawer");
const openFiltersBtn = document.getElementById("openFilters");
const closeDrawerBtn = document.getElementById("closeDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

// Open drawer
if (openFiltersBtn) {
  openFiltersBtn.addEventListener("click", () => {
    filterDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

// Close drawer
function closeFilterDrawer() {
  filterDrawer.classList.remove("active");
  document.body.style.overflow = "";
}

if (closeDrawerBtn) {
  closeDrawerBtn.addEventListener("click", closeFilterDrawer);
}

if (drawerOverlay) {
  drawerOverlay.addEventListener("click", closeFilterDrawer);
}

// ===== FILTER LOGIC =====
const categoryCheckboxes = document.querySelectorAll(
  'input[data-filter-type="category"]'
);
const priceSlider = document.getElementById("priceRangeSlider");
const priceRangeMax = document.getElementById("priceRangeMax");

// Price slider update
if (priceSlider) {
  priceSlider.addEventListener("input", (e) => {
    const value = parseInt(e.target.value);
    priceRangeMax.textContent = `$${value.toLocaleString()}`;
  });
}

// Apply filters
const applyFiltersBtn = document.getElementById("applyFilters");
if (applyFiltersBtn) {
  applyFiltersBtn.addEventListener("click", () => {
    // Get selected categories
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    // Get price range
    const maxPrice = parseInt(priceSlider.value);

    // Update state
    mobileShop.activeFilters.categories = selectedCategories;
    mobileShop.activeFilters.maxPrice = maxPrice;

    // Apply filters
    applyActiveFilters();

    // Update UI
    updateFilterBadge();
    renderActiveChips();

    // Close drawer
    closeFilterDrawer();
  });
}

// Clear filters
const clearFiltersBtn = document.getElementById("clearFilters");
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    // Reset checkboxes
    categoryCheckboxes.forEach((cb) => (cb.checked = false));

    // Reset price slider
    if (priceSlider) {
      priceSlider.value = 2000;
      priceRangeMax.textContent = "$2,000";
    }

    // Reset state
    mobileShop.activeFilters.categories = [];
    mobileShop.activeFilters.maxPrice = 2000;

    // Apply
    applyActiveFilters();
    updateFilterBadge();
    renderActiveChips();
  });
}

function applyActiveFilters() {
  const products = document.querySelectorAll(".sp-product");
  let visibleCount = 0;

  products.forEach((product) => {
    let show = true;

    // Category filter
    if (mobileShop.activeFilters.categories.length > 0) {
      const productCategory = product.dataset.category || "";
      show = mobileShop.activeFilters.categories.includes(productCategory);
    }

    // Price filter
    if (show) {
      const priceText =
        product.querySelector(".sp-product__price")?.textContent || "$0";
      const price = parseInt(priceText.replace(/[^0-9]/g, ""));
      show = price <= mobileShop.activeFilters.maxPrice;
    }

    product.style.display = show ? "" : "none";
    if (show) visibleCount++;
  });

  updateProductCount(visibleCount);
}

// ===== FILTER BADGE =====
function updateFilterBadge() {
  const badge = document.getElementById("filterBadge");
  const count =
    mobileShop.activeFilters.categories.length +
    (mobileShop.activeFilters.maxPrice < 2000 ? 1 : 0);

  badge.textContent = count;
  badge.classList.toggle("active", count > 0);
}

// ===== ACTIVE FILTER CHIPS =====
const activeFiltersContainer = document.getElementById("activeFilters");

function renderActiveChips() {
  if (!activeFiltersContainer) return;

  activeFiltersContainer.innerHTML = "";

  const hasFilters =
    mobileShop.activeFilters.categories.length > 0 ||
    mobileShop.activeFilters.maxPrice < 2000;

  if (!hasFilters) {
    activeFiltersContainer.classList.remove("active");
    return;
  }

  activeFiltersContainer.classList.add("active");

  // Category chips
  mobileShop.activeFilters.categories.forEach((category) => {
    const chip = createChip(category, "category");
    activeFiltersContainer.appendChild(chip);
  });

  // Price chip
  if (mobileShop.activeFilters.maxPrice < 2000) {
    const chip = createChip(
      `Hasta $${mobileShop.activeFilters.maxPrice.toLocaleString()}`,
      "price"
    );
    activeFiltersContainer.appendChild(chip);
  }

  // Clear all button
  if (hasFilters) {
    const clearAll = document.createElement("button");
    clearAll.className = "sp-clear-all-chips";
    clearAll.textContent = "Limpiar todo";
    clearAll.addEventListener("click", clearAllFilters);
    activeFiltersContainer.appendChild(clearAll);
  }
}

function createChip(label, type) {
  const chip = document.createElement("span");
  chip.className = "sp-filter-chip";

  const text = document.createElement("span");
  text.textContent = label;

  const removeBtn = document.createElement("button");
  removeBtn.className = "sp-chip-remove";
  removeBtn.innerHTML = "×";
  removeBtn.setAttribute("aria-label", `Remover filtro ${label}`);
  removeBtn.addEventListener("click", () => removeFilter(type, label));

  chip.appendChild(text);
  chip.appendChild(removeBtn);

  return chip;
}

function removeFilter(type, value) {
  if (type === "category") {
    const normalizedValue = value.toLowerCase().replace(/\s+/g, "");
    mobileShop.activeFilters.categories =
      mobileShop.activeFilters.categories.filter(
        (cat) => cat !== normalizedValue
      );

    // Uncheck checkbox
    const checkbox = document.querySelector(
      `input[value="${normalizedValue}"]`
    );
    if (checkbox) checkbox.checked = false;
  } else if (type === "price") {
    mobileShop.activeFilters.maxPrice = 2000;
    if (priceSlider) {
      priceSlider.value = 2000;
      priceRangeMax.textContent = "$2,000";
    }
  }

  applyActiveFilters();
  updateFilterBadge();
  renderActiveChips();
}

function clearAllFilters() {
  // Reset categories
  mobileShop.activeFilters.categories = [];
  categoryCheckboxes.forEach((cb) => (cb.checked = false));

  // Reset price
  mobileShop.activeFilters.maxPrice = 2000;
  if (priceSlider) {
    priceSlider.value = 2000;
    priceRangeMax.textContent = "$2,000";
  }

  applyActiveFilters();
  updateFilterBadge();
  renderActiveChips();
}

// ===== SORTING =====
const sortSelect = document.getElementById("sortProducts");

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    const sortBy = e.target.value;
    mobileShop.sortBy = sortBy;
    sortProducts(sortBy);
  });
}

function sortProducts(sortBy) {
  const productsContainer = document.querySelector(".sp-products");
  const products = Array.from(document.querySelectorAll(".sp-product"));

  products.sort((a, b) => {
    if (sortBy === "price-asc") {
      return getProductPrice(a) - getProductPrice(b);
    } else if (sortBy === "price-desc") {
      return getProductPrice(b) - getProductPrice(a);
    } else if (sortBy === "name-asc") {
      return getProductName(a)
        .toLowerCase()
        .localeCompare(getProductName(b).toLowerCase());
    } else if (sortBy === "name-desc") {
      return getProductName(b)
        .toLowerCase()
        .localeCompare(getProductName(a).toLowerCase());
    }
    return 0; // default
  });

  // Re-append sorted products
  products.forEach((product) => productsContainer.appendChild(product));
}

function getProductPrice(product) {
  const priceText =
    product.querySelector(".sp-product__price")?.textContent || "$0";
  return parseInt(priceText.replace(/[^0-9]/g, ""));
}

function getProductName(product) {
  return product.querySelector(".sp-product__title")?.textContent || "";
}

// ===== UTILITIES =====
function updateProductCount(count) {
  const resultElements = document.querySelectorAll(
    ".sp-toolbar__results, .sp-hero__count"
  );
  resultElements.forEach((el) => {
    el.textContent = `${count} producto${count !== 1 ? "s" : ""}`;
  });
}

// ===== INITIALIZATION =====
console.log("✅ Skin Point Mobile Shop UX loaded");
