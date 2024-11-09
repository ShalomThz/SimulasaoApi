const express = require('express');
const router = express.Router();
const HomicidesService=require('../services/homicidesServices');
const service=new HomicidesService();
router.get('/', async(req, res) => {
  const result=await service.monteCarloSimulation();
  res.json(result);
})


module.exports = router;
