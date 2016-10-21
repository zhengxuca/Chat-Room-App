require("../stylesheets/style.css");
var React = require('react');
var ReactDOM = require('react-dom');

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

    var cancel = function () {
        $("#popupHolder").hide();
        $("#RegLoginGroup").show();
    }

    $("#logout").click(function () {
        //delete token from cookies
        


        $("#RegLoginGroup").show();
        $("#logout").hide();
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
                alert("Data: " + data + "\nStatus: " + status);
                $("#logout").show();
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
            $("#RegLoginGroup").show();

            var data = {
                username: $("#usernameInput").val(),
                password: $("#passwordInput").val()
            };

            $.post("/users/login", data, function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
                $("#logout").show();
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
