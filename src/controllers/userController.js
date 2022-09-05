const User = require('../models/User');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {
    //renderiza o formulário de cadastro
    renderFormCadastro: (req, res) => {
        res.render('pages/users/cadastro');
    },

    //renderiza o formulário de login
    renderFormLogin: (req, res) => {
        res.render('pages/users/login', {error: null});
    },

    //renderiza a pagina de lista de usuarios
    renderUserList: (req, res) => {
        const users = User.findAll();
        res.render('pages/users/list', { users });
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

    //renderiza página de perfil do usuário
    renderUserPerfil: (req, res) => {
        const { id } = req.params;
        const user = User.findById(id);
        res.render('pages/users/perfil', { user });
    },

    //renderiza dados do usuário na páginad e edição de cadastro
    renderUserEditData: (req, res) => {
        const { id } = req.params;
        const user = User.findById(id);
        res.render('pages/users/perfilEdit', { user });
    },

    //executa a atualização do cadastro do usuário
    executeUserUpdate: (req, res) => {
        const { id } = req.params;
        const user = req.body;
        const foto = req.file.filename;

        User.removeFoto(id);
        User.update(id, user, foto);
        
        //redireciona pra home
        res.redirect('/');
    },

    //executa o delete do perfil do usuário
    executeUserDelete: (req, res) => {
        const { id } = req.params;

        User.removeFoto(id);
        User.delete(id);

        //redireciona pra home
        res.redirect('/');
    },
}

module.exports = userController;