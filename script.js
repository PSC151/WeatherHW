const api = {
    key: "7f0ba15f243c90d916bf4a7a26f66a59",
    baseurl: "https://api.openweathermap.org/data/2.5"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch('${api.base}weather?q=${query}&units=imperal&APPID=${api.key}')
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = '${weather.name}, ${weather.sys.country}';

    let now = new Date();
    let date = document.querySelector('.current .temp');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.location .date');
    temp.innerHTML = '${Math.round(weather.main.temp)}<span>°F</span>';

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('hi-low');
    hilow.innerText = '${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F';
}

function dateBuilder (d) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return "${day} ${date} ${month} ${year}";
}