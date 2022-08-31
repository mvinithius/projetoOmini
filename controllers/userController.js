const User = require('../models/User');

const userController = {
    //formulário de cadastro
    formCadastro: (req, res) => {
        res.render('pages/users/cadastro');
    },

    //formulário de login
    formLogin: (req, res) => {
        res.render('pages/users/login');
    },

    //pagina de lista de usuarios
    list: (req, res) => {
        const users = User.findAll();
        res.render('pages/users/list', { users });
    },

    //criação do usuário
    userCreate: (req, res) => {
        const user = req.body;
        const foto = req.file.filename;
        User.create(user, foto);
        res.redirect('/users');
    },

    //perfil do usuário
    showPerfil: (req, res) => {
        const { id } = req.params;
        const user = User.findById(id);
        res.render('pages/users/perfil', { user });
    },

    //para editar os dados do usuário
    editForm: (req, res) => {
        const { id } = req.params;
        const user = User.findById(id);
        res.render('pages/users/cadastro', { user });
    }

}

module.exports = userController;