// Portfolio interactions: mobile navigation, scroll progress, reveals and subtle motion.
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.querySelector("span").textContent = isOpen ? "−" : "＋";
  });
}

document.querySelectorAll("#year").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const header = document.querySelector(".site-header");
let ticking = false;
const updateScroll = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
  if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  ticking = false;
};
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });
updateScroll();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });

  document.querySelectorAll(".project-card, .service-row, .statement-copy, .contact-strip, .about-layout, .principle, .section-heading, .page-intro-row, .about-principles").forEach((el, index) => {
    el.classList.add("reveal");
    if (el.classList.contains("project-card")) el.style.setProperty("--card-index", index % 5);
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

// Play a silent preview on hover for desktop pointer users; never interrupt a video already playing.
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (canHover) {
  document.querySelectorAll(".video-frame video").forEach((video) => {
    video.muted = true;
    video.addEventListener("mouseenter", () => {
      if (video.paused && video.readyState >= 2) video.play().catch(() => {});
    });
    video.addEventListener("mouseleave", () => {
      if (!video.paused) {
        video.pause();
        try { video.currentTime = 0; } catch (_) {}
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(
    document.querySelectorAll("main > section")
  ).filter((section) => {
    return !section.classList.contains("hero") &&
           !section.classList.contains("contact-strip");
  });

  if (!("IntersectionObserver" in window)) {
    return;
  }

  sections.forEach((section) => {
    section.classList.add("reveal-on-scroll");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -10% 0px"
  });

  sections.forEach((section) => observer.observe(section));
});

  const sections = document.querySelectorAll("main > section");

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  sections.forEach((section) => {
    if (
      section.classList.contains("hero") ||
      section.classList.contains("contact-strip")
    ) {
      return;
    }

    section.classList.add("reveal-on-scroll");
    observer.observe(section);
  });
});
