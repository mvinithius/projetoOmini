const User = require('../models/User');

const userController = {
    formCadastro: (req, res) => {
        res.render('pages/users/cadastro')
    },

    formLogin: (req, res) => {
        res.render('pages/users/login')
    },

    indexUsers: (req, res) => {
        res.render('pages/users/indexUsers')
    },

    userCreate: (req, res) => {
        const user = req.body;
        const foto = req.file.filename;
        User.create(user, foto);
        res.redirect('/users');
    },
}

module.exports = userController;