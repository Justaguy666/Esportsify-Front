const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  user_id: [{ type: Schema.Types.ObjectId, ref: "Account" }]
});

module.exports = mongoose.model("Admin", AdminSchema);
