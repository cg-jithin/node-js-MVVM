const express = require('express');
const router = express.Router();
const test = require('../controllers/test.controller');

/* GET test */
router.get('/', test.get);

module.exports = router;
