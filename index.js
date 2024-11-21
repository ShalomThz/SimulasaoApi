const express= require ('express');
const cors = require('cors');
const routerApi=require('./routes')


const app = express();

const port =3200;
//63342
app.use(cors({ origin: 'http://localhost:5500' }));

app.use(express.json());


routerApi(app);

app.listen(port,()=>{
  console.log('server started on port '+port);
})

