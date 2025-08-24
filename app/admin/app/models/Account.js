const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
mongoose.plugin(slug);

const Account = new Schema(
    {
        username: { type: String, maxLength: 255, require: true },
        password: { type: String, maxLength: 255 },
        email: { type: String, maxLength: 255, require: true },
        lastLogin: { type: Date },
        user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
        // createDate: { type: Date, default: Date.now },
        // modifiedDate: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

Account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

Account.query.sortable = function (req) {
    if ('_sort' in req.query) {
        return this.sort({ [req.query.column]: req.query.type });
    }
    return this;
};

module.exports = mongoose.model('Account', Account);
