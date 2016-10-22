require("../stylesheets/style.css");
var React = require('react');
var ReactDOM = require('react-dom');
var ChatHandlers = require("./ChatHandlers.js");

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

function getCookie(cname) {
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

function startChat() {
    var token =getCookie("token");
    var data = {token: token};
    $.getJSON("/chat", data, function(data) {
        console.log(data);
    }).fail(function() {
        console.log('failed chat');
    });
}

$(document).ready(function () {
    $("#logout").hide();
    var cancel = function () {
        $("#popupHolder").hide();
        $("#RegLoginGroup").show();
    }

    $("#logout").click(function () {
        //delete token from cookies

        $("#RegLoginGroup").show();
        $("#logout").hide();
        document.cookie = "";
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
                // alert("Data: " + data + "\nStatus: " + status);
                console.log(JSON.stringify(data));
                $("#logout").show();
                document.cookie = "token=" + data.token;
                startChat();
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
                startChat();
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
