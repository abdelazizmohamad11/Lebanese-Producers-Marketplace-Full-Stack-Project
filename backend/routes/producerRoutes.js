const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');

router.get('/', producerController.getAllProducers);
router.get('/producer-info', producerController.getProducerInfo);
router.get('/unique-locations',producerController.getUniqueLocations);
router.get('/bussiness-categories',producerController.getBussinessCategories);
module.exports = router;