// Importa todas las funciones de ./js/apis.js
import * as apis from './js/apis.js';
import * as doms from './js/doms.js';

const peakSearchForm = document.getElementById('peaksSearchEngine');
const refreshButton = document.getElementById('clearForm');
const mainContainer = document.getElementById('mainContainer');

peakSearchForm.addEventListener('submit', function (event) {
    event.preventDefault();    
    const peakName = document.getElementById('peakName').value;
    const peakElevation = document.getElementById('peakElevation').value;

    peakSearchForm.reset();
    mainContainer.innerHTML = '';

    if (peakName === '') {
        alert('Please, insert a peak name.');
        return;
    }

    const elevationRanges = {
        "0-9000": [0, 9000],
        "lt1000": [0, 1000],
        "1000-2000": [1000, 2000],
        "2000-3000": [2000, 3000],
        "3000-4000": [3000, 4000],
        "4000-5000": [4000, 5000],
        "5000-6000": [5000, 6000],
        "6000-7000": [6000, 7000],
        "7000-8000": [7000, 8000],
        "gt8000": [8000, 9000]
      };

    apis.getPeaksByNameElevation(peakName, elevationRanges[peakElevation][0], elevationRanges[peakElevation][1]).then(peaksResults => {
        doms.displaySearchResults(peaksResults);
    }).catch(error => {
        console.error(error);
        mainContainer.innerText = error;
    });

        
  });

  refreshButton.addEventListener('click', function (event) {
    mainContainer.innerHTML = '';
  });