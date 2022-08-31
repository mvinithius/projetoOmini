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

//renderiza a página de lista de usuários
router.get('/lista', userController.list)

//rota para criar o cadastro
router.post('/', upload.single('foto'), userController.userCreate);

//rota para mostrar o perfil do usuário
router.get('/perfil/:id', userController.showPerfil)

//rota para mostrar o form de edição de perfil do usuário
router.get('/edit/:id', userController.editForm)

module.exports = router;
