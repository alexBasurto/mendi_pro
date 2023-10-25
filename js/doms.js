/*Funciones creación DOM resultados búsqueda y ficha monte.*/
import * as apis from "./apis.js";
import * as maps from "./maps.js";
import * as favs from "./favs.js";

function displayLoadingAnimation() {
    const mainContainer = document.getElementById("mainContainer");
    const divLoading = document.createElement("div");
    divLoading.className = "loader";

    const circleOne = document.createElement("span");
    divLoading.appendChild(circleOne);
    const circleTwo = document.createElement("span");
    divLoading.appendChild(circleTwo);
    const circleThree = document.createElement("span");
    divLoading.appendChild(circleThree);
    const loadingWord = document.createElement("h2");
    loadingWord.innerText = "Loading...";
    divLoading.appendChild(loadingWord);

    mainContainer.appendChild(divLoading);
}

async function displaySearchResults(peaks) {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    displayLoadingAnimation();
    const mountainCards = [];

    for (let i = 0; i < peaks.length; i++) {
        const mountainCard = document.createElement("article");
        mountainCard.className = "mountainCard";
        mountainCard.addEventListener("click", async function () {
            displayRecordDetails(peaks[i], locationData);
        });
        const mountainCardTxt = document.createElement("article");
        mountainCardTxt.className = "mountainCardTxt";

        //añado info de la api principal
        const mountainName = document.createElement("h3");
        mountainName.innerText = peaks[i].tags.name;
        mountainCardTxt.appendChild(mountainName);

        const mountainElevation = document.createElement("h3");
        mountainElevation.innerText = peaks[i].tags.ele + " msnm";
        mountainCardTxt.appendChild(mountainElevation);

        const mountainLat = document.createElement("p");
        mountainLat.innerText = "Latitude: " + peaks[i].lat;
        mountainCardTxt.appendChild(mountainLat);

        const mountainLon = document.createElement("p");
        mountainLon.innerText = "Longitude: " + peaks[i].lon;
        mountainCardTxt.appendChild(mountainLon);

        //añado info de la localización
        const locationData = await apis.getLocationData(
            peaks[i].lat,
            peaks[i].lon
        );
        if (locationData) {
            // city o village o town
            if (locationData.village !== undefined) {
                const village = document.createElement("p");
                village.innerText = locationData.village;
                mountainCardTxt.appendChild(village);
            } else if (locationData.town !== undefined) {
                const town = document.createElement("p");
                town.innerText = locationData.town;
                mountainCardTxt.appendChild(town);
            } else if (locationData.city !== undefined) {
                const city = document.createElement("p");
                city.innerText = locationData.city;
                mountainCardTxt.appendChild(city);
            }

            //province or state_district
            if (locationData.province !== undefined) {
                const province = document.createElement("p");
                province.innerText = locationData.province;
                mountainCardTxt.appendChild(province);
            } else if (locationData.state_district !== undefined) {
                const state_district = document.createElement("p");
                state_district.innerText = locationData.state_district;
                mountainCardTxt.appendChild(state_district);
            }

            //state
            const state = document.createElement("p");
            state.innerText = locationData.state;
            mountainCardTxt.appendChild(state);

            // pais
            const country = document.createElement("p");
            country.innerText = locationData.country;
            mountainCardTxt.appendChild(country);
        }

        mountainCard.appendChild(mountainCardTxt);

        // añado foto
        const imageUrl = await apis.getPhotoByPeakName(peaks[i].tags.name);

        const mountainImg = document.createElement("img");
        mountainImg.setAttribute("src", imageUrl);
        mountainCard.appendChild(mountainImg);

        // añado cada card a mountainCards
        mountainCards.push(mountainCard);
    }
    // genero DOM de cards desde mountainCards
    mainContainer.innerHTML = "";
    for (let i = mountainCards.length - 1; i >= 0; i--) {
        mainContainer.appendChild(mountainCards[i]);
    }
}

async function displayRecordDetails(peak, locationData) {
    /*
    La fn recibe los objetos peak y locationData
    Y llama a:
    getWeatherForecastByLocation
    getCurrentWeatherByLocation
    y getPhotoByPeakName (4)
    */
    const mainContainer = document.getElementById("mainContainer");
    const mountainElements = [];
    mainContainer.innerHTML = "";
    displayLoadingAnimation();

    //nombre y altitud
    const $mountainHeader = document.createElement("section");
    $mountainHeader.className = "mountainHeader";
    const $mountainName = document.createElement("h2");
    $mountainName.innerText = peak.tags.name;
    $mountainHeader.appendChild($mountainName);

    const $mountainElevation = document.createElement("h2");
    $mountainElevation.innerText = peak.tags.ele + " msnm";
    $mountainHeader.appendChild($mountainElevation);

    mountainElements.push($mountainHeader);

    // botón favoritos
    const $favSection = document.createElement('section');
    $favSection.className = "favSection";
    const $favIcon = document.createElement('img');
    if (favs.isFav(peak.id)) {
        $favIcon.setAttribute("src", "../assets/fav.png");
    } else {
        $favIcon.setAttribute("src", "../assets/nofav.png");
    };
    $favIcon.addEventListener('click', () => {
        const currentSrc = $favIcon.getAttribute('src');
        if (currentSrc === '../assets/fav.png') {
          $favIcon.setAttribute("src", "../assets/nofav.png");
        } else if (currentSrc === '../assets/nofav.png') {
          $favIcon.setAttribute("src", "../assets/fav.png");
        };
        favs.addOrRemoveFavs(peak.id);
    });
    $favSection.appendChild($favIcon);
    mountainElements.push($favSection);

    //información adicional Peak
    const $mountainText = document.createElement("section");
    const mountainLat = document.createElement("p");
    mountainLat.innerText = "Latitude: " + peak.lat;
    $mountainText.appendChild(mountainLat);

    const mountainLon = document.createElement("p");
    mountainLon.innerText = "Longitude: " + peak.lon;
    $mountainText.appendChild(mountainLon);

    //información adicional Location
    if (locationData) {
        // city o village o town
        if (locationData.village !== undefined) {
            const village = document.createElement("p");
            village.innerText = locationData.village;
            $mountainText.appendChild(village);
        } else if (locationData.town !== undefined) {
            const town = document.createElement("p");
            town.innerText = locationData.town;
            $mountainText.appendChild(town);
        } else if (locationData.city !== undefined) {
            const city = document.createElement("p");
            city.innerText = locationData.city;
            $mountainText.appendChild(city);
        }

        //province or state_district
        if (locationData.province !== undefined) {
            const province = document.createElement("p");
            province.innerText = locationData.province;
            $mountainText.appendChild(province);
        } else if (locationData.state_district !== undefined) {
            const state_district = document.createElement("p");
            state_district.innerText = locationData.state_district;
            $mountainText.appendChild(state_district);
        }

        //state
        const state = document.createElement("p");
        state.innerText = locationData.state;
        $mountainText.appendChild(state);

        // pais
        const country = document.createElement("p");
        country.innerText = locationData.country;
        $mountainText.appendChild(country);
    }

    mountainElements.push($mountainText);

    // añado 5 fotos
    const imageUrl = await apis.getPhotoByPeakName(peak.tags.name, 5);
    const imageContainer = document.createElement("section");

    for (let i = imageUrl.length - 1; i >= 0; i--) {
        const mountainImg = document.createElement("img");
        mountainImg.setAttribute("src", imageUrl[i]);
        imageContainer.appendChild(mountainImg);
    }
    mountainElements.push(imageContainer);

    //mapas
    const mapElement = document.createElement("div");
    mapElement.id = "map";
    mountainElements.push(mapElement);

    //pronostico tiempo
    /*
    ☁️🌨️⛈️🌩️🌧️⛅🌤️❄️🌦️🌥️🌪️☀️🌞
    */
    const weatherFcObject = await apis.getWeatherForecastByLocation(
        peak.lat,
        peak.lon
    );

    const weatherForecast = document.createElement("section");
    weatherForecast.className = "weatherForecast";

    const weatherFCTitle = document.createElement("h4");
    weatherFCTitle.innerText = "Weather Forecast For The Next 7 Days";
    weatherForecast.appendChild(weatherFCTitle);

    const weatherEmojis = {
        0: "☀️", // Cloud development not observed or not observable
        1: "🌤️", // Clouds generally dissolving or becoming less developed
        2: "☁️", // State of sky on the whole unchanged
        3: "🌥️", // Clouds generally forming or developing
        4: "🌫️", // Visibility reduced by smoke
        5: "🌫️", // Haze
        6: "🌫️", // Widespread dust in suspension
        7: "🌫️", // Dust or sand raised by wind
        8: "🌫️", // Well developed dust whirl(s) or sand whirl(s)
        9: "🌪️", // Duststorm or sandstorm
        10: "🌫️", // Mist
        11: "🌫️", // Patches of shallow fog
        12: "🌫️", // More or less continuous shallow fog
        13: "🌩️", // Lightning visible, no thunder heard
        14: "🌦️", // Precipitation within sight, not reaching the ground
        15: "🌦️", // Precipitation within sight, reaching the ground, but distant
        16: "🌦️", // Precipitation within sight, reaching the ground, near but not at the station
        17: "🌩️", // Thunderstorm, but no precipitation
        18: "🌪️", // Squalls
        19: "🌪️", // Funnel cloud(s)
        20: "🌧️", // Drizzle or snow grains
        21: "🌧️", // Rain
        22: "❄️", // Snow
        23: "🌧❄️", // Rain and snow or ice pellets
        24: "🌧❄️", // Freezing drizzle or freezing rain
        25: "🌧️", // Showers of rain
        26: "🌨️", // Showers of snow, or of rain and snow
        27: "🌨️", // Showers of hail
        28: "🌫️", // Fog or ice fog
        29: "🌩️", // Thunderstorm (with or without precipitation)
        30: "🌫️", // Slight or moderate duststorm or sandstorm
        31: "🌫️", // Slight or moderate duststorm or sandstorm
        32: "🌫️", // Severe duststorm or sandstorm
        33: "🌫️", // Severe duststorm or sandstorm
        34: "🌨️", // Slight or moderate blowing snow
        35: "🌨️", // Heavy drifting snow
        36: "🌨️", // Slight or moderate blowing snow
        37: "🌨️", // Heavy drifting snow
        38: "🌨️", // Slight or moderate blowing snow
        39: "🌨️", // Heavy drifting snow
        40: "🌫️", // Fog or ice fog
        41: "🌫️", // Fog or ice fog in patches
        42: "🌫️", // Fog or ice fog, sky visible
        43: "🌫️", // Fog or ice fog, sky invisible
        44: "🌫️", // Fog or ice fog, sky visible
        45: "🌫️", // Fog or ice fog, sky invisible
        46: "🌫️", // Fog or ice fog, sky visible
        47: "🌫️", // Fog or ice fog, sky invisible
        48: "🌫️", // Fog, depositing rime, sky visible
        49: "🌫️", // Fog, depositing rime, sky invisible
        50: "🌧️", // Drizzle
        51: "🌧️", // Drizzle
        52: "🌧️", // Drizzle
        53: "🌧️", // Drizzle
        54: "🌨️", // Drizzle
        55: "🌨️", // Drizzle
        56: "🌨️", // Drizzle
        57: "🌨️", // Drizzle
        58: "🌧❄️", // Drizzle
        59: "🌧❄️", // Drizzle
        60: "🌧️", // Rain
        61: "🌧️", // Rain
        62: "🌧️", // Rain
        63: "🌧️", // Rain
        64: "❄️", // Rain
        65: "❄️", // Rain
        66: "❄️", // Rain
        67: "🌨️", // Rain
        68: "🌨️", // Rain
        69: "🌨️", // Rain
        70: "❄️", // Intermittent fall of snowflakes
        71: "❄️", // Continuous fall of snowflakes
        72: "❄️", // Intermittent fall of snowflakes
        73: "❄️", // Continuous fall of snowflakes
        74: "❄️", // Intermittent fall of snowflakes
        75: "❄️", // Continuous fall of snowflakes
        76: "❄️", // Diamond dust
        77: "❄️", // Snow grains
        78: "❄️", // Isolated star-like snow crystals
        79: "❄️", // Ice pellets
        80: "🌧️", // Rain showers, slight
        81: "🌧️", // Rain showers, moderate or heavy
        82: "🌧️", // Rain showers, violent
        83: "🌧❄️", // Showers of rain and snow mixed, slight
        84: "🌧❄️", // Showers of rain and snow mixed, moderate or heavy
        85: "❄️", // Snow showers, slight
        86: "❄️", // Snow showers, moderate or heavy
        87: "🌨️", // Showers of snow pellets or small hail
        88: "🌨️", // Showers of snow pellets or small hail
        89: "🌨️", // Showers of hail
        90: "🌨️", // Showers of hail
        91: "🌧️", // Slight rain
        92: "🌧️", // Moderate or heavy rain
        93: "🌨️", // Slight snow
        94: "🌨️", // Moderate or heavy snow
        95: "🌩️", // Thunderstorm, slight or moderate, without hail
        96: "🌩️", // Thunderstorm, slight or moderate, with hail
        97: "🌩️", // Thunderstorm, heavy, without hail
        98: "🌩️", // Thunderstorm combined with duststorm or sandstorm
        99: "🌩️", // Thunderstorm, heavy, with hail
    };

    for (let i = 0; i < 7; i++) {
        const dayOfWeekElem = document.createElement("section");

        //día de la semana
        const dayOfWeek = document.createElement("p");
        dayOfWeek.className = "dayOfWeek";
        dayOfWeek.innerText = weatherFcObject.time[i];
        dayOfWeekElem.appendChild(dayOfWeek);

        // //weather code
        const weatherCode = document.createElement("p");
        weatherCode.className = "weatherCode";
        weatherCode.innerText = weatherEmojis[weatherFcObject.weathercode[i]];
        dayOfWeekElem.appendChild(weatherCode);

        //temp 2m max
        const tempMaxTag = document.createElement("p");
        tempMaxTag.innerText = "TMAX";
        dayOfWeekElem.appendChild(tempMaxTag);

        const tempMax = document.createElement("p");
        tempMax.innerText = weatherFcObject.temperature_2m_max[i] + " °C";
        dayOfWeekElem.appendChild(tempMax);

        //temp 2m min
        const tempMinTag = document.createElement("p");
        tempMinTag.innerText = "TMIN";
        dayOfWeekElem.appendChild(tempMinTag);

        const tempMin = document.createElement("p");
        tempMin.innerText = weatherFcObject.temperature_2m_min[i] + " °C";
        dayOfWeekElem.appendChild(tempMin);

        //sunrise
        const sunriseTag = document.createElement("p");
        sunriseTag.innerText = "SUNRISE";
        dayOfWeekElem.appendChild(sunriseTag);

        const sunrise = document.createElement("p");
        sunrise.innerText = weatherFcObject.sunrise[i].substring(11);
        dayOfWeekElem.appendChild(sunrise);

        //sunset
        const sunsetTag = document.createElement("p");
        sunsetTag.innerText = "SUNSET";
        dayOfWeekElem.appendChild(sunsetTag);

        const sunset = document.createElement("p");
        sunset.innerText = weatherFcObject.sunset[i].substring(11);
        dayOfWeekElem.appendChild(sunset);

        //uv index max
        const uvMaxTag = document.createElement("p");
        uvMaxTag.innerText = "UVMAX";
        dayOfWeekElem.appendChild(uvMaxTag);

        const uvMax = document.createElement("p");
        uvMax.innerText = weatherFcObject.uv_index_max[i];
        dayOfWeekElem.appendChild(uvMax);

        //rain_sum
        const rainTag = document.createElement("p");
        rainTag.innerText = "RAIN";
        dayOfWeekElem.appendChild(rainTag);

        const rainSum = document.createElement("p");
        rainSum.innerText = weatherFcObject.rain_sum[i] + " mm";
        dayOfWeekElem.appendChild(rainSum);

        //snowfall_sum
        const snowTag = document.createElement("p");
        snowTag.innerText = "SNOW";
        dayOfWeekElem.appendChild(snowTag);

        const snowSum = document.createElement("p");
        snowSum.innerText = weatherFcObject.snowfall_sum[i] + " cm";
        dayOfWeekElem.appendChild(snowSum);

        //windspeed_10m_max
        const windSpeedTag = document.createElement("p");
        windSpeedTag.innerText = "WIND SPEED";
        dayOfWeekElem.appendChild(windSpeedTag);

        const windspeed = document.createElement("p");
        windspeed.innerText = weatherFcObject.windspeed_10m_max[i] + " km/h";
        dayOfWeekElem.appendChild(windspeed);

        //winddirection_10m_dominant
        const windDirTag = document.createElement("p");
        windDirTag.innerText = "WIND DIR";
        dayOfWeekElem.appendChild(windDirTag);

        const winddir = document.createElement("p");
        winddir.innerText = weatherFcObject.winddirection_10m_dominant[i] + "º";
        dayOfWeekElem.appendChild(winddir);

        //añado toda la info del día al contenedor de forecast
        weatherForecast.appendChild(dayOfWeekElem);
    }

    mountainElements.push(weatherForecast);

    //tiempo actual
    const currentWeather = await apis.getCurrentWeatherByLocation(
        peak.lat,
        peak.lon
    );
    const currentWeatherElem = document.createElement("section");
    currentWeatherElem.className = "currentWeather";

    const currWeatherTitle = document.createElement("h4");
    currWeatherTitle.innerText = "Current Weather";
    currentWeatherElem.appendChild(currWeatherTitle);

    // //weathercode
    // const currWeatherCodeTag = document.createElement("p");
    // currWeatherCodeTag.innerText = "WCODE";
    // currentWeatherElem.appendChild(currWeatherCodeTag);

    const currWeatherCode = document.createElement("p");
    currWeatherCode.className = "weatherCode";
    currWeatherCode.innerText = weatherEmojis[currentWeather.weathercode];
    currentWeatherElem.appendChild(currWeatherCode);

    //temperature_2m
    const currTempTag = document.createElement("p");
    currTempTag.innerText = "TEMP";
    currentWeatherElem.appendChild(currTempTag);

    const currTemp = document.createElement("p");
    currTemp.innerText = currentWeather.temperature_2m + " ºC";
    currentWeatherElem.appendChild(currTemp);
    //relativehumidity_2m
    const currRelHumidityTag = document.createElement("p");
    currRelHumidityTag.innerText = "REL.HUM.";
    currentWeatherElem.appendChild(currRelHumidityTag);

    const currRelHumidity = document.createElement("p");
    currRelHumidity.innerText = currentWeather.relativehumidity_2m + "%";
    currentWeatherElem.appendChild(currRelHumidity);
    //apparent_temperature
    const currApparentTempTag = document.createElement("p");
    currApparentTempTag.innerText = "APP.TEMP";
    currentWeatherElem.appendChild(currApparentTempTag);

    const currApparentTemp = document.createElement("p");
    currApparentTemp.innerText = currentWeather.apparent_temperature + " ºC";
    currentWeatherElem.appendChild(currApparentTemp);
    //is_day
    const currIsDayTag = document.createElement("p");
    currIsDayTag.innerText = "DAY/NIGHT";
    currentWeatherElem.appendChild(currIsDayTag);

    const currIsDay = document.createElement("p");
    currIsDay.innerText = currentWeather.is_day;
    currentWeatherElem.appendChild(currIsDay);
    //rain
    const currRainTag = document.createElement("p");
    currRainTag.innerText = "RAIN";
    currentWeatherElem.appendChild(currRainTag);

    const currRain = document.createElement("p");
    currRain.innerText = currentWeather.rain + " mm";
    currentWeatherElem.appendChild(currRain);
    //snowfall
    const currSnowfallTag = document.createElement("p");
    currSnowfallTag.innerText = "SNOW";
    currentWeatherElem.appendChild(currSnowfallTag);

    const currSnowfall = document.createElement("p");
    currSnowfall.innerText = currentWeather.snowfall + " cm";
    currentWeatherElem.appendChild(currSnowfall);

    //cloudcover
    const cloudCoverTag = document.createElement("p");
    cloudCoverTag.innerText = "CLOUDY";
    currentWeatherElem.appendChild(cloudCoverTag);

    const cloudCover = document.createElement("p");
    cloudCover.innerText = currentWeather.cloudcover + "%";
    currentWeatherElem.appendChild(cloudCover);
    //windspeed_10m
    const currWindSpeedTag = document.createElement("p");
    currWindSpeedTag.innerText = "WSPEED";
    currentWeatherElem.appendChild(currWindSpeedTag);

    const currWindSpeed = document.createElement("p");
    currWindSpeed.innerText = currentWeather.windspeed_10m + " km/h";
    currentWeatherElem.appendChild(currWindSpeed);
    //winddirection_10m
    const currWindDirectionTag = document.createElement("p");
    currWindDirectionTag.innerText = "WDIR";
    currentWeatherElem.appendChild(currWindDirectionTag);

    const currWindDirection = document.createElement("p");
    currWindDirection.innerText = currentWeather.winddirection_10m + "º";
    currentWeatherElem.appendChild(currWindDirection);

    mountainElements.push(currentWeatherElem);

    mainContainer.innerText = "";
    /*añado elementos DOM a mainContainer*/
    const articleBigCard = document.createElement("article");
    articleBigCard.className = "mountainBigCard";
    for (let i = 0; i < mountainElements.length; i++) {
        articleBigCard.appendChild(mountainElements[i]);
    }
    mainContainer.appendChild(articleBigCard);

    //añado el mapa
    await maps.getMapByCoordinates(peak.lat, peak.lon);
}

// Exporta todas las funciones
export { displaySearchResults, displayRecordDetails };
