const { expect } = require('chai');
const connection = require('../models/connection')
const modelRecipes = require('../models/recipes')
const modelUsers = require('../models/users')



describe('teste camada models', () => {
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
    const create = await modelUsers.create(newUser)
    expect(create).to.have.a.property('_id')
    expect(create).to.be.a('object')
  });

  it('é possivel encontra um usuário por seu e-mail', async() => {
    const email = 'root@email.com'
    const emailFinder = await modelUsers.getEmail(email)
    expect(emailFinder).to.have.a.property('_id')
    expect(emailFinder.email).to.be.equal(email)
  });

})

describe('teste recipes.js', () => {
  beforeEach(async () => {
    const db = await connection()
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  it('is posssivel criar uma receita', async() => {
    const newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.create(newUser)
    const mealCreator = await modelRecipes.createRecipes(recipeInfo, userId)
    const mealExpose = await modelRecipes.getAll()
    expect(mealCreator).to.have.a.property('_id')
    expect(mealCreator).to.be.a('object')
    expect(mealExpose).to.be.an('array')
    expect(mealExpose.length).to.be.equal(1)
  });

   it('é possivel localizar uma receita pelo id', async() => {
    const newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'izelda'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.create(newUser)
    const { _id: id} = await modelRecipes.createRecipes(recipeInfo, userId)
    const mealExpose = await modelRecipes.getById(id)
    expect(mealExpose).to.have.a.property('_id')
    expect(mealExpose).to.be.a('object')
  });

    it('Caso o Id esteja incorreto retone false', async() => {
    const wrongId = '293123289031290'
    const getById = await modelRecipes.getById(wrongId)
    expect(getById).to.be.equal(false)
  });
}) 