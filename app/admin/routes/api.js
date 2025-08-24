const express = require('express');
const router = express.Router();

const ApiController = require('../app/controllers/ApiController');

// Example API routes
router.get('/users', ApiController.getUsers);
router.get('/games', ApiController.getGames);
router.get('/participants', ApiController.getParticipants);
router.get('/tournaments', ApiController.getTournaments);

module.exports = router;
