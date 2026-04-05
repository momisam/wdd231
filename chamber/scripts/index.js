// ==============================
// CONFIG
// ==============================
// NOTE: API key exposed for educational purposes only
const apiKey = "121542dbb760e793ac5cbe5b192191bc";
const lat = 6.52;
const lon = 3.37;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;


// ==============================
// CURRENT WEATHER
// ==============================
async function getWeather() {
  try {
    const tempEl = document.getElementById("temp");
    const descEl = document.getElementById("desc");

    if (tempEl) tempEl.textContent = "Loading...";

    const res = await fetch(currentURL);
    if (!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);

    if (tempEl && descEl) {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      tempEl.textContent = temp;

      descEl.innerHTML = `
        <img src="${iconURL}" alt="${desc}">
        ${desc}
      `;
    }

  } catch (err) {
    console.error("Weather error:", err);

    const tempEl = document.getElementById("temp");
    if (tempEl) tempEl.textContent = "Weather unavailable";
  }
}


// ==============================
// FORECAST (3 DAYS)
// ==============================
async function getForecast() {
  try {
    const forecastDiv = document.getElementById("forecast");
    if (!forecastDiv) return;

    forecastDiv.innerHTML = "Loading...";

    const res = await fetch(forecastURL);
    if (!res.ok) throw new Error("Forecast fetch failed");

    const data = await res.json();
    if (data.cod !== "200") throw new Error(data.message);

    forecastDiv.innerHTML = "";

    const daily = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    daily.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "long"
      });

      const temp = Math.round(day.main.temp);

      const card = document.createElement("div");
      card.classList.add("forecast-card");

      card.innerHTML = `
        <p><strong>${date}</strong></p>
        <p>${temp}°C</p>
      `;

      forecastDiv.appendChild(card);
    });

  } catch (err) {
    console.error("Forecast error:", err);

    const forecastDiv = document.getElementById("forecast");
    if (forecastDiv) forecastDiv.innerHTML = "<p>Forecast unavailable</p>";
  }
}


// ==============================
// SPOTLIGHTS
// ==============================
async function getSpotlights() {
  try {
    const container = document.getElementById("spotlight-container");
    if (!container) return;

    container.innerHTML = "Loading...";

    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error("Members fetch failed");

    const data = await res.json();

    let members = data.members.filter(m =>
      m.membership === 2 || m.membership === 3 ||
      m.membership === "gold" || m.membership === "silver"
    );

    // Randomize + pick 3
    members = members.sort(() => 0.5 - Math.random()).slice(0, 3);

    container.innerHTML = "";

    members.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${member.name}</h3>

        <img src="images/${member.image}" 
             alt="${member.name} logo" 
             loading="lazy">

        <p>${member.address}</p>
        <p>${member.phone}</p>

        <a href="${member.website}" 
           target="_blank" 
           rel="noopener noreferrer">
           Visit Website
        </a>

        <p><strong>${member.membership === 3 || member.membership === "gold" ? "Gold" : "Silver"}</strong></p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Spotlight error:", err);

    const container = document.getElementById("spotlight-container");
    if (container) container.innerHTML = "<p>Spotlights unavailable</p>";
  }
}


// ==============================
// FOOTER
// ==============================
function updateFooter() {
  const yearEl = document.getElementById("year");
  const modEl = document.getElementById("lastModified");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;
}


// ==============================
// INIT
// ==============================
getWeather();
getForecast();
getSpotlights();
updateFooter();