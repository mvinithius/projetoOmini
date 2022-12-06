const { Usuario } = require('../models')

const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserController = {
    //renderiza o formulário de cadastro
    renderFormCadastro: (req, res) => {
        res.render('pages/users/cadastroSimples', {error: null});
    },

    //executa a criação do usuário
    UserCreate: async (req, res) => {        
        const {nome, email, senha, senhaConfirm} = req.body;
        const avatar = req.file.filename;

        if(senha != senhaConfirm){
            res.render('pages/users/cadastroSimples', {error: 'Senha não coincide'});

            return
        }
        
        const hash = bcrypt.hashSync(senha, saltRounds);

        // checa se o usuário existe
        const checkIfUserExists = await Usuario.findOne({ where: { email: email } })
        
        // se usuário já existir, recarrega pagina de cadastro
        if (checkIfUserExists) {
            return res.render('pages/users/cadastroSimples', {error: 'E-mail já cadastrado'})
        }

        // armazena os dados do usuario
        const user = {
            nome,
            email,
            senha: hash,
            avatar
        }
        
        // imprime os dados do usuario no console
        console.log('dados da const user:', user)

        await Usuario.create(user)
            .then((user) => {
                req.session.user = user.id
                req.session.save(() => {
                    res.redirect('/') 
                })

            })
            .catch((erro) => {
                console.log('Erro ao criar usuário')
            })
    },
}

module.exports = UserController