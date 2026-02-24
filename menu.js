document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.html")
    .then(r => r.text())
    .then(html => {
      const slot = document.getElementById("menu-placeholder");
      if (!slot) return;

      slot.innerHTML = html;

      // initialize menu AFTER injection
      if (typeof initMenu === "function") {
        initMenu();
      }
    })
    .catch(err => console.error("Menu load error:", err));
});

