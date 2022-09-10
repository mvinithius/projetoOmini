const User = require('../models/User');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {
    //executa o login do usuário
    executeUserLogin: (req, res) => {
        //pega os dados do usuário no formulário de login
        const {email, senha} = req.body;
        
        //chama a model pra buscar usuário pelo e-mail
        const usuario = User.findByEmail(email);

        //se o usuário informado não existir
        if(!usuario){
            //renderiza a página de login com erro
            return res.render('pages/users/login', {error: 'Email ou senha inválidos'});
        }

        //verifica se a senha informada é a mesma que a senha criptografada no db
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);

        //verifica se a senha é válida
        if(!senhaValida) {
            //se a senha for inválida, renderiza a página de login com erro
            return res.render('pages/users/login', {error: 'Email ou senha inválidos'});
        }

        // Se o email e a senha forem válidos, cria uma sessão para o usuário
        // Salva todas as informações do usuário na sessão
        req.session.user = { 
            email: usuario.email, 
            id: usuario.id, 
            nome: usuario.nome,
            endereco: usuario.endereco,
            cep: usuario.cep,
            foto: usuario.foto
        };

        // Redireciona para a página restrita
        // Utiliza a rota userPrivate
        return res.redirect('minha-conta');
    },

    executeUserLogout: (req, res) => {
        // Destroi a sessão do usuário
        req.session.destroy();
    
        // Redireciona para a home
        return res.redirect('/');
    },

    renderUserFormLogin: (req, res) => {
        // Verifica se o usuário está logado
        // Ou seja, se existe uma sessão para o usuário
        if (req.session.user != undefined) {
          // Se estiver logado, redireciona para a página restrita
          return res.redirect('minha-conta');
        }
    
        // se não estiver logado, redireciona para a página de login
        return res.render('pages/users/login',  { error: null });
    },

    //renderiza a pagina de lista de usuarios
    renderUserList: (req, res) => {
        //busca todos os usuários no Db
        const users = User.findAll();

        //renderiza a página com lista de usuários
        res.render('pages/users/list', { users });
    },
    
    //renderiza a página restrita (área logada do usuário)
    renderAreaRestrita: (req, res) => {
        // Busca o usuário na sessão
        const user = req.session.user;

        // Renderiza a página restrita passando os dados do usuário logado
        return res.render('pages/users/areaUserLogado',  { user });
    },

    //renderiza página de perfil do usuário
    renderUserPerfil: (req, res) => {
        const user = req.session.user;
        // const { id } = req.params;
        // const user = User.findById(id);
        res.render('pages/users/perfil', { user });
    },

    //renderiza dados do usuário na página de edição de cadastro
    renderUserEditData: (req, res) => {
        const { id } = req.params;
        const user = User.findById(id);
        res.render('pages/users/perfilEdit', { user });
    },

    //executa a atualização do cadastro do usuário
    executeUserUpdate: (req, res) => {
        const { id } = req.params;
        const { nome, email, senha, cep, endereco, complemento } = req.body;
        const foto = req.file.filename;
        const hash = bcrypt.hashSync(senha, saltRounds);

        User.removeFoto(id);
        User.update(id, {nome, email, senha: hash, cep, endereco, complemento}, foto);
        
        //redireciona para home
        res.redirect('/');
    },

    executeUserDelete: (req, res) => {
        const { id } = req.params;

        User.removeFoto(id);
        User.delete(id);

        //redireciona pra home
        res.redirect('/');
    },
}


module.exports = userController;