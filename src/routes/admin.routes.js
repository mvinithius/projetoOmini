var express = require('express');
var router = express.Router();
const multer = require('multer');

const { storage } = require('../config/upload');

const upload = multer({ storage });

const ServiceController = require('../controllers/serviceController')
const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const AdminController = require('../controllers/adminController')


//renderiza a página de lista de usuários
router.get('/UserList', AdminController.showUserList);

// renderiza o perfil do usuário para o admin
router.get('/user/perfil/:id', AdminController.showUserPerfil)

//rota para renderizar a lista de serviços
router.get('/ServiceList', ServiceController.renderServiceList);

// rota para renderizar a página de cadastro de serviços
router.get('/adicionarServico', ServiceController.renderServiceForm);

// rota para adicionar novo serviço
router.post('/adicionarServico', upload.single('imagem'), ServiceController.addService);

// rota para renderizar a página do serviço
router.get('/servico/:id', ServiceController.showService)

// rota para renderizar o form de edição de serviço com dados do serviço
router.get('/editarServico/:id', ServiceController.renderServiceEditForm);

// rota para atualizar os dados do serviço
router.put('/editarServico/:id', upload.single('imagem'), ServiceController.editService);

// rota para deletar o serviço
router.delete('/deletarServico/:id', ServiceController.deleteService);

// rota para renderizar o dashboard de admin
router.get('/', AdminController.renderDashboard);

module.exports = router;