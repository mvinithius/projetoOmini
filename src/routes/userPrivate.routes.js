const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const upload = multer({ storage });

const AuthController = require('../controllers/AuthController');
const AddressController = require('../controllers/addressController');

//rota para fazer o logout do usuario
router.post('/logout', AuthController.executeUserLogout);

//renderiza para teste da nova área restrita
router.get('/minha-conta', AuthController.renderAreaRestrita);

//rota para mostrar o perfil do usuário
router.get('/perfil/:id', AuthController.renderUserPerfil);

//rota para mostrar o form de edição de perfil do usuário com informações do usuário
router.get('/perfil/edit/:id', AuthController.renderEditForm);

//rota para atualizar os dados do usuário
router.put('/perfil/edit/:id', upload.single('foto'), AuthController.userEdit);

//rota para deletar um usuário
router.delete('/perfil/delete/:id', AuthController.userDelete);

// rota para renderizar a página de dendereços
router.get('/perfil/:id/enderecos', AddressController.renderAddresses);

module.exports = router;
