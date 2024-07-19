const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Function to fetch data from the second API
async function fetchWeatherFromSecondAPI(city) {
    const url = `https://weather-api99.p.rapidapi.com/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ceec46dfc4msh0317b56c2b8441ep11b632jsn0fd914561ca0',
            'x-rapidapi-host': 'weather-api99.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const weather_data = await response.json();

        if (weather_data.cod !== 200) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }

        updateWeatherData(weather_data);
    } catch (error) {
        console.error('Error fetching weather data from second API:', error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

// Function to update the UI with fetched weather data
function updateWeatherData(weather_data) {
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`; // Convert from Kelvin to Celsius
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
        default:
            weather_img.src = "/assets/default.png";
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value;
    fetchWeatherFromSecondAPI(city);
});
