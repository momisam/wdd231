const container = document.getElementById("list");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

let all = [];

async function load() {
  try {
    const res = await fetch("data/businesses.json");
    const data = await res.json();

    all = data.businesses;
    display(all);

    const categories = [...new Set(all.map(b => b.category))];
    categories.forEach(c => {
      filter.innerHTML += `<option value="${c}">${c}</option>`;
    });

  } catch (e) {
    console.error(e);
  }
}

function display(data) {
  container.innerHTML = "";

  data.forEach(b => {
    container.innerHTML += `
      <div class="card">
        <img src="${b.image}">
        <h3>${b.name}</h3>
        <p>${b.location}</p>
        <button onclick="view('${b.name}')">View</button>
      </div>
    `;
  });
}

search.addEventListener("input", e => {
  display(all.filter(b => b.name.toLowerCase().includes(e.target.value)));
});

filter.addEventListener("change", e => {
  if (e.target.value === "all") display(all);
  else display(all.filter(b => b.category === e.target.value));
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

load();