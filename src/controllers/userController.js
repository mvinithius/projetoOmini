const User = require('../models/User');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {
    //renderiza o formulário de cadastro
    renderFormCadastro: (req, res) => {
        res.render('pages/users/cadastro');
    },

    //executa a criação do usuário
    executeUserCreate: (req, res) => {
        console.log(req.body);
        const {nome, email, senha, cep, endereco, complemento} = req.body;
        const foto = req.file.filename;
        const hash = bcrypt.hashSync(senha, saltRounds);
       
        User.create({nome, email, senha: hash, cep, endereco, complemento}, foto);
        
        //redireciona pra home
        res.redirect('/');
    },

}

module.exports = userController;