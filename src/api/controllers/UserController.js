const UserService = require('../services/UserService');
const Auth = require('./middlewares/Auth');

class UserController {
    static async login(request, response) {
        const { user } = request.body;
        const token = new Auth().getToken(user);
        return response.status(200).json({ token });
    }

    static async register(request, response) {
        const { name, email, password, role } = request.body;
        const user = await new UserService().create({ name, email, password, role });
        return response.status(201).json({ user });
    }
}

module.exports = UserController;
