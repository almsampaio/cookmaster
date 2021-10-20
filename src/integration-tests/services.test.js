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
    const {status, data } = await servicesUsers.create(newUser)
    //console.log(status, data);
    expect(status).to.be.equal(400)
    expect(data.message).to.be.equal('Invalid entries. Try again.');
  });

  it('Não será possivel criar um usuário com mesmo e-mail', async() => {
    const newUser = { name: 'izelda', email: 'root@email.com', password: 'izelda'}
    const {status, data } = await servicesUsers.create(newUser)
    //const message = 'Email already registered'
    expect(status).to.be.equal(400)
    expect(data.message).to.be.equal('Invalid entries. Try again.')
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
    // newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    //const { _id: userId } = await modelUsers.create(newUser)
    const mealCreator = await servicesRecipes.createRecipe(recipeInfo.name, recipeInfo.ingredients, recipeInfo.preparation)
    expect(mealCreator.status).to.be.equal(201)
  });

  it('é possivel listar todas as receitas', async() => {
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    await servicesRecipes.createRecipe(recipeInfo.name, recipeInfo.ingredients, recipeInfo.preparation)
    const mealGetter = await servicesRecipes.getAll()
    expect(mealGetter.length).to.be.greaterThan(0);
  });

  it('é possivel localizar uma receita pelo id', async() => {
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { data : {recipe} } = await servicesRecipes
    .createRecipe(recipeInfo.name, recipeInfo.ingredients, recipeInfo.preparation)
    const {status} = await servicesRecipes.getById(recipe._id)
    expect(status).to.be.equal(200)
  });

  it('caso o id incorreto retorne uma msg de erro', async() => {
    const wrongId = '293'
    const message = 'recipe not found'
    const {status, data} = await servicesRecipes.getById(wrongId)
    expect(status).to.be.equal(404)
    expect(data.message).to.be.equal(message)
  });


}) 