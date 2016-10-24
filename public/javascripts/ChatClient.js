module.exports = function () {
    this.socket = null;
    this.startChat = function () {
        var token = this.getCookie("token");
        socket = io({ query: "token=" + token });
        socket.on("chat message", function(msg) {
            console.log(msg);
        });
    };

    this.endChat = function () {
        console.log("end chat");
        socket.emit("disconnect message");
    };

    this.getCookie = function (cname) {
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