async function displaySearchResults(peaks) {
    const mainContainer = document.getElementById('mainContainer');
    const cardPromises = [];

    for (let i = 0; i < peaks.length; i++) {
        const mountainCard = document.createElement('article');
        mountainCard.className = 'mountainCard';

        const mountainCardTxt = document.createElement('article');

        // añado info de la api principal
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

        // Añado info de la localización y fotos a las Promesas
        const locationPromise = apis.getLocationData(peaks[i].lat, peaks[i].lon);
        const photoPromise = apis.getPhotoByPeakName(peaks[i].tags.name);
        
        cardPromises.push(
            Promise.all([locationPromise, photoPromise]).then(([locationData, imageUrl]) => {
                // city o village o town
                if (locationData.village !== undefined) {
                    const village = document.createElement('p');
                    village.innerText = locationData.village;
                    mountainCardTxt.appendChild(village);
                } else if (locationData.town !== undefined) {
                    const town = document.createElement('p');
                    town.innerText = locationData.town;
                    mountainCardTxt.appendChild(town);
                } else if (locationData.city !== undefined) {
                    const city = document.createElement('p');
                    city.innerText = locationData.city;
                    mountainCardTxt.appendChild(city);
                }

                // province or state_district
                if (locationData.province !== undefined) {
                    const province = document.createElement('p');
                    province.innerText = locationData.province;
                    mountainCardTxt.appendChild(province);
                } else if (locationData.state_district !== undefined) {
                    const state_district = document.createElement('p');
                    state_district.innerText = locationData.state_district;
                    mountainCardTxt.appendChild(state_district);
                }

                // state
                const state = document.createElement('p');
                state.innerText = locationData.state;
                mountainCardTxt.appendChild(state);

                // país
                const country = document.createElement('p');
                country.innerText = locationData.country;
                mountainCardTxt.appendChild(country);

                // Añado foto
                const mountainImg = document.createElement('img');
                mountainImg.setAttribute('src', imageUrl);
                mountainCard.appendChild(mountainImg);

                mountainCard.appendChild(mountainCardTxt);
                mainContainer.appendChild(mountainCard);
            })
        );
    }

    // Espera a que todas las Promesas se resuelvan antes de continuar
    await Promise.all(cardPromises);

    // Ahora todo el DOM se creará cuando todos los datos estén disponibles.
}
