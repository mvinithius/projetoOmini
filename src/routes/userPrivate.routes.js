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
router.get('/perfil/', AuthController.renderUserPerfil);

//rota para mostrar o form de edição de perfil do usuário com informações do usuário
router.get('/perfil/edit/', AuthController.renderEditForm);

//rota para atualizar os dados do usuário
router.put('/perfil/edit/', upload.single('foto'), AuthController.userEdit);

//rota para deletar um usuário
router.delete('/perfil/delete/', AuthController.userDelete);

module.exports = router;
