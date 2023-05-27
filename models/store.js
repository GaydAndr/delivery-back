const Joi = require('joi');
const { Schema, model } = require('mongoose');

const storeSchema = new Schema(
  {
    shop: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },
    menu: {
      type: [Object],
      id: String,
      dish_name: String,
      description: String,
      price: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const isConflict = ({ name, code }) =>
  name === 'MangoServerError' && code === 11000;

const handleSaveError = (error, _, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

storeSchema.post('save', handleSaveError);

const loadSchema = Joi.object({
  shop: Joi.string().required(),
  place: Joi.string().required(),
  menu: Joi.array().required(),
});

const schemas = {
  loadSchema,
};

const Store = model('store', storeSchema);

module.exports = {
  Store,
  schemas,
};
