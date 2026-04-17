// collection element for dom
const body = document.querySelector("body");
const form = document.getElementById("form");

const input = document.getElementById("input");
const btn = document.getElementById("btn");
const toggle = document.getElementById("toggle");

const container = document.getElementById("main-container");
const box = document.querySelectorAll(".box");

const box1 = document.getElementById("box1");
const h3 = document.getElementById("h3");

const nav = document.querySelector(".nav");
const foot = document.querySelector(".foot");

// storing input city
let Res;
// images array
const images = ["moon_night.png", "sun3.png"];

// api

async function weather(res) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0f89ac77e9234762a8e124336260804&q=${res}&aqi=no`,
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Add null/undefined checks before accessing properties

    const temP = data?.current?.temp_c ?? "N/A";
    h3.textContent = `${temP}`;
    const day = data.current.is_day;

    // temperature images load
    const img = document.getElementById("img");

    if (day == 1) {
      img.src = images[1];
    }
    if (day == 0) {
      img.src = images[0];
    }

    // updating dom

    document.getElementById("city").textContent = data?.location?.name ?? "N/A";
    document.getElementById("country").textContent =
      data?.location?.country ?? "N/A";
    document.getElementById("uv").textContent = data?.current?.uv ?? "N/A";
    const wSp = data?.current?.wind_kph ?? "N/A";
    document.getElementById("wind").textContent = `${wSp} Kph`;
    const humPer = data?.current?.humidity ?? "N/A";

    document.getElementById("humidity").textContent = `${humPer} %`;

    const cloudPer = data?.current?.cloud ?? "N/A";
    document.getElementById("cloud").textContent = `${cloudPer} %`;
    const rainPer = data?.current?.precip_in ?? "N/A";

    document.getElementById("preC").textContent = `${rainPer} %`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    // Display error to user
    s1.textContent = "Error";
    document.getElementById("name").textContent = "City not found";
    alert(`Error: ${error.message}. Please check the city name and try again.`);
  }
}

// submit btn

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const res = input.value.trim();
  if (res) weather(res);
  if (!res) {
    alert("Please enter a city name");
  }
  form.reset();
});

// Optional: load default city on page load
weather("Jaipur");

// toggle btn

let isToggled = false; // track state

toggle.addEventListener("click", () => {
  if (!isToggled) {
    // First state
    nav.style.backgroundColor = "#E87F24";
    nav.style.color = "black";

    container.style.backgroundColor = "#FFC81E";
    container.style.color = "black";

    box.forEach((dummy) => {
      dummy.style.backgroundColor = "#FEFDDF";
      dummy.style.color = "black";
    });

    foot.style.backgroundColor = "#73A5CA";
    document.getElementById('footer').style.color="black";


  } else {
    // Second state (back to original or another color)

    nav.style.backgroundColor = "#B5E18B";
    nav.style.color = "white";

    container.style.backgroundColor = "#F0FFC2";
    container.style.color = "black";

    box.forEach((dummy) => {
      dummy.style.backgroundColor = "#EAE6BC";
      dummy.style.color = "black";
    });

    foot.style.backgroundColor = "#28396C";
    document.getElementById('footer').style.color="white";

  }

  // flip the state
  isToggled = !isToggled;
});
