var express = require('express');
var router = express.Router();
var verify = require("./verify");

/* GET home page. */
router.get('/', verify.verifyOrdinaryUser, function( req, res, next) {

    res.status(200);
    res.write("chat app");
    console.log("chat app");
    res.end();
});

module.exports = router;
