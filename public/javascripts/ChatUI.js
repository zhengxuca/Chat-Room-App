var React = require('react');
var ReactDOM = require('react-dom');
var ChatComponent = require("./ChatComponent");
module.exports = class ChatUI {
    constructor() {

        ReactDOM.render(
            <ChatComponent />,
            document.getElementById('ChatHolder')
        );


    }

    addMessage(msg) {
        var listItem = "<li>" + msg + "</li>";
        $("#messageList").find("ul").append(listItem);
        $('#messageList').animate({
            scrollTop: $('#messageList').get(0).scrollHeight
        });
    }

    removeAllMessages() {
        $("#messageList").find("ul li").remove();
    }

    addUser(username) {
        var listItem = "<li id=\'" + username + "\'>" + username + "</li>";
        $("#userList").find("ul").append(listItem);
    }

    removeUser(username) {
        $("#userList").find("ul").find("#" + username).remove();
    }

    removeAllUsers() {
        $("#userList").find("ul li").remove();
    }

}

