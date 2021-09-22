const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const recipes = await connection()
   .then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

const findByName = async (name) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ name }));

  if (!recipe) return null;

  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
 await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  const { _id } = await findByName(name);

  return { recipe: {
    _id,
    name,
    ingredients,
    preparation, 
    userId,
    },
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  if (!recipe) return null;

  return recipe;
};

const update = async (id, body, role, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = body;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  if (!recipe) return null;

  if (recipe.userId === userId || role === 'admin') {
    await connection()
    .then((db) => db.collection('recipes')
    .updateOne(recipe, { $set: { name, ingredients, preparation } }));

  const newRecipe = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  return newRecipe;
  }

  console.log('Chegou aqui');
  return null;  
};

const deleteInfo = async (id, role, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await findById(id);

  if (!recipe) return null;

  if (recipe.userId === userId || role === 'admin') {
    await connection()
    .then((db) => db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));

  return null;
  }
};

const updateImage = async (id, image, role, userId) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  if (!recipe) return null;

  if (recipe.userId === userId || role === 'admin') {
    await connection()
    .then((db) => db.collection('recipes')
    .updateOne(recipe, { $set: { image } }));

  const newRecipe = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  return newRecipe;
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteInfo,
  updateImage,
};
