const express = require('express');
const router = express.Router();
const PurchaseRequestController = require('../controllers/PurchaseRequest.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.use(authenticate);

// List all purchase requests
router.get('/', authorize(['ADMIN', 'SUPER_ADMIN']), PurchaseRequestController.getAll);

// Get single purchase request
router.get('/:id', authorize(['ADMIN', 'SUPER_ADMIN']), PurchaseRequestController.getById);

// Create purchase request
router.post('/', authorize(['ADMIN', 'SUPER_ADMIN']), PurchaseRequestController.create);

// Update purchase request
router.patch('/:id', authorize(['ADMIN', 'SUPER_ADMIN']), PurchaseRequestController.update);

// Delete purchase request
router.delete('/:id', authorize(['ADMIN', 'SUPER_ADMIN']), PurchaseRequestController.remove);

module.exports = router;
