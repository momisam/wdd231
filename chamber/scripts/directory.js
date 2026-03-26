const url = "data/members.json";
const container = document.querySelector("#members");

// ==============================
// FETCH MEMBERS
// ==============================
async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        displayMembers(data.members); // ✅ FIXED
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// ==============================
// DISPLAY MEMBERS
// ==============================
function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="data/images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit</a>
        `;

        container.appendChild(card);
    });
}

// ==============================
// GRID / LIST TOGGLE
// ==============================
document.querySelector("#gridView").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");

    document.querySelectorAll(".card img").forEach(img => {
        img.style.display = "block";
    });
});

document.querySelector("#listView").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");

    document.querySelectorAll(".card img").forEach(img => {
        img.style.display = "none";
    });
});

// ==============================
// FOOTER
// ==============================
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    "Last Modified: " + document.lastModified;

// ==============================
// INIT
// ==============================
getMembers();