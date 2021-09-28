const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (recipe, userId) => {
  return connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipe, userId }))
    .then(result => result.ops[0]);
}

const getAll = async () => {
  return connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then(result => result);
}

const find = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').findOne({_id: ObjectId(id)}))
    .then(result => result)
    .catch(() => null);
}

const edit = async (recipe, id) => {
  const { name, ingredients, preparation } = recipe;
  const oldRecipe = await find(id);

  return connection()
    .then((db) => db.collection('recipes').updateOne(
      {_id: ObjectId(id)},
      { $set: { name, ingredients, preparation } }
    ))
    .then(() => ({ ...oldRecipe, name, ingredients, preparation }));
}

const remove = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').deleteOne({_id: ObjectId(id)}))
    .catch(() => null);
}

const addImage = async (id, image) => {
  const recipe = await find(id);
  const imageURL = `localhost:3000/${image}`;

  return connection()
    .then((db) => db.collection('recipes').updateOne(
      {_id: ObjectId(id)},
      { $set: { image: imageURL } }
    ))
    .then(() => ({ ...recipe, image: imageURL }));
}

module.exports = {
  create,
  getAll,
  find,
  edit,
  remove,
  addImage,
}
