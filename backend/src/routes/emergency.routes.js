const express = require('express');
const router = express.Router();
const EmergencyController = require('../controllers/Emergency.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware.js');

router.get('/logs', authenticate, EmergencyController.listLogs);
router.get('/barcodes', authenticate, EmergencyController.listBarcodes);
router.put('/barcodes/:id/status', authenticate, authorize(['SUPER_ADMIN']), EmergencyController.updateBarcodeStatus);

module.exports = router;
