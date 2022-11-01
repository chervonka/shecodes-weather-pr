let now = new Date();
let currentDate = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let calendarWeek = document.querySelector("li#calendarWeek");
let calendarMonth = document.querySelector("li#calendarMonth");
let calendarDate = document.querySelector("li#calendarDate");
let currentTime = document.querySelector("#currentTime");
calendarWeek.innerHTML = `${day}`;
calendarMonth.innerHTML = `${month}`;
calendarDate.innerHTML = `${currentDate}`;
currentTime.innerHTML = `${hours}:${min}`;

//

function weatherInfo(response) {
  document.querySelector("#city-main").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#more-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
//
function search(event) {
  event.preventDefault();
  let cityMain = document.querySelector("#city-main");
  let cityInput = document.querySelector("#search-engine");
  cityMain.innerHTML = cityInput.value;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weatherInfo);
}

//

function geoPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(weatherInfo);
}

function geoLocationRequest() {
  navigator.geolocation.getCurrentPosition(geoPosition);
}
//

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = 21;
}
//
let fahrenheitLink = document.querySelector("#fahren-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let form = document.querySelector("form");
form.addEventListener("submit", search);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", search);

//

let submitLocation = document.querySelector("#geolocButton");
submitLocation.addEventListener("click", geoLocationRequest);
