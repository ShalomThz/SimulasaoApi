const express= require ('express');
const routerApi=require('./routes')

const app = express();
const port =3200;

app.use(express.json());


routerApi(app);

app.listen(port,()=>{
  console.log('server started on port '+port);
})

