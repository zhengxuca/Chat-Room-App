var io = require('socket.io-client');
module.exports = class ChatClient {

    constructor(chatUI, username, token) {
        this.socket = null;
        this.chatUI = chatUI;
        this.username = username; 
        this.token = token;
    }

    startChat() {
        var token = this.token;
        this.socket = io({ query: "token=" + token });
        this.socket.on("chat message", (msg) => {
            //new chat msg that arrived from the server.
            this.chatUI.addMessage(msg);
        });

        this.socket.on("new user", (newUser) => {
            //a new user has joined the chat
            this.chatUI.addUser(newUser);
            this.chatUI.addMessage(newUser + " has joined the chat");
        });

        this.socket.on("online users", (onlineUsers) => {
            var list = JSON.parse(onlineUsers);
            list.forEach((user) => {
                this.chatUI.addUser(user);
            });
        });

        this.socket.on("user left", (leftUser) => {
            this.chatUI.removeUser(leftUser);
            this.chatUI.addMessage(leftUser + " has left the chat");
        });
    };

    endChat() {
        console.log("end chat");
        this.socket.emit("disconnect message");
        this.chatUI.removeAllUsers();
    };

    sendMessage(msg) {
        if (this.socket) {
            this.socket.emit("chat message", msg);
            this.chatUI.addMessage(this.username + " said: " + msg);
        }
    }
    
}