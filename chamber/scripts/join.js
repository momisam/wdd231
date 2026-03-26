document.addEventListener("DOMContentLoaded", () => {

  // Timestamp
  const ts = document.getElementById("timestamp");
  if (ts) ts.value = new Date().toISOString();

  // Footer
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Modals
  const buttons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modal).style.display = "block";
    });
  });

  closes.forEach(close => {
    close.addEventListener("click", () => {
      close.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

});