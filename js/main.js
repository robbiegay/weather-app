// JavaScript

// Get Weather Button
let btn = document.querySelector('.btn');

// Table fields
let city = document.querySelector('#city');
let tempK = document.querySelector('#tempK');
let tempF = document.querySelector('#tempF');
let tempC = document.querySelector('#tempC');
let status = document.querySelector('#status');
let tempIcon = document.querySelector('#tempIcon');

// Error message
let errorMsg = document.querySelector('#errorMsg');

btn.addEventListener('click', getWeather);

async function getWeather() {
    try {
        // Hides error message
        errorMsg.style.display = 'none';

        let zip = document.querySelector('.form-control').value;
        // alert(`The zip-code is ${zip}`); --> Testing the value of zip
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=15d6e8a17e124db561676b9b0b009aac`);
        const currentWeather = await response.json();

        // City
        city.innerHTML = currentWeather.name;

        // Temp
        tempK.innerHTML = `${currentWeather.main.temp} K`;
        // K to F Formula = (0K − 273.15) × 9/5 + 32 = -459.7°F
        tempF.innerHTML = `${((Number(currentWeather.main.temp) - 273.15) * (9 / 5) + 32).toFixed(2)} °F`;
        // K to C Formula = 0K − 273.15 = -273.1°C
        tempC.innerHTML = `${(Number(currentWeather.main.temp) - 273.15).toFixed(2)} °C`;

        // Conditions
        status.innerHTML = currentWeather.weather[0].description;

        // Temp Icon 
        tempIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png">`;

        // Make elements visible
        document.getElementById('hideTable').style.display = 'block';

    } catch (e) {
        // Makes error message visible, and hides table
        errorMsg.style.display = 'block';
        document.getElementById('hideTable').style.display = 'none';
        errorMsg.innerHTML = `Please input a valid 5-digit US Zip Code --> Ex. 90210<br><small>[Error: "${e}"]</small>`;

        // alert(`Error: "${e}"\nPlease input a valid 5 digit US Zip Code\nEx. 90210`); --> Old 'alert' style error
    }

}



// Notes:

// API URL: `api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=15d6e8a17e124db561676b9b0b009aac`

// Test commands:
// console.log(JSON.stringify(currentWeather)); --> Logs the string version of JSON data
// console.log(currentWeather); --> Logs the JSON data
// console.log(typeof currentWeather); --> Checks the typeof JSON data
// console.log(currentWeather.main.tempK); --> A test of the temp location
// console.log(currentWeather.weather[0].description); --> A test of the conditions location
// console.log(currentWeather.name); --> A test of the city location