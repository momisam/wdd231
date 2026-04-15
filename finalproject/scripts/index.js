// ==============================
// LOAD FEATURED BUSINESSES
// ==============================
async function loadFeatured() {
  try {
    const container = document.getElementById("featured");
    if (!container) return;

    container.innerHTML = "<p>Loading...</p>";

    const res = await fetch("data/businesses.json");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Pick first 3 (or random if you want)
    const businesses = data.businesses.slice(0, 3);

    container.innerHTML = "";

    businesses.forEach(b => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${b.image}" alt="${b.name}" loading="lazy">
        <h3>${b.name}</h3>
        <p>${b.location}</p>
        <p>${b.phone}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Featured error:", error);
  }
}

// ==============================
// FOOTER
// ==============================
const yearEl = document.getElementById("year");
const modEl = document.getElementById("lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = document.lastModified;

// ==============================
// INIT
// ==============================
loadFeatured();