// ==============================
// LOAD FEATURED BUSINESSES
// ==============================
async function loadFeatured() {
  try {
    const container = document.getElementById("featured");
    if (!container) return;

    const res = await fetch("data/businesses.json");
    const data = await res.json();

    // 👉 SHOW 4 BUSINESSES
    const businesses = data.businesses.slice(0, 4);

    container.innerHTML = "";

    businesses.forEach(b => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${b.image}" alt="${b.name}">
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
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ==============================
// INIT
// ==============================
loadFeatured();