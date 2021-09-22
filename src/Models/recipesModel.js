const { ObjectID } = require('bson');
const connect = require('./connection');

const create = async (payload) => {
  const recipeId = await connect.getConnection().then((db) =>
    db.collection('recipes').insertOne(payload))
    .then((result) => result.insertedId);
  return recipeId;
};

const get = async (param) => {
  const recipesCollection = await connect.getConnection()
    .then((db) => db.collection('recipes'));

  if (param === 'all') return recipesCollection.find().toArray();
  if (!ObjectID.isValid(param)) return false;
  return recipesCollection.findOne({ _id: ObjectID(param) });
};

const update = async (recipeObj) => {
  const { email } = recipeObj;
  const recipesCollection = await connect.getConnection()
    .then((db) => db.collection('recipes'));

  return recipesCollection.findOneAndUpdate(
    { email },
    { $set: { ...recipeObj } },
    { returnDocument: 'after' },
  );
};

const remove = async (recipeObj) => {
  const { email } = recipeObj;
  const recipesCollection = await connect.getConnection()
    .then((db) => db.collection('recipes'));

  return recipesCollection.findOneAndDelete({ email });
};

module.exports = {
  create,
  get,
  update,
  remove,
};
