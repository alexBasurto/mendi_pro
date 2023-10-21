/*Funciones solicitud datos APIs:
    -   OverPass.de
    -   Nominatim
    -   OpenWeather
    -   Flickr
*/

async function getPeaksByNameElevation(name, altMin, altMax) {
    /* Búsqueda picos por nombre y rango altitud (1k-2k, 2k-3k, ...).
    Limitar a 20 resultados.
    Crear una lista de areas para poner en desplegable formulario.
    OVERPASS.DE
    https://overpass-api.de/api/interpreter?data=[out:json];node[natural=peak][name~%22Curavacas%22];%20out%20geom;
    */
    const urlBase = 'https://overpass-api.de/api/interpreter?data=[out:json];node[natural=peak]';
    const urlPeakName = `[name~%22${name}%22];%20out%20geom;`;
    const urlSearch = urlBase + urlPeakName;

    try {
        const response = await fetch(urlSearch);
        if (!response.ok) {
            throw new Error('Fallo en la llamada a la API de OpenStreetMap.');
        }
        const peaks = await response.json();

        // Filtrar los resultados por altitud
        const filteredPeaks = peaks.elements.filter(peak => {
            const altitude = parseFloat(peak.tags.ele);
            return altitude >= altMin && altitude <= altMax;
        });
        console.log(filteredPeaks); /*borrar al final del proy.*/
        /*aquí llamaremos a la fn del DOM de resultados búsqueda*/
    } catch(e) {
        console.error(e);
        alert('Fallo en la llamada de OpenStreetMap.');
    }
}

async function getLocationData(latitude, longitude) {
    /*
    Para cada monte, al mostrarlo en resultados búsqueda y al mostrar su ficha grande, daremos más info de su ubicación.
    Village, State District, State, Country.
    NOMINATIM.OPENSTREETMAP.ORG
    https://nominatim.openstreetmap.org/reverse?format=json&lat=42.9767956&lon=-4.6736744&zoom=10&addressdetails=1
    */
    const urlBase = `https://nominatim.openstreetmap.org/reverse?format=json`;
    const urlLat = `&lat=${latitude}`;
    const urlLon = `&lon=${longitude}`;
    const urlEnding = `&zoom=10&addressdetails=1`;
    const urlLocationData = urlBase + urlLat + urlLon + urlEnding;

    try {
        const response = await fetch(urlLocationData);
        if (!response.ok) {
            throw new Error('Fallo en la llamada a la API de Nominatim.');
        }
        const peakData = await response.json();
        console.log(peakData); /*borrar al final del proy.*/
        /*Esta fn será llamada desde la fn del DOM de resultados búsqueda*/
        return peakData;
    } catch(e) {
        console.error(e);
        alert('Fallo en la llamada a la API de Nominatim.');
    }
}

async function getWeatherForecastByLocation(latitude, longitude) {
    /*
    Para cada monte, al mostrar su ficha grande, mostramos prónostico del tiempo para los próximos 7 días.
    OPEN-METEO.COM
    https://api.open-meteo.com/v1/forecast?latitude=42.9767956&longitude=-4.6736744&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin
    */
}

async function getCurrentWeatherByLocation(latitude, longitude) {
    /*
    Para cada monte, al mostrar su ficha grande, mostramos el tiempo en ese mismo momento.
    OPEN-METEO.COM
    https://api.open-meteo.com/v1/forecast?latitude=42.9767956&longitude=4.6736744&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m,windgusts_10m&timezone=Europe%2FBerlin&forecast_days=1
    */
}

async function getPhotoByPeakName(peak) {
    /*
    Para cada monte, al mostrarlo en resultados búsqueda y al mostrar su ficha grande, mostraremos una foto del mismo.
    FLICKR.COM
    https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f45f3b3df66cec1d7713b68ebc5d62fe&text=Curavacas&per_page=10&format=json&nojsoncallback=1
    */
    const urlBase = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f45f3b3df66cec1d7713b68ebc5d62fe`;
    const urlPeak = `&text=${peak}&per_page=1&format=json&nojsoncallback=1`;
    const urlApiPhoto = urlBase + urlPeak;

    try {
        const response = await fetch(urlApiPhoto);
        if (!response.ok) {
            throw new Error('Fallo en la llamada a la API de Flickr.');
        }
        const photoObj = await response.json();
        /*https://farm66.staticflickr.com/65535/53100814285_db44ab7b9d.jpg
        debo crear una URL como esta*/
        const photoUrlBase = `https://farm66.staticflickr.com/`;
        const photoUrlServer = `${photoObj.photos.photo[0].server}/`;
        const photoUrlId = `${photoObj.photos.photo[0].id}_`;
        const photoUrlSecret = `${photoObj.photos.photo[0].secret}.jpg`;
        const photoUrl = photoUrlBase + photoUrlServer + photoUrlId + photoUrlSecret;
        console.log(photoUrl); /*borrar al final del proy.*/
        /*Esta fn será llamada desde la fn del DOM de resultados búsqueda*/
        return photoUrl;
    } catch(e) {
        console.error(e);
        alert('Fallo en la llamada a la API de Flickr.');
    }
}

// Exporta todas las funciones
export { getPeaksByNameElevation, getLocationData, getWeatherForecastByLocation, getCurrentWeatherByLocation, getPhotoByPeakName };
