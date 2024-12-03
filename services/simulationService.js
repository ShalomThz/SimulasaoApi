const  DataService =require( './dataService');

class SimulationService {
  constructor() {
    this.crimeData = DataService.getData();
  }


  async monteCarloSimulationPerMonth(iterations = 10000) {
    this.crimeData = DataService.getData();
    const monthCounts = {};  // Contador de delitos por mes
    const researchRates = {}; // Lista de tasas de investigación por mes
    const municipalityCounts = {};  // Contador de delitos por municipio
    const monthData = {};  // Datos de delitos por mes

    // Inicializa las estructuras para cada mes
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');  // Asegura el formato de 01, 02,...12
      monthCounts[month] = 0;
      researchRates[month] = [];
      municipalityCounts[month] = {};
      monthData[month] = {
        totalDelitos: 0,
        researchRates: [],
        municipios: {}
      };
    }

    // Realizamos las simulaciones
    for (let i = 0; i < iterations; i++) {
      // Selecciona una entrada aleatoria del dataset
      const randomIndex = Math.floor(Math.random() * this.crimeData.length);
      const entry = this.crimeData[randomIndex];

      // Extrae el mes y año de la entrada
      const [ano, mes] = entry.date.split("-");

      // Registra la cantidad de delitos para el mes
      monthCounts[mes]++;
      monthData[mes].totalDelitos++;

      // Añade la tasa de investigación si es mayor a cero
      if (entry.researchFoldersRate > 0) {
        monthData[mes].researchRates.push(entry.researchFoldersRate);
      }

      // Registra los delitos por municipio
      const municipality = entry.inegiMunicipalityName;
      municipalityCounts[mes][municipality] = (municipalityCounts[mes][municipality] || 0) + 1;
    }

    // Calculamos los resultados
    const results = {};
    for (const month in monthData) {
      results[month] = {
        totalDelitos: monthData[month].totalDelitos,
        averageResearchRate: this.getAverageResearchRate(monthData[month].researchRates),
        mostLikelyMunicipality: this.getMostLikelyMunicipality(municipalityCounts[month]),
      };
    }

    return results;
  }

  getAverageResearchRate(researchRates) {
    if (researchRates.length === 0) return 0;
    const sum = researchRates.reduce((acc, rate) => acc + rate, 0);
    return (sum / researchRates.length).toFixed(2);
  }

  getMostLikelyMunicipality(municipalityCounts) {
    const maxCount = Math.max(...Object.values(municipalityCounts));
    return Object.keys(municipalityCounts).find(municipality => municipalityCounts[municipality] === maxCount);
  }



async monteCarloSimulationPerYear(iterations = 10000) {
    //console.log(this.crimeData,'esto es de la simulacion');
    this.crimeData = DataService.getData();
    const monthCounts = {};
    const researchRates = [];
    const municipalityCounts = {};
    const anoActual={};

    // Realizamos las simulaciones
    for (let i = 0; i < iterations; i++) {
      // Selecciona una entrada aleatoria del dataset
      const randomIndex = Math.floor(Math.random() * this.crimeData.length);
      const entry = this.crimeData[randomIndex];

      // Cuenta los delitos por mes
      const ano=entry.date.split("-")[0];
      anoActual[ano]=(anoActual[ano]||0)+1;
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
      mostLikelyMunicipality: this.getMostLikelyMunicipality(municipalityCounts),
      ano:this.getAnoActual(anoActual)

    };
  }
  getAnoActual(anoActual){
    const maxCount = Math.max(...Object.values(anoActual));
    return Object.keys(anoActual).filter(ano => anoActual[ano] === maxCount);
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
module.exports = SimulationService;
