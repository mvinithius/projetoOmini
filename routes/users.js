var express = require('express');
var router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const userController = require('../controllers/userController');

const upload = multer({ storage });

//renderiza a página de login
router.get('/', userController.formLogin);

//renderiza a página de cadastro
router.get('/cadastro', userController.formCadastro);

//rota para criar o cadastro
router.post('/', upload.single('foto'), userController.userCreate);

module.exports = router;
