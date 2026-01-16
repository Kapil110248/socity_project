const express = require('express');
const UserController = require('../controllers/User.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authenticate, UserController.getMe);
router.put('/profile', authenticate, UserController.updateProfile);

// Super Admin
router.get('/stats', authenticate, authorize(['SUPER_ADMIN']), UserController.getUserStats);
router.get('/all', authenticate, authorize(['SUPER_ADMIN']), UserController.getAllUsers);
router.patch('/:id/status', authenticate, authorize(['SUPER_ADMIN']), UserController.updateUserStatus);

module.exports = router;
