const siteController = require('../app/controllers/SiteController');
const express = require('express');
const router = express.Router();

router.get('/', siteController.home);

module.exports = router;
