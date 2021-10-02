const { ObjectId } = require('mongodb');
const MongoConn = require('../config/MongoConn');

class RecipeModel {
    constructor() {
        this.connection = new MongoConn().connection();
    }

    async list() {
        const mongo = await this.connection;
        return mongo.collection('recipes').find({}).toArray();
    }

    async getById(id) {
        if (!ObjectId.isValid(id)) return null;
        const mongo = await this.connection;
        return mongo.collection('recipes').findOne({ _id: ObjectId(id) });
    }

    async save(recipe) {
        const mongo = await this.connection;
        const recipeCreated = await mongo.collection('recipes').insertOne(recipe);
        return { _id: recipeCreated.insertedId, ...recipe };
    }

    async update(recipe) {
        const mongo = await this.connection;
        const { _id, name, ingredients, preparation } = recipe;
        await mongo.collection('recipes').findOneAndUpdate(
            { _id: ObjectId(_id) },
            { $set: { name, ingredients, preparation } },
        );
        return this.getById(ObjectId(_id));
    }
}

module.exports = RecipeModel;
