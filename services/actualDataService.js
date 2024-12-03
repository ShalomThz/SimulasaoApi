const DataService = require('./dataService');

class ActualDataService {
  constructor() {
    this.crimeData = DataService.getData();
  }

  async perMonth() {
    this.crimeData = DataService.getData();

    return {
      january: await this.getMonth(await this.arrayMonthFiller("01")),
      february: await this.getMonth(await this.arrayMonthFiller("02")),
      march: await this.getMonth(await this.arrayMonthFiller("03")),
      april: await this.getMonth(await this.arrayMonthFiller("04")),
      may: await this.getMonth(await this.arrayMonthFiller("05")),
      juny: await this.getMonth(await this.arrayMonthFiller("06")),
      july: await this.getMonth(await this.arrayMonthFiller("07")),
      august: await this.getMonth(await this.arrayMonthFiller("08")),
      september: await this.getMonth(await this.arrayMonthFiller("09")),
      october: await this.getMonth(await this.arrayMonthFiller("10")),
      november: await this.getMonth(await this.arrayMonthFiller("11")),
      december: await this.getMonth(await this.arrayMonthFiller("12")),
    };
  }

  async arrayMonthFiller(numberMonth) {
    // Filtra directamente desde `this.crimeData`
    return this.crimeData.filter(item => item.date.split("-")[1] === numberMonth);
  }

  async getMonth(monthObjects) {
    // Sumar todas las carpetas y tasas
    const totalFolders = monthObjects.reduce((sum, obj) => sum + obj.folders, 0);
    const totalResearchRate = monthObjects.reduce((sum, obj) => sum + obj.researchFoldersRate, 0);

    // Calcular el promedio de la tasa de investigación
    const averageRate = monthObjects.length > 0 ? totalResearchRate / monthObjects.length : 0;

    // Obtener el municipio con más "folders"
    const mostLikelyMunicipality = this.getMostLikelyMunicipality(monthObjects);

    // Retornar los valores calculados
    return {
      tasa: parseFloat(averageRate.toFixed(2)), // Promedio redondeado a 2 decimales
      folder: totalFolders,
      mostLikelyMunicipality: mostLikelyMunicipality
    };
  }

  getMostLikelyMunicipality(monthObjects) {
    // Contamos los "folders" por municipio
    const municipalityCounts = monthObjects.reduce((acc, obj) => {
      const municipality = obj.inegiMunicipalityName;
      acc[municipality] = (acc[municipality] || 0) + obj.folders;  // Sumamos los "folders"
      return acc;
    }, {});

    // Encontramos el municipio con más "folders"
    const maxCount = Math.max(...Object.values(municipalityCounts));
    const mostLikelyMunicipality = Object.keys(municipalityCounts).find(municipality => municipalityCounts[municipality] === maxCount);

    return mostLikelyMunicipality;
  }
}

module.exports = ActualDataService;
//tomando como referencia los folders
