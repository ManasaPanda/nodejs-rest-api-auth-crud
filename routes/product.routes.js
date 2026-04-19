const router = require('express').Router();
const controller = require('../controller/product.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/products',authMiddleware,controller.createProducts);
router.get('/products',authMiddleware,controller.getAllProducts);
router.put('/products/:id',authMiddleware,controller.updateProducts);
router.delete('/products/:id',authMiddleware,controller.deleteProducts);


module.exports = router;