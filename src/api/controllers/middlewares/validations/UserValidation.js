const UserService = require('../../../services/UserService');

class UserValidation {
    static async execute(request, response, next) {
        const { name, email, password } = request.body;

        if (!UserValidation.fieldsIfExists(name, email, password)) {
            return response.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        const user = await new UserService().findByEmail(email);
        if (user) {
            return response.status(409).json({ message: 'Email already registered' });
        }

        request.body.role = 'user';
        return next();
    }

    static fieldsIfExists(name, email, password) {
        return name && email && password && /^[A-Za-z0-9+_.-]+@(.+)$/.test(email);
    }
}

module.exports = UserValidation;
