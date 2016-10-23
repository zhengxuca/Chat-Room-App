var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey);
};

exports.verifyOrdinaryUser = function (token) {

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return {
                    success: false,
                    error: err
                };
            } else {
                // if everything is good, save to request for use in other routes
                return {
                    success: true,
                    user: decoded
                };
            }
        });
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