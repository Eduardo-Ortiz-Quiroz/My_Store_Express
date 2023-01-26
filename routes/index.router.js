const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);

  //*esto es para usar una segunda version de API
  //const router2 = express.Router();
  //app.use('/api/v2', router2)
  //router2.use('/products', productsRouter);
  //router2.use('/categories', categoriesRouter);
  //router2.use('/users', usersRouter);
};

module.exports = routerApi;
