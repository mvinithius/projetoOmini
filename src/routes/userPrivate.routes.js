const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const upload = multer({ storage });

const AuthController = require('../controllers/AuthController');
const AddressController = require('../controllers/addressController');
const CreditCardController = require('../controllers/creditCardController');
const CheckoutController = require('../controllers/checkoutController');

//rota para fazer o logout do usuario
router.post('/logout', AuthController.executeUserLogout);

//renderiza para teste da nova área restrita
router.get('/minha-conta', AuthController.renderAreaRestrita);

//rota para mostrar o perfil do usuário
router.get('/perfil/:id', AuthController.renderUserPerfil);

//rota para mostrar o form de edição de perfil do usuário com informações do usuário
router.get('/perfil/edit/:id', AuthController.renderEditForm);

//rota para atualizar os dados do usuário
router.put('/perfil/edit/:id', upload.single('avatar'), AuthController.userEdit);

//rota para deletar um usuário
router.delete('/perfil/delete/:id', AuthController.userDelete);

// =========
// ENDEREÇO
// =========

// rota para renderizar a página de dendereços
router.get('/perfil/:id/enderecos', AddressController.renderAddresses);

// rota para renderizar o formulário de cadastro de endereço
router.get('/perfil/:id/enderecos/adicionar', AddressController.renderAddressForm);

// rota para cadastrar o novo endereço do usuario
router.post('/perfil/:id/enderecos/adicionar', AddressController.addAddress);

// rota para renderizar formulário de edição do endereço
router.get('/perfil/:id/enderecos/editar/:id', AddressController.renderEditAddress);

// rota para atualizar o endereço
router.post('/perfil/:id/enderecos/editar/:id', AddressController.editAddress);

// rota para atualizar o endereço
router.post('/perfil/:id/enderecos/delete/:id', AddressController.deleteAddress);

// ========
// CARTOES
// ========

// rota para renderizar lista de cartões
router.get('/perfil/:id/cartoes', CreditCardController.renderCreditCardList)

// rota para renderizar o formulário de cadastro de cartões
router.get('/perfil/:id/cartoes/adicionar', CreditCardController.renderCreditCardForm);

// rota para cadastrar novos cartões
router.post('/perfil/:id/cartoes/adicionar', CreditCardController.addCreditCard);

// rota para excluir um cartão
router.post('/perfil/:id/cartoes/delete/:id', CreditCardController.deleteCreditCard);

// ====================
// CHECKOUT E PAGAMENTO
// ====================

router.get('/checkout', CheckoutController.renderCheckout);

router.get('/pagamento', CheckoutController.renderPaymentPage);


module.exports = router;
