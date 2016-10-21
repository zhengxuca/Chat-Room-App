var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.status(200);
    res.write("chat app");
    console.log("chat app");
    res.end();
});

module.exports = router;
