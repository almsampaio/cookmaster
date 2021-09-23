const { ObjectId } = require('mongodb');
const connect = require('./connection');
const userModel = require('./usersModel');

const create = async (name, ingredients, preparation, userId) => {
    const db = await connect();
    const recipes = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });
    
    return {
        recipe: {
            name,
            ingredients,
            preparation,
            userId,
            _id: recipes.insertedId,
        },
    };
};

const getAll = async () => {
    const db = await connect();
    const recipes = await db.collection('recipes').find().toArray();
    return recipes;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connect();
    const recipes = await db.collection('recipes').findOne(ObjectId(id));
    return recipes;
};

const update = async (id, name, ingredients, preparation) => {
    if (!ObjectId.isValid(id)) return null;
    
    const db = await connect();
    const recipes = await db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    
    if (!recipes) return null;

    const users = await userModel.getAll();
    
    const recieveObject = Object.values(users[1]); 
    
    const userId = recieveObject[0];

    return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
    create,
    getAll,
    getById,
    update,
};