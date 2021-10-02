const jwt = require('jsonwebtoken');

class Auth {
    constructor() {
        this.SECRET = 'batatinha123';
    }

    validateToken(request, response, next) {
        const { authorization } = request.headers;
        try {
            const tokenIsValid = jwt.verify(authorization, this.SECRET);
            if (!tokenIsValid) throw new Error('jwt malformed');
        } catch (error) {
            return response.status(401).json({ message: 'jwt malformed' });
        }
        request.headers.credentials = Auth.getCredentials(authorization);
        return next();
    }

    getToken(user) {
        const { _id, name, email, role } = user;
        return jwt.sign({ _id, name, email, role }, this.SECRET);
    }

    static getCredentials(token) {
        return jwt.decode(token);
    }
}

module.exports = Auth;
