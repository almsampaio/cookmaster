const MongoConn = require('../config/MongoConn');

class UserModel {
    constructor() {
        this.connection = new MongoConn().connection();
    }

    async findByEmail(email) {
        const mongo = await this.connection;
        return mongo.collection('users').findOne({ email });
    }

    async save(user) {
        const mongo = await this.connection;
        const userCreated = await mongo.collection('users').insertOne(user);
        return { _id: userCreated.insertedId, ...user };
    }
}

module.exports = UserModel;
