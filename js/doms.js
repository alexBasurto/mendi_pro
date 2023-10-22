/*Funciones creación DOM resultados búsqueda y ficha monte.*/
import * as apis from './apis.js';

async function displaySearchResults(peaks) {
    const mainContainer = document.getElementById('mainContainer');
    
    for (let i = 0; i < peaks.length; i++) {
        const mountainCard = document.createElement('article');
        mountainCard.className = 'mountainCard';
        mountainCard.addEventListener('click', function () { displayRecordDetails(peaks[i], locationData)});
        const mountainCardTxt = document.createElement('article');
        
        //añado info de la api principal
        const mountainName = document.createElement('h3');
        mountainName.innerText = peaks[i].tags.name;
        mountainCardTxt.appendChild(mountainName);

        const mountainElevation = document.createElement('h3');
        mountainElevation.innerText = peaks[i].tags.ele + ' msnm';
        mountainCardTxt.appendChild(mountainElevation);

        const mountainLat = document.createElement('p');
        mountainLat.innerText = 'Latitude: ' + peaks[i].lat;
        mountainCardTxt.appendChild(mountainLat);

        const mountainLon = document.createElement('p');
        mountainLon.innerText = 'Longitude: ' + peaks[i].lon;
        mountainCardTxt.appendChild(mountainLon);

        //añado info de la localización
        const locationData = await apis.getLocationData(peaks[i].lat, peaks[i].lon);

        // city o village o town
        if (locationData.village !== undefined) {
            const village = document.createElement('p')
            village.innerText = locationData.village;
            mountainCardTxt.appendChild(village);
        } else if (locationData.town !== undefined) {
            const town = document.createElement('p')
            town.innerText = locationData.town;
            mountainCardTxt.appendChild(town);
        } else if (locationData.city !== undefined) {
            const city = document.createElement('p')
            city.innerText = locationData.city;
            mountainCardTxt.appendChild(city);
        }
        
        //province or state_district
        if (locationData.province !== undefined) {
            const province = document.createElement('p');
            province.innerText = locationData.province;
            mountainCardTxt.appendChild(province);
        } else if (locationData.state_district !== undefined) {
            const state_district = document.createElement('p');
            state_district.innerText = locationData.state_district;
            mountainCardTxt.appendChild(state_district);
        }

        //state
        const state = document.createElement('p');
        state.innerText = locationData.state;
        mountainCardTxt.appendChild(state);

        // pais
        const country = document.createElement('p');
        country.innerText = locationData.country;
        mountainCardTxt.appendChild(country);

        mountainCard.appendChild(mountainCardTxt);

        // añado foto
        const imageUrl = await apis.getPhotoByPeakName(peaks[i].tags.name);

        const mountainImg = document.createElement('img');
        mountainImg.setAttribute('src', imageUrl);
        mountainCard.appendChild(mountainImg);

        // añado cada card a mainContainer
        mainContainer.appendChild(mountainCard);
    }   

    /*Esta fn muestra en formato tarjeta cada registro devuelto por la búsqueda
    
    Desde a aquí llamaremos a 
    getLocationData
    y getPhotoByPeakName (1)
    */

}

function displayRecordDetails(peak, locationData) {
    /*
    La fn recibe los objetos peak y locationData
    Y llama a:
    getWeatherForecastByLocation
    getCurrentWeatherByLocation
    y getPhotoByPeakName (4)
    */
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.innerHTML = '';

    mainContainer.innerText = peak.tags.name + locationData.country; /*LINEA DE PRUEBA!*/
   
}

// Exporta todas las funciones
export {
    displaySearchResults,
    displayRecordDetails
  };