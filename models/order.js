const { Schema, model } = require('mongoose');
const Joi = require('joi');

const orderSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for order'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    required: [true, 'Set address for contact'],
  },
  dishes: {
    type: Array,
  },
  total_price: {
    type: Number,
  },
});

const isConflict = ({ name, code }) =>
  name === 'MangoServerError' && code === 11000;

const handleSaveError = (error, _, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

orderSchema.post('save', handleSaveError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  dishes: Joi.array(),
  total_price: Joi.number(),
});

const schema = {
  addSchema,
};

const Order = model('order', orderSchema);

module.exports = {
  Order,
  schema,
};
