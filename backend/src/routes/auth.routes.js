const express = require('express');
const UserController = require('../controllers/User.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authenticate, UserController.getMe);
router.put('/profile', authenticate, UserController.updateProfile);

module.exports = router;
