const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:id',profileController.getProfile,(req,res)=>{
    return res.json({status:"success",user:{
        user_id:req.user.user_id,
        name:req.user.name,
        email:req.user.email,
        role:req.user.role,
        fullname:req.user.fullname,
        image_url:req.user.image_url
    }});
})
router.post('/:id',profileController.editProfile);
module.exports = router;