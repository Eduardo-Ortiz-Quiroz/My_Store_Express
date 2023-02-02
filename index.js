const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes/index.router')
const {checkApiKey} = require('./src/middlewares/auth.handler');
const app = express();
const port = 3003
const { errorHandler, logError, boomErrorHandler, ormErrorHandler } = require('./src/middlewares/error.handler')
const whiteList = ['http://127.0.0.1:5500', 'https://edu-expressapp.up.railway.app/'];
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
require('./src/utils/auth/index.auth')

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

app.use(webpackDevMiddleware(webpack(webpackConfig)));


//const path = require('path');
//onst publicPath = path.resolve(__dirname, '/public');
//app.use(express.static(publicPath));
//
//app.get('/', (req, res) => {
// res.sendFile(__dirname + '/public/views/index.html');
//)



//app.get('/',
//checkApiKey,
//(req, res)=>{
//  res.send('Estoy vivo!!');
//});

routerApi(app);

app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=>{
  console.log(`Tu creacion esta viva en el puerto ${port}`);
});
