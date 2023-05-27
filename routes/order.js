const express = require('express');

const ctrl = require('../controllers/order');
const { ctrlWrapper } = require('../helpers');
const { validateBody } = require('../middleware');
const { schema } = require('../models/order');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getOrders));

router.post('/', validateBody(schema.addSchema), ctrlWrapper(ctrl.addOrder));

module.exports = router;
