const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');

router.get('/', AdminController.index);
router.get('/user-management', AdminController.userManagement);
router.get('/game/game-management', AdminController.gameManagement);
router.get('/participant/participant-player-management', AdminController.participantPlayerManagement);
router.get('/tournament/tournament-management', AdminController.tournamentManagement);
router.get('/match/match-players-management', AdminController.matchPlayersManagement);
router.get('/registration/registration-players-management', AdminController.registrationPlayersManagement);
router.get('/rule/rule-management', AdminController.ruleManagement);
router.get('/news/news-management', AdminController.newsManagement);
router.get('/highlight/highlight-management', AdminController.highlightManagement);

module.exports = router;
