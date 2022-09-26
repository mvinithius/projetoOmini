const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const upload = multer({ storage });

const AuthController = require('../controllers/AuthController');

//rota para fazer o logout do usuario
router.post('/logout', AuthController.executeUserLogout);

//renderiza para teste da nova área restrita
router.get('/minha-conta', AuthController.renderAreaRestrita);

//rota para mostrar o perfil do usuário
router.get('/perfil/:id', AuthController.renderUserPerfil);

//rota para mostrar o form de edição de perfil do usuário com informações do usuário
router.get('/perfil/editform/:id', AuthController.renderUserEditData);

//rota para atualizar os dados do usuário
router.put('/perfil/edit/:id', upload.single('foto'), AuthController.executeUserUpdate);

//rota para deletar um usuário
router.delete('/perfil/delete/:id', AuthController.executeUserDelete);

// //renderiza a página de lista de usuários
// router.get('/lista', AuthController.renderUserList);

module.exports = router;
