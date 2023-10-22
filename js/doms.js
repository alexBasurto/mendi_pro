/*Funciones creación DOM resultados búsqueda y ficha monte.*/

function displaySearchResults(peaks) {
    const mainContainer = document.getElementById('mainContainer');
    const mountainCard = document.createElement('article');
    mountainCard.className = 'mountainCard';

    for (let i = 0; i < peaks.length; i++) {
        const mountainCard = document.createElement('article');
        mountainCard.className = 'mountainCard';

        const mountainName = document.createElement('h3');
        mountainName.innerText = peaks[i].tags.name;
        mountainCard.appendChild(mountainName);

        const mountainElevation = document.createElement('h3');
        mountainElevation.innerText = peaks[i].tags.ele;
        mountainCard.appendChild(mountainElevation);

        const mountainLat = document.createElement('p');
        mountainLat.innerText = 'Latitude: ' + peaks[i].lat;
        mountainCard.appendChild(mountainLat);

        const mountainLon = document.createElement('p');
        mountainLon.innerText = 'Longitude: ' + peaks[i].lon;
        mountainCard.appendChild(mountainLon);

        mainContainer.appendChild(mountainCard);
    }   

    /*Esta fn muestra en formato tarjeta cada registro devuelto por la búsqueda
    
    Desde a aquí llamaremos a 
    getLocationData
    y getPhotoByPeakName (1)
    */

}

function displayRecordDetails(peakid) {
    /*
    Desdea aquí llamaremos a 
    getLocationData
    getWeatherForecastByLocation
    getCurrentWeatherByLocation
    y getPhotoByPeakName (4)
    */
   
}

// Exporta todas las funciones
export {
    displaySearchResults,
    displayRecordDetails
  };