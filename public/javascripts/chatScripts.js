require("../stylesheets/style.css");
var React = require('react');
var ReactDOM = require('react-dom');
var ChatClient = require("./ChatClient.js");
var ChatUI = require("./ChatUI.js");
var Utils = require("./Utils.js");
var chatUI;

var chat;//a chat client

var RegLogin = React.createClass(
    {
        render: function () {

            var action = this.props.action;
            var handler = this.props.handler;
            var cancel = this.props.cancel;
            return (
                <div id="popup">
                    {"username"}
                    <br />
                    <input type="text" id="usernameInput" name="username" />
                    <br />
                    {"password:"}
                    <br />
                    <input type="text" id="passwordInput" name="password" />
                    <br />
                    <button onClick={handler}>{action}</button>
                    <button onClick={cancel}>Cancel</button>
                </div>);
        }
    }
);

function initialize() {
    chatUI = new ChatUI();

    var loginInfo = Utils.getLoginInfo();
    if (loginInfo === null || loginInfo.username === null || loginInfo.token === null) {
        $("#logout").hide();
    } else {
        //has token and username, thus user is already logged in.
        chat = new ChatClient(chatUI, loginInfo.username, loginInfo.token);
        chat.startChat();
        $("#logout").show();
        $("#RegLoginGroup").hide();
        $("#signedInUser").text("User: " + loginInfo.username);
    }

}

$(document).ready(function () {

    initialize();

    var cancel = function () {
        $("#popupHolder").hide();
        $("#RegLoginGroup").show();
    }

    $('form').submit(function (event) {
        var msg = $("#inputMessage").val();
        if (chat && msg !== "") {
            chat.sendMessage(msg);
            $("#inputMessage").val("");
        }
        event.preventDefault();
    });

    $("#logout").click(function () {
        $("#RegLoginGroup").show();
        $("#logout").hide();
        Utils.removeLoginInfo();
        chat.endChat();
        chat = null;
        chatUI.removeAllMessages();
        chatUI.removeAllUsers();
    });

    $("#registerButton").click(function () {
        $("#popupHolder").show();
        $("#RegLoginGroup").hide();
        var handler = function () {
            $("#popupHolder").hide();

            var username = $("#usernameInput").val();
            var password = $("#passwordInput").val();
            var data = {
                username: username,
                password: password
            };

            $.post("/users/register", data, function (data, status) {
                $("#logout").show();
                Utils.setLoginInfo(username, data.token);
                chat = new ChatClient(chatUI, username, data.token);
                chat.startChat();
                $("#signedInUser").text("User: " + username);
            }).fail(function () {
                $("#RegLoginGroup").show();
            });
        }

        ReactDOM.render(
            <RegLogin action="Register" handler={handler} cancel={cancel} />,
            document.getElementById('popupHolder')
        );
    });

    $("#loginButton").click(function () {
        $("#popupHolder").show();
        $("#RegLoginGroup").hide();
        var handler = function () {
            $("#popupHolder").hide();

            var username = $("#usernameInput").val();
            var password = $("#passwordInput").val();
            var data = {
                username: username,
                password: password
            };

            $.post("/users/login", data, function (data, status) {
                $("#logout").show();
                Utils.setLoginInfo(username, data.token);
                chat = new ChatClient(chatUI, username, data.token);
                chat.startChat();
                $("#signedInUser").text("User: " + username);
            }).fail(function () {
                $("#RegLoginGroup").show();
            });
        }

        ReactDOM.render(
            <RegLogin action="Login" handler={handler} cancel={cancel} />,
            document.getElementById('popupHolder')
        );
    });
});
