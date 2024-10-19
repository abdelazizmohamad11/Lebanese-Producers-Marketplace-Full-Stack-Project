const emailSendController=require('../controllers/emailSend')
const express=require('express')

const router =express.Router()

router.post('/',emailSendController.sendFromUserToMe);
module.exports=router;