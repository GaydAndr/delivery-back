const { Order } = require('../../models/order');

const getOrders = async (req, res) => {
  const result = await Order.find();

  res.status(201).json(result);
};
module.exports = getOrders;
