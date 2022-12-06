const { Usuario } = require('../models');

const fs = require('fs');

const bcrypt = require('bcrypt');
const { uploadPath } = require('../config/upload');

const saltRounds = 10;

const AuthController = {

    //renderiza página de perfil do usuário com os dados de usuário
    renderUserPerfil: async (req, res) => {
        // armazena o id do usuário da sessão
        const userId  = req.session.user;

        // busca pelos dados do usuário no banco de dados
        const { id, nome, email, avatar} = await Usuario.findByPk(userId);

        // armazena os dados do usuário
        const user = { id, nome, email, avatar }  

        // renderiza a pagina de perfil passando os dados do usuario 
        res.render('pages/users/perfil', { user });
    },

    //renderiza dados do usuário no formulário de edição de perfil
    renderEditForm: async (req, res) => {
        
        const userId  = req.session.user;

        const { id, nome, email , avatar} = await Usuario.findByPk(userId);
        
        const user = { id, nome, email , avatar};

        res.render('pages/users/perfilEdit', { user, error: null });
    },

    // edita os dados do usuário
    userEdit: async (req, res) => {
        // armazena o id do usuário da sessão
        const userId = req.session.user;

        const user = await Usuario.findByPk(userId);
        
        // recebe e armazena os dados do formulário de edição
        const { nome, email, senha, senhaConfirm } = req.body;

        const avatar = req.file.filename;

        if (avatar != undefined){
            if(user.avatar != ''){
                fs.unlink(`${uploadPath}/${user.avatar}`, (error) =>{
                    if(error){
                        console.log("Erro ao excluir avatar");
                    } else {
                        console.log("Avatar excluído");
                    }
                });
            } else {
                console.log('Não existe avatar pra excluir')
            }           
        } 

        // checa se a senha é igual nos dois campos
        if(senha != senhaConfirm){
            // armazena os dados do usuário para passar no retorno
            let user  = await Usuario.findByPk(userId);

            // se a senha não for igual, renderiza a página com msg de erro
            return res.render('pages/users/perfilEdit', {user, error: 'Senha não coincide'});
        }
    
        // criptografia da senha
        const hash = bcrypt.hashSync(senha, saltRounds);  
        
        // executa a atualização de dados
        const atualizacao = await Usuario.update({
            nome,
            email,
            senha: hash,
            avatar
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

        // Se o email e a senha forem válidos, cria uma sessão para o usuário salvando o ID do usuário
        req.session.user = user.id

        req.session.save(() => {
            res.redirect('minha-conta')
        })
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

            // busca e armazena os dados do usuario
            const { id, nome, email } = await Usuario.findByPk(userId);

            const user = {id, nome, email};
            
            // redireciona para a página restrita
            return res.render('pages/users/userDashboard', { user });
        }
    
        // se não estiver logado, redireciona para a página de login
        return res.render('pages/users/login',  { error: null });
    },
    
    //renderiza a página restrita (área logada do usuário)
    renderAreaRestrita: async (req, res) => {
        // Armazena o ID do usuário da sessão
        const userId  = req.session.user;

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

        const user = await Usuario.findByPk(userId);
        
        // exclusão do avatar do /uploads/
        fs.unlink(`${uploadPath}/${user.avatar}`, (error) =>{
            if(error){
                console.log("Erro ao excluir avatar");
            } else {
                console.log("Avatar excluído");
            }
        });

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