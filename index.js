const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.router')
const app = express();
const port = 3003
const { errorHandler, logError, boomErrorHandler} = require('./middlewares/error.handler')
const whiteList = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error('No permitido'), false);
    }
  }
}
app.use(express.json());
app.use(cors(options));
app.get('/', (req, res)=>{
  res.send('Estoy vivo!!');
});

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=>{
  console.log(`Tu creacion esta viva en el puerto ${port}`);
});
