var express = require('express');
var router = express.Router();

//importando o controller
const pageController = require('../controllers/pageController')


//definindo as rotas
router.get('/', pageController.home)
router.get('/servicos', pageController.servicos)
router.get('/chaveiro', pageController.chaveiro)
router.get('/dedetizador', pageController.dedetizador)
router.get('/diarista', pageController.diarista)
router.get('/eletricista', pageController.eletricista)
router.get('/encanador', pageController.encanador)
router.get('/jardineiro', pageController.jardineiro)
router.get('/montador', pageController.montador)
router.get('/pedreiro', pageController.pedreiro)
router.get('/carrinho', pageController.carrinho)
router.get('/perfil', pageController.perfilUsuario)


module.exports = router;
