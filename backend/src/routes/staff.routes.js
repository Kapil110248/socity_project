const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/Staff.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.use(authenticate);
router.use(authorize(['ADMIN', 'SUPER_ADMIN']));

// List all staff
router.get('/', StaffController.getAll);

// List guards only
router.get('/guards', StaffController.getGuards);

// List maids only
router.get('/maids', StaffController.getMaids);

// Add staff member
router.post('/', StaffController.create);

// Update staff status
router.patch('/:id/status', StaffController.updateStatus);

// Remove staff
router.delete('/:id', StaffController.remove);

module.exports = router;
