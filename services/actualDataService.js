const DataService = require('./dataService');


class ActualDataService {
  constructor() {
    this.crimeData = DataService.getData();
  }

  async perMonth() {
    this.crimeData = DataService.getData();
     let data=this.crimeData;
    return {
      january: await this.getMonth(await this.arrayMonthFiller(data,"01")),
      february: await this.getMonth(await this.arrayMonthFiller(data,"02")),
      march: await this.getMonth(await this.arrayMonthFiller(data,"03")),
      april: await this.getMonth(await this.arrayMonthFiller(data,"04")),
      may: await this.getMonth(await this.arrayMonthFiller(data,"05")),
      juny: await this.getMonth(await this.arrayMonthFiller(data,"06")),
      july: await this.getMonth(await this.arrayMonthFiller(data,"07")),
      august: await this.getMonth(await this.arrayMonthFiller(data,"08")),
      september: await this.getMonth(await this.arrayMonthFiller(data,"09")),
      october: await this.getMonth(await this.arrayMonthFiller(data,"10")),
      november: await this.getMonth(await this.arrayMonthFiller(data,"11")),
      december: await this.getMonth(await this.arrayMonthFiller(data,"12")),
    };
  }

  async arrayMonthFiller(data,numberMonth) {
    // Filtra directamente desde `this.crimeData`
    return data.filter(item => item.date.split("-")[1] === numberMonth);
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
      tasa: parseFloat(averageRate.toFixed(2))*(10), // Promedio redondeado a 2 decimales
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


  async getComparateData(){
    this.crimeData = DataService.getData();
    const date=this.crimeData[0].date.split("-")[0];
    let numberDate=parseInt(date,10);
    let newNumberDate=numberDate+1;
    console.log(`esto es de actialDataService ${date} y esto es el numero que le sumo ${newNumberDate}`);
    const data=require(`../DB/${newNumberDate}.json`);
    console.log(data);
    return {
      january: await this.getMonth(await this.arrayMonthFiller(data,"01")),
      february: await this.getMonth(await this.arrayMonthFiller(data,"02")),
      march: await this.getMonth(await this.arrayMonthFiller(data,"03")),
      april: await this.getMonth(await this.arrayMonthFiller(data,"04")),
      may: await this.getMonth(await this.arrayMonthFiller(data,"05")),
      juny: await this.getMonth(await this.arrayMonthFiller(data,"06")),
      july: await this.getMonth(await this.arrayMonthFiller(data,"07")),
      august: await this.getMonth(await this.arrayMonthFiller(data,"08")),
      september: await this.getMonth(await this.arrayMonthFiller(data,"09")),
      october: await this.getMonth(await this.arrayMonthFiller(data,"10")),
      november: await this.getMonth(await this.arrayMonthFiller(data,"11")),
      december: await this.getMonth(await this.arrayMonthFiller(data,"12")),
    };

  }

}

module.exports = ActualDataService;
//tomando como referencia los folders
