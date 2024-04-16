// WEATHER APP

const weatherform = document.querySelector(".WeatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey ="cd35dc62a22dbfc552e736ce346dc74a";

weatherform.addEventListener("submit", async event => {
   
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeather(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error)
        }
    }else{
        displayError("Please enter a city");
    }
})

async function getWeather(city){
    
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
   const { name: city, main:{temp, humidity} ,weather:[{description, id}] } = data;

   textContent ="";
   card.style.display = "flex";
   
   const cityDisplay = document.createElement('h1');
   const tempDisplay = document.createElement('p');
   const humidityDisplay = document.createElement('p');
   const descDisplay = document.createElement('p');
   const weathericon = document.createElement('p');

   cityDisplay.textContent = city;
   tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°C`;
   humidityDisplay.textContent = `Humidity: ${humidity}%`;
   descDisplay.textContent = `Description: ${description}`;
   weathericon.textContent = getWeatherEmoji(id);

   cityDisplay.classList.add('cityDisplay');
   tempDisplay.classList.add('tempDisplay');
   humidityDisplay.classList.add('humidityDisplay');
   descDisplay.classList.add('descDisplay');
   weathericon.classList.add('WeatherIcon');
   
   card.appendChild(cityDisplay);
   card.appendChild(tempDisplay);
   card.appendChild(humidityDisplay);
   card.appendChild(descDisplay);
   card.appendChild(weathericon);
}

function getWeatherEmoji(weatherId){
   switch (true){
       case weatherId >= 200 && weatherId <= 232:
           return "⛈";
       case weatherId >= 300 && weatherId <= 321:
           return "🌧";
       case weatherId >= 500 && weatherId <= 531:
           return "🌧";
       case weatherId >= 600 && weatherId <= 622:
           return "🌨";
       case weatherId >= 701 && weatherId <= 781:
           return "🌫";
       case weatherId === 800:
           return "☀️";
       case weatherId >= 801 && weatherId <= 804:
           return "☁️";
       default:
           return "🤷‍♀️";
   }
}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}  