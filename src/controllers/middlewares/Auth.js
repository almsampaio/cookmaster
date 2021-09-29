const jwt = require('jsonwebtoken');

class Auth {
    constructor() {
        this.SECRET = 'batatinha123';
    }

    getToken(user) {
        const { email, role } = user;
        return jwt.sign({ email, role }, this.SECRET);
    }
}

module.exports = Auth;
