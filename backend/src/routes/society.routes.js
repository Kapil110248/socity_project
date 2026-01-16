const express = require('express');
const SocietyController = require('../controllers/Society.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/units', authenticate, SocietyController.getUnits);
router.patch('/units/:id/ownership', authenticate, authorize(['ADMIN']), SocietyController.updateOwnership);
router.post('/notices', authenticate, authorize(['ADMIN']), SocietyController.postNotice);

module.exports = router;
