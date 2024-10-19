const messagesController=require('../controllers/messagesController');
const express = require('express')
const router = express.Router();

router.get('/:producer_id',messagesController.getProducerMessages);
router.post('/AddMessage/:producer_id',messagesController.addMessage);
router.post('/DeleteMessage/:message_id',messagesController.deleteMessage);
module.exports = router;