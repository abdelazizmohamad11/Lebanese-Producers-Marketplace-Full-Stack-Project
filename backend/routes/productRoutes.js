const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/', productController.getAllProducts);
router.get('/:productId/checkOwnership',productController.checkOwnership, (req, res) => {
    return res.json({ status: 'success',isOwner:req.isOwner })
})
router.get('/unique-origins',productController.getUniqueOrigins);
router.get('/products-categories',productController.getProductsCategories);

router.post('/delete/:productId',productController.deleteProduct);
router.post('/add-product',productController.addProduct)
router.post('/edit-product/:productId',productController.editProduct);
module.exports = router;