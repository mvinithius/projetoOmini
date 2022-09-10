var express = require('express');
var router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const upload = multer({ storage });

//renderiza a página de cadastro
router.get('/cadastro', userController.renderFormCadastro);

//rota para criar o cadastro
router.post('/cadastro', upload.single('foto'), userController.executeUserCreate);

//renderiza a página de login
router.get('/login', authController.renderUserFormLogin);

//rota para fazer o login 
router.post('/login', authController.executeUserLogin);

module.exports = router;
