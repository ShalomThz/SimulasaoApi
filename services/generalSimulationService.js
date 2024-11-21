//const crimeData=require ('../DB/onc-datos-abiertos.json');
class GeneralSimulationService {
  constructor() {
    this.crimeData = [];
  }
  async updateCrimeData(newData){
    this.crimeData=newData;
  }

  async monteCarloSimulation(iterations = 1000) {
    const monthCounts = {};
    const researchRates = [];
    const municipalityCounts = {};

    // Realizamos las simulaciones
    for (let i = 0; i < iterations; i++) {
      // Selecciona una entrada aleatoria del dataset
      const randomIndex = Math.floor(Math.random() * this.crimeData.length);
      const entry = this.crimeData[randomIndex];

      // Cuenta los delitos por mes
      const month = entry.date.split("-")[1];
      monthCounts[month] = (monthCounts[month] || 0) + 1;

      // Añade la tasa de investigación de la carpeta de investigación si es mayor a cero
      if (entry.researchFoldersRate > 0) {
        researchRates.push(entry.researchFoldersRate);
      }

      // Cuenta los delitos por municipio
      const municipality = entry.inegiMunicipalityName;
      municipalityCounts[municipality] = (municipalityCounts[municipality] || 0) + 1;
    }

    return {
      mostLikelyMonths: this.getMostLikelyMonths(monthCounts),
      averageResearchRate: this.getAverageResearchRate(researchRates),
      mostLikelyMunicipality: this.getMostLikelyMunicipality(municipalityCounts)
    };
  }

  getMostLikelyMonths(monthCounts) {
    const maxCount = Math.max(...Object.values(monthCounts));
    return Object.keys(monthCounts).filter(month => monthCounts[month] === maxCount);
  }

  getAverageResearchRate(researchRates) {
    const sum = researchRates.reduce((acc, rate) => acc + rate, 0);
    return (sum / researchRates.length) || 0;
  }

  getMostLikelyMunicipality(municipalityCounts) {
    const maxCount = Math.max(...Object.values(municipalityCounts));
    return Object.keys(municipalityCounts).find(municipality => municipalityCounts[municipality] === maxCount);
  }
}
module.exports = GeneralSimulationService;
