// JavaScript

let btn = document.querySelector('.btn');

// Test Fields
let city = document.querySelector('#city');
let temp = document.querySelector('#temp');
let status = document.querySelector('#status');

btn.addEventListener('click', getWeather);

async function getWeather() {
    let zip = document.querySelector('.form-control').value;
    // alert(`The zip-code is ${zip}`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=15d6e8a17e124db561676b9b0b009aac`);
    const currentWeather = await response.json();
    // console.log(JSON.stringify(currentWeather));
    // console.log(currentWeather);
    // console.log(typeof currentWeather);
    // console.log(currentWeather.main.temp);
    // console.log(currentWeather.weather[0].description);
    // console.log(currentWeather.name);

    city.innerHTML = currentWeather.name;
    temp.innerHTML = currentWeather.main.temp;
    status.innerHTML = currentWeather.weather[0].description;



    // city name = currentWeather.name
    // temp = currentWeather.main.temp --> then need to convert from K to F and C
    // condition = currentWeather.weather.description
    // console.log(currentWeather.weather.main);


}




//API URL: `api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=15d6e8a17e124db561676b9b0b009aac`