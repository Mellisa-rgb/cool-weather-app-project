let now = new Date();
console.log(now.getDate);

let currentDay = document.querySelector("#current-day");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
currentDay.innerHTML = `${day}, ${hour}:${minutes}`;

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    search(searchInput.value);
  } else {
    h1.innerHTML = null;
    alert("🙀Please type a City");
  }
}

let form = document.querySelector("#button-addon2");
form.addEventListener("click", citySearch);

function search(city) {
  let apiKey = `7a61bfe3caa2801ec741ad5d39a3986d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
search("New York");

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${response.data.name}`;
  let temperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#measure");
  temperatureElement.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `7a61bfe3caa2801ec741ad5d39a3986d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current-btn");
current.addEventListener("click", getPosition);
