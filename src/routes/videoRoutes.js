const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const { getVideo } = require('../controllers/videoController');

const router = express.Router();

router.get('/protected', verifyToken, getVideo)


module.exports = router;