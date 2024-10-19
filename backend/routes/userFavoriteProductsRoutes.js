const express = require('express');
const router = express.Router();
const userFavoriteProductsController = require('../controllers/userFavoriteProducts');

router.post('/add', userFavoriteProductsController.addToUserFavorites);
router.get('/', userFavoriteProductsController.getUserFavoriteProducts);
router.post('/delete-from-favorite-products', userFavoriteProductsController.deleteFromUserFavorites);
module.exports = router
