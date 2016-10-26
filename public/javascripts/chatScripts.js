require("../stylesheets/style.css");
var React = require('react');
var ReactDOM = require('react-dom');
var ChatClient = require("./ChatClient.js");
var ChatUI = require("./ChatUI.js");
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


$(document).ready(function () {
    $("#logout").hide();

    chatUI = new ChatUI();

    var cancel = function () {
        $("#popupHolder").hide();
        $("#RegLoginGroup").show();
    }

    $('form').submit(function (event) {
        var msg = $("#inputMessage").val();
        if (chat &&  msg !== "") {
            console.log("entered: " + msg);
            chat.sendMessage(msg);
            $("#inputMessage").val("");

        }
        event.preventDefault();
    });

    $("#logout").click(function () {
        //delete token from cookies

        $("#RegLoginGroup").show();
        $("#logout").hide();
        document.cookie = "";
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

            var data = {
                username: $("#usernameInput").val(),
                password: $("#passwordInput").val()
            };

            $.post("/users/register", data, function (data, status) {
                $("#logout").show();
                document.cookie = "token=" + data.token;
                chat = new ChatClient(chatUI, $("#usernameInput").val());
                chat.startChat();
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

            var data = {
                username: $("#usernameInput").val(),
                password: $("#passwordInput").val()
            };

            $.post("/users/login", data, function (data, status) {
                console.log(JSON.stringify(data));
                $("#logout").show();
                document.cookie = "token=" + data.token;
                chat = new ChatClient(chatUI, $("#usernameInput").val());
                chat.startChat();
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
