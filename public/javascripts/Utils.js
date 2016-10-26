module.exports = class Utils {
    constructor() {

    }

    static isLocalStorageEnabled() {
        return typeof (Storage) !== "undefined";
    }

    static setLoginInfo(username, token) {
        if (this.isLocalStorageEnabled()) {
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
        }
    }

    static removeLoginInfo() {
        if (this.isLocalStorageEnabled()) {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
        }
    }

    static getLoginInfo() {
        if (this.isLocalStorageEnabled()) {
            var result = {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("token")
            };
            return result;
        }
        else {
            return null;
        }
    }
}