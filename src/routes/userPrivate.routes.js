const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const upload = multer({ storage });

const authController = require('../controllers/authController');

//rota para fazer o logout do usuario
router.post('/logout', authController.executeUserLogout);

//renderiza para teste da nova área restrita
router.get('/minha-conta', authController.renderAreaRestrita);

//rota para mostrar o perfil do usuário
router.get('/perfil/:id', authController.renderUserPerfil);

//rota para mostrar o form de edição de perfil do usuário com informações do usuário
router.get('/perfil/editform/:id', authController.renderUserEditData);

//rota para atualizar os dados do usuário
router.put('/perfil/edit/:id', upload.single('foto'), authController.executeUserUpdate);

//rota para deletar um usuário
router.delete('/perfil/delete/:id', authController.executeUserDelete);

//renderiza a página de lista de usuários
router.get('/lista', authController.renderUserList);

module.exports = router;
