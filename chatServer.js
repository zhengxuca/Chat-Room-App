var socketIO = require("socket.io");
var verify = require("./routes/verify");

module.exports = function (httpServer) {
    var chatServer = socketIO(httpServer);


    chatServer.on("connection", function (socket, next) {
        console.log("hi zheng");
        var token = socket.request._query.token;
        var auth = verify.verifyOrdinaryUser(token);
        if (!auth.success) {
            console.log(auth.error);
            socket.disconnect();
            return;
        }

        console.log('a user connected: '+ auth.user.username);
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

    });
}