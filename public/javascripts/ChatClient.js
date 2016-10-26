var io = require('socket.io-client');
module.exports = class ChatClient {

    constructor(chatUI, username) {
        this.socket = null;
        this.chatUI = chatUI;
        this.username = username;
    }
    startChat() {
        var token = this.getCookie("token");
        this.socket = io({ query: "token=" + token });
        this.socket.on("chat message", function (msg) {
            //new chat msg that arrived from the server.
            this.chatUI.addMessage(msg);
        });
        this.chatUI.addUser(this.username);

        this.socket.on("new user", function(newUser){
            //a new user has joined the chat
            this.chatUI.addUser(newUser);
        });

        this.socket.on("user left", function(leftUser) {
            this.chatUI.removeUser(leftUser);
        });
    };

    endChat() {
        console.log("end chat");
        this.socket.emit("disconnect message");
        this.chatUI.removeAllUsers();
    };

    sendMessage(msg) {
        if(this.socket) {
            this.socket.emit("chat message", msg);
            this.chatUI.addMessage(msg);
        }
    }
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}