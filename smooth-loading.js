// ==================== SMOOTH LOADING & LAZY LOADING ====================

// Intersection Observer for Fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeInObserver.observe(el);
  });
});

// Lazy load iframes (YouTube videos)
const iframeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute("data-src");
        }
        iframeObserver.unobserve(iframe);
      }
    });
  },
  { rootMargin: "200px" }
);

// Observe all lazy iframes when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lazy-iframe").forEach((iframe) => {
    iframeObserver.observe(iframe);
  });
});

// Preload critical resources
window.addEventListener("load", () => {
  console.log("Page fully loaded - all resources loaded");

  // Optional: Add any additional preload logic here
  // For example, preloading images that might be needed soon
});

// Performance optimizations - Report performance metrics
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log("Performance Metrics:");
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`Connect Time: ${connectTime}ms`);
      console.log(`Render Time: ${renderTime}ms`);
    }, 0);
  });
}
