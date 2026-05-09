const express = require('express');
const router = express.Router();
const { processScan, getHistory } = require('../controllers/scanController');

router.post('/process', processScan);
router.get('/history', getHistory);

module.exports = router;
