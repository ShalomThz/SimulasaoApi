const  DataService =require( './dataService');
class ActualDataService {
  constructor() {
    this.crimeData = DataService.getData();
  }

  async perMonth(){
    this.crimeData = DataService.getData();
    const data=this.crimeData;
    const januaryObjects=[];
    await this.arrayMonthFiller(januaryObjects,"01");
    const februaryObjects=[];
    await this.arrayMonthFiller(februaryObjects,"02");
    const marchObjects=[];
    await this.arrayMonthFiller(marchObjects,"03");
    const aprilObjects=[];
    await this.arrayMonthFiller(aprilObjects,"04");
    const mayObjects=[];
    await this.arrayMonthFiller(mayObjects,"05");
    const junyObjects=[];
    await this.arrayMonthFiller(junyObjects,"06");
    const julyObjects=[];
    await this.arrayMonthFiller(julyObjects,"07");
    const augustObjects=[];
    await this.arrayMonthFiller(augustObjects,"08");
    const septemberObjects=[];
    await this.arrayMonthFiller(septemberObjects,"09");
    const octoberObjects=[];
    await this.arrayMonthFiller(octoberObjects,"10");
    const novemberObjects=[];
    await this.arrayMonthFiller(novemberObjects,"11");
    const decemberObjects=[];
    await this.arrayMonthFiller(decemberObjects,"12");


    return{
      january: this.getMonth(januaryObjects),
      february:this.getMonth(februaryObjects),
      march:this.getMonth(marchObjects),
      april:this.getMonth(aprilObjects),
      may:this.getMonth(mayObjects),
      juny:this.getMonth(junyObjects),
      july:this.getMonth(julyObjects),
      august:this.getMonth(augustObjects),
      september:this.getMonth(septemberObjects),
      october:this.getMonth(octoberObjects),
      november:this.getMonth(novemberObjects),
      december:this.getMonth(decemberObjects)
    }



  }
  //hay el problema de quitar el  objeto de delitos totales
  async arrayMonthFiller(monthObjects,numberMonth){
    const newMonthCounter=[];
    for(let i=0;i<monthObjects.length;i++){
      if(monthObjects[i].date.split("-")[1]===numberMonth){
        newMonthCounter.push(monthObjects[i]);
      }
    }
    return newMonthCounter;
  };

  async getMonth(monthObjects) {
    // Sumar todas las carpetas y tasas
    const totalFolders = monthObjects.reduce((sum, obj) => sum + obj.folders, 0);
    const totalResearchRate = monthObjects.reduce((sum, obj) => sum + obj.researchFoldersRate, 0);

    // Calcular el promedio de la tasa de investigación
    const averageRate = monthObjects.length > 0 ? totalResearchRate / monthObjects.length : 0;

    // Retornar los valores calculados
    return {
      tasa: parseFloat(averageRate.toFixed(2)), // Promedio redondeado a 2 decimales
      folder: totalFolders
    };
  }


  // async getMonth(monthObjects){
  //   let researchFoldersRate=0;
  //   let folders=0;
  //
  //   //aqui va la logica para que researchFoldersRate sea un promedio general de todos los objetos del array que nos envie en monthObjects
  //   //aqui va la logica para que folders sea la sumatoria de todos los folders de los objetos que nos envien en el array monthObjects
  //
  //   return{
  //     tasa:researchFoldersRate,
  //     folder:folders
  //   }
  //
  // }

}

module.exports =ActualDataService;
