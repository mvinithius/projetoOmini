const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//renderiza a página restrita
router.get('/restrito', authController.renderAreaRestrita);

//rota para fazer o logout do usuario
router.post('/logout', authController.executeUserLogout);

module.exports = router;
