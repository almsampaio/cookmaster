const { expect } = require('chai');
const connection = require('../api/connection')
const servicesRecipes = require('../services/recipes')
const servicesUsers = require('../services/users')

// describe('testing login models', () => {
//   beforeEach(async () => {
//     const db = await connection()
//     await db.collection('users').deleteMany({});
//     await db.collection('recipes').deleteMany({});
//     const users = {
//       name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
//     await db.collection('users').insertOne(users);
//   });

//   it('email and password comparison', async() => {
//     const password = 'admin';
//     const email = 'root@email.com'
//     const login = await modelLogin.modelPasswordCompare(password, email)
//     expect(login).to.have.a.property('_id')
//     expect(login).to.be.a('object')
//     expect(login.email).to.be.equal(email)
//     expect(login.password).to.be.equal(password)
//   });  
// })

describe('testing user models', () => {
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

  // it('is possible to finding by only using the email', async() => {
  //   const email = 'root@email.com'
  //   const emailFinder = await modelUsers.modelEmailFind(email)
  //   expect(emailFinder).to.have.a.property('_id')
  //   expect(emailFinder.email).to.be.equal(email)
  // });
  
  // it('is possible to create an admin user', async() => {
  //   const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
  //   const create = await modelUsers.modelAdminCreate(newUser)
  //   expect(create).to.have.a.property('_id')
  //   expect(create).to.be.a('object')
  //   expect(create.role).to.be.equal('admin')
  // });
})

describe('testing recipe models', () => {
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
    const mealCreator = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealExpose = await modelRecipes.modelGetAll()
    expect(mealCreator).to.have.a.property('_id')
    expect(mealCreator).to.be.a('object')
    expect(mealCreator.name).to.be.equal('Bolo')
    expect(mealExpose).to.be.an('array')
    expect(mealExpose.length).to.be.equal(1)
  });

  it('is possible to get a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealExpose = await modelRecipes.modelGetById(id)
    expect(mealExpose).to.have.a.property('_id')
    expect(mealExpose).to.be.a('object')
    expect(mealExpose.name).to.be.equal('Bolo')
  });

  it('if the id is incorrect return null', async() => {
    const wrongId = '293123289031290'
    const getById = await modelRecipes.modelGetById(wrongId)
    expect(getById).to.be.equal(null)
  });

  it('is possible to update a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const newRecipe = { name: 'Batatas', ingredients: '2 batatas', preparation: 'Batata + batata' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealUpdate = await modelRecipes.modelUpdate(newRecipe, id)
    expect(mealUpdate).to.have.a.property('_id')
    expect(mealUpdate).to.be.a('object')
    expect(mealUpdate.name).to.be.equal(newRecipe.name)
  });

  it('if the id is incorrect return null', async() => {
    const wrongId = '293123289031290'
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const newRecipe = { name: 'Batatas', ingredients: '2 batatas', preparation: 'Batata + batata' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealUpdate = await modelRecipes.modelUpdate(newRecipe, wrongId)
    expect(mealUpdate).to.be.equal(null)
  });

  it('is possible to delete a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealDelete = await modelRecipes.modelDelete(id)
    expect(mealDelete).to.be.equal(undefined)
    const mealExpose = await modelRecipes.modelGetAll()
    expect(mealExpose.length).to.be.equal(0)
  });

  it('if the id is incorrect return null', async() => {
    const wrongId = '293123289031290'
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealDelete = await modelRecipes.modelDelete(wrongId)
    expect(mealDelete).to.be.equal(null)
  });

  it('is possible to set the file directory inside the recipe', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const fileDirectory = 'http://localhost:3000/images/615b49cd3e0d143e4fafc032.jpeg'
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealUpload = await modelRecipes.modelUpload(fileDirectory, id)
    expect(mealUpload.image).to.be.equal(fileDirectory)
  });

  it('if the id is incorrect return null', async() => {
    const wrongId = '293123289031290'
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const fileDirectory = 'http://localhost:3000/images/615b49cd3e0d143e4fafc032.jpeg'
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    const { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    const mealUpload = await modelRecipes.modelUpload(fileDirectory, wrongId)
    expect(mealUpload).to.be.equal(null)
  });

})