const fs = require('fs').promises; // Importa el módulo 'fs' para trabajar con el sistema de archivos

class DataService {
  static instance; // Variable estática para la instancia única
  data = require('../DB/2022.json');
  constructor() {
    if (DataService.instance) {
      return DataService.instance; // Retorna la instancia única si ya existe
    }
    DataService.instance = this; // Crea una nueva instancia si no existe
  }


  async loadData(jsonFile) {
    try {
      if (typeof jsonFile === 'string') {
        // Si es una cadena JSON, conviértela a un objeto
        this.data = JSON.parse(jsonFile);
      } else if (typeof jsonFile === 'object') {
        // Si ya es un objeto, úsalo directamente
        this.data = jsonFile;
      } else {
        throw new Error('El archivo proporcionado no es válido. Debe ser un objeto JSON o una cadena JSON.');
      }
      // console.log(this.data,'Datos cargadosde DAata service:');
    } catch (error) {
      console.error('...', error);
    }
  }


  // Método para obtener los datos cargados
  getData() {
    if (!this.data) {
      throw new Error('Los datos no se han cargado. Llama a loadData primero.');
    }
    return this.data;
  }
}
module.exports = new DataService();





