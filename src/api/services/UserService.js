const UserModel = require('../models/UserModel');

class UserService {
    constructor() {
        this.model = new UserModel();
    }

    async findByEmail(email) {
        return this.model.findByEmail(email);
    }

    async create(user) {
        const userCreated = await this.model.save(user);
        const { name, email, role, _id } = userCreated;
        return { name, email, role, _id };
    }
}

module.exports = UserService;
