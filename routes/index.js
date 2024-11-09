const express = require('express');
const homicidesRouter=require('./homicidiosRouter');


function routerApi(app){
  const router = express.Router();
  app.use('/api/v2', router);
  router.use('/homicides',homicidesRouter );
}
module.exports = routerApi;
