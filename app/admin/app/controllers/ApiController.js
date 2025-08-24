class ApiController {
    getUsers(req, res) {
        res.json({ users: [] });
    }
    getGames(req, res) {
        res.json({ games: [] });
    }
    getParticipants(req, res) {
        res.json({ participants: [] });
    }
    getTournaments(req, res) {
        res.json({ tournaments: [] });
    }
}

module.exports = new ApiController();
