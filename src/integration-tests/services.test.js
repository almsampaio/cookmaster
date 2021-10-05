const { expect } = require('chai');
const connection = require('../api/connection')
const servicesRecipes = require('../services/recipes')
const servicesUsers = require('../services/users')
const modelRecipes = require('../models/recipes')
const modelUsers = require('../models/users')

describe('testing user services', () => {
  beforeEach(async () => {
    const db = await connection()
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  it('is possible to create a user', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const create = await servicesUsers.servicesCreate(newUser)
    expect(create.status).to.be.equal(201)
  });

  it('is not possible to create a user with the same email', async() => {
    const newUser = { name: 'Carlos', email: 'root@email.com', password: 'carlos'}
    const create = await servicesUsers.servicesCreate(newUser)
    const message = 'Email already registered'
    expect(create.status).to.be.equal(409)
    expect(create.message).to.be.equal(message)
  });
  
  it('is possible to create a admin user', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const create = await servicesUsers.servicesAdminCreate(newUser)
    expect(create.status).to.be.equal(201)
  });

  it('is not possible to create a admin user with the same email', async() => {
    const newUser = { name: 'Carlos', email: 'root@email.com', password: 'carlos'}
    const create = await servicesUsers.servicesAdminCreate(newUser)
    const message = 'Email already registered'
    expect(create.status).to.be.equal(409)
    expect(create.message).to.be.equal(message)
  });
})

describe('testing recipe services', () => {
  beforeEach(async () => {
    const db = await connection()
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  it('is possible to create a recipe', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const mealCreator = await servicesRecipes.servicesCreate(recipeInfo, userId)
    expect(mealCreator.status).to.be.equal(201)
  });

  it('is possible to get all recipes', async() => {
    const mealGetter = await servicesRecipes.servicesGetAll()
    expect(mealGetter.status).to.be.equal(200)
  });

  it('is possible to get a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealExpose = await servicesRecipes.servicesGetById(id)
    expect(mealExpose.status).to.be.equal(200)
  });

  it('if the id is incorrect return a message', async() => {
    const wrongId = '293123289031290'
    const message = 'recipe not found'
    const getById = await servicesRecipes.servicesGetById(wrongId)
    expect(getById.status).to.be.equal(404)
    expect(getById.message).to.be.equal(message)
  });

  it('is possible to update a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const newRecipe = { name: 'Batatas', ingredients: '2 batatas', preparation: 'Batata + batata' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealUpdate = await servicesRecipes.servicesUpdate(newRecipe, id)
    expect(mealUpdate.status).to.be.equal(200)
  });

  it('is possible to delete a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealDelete = await servicesRecipes.servicesDelete(id)
    expect(mealDelete.status).to.be.equal(204)
  });

  it('is possible to set the file directory inside the recipe', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const fileDirectory = 'http://localhost:3000/images/615b49cd3e0d143e4fafc032.jpeg'
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealUpload = await servicesRecipes.servicesUpload(fileDirectory, id)
    expect(mealUpload.status).to.be.equal(200)
  });

})