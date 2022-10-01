const { Usuario } = require('../models')

const bcrypt = require('bcrypt');

const saltRounds = 10;

const AuthController = {

    //renderiza página de perfil do usuário com os dados de usuário
    renderUserPerfil: async (req, res) => {
        // armazena o id do usuário da sessão
        const userId = req.session.user;

        // busca pelos dados do usuário no banco de dados com o ID que armazenamos acima
        const {nome, email, senha, cep, endereco, complemento} = await Usuario.findByPk(userId);

        // armazena os dados do usuario que foram buscados no banco
        const user = {nome, email, senha, cep, endereco, complemento}       

        // renderiza a pagina de perfil passando os dados do usuario buscado no banco
        res.render('pages/users/perfil', { user });
    },

    //renderiza dados do usuário na página de atualização de perfil
    renderEditForm: async (req, res) => {
              
        const userId = await req.session.user;

        const {nome, email, senha, cep, endereco, complemento} = await Usuario.findByPk(userId);
        
        const user = {nome, email, senha, cep, endereco, complemento}

        res.render('pages/users/perfilEdit', {user});
    },
 
    // edita os dados do usuário
    userEdit: async (req, res) => {
        // recebe o id do usuário
        const userId = await req.session.user;

        // recebe os dados do formulário de edição
        const {nome, email, senha, endereco, cep, complemento} = req.body;

        // criptografia da senha
        const hash = bcrypt.hashSync(senha, saltRounds);

        // executa a atualização de dados
        const atualizacao = await Usuario.update({
            nome,
            email,
            senha: hash,
            endereco,
            cep,
            complemento,
        },
        {
            where: {
                id: userId
            }
        })      
        
        return res.redirect('/')
    },

    // executa o login do usuário
    UserLogin: async (req, res) => {
        //pega os dados do usuário no formulário de login
        const {email, senha} = req.body;
        
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

        // Se o email e a senha forem válidos, cria uma sessão para o usuário salvado o ID do usuário
        req.session.user = user.id

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
    
    //renderiza a página restrita (área logada do usuário)
    renderAreaRestrita: async (req, res) => {
        // Armazena o ID do usuário da sessão
        const userId = await req.session.user;

        // busca pelo nome do usuário no banco de dados com o ID salvo
        const { nome } = await Usuario.findByPk(userId);

        // armazena o nome do usuario
        const user = nome;

        // Renderiza a página restrita passando o nome do usuário
        return res.render('pages/users/areaUserLogado',  { user });
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