const imagesController = require('../controllers/ImagesController');
const authController = require('../controllers/auth');
const db = require('../db');
const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');


router.post('/saveimage',imagesController.upload,(req,res)=>{
    return res.json({status:"success",filename:req.file.filename})
})

router.get('/', (req, res) => {
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            // Retrieve user data from the database, including the profile photo filename
            const userData = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);

            if (!userData || userData.length === 0) {
                return res.status(404).json({ success: false, Error: 'User not found' });
            }
            // Construct the file path for the profile photo
            const profilePhotoFilename = userData[0].image_url;
            const profilePhotoPath = path.join(__dirname, `../public/uploads/${profilePhotoFilename}`);
            // Check if the file exists
            if (!fs.existsSync(profilePhotoPath)) {
                return res.status(500).json({ success: false, Error: 'Profile photo not found' });
            }

            // Send the file as a response
            res.json({ status: "success", image_url: profilePhotoFilename });
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ success: false, Error: 'Internal Server Error' });
        }
    })

});

router.post('/delete-profile-image',imagesController.deleteProfileImage)
router.post('/delete-product-image/:productId',imagesController.deleteProductImage)

const executeQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};



module.exports = router;