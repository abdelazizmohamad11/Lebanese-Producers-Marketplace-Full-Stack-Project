const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');

router.post('/',rateController.submitRate);

module.exports=router