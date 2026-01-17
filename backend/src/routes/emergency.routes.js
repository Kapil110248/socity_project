const express = require('express');
const router = express.Router();
const EmergencyLogController = require('../controllers/EmergencyLog.controller');
const EmergencyBarcodeController = require('../controllers/EmergencyBarcode.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware.js');

router.get('/logs', authenticate, EmergencyLogController.listLogs);
router.get('/barcodes', authenticate, EmergencyBarcodeController.listBarcodes);
router.put('/barcodes/:id/status', authenticate, authorize(['SUPER_ADMIN']), EmergencyBarcodeController.updateBarcodeStatus);
router.post('/barcodes/reset', authenticate, authorize(['SUPER_ADMIN']), EmergencyBarcodeController.resetUserBarcodes);

module.exports = router;
