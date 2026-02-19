// =====================================
// FORCE SCROLL TO TOP ON REFRESH
// =====================================

window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// =====================================
// HERO TYPING SYSTEM (HOMEPAGE ONLY)
// =====================================

const lines = [
  "Duby",
  "Intercollegiate",
  "Associateship"
];

const speed = 70;

function revealHeroElements() {
  const subtitle = document.querySelector(".hero-subtitle");
  const cta = document.querySelector(".hero-cta");

  if (!subtitle || !cta) return;

  setTimeout(() => subtitle.classList.add("show"), 200);
  setTimeout(() => cta.classList.add("show"), 350);
}

function typeLine(text, element, callback) {
  if (!element) return;

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

// Run typing ONLY if homepage hero exists
window.addEventListener("load", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");

  if (!line1 || !line2 || !line3) return;

  setTimeout(() => {
    typeLine(lines[0], line1, () => {
      typeLine(lines[1], line2, () => {
        typeLine(lines[2], line3, () => {
          revealHeroElements();
        });
      });
    });
  }, 500);
});

// =====================================
// MENU SYSTEM (ALL PAGES)
// =====================================

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const overlay = document.querySelector(".menu-overlay");

if (hamburger && menu && overlay) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      menu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// ======================================
// SCROLL REVEAL — HOMEPAGE ONLY
// ======================================

if (document.body.classList.contains("home-page")) {
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 200) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

// =====================================
// LECTURES SYSTEM (UPCOMING PAGE ONLY)
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("lectures-grid");
  const featuredTitle = document.getElementById("featured-title");
  const featuredMeta = document.getElementById("featured-meta");

  // 🚨 If not on lectures page → STOP
  if (!grid || !featuredTitle || !featuredMeta) return;

  loadLectures();
});

async function loadLectures() {
  try {
    const res = await fetch("lectures.json");
    const lectures = await res.json();

    // sort by soonest date
    lectures.sort((a, b) => new Date(a.date) - new Date(b.date));

    const featured = lectures[0];
    const upcoming = lectures.slice(1);

    renderFeatured(featured);
    renderUpcoming(upcoming);

  } catch (err) {
    console.error("Failed to load lectures:", err);
  }
}

// =====================================
// RENDER FEATURED
// =====================================
function renderFeatured(lecture) {
  const titleEl = document.getElementById("featured-title");
  const metaEl = document.getElementById("featured-meta");
  const imgEl = document.getElementById("featured-image");

  if (!titleEl || !metaEl) return;

  titleEl.textContent = lecture.title;
  metaEl.textContent =
    `${formatDate(lecture.date)} · ${lecture.mode} · ${lecture.speaker}`;

  // ✅ SET IMAGE FROM JSON
  if (imgEl) {
    imgEl.src = lecture.image || "assets/lectureupdates/placeholder.jpg";
  }
}



// =====================================
// RENDER GRID
// =====================================

function renderUpcoming(lectures) {
  const grid = document.getElementById("lectures-grid");
const featuredTitle = document.getElementById("featured-title");
const featuredMeta = document.getElementById("featured-meta");

if (!grid || !featuredTitle || !featuredMeta) return;


  grid.innerHTML = "";

  lectures.forEach(lecture => {
    const card = document.createElement("div");
    card.className = "lecture-card";

    card.innerHTML = `
  <div class="lecture-meta">
    <span class="lecture-date">${formatDate(lecture.date)}</span>
    <span class="lecture-time">18:00 CET</span>
  </div>

  <h3 class="lecture-topic">
    ${lecture.title}
  </h3>

  <p class="lecture-speaker">
    ${lecture.speaker}
  </p>

  <div class="lecture-actions">
    ${lecture.registerLink ? `
      <a href="${lecture.registerLink}" 
         class="btn-primary" 
         target="_blank" 
         rel="noopener">
        Register
      </a>
    ` : ""}

    ${lecture.calendarLink ? `
      <a href="${lecture.calendarLink}" 
         class="btn-secondary" 
         target="_blank" 
         rel="noopener">
        Add to calendar
      </a>
    ` : ""}
  </div>
`;


    grid.appendChild(card);
  });
}

// =====================================
// DATE FORMATTER
// =====================================

function formatDate(dateStr) {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric"
  });
}

// =====================================
// UPCOMING LECTURES — DYNAMIC SYSTEM
// =====================================

async function loadLectures() {
  try {
    const res = await fetch("lectures.json");
    const lectures = await res.json();

    if (!lectures || lectures.length === 0) return;

    // sort by soonest date
    lectures.sort((a, b) => new Date(a.date) - new Date(b.date));

    const featured = lectures[0];
    const upcoming = lectures.slice(1);

    renderFeatured(featured);
    renderUpcoming(upcoming);

  } catch (err) {
    console.error("Lectures failed to load:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // only run on lectures page
  if (document.getElementById("featured-title")) {
    loadLectures();
  }
});


// =====================================
// RENDER FEATURED
// =====================================

function renderFeatured(lecture) {
  const titleEl = document.getElementById("featured-title");
  const metaEl = document.getElementById("featured-meta");
  const imageEl = document.getElementById("featured-image");
  const registerBtn = document.getElementById("registerLink");
  const calendarBtn = document.getElementById("calendarLink");

  if (!lecture || !titleEl || !metaEl) return;

  // text
  titleEl.textContent = lecture.title;
  metaEl.textContent =
    `${formatDate(lecture.date)} · ${lecture.mode} · ${lecture.speaker}`;

  // image
  if (imageEl && lecture.image) {
    imageEl.src = lecture.image;
  }

  // ✅ REGISTER BUTTON
  if (registerBtn) {
    if (lecture.registerLink) {
      registerBtn.href = lecture.registerLink;
      registerBtn.target = "_blank";
      registerBtn.style.display = "inline-block";
    } else {
      registerBtn.style.display = "none";
    }
  }

  // ✅ CALENDAR BUTTON
  if (calendarBtn) {
    if (lecture.calendarLink) {
      calendarBtn.href = lecture.calendarLink;
      calendarBtn.target = "_blank";
      calendarBtn.style.display = "inline-block";
    } else {
      calendarBtn.style.display = "none";
    }
  }
}



// =====================================
// RENDER UPCOMING GRID
// =====================================

function renderUpcoming(lectures) {
  const grid = document.querySelector(".lectures-grid");
  if (!grid) return;

  grid.innerHTML = "";

  lectures.forEach(lecture => {
    const card = document.createElement("div");
    card.className = "lecture-card";

    card.innerHTML = `
      <div class="lecture-meta">
        ${formatDate(lecture.date)} · ${lecture.mode}
      </div>

      <div class="lecture-topic">
        ${lecture.title}
      </div>

      <div class="lecture-speaker">
        ${lecture.speaker}
      </div>

      <div class="lecture-actions">
  ${lecture.registerLink ? `
    <a href="${lecture.registerLink}" 
       class="btn-primary" 
       target="_blank" 
       rel="noopener">
      Register
    </a>
  ` : ""}

  ${lecture.calendarLink ? `
    <a href="${lecture.calendarLink}" 
       class="btn-secondary" 
       target="_blank" 
       rel="noopener">
      Add to calendar
    </a>
  ` : ""}
</div>

    `;

    grid.appendChild(card);
  });
}


// =====================================
// DATE FORMATTER
// =====================================

function formatDate(dateStr) {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });
}

// =====================================
// NEWS SYSTEM
// =====================================

async function loadNews() {
  const container = document.getElementById("news-grid");
  const emptyState = document.getElementById("news-empty");

  if (!container) return;

  try {
    const res = await fetch("news.json");
    const news = await res.json();

    if (!news.length) {
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    // hide empty state
    if (emptyState) emptyState.style.display = "none";

    // sort newest first
    news.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = news.map(item => `
      <article class="lecture-card">
        <div class="lecture-meta">
          ${formatNewsDate(item.date)} • ${item.tag}
        </div>

        <h3 class="lecture-topic">
          ${item.title}
        </h3>

        <p class="lecture-speaker">
          ${item.excerpt}
        </p>
      </article>
    `).join("");

  } catch (err) {
    console.error("News loading failed:", err);
  }
}

function formatNewsDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

document.addEventListener("DOMContentLoaded", loadNews);

// hide scroll indicator after user scrolls
window.addEventListener("scroll", () => {
  const indicator = document.querySelector(".scroll-indicator");
  if (!indicator) return;

  if (window.scrollY > 110) {
    indicator.style.opacity = "0";
  } else {
    indicator.style.opacity = "0.6";
  }
});



document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const panel = document.querySelector(".menu-panel");
  const hamburger = document.getElementById("hamburger");

  const isOpen = menu.classList.contains("active");

  if (!isOpen) return;

  const clickedInsidePanel = panel.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);

  if (!clickedInsidePanel && !clickedHamburger) {
    // 🔥 close menu
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

// =====================================
// HOMEPAGE LECTURES
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lectures-container");
  if (!container) return;

  loadHomepageLectures();
});

async function loadHomepageLectures() {
  try {
    const res = await fetch("lectures.json");
    const lectures = await res.json();

    if (!lectures || lectures.length === 0) return;

    lectures.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderHomepageLectures(lectures.slice(0, 3));
  } catch (err) {
    console.error("Homepage lectures failed:", err);
  }
}

function renderHomepageLectures(lectures) {
  const container = document.getElementById("lectures-container");
  if (!container) return;

  container.innerHTML = "";

  lectures.forEach(lecture => {
    const card = document.createElement("div");
    card.className = "lecture-card";

    card.innerHTML = `
      <div class="lecture-meta">
        ${formatDate(lecture.date)} · ${lecture.mode}
      </div>

      <div class="lecture-topic">
        ${lecture.title}
      </div>

      <div class="lecture-speaker">
        ${lecture.speaker}
      </div>
    `;

    container.appendChild(card);
  });
}

// =====================================
// TEAM SYSTEM
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const teamContainer = document.getElementById("team-container");
  if (!teamContainer) return;

  loadTeam();
});

async function loadTeam() {
  try {
    const res = await fetch("team.json");
    const data = await res.json();

    renderTeam(data);
  } catch (err) {
    console.error("Error loading team:", err);
  }
}

function renderTeam(data) {
  const teamContainer = document.getElementById("team-container");
  if (!teamContainer) return;

  teamContainer.innerHTML = "";

  // group by category
  const categories = {};

  data.forEach(member => {
    if (!categories[member.category]) {
      categories[member.category] = [];
    }
    categories[member.category].push(member);
  });

  // render
  Object.keys(categories).forEach(category => {
    const title = document.createElement("h2");
    title.className = "team-category";
    title.textContent = category;
    teamContainer.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "team-grid";

    categories[category].forEach(member => {
      const imageName = member.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const imagePath = `assets/team/${imageName}.jpg`;

      const card = document.createElement("div");
      card.className = "team-card";

      card.innerHTML = `
        <div class="team-photo">
          <img src="${imagePath}"
               alt="${member.name}"
               onerror="this.onerror=null;this.src='assets/team/placeholder.jpg';">
        </div>
        ${member.role ? `<p class="team-role">${member.role}</p>` : ""}
        <h3>${member.name}</h3>
        <p>${member.description || ""}</p>
      `;

      grid.appendChild(card);
    });

    teamContainer.appendChild(grid);
  });
}
