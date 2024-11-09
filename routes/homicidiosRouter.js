const express = require('express');
const router = express.Router();
const GeneralSimulationService=require('../services/generalSimulationService');
const service=new GeneralSimulationService();


router.get('/', async(req, res) => {
  const result=await service.monteCarloSimulation();
  res.json(result);
})


module.exports = router;
