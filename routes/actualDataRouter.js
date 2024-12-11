const express = require("express");
const router = express.Router();
const ActualDataService=require('../services/actualDataService');
const service=new ActualDataService();

router.get("/perMonth", async(req, res) => {
  const result=await service.perMonth();
  //console.log('Contenido del archivo leído:', result.mes);
  res.json(result);
})
router.get("/comparate", async(req, res) => {

    const data=await service.getComparateData();

    if(!data){
      return res.status(400).json({ message: 'Datos no disponibles' });
    }
    res.status(200).json(data);
})

module.exports = router;
