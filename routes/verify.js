var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey);
};

exports.verifyOrdinaryUser = function (token) {

    if (token) {
        try {
            // verifies secret and checks exp
            var decoded = jwt.verify(token, config.secretKey);
            return {
                success: true,
                user: decoded
            };
        } catch (err) {
            console.log(err);
            var err = new Error('You are not authenticated!');
            err.status = 401;
            return {
                success: false,
                error: err
            };
        }
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return {
            success: false,
            error: err
        };

    }
};