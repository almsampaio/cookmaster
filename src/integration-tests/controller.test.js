const { expect } = require('chai');
const connection = require('../models/connection');
const sinon = require('sinon');
const controllerRecipes = require('../controllers/recipes');
const controllerUser = require('../controllers/users');
const modelsRecipes = require('../models/recipes');
const modelsUsers = require('../models/users');
const serviceRecipes = require('../services/recipes');
const servicesUsers = require('../services/users')
const { request } = require('express');

describe('testando a camada controllers', () => {
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
  
    it('é possivel criar um usuário', async() => {
      request.body = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      await controllerUser.create(request, response)
      expect(response.status.calledWith(201)).to.be.equal(true)
    });
  
    it('não é possivel criar um usuário com e-mails iguais', async() => {
      request.body = { name: 'izelda', email: 'root@email.com', password: 'senha123'}
      const message = 'Email already registered'
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      await controllerUser.create(request, response)
      expect(response.status.calledWith(409)).to.be.equal(true)
      expect(response.json.calledWith({ message })).to.be.equal(true)
    });

    it( 'é possível encontrar um usúario pelo email e senha', async()=>{
      request.body = { email: 'izelda@gmail.com', password: 'izelda'}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(servicesUsers,'findUser').resolves({status: 200, data:"0k" })
      await controllerUser.findUser(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true)
      //expect(response.json.calledWith("Ok")).to.be.equal(false)
    })

    it('é possivel criar um usuário ADM', async() => {
      request.body = { name: 'izelda', email: 'izelda@gmail.com', password: 'izelda'}
      request.user = { role: "admin" }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      await controllerUser.creatAdm(request, response)
      console.log(request)
      expect(response.status.calledWith(201)).to.be.equal(true)
    });
    
  })
  
  describe('teste arquivo recipes.js', () => {
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
  
    it('é possivel criar uma receita', async() => {
      const newUser = { name: 'Izelda', email: 'izelda@gmail.com', password: 'senha123'}
      request.body = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
      request.user = { _id: userId } = await modelsUsers.create(newUser)
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      await controllerRecipes.createRecipes(request, response)
      expect(response.status.calledWith(201)).to.be.equal(true)
    });
  
     it('é possivel listar todas as receitas', async() => {
      await controllerRecipes.getAll(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  
    it('é possivel encontrar uma receita pelo ID', async() => {
      const newUser = { name: 'izelda', email: 'izelda@gmail.com', password: 'senha123'}
      const recipeInfo = { name: 'Bolo', ingredients: 'Ovo', preparation: 'Bolo + Ovo' }
      const { _id: userId } = await modelsUsers.create(newUser)
      request.params = { _id: id} = await modelsRecipes.createRecipes(recipeInfo, userId)
      await controllerRecipes.getById(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  
    it('se o Id estiver incorreto retorne uma msg de erro', async() => {
      request.params = { id: '293123289031290'}
      const message = 'recipe not found'
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      await controllerRecipes.getById(request, response)
      expect(response.status.calledWith(404)).to.be.equal(true)
      expect(response.json.calledWith({ message })).to.be.equal(true)
    });

    it('è possivel atualizar uma receita pelo ID', async() =>{
      request.params = {id}
      request.user._id =  '123456'
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(serviceRecipes,'update').resolves({status: 200, data:"0k" })
      await controllerRecipes.update(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true)
      expect(response.json.calledWith("Ok")).to.be.equal(false)
    })

    it('é possivel remover uma receita pelo ID', async() => {
      request.params = {id}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(serviceRecipes,'remove').resolves({status: 200, data:"0k" })
      await controllerRecipes.remove(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true)
    }) 

    it( 'teste se é possivel incluir uma imagem', async()=>{
      request.params = {id}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(serviceRecipes,'uploadImage').resolves({status: 200, data:"0k" })
      await controllerRecipes.uploadImage(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true)
    })
  }) 
