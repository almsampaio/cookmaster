const UserService = require('../../../services/UserService');

class LoginValidation {
    static async execute(request, response, next) {
        const { email, password } = request.body;

        if (!LoginValidation.fieldsIfExists(email, password)) {
            return response.status(401).json({ message: 'All fields must be filled' });
        }

        const user = await new UserService().findByEmail(email);
        if (!user) return response.status(401).json({ message: 'Incorrect username or password' });
        if (user.email !== email || user.password !== password) {
            return response.status(401).json({ message: 'Incorrect username or password' });
        }

        request.body.user = user;
        return next();
    }

    static fieldsIfExists(email, password) {
        return email && password;
    }
}

module.exports = LoginValidation;
