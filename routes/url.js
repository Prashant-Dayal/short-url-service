const express = require('express');
const router = express.Router();
const { handelgeneratenewShortUrl,handelgetanalytics } = require('../controllers/url');
const URL = require('../model/url');


router.post('/', handelgeneratenewShortUrl);
router.get('/analytics/:shortID', handelgetanalytics);

module.exports = router;
