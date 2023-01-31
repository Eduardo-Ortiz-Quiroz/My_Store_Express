const {models } = require('../libs/sequelize');

class OrderService{
  constructor(){}

  async find(){
    const orders = await models.Order.findAll()
    return orders;
  }
  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user'],
      },
        'items'
      ],
    })
    return order;
  }
  async create(data){
    const newOrder = await models.Order.create(data)
    return newOrder;
  }
  async addItem(data){
    const newItem = await models.OrderProduct.create(data)
    //!revisar el nombre del models
    return newItem;
  }
  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [{
        association: 'customer',
        include: ['user']
      }]
    })
    return orders;
  }
  async update(id, changes){
    const order = await this.findOne(id);
    const res = await order.update(changes);
    return res;
  }
  async detele(id){
    const order = await this.findOne(id)
    await order.destroy()
    return {id};
  }
}

module.exports = OrderService;
