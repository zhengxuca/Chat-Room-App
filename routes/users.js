var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
var Verify = require("./verify");


router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.status(500);
            res.json({ err: err });
            return;
        }

        var token = Verify.getToken(user);
        res.status(200).json({
            status: 'Registration Successful!',
            success: true,
            token: token
        });

    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info.stack);
            return res.status(401).json({
                err: info
            });
        }

        var token = Verify.getToken(user);
        res.status(200).json({
            status: 'Login successful!',
            success: true,
            token: token
        });

    })(req, res, next);
});

module.exports = router;
