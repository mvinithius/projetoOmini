const bcrypt = require('bcrypt');

const User = require('../models/User');

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
        // Salvando o email e o id do usuário na sessão
        req.session.user = { email: usuario.email, id: usuario.id };

        // Redireciona para a página restrita
        // Utiliza a rota userPrivate > /restrito
        return res.redirect('restrito');
    },

    executeUserLogout: (req, res) => {
        // Destroi a sessão do usuário
        req.session.destroy();
    
        // Redireciona para a home
        return res.redirect('/');
    },

    renderLogin: (req, res) => {
        // Verifica se o usuário está logado
        // Ou seja, se existe uma sessão para o usuário
        if (req.session.user != undefined) {
          // Se estiver logado, redireciona para a página restrita
          return res.redirect('restrito');
        }
    
        // Renderiza a página de login
        return res.render('pages/users/login',  { error: null });
    },
    
    renderAreaRestrita: (req, res) => {
        // Busca o usuário na sessão
        const user = req.session.user;
        // Renderiza a página restrita passando os dados do usuário logado
        return res.render('pages/users/areaRestrita',  { user });
    },
}


module.exports = userController;