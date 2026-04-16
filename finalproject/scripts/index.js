const url = "data/businesses.json";

async function loadFeatured() {
  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById("featured");

  data.businesses.slice(0, 4).forEach(biz => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${biz.image}" alt="${biz.name}">
      <h3>${biz.name}</h3>
      <p>${biz.location}</p>
    `;

    container.appendChild(card);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

loadFeatured();