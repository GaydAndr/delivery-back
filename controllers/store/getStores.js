const { Store } = require('../../models/store');

const getStores = async (req, res) => {
  const result = await Store.find();

  res.status(201).json(result);
};
module.exports = getStores;
