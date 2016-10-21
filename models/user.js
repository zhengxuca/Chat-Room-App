var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
    //username and password are actually added by mongoose by default.
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);