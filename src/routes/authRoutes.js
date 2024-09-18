const express = require('express');
const { login, register, getUserProfile } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.get('/me', verifyToken, getUserProfile);


module.exports = router;