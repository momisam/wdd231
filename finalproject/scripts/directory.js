const container = document.getElementById("list");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

const modal = document.getElementById("modal");
const modalData = document.getElementById("modalData");
const closeModal = document.getElementById("closeModal");

let all = [];

// ==============================
// LOAD
// ==============================
async function load() {
  const res = await fetch("data/businesses.json");
  const data = await res.json();

  all = data.businesses;
  display(all);

  // categories
  const categories = [...new Set(all.map(b => b.category))];
  categories.forEach(c => {
    filter.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

// ==============================
// DISPLAY
// ==============================
function display(data) {
  container.innerHTML = "";

  data.forEach(b => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${b.image}">
      <div class="card-body">
        <h3>${b.name}</h3>
        <p>${b.location}</p>
        <button data-id="${b.id}">View</button>
      </div>
    `;

    container.appendChild(card);
  });

  addEvents();
}

// ==============================
// VIEW MODAL
// ==============================
function addEvents() {
  document.querySelectorAll(".card button").forEach(btn => {
    btn.addEventListener("click", () => {
      const biz = all.find(b => b.id == btn.dataset.id);

      modalData.innerHTML = `
        <h3>${biz.name}</h3>
        <p>${biz.category}</p>
        <p>${biz.location}</p>
        <p>${biz.phone}</p>
      `;

      modal.classList.remove("hidden");
    });
  });
}

closeModal.onclick = () => modal.classList.add("hidden");

// ==============================
// SEARCH
// ==============================
search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  display(all.filter(b => b.name.toLowerCase().includes(value)));
});

// ==============================
// FILTER
// ==============================
filter.addEventListener("change", e => {
  if (e.target.value === "all") display(all);
  else display(all.filter(b => b.category === e.target.value));
});

// ==============================
// FOOTER
// ==============================
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// INIT
load();