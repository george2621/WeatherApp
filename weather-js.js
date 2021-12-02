window.addEventListener('load', () => {

    let long;
    let lat;
    const APIKey = 'eab457c2463581c3e22d1020b442c904';
    const location = document.querySelector('.w-location');
    const weatherDescription = document.querySelector('.w-desc');
    const tempView = document.querySelector('.w-temp');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherHumidity = document.getElementById('humidity');
    const weatherTempMin = document.getElementById('temp_min');
    const weatherPressure = document.getElementById('pressure');
    const windSpeed = document.getElementById('speed');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position)

            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}`;

            const response = await fetch(url);
            const jsonResponse = await response.json();
            const { country } = jsonResponse.sys;
            const { description, icon } = jsonResponse.weather[0];
            const { temp, humidity, temp_min, pressure } = jsonResponse.main;
            const { name } = jsonResponse;
            const { speed } = jsonResponse.wind;
            const temperature = Math.floor(temp - 273.15);
            const minTemperature = Math.floor(temp_min - 273.15);


            location.textContent = `${name}, ${country}`
            weatherDescription.textContent = description;
            tempView.innerHTML = `<p>${temperature} &#8451;</p>`;
            weatherIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
            weatherHumidity.textContent = `Relative Humidity : ${humidity} ٪`;
            weatherTempMin.innerHTML = `<p>Min-Temperature : ${minTemperature} &#8451;</p> `
            weatherPressure.textContent = `Atmospheric pressure : ${pressure} kPa`;
            windSpeed.textContent = `Wind Speed : ${speed} MPH`



        })
    }
})


// api.openweathermap.org/data/2.5/weather?lat=52.2330116&lon=6.8890545&appid=eab457c2463581c3e22d1020b442c904