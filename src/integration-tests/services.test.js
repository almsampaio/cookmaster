const { expect } = require('chai');
const connection = require('../models/connection')
const servicesRecipes = require('../services/recipes')
const servicesUsers = require('../services/users')
const modelRecipes = require('../models/recipes')
const modelUsers = require('../models/users')

describe('teste user da camada service.js', () => {
  beforeEach(async () => {
    const db = await connection()
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  it('é possivel criar um usuário', async() => {
    const newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
    const create = await servicesUsers.create(newUser)
    expect(create.status).to.be.equal(201)
  });

  it('Não será possivel criar um usuário com mesmo e-mail', async() => {
    const newUser = { name: 'izelda', email: 'root@email.com', password: 'izelda'}
    const create = await servicesUsers.create(newUser)
    const message = 'Email already registered'
    expect(create.status).to.be.equal(409)
    expect(create.message).to.be.equal(message)
  });
})

describe('teste recipes.js da camada sevice', () => {
  beforeEach(async () => {
    const db = await connection()
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  it('é possivel criar uma receita', async() => {
    const newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.create(newUser)
    const mealCreator = await servicesRecipes.createRecipe(recipeInfo, userId)
    expect(mealCreator.status).to.be.equal(201)
  });

  it('é possivel listar todas as receitas', async() => {
    const mealGetter = await servicesRecipes.getAll()
    expect(mealGetter.status).to.be.equal(200)
  });

  it('é possivel localizar uma receita pelo id', async() => {
    const newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.create(newUser)
    const { _id: id} = await modelRecipes.createRecipes(recipeInfo, userId)
    const mealExpose = await servicesRecipes.getById(id)
    expect(mealExpose.status).to.be.equal(200)
  });

  it('caso o id incorreto retorne uma msg de erro', async() => {
    const wrongId = '293123289031290'
    const message = 'recipe not found'
    const getById = await servicesRecipes.getById(wrongId)
    expect(getById.status).to.be.equal(404)
    expect(getById.message).to.be.equal(message)
  });


}) 