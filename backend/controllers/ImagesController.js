const multer = require('multer');
const path = require('path')
const authController = require('../controllers/auth');
const db = require('../db');
const fs = require('fs').promises;
const ProductController = require('../controllers/ProductController');
// Multer storage configuration
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});


// Multer file filter for checking if it's an image
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: imageFilter
}).single('image'); // 'image' should match the name attribute in the form

const deleteProfileImage = (req, res) => {
  authController.verifyUser(req, res, async () => {
    try {
      const email = req.email;
      const getImageUrl = `select image_url from users where email = ?`;
      const val = [email]
      const response = await executeQuery(getImageUrl, [email]);
      const image_url = response[0].image_url;
      if (!image_url) {
        res.status(500).json({ Error: "No Image To Delete" })
        return;
      }
      const imagePath = path.join(__dirname, '..', 'public', 'uploads', image_url);
      try {
        await fs.access(imagePath);
      } catch (error) {
        return res.status(404).json({ Error: 'Image not found' });
      }
      await fs.unlink(imagePath);
      const sql = `update users set image_url=null where email = ?`;
      await executeQuery(sql, [val]);
      res.json({ status: 'success', message: 'Image deleted successfully' });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ Error: "internal server error" })
    }

  })
}

const deleteProductImage = (req, res) => {
  const { productId } = req.params
  ProductController.checkOwnership(req, res, async () => {
    try {
      const isOwner = req.isOwner;
      if (isOwner === 1) {
        const getImageUrl = `select image_url from products where product_id = ?`;
        const val = [productId]
        const response = await executeQuery(getImageUrl, [val]);
        const image_url = response[0].image_url;
        if (!image_url) {
          res.status(500).json({ Error: "No Image To Delete" })
          return;
        }
        const imagePath = path.join(__dirname, '..', 'public', 'uploads', image_url);
        try {
          await fs.access(imagePath);
        } catch (error) {
          return res.status(404).json({ Error: 'Image not found' });
        }
        await fs.unlink(imagePath);
        const sql = `update products set image_url=null where product_id = ?`;
        const r=await executeQuery(sql, [val]);
        console.log(r);
        res.json({ status: 'success', message: 'Product Image deleted successfully' });
      }
      else {
        res.status(403).json({ Error: "You Are Not Allowed To Delete This Image" });
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ Error: "internal server error" })
    }
  })
}


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





module.exports.upload = upload;
module.exports.deleteProfileImage = deleteProfileImage
module.exports.deleteProductImage = deleteProductImage