const express = require('express');
const VisitorController = require('../controllers/Visitor.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticate, VisitorController.list);
router.post('/check-in', authenticate, authorize(['GUARD', 'ADMIN']), VisitorController.checkIn);
router.post('/pre-approve', authenticate, authorize(['RESIDENT', 'ADMIN']), VisitorController.preApprove);
router.patch('/:id/check-out', authenticate, authorize(['GUARD', 'ADMIN']), VisitorController.checkOut);

module.exports = router;
