const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const connection = require('./connection');

const app = express();
app.use(bodyParser.json());

const TABLE_NAME = 'recipes'; // Tabela do mongodb

// Retorna todas as receitas
const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection(TABLE_NAME).find({}).toArray();
  return recipes;
};

// Retorna a receita pelo id;
const getById = async (id) => {
  const db = await connection();
  return db.collection(TABLE_NAME).findOne(ObjectId(id));
};

// Retorna uma receita pelo valor de uma propriedade
const getByProperty = async (property, value) => {
  const db = await connection();
  const user = await db.collection(TABLE_NAME).findOne({ [property]: value });
  return user;
};

// Adiciona uma nova receita e retorna a receita criada
const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const { insertedId } = await db.collection(TABLE_NAME)
    .insertOne({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

// db.recipes.findOneAndUpdate({ _id: ObjectId("61529d3ba8a3bad1f2900703") }, { $set: { name: "ovo de galinha", ingredients: "ovo", preparation: "cozinha" } });

// Atualiza uma receita pelo id e retorna a receita atualizada
// Apenas o autor pode remover atualizar a receita
const update = async (recipeInfo, userId) => {
  const db = await connection();
  const { id, name, ingredients, preparation } = recipeInfo;
  const updatedRecipe = await db.collection(TABLE_NAME).findOneAndUpdate(
    { _id: ObjectId(id), userId },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
    );
    if (!updatedRecipe.value) return null;
  return updatedRecipe.value;
};

// Remove uma receita pelo id e retorna a receita deletada
// Apenas o autor pode remover a receita
const remove = async (id, userId) => {
  const db = await connection();
  const removedRecipe = await db.collection(TABLE_NAME)
    .findOneAndDelete({ _id: ObjectId(id), userId });
    console.log(removedRecipe);
  return removedRecipe;
};

// Atualiza uma receita pelo id e retorna a receita atualizada
// Usuário admin atualizar qualquer receita
const updateAdmin = async (recipeInfo) => {
  const db = await connection();
  const { id, name, ingredients, preparation } = recipeInfo;
  const recipe = await db.collection(TABLE_NAME).findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
        );
  if (!recipe.value) return null;
  return recipe.value;
};

// Remove uma receita pelo id e retorna a receita deletada
// Usuário admin remove qualquer receita
const removeAdmin = async (id) => {
  const db = await connection();
  // const removedRecipe = await db.collection(TABLE_NAME).findOne(ObjectId(id));
  // await db.collection(TABLE_NAME).deleteOne({ _id: ObjectId(id) });
  const removedRecipe = await db.collection(TABLE_NAME)
    .findOneAndDelete({ _id: ObjectId(id) });
  return removedRecipe;
};

module.exports = {
  getAll,
  getById,
  getByProperty,
  create,
  update,
  remove,
  updateAdmin,
  removeAdmin,
};
