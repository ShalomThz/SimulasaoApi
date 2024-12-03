const express = require('express');
const router = express.Router();
const SimulationService=require('../services/simulationService');
const service=new SimulationService();


const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para archivos
const fs = require('fs'); // Para leer el archivo JSON



router.get('/one-year', async(req, res) => {
  const result=await service.monteCarloSimulationPerYear();
  //console.log('Contenido del archivo leído:', result.ano);
  res.json(result);
})



module.exports = router;
