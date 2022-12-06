var express = require('express');
var router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const upload = multer({ storage });

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

//renderiza a página de cadastro
router.get('/cadastro', UserController.renderFormCadastro);

//rota para criar o cadastro
router.post('/cadastro', upload.single('avatar'), UserController.UserCreate);

//renderiza a página de login
router.get('/login', AuthController.renderUserFormLogin);

//rota para fazer o login 
router.post('/login', AuthController.UserLogin);


module.exports = router;
