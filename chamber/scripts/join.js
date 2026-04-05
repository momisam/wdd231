document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // TIMESTAMP
  // ==============================
  const ts = document.getElementById("timestamp");
  if (ts) {
    ts.value = new Date().toISOString();
  }

  // ==============================
  // FOOTER
  // ==============================
  const yearEl = document.getElementById("year");
  const modEl = document.getElementById("lastModified");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;

  // ==============================
  // MODALS
  // ==============================
  const buttons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");

  // OPEN MODAL
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Close any open modal first (prevents stacking)
      modals.forEach(m => m.style.display = "none");

      const modal = document.getElementById(btn.dataset.modal);
      if (modal) modal.style.display = "block";
    });
  });

  // CLOSE BUTTON
  closes.forEach(close => {
    close.addEventListener("click", () => {
      const modal = close.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // CLICK OUTSIDE CLOSE
  window.addEventListener("click", e => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // ESC KEY CLOSE (Accessibility boost 🔥)
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modals.forEach(modal => modal.style.display = "none");
    }
  });

});