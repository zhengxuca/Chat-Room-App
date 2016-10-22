var socketIO = require("socket.io");
module.exports = function(httpServer) {
    var chatServer= socketIO(httpServer);


    chatServer.on("connection", function(socket, next) {
        console.log('a user connected');
    });
}