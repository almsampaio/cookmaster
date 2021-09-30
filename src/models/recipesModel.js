const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // estou validadno o id
  
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();

  const createRecepie = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return { recipe: createRecepie.ops[0] };
};

const update = async (id, upadaterecipe, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = upadaterecipe;

  const db = await getConnection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  
    return { _id: id, name, ingredients, preparation, userId };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const upload = async (userId, id, img, recipe) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = recipe;

  const db = await getConnection();
  const uploadImg = await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { img } });
  
  return { 
    _id: uploadImg.insertedId, 
    name, 
    ingredients, 
    preparation, 
    userId, 
    image: `localhost:3000/${img}`,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  upload,
};