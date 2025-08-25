const Users = require("../models/User");
const Account = require("../models/Account");
const { multiMongooseToObject } = require("../../util");
// const Admin = require("../models/Admin"); // model cho collection admins

class AdminController {
  async index(req, res, next) {
    res.render("home");
  }

  userManagement(req, res, next) {
    Promise.all([Users.find({}).sortable(req), Account.find({})])
      .then(([users, accounts]) => {
        // Map user_id in Account to _id in Users
        const usersWithAccountData = users.map((user) => {
          const account = accounts.find(
            (acc) => String(acc.user_id) === String(user._id)
          );
          return {
            ...user.toObject(),
            email: account ? account.email : "",
            username: account ? account.username : "",
            lastLogin: account ? account.lastLogin : "",
          };
        });
        res.render("admin/user-management", {
          users: usersWithAccountData,
        });
      })
      .catch(next);
  }
  gameManagement(req, res, next) {
    res.render("admin/game/game-management");
  }
  participantPlayerManagement(req, res, next) {
    res.render("admin/participant/participant-player-management");
  }
  tournamentManagement(req, res, next) {
    res.render("admin/tournament/tournament-management");
  }
  matchPlayersManagement(req, res, next) {
    res.render("admin/match/match-players-management");
  }
  registrationPlayersManagement(req, res, next) {
    res.render("admin/registration/registration-players-management");
  }
  ruleManagement(req, res, next) {
    res.render("admin/rule/rule-management");
  }
  newsManagement(req, res, next) {
    res.render("admin/news/news-management");
  }
  highlightManagement(req, res, next) {
    res.render("admin/highlight/highlight-management");
  }
  gameAddiction(req, res, next) {
    res.render("admin/game/game-addiction");
  }
  highlightAddiction(req, res, next) {
    res.render("admin/highlight/highlight-addiction");
  }
  matchPlayersAddiction(req, res, next) {
    res.render("admin/match/match-players-addiction");
  }
  matchTeamsManagement(req, res, next) {
    res.render("admin/match/match-teams-management");
  }
  matchTeamsAddiction(req, res, next) {
    res.render("admin/match/match-teams-addiction");
  }
  newsAddiction(req, res, next) {
    res.render("admin/news/news-addiction");
  }
  participantPlayerAddiction(req, res, next) {
    res.render("admin/participant/participant-player-addiction");
  }
  participantTeamManagement(req, res, next) {
    res.render("admin/participant/participant-team-management");
  }
  participantTeamAddiction(req, res, next) {
    res.render("admin/participant/participant-team-addiction");
  }
  registrationPlayersAddiction(req, res, next) {
    res.render("admin/registration/registration-players-addiction");
  }
  registrationTeamsManagement(req, res, next) {
    res.render("admin/registration/registration-teams-management");
  }
  registrationTeamsAddiction(req, res, next) {
    res.render("admin/registration/registration-teams-addiction");
  }
  ruleAddiction(req, res, next) {
    res.render("admin/rule/rule-addiction");
  }
  tournamentAddiction(req, res, next) {
    res.render("admin/tournament/tournament-addiction");
  }
}

module.exports = new AdminController();
