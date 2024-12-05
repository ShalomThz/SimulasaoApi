const  DataService =require( './dataService');

class SimulationService {
  constructor() {
    this.crimeData = DataService.getData();
  }


  // async monteCarloSimulationPerMonth(iterations = 100000) {
  //   this.crimeData = DataService.getData();
  //   const monthCounts = {};  // Contador de delitos por mes
  //   const researchRates = {}; // Lista de tasas de investigación por mes
  //   const municipalityCounts = {};  // Contador de delitos por municipio
  //   const monthData = {};  // Datos de delitos por mes
  //
  //   // Inicializa las estructuras para cada mes
  //   for (let i = 1; i <= 12; i++) {
  //     const month = i.toString().padStart(2, '0');  // Asegura el formato de 01, 02,...12
  //     monthCounts[month] = 0;
  //     researchRates[month] = [];
  //     municipalityCounts[month] = {};
  //     monthData[month] = {
  //       totalDelitos: 0,
  //       researchRates: [],
  //       municipios: {}
  //     };
  //   }
  //
  //   // Realizamos las simulaciones
  //   for (let i = 0; i < iterations; i++) {
  //     // Selecciona una entrada aleatoria del dataset
  //     const randomIndex = Math.floor(Math.random() * this.crimeData.length);
  //     const entry = this.crimeData[randomIndex];
  //
  //     // Extrae el mes y año de la entrada
  //     const [ano, mes] = entry.date.split("-");
  //
  //     // Registra la cantidad de delitos para el mes
  //     monthCounts[mes]++;
  //     monthData[mes].totalDelitos++;
  //
  //     // Añade la tasa de investigación si es mayor a cero
  //     if (entry.researchFoldersRate > 0) {
  //       monthData[mes].researchRates.push(entry.researchFoldersRate);
  //     }
  //
  //     // Registra los delitos por municipio
  //     const municipality = entry.inegiMunicipalityName;
  //     municipalityCounts[mes][municipality] = (municipalityCounts[mes][municipality] || 0) + 1;
  //   }
  //
  //   // Calculamos los resultados
  //   const results = {};
  //   for (const month in monthData) {
  //     results[month] = {
  //       totalDelitos: monthData[month].totalDelitos,
  //       averageResearchRate: this.getAverageResearchRate(monthData[month].researchRates),
  //       mostLikelyMunicipality: this.getMostLikelyMunicipality(municipalityCounts[month]),
  //     };
  //   }
  //
  //   return results;
  // }
  //
  // getAverageResearchRate(researchRates) {
  //   if (researchRates.length === 0) return 0;
  //   const sum = researchRates.reduce((acc, rate) => acc + rate, 0);
  //   return (sum / researchRates.length).toFixed(2);
  // }
  //
  // getMostLikelyMunicipality(municipalityCounts) {
  //   const maxCount = Math.max(...Object.values(municipalityCounts));
  //   return Object.keys(municipalityCounts).find(municipality => municipalityCounts[municipality] === maxCount);
  // }
  //
  async monteCarloSimulationPerMonth() {
    const months = [
      { name: "january", code: "01" },
      { name: "february", code: "02" },
      { name: "march", code: "03" },
      { name: "april", code: "04" },
      { name: "may", code: "05" },
      { name: "june", code: "06" },
      { name: "july", code: "07" },
      { name: "august", code: "08" },
      { name: "september", code: "09" },
      { name: "october", code: "10" },
      { name: "november", code: "11" },
      { name: "december", code: "12" },
    ];

    const simulatedData = {};
    for (const { name, code } of months) {
      simulatedData[name] = await this.generateMonthDataPerMonth(code);
    }

    return simulatedData;
  }

  async generateMonthDataPerMonth(month) {
    const simulatedData = await this.simulateDataPerMonth(month);

    const totalFolders = simulatedData.reduce((sum, obj) => sum + obj.folders, 0);
    const totalResearchRate = simulatedData.reduce((sum, obj) => sum + obj.researchFoldersRate, 0);

    const averageRate = simulatedData.length > 0 ? totalResearchRate / simulatedData.length : 0;
    const mostLikelyMunicipality = this.getMostLikelyMunicipalityPerMoth(simulatedData);

    return {
      tasa: parseFloat(averageRate.toFixed(3))*(10),
      folder: totalFolders,
      mostLikelyMunicipality,
    };
  }

  async simulateDataPerMonth(month) {
    const iterations = 1000; // Número de iteraciones de Montecarlo
    const results = [];

    for (let i = 0; i < iterations; i++) {
      const randomCrime = this.getRandomCrimePerMonth();
      const simulatedFolders = this.simulateFolders(randomCrime.folders);
      const simulatedRate = this.simulateResearchRatePerMonth(randomCrime.researchFoldersRate);

      results.push({
        inegiMunicipalityName: randomCrime.inegiMunicipalityName,
        folders: simulatedFolders,
        researchFoldersRate: simulatedRate,
      });
    }

    return results;
  }

  getRandomCrimePerMonth() {
    // Selecciona un dato aleatorio del dataset base
    const randomIndex = Math.floor(Math.random() * this.crimeData.length);
    return this.crimeData[randomIndex];
  }

  simulateFolders(baseFolders) {
    const randomFactor = Math.random(); // Número entre 0 y 1
    return Math.round(baseFolders + randomFactor * 10); // Ajusta el factor según tu modelo
  }

  simulateResearchRatePerMonth(baseRate) {
    const variation = (Math.random() - 0.5) * 10; // Variación aleatoria (-5 a 5)
    return Math.max(0, Math.min(100, baseRate + variation)); // Mantener entre 0 y 100
  }

  getMostLikelyMunicipalityPerMoth(simulatedData) {
    const municipalityCounts = simulatedData.reduce((acc, obj) => {
      const municipality = obj.inegiMunicipalityName;
      acc[municipality] = (acc[municipality] || 0) + obj.folders;
      return acc;
    }, {});

    const maxCount = Math.max(...Object.values(municipalityCounts));
    const mostLikelyMunicipality = Object.keys(municipalityCounts).find(
      municipality => municipalityCounts[municipality] === maxCount
    );

    return mostLikelyMunicipality;
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
      mostLikelyMonths: this.getMostLikelyMonthsPerYear(monthCounts),
      averageResearchRate: this.getAverageResearchRatePerYear(researchRates),
      mostLikelyMunicipality: this.getMostLikelyMunicipalityPerYear(municipalityCounts),
      ano:this.getAnoActual(anoActual)

    };
  }
  getAnoActual(anoActual){
    const maxCount = Math.max(...Object.values(anoActual));
    return Object.keys(anoActual).filter(ano => anoActual[ano] === maxCount);
  }

  getMostLikelyMonthsPerYear(monthCounts) {
    const maxCount = Math.max(...Object.values(monthCounts));
    return Object.keys(monthCounts).filter(month => monthCounts[month] === maxCount);
  }

  getAverageResearchRatePerYear(researchRates) {
    const sum = researchRates.reduce((acc, rate) => acc + rate, 0);
    return (sum / researchRates.length) || 0;
  }

  getMostLikelyMunicipalityPerYear(municipalityCounts) {
    const maxCount = Math.max(...Object.values(municipalityCounts));
    return Object.keys(municipalityCounts).find(municipality => municipalityCounts[municipality] === maxCount);
  }
}
module.exports = SimulationService;
