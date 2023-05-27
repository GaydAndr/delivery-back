const express = require('express');

const ctrl = require('../controllers/store');
const { ctrlWrapper } = require('../helpers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getStores));

module.exports = router;
