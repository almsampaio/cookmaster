const MongoConn = require('../config/MongoConn');

class RecipeModel {
    constructor() {
        this.connection = new MongoConn().connection();
    }

    async list() {
        const mongo = await this.connection;
        return mongo.collection('recipes').find({}).toArray();
    }

    async save(recipe) {
        const mongo = await this.connection;
        const recipeCreated = await mongo.collection('recipes').insertOne(recipe);
        return { _id: recipeCreated.insertedId, ...recipe };
    }
}

module.exports = RecipeModel;
