const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/wallet', authController.walletLogin);
router.post('/email', authController.emailLogin);

module.exports = router;
