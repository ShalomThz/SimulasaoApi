const express = require("express");
const router = express.Router();
const ActualDataService=require('../services/actualDataService');
const service=new ActualDataService();

router.get("/perMonth", async(req, res) => {
  const result=await service.perMonth();
  //console.log('Contenido del archivo leído:', result.mes);
  res.json(result);
})

module.exports = router;
