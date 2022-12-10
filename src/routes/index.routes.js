var express = require('express');
var router = express.Router();

//importando o controller
const PageController = require('../controllers/pageController')
const CartController = require('../controllers/cartController')

//home
router.get('/', PageController.home)

//serviços
router.get('/servicos', PageController.servicos)

//páginas dos serviços
router.get('/chaveiro', PageController.chaveiro)
router.get('/dedetizador', PageController.dedetizador)
router.get('/diarista', PageController.diarista)
router.get('/eletricista', PageController.eletricista)
router.get('/encanador', PageController.encanador)
router.get('/jardineiro', PageController.jardineiro)
router.get('/montador', PageController.montador)
router.get('/pedreiro', PageController.pedreiro)

//carrinho
router.get('/carrinho', CartController.showCart)
router.post('/carrinho/adicionar/:id', CartController.addToCart)
router.delete('/carrinho/remover', CartController.removeFromCart)
router.post('/carrinho/aumentar/:id', CartController.addQuantity)
router.post('/carrinho/diminuir', CartController.substractQuantity)

module.exports = router;