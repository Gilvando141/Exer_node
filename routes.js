const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginControllers');
const contatoController = require('./src/controllers/contatoControllers');

const { loginReq } = require('./src/middleware/middleware');


//rotas para home
route.get('/', homeController.index);


//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas de contato
route.get('/contato/index', loginReq, contatoController.index);
route.post('/contato/register', loginReq, contatoController.register);


module.exports = route;