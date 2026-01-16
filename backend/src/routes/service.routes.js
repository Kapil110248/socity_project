const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/Service.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware.js');

router.get('/categories', authenticate, ServiceController.listCategories);
router.post('/categories', authenticate, authorize(['SUPER_ADMIN']), ServiceController.createCategory);
router.put('/categories/:id', authenticate, authorize(['SUPER_ADMIN']), ServiceController.updateCategory);
router.delete('/categories/:id', authenticate, authorize(['SUPER_ADMIN']), ServiceController.deleteCategory);

router.get('/inquiries', authenticate, ServiceController.listInquiries);
router.put('/inquiries/:id/assign', authenticate, authorize(['SUPER_ADMIN']), ServiceController.assignVendor);

module.exports = router;
