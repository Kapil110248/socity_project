const express = require('express');
const VendorController = require('../controllers/Vendor.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticate, VendorController.listSocietalVendors);
router.post('/', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), VendorController.createVendor);

// Super Admin
router.get('/all', authenticate, authorize(['SUPER_ADMIN']), VendorController.listAllVendors);
router.patch('/:id/status', authenticate, authorize(['SUPER_ADMIN']), VendorController.updateVendorStatus);
router.delete('/:id', authenticate, authorize(['SUPER_ADMIN']), VendorController.deleteVendor);
router.get('/stats', authenticate, authorize(['SUPER_ADMIN']), VendorController.getStats);

module.exports = router;
