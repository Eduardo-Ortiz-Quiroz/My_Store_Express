const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const authRouter = require('./auth.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);

  //*esto es para usar una segunda version de API con diferente direccion
  //const router2 = express.Router();
  //app.use('/api/v2', router2)
  //router2.use('/products', productsRouter);
  //router2.use('/categories', categoriesRouter);
  //router2.use('/users', usersRouter);
};

module.exports = routerApi;
