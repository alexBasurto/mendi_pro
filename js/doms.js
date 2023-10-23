/*Funciones creación DOM resultados búsqueda y ficha monte.*/
import * as apis from "./apis.js";

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
        mountainCard.addEventListener("click", function () {
            displayRecordDetails(peaks[i], locationData);
        });
        const mountainCardTxt = document.createElement("article");

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
    const $mountainName = document.createElement("h2");
    $mountainName.innerText = peak.tags.name;
    $mountainHeader.appendChild($mountainName);

    const $mountainElevation = document.createElement("h2");
    $mountainElevation.innerText = peak.tags.ele + "msnm";
    $mountainHeader.appendChild($mountainElevation);

    mountainElements.push($mountainHeader);

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
    const imageContainer = document.createElement('section');

    for (let i = imageUrl.length - 1; i >= 0; i--) {
        const mountainImg = document.createElement("img");
        mountainImg.setAttribute("src", imageUrl[i]);
        imageContainer.appendChild(mountainImg);
    }
    mountainElements.push(imageContainer);
    
    //mapas

    //pronostico tiempo

    //tiempo actual

    mainContainer.innerText = "";
    /*añado elementos DOM a mainContainer*/
    for (let i = 0; i < mountainElements.length; i++) {
        mainContainer.appendChild(mountainElements[i]);
    }
}

// Exporta todas las funciones
export { displaySearchResults, displayRecordDetails };
