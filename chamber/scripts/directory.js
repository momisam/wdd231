const url = "data/members.json";
const container = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit</a>
        `;

        container.appendChild(card);
    });
}

getMembers();


// GRID / LIST TOGGLE
document.querySelector("#gridView").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

document.querySelector("#listView").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});


card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name}" loading="lazy">
    <h3>${member.name}</h3>
    <p>${member.address}</p>
    <p>${member.phone}</p>
    <a href="${member.website}" target="_blank">Visit</a>
`;





// FOOTER DATES
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = "Last Modified: " + document.lastModified;