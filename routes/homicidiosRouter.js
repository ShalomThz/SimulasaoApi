const express = require('express');
const router = express.Router();
const GeneralSimulationService=require('../services/generalSimulationService');
const service=new GeneralSimulationService();


router.get('/', async(req, res) => {
  const result=await service.monteCarloSimulation();
  res.json(result);
})
router.post('/update-data', async(req, res) => {
  const newCrimeData=req.body;
  if (!Array.isArray(newCrimeData) || newCrimeData.length === 0) {
    return res.status(400).json({ error: 'Datos inválidos o vacíos' });
  }

 await service.updateCrimeData(newCrimeData);
  res.status(200).json({ message: 'Datos actualizados correctamente' });


})


module.exports = router;
