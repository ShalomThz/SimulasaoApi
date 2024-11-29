const express = require('express');
const simulationRouter=require('./simulationRouter');
const uploadRouter=require('./uploadRouter');
const actualDataRouter=require('./actualDataRouter');


function routerApi(app){
  const router = express.Router();
  app.use('/api', router);
  router.use('/Simulation',simulationRouter );
  router.use('/upload',uploadRouter);
  router.use('/data',actualDataRouter);

}
module.exports = routerApi;
