const apiKey = 'ee2943c7caf833fed49cbbc44c627bba'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city-input').value;
    if (city === '') {
        showError('Please enter a city name.');
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            showError(error.message);
        });
}

function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const cityName = document.getElementById('city-name');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    document.getElementById('weather-info').style.display = 'block';
    document.getElementById('error-msg').style.display = 'none';

    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    cityName.innerText = data.name;
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
}

function showError(message) {
    document.getElementById('error-msg').innerText = message;
    document.getElementById('error-msg').style.display = 'block';
    document.getElementById('weather-info').style.display = 'none';
}
