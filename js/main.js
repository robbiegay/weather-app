// JavaScript

// Get Weather Button
let btn = document.querySelector('.btn');
let geoBtn = document.querySelector('#geoLocation');
let byCoord = false;

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

// Can use Enter to trigger getWeather
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        getWeather();
    }
});

async function getWeather() {
    try {
        // Hides error message
        errorMsg.style.display = 'none';
        let response;

        if (byCoord === true) {
            let lat = 0;
            let long = 0;

            function getCoord() {
                return new Promise(resolve => {
                    navigator.geolocation.getCurrentPosition(success, error, options);
                    resolve();
                });
            }

            // navigator.geolocation.getCurrentPosition(success, error, options);

            await getCoord();
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=15d6e8a17e124db561676b9b0b009aac`);
        } else {
            let zip = document.querySelector('.form-control').value;

            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=15d6e8a17e124db561676b9b0b009aac`);
        }

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

// Get weather by current location:
geoBtn.addEventListener('click', getLocation);

function success(position) {
    let location = position.coords;

    lat = location.latitude;
    long = location.longitude;

    console.log('Your current position is:');
    console.log(`Latitude : ${location.latitude}`);
    console.log(`Longitude: ${location.longitude}`);
    console.log(`More or less ${location.accuracy} meters.`);
}

function error(err) {
    errorMsg.style.display = 'block';
    document.getElementById('hideTable').style.display = 'none';
    errorMsg.innerHTML = `Error: Could not get current location<br><small>[Error${err.code}: ${err.message}]</small>`;
}

let options = {
    enableHighAccuracy: true,
    // Time before error message fires
    timeout: 5000,
    // Will use an old location if max age is set to a certain time. 0 = call new location each time
    maximumAge: 0
}

function getLocation() {
    byCoord = true;
    getWeather();
    byCoord = false;
}


// Notes:

// API URL: `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=15d6e8a17e124db561676b9b0b009aac`

// Test commands:
// console.log(JSON.stringify(currentWeather)); --> Logs the string version of JSON data
// console.log(currentWeather); --> Logs the JSON data
// console.log(typeof currentWeather); --> Checks the typeof JSON data
// console.log(currentWeather.main.tempK); --> A test of the temp location
// console.log(currentWeather.weather[0].description); --> A test of the conditions location
// console.log(currentWeather.name); --> A test of the city location