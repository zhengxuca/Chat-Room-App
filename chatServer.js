var socketIO = require("socket.io");
var verify = require("./routes/verify");

module.exports = function (httpServer) {
    var io = socketIO(httpServer);

    io.use(function (socket, next) {
        var token = socket.request._query.token;
        var auth = verify.verifyOrdinaryUser(token);
        if (!auth.success) {
            console.log(auth.error);
            socket.disconnect();
            return;
        }
        var username = auth.user._doc.username;
        socket.username = username;
        next();
    }
    );

    io.on("connection", function (socket) {
        var username = socket.username;
        console.log('a user connected: ' + username);

        socket.broadcast.emit("new user", username);
        
        socket.on('disconnect', function () {
            console.log('user disconnected: ' + this.username);
            io.emit("user left", this.username);
        });

        socket.on("disconnect message", function () {
            socket.disconnect();

        });

        socket.on("chat message", function (msg) {
            //sends message to all chat users except for the sender of the message
            socket.broadcast.emit("chat message", msg);
        });

    });


    process.on('SIGINT', function () {
        console.log("closing chat server");
        io.close();
    }
    );



}