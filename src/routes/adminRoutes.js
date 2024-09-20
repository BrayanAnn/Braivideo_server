const express = require('express');
const { verifyTokenAdmin } = require('../middlewares/authMiddleware');
const { getVideo, uploadVideo } = require('../controllers/videoController');

const router = express.Router();

router.post('/upload', verifyTokenAdmin, uploadVideo);
router.get('/video', verifyTokenAdmin, getVideo);

module.exports = router;