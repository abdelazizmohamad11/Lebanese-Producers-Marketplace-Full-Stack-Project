const authController=require('../controllers/auth.js')
const express=require('express')

const router =express.Router()

router.get('/',authController.verifyUser,(req,res)=>{
    return res.json({status:"success",email:req.email});
})

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/logout',authController.logout)

module.exports=router;