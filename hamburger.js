// ==================== HAMBURGER MENU ====================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

// Toggle mobile menu
if (navToggle && navLinks) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}

// Navbar scroll effect
let lastScroll = 0;

const handleScroll = () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
};

// Debounce function for performance
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll listener
const optimizedScroll = debounce(handleScroll, 10);
window.addEventListener("scroll", optimizedScroll, { passive: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if href is just "#"
    if (href === "#") {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Focus trap for mobile menu
if (navLinks) {
  const focusableElements = navLinks.querySelectorAll("a, button");
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  navLinks.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}
