var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');


router.get('/', userController.indexUsers);
router.get('/cadastro', userController.cadastro);
router.get('/login', userController.login);

module.exports = router;
