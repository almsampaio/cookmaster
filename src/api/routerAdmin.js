const express = require('express');
const AdminController = require('../Controller/AdminController');

const Adminrouter = express.Router();

// Requisito 12 - Cadastrar pessoas administradoras
Adminrouter.post('/admin', AdminController.adminRegistration);

module.exports = { Adminrouter };