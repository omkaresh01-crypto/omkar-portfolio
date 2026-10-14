
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    const span = menuButton.querySelector("span");
    if (span) span.textContent = isOpen ? "−" : "＋";
  });
}

document.querySelectorAll("#year").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const header = document.querySelector(".site-header");

function updateScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
  if (header) header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

document.querySelectorAll(
  ".project-card, .service-row, .statement-copy, .contact-strip, .about-layout, .principle, .section-heading, .page-intro-row, .about-principles"
).forEach((el, index) => {
  el.classList.add("reveal");
  if (el.classList.contains("project-card")) {
    el.style.setProperty("--card-index", index % 5);
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover) {
  document.querySelectorAll(".video-frame video").forEach((video) => {
    video.muted = true;

    video.addEventListener("mouseenter", () => {
      if (video.paused && video.readyState >= 2) {
        video.play().catch(() => {});
      }
    });

    video.addEventListener("mouseleave", () => {
      if (!video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
}
