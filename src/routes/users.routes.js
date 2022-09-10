var express = require('express');
var router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const upload = multer({ storage });

//renderiza a página de cadastro
router.get('/cadastro', userController.renderFormCadastro);

//renderiza a página de lista de usuários
// router.get('/lista', userController.renderUserList);

//rota para criar o cadastro
router.post('/cadastro', upload.single('foto'), userController.executeUserCreate);

//rota para mostrar o perfil do usuário
// router.get('/perfil/:id', userController.renderUserPerfil);

//rota para mostrar o form de edição de perfil do usuário com informações do usuário
// router.get('/perfil/editform/:id', userController.renderUserEditData);

//rota para atualizar os dados do usuário
// router.put('/perfil/edit/:id', upload.single('foto'), userController.executeUserUpdate);

// //rota para deletar um usuário
// router.delete('/perfil/delete/:id', userController.executeUserDelete);

//renderiza a página de login
router.get('/login', authController.renderUserFormLogin);

//rota para fazer o login 
router.post('/login', authController.executeUserLogin);

module.exports = router;
