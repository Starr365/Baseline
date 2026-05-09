const express = require('express');
const router = express.Router();
const { processScan } = require('../controllers/scanController');

router.post('/process', processScan);

module.exports = router;
