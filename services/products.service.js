const { Op } = require('sequelize');
const faker = require('faker');
const boom = require('@hapi/boom');
//const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
class ProductsService{
  constructor(){
    this.products = [];
    this.generate();
  }
  generate(){
    const limit = 2;
    for (let i = 0; i < limit ; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }
  async create(data){
    const product = await models.Product.create(data);
    return product;
  }
  async find(query) {
    console.log(query)
    const options = {
      include: ['category'],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if(price){
      options.where.price = price;
    }
    const { priceMin, priceMax } = query;
    if(priceMin && priceMax){
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      }
    }
    const products = await models.Product.findAll(options);
    return products;
  }
  async findOne(id){
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    return product;
  }
  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    const productUpdate = this.products[index] = {
      ...product,
      ...changes
    };
    return productUpdate;
  }
  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  }
}

module.exports = ProductsService;
