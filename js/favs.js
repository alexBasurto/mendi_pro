//función para añadir o quitar peaks de favoritos en localStorage
function addOrRemoveFavs(peakId) {
    if (localStorage.getItem(peakId) === null) {
        localStorage.setItem(peakId, "favoritos");
    } else {
        localStorage.removeItem(peakId);
    }
    //pruebas: addOrRemoveFavs('tt0167261');
}

//función para comprobar si es fav o no
function isFav(peakId) {
    if (localStorage.getItem(peakId) === null) {
        return false;
    } else {
        return true;
    }
}

export { addOrRemoveFavs, isFav };
