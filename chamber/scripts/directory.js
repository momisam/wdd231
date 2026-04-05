// ==============================
// CONFIG
// ==============================
const url = "data/members.json";
const container = document.querySelector("#members");

// ==============================
// FETCH MEMBERS
// ==============================
async function getMembers() {
  try {
    if (container) container.innerHTML = "<p>Loading members...</p>";

    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
    if (container) {
      container.innerHTML = "<p>Failed to load members. Please try again.</p>";
    }
  }
}

// ==============================
// DISPLAY MEMBERS
// ==============================
function displayMembers(members) {
  if (!container) return;

  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img 
        src="images/${member.image}" 
        alt="${member.name} business logo" 
        loading="lazy"
        width="150" height="100"
      >

      <h3>${member.name}</h3>

      <p>${member.address}</p>
      <p>${member.phone}</p>

      <a 
        href="${member.website}" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Visit ${member.name} website"
      >
        Visit Website
      </a>
    `;

    container.appendChild(card);
  });
}

// ==============================
// GRID / LIST TOGGLE
// ==============================
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

if (gridBtn && listBtn && container) {
  gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
  });
}

// ==============================
// FOOTER
// ==============================
const yearEl = document.querySelector("#year");
const modEl = document.querySelector("#lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = "Last Modified: " + document.lastModified;

// ==============================
// INIT
// ==============================
getMembers();