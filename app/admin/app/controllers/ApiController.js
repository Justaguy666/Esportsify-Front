const express = require("express");
const Account = require("../models/Account");
const Admin = require("../models/Admin");
// const bcrypt = require("bcryptjs"); // giả sử bạn hash password bằng bcrypt
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
  async getAdmins(req, res, next) {
    try {
      // Lấy tất cả document trong collection admins
      const admins = await Admin.find({});

      // Gom tất cả user_id từ các document lại thành 1 mảng
      const adminAccountIds = admins.flatMap((a) =>
        a.user_id.map((id) => id.toString())
      );

      res.json(adminAccountIds);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;

  try {
    // 1. Tìm account theo email
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(400).json({ error: "Email not found" });
    }

    // Debug: in account info
    console.log("Account found:", account);

    // Debug: in toàn bộ admins
    const admins = await Admin.find({});
    console.log("All admins:", admins.map(a => a.user_id));

    // 2. Check password (so sánh trực tiếp, không mã hóa)
    const isMatch = password === account.password;
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    
    // 3. Check admin
    const isAdmin = await Admin.findOne({ user_id: { $in: [account._id.toString()] } });
    const role = isAdmin ? "admin" : "user";

    // 4. Trả về thông tin user
    res.json({
      _id: account._id,
      email: account.email,
      username: account.username,
      user_id: account.user_id,
      role,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
}

module.exports = new ApiController();
