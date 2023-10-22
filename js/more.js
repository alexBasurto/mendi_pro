function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

// Exporta todas las funciones
export {
    capitalizeWords
  };