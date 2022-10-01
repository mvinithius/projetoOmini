const { Usuario } = require('../models')

const bcrypt = require('bcrypt');

const saltRounds = 10;

const AuthController = {

    //renderiza página de perfil do usuário com os dados de usuário
    renderUserPerfil: async (req, res) => {
        // armazena o id do usuário da sessão
        const userId  = req.session.user;

        // busca pelos dados do usuário no banco de dados
        const {id, nome, email} = await Usuario.findByPk(userId);

        // armazena os dados do usuário
        const user = { id, nome, email }  

        // renderiza a pagina de perfil passando os dados do usuario 
        res.render('pages/users/perfil', { user });
    },

    //renderiza dados do usuário na página de atualização de perfil
    renderEditForm: async (req, res) => {
        
        const userId  = req.session.user;

        const { id, nome, email } = await Usuario.findByPk(userId);
        
        const user = { id, nome, email };

        res.render('pages/users/perfilEdit', { user, error: null });
    },
 
    // edita os dados do usuário
    userEdit: async (req, res) => {
        // armazena o id do usuário da sessão
        const userId = req.session.user;

        // recebe e armazena os dados do formulário de edição
        const { nome, email, senha, senhaConfirm } = req.body;

        // checa se a senha é igual nos dois campos
        if(senha != senhaConfirm){
            // armazena os dados do usuário para passar no retorno
            const {nome, email}  = await Usuario.findByPk(id);

            // se a senha não for igual, renderiza a página com msg de erro
            res.render('pages/users/perfilEdit', {user, error: 'Senha não coincide'});

            return
        }

        
        // criptografia da senha
        const hash = bcrypt.hashSync(senha, saltRounds);

        // executa a atualização de dados
        const atualizacao = await Usuario.update({
            nome,
            email,
            senha: hash,
        },
        {
            where: {
                id: userId
            }
        })
        
        // redireciona pro dashboard do usuário
        return res.redirect('/users/minha-conta')
    },

    // executa o login do usuário
    UserLogin: async (req, res) => {
        //pega os dados do usuário no formulário de login
        const { email, senha } = req.body;
        
        //chama a model pra buscar usuário pelo e-mail
        const user = await Usuario.findOne({where: {email: email}});

        //se o usuário informado não existir
        if(!user){
            //renderiza a página de login com erro
            return res.render('pages/users/login', {error: 'Email ou senha inválidos'});
        }

        //verifica se a senha informada é a mesma que a senha criptografada no db
        const senhaValida = bcrypt.compareSync(senha, user.senha);

        //verifica se a senha é válida
        if(!senhaValida) {
            //se a senha for inválida, renderiza a página de login com erro
            return res.render('pages/users/login', {error: 'Email ou senha inválidos'});
        }
        console.log('checagem de senha ok')

        // Se o email e a senha forem válidos, cria uma sessão para o usuário salvando o ID do usuário
        req.session.user = user.id
        console.log('salvado o id do usuário para sessão OK:', user.id)

        req.session.save(() => {
            res.redirect('minha-conta')
        })
        console.log('redirecionando pra área restrita OK');
    },

    executeUserLogout: (req, res) => {
        // Destroi a sessão do usuário
        req.session.destroy();
    
        // Redireciona para a home
        return res.redirect('/');
    },

    renderUserFormLogin: async (req, res) => {
        // Verifica se o usuário está logado
        // Ou seja, se existe uma sessão para o usuário
        if (req.session.user != undefined) {
           
           // Se estiver logado, armazena o id do usuário
            const userId  = req.session.user;

            // busca e armazena pelo nome e email no db
            const {id, nome, email} = await Usuario.findByPk(userId);

            const user = { id, nome, email };
            
        //   redireciona para a página restrita
          return res.redirect('minha-conta', { user });
        }
    
        // se não estiver logado, redireciona para a página de login
        return res.render('pages/users/login',  { error: null });
    },
    
    //renderiza a página restrita (área logada do usuário)
    renderAreaRestrita: async (req, res) => {
        // Armazena o ID do usuário da sessão
        const userId  = req.session.user;
        console.log('ID DO USUÁRIO - AREA RESTRITA: ', userId);

        // busca pelo nome do usuário no banco de dados com o ID 
        const { id, nome, email } = await Usuario.findByPk(userId);

        // armazena o nome do usuario
        const user = { id, nome, email};

        // Renderiza a página restrita passando o nome do usuário
        return res.render('pages/users/userDashboard',  { user });
    },

    userDelete: async (req, res) => {
        // armazena o id do usuário
        const userId = req.session.user;

        // deleta o usuário com base no id
        const deletar = await Usuario.destroy({
            where: {
                id: userId
            }
        })
        
        await req.session.destroy();
        return res.redirect('/');
    }
}


module.exports = AuthController;