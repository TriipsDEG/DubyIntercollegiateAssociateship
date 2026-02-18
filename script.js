// =====================================
// FORCE SCROLL TO TOP ON REFRESH
// =====================================

window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// =====================================
// HERO TYPING SYSTEM
// =====================================

const lines = [
  "Duby",
  "Intercollegiate",
  "Associateship"
];

const speed = 70;

// 🔥 NEW — reveal subtitle + CTA
function revealHeroElements() {
  const subtitle = document.querySelector(".hero-subtitle");
  const cta = document.querySelector(".hero-cta");

  if (!subtitle || !cta) return;

  // subtitle appears first
  setTimeout(() => {
    subtitle.classList.add("show");
  }, 200);

  // CTA appears slightly after
  setTimeout(() => {
    cta.classList.add("show");
  }, 350);
}

function typeLine(text, element, callback) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      setTimeout(callback, 200);
    }
  }

  type();
}

// Run sequentially
window.addEventListener("load", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");

  setTimeout(() => {
    typeLine(lines[0], line1, () => {
      typeLine(lines[1], line2, () => {
        typeLine(lines[2], line3, () => {
          // 🔥 KEY MOMENT — reveal subtitle + CTA
          revealHeroElements();
        });
      });
    });
  }, 500);
});

// =====================================
// MENU SYSTEM
// =====================================

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const overlay = document.querySelector(".menu-overlay");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  document.body.classList.remove("menu-open");
});

menu.addEventListener("click", (e) => {
  if (e.target === menu) {
    menu.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menu.classList.remove("active");
  }
});

// ======================================
// SCROLL REVEAL — HOMEPAGE ONLY
// ======================================

if (document.body.classList.contains("home-page")) {
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}
