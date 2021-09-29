const UserService = require('../services/UserService');

class UserController {
    static async register(request, response) {
        const { name, email, password, role } = request.body;
        const user = await new UserService().create({ name, email, password, role });
        return response.status(201).json({ user });
    }
}

module.exports = UserController;
