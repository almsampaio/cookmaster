const { expect } = require('chai');
const connection = require('../api/connection')
const sinon = require('sinon');
const controllerRecipes = require('../controller/recipes')
const controllerUsers = require('../controller/users')
const modelRecipes = require('../models/recipes')
const modelUsers = require('../models/users');
const { request } = require('express');


describe('testing user controller', () => {
  const response = {}
  const request = {}
  beforeEach(async () => {
    const db = await connection()
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  it('is possible to create a user', async() => {
    request.body = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerUsers.controlCreate(request, response)
    expect(response.status.calledWith(201)).to.be.equal(true)
  });

  it('is not possible to create a user with the same email', async() => {
    request.body = { name: 'Carlos', email: 'root@email.com', password: 'carlos'}
    const message = 'Email already registered'
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerUsers.controlCreate(request, response)
    expect(response.status.calledWith(409)).to.be.equal(true)
    expect(response.json.calledWith({ message })).to.be.equal(true)
  });
  
  it('is possible to create a admin user', async() => {
    request.body = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerUsers.controlAdminCreate(request, response)
    expect(response.status.calledWith(201)).to.be.equal(true)
  });

  it('is not possible to create a admin user with the same email', async() => {
    request.body = { name: 'Carlos', email: 'root@email.com', password: 'carlos'}
    const message = 'Email already registered'
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerUsers.controlAdminCreate(request, response)
    expect(response.status.calledWith(409)).to.be.equal(true)
    expect(response.json.calledWith({ message })).to.be.equal(true)
  });
})

describe('testing recipe services', () => {
  const response = {}
  const request = {}
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
    request.body = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    request.user = { _id: userId } = await modelUsers.modelCreate(newUser)
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerRecipes.controlCreate(request, response)
    expect(response.status.calledWith(201)).to.be.equal(true)
  });

  it('is possible to get all recipes', async() => {
    await controllerRecipes.controlGetAll(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true)
  });

  it('is possible to get a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    request.params = { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    await controllerRecipes.controlGetById(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true)
  });

  it('if the id is incorrect return a message', async() => {
    request.params = { id: '293123289031290'}
    const message = 'recipe not found'
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerRecipes.controlGetById(request, response)
    expect(response.status.calledWith(404)).to.be.equal(true)
    expect(response.json.calledWith({ message })).to.be.equal(true)
  });

  it('is possible to update a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    request.body = { name: 'Batatas', ingredients: '2 batatas', preparation: 'Batata + batata' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    request.params = { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerRecipes.controlUpdate(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true)
  });

  it('is possible to delete a recipe by its id', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    request.params = { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerRecipes.controlDelete(request, response)
    expect(response.status.calledWith(204)).to.be.equal(true)
  });

  it('is possible to set the file directory inside the recipe', async() => {
    const newUser = { name: 'Carlos', email: 'carlos@gmail.com', password: 'carlos'}
    const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
    request.file = {filename: 'http://localhost:3000/images/615b49cd3e0d143e4fafc032.jpeg'}
    const { _id: userId } = await modelUsers.modelCreate(newUser)
    request.params = { _id: id} = await modelRecipes.modelCreate(recipeInfo, userId)
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    await controllerRecipes.controlUpload(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true)
  });
})