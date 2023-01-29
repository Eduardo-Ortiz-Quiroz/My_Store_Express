const express = require('express');
const ProductsService = require('../services/products.service');
const service = new ProductsService();
const router = express.Router();
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  queryProductSchema,
} = require('../schemas/products.schema');
const validatorHandler = require('../middlewares/validator.handler');

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/filter', (req, res) => {
  try {
    res.send('Soy un filtro');
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.delete(id);
      res.json({
        message: 'Producto eliminado',
        id,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
